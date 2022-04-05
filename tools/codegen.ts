import { enums } from "./codegen-enums.ts";
import { events } from "./codegen-events.ts";
import { CodeGenFunctionParam, functions } from "./codegen-functions.ts";
import { CodeGenStructMember, opaqueStructs, structs } from "./codegen-structs.ts";

const dataViewMethods: Record<string, (offset: number, length: number) => string> = {
  "i32": (offset, _) => `getInt32(${offset})`,
  "u8": (offset, _) => `getUint8(${offset})`,
  "u32": (offset, _) => `getUint32(${offset})`,

  "pointer": (offset, _) => `getBigUint64(${offset})`,

  "struct": (offset, length) => `getArrayBuffer(${length}, ${offset})`,
} as const;

const functionImplementations: Record<string, string> = {
  SDL_Init: `export function Init(flags: number, libraryPath?: string): number {
  // TODO: Improve this logic.
  if (!libraryPath) {
    libraryPath = "sdl2";
  }

  context.library = Deno.dlopen(libraryPath, symbols);
  context.symbols = context.library.symbols;

  return context.symbols.SDL_Init(flags) as number;
}`,

  SDL_Quit: `export function Quit(): void {
  context.symbols.SDL_Quit();
  context.library.close();
}`,
} as const;

await main();

async function main(): Promise<void> {
  await writeEnums();
  await writeEvents();
  await writeStructs();
  await writeSymbols();
  await writeFunctions();
}

function createLines(): string[] {
  return [
    "// This file is auto generated. To update the file make changes to the code generator.",
    "",
  ];
}

function shortenName(name: string): string {
  return name.startsWith("SDL_") ? name.substring("SDL_".length) : name;
}

function stripSDLPrefixes(value: string): string {
  return value.replaceAll("SDL_", "");
}

async function writeLinesToFile(path: string, lines: string[]): Promise<void> {
  await Deno.writeTextFile(path, lines.join("\n"));
  await (await Deno.run({ cmd: ["deno", "fmt", path] })).status();
}

async function writeEnums(): Promise<void> {
  const lines = createLines();

  for (const enumName of Object.keys(enums)) {
    const shortEnumName = shortenName(enumName);
    lines.push(`// ${shortEnumName}`);
    for (const key of Object.keys(enums[enumName])) {
      lines.push(`export const ${shortenName(key)} = ${stripSDLPrefixes(enums[enumName][key])}`);
    }
    lines.push("");
  }

  await writeLinesToFile("../src/enums.ts", lines);
}

function mapStructMemberType(member: CodeGenStructMember): string {
  switch (member.type) {
    case "i8":
    case "u8":
    case "i16":
    case "u16":
    case "i32":
    case "u32":
      return "number";

    case "i64":
    case "u64":
      return "bigint";

    case "pointer":
      return "Deno.UnsafePointer";
  }

  return member.type;
}

function sortStructMembers(
  a: [string, { type: string; offset: number }],
  b: [string, { type: string; offset: number }],
): number {
  const offsetDiff = a[1].offset - b[1].offset;

  if (offsetDiff !== 0) {
    return offsetDiff;
  }

  return a[0].localeCompare(b[0]);
}

