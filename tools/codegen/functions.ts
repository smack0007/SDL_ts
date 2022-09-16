import {
  CodeGenEnums,
  CodeGenEvents,
  CodeGenFunction,
  CodeGenFunctionImplementations,
  CodeGenFunctionParam,
  CodeGenFunctions,
  CodeGenOpaqueStructs,
  CodeGenStructMember,
  CodeGenStructs,
} from "./types.ts";

const PlatformDataViewGetMethods: Record<string, (offset: number, length: number) => string> = {
  "f32": (offset, _) => `getFloat32(${offset})`,
  "i32": (offset, _) => `getInt32(${offset})`,
  "u8": (offset, _) => `getUint8(${offset})`,
  "u16": (offset, _) => `getUint16(${offset})`,
  "u32": (offset, _) => `getUint32(${offset})`,

  "pointer": (offset, _) => `getPointer(${offset})`,

  "struct": (offset, length) => `getArray(${length}, ${offset})`,
} as const;

const PlatformDataViewSetMethods: Record<string, (offset: number, length: number) => string> = {
  "i32": (offset, _) => `setInt32(${offset}, value)`,
  "u8": (offset, _) => `setUint8(${offset}, value)`,
  "u32": (offset, _) => `setUint32(${offset}, value)`,
} as const;

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

export async function writeEnums(
  filePath: string,
  enums: CodeGenEnums,
  imports: string[],
): Promise<void> {
  const lines = createLines();

  lines.push(...imports);
  lines.push("");

  for (const enumName of Object.keys(enums)) {
    const shortEnumName = shortenName(enumName);
    lines.push(`// ${shortEnumName}`);
    for (const key of Object.keys(enums[enumName])) {
      lines.push(`export const ${shortenName(key)} = ${stripSDLPrefixes(enums[enumName][key])}`);
    }
    lines.push("");
  }

  await writeLinesToFile(filePath, lines);
}

