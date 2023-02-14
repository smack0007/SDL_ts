import {
  CodeGenEnum,
  CodeGenEnums,
  CodeGenEvents,
  CodeGenFunction,
  CodeGenFunctionImplementations,
  CodeGenFunctionParam,
  CodeGenFunctionResult,
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

function removePointerPostfix(name: string): string {
  while (name.endsWith("*")) {
    name = name.substring(0, name.length - 1);
  }

  return name;
}

function isDigit(value: string): boolean {
  return !!value.match(/[0-9]/i);
}

function stripPrefixes(value: string, ...prefixes: string[]): string {
  for (const prefix of prefixes) {
    if (value.startsWith(`${prefix}_`)) {
      value = value.substring(`${prefix}_`.length);
    }

    if (value.indexOf(`${prefix}_`) !== 0) {
      value = value.replaceAll(`${prefix}_`, "");
    }
  }

  if (value.startsWith("SDL_")) {
    value = value.substring("SDL_".length);
  }

  if (value.indexOf("SDL_") !== 0) {
    value = value.replaceAll("SDL_", "");
  }

  if (value.startsWith("IMG_")) {
    value = value.substring("IMG_".length);
  }

  return value;
}

async function writeLinesToFile(path: string, lines: string[]): Promise<void> {
  await Deno.writeTextFile(path, lines.join("\n"));
  await (await Deno.run({ cmd: ["deno", "fmt", path] })).status();
}

function mapEnumValue(value: string, enumData: CodeGenEnum): string {
  if (value.startsWith("'")) {
    value = value
      .substring(1, value.length - 1) // Trim single quotes
      .charCodeAt(0)
      .toString();
  }

  value = value.trim();
  if (value.indexOf("|") !== -1) {
    if (value.startsWith("(") && value.endsWith(")")) {
      value = value.substring(1, value.length - 1); // Trim ( and )
    }

    const parts = value
      .split("|")
      .map((part) => part.trim())
      .map((part) => enumData.values[part] ?? part);

    value = parts.join(" | ");
  } else {
    value = enumData.values[value] ?? value;
  }

  return eval(value);
}

export async function writeEnums(
  filePath: string,
  enums: CodeGenEnums,
  imports: string[],
): Promise<void> {
  const lines = createLines();

  lines.push(`// deno-lint-ignore-file no-unused-vars`);
  lines.push("");
  lines.push(`import { Enum, Flags } from "../types.ts";`);
  lines.push(...imports);
  lines.push("");

  for (const [enumName, enumData] of Object.entries(enums)) {
    const prefixToStrip = enumData.prefixToStrip ?? enumName.toUpperCase();
    const strippedEnumName = stripPrefixes(enumName);

    lines.push(`export const ${strippedEnumName} = {`);
    for (const key of Object.keys(enumData.values)) {
      let enumValueName = stripPrefixes(key, prefixToStrip);

      if (isDigit(enumValueName[0])) {
        enumValueName = "_" + enumValueName;
      }

      lines.push(`\t${enumValueName} = ${mapEnumValue(enumData.values[key], enumData)},`);
    }
    lines.push("} as const;");
    lines.push("");

    if (enumName.endsWith("Flags")) {
      lines.push(`export type ${strippedEnumName} = Flags<typeof ${strippedEnumName}, "${strippedEnumName}">;`);
    } else {
      lines.push(`export type ${strippedEnumName} = Enum<typeof ${strippedEnumName}>;`);
    }

    lines.push("");
  }

  await writeLinesToFile(filePath, lines);
}

function isEnum(enums: CodeGenEnums, type: string): boolean {
  for (const [enumGroupName, enumData] of Object.entries(enums)) {
    if (enumGroupName === type) {
      return true;
    }

    for (const [enumValueName, _] of Object.entries(enumData.values)) {
      if (enumValueName === type) {
        return true;
      }
    }
  }

  return false;
}

function isStruct(structs: CodeGenStructs, opaqueStructs: CodeGenOpaqueStructs, type: string): boolean {
  for (const structName of Object.keys(structs)) {
    if (structName === type) {
      return true;
    }
  }

  for (const structName of opaqueStructs) {
    if (structName === type) {
      return true;
    }
  }

  return false;
}

type FFIType =
  | "f32"
  | "f64"
  | "i8"
  | "i16"
  | "i32"
  | "i64"
  | "pointer"
  | "struct"
  | "u8"
  | "u16"
  | "u32"
  | "u64"
  | "void";

function mapTypeToFFIType(
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  type: string,
): FFIType {
  if (type.endsWith("*")) {
    return "pointer";
  }

  if (isEnum(enums, type)) {
    return "u32";
  }

  if (isStruct(structs, opaqueStructs, type)) {
    return "struct";
  }

  switch (type) {
    case "double":
      return "f64";

    case "float":
      return "f32";

    case "int":
      return "i32";

    case "Sint16":
      return "i16";

    case "Sint32":
      return "i32";

    case "Uint8":
      return "u8";

    case "Uint16":
      return "u16";

    case "Uint32":
      return "u32";

    case "Uint64":
      return "u64";
  }

  return type as FFIType;
}

function mapStructMemberType(
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  member: CodeGenStructMember,
): string {
  if (member.overrideType) {
    return member.overrideType;
  }

  if (isEnum(enums, member.type)) {
    const enumData = enums[member.type];
    return enumData?.prefixToStrip ? stripPrefixes(member.type, enumData.prefixToStrip) : stripPrefixes(member.type);
  }

  switch (member.type) {
    case "char*":
      return "string";
  }

  const ffiType = mapTypeToFFIType(enums, structs, opaqueStructs, member.type);

  switch (ffiType) {
    case "pointer":
      return "Deno.PointerValue";

    case "struct":
      return stripPrefixes(member.type);
  }

  return ffiType;
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

export async function writeEvents(
  filePath: string,
  events: CodeGenEvents,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
): Promise<void> {
  const lines = createLines();

  lines.push(
    `import platform from "../_platform.ts";
import { PlatformDataView } from "../_types.ts";
import { EventType, WindowEventID } from "./enums.ts";
import { Keysym } from "./structs.ts";
import { f32, i32, u32, u8 } from "../types.ts";

`,
  );

  for (const [eventName, event] of Object.entries(events)) {
    const className = stripPrefixes(eventName);
    lines.push(`export class ${className} {`);

    const subStructMembers = Object.entries(event.members).filter((x) => isStruct(structs, opaqueStructs, x[1].type));

    if (subStructMembers.length > 0) {
      for (const [memberName, member] of subStructMembers) {
        lines.push(`private _${memberName}: ${stripPrefixes(member.type)}`);
      }
      lines.push("");
    }

    lines.push("\tconstructor(public readonly _data: Uint8Array, private _view: PlatformDataView) {");

    for (const [memberName, member] of subStructMembers) {
      const memberTypeName = stripPrefixes(member.type);

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

      const type = mapStructMemberType(enums, structs, opaqueStructs, member);
      lines.push(`\tpublic get ${memberName}(): ${type} {`);

      if (isStruct(structs, opaqueStructs, member.type)) {
        lines.push(`return this._${memberName};`);
      } else {
        const ffiType = mapTypeToFFIType(enums, structs, opaqueStructs, member.type);

        const PlatformDataViewMethod = PlatformDataViewGetMethods[ffiType];

        if (PlatformDataViewMethod === undefined) {
          console.error(
            `PlatformDataViewMethods is missing ${ffiType}.`,
          );
        }

        // FIXME: isEnum expects the type to be prefixed with SDL_ but mapStructMemberType chops it off already.
        const asEnum = isEnum(enums, "SDL_" + type) ? ` as ${type}` : "";

        const length = 0;
        lines.push(
          `\t\treturn this._view.${
            PlatformDataViewGetMethods[ffiType](
              member.offset,
              length,
            )
          }${asEnum};`,
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
  private readonly _view = new platform.DataView(this._data);
  
  public get type(): EventType {
    return this._view.getUint32(0) as EventType;
  }

`);

  for (const [eventName, event] of Object.entries(events)) {
    const propName = event.unionName ?? stripPrefixes(eventName).slice(0, -"Event".length).toLowerCase();

    lines.push(`public readonly ${propName} = new ${stripPrefixes(eventName)}(this._data, this._view);`);
    lines.push("");
  }

  lines.push("}");
  lines.push("");

  await writeLinesToFile(filePath, lines);
}

export async function writeStructs(
  filePath: string,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
): Promise<void> {
  const lines = createLines();
  lines.push("// deno-lint-ignore-file no-unused-vars");
  lines.push("");

  lines.push(`import platform from "../_platform.ts";`);
  lines.push(`import { PlatformDataView } from "../_types.ts";`);
  lines.push(`import { STRUCT_NO_ALLOCATE, StructCommand, StructInternal } from "../_structs.ts";`);
  lines.push(`import { Pointer, PointerLike } from "../pointers.ts";`);
  lines.push(
    `import { AllocatableStruct, f32, f64, i16, i32, i64, i8, PointerValue, Struct, u16, u32, u64, u8 } from "../types.ts";`,
  );
  lines.push("");

  const enumNames = Object.keys(enums).map((x) => stripPrefixes(x)).join(", ");
  lines.push(`import { ${enumNames} } from "./enums.ts";`);
  lines.push("");

  for (const structName of opaqueStructs) {
    const className = stripPrefixes(structName);
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
    const className = stripPrefixes(structName);

    const implementsExpression = struct.allocatable ? " implements AllocatableStruct" : " implements Struct";

    lines.push(`export class ${className}${implementsExpression} {
  public static SIZE_IN_BYTES = ${struct.size};`);

    lines.push(`
  public readonly _data!: Uint8Array | PointerValue<${className}>;
  private readonly _view!: PlatformDataView;
`);

    if (struct.allocatable) {
      if (!struct.writable) {
        lines.push(`constructor(command?: StructCommand) {
  if (command === STRUCT_NO_ALLOCATE) {
    return;
  }

  this._data = new Uint8Array(${className}.SIZE_IN_BYTES);
  this._view = new platform.DataView(this._data as Uint8Array | PointerValue<${className}>);
}
`);
      } else {
        lines.push("constructor(command: StructCommand);");
        lines.push(`constructor(props: Partial<${className}>);`);

        const constructorParams = Object.entries(struct.members).map(([memberName, member]) =>
          `${memberName}: ${mapStructMemberType(enums, structs, opaqueStructs, member)}`
        ).join(", ");
        lines.push(`constructor(${constructorParams});`);

        const firstMemberType = mapStructMemberType(enums, structs, opaqueStructs, Object.values(struct.members)[0]);
        const otherMembers = Object.values(struct.members).slice(1).map((member, index) =>
          `, _${index + 2}?: ${mapStructMemberType(enums, structs, opaqueStructs, member)}`
        ).join("");
        lines.push(
          `constructor(_1?: StructCommand | Partial<${className}> | ${firstMemberType}${otherMembers}) {`,
        );

        const assignMemmbers = Object.entries(struct.members).map(([memberName, member], index) =>
          `this.${memberName} = _${index + 1} as ${mapStructMemberType(enums, structs, opaqueStructs, member)};`
        ).join("\n");

        lines.push(`
    if (_1 === STRUCT_NO_ALLOCATE) {
      return;
    }
    
    this._data = new Uint8Array(${className}.SIZE_IN_BYTES);
    this._view = new platform.DataView(this._data);

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
      struct._view = new platform.DataView(data);
      return struct as unknown as ${className};
    }
`);

    const structMembers = Object.entries(struct.members);
    structMembers.sort(sortStructMembers);

    for (const [memberName, member] of structMembers) {
      let readOp = "";
      let writeOp = "";
      let length = 0;
      let memberType = mapStructMemberType(enums, structs, opaqueStructs, member);
      let memberStructName = "";

      if (memberType === "string") {
        readOp += `platform.fromNativeString(`;
      } else if (mapTypeToFFIType(enums, structs, opaqueStructs, member.type) === "pointer") {
        const subStructName = stripPrefixes(removePointerPostfix(member.type));
        memberType = `PointerValue<${subStructName}>`;
      } else if (mapTypeToFFIType(enums, structs, opaqueStructs, member.type) === "struct") {
        memberStructName = stripPrefixes(member.type);
        memberType = memberStructName;
        readOp += `${memberStructName}.of(`;
        length = structs[member.type].size;
      }

      lines.push(`\tpublic get ${memberName}(): ${memberType} {`);

      const getMethod = PlatformDataViewGetMethods[mapTypeToFFIType(enums, structs, opaqueStructs, member.type)];

      if (getMethod === undefined) {
        console.error(
          `Failure while generating ${structName}: PlatformDataViewGetMethods is missing ${
            mapTypeToFFIType(enums, structs, opaqueStructs, member.type)
          }.`,
        );
      }

      readOp += `this._view.${getMethod(member.offset, length)}`;

      // FIXME: isEnum expects the type to be prefixed with SDL_ but mapStructMemberType chops it off already.
      if (isEnum(enums, "SDL_" + memberType)) {
        readOp += `as ${memberType}`;
      } else if (memberType === "string") {
        readOp += ")";
      } else if (mapTypeToFFIType(enums, structs, opaqueStructs, member.type) === "struct") {
        readOp += `) as ${memberStructName}`;
      }

      lines.push(`\t\treturn ${readOp};`);

      lines.push("\t}");
      lines.push("");

      if (struct.writable) {
        // TODO: Can we write to pointers / structs?
        if (
          mapTypeToFFIType(enums, structs, opaqueStructs, member.type) === "pointer" ||
          mapTypeToFFIType(enums, structs, opaqueStructs, member.type) === "struct"
        ) {
          continue;
        }

        lines.push(`\tpublic set ${memberName}(value: ${memberType}) {`);

        const setMethod = PlatformDataViewSetMethods[mapTypeToFFIType(enums, structs, opaqueStructs, member.type)];

        if (setMethod === undefined) {
          console.error(
            `PlatformDataViewSetMethods is missing ${mapTypeToFFIType(enums, structs, opaqueStructs, member.type)}.`,
          );
        }

        writeOp += `this._view.${setMethod(member.offset, length)}`;

        // if (mapTypeToFFIType(member.type) === "pointer" || mapTypeToFFIType(member.type) === "struct") {
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

export async function writeSymbols(
  filePath: string,
  functions: CodeGenFunctions,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
): Promise<void> {
  const lines = createLines();

  lines.push(`import { DynamicLibraryInterface } from "../_library.ts";`);
  lines.push("");

  lines.push("export const symbols: DynamicLibraryInterface = {");
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
        `\t\t\t"${mapTypeToFFIType(enums, structs, opaqueStructs, param.type)}", /* ${param.type} ${paramName} */`,
      );
    }

    lines.push("\t\t],");
    lines.push(
      `\t\tresult: "${mapTypeToFFIType(enums, structs, opaqueStructs, func.result.type)}" /* ${func.result.type} */`,
    );
    lines.push("\t},");
  }
  lines.push("} as const;");
  lines.push("");

  await writeLinesToFile(filePath, lines);
}

function isFunctionParamOpaqueStruct(opaqueStructs: CodeGenOpaqueStructs, param: CodeGenFunctionParam): boolean {
  let structName = param.type;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  return opaqueStructs.includes(structName);
}

function isFunctionParamStruct(structs: CodeGenStructs, param: CodeGenFunctionParam): boolean {
  let structName = param.type;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  if (structName === "SDL_Event") {
    return true;
  }

  return Object.keys(structs).includes(structName);
}

function isFunctionParamPointer(param: CodeGenFunctionParam): boolean {
  return param.type.endsWith("*");
}

function isFunctionParamVoidPointer(param: CodeGenFunctionParam): boolean {
  return param.type === "void*";
}

function isFunctionParamDoublePointer(param: CodeGenFunctionParam): boolean {
  return param.type.endsWith("**");
}

function hasDoublePointerParams(func: CodeGenFunction): boolean {
  return Object.values(func.parameters).some(isFunctionParamDoublePointer);
}

function isFunctionParamString(param: CodeGenFunctionParam): boolean {
  return param.type === "char*";
}

function mapFunctionReturnType(
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  param: CodeGenFunctionParam,
): string {
  return mapFunctionParamType(enums, structs, opaqueStructs, param, true);
}

function mapFunctionParamType(
  enums: CodeGenEnums,
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
    let structName = param.type.substring("SDL_".length);

    if (structName.endsWith("**")) {
      structName = structName.slice(0, -2);
      structName = `Box<Pointer<${structName}>>`;
    } else if (structName.endsWith("*")) {
      structName = structName.slice(0, -1);
      if (isReturnType) {
        structName = `${structName}`;
      } else {
        structName = `PointerLike<${structName}>`;
      }
    }

    if (param.nullable) {
      structName += "| null";
    }

    return structName;
  }

  if (isEnum(enums, param.type)) {
    const enumData = enums[param.type];
    return enumData?.prefixToStrip ? stripPrefixes(param.type, enumData.prefixToStrip) : stripPrefixes(param.type);
  }

  let result = "";

  switch (param.type) {
    case "char*":
      result = "string";
      break;

    case "int*":
      result = isReturnType ? "PointerValue<int>" : "PointerLike<int>";
      break;

    case "Uint8*":
      result = isReturnType ? "PointerValue<u8>" : "PointerLike<u8>";
      break;

    case "Uint32*":
      result = isReturnType ? "PointerValue<u32>" : "PointerLike<u32>";
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

  const ffiType = mapTypeToFFIType(enums, structs, opaqueStructs, param.type);
  switch (ffiType) {
    case "pointer":
      throw new Error(`Unable to map param ${JSON.stringify(param)}`);
  }

  if (result === "") {
    result = ffiType;
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

function getReturnTypePostfix(
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  result: CodeGenFunctionResult,
): string {
  return isFunctionParamOpaqueStruct(opaqueStructs, result) || isFunctionParamStruct(structs, result) ? "| null" : "";
}

export async function writeFunctions(
  filePath: string,
  functions: CodeGenFunctions,
  functionImplementations: CodeGenFunctionImplementations,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  imports: string[],
): Promise<void> {
  const lines = createLines();
  lines.push("// deno-lint-ignore-file no-unused-vars");
  lines.push("");

  const enumNames = Object.keys(enums).map((x) => stripPrefixes(x)).join(", ");

  const structNames = Object.entries(structs)
    .filter((x) => !x[1].doNotImport)
    .map((x) => x[0])
    .concat(opaqueStructs)
    .map((x) => stripPrefixes(x))
    .join(", ");

  lines.push(
    `import platform from "../_platform.ts";
import { Box } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f64, i32, int, PointerValue, TypedArray, u32, u64, u8 } from "../types.ts";
import { symbols } from "./_symbols.ts";
`,
  );

  lines.push(`import { ${enumNames} } from "./enums.ts";`);
  lines.push(`import { ${structNames} } from "./structs.ts";`);
  lines.push("");

  lines.push(...imports);
  lines.push("");

  lines.push(`let _library: DynamicLibrary<typeof symbols> = null!;`);
  lines.push("");

  for (const [funcName, func] of Object.entries(functions)) {
    if (functionImplementations[funcName] !== undefined) {
      lines.push(functionImplementations[funcName].trim());
      lines.push("");
      continue;
    }

    for (const overload of func.overloads ?? []) {
      const returnType = mapFunctionReturnType(enums, structs, opaqueStructs, { ...func.result, ...overload.result });

      lines.push(`export function ${stripPrefixes(funcName)}(`);

      for (const [paramName, param] of Object.entries(func.parameters)) {
        lines.push(
          `${paramName}: ${
            mapFunctionParamType(enums, structs, opaqueStructs, { ...param, ...overload?.parameters?.[paramName] })
          },`,
        );
      }

      const returnTypePostfix = getReturnTypePostfix(structs, opaqueStructs, { ...func.result, ...overload.result });

      lines.push(`): ${returnType}${returnTypePostfix};`);
    }

    const returnType = mapFunctionReturnType(enums, structs, opaqueStructs, func.result);

    lines.push(`export function ${stripPrefixes(funcName)}(`);

    for (const [paramName, param] of Object.entries(func.parameters)) {
      lines.push(`${paramName}: ${mapFunctionParamType(enums, structs, opaqueStructs, param)},`);
    }

    const returnTypePostfix = getReturnTypePostfix(structs, opaqueStructs, func.result);

    lines.push(`): ${returnType}${returnTypePostfix} {`);

    let symbolName = funcName;
    if (func.symbolName !== undefined) {
      symbolName = func.symbolName;
    }

    if (returnType !== "void") {
      let returnStatement = "\treturn ";

      if (isFunctionParamString(func.result)) {
        returnStatement += "\t\tplatform.fromNativeString(";
      } else if (
        isFunctionParamOpaqueStruct(opaqueStructs, func.result) ||
        isFunctionParamStruct(structs, func.result)
      ) {
        returnStatement += `\t\t${returnType}.of(`;
      }

      returnStatement += `_library.symbols.${symbolName}(`;
      lines.push(returnStatement);
    } else {
      lines.push(`\t_library.symbols.${symbolName}(`);
    }

    for (const [paramName, param] of Object.entries(func.parameters)) {
      // const paramType = mapFunctionParamType(param);
      if (isFunctionParamString(param)) {
        lines.push(`\t\tplatform.toNativeString(${paramName}),`);
      } else if (isFunctionParamVoidPointer(param)) {
        lines.push(`\t\tPointer.ofTypedArray(${paramName}),`);
      } else if (isFunctionParamDoublePointer(param)) {
        lines.push(`\t\tPointer.ofTypedArray(${paramName}._data),`);
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