async function writeEvents(): Promise<void> {
  const lines = createLines();

  lines.push(`import { BufferOrPointerView } from "./utils.ts";`);
  lines.push("");

  const eventMembersMap: Record<string, CodeGenStructMember> = {};

  for (const eventName of Object.keys(events)) {
    const shortEventName = shortenName(eventName);
    lines.push(`export interface ${shortEventName} {`);

    for (const memberName of Object.keys(events[eventName].members)) {
      if (memberName.startsWith("padding")) {
        continue;
      }

      const memberType = mapStructMemberType(events[eventName].members[memberName]);
      lines.push(`\t${memberName}: ${memberType};`);

      eventMembersMap[memberName] = events[eventName].members[memberName];
    }

    lines.push("}");
    lines.push("");
  }

  const eventTypeNames = Object.keys(events).map(shortenName).join(", ");
  lines.push(`export class Event implements ${eventTypeNames} {
  public _data = new Uint8Array(64);
  public _view = new BufferOrPointerView(this._data.buffer);

  public get pointer(): Deno.UnsafePointer | null {
    return Deno.UnsafePointer.of(this._data);
  }

`);

  const eventMembers = Object.entries(eventMembersMap);
  eventMembers.sort(sortStructMembers);

  for (const [memberName, member] of eventMembers) {
    lines.push(`\tpublic get ${memberName}(): ${mapStructMemberType(member)} {`);

    const dataViewMethod = dataViewMethods[member.type];

    if (dataViewMethod === undefined) {
      console.error(`dataViewMethods is missing ${member.type}.`);
    }

    const length = 0;
    lines.push(
      `\t\treturn this._view.${dataViewMethods[member.type](member.offset, length)};`,
    );
    lines.push("\t}");
    lines.push("");
  }

  lines.push("}");
  lines.push("");

  await writeLinesToFile("../src/events.ts", lines);
}

async function writeStructs(): Promise<void> {
  const lines = createLines();

  lines.push(`import { BufferOrPointerView } from "./utils.ts"`);
  lines.push("");

  for (const structName of opaqueStructs) {
    lines.push(`export type ${shortenName(structName)} = Deno.UnsafePointer;`);
  }

  lines.push("");

  for (const [structName, struct] of Object.entries(structs)) {
    lines.push(`export class ${shortenName(structName)} {
  public _data: ArrayBuffer | Deno.UnsafePointer;
  public _view: BufferOrPointerView;

  constructor(data: ArrayBuffer | Deno.UnsafePointer) {
    this._data = data;
    this._view = new BufferOrPointerView(this._data);
  }

  public get buffer(): ArrayBuffer | null {
    return this._view.buffer;
  }

  public get pointer(): Deno.UnsafePointer | null {
    return this._view.pointer;
  }
`);

    const structMembers = Object.entries(struct.members);
    structMembers.sort(sortStructMembers);

    for (const [memberName, member] of structMembers) {
      let readOp = "";
      let length = 0;
      let returnType = mapStructMemberType(member);

      if (member.type === "pointer") {
        readOp += "new Deno.UnsafePointer(";
      } else if (member.type === "struct") {
        const subStructName = shortenName(member.nativeType);
        returnType = subStructName;
        readOp += `new ${subStructName}(`;
        length = structs[member.nativeType].size;
      }

      lines.push(`\tpublic get ${memberName}(): ${returnType} {`);

      const dataViewMethod = dataViewMethods[member.type];

      if (dataViewMethod === undefined) {
        console.error(`dataViewMethods is missing ${member.type}.`);
      }

      readOp += `this._view.${dataViewMethods[member.type](member.offset, length)}`;

      if (member.type === "pointer" || member.type === "struct") {
        readOp += ")";
      }

      lines.push(`\t\treturn ${readOp};`);

      lines.push("\t}");
      lines.push("");
    }

    lines.push("}");
    lines.push("");
  }

  await writeLinesToFile("../src/structs.ts", lines);
}

async function writeSymbols(): Promise<void> {
  const lines = createLines();

  lines.push("export interface Symbols extends Deno.ForeignLibraryInterface {");
  for (const key of Object.keys(functions)) {
    lines.push(`\t${key}: Deno.ForeignFunction;`);
  }
  lines.push("}");
  lines.push("");

  lines.push("export const symbols: Symbols = {");
  for (const funcName of Object.keys(functions)) {
    lines.push(`\t${funcName}: {`);
    lines.push(`\t\tparameters: [`);

    for (const paramName of Object.keys(functions[funcName].parameters)) {
      const param = functions[funcName].parameters[paramName];
      lines.push(
        `\t\t\t"${param.type}", /* ${param.nativeType} ${paramName} */`,
      );
    }

    lines.push(`\t\t],`);
    lines.push(`\t\tresult: "${functions[funcName].result.type}" /* ${functions[funcName].result.nativeType} */`);
    lines.push(`\t},`);
  }
  lines.push("};");
  lines.push("");

  await writeLinesToFile("../src/symbols.ts", lines);
}

