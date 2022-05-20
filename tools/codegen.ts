import { enums } from "./codegen-enums.ts";
import { events } from "./codegen-events.ts";
import { CodeGenFunction, CodeGenFunctionParam, functionImplementations, functions } from "./codegen-functions.ts";
import { CodeGenStructMember, opaqueStructs, structs } from "./codegen-structs.ts";

const SDL_PATH = "../src/SDL";

const dataViewGetMethods: Record<string, (offset: number, length: number) => string> = {
  "i32": (offset, _) => `getInt32(${offset})`,
  "u8": (offset, _) => `getUint8(${offset})`,
  "u32": (offset, _) => `getUint32(${offset})`,

  "pointer": (offset, _) => `getBigUint64(${offset})`,

  "struct": (offset, length) => `getArray(${length}, ${offset})`,
} as const;

const dataViewSetMethods: Record<string, (offset: number, length: number) => string> = {
  "i32": (offset, _) => `setInt32(${offset}, value)`,
  "u8": (offset, _) => `setUint8(${offset}, value)`,
  "u32": (offset, _) => `setUint32(${offset}, value)`,
} as const;

await main();

async function main(): Promise<void> {
  await writeEnums();
  await writeEvents();
  await writeStructs();
  await writeSymbols();
  await writeFunctions();
  await writeMod();
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

function removePointerPostfix(name: string): string {
  while (name.endsWith("*")) {
    name = name.substring(0, name.length - 1);
  }

  return name;
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

  await writeLinesToFile(`${SDL_PATH}/enums.ts`, lines);
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

  lines.push(`import { Pointer, Struct } from "../types.ts";`);
  lines.push(`import { DataPointer, DataView } from "../_utils.ts";`);
  lines.push("");

  for (const [eventName, event] of Object.entries(events)) {
    const className = shortenName(eventName);
    lines.push(`export class ${className} {`);
    lines.push("\tconstructor(private _view: DataView) {}");
    lines.push("");

    for (const [memberName, member] of Object.entries(event.members)) {
      if (memberName.startsWith("padding")) {
        continue;
      }

      lines.push(`\tpublic get ${memberName}(): ${mapStructMemberType(member)} {`);

      const dataViewMethod = dataViewGetMethods[member.type];

      if (dataViewMethod === undefined) {
        console.error(`dataViewMethods is missing ${member.type}.`);
      }

      const length = 0;
      lines.push(
        `\t\treturn this._view.${dataViewGetMethods[member.type](member.offset, length)};`,
      );
      lines.push("\t}");
      lines.push("");
    }

    lines.push("}");
    lines.push("");
  }

  lines.push(`export class Event implements Struct {
  private _data = new Uint8Array(64);
  private _view = new DataView(this._data);

  public get pointer(): Pointer<Event> {
    return DataPointer.of(this._data); // TODO: Can we save the pointer?
  }

  public get type(): number {
    return this._view.getUint32(0);
  }

`);

  for (const eventName of Object.keys(events)) {
    // TODO: This won't work longterm. There should be some property of the
    // event that says what this name should be.
    const propName = shortenName(eventName).slice(0, -"Event".length).toLowerCase();
    lines.push(`public readonly ${propName} = new ${shortenName(eventName)}(this._view);`);
    lines.push("");
  }

  lines.push("}");
  lines.push("");

  await writeLinesToFile(`${SDL_PATH}/events.ts`, lines);
}

async function writeStructs(): Promise<void> {
  const lines = createLines();

  lines.push(`import { Pointer, Struct } from "../types.ts";`);
  lines.push(`import { DataPointer, DataView } from "../_utils.ts";`);
  lines.push("");

  for (const structName of opaqueStructs) {
    const className = shortenName(structName);
    lines.push(`export class ${className} implements Struct {
  public static SIZE_IN_BYTES = 0;
  
  constructor(private _data: Pointer<${className}>) {}
  
  public get pointer(): Pointer<${className}> {
    return this._data;
  }
}
`);
  }

  lines.push("");

  for (const [structName, struct] of Object.entries(structs)) {
    const className = shortenName(structName);

    lines.push(`export class ${className} implements Struct {
  public static SIZE_IN_BYTES = ${struct.size};`);

    if (struct.allocatable) {
      lines.push(`
  private _data: Uint8Array | Pointer<${className}>;
  private _view: DataView;

  constructor();
  constructor(data: Uint8Array);
  constructor(data: Pointer<${className}>);
  constructor(data: Partial<${className}>);`);

      const constructorParams = Object.entries(struct.members).map(([memberName, member]) =>
        `${memberName}: ${mapStructMemberType(member)}`
      ).join(", ");
      lines.push(`constructor(${constructorParams});`);

      const firstMemberType = mapStructMemberType(Object.values(struct.members)[0]);
      const otherMembers = Object.values(struct.members).slice(1).map((member, index) =>
        `, _${index + 2}?: ${mapStructMemberType(member)}`
      ).join("");
      lines.push(
        `constructor(_1?: Uint8Array | Pointer<${className}> | Partial<${className}> | ${firstMemberType}${otherMembers}) {`,
      );

      const assignMemmbers = Object.entries(struct.members).map(([memberName, member], index) =>
        `this.${memberName} = _${index + 1} as ${mapStructMemberType(member)};`
      ).join("\n");

      lines.push(`
    if (_1 instanceof Uint8Array || _1 instanceof DataPointer) {
      this._data = _1;
      this._view = new DataView(this._data as Uint8Array | DataPointer<${className}>);
    } else {
      this._data = new Uint8Array(Rect.SIZE_IN_BYTES);
      this._view = new DataView(this._data);

      if (_1 !== undefined) {
        if (_2 === undefined) {
          Object.assign(this, _1);
        } else {
          ${assignMemmbers}
        }
      }
    }
  }

  public get pointer(): Pointer<${className}> {
    return this._view.pointer;
  }
`);
    } else {
      lines.push(`
  private _data: Pointer<${className}>;
  private _view: DataView;

  constructor(data: Pointer<${className}>) {    
    this._data = data;
    this._view = new DataView(this._data as DataPointer<${className}>);
  }

  public get pointer(): Pointer<${className}> {
    return this._data;
  }
`);
    }

    const structMembers = Object.entries(struct.members);
    structMembers.sort(sortStructMembers);

    for (const [memberName, member] of structMembers) {
      let readOp = "";
      let writeOp = "";
      let length = 0;
      let memberType = mapStructMemberType(member);

      if (member.type === "pointer") {
        const subStructName = shortenName(removePointerPostfix(member.nativeType));
        memberType = `Pointer<${subStructName}>`;
        readOp += `new DataPointer<${subStructName}>(`;
      } else if (member.type === "struct") {
        const subStructName = shortenName(member.nativeType);
        memberType = subStructName;
        readOp += `new ${subStructName}(`;
        length = structs[member.nativeType].size;
      }

      lines.push(`\tpublic get ${memberName}(): ${memberType} {`);

      const getMethod = dataViewGetMethods[member.type];

      if (getMethod === undefined) {
        console.error(`dataViewGetMethods is missing ${member.type}.`);
      }

      readOp += `this._view.${getMethod(member.offset, length)}`;

      if ((member.type === "pointer" || member.type === "struct")) {
        readOp += ")";
      }

      lines.push(`\t\treturn ${readOp};`);

      lines.push("\t}");
      lines.push("");

      if (struct.allocatable) {
        // TODO: Can we write to pointers / structs?
        if (member.type === "pointer" || member.type === "struct") {
          continue;
        }

        lines.push(`\tpublic set ${memberName}(value: ${memberType}) {`);

        const setMethod = dataViewSetMethods[member.type];

        if (setMethod === undefined) {
          console.error(`dataViewSetMethods is missing ${member.type}.`);
        }

        writeOp += `this._view.${setMethod(member.offset, length)}`;

        // if (member.type === "pointer" || member.type === "struct") {
        //   writeOp += ")";
        // }

        lines.push(`\t\t${writeOp};`);

        lines.push("\t}");
        lines.push("");
      }
    }

    lines.push("}");
    lines.push("");
  }

  await writeLinesToFile(`${SDL_PATH}/structs.ts`, lines);
}

async function writeSymbols(): Promise<void> {
  const lines = createLines();

  lines.push("export interface Symbols extends Deno.ForeignLibraryInterface {");
  for (const [funcName, func] of Object.entries(functions)) {
    if (func.symbolName !== undefined) {
      lines.push(`\t${func.symbolName}: Deno.ForeignFunction;`);
    } else {
      lines.push(`\t${funcName}: Deno.ForeignFunction;`);
    }
  }
  lines.push("}");
  lines.push("");

  lines.push("export const symbols: Symbols = {");
  for (const [funcName, func] of Object.entries(functions)) {
    if (func.symbolName !== undefined) {
      lines.push(`\t${func.symbolName}: {`);
    } else {
      lines.push(`\t${funcName}: {`);
    }

    lines.push(`\t\tparameters: [`);

    for (const paramName of Object.keys(func.parameters)) {
      const param = func.parameters[paramName];
      lines.push(
        `\t\t\t"${param.type}", /* ${param.nativeType} ${paramName} */`,
      );
    }

    lines.push(`\t\t],`);
    lines.push(`\t\tresult: "${func.result.type}" /* ${func.result.nativeType} */`);
    lines.push(`\t},`);
  }
  lines.push("};");
  lines.push("");

  await writeLinesToFile(`${SDL_PATH}/symbols.ts`, lines);
}

function isFunctionParamOpaqueStruct(param: CodeGenFunctionParam): boolean {
  let structName = param.nativeType;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  return opaqueStructs.includes(structName);
}

function isFunctionParamStruct(param: CodeGenFunctionParam): boolean {
  let structName = param.nativeType;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  if (structName === "SDL_Event") {
    return true;
  }

  return Object.keys(structs).includes(structName);
}

function isFunctionParamVoidPointer(param: CodeGenFunctionParam): boolean {
  return param.nativeType === "void*";
}

function mapFunctionReturnType(param: CodeGenFunctionParam): string {
  return mapFunctionParamType(param, true);
}

function mapFunctionParamType(param: CodeGenFunctionParam, isReturnType = false): string {
  if (isFunctionParamOpaqueStruct(param) || isFunctionParamStruct(param)) {
    let structName = param.nativeType.substring("SDL_".length);

    if (structName.endsWith("**")) {
      structName = structName.slice(0, -2);
      structName = `PointerTarget<${structName}>`;
    } else if (structName.endsWith("*")) {
      structName = structName.slice(0, -1);

      if (isReturnType) {
        if (isFunctionParamOpaqueStruct(param)) {
          structName = `Pointer<${structName}>`;
        }
      } else {
        if (isFunctionParamOpaqueStruct(param)) {
          structName = `Pointer<${structName}>`;
        } else {
          structName = `PointerOrStruct<${structName}>`;
        }
      }
    }

    if (param.nullable) {
      structName += "| null";
    }

    return structName;
  }

  switch (param.nativeType) {
    case "char*":
      return "string";

    case "void*":
      return "TypedArray";
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

function getGenericParam(type: string): string {
  const startIndex = type.indexOf("<");
  const endIndex = type.lastIndexOf(">");
  if (startIndex === -1 || endIndex === -1) {
    return "";
  }
  return type.substring(startIndex + 1, endIndex);
}

function isFunctionParamDoublePointer(param: CodeGenFunctionParam): boolean {
  return param.nativeType.endsWith("**");
}

function hasDoublePointerParams(func: CodeGenFunction): boolean {
  return Object.values(func.parameters).some(isFunctionParamDoublePointer);
}

async function writeFunctions(): Promise<void> {
  const lines = createLines();

  const structNames = Object.keys(structs).concat(opaqueStructs).map(shortenName).join(", ");

  lines.push(`import { Event } from "./events.ts";`);
  lines.push(`import { ${structNames} } from "./structs.ts";`);
  lines.push(`import { Symbols, symbols } from "./symbols.ts";`);
  lines.push(`import { RWMode, TypedArray } from "../types.ts";`);
  lines.push(`import { Pointer, PointerOrStruct, PointerTarget } from "../types.ts";`);
  lines.push(`import { fromCString, NULL_POINTER, DataPointer, toCString } from "../_utils.ts";`);
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

    const returnType = mapFunctionReturnType(func.result);

    lines.push(`export function ${shortenName(funcName)}(`);

    for (const [paramName, param] of Object.entries(func.parameters)) {
      if (param.overrideType) {
        lines.push(`${paramName}: ${param.overrideType},`);
      } else {
        lines.push(`${paramName}: ${mapFunctionParamType(param)},`);
      }
    }

    lines.push(`): ${returnType} {`);

    let symbolName = funcName;
    if (func.symbolName !== undefined) {
      symbolName = func.symbolName;
    }

    if (hasDoublePointerParams(func)) {
      for (
        const [paramName] of Object.entries(func.parameters).filter((x) => isFunctionParamDoublePointer(x[1]))
      ) {
        lines.push(`const ${paramName}DoublePointer = new BigUint64Array(1);`);
      }
      lines.push("");
    }

    if (returnType !== "void") {
      let returnStatement = "\t";

      if (hasDoublePointerParams(func)) {
        returnStatement += "const result = ";
      } else {
        returnStatement += "return ";
      }

      if (isFunctionParamOpaqueStruct(func.result)) {
        returnStatement += `new DataPointer<${getGenericParam(mapFunctionReturnType(func.result))}>(`;
      } else if (isFunctionParamStruct(func.result)) {
        returnStatement += `new ${mapFunctionReturnType(func.result)}(new DataPointer(`;
      } else if (returnType === "string") {
        returnStatement += "\t\tfromCString(";
      }

      returnStatement += `context.symbols.${symbolName}(`;
      lines.push(returnStatement);
    } else {
      lines.push(`\tcontext.symbols.${symbolName}(`);
    }

    for (const [paramName, param] of Object.entries(func.parameters)) {
      const paramType = mapFunctionParamType(param);
      if (isFunctionParamDoublePointer(param)) {
        lines.push(`\t\t${paramName}DoublePointer,`);
      } else if (isFunctionParamOpaqueStruct(param)) {
        lines.push(`\t\t(${paramName} as DataPointer<${getGenericParam(paramType)}>)._value,`);
      } else if (isFunctionParamStruct(param)) {
        if (param.nullable) {
          lines.push(
            `\t\t(${paramName}?.pointer as DataPointer<${
              getGenericParam(paramType)
            }> | undefined)?._value ?? NULL_POINTER,`,
          );
        } else {
          lines.push(`\t\t(${paramName}.pointer as DataPointer<${getGenericParam(paramType)}>)._value,`);
        }
      } else if (paramType === "string") {
        lines.push(`\t\ttoCString(${paramName}),`);
      } else if (isFunctionParamVoidPointer(param)) {
        lines.push(`\t\tDeno.UnsafePointer.of(${paramName}),`);
      } else {
        lines.push(`\t\t${paramName},`);
      }
    }

    if (returnType !== "void") {
      if (isFunctionParamStruct(func.result)) {
        lines.push(`\t) as Deno.UnsafePointer));`);
      } else if (isFunctionParamOpaqueStruct(func.result) || returnType === "string") {
        lines.push(`\t) as Deno.UnsafePointer);`);
      } else if (returnType === "bigint") {
        lines.push(`\t) as unknown as ${returnType};`);
      } else {
        lines.push(`\t) as ${returnType};`);
      }
    } else {
      lines.push(`\t);`);
    }

    if (hasDoublePointerParams(func)) {
      lines.push("");

      for (
        const [paramName, param] of Object.entries(func.parameters).filter((x) => isFunctionParamDoublePointer(x[1]))
      ) {
        lines.push(
          `${paramName}.value = new DataPointer<${
            getGenericParam(mapFunctionParamType(param))
          }>(${paramName}DoublePointer[0]);`,
        );
      }

      lines.push("");
      lines.push("return result;");
    }

    lines.push("}");
    lines.push("");
  }

  await writeLinesToFile(`${SDL_PATH}/functions.ts`, lines);
}

async function writeMod(): Promise<void> {
  const lines = createLines();

  const sdlProjects = ["SDL"];

  for (const sdlProject of sdlProjects) {
    const modulesToExport: string[] = [];

    for await (const entry of Deno.readDir(`../src/${sdlProject}`)) {
      if (!entry.isFile || entry.name.startsWith("_")) {
        continue;
      }
      const variableName = entry.name.slice(0, -".ts".length);
      lines.push(`import * as ${sdlProject}_${variableName} from "./src/${sdlProject}/${entry.name}";`);
      modulesToExport.push(variableName);
    }

    lines.push("");
    lines.push(`export const ${sdlProject} = {`);

    for (const module of modulesToExport) {
      lines.push(`...${sdlProject}_${module},`);
    }

    lines.push("};");
    lines.push("");
  }

  const typesToExport: string[] = [];

  lines.push("import type {");
  for (const strcutName of Object.keys(structs).concat(opaqueStructs)) {
    const strcutNameShort = strcutName.substring("SDL_".length);
    typesToExport.push(strcutNameShort);
    lines.push(`\t${strcutNameShort},`);
  }
  lines.push(`} from "./src/SDL/structs.ts";`);
  lines.push("");

  const typeExportLines = (await Deno.readTextFile("../src/types.ts")).split("\n").filter((x) =>
    x.startsWith("export type ") || x.startsWith("export interface ")
  );

  lines.push("import type {");
  for (let typeName of typeExportLines) {
    if (typeName.startsWith("export type ")) {
      typeName = typeName.substring("export type ".length);
    } else if (typeName.startsWith("export interface ")) {
      typeName = typeName.substring("export interface ".length);
    }

    if (typeName.indexOf("<") !== -1) {
      typeName = typeName.substring(0, typeName.indexOf("<"));
    } else if (typeName.indexOf("=") !== -1) {
      typeName = typeName.substring(0, typeName.indexOf("="));
    } else if (typeName.indexOf("{") !== -1) {
      typeName = typeName.substring(0, typeName.indexOf("{"));
    }

    typeName = typeName.trim();

    typesToExport.push(typeName);
    lines.push(`${typeName},`);
  }
  lines.push(`} from "./src/types.ts"`);
  lines.push("");

  lines.push("export type {");
  for (const type of typesToExport) {
    lines.push(`\t${type},`);
  }
  lines.push("};");
  lines.push("");

  await writeLinesToFile("../mod.ts", lines);
}