function mapStructMemberType(member: CodeGenStructMember): string {
  switch (member.nativeType) {
    case "char*":
      return "string";
  }

  switch (member.type) {
    case "i8":
    case "u8":
    case "i16":
    case "u16":
    case "i32":
    case "u32":
    case "i64":
    case "u64":
    case "f32":
    case "f64":
      return member.type;

    case "pointer":
      return "Deno.PointerValue";

    case "struct":
      return shortenName(member.nativeType);
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

function isStruct(structs: CodeGenStructs, opaqueStructs: CodeGenOpaqueStructs, member: CodeGenStructMember): boolean {
  const allStructNames = Object.keys(structs).concat(opaqueStructs);
  return allStructNames.some((x) => x === member.nativeType);
}

export async function writeEvents(
  filePath: string,
  events: CodeGenEvents,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
): Promise<void> {
  const lines = createLines();

  lines.push(
    `import { PlatformDataView } from "platform";
import { Keysym } from "./structs.ts";
import { f32, i32, u32, u8 } from "../types.ts";

`,
  );

  for (const [eventName, event] of Object.entries(events)) {
    const className = shortenName(eventName);
    lines.push(`export class ${className} {`);

    const subStructMembers = Object.entries(event.members).filter((x) => isStruct(structs, opaqueStructs, x[1]));

    if (subStructMembers.length > 0) {
      for (const [memberName, member] of subStructMembers) {
        lines.push(`private _${memberName}: ${shortenName(member.nativeType)}`);
      }
      lines.push("");
    }

    lines.push("\tconstructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {");

    for (const [memberName, member] of subStructMembers) {
      const memberTypeName = shortenName(member.nativeType);

      lines.push(
        `\t\tthis._${memberName} = ${memberTypeName}.of(new Uint8Array(this._data.buffer, ${member.offset}, ${memberTypeName}.SIZE_IN_BYTES)) as ${memberTypeName};`,
      );
    }

    lines.push("\t}");
    lines.push("");

    for (const [memberName, member] of Object.entries(event.members)) {
      if (memberName.startsWith("padding")) {
        lines.push(`// ${memberName}`);
        lines.push("");
        continue;
      }

      lines.push(`\tpublic get ${memberName}(): ${mapStructMemberType(member)} {`);

      if (isStruct(structs, opaqueStructs, member)) {
        lines.push(`return this._${memberName};`);
      } else {
        const PlatformDataViewMethod = PlatformDataViewGetMethods[member.type];

        if (PlatformDataViewMethod === undefined) {
          console.error(`PlatformDataViewMethods is missing ${member.type}.`);
        }

        const length = 0;
        lines.push(
          `\t\treturn this._view.${PlatformDataViewGetMethods[member.type](member.offset, length)};`,
        );
      }
      lines.push("\t}");
      lines.push("");
    }

    lines.push("}");
    lines.push("");
  }

  lines.push(`export class Event {
  public readonly _data = new Uint8Array(64);
  private readonly _view = new PlatformDataView<Event>(this._data);
  
  public get type(): number {
    return this._view.getUint32(0);
  }

`);

  for (const [eventName, event] of Object.entries(events)) {
    const propName = event.unionName ?? shortenName(eventName).slice(0, -"Event".length).toLowerCase();

    lines.push(`public readonly ${propName} = new ${shortenName(eventName)}(this._data, this._view);`);
    lines.push("");
  }

  lines.push("}");
  lines.push("");

  await writeLinesToFile(filePath, lines);
}

export async function writeStructs(
  filePath: string,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
): Promise<void> {
  const lines = createLines();
  lines.push("// deno-lint-ignore-file no-unused-vars");
  lines.push("");

  lines.push(`import { fromPlatformString, PlatformPointer, PlatformDataView } from "platform";`);
  lines.push(`import { STRUCT_NO_ALLOCATE, StructCommand, StructInternal } from "../_structs.ts";`);
  lines.push(`import { Pointer } from "../pointers.ts";`);
  lines.push(
    `import { AllocatableStruct, f32, f64, i16, i32, i64, i8, PointerValue, Struct, u16, u32, u64, u8 } from "../types.ts";`,
  );
  lines.push("");

  for (const structName of opaqueStructs) {
    const className = shortenName(structName);
    lines.push(`export class ${className} implements Struct {
  public static IS_OPAQUE = true;
  public readonly _data!: PointerValue<${className}>;

  public static of(data: PointerValue<${className}>): ${className} | null {
    if (Pointer.isNullPointer(data)) {
      return null;
    }

    const struct = (new ${className}() as unknown as StructInternal<${className}>);
    struct._data = data;
    return struct as unknown as ${className};
  }
}
`);
  }

  lines.push("");

  for (const [structName, struct] of Object.entries(structs)) {
    const className = shortenName(structName);

    const implementsExpression = struct.allocatable ? " implements AllocatableStruct" : " implements Struct";

    lines.push(`export class ${className}${implementsExpression} {
  public static SIZE_IN_BYTES = ${struct.size};`);

    lines.push(`
  public readonly _data!: Uint8Array | PointerValue<${className}>;
  private readonly _view!: PlatformDataView<${className}>;
`);

    if (struct.allocatable) {
      if (!struct.writable) {
        lines.push(`constructor(command?: StructCommand) {
  if (command === STRUCT_NO_ALLOCATE) {
    return;
  }

  this._data = new Uint8Array(${className}.SIZE_IN_BYTES);
  this._view = new PlatformDataView(this._data as Uint8Array | PointerValue<${className}>);
}
`);
      } else {
        lines.push("constructor(command: StructCommand);");
        lines.push(`constructor(props: Partial<${className}>);`);

        const constructorParams = Object.entries(struct.members).map(([memberName, member]) =>
          `${memberName}: ${mapStructMemberType(member)}`
        ).join(", ");
        lines.push(`constructor(${constructorParams});`);

        const firstMemberType = mapStructMemberType(Object.values(struct.members)[0]);
        const otherMembers = Object.values(struct.members).slice(1).map((member, index) =>
          `, _${index + 2}?: ${mapStructMemberType(member)}`
        ).join("");
        lines.push(
          `constructor(_1?: StructCommand | Partial<${className}> | ${firstMemberType}${otherMembers}) {`,
        );

        const assignMemmbers = Object.entries(struct.members).map(([memberName, member], index) =>
          `this.${memberName} = _${index + 1} as ${mapStructMemberType(member)};`
        ).join("\n");

        lines.push(`
    if (_1 === STRUCT_NO_ALLOCATE) {
      return;
    }
    
    this._data = new Uint8Array(${className}.SIZE_IN_BYTES);
    this._view = new PlatformDataView(this._data);

    if (_1 !== undefined) {
      if (typeof _2 === "object") {
        Object.assign(this, _1);
      } else {
        ${assignMemmbers}
      }
    }
  }
`);
      }
    }

    const shouldNotAllocate = struct.allocatable ? "STRUCT_NO_ALLOCATE" : "";

    lines.push(`public static of(data: Uint8Array | PointerValue<${className}>): ${className} | null {
      if (Pointer.isNullPointer(data)) {
        return null;
      }

      const struct = (new ${className}(${shouldNotAllocate}) as unknown as StructInternal<${className}>);
      struct._data = data;
      struct._view = new PlatformDataView(data);
      return struct as unknown as ${className};
    }
`);

    const structMembers = Object.entries(struct.members);
    structMembers.sort(sortStructMembers);

    for (const [memberName, member] of structMembers) {
      let readOp = "";
      let writeOp = "";
      let length = 0;
      let memberType = mapStructMemberType(member);
      let memberStructName = "";

      if (memberType === "string") {
        readOp += `fromPlatformString(`;
      } else if (member.type === "pointer") {
        const subStructName = shortenName(removePointerPostfix(member.nativeType));
        memberType = `PointerValue<${subStructName}>`;
      } else if (member.type === "struct") {
        memberStructName = shortenName(member.nativeType);
        memberType = memberStructName;
        readOp += `${memberStructName}.of(`;
        length = structs[member.nativeType].size;
      }

      lines.push(`\tpublic get ${memberName}(): ${memberType} {`);

      const getMethod = PlatformDataViewGetMethods[member.type];

      if (getMethod === undefined) {
        console.error(`PlatformDataViewGetMethods is missing ${member.type}.`);
      }

      readOp += `this._view.${getMethod(member.offset, length)}`;

      if (memberType === "string") {
        readOp += ")";
      } else if (member.type === "struct") {
        readOp += `) as ${memberStructName}`;
      }

      lines.push(`\t\treturn ${readOp};`);

      lines.push("\t}");
      lines.push("");

      if (struct.writable) {
        // TODO: Can we write to pointers / structs?
        if (member.type === "pointer" || member.type === "struct") {
          continue;
        }

        lines.push(`\tpublic set ${memberName}(value: ${memberType}) {`);

        const setMethod = PlatformDataViewSetMethods[member.type];

        if (setMethod === undefined) {
          console.error(`PlatformDataViewSetMethods is missing ${member.type}.`);
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

  await writeLinesToFile(filePath, lines);
}

export async function writeSymbols(filePath: string, functions: CodeGenFunctions): Promise<void> {
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

  await writeLinesToFile(filePath, lines);
}

function isFunctionParamOpaqueStruct(opaqueStructs: CodeGenOpaqueStructs, param: CodeGenFunctionParam): boolean {
  let structName = param.nativeType;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  return opaqueStructs.includes(structName);
}

function isFunctionParamStruct(structs: CodeGenStructs, param: CodeGenFunctionParam): boolean {
  let structName = param.nativeType;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  if (structName === "SDL_Event") {
    return true;
  }

  return Object.keys(structs).includes(structName);
}

function isFunctionParamPointer(param: CodeGenFunctionParam): boolean {
  return param.type === "pointer";
}

function isFunctionParamVoidPointer(param: CodeGenFunctionParam): boolean {
  return param.nativeType === "void*";
}

function isFunctionParamDoublePointer(param: CodeGenFunctionParam): boolean {
  return param.nativeType.endsWith("**");
}

function hasDoublePointerParams(func: CodeGenFunction): boolean {
  return Object.values(func.parameters).some(isFunctionParamDoublePointer);
}

function isFunctionParamString(param: CodeGenFunctionParam): boolean {
  return param.nativeType === "char*";
}

function mapFunctionReturnType(
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  param: CodeGenFunctionParam,
): string {
  return mapFunctionParamType(structs, opaqueStructs, param, true);
}

function mapFunctionParamType(
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  param: CodeGenFunctionParam,
  isReturnType = false,
): string {
  if (param.overrideType) {
    if (param.nullable) {
      return param.overrideType + "| null";
    }

    return param.overrideType;
  }

  if (isFunctionParamOpaqueStruct(opaqueStructs, param) || isFunctionParamStruct(structs, param)) {
    let structName = param.nativeType.substring("SDL_".length);

    if (structName.endsWith("**")) {
      structName = structName.slice(0, -2);
      structName = `BoxedPointer<${structName}>`;
    } else if (structName.endsWith("*")) {
      structName = structName.slice(0, -1);
      if (isReturnType) {
        structName = `${structName}`;
      } else {
        structName = `PointerTo<${structName}>`;
      }
    }

    if (param.nullable) {
      structName += "| null";
    }

    return structName;
  }

  let result = "";

  switch (param.nativeType) {
    case "char*":
      result = "string";
      break;

    case "int*":
    case "Uint8*":
      result = "PointerValue<number>";
      break;

    case "void*":
      result = "TypedArray";
      break;
  }

  if (result) {
    if (param.nullable) {
      result += "| null";
    }

    return result;
  }

  switch (param.type) {
    case "pointer":
      throw new Error(`Unable to map param ${JSON.stringify(param)}`);
  }

  if (result === "") {
    result = param.type;
  }

  if (param.nullable) {
    result += "| null";
  }

  return result;
}

function getGenericParam(type: string): string {
  const startIndex = type.indexOf("<");
  const endIndex = type.lastIndexOf(">");
  if (startIndex === -1 || endIndex === -1) {
    return "";
  }
  return type.substring(startIndex + 1, endIndex);
}

export async function writeFunctions(
  filePath: string,
  functions: CodeGenFunctions,
  functionImplementations: CodeGenFunctionImplementations,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
): Promise<void> {
  const lines = createLines();
  lines.push("// deno-lint-ignore-file no-unused-vars");
  lines.push("");

  const structNames = Object.keys(structs).concat(opaqueStructs).map(shortenName).join(", ");

  lines.push(
    `import { fromPlatformString, PlatformPointer, toPlatformString } from "platform";
import { BoxedPointer } from "../boxes.ts";
import { Pointer, PointerTo } from "../pointers.ts";
import { f64, i32, PointerValue, TypedArray, u32, u64, u8 } from "../types.ts";
import { Event } from "./events.ts";
import { RWMode } from "./types.ts";
import { Symbols, symbols } from "./_symbols.ts";
`,
  );

  lines.push(`import { ${structNames} } from "./structs.ts";`);
  lines.push("");

  lines.push(`interface SDLContext {
  library: Deno.DynamicLibrary<Symbols>;

  // TODO: In order to use the correct types we'll have to do a bunch of casts.
  // deno-lint-ignore no-explicit-any
  symbols: any;
  // symbols: Deno.DynamicLibrary<Symbols>["symbols"];
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

    const returnType = mapFunctionReturnType(structs, opaqueStructs, func.result);

    lines.push(`export function ${shortenName(funcName)}(`);

    for (const [paramName, param] of Object.entries(func.parameters)) {
      lines.push(`${paramName}: ${mapFunctionParamType(structs, opaqueStructs, param)},`);
    }

    const returnTypeOrNull =
      isFunctionParamOpaqueStruct(opaqueStructs, func.result) || isFunctionParamStruct(structs, func.result)
        ? "| null"
        : "";
    lines.push(`): ${returnType}${returnTypeOrNull} {`);

    let symbolName = funcName;
    if (func.symbolName !== undefined) {
      symbolName = func.symbolName;
    }

    if (returnType !== "void") {
      let returnStatement = "\treturn ";

      if (isFunctionParamString(func.result)) {
        returnStatement += "\t\tfromPlatformString(";
      } else if (
        isFunctionParamOpaqueStruct(opaqueStructs, func.result) ||
        isFunctionParamStruct(structs, func.result)
      ) {
        returnStatement += `\t\t${returnType}.of(`;
      }

      returnStatement += `context.symbols.${symbolName}(`;
      lines.push(returnStatement);
    } else {
      lines.push(`\tcontext.symbols.${symbolName}(`);
    }

    for (const [paramName, param] of Object.entries(func.parameters)) {
      // const paramType = mapFunctionParamType(param);
      if (isFunctionParamString(param)) {
        lines.push(`\t\ttoPlatformString(${paramName}),`);
      } else if (isFunctionParamVoidPointer(param)) {
        lines.push(`\t\tPlatformPointer.of(${paramName}),`);
      } else if (isFunctionParamDoublePointer(param)) {
        lines.push(`\t\tPlatformPointer.of(${paramName}._data),`);
      } else if (
        isFunctionParamPointer(param) ||
        isFunctionParamOpaqueStruct(opaqueStructs, param) ||
        isFunctionParamStruct(structs, param)
      ) {
        lines.push(`\t\tPointer.of(${paramName}),`);
      } else {
        lines.push(`\t\t${paramName},`);
      }
    }

    if (returnType !== "void") {
      if (returnType === "string") {
        lines.push(`\t) as PointerValue<unknown>);`);
      } else if (
        isFunctionParamOpaqueStruct(opaqueStructs, func.result) ||
        isFunctionParamStruct(structs, func.result)
      ) {
        lines.push(`\t) as PointerValue<${returnType}>);`);
      } else if (isFunctionParamPointer(func.result)) {
        lines.push(`\t) as PointerValue<${getGenericParam(returnType)}>;`);
      } else if (returnType === "bigint") {
        lines.push(`\t) as unknown as ${returnType};`);
      } else {
        lines.push(`\t) as ${returnType};`);
      }
    } else {
      lines.push(`\t);`);
    }

    lines.push("}");
    lines.push("");
  }

  await writeLinesToFile(filePath, lines);
}