function isFunctionParamPointer(param: CodeGenFunctionParam): boolean {
  return param.nativeType.endsWith("*");
}

function isFunctionParamOpaqueStruct(param: CodeGenFunctionParam): boolean {
  let structName = param.nativeType;

  if (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  return opaqueStructs.includes(structName);
}

function isFunctionParamStruct(param: CodeGenFunctionParam): boolean {
  let structName = param.nativeType;

  if (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  if (structName === "SDL_Event") {
    return true;
  }

  return Object.keys(structs).includes(structName);
}

function mapFunctionParamType(param: CodeGenFunctionParam): string {
  if (isFunctionParamOpaqueStruct(param) || isFunctionParamStruct(param)) {
    let structName = param.nativeType.substring("SDL_".length);

    if (structName.endsWith("*")) {
      structName = structName.slice(0, -1);
    }

    if (param.nullable) {
      structName += "| null";
    }

    return structName;
  }

  switch (param.nativeType) {
    case "char*":
      return "string";
  }

  switch (param.type) {
    case "i8":
    case "u8":
    case "i16":
    case "u16":
    case "i32":
    case "u32":
      return "number";

    case "i64":
    case "u64":
      return "bigint";

    case "pointer":
      return "Deno.UnsafePointer";
  }

  return param.type;
}

async function writeFunctions(): Promise<void> {
  const lines = createLines();

  const structNames = Object.keys(structs).concat(opaqueStructs).map(shortenName).join(", ");

  lines.push(`import { Event } from "./events.ts";`);
  lines.push(`import { ${structNames} } from "./structs.ts";`);
  lines.push(`import { Symbols, symbols } from "./symbols.ts";`);
  lines.push(`import { nullPointer, toCString } from "./utils.ts";`);
  lines.push("");

  lines.push(`interface SDLContext {
  library: Deno.DynamicLibrary<Symbols>;
  symbols: Deno.StaticForeignLibraryInterface<Symbols>;
}

const context: SDLContext = {
  // We don't want to check in every function if the
  // library has been loaded so the following are
  // set to null even though the type says it shouldn't
  // be null.
  library: null!,
  symbols: null!,
};
`);

  for (const [funcName, func] of Object.entries(functions)) {
    if (functionImplementations[funcName] !== undefined) {
      lines.push(functionImplementations[funcName].trim());
      lines.push("");
      continue;
    }

    const returnType = mapFunctionParamType(func.result);

    lines.push(`export function ${shortenName(funcName)}(`);

    for (const [paramName, param] of Object.entries(func.parameters)) {
      lines.push(`${paramName}: ${mapFunctionParamType(param)},`);
    }

    lines.push(`): ${returnType} {`);

    if (returnType !== "void") {
      let returnStatement = "\treturn ";

      if (isFunctionParamStruct(func.result)) {
        returnStatement += `new ${mapFunctionParamType(func.result)}(`;
      }

      returnStatement += `context.symbols.${funcName}(`;
      lines.push(returnStatement);
    } else {
      lines.push(`\tcontext.symbols.${funcName}(`);
    }

    for (const [paramName, param] of Object.entries(func.parameters)) {
      const paramType = mapFunctionParamType(param);
      if (isFunctionParamOpaqueStruct(param)) {
        lines.push(`\t\t${paramName},`);
      } else if (isFunctionParamStruct(param)) {
        if (param.nullable) {
          lines.push(`\t\t${paramName}?.pointer ?? nullPointer,`);
        } else {
          lines.push(`\t\t${paramName}.pointer,`);
        }
      } else if (paramType === "string") {
        lines.push(`\t\ttoCString(${paramName}),`);
      } else {
        lines.push(`\t\t${paramName},`);
      }
    }

    if (returnType !== "void") {
      if (isFunctionParamStruct(func.result)) {
        lines.push(`\t) as Deno.UnsafePointer);`);
      } else {
        lines.push(`\t) as ${returnType};`);
      }
    } else {
      lines.push(`\t);`);
    }

    lines.push("}");
    lines.push("");
  }

  await writeLinesToFile("../src/functions.ts", lines);
}
