import {
  CodeGenContext,
  CodeGenEnum,
  CodeGenEventType,
  CodeGenFunction,
  CodeGenFunctionParam,
  CodeGenStructMember,
} from "./types.ts";

const PlatformDataViewGetMethods: Record<
  string,
  (offset: number, infoParam: number | string) => string
> = {
  f32: (offset, _) => `getF32(${offset})`,
  f64: (offset, _) => `getF64(${offset})`,
  i8: (offset, _) => `getI8(${offset})`,
  i16: (offset, _) => `getI16(${offset})`,
  i32: (offset, _) => `getI32(${offset})`,
  i64: (offset, _) => `getI64(${offset})`,
  u8: (offset, _) => `getU8(${offset})`,
  u16: (offset, _) => `getU16(${offset})`,
  u32: (offset, _) => `getU32(${offset})`,
  u64: (offset, _) => `getU64(${offset})`,

  function: (offset, name) => `getCallback(${offset}, callbacks["${name}"])`,

  pointer: (offset, _) => `getPointer(${offset})`,

  struct: (offset, length) => `getArray(${length}, ${offset})`,
} as const;

const PlatformDataViewSetMethods: Record<
  string,
  (offset: number, infoParam: number | string) => string
> = {
  f32: (offset, _) => `setF32(${offset}, value)`,
  f64: (offset, _) => `setF64(${offset}, value)`,
  i8: (offset, _) => `setI8(${offset}, value)`,
  i16: (offset, _) => `setI16(${offset}, value)`,
  i32: (offset, _) => `setI32(${offset}, value)`,
  i64: (offset, _) => `setI64(${offset}, value)`,
  u8: (offset, _) => `setU8(${offset}, value)`,
  u16: (offset, _) => `setU16(${offset}, value)`,
  u32: (offset, _) => `setU32(${offset}, value)`,
  u64: (offset, _) => `setU64(${offset}, value)`,

  function: (offset, name) => `setCallback(${offset}, value, callbacks["${name}"])`,

  pointer: (offset, _) => `setPointer(${offset}, value)`,
} as const;

function createLines(): string[] {
  return [
    "// This file is auto generated. To update the file make changes to the code generator.",
    "",
  ];
}

function stripPointerPostfix(name: string): string {
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
  } else if (value.startsWith("TTF_")) {
    value = value.substring("TTF_".length);
  }

  return value;
}

async function writeLinesToFile(path: string, lines: string[]): Promise<void> {
  await Deno.writeTextFile(path, lines.join("\n"));
  await new Deno.Command(Deno.execPath(), { args: ["fmt", path] }).output();
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
  context: CodeGenContext,
  filePath: string,
  imports: string[],
): Promise<void> {
  const lines = createLines();

  lines.push(`// deno-lint-ignore-file no-unused-vars`);
  lines.push("");
  lines.push(`import { Enum, Flags } from "../types.ts";`);
  lines.push(...imports);
  lines.push("");

  for (const [enumName, enumData] of Object.entries(context.enums)) {
    const prefixToStrip = enumData.prefixToStrip ?? enumName.toUpperCase();
    const strippedEnumName = stripPrefixes(enumName);

    lines.push(`export const ${strippedEnumName} = {`);
    for (const key of Object.keys(enumData.values)) {
      let enumValueName = stripPrefixes(key, prefixToStrip);

      if (isDigit(enumValueName[0])) {
        enumValueName = "_" + enumValueName;
      }

      lines.push(
        `\t${enumValueName} = ${mapEnumValue(enumData.values[key], enumData)},`,
      );
    }
    lines.push("} as const;");
    lines.push("");

    if (enumName.endsWith("Flags")) {
      lines.push(
        `export type ${strippedEnumName} = Flags<typeof ${strippedEnumName}, "${strippedEnumName}">;`,
      );
    } else {
      lines.push(
        `export type ${strippedEnumName} = Enum<typeof ${strippedEnumName}>;`,
      );
    }

    lines.push("");
  }

  await writeLinesToFile(filePath, lines);
}

function isEnum(context: CodeGenContext, type: string): boolean {
  for (const [enumGroupName, enumData] of Object.entries(context.enums)) {
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

function isStruct(
  context: CodeGenContext,
  type: string,
): boolean {
  for (const structName of Object.keys(context.structs)) {
    if (structName === type || stripPrefixes(structName) === type) {
      return true;
    }
  }

  for (const structName of context.opaqueStructs) {
    if (structName === type || stripPrefixes(structName) === type) {
      return true;
    }
  }

  return false;
}

function isStructPointer(
  context: CodeGenContext,
  type: string,
): boolean {
  if (!type.endsWith("*")) {
    return false;
  }

  return isStruct(context, stripPointerPostfix(type));
}

function isCallback(context: CodeGenContext, type: string): boolean {
  return Object.keys(context.callbacks).includes(type);
}

function mapTypeToFFIType(
  context: CodeGenContext,
  type: string,
): string {
  if (type.endsWith("*")) {
    return "pointer";
  }

  if (isEnum(context, type)) {
    return "u32";
  }

  if (isStruct(context, type)) {
    const struct = context.structs[type];

    if (!struct) {
      throw new Error(
        `Failed to map "${type}" in ${mapTypeToFFIType.name}. Type seems to be an opaque struct.`,
      );
    }

    const members = Object.values(struct.members)
      .map(
        (member) =>
          `"${
            mapTypeToFFIType(
              context,
              member.type,
            )
          }"`,
      )
      .join(", ");

    return `{ "struct": [ ${members} ] }`;
  }

  if (isCallback(context, type)) {
    return "function";
  }

  if (context.typedefs[type]) {
    type = context.typedefs[type];
  }

  switch (type) {
    case "SDL_bool":
      return "bool";

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

    case "void":
      return "void";
  }

  throw new Error(`Failed to map "${type}" in ${mapTypeToFFIType.name}.`);
}

function mapStructMemberType(
  context: CodeGenContext,
  member: CodeGenStructMember,
): string {
  if (member.overrideType) {
    return member.overrideType;
  }

  if (isCallback(context, member.type)) {
    return stripPrefixes(member.type);
  }

  if (isEnum(context, member.type)) {
    const enumData = context.enums[member.type];
    return enumData?.prefixToStrip ? stripPrefixes(member.type, enumData.prefixToStrip) : stripPrefixes(member.type);
  }

  if (isStruct(context, member.type)) {
    return stripPrefixes(member.type);
  }

  if (isStructPointer(context, member.type)) {
    return `${stripPrefixes(stripPointerPostfix(member.type))}`;
  }

  switch (member.type) {
    case "char*":
      return "string";

    case "void*":
      return "Pointer<void>";
  }

  return stripPrefixes(member.type);
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
  context: CodeGenContext,
): Promise<void> {
  const lines = createLines();

  lines.push(`import Platform from "../_platform.ts";
import { PlatformDataView } from "../_types.ts";
import { EventType, WindowEventID } from "./enums.ts";
import { Keysym } from "./structs.ts";
import { AllocatableStruct, float, int, Pointer, Sint32, Uint8, Uint32 } from "../types.ts";

`);

  const eventPropName = (eventName: string, event: CodeGenEventType) =>
    event.unionName ??
      stripPrefixes(eventName).slice(0, -"Event".length).toLowerCase();

  for (const [eventName, event] of Object.entries(context.events)) {
    const className = stripPrefixes(eventName);
    lines.push(`export class ${className} {`);

    const subStructMembers = Object.entries(event.members).filter((x) => isStruct(context, x[1].type));

    if (subStructMembers.length > 0) {
      for (const [memberName, member] of subStructMembers) {
        lines.push(`private _${memberName}: ${stripPrefixes(member.type)}`);
      }
      lines.push("");
    }

    lines.push(`
  constructor(
      public readonly _data: Uint8Array | Pointer<Event>,
      private _view: PlatformDataView
  ) {`);

    for (const [memberName, member] of subStructMembers) {
      const memberTypeName = stripPrefixes(member.type);

      lines.push(
        `this._${memberName} = ${memberTypeName}.of(this._data, ${member.offset}) as ${memberTypeName};`,
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

      const type = mapStructMemberType(context, member);
      lines.push(`\tpublic get ${memberName}(): ${type} {`);

      if (isStruct(context, member.type)) {
        lines.push(`return this._${memberName};`);
      } else {
        const ffiType = mapTypeToFFIType(context, member.type);

        const PlatformDataViewMethod = PlatformDataViewGetMethods[ffiType];

        if (PlatformDataViewMethod === undefined) {
          console.error(
            `PlatformDataViewMethods is missing "${ffiType}" member "${memberName}".`,
          );
        }

        // FIXME: isEnum expects the type to be prefixed with SDL_ but mapStructMemberType chops it off already.
        const asEnum = isEnum(context, "SDL_" + type) ? ` as ${type}` : "";

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

  lines.push(`export class Event implements AllocatableStruct {
  public static SIZE_IN_BYTES = 64;

  public readonly _data: Uint8Array | Pointer<Event>;
  public readonly _view: PlatformDataView;

`);

  for (const [eventName, event] of Object.entries(context.events)) {
    lines.push(
      `public readonly ${eventPropName(eventName, event)}: ${
        stripPrefixes(
          eventName,
        )
      };`,
    );
  }

  lines.push(`
  constructor(
    data?: Uint8Array | Pointer<Event>,
    byteOffset: number = 0
  ) {
    this._data = data ?? new Uint8Array(Event.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data, byteOffset);
`);

  for (const [eventName, event] of Object.entries(context.events)) {
    lines.push(
      `this.${eventPropName(eventName, event)} = new ${
        stripPrefixes(
          eventName,
        )
      }(this._data, this._view);`,
    );
  }

  lines.push(`
  }

  public static of(
    data: Uint8Array | Pointer<Event> | null,
    byteOffset: number = 0
  ): Event | null {
    return data !== null ? new Event(data, byteOffset) : null;
  }
  
  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

`);

  lines.push("}");
  lines.push("");

  await writeLinesToFile(filePath, lines);
}

export async function writeStructs(
  context: CodeGenContext,
  filePath: string,
  imports: string[],
): Promise<void> {
  const lines = createLines();
  lines.push("// deno-lint-ignore-file no-unused-vars");
  lines.push("");

  lines.push(`import Platform from "../_platform.ts";`);
  lines.push(`import { callbacks } from "./_callbacks.ts";`);
  lines.push(`import { PlatformDataView } from "../_types.ts";`);
  lines.push(`import { isPointer, isTypedArray } from "../_utils.ts";`);
  lines.push(
    `import { AllocatableStruct, Pointer, Struct, double, float, int, Uint8, Uint16, Uint32 } from "../types.ts";`,
  );
  lines.push("");

  if (imports.length > 0) {
    lines.push(...imports);
    lines.push("");
  }

  const callbackNames = Object.entries(context.callbacks)
    .filter(([_, value]) => !value.todo)
    .map(([key, _]) => stripPrefixes(key))
    .join(", ");
  lines.push(`import { ${callbackNames} } from "./callbacks.ts";`);
  lines.push("");

  const enumNames = Object.keys(context.enums)
    .map((x) => stripPrefixes(x))
    .join(", ");
  lines.push(`import { ${enumNames} } from "./enums.ts";`);
  lines.push("");

  lines.push("declare const _: unique symbol;");
  for (const structName of context.opaqueStructs) {
    const className = stripPrefixes(structName);
    lines.push(`export type ${className} = { [_]: "${className}" };`);
  }

  lines.push("");

  for (const [structName, struct] of Object.entries(context.structs)) {
    const className = stripPrefixes(structName);

    const implementsExpression = struct.allocatable ? " implements AllocatableStruct" : " implements Struct";

    lines.push(`export class ${className}${implementsExpression} {
  public static SIZE_IN_BYTES = ${struct.size};
    
`);

    if (struct.allocatable && struct.mutable) {
      lines.push(`public readonly _data: Uint8Array | Pointer<${className}>;
  public readonly _view: PlatformDataView;
      
  constructor();
  constructor(
    data: Uint8Array | Pointer<${className}>,
    byteOffset: number,
  );
  constructor(props: Partial<${className}>);`);

      const constructorParams = Object.entries(struct.members)
        .map(
          ([memberName, member]) =>
            (member.todo ? "// " : "") +
            `${memberName}: ${mapStructMemberType(context, member)}`,
        )
        .join(",\n");
      lines.push(`constructor(${constructorParams});`);

      const firstMemberType = mapStructMemberType(
        context,
        Object.values(struct.members)[0],
      );
      const secondMemberType = mapStructMemberType(context, Object.values(struct.members)[1]);
      const otherMembers = Object.values(struct.members)
        .slice(2)
        .map(
          (member, index) =>
            (member.todo ? "// " : "") +
            `_${index + 3}?: ${mapStructMemberType(context, member)}`,
        )
        .join(",\n");
      lines.push(
        `constructor(
          _1: Uint8Array | Pointer<${className}> | Partial<${className}> | ${firstMemberType} = {},
          _2?: number | ${secondMemberType},
          ${otherMembers}
        ) {`,
      );

      const assignMemmbersFromObject = Object.entries(struct.members)
        .map(
          ([memberName, member]) =>
            (member.todo ? "// " : "") +
            `if (data.${memberName} !== undefined) this.${memberName} = data.${memberName};`,
        )
        .join("\n");

      const assignMemmbersFromParameters = Object.entries(struct.members)
        .map(
          ([memberName, member], index) =>
            (member.todo ? "// " : "") +
            `if (_${index + 1} !== undefined) this.${memberName} = _${index + 1};`,
        )
        .join("\n");

      lines.push(`
    if (isTypedArray(_1) || isPointer<${className}>(_1)) {
      this._data = _1;
      this._view = new Platform.DataView(this._data, _2);
    } else {
      this._data = new Uint8Array(${className}.SIZE_IN_BYTES);
      this._view = new Platform.DataView(this._data, 0);

      if (_1 !== undefined) {
        if (typeof _1 === "object") {
          const data: Partial<${className}> = _1;
          ${assignMemmbersFromObject}
        } else {
          ${assignMemmbersFromParameters}
        }
      }
    }    
  }
`);
    } else if (struct.allocatable && !struct.mutable) {
      lines.push(`public readonly _data: Uint8Array | Pointer<${className}>;
  private readonly _view: PlatformDataView;

  constructor(
    data?: Uint8Array | Pointer<${className}>,
    byteOffset: number = 0,
  ) {
    this._data = data ?? new Uint8Array(${className}.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data, byteOffset);
  }
`);
    } else {
      lines.push(`private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<${className}>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }
`);
    }

    lines.push(`public static of(
      data: Uint8Array | Pointer<${className}> | null,
      byteOffset: number = 0,
    ): ${className} | null {
      return data !== null ? new ${className}(data, byteOffset) : null;
    }

    public get _byteOffset(): number {
      return this._view.byteOffset;
    }
`);

    const structMembers = Object.entries(struct.members);
    structMembers.sort(sortStructMembers);

    for (const [memberName, member] of structMembers) {
      if (member.internal || member.todo) {
        if (member.todo) {
          lines.push(`// TODO: ${member.todo}`);
        }
        lines.push(`// ${memberName}`);
        lines.push("");
        continue;
      }

      const memberFFIType = mapTypeToFFIType(context, member.type);

      const getMethod = isStruct(context, member.type)
        ? PlatformDataViewGetMethods["struct"]
        : PlatformDataViewGetMethods[memberFFIType];

      if (getMethod === undefined) {
        console.error(
          `Failure while generating "${structName}" member "${memberName}": PlatformDataViewGetMethods is missing ${memberFFIType}.`,
        );
        lines.push(`// ERROR: ${memberName}`);
        lines.push("");
        continue;
      }

      let readOp = "";
      let writeOp = "";
      let lengthOrName: number | string = 0;
      let memberType = mapStructMemberType(context, member);
      let memberStructName = "";

      if (isCallback(context, member.type)) {
        lengthOrName = member.type;
      } else if (memberType === "string") {
        readOp += `Platform.fromPlatformString(Platform.toPlatformPointer(`;
      } else if (isStructPointer(context, member.type)) {
        memberStructName = stripPrefixes(stripPointerPostfix(member.type));
        memberType = memberStructName;
        readOp += `${memberStructName}.of(`;
      } else if (memberFFIType === "pointer") {
        const subStructName = stripPrefixes(stripPointerPostfix(member.type));
        memberType = `Pointer<${subStructName}>`;
      } else if (isStruct(context, member.type)) {
        memberStructName = stripPrefixes(member.type);
        memberType = memberStructName;
        readOp += `${memberStructName}.of(`;
        lengthOrName = context.structs[member.type].size;
      }

      lines.push(`\tpublic get ${memberName}(): ${memberType} {`);

      readOp += `this._view.${getMethod(member.offset, lengthOrName)}`;

      if (isEnum(context, member.type)) {
        readOp += `as ${memberType}`;
      } else if (memberType === "string") {
        readOp += ")!)";
      } else if (isStruct(context, member.type)) {
        readOp += `) as ${memberStructName}`;
      } else if (isStructPointer(context, member.type)) {
        readOp += `) as ${memberStructName}`;
      }

      lines.push(`\t\treturn ${readOp};`);

      lines.push("\t}");
      lines.push("");

      if (struct.mutable) {
        // TODO: Can we write to structs?
        if (memberFFIType === "struct") {
          continue;
        }

        lines.push(`\tpublic set ${memberName}(value: ${memberType}) {`);

        const setMethod = PlatformDataViewSetMethods[memberFFIType];

        if (setMethod === undefined) {
          console.error(
            `PlatformDataViewSetMethods is missing ${memberFFIType}.`,
          );
        }

        writeOp += `this._view.${setMethod(member.offset, lengthOrName)}`;

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

export function writeSymbolParametersAndResult(
  context: CodeGenContext,
  lines: string[],
  symbol: Pick<CodeGenFunction, "parameters" | "result">,
): void {
  lines.push(`\t\tparameters: [`);

  for (const paramName of Object.keys(symbol.parameters)) {
    const param = symbol.parameters[paramName];
    const ffiType = mapTypeToFFIType(context, param.type);
    let line = `\t\t\t/* ${param.type} ${paramName} */ `;

    if (ffiType.startsWith("{")) {
      line += `${ffiType},`;
    } else {
      line += `"${ffiType}",`;
    }

    lines.push(line);
  }

  lines.push("\t\t],");

  const resultFFIType = mapTypeToFFIType(context, symbol.result.type);
  let resultLine = `\t\tresult: /* ${symbol.result.type} */ `;

  if (resultFFIType.startsWith("{")) {
    resultLine += resultFFIType;
  } else {
    resultLine += `"${resultFFIType}"`;
  }

  lines.push(resultLine + ",");
}

export async function writeSymbols(
  context: CodeGenContext,
  filePath: string,
): Promise<void> {
  const lines = createLines();

  lines.push("export const symbols = {");
  for (const [funcName, func] of Object.entries(context.functions)) {
    if (func.todo) {
      lines.push(`// TODO: ${func.todo}`);
      lines.push(`// ${funcName}`);
      continue;
    }

    if (func.symbolName !== undefined) {
      lines.push(`\t/* ${funcName} */ ${func.symbolName}: {`);
    } else {
      lines.push(`\t${funcName}: {`);
    }

    writeSymbolParametersAndResult(
      context,
      lines,
      func,
    );

    lines.push("\t},");
  }
  lines.push("} as const;");
  lines.push("");

  await writeLinesToFile(filePath, lines);
}

function isFunctionParamCallback(
  context: CodeGenContext,
  param: CodeGenFunctionParam,
): boolean {
  let callbackName = param.type;

  while (callbackName.endsWith("*")) {
    callbackName = callbackName.slice(0, -1);
  }

  return Object.keys(context.callbacks).includes(callbackName);
}

function isFunctionParamOpaqueStruct(
  context: CodeGenContext,
  param: CodeGenFunctionParam,
): boolean {
  let structName = param.type;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  return context.opaqueStructs.includes(structName);
}

function isFunctionParamStruct(
  context: CodeGenContext,
  param: CodeGenFunctionParam,
): boolean {
  let structName = param.type;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  if (structName === "SDL_Event") {
    return true;
  }

  return Object.keys(context.structs).includes(structName);
}

function isFunctionParamStructByValue(
  context: CodeGenContext,
  param: CodeGenFunctionParam,
): boolean {
  if (!isFunctionParamStruct(context, param)) {
    return false;
  }

  return !param.type.endsWith("*");
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

function isFunctionParamString(param: CodeGenFunctionParam): boolean {
  return param.type === "char*";
}

function isFunctionParamBigInt(param: CodeGenFunctionParam): boolean {
  return ["Uint64"].includes(param.type);
}

function mapFunctionReturnType(
  context: CodeGenContext,
  param: CodeGenFunctionParam,
): string {
  return mapFunctionParamType(
    context,
    param,
    true,
  );
}

function mapFunctionReturnTypeFromOutputParam(
  context: CodeGenContext,
  param: CodeGenFunctionParam,
): string {
  let result = mapFunctionParamType(
    context,
    param,
    true,
  );

  if (result.startsWith("Box<") || result.startsWith("Pointer<")) {
    result = getGenericParam(result);
  }

  return result;
}

function mapFunctionParamType(
  context: CodeGenContext,
  param: CodeGenFunctionParam,
  isReturnType = false,
): string {
  if (param.overrideType) {
    if (param.isNullable) {
      return param.overrideType + "| null";
    }

    return param.overrideType;
  }

  if (isFunctionParamCallback(context, param)) {
    return stripPrefixes(param.type);
  }

  if (
    isFunctionParamOpaqueStruct(context, param) ||
    isFunctionParamStruct(context, param)
  ) {
    let structName = param.type.substring("SDL_".length);

    if (isFunctionParamOpaqueStruct(context, param)) {
      if (structName.endsWith("**")) {
        structName = `Box<Pointer<${stripPointerPostfix(structName)}>>`;
      } else {
        structName = `Pointer<${stripPointerPostfix(structName)}>`;
      }
    } else {
      if (structName.endsWith("**")) {
        structName = `Box<Pointer<${stripPointerPostfix(structName)}>>`;
      } else if (structName.endsWith("*")) {
        structName = stripPointerPostfix(structName);
        if (isReturnType) {
          structName = `${structName}`;
        } else {
          structName = `PointerLike<${structName}>`;
        }
      }
    }

    if (param.isNullable) {
      structName += "| null";
    }

    return structName;
  }

  if (isEnum(context, param.type)) {
    const enumData = context.enums[param.type];
    return enumData?.prefixToStrip ? stripPrefixes(param.type, enumData.prefixToStrip) : stripPrefixes(param.type);
  }

  if (
    param.type.endsWith("*") &&
    isEnum(context, param.type.substring(0, param.type.length - 1))
  ) {
    const enumName = param.type.substring(0, param.type.length - 1);
    const enumData = context.enums[enumName];
    const result = enumData?.prefixToStrip ? stripPrefixes(enumName, enumData.prefixToStrip) : stripPrefixes(enumName);
    return isReturnType ? `PointerValue<${result}>` : `PointerLike<${result}>`;
  }

  let type = param.type;

  if (context.typedefs[type]) {
    type = context.typedefs[type];
  }

  switch (param.type) {
    case "SDL_AudioDeviceID":
      return "Uint32";

    case "SDL_AudioFormat":
      return "Uint16";

    case "SDL_TimerID":
      return "int";

    case "SDL_bool":
      type = "boolean";
      break;

    case "char*":
      type = "string";
      break;

    case "float*":
      type = isReturnType ? "Pointer<float>" : "PointerLike<float>";
      break;

    case "int*":
      type = isReturnType ? "Pointer<int>" : "PointerLike<int>";
      break;

    case "size_t*":
      // TODO: There should probably be a size and usize type.
      type = isReturnType ? "Pointer<int>" : "PointerLike<int>";
      break;

    case "Uint8*":
      type = isReturnType ? "Pointer<Uint8>" : "PointerLike<Uint8>";
      break;

    case "Uint8**":
      type = isReturnType ? "Pointer<Pointer<Uint8>>" : "Box<Pointer<Uint8>>";
      break;

    case "Uint16*":
      type = isReturnType ? "Pointer<Uint16>" : "PointerLike<Uint16>";
      break;

    case "Uint32*":
      type = isReturnType ? "Pointer<Uint32>" : "PointerLike<Uint32>";
      break;

    case "void*":
      type = isReturnType ? "Pointer<unknown>" : "PointerLike<unknown>";
      break;
  }

  if (param.isNullable) {
    type += "| null";
  }

  return type;
}

function getGenericParam(type: string): string {
  const startIndex = type.indexOf("<");
  const endIndex = type.lastIndexOf(">");
  if (startIndex === -1 || endIndex === -1) {
    return "";
  }
  return type.substring(startIndex + 1, endIndex);
}

function getFunctionReturnTypePostfix(
  context: CodeGenContext,
  func: CodeGenFunction,
): string {
  return (isFunctionParamOpaqueStruct(context, func.result) ||
      isFunctionParamStruct(context, func.result)) &&
      !func.checkForError
    ? "| null"
    : "";
}

function writeImportAllStructs(
  context: CodeGenContext,
  lines: string[],
): void {
  const structNames = Object.entries(context.structs)
    .filter((x) => !x[1].doNotImport)
    .map((x) => x[0])
    .concat(context.opaqueStructs)
    .map((x) => stripPrefixes(x))
    .join(", ");

  lines.push(`import { ${structNames} } from "./structs.ts";`);
}

function writeImportAllCallbacks(
  context: CodeGenContext,
  lines: string[],
): void {
  lines.push(
    `import { ${
      Object.entries(context.callbacks)
        .filter(([_, value]) => !value.todo)
        .map(([key, _]) => stripPrefixes(key))
        .join(", ")
    } } from "./callbacks.ts";`,
  );
}

export async function writeCallbacksSymbols(
  context: CodeGenContext,
  filePath: string,
  imports: string[],
): Promise<void> {
  const lines = createLines();
  lines.push(`// deno-lint-ignore-file no-unused-vars
  
import Platform from "../_platform.ts";
import { PlatformPointer } from "../_types.ts";
import { Event } from "./events.ts";
import { int, Uint8 } from "../types.ts";
`);

  writeImportAllCallbacks(context, lines);
  writeImportAllStructs(context, lines);
  lines.push("");

  if (imports.length > 0) {
    lines.push(...imports);
    lines.push("");
  }

  lines.push("export const callbacks = {");

  for (const [callbackName, callback] of Object.entries(context.callbacks)) {
    if (callback.todo) {
      lines.push(`// TODO: ${callback.todo}`);
      lines.push(`// ${callbackName}`);
      lines.push("");
      continue;
    }

    lines.push(`\t${callbackName}: {`);

    writeSymbolParametersAndResult(context, lines, callback);

    const returnType = mapFunctionReturnType(context, callback.result);
    lines.push(`\t\twrap: (callback: ${stripPrefixes(callbackName)}) => {`);

    let platformParams = "";
    for (const [paramName, param] of Object.entries(callback.parameters)) {
      platformParams += `${paramName}: `;
      const paramType = mapFunctionParamType(context, param);

      if (isFunctionParamString(param)) {
        platformParams += "PlatformString";
      } else if (isFunctionParamVoidPointer(param)) {
        platformParams += `PlatformPointer<unknown>`;
      } else if (isFunctionParamPointer(param)) {
        platformParams += paramType.replaceAll(
          "PointerLike",
          "PlatformPointer",
        );
      } else {
        platformParams += paramType;
      }

      platformParams += ",";
    }

    if (platformParams.endsWith(",")) {
      platformParams = platformParams.slice(0, -1);
    }

    lines.push(`\t\treturn (${platformParams}): ${returnType} => {`);

    lines.push(`\t\t\t\treturn callback(`);

    for (const [paramName, param] of Object.entries(callback.parameters)) {
      const paramType = mapFunctionParamType(context, param);

      if (isFunctionParamString(param)) {
        lines.push(`\t\tPlatform.fromPlatformString(${paramName})`);
      } else if (
        isFunctionParamOpaqueStruct(context, param) ||
        isFunctionParamStruct(context, param)
      ) {
        lines.push(
          `\t\t${
            getGenericParam(
              paramType,
            )
          }.of(Platform.fromPlatformPointer(${paramName}))`,
        );
      } else if (isFunctionParamPointer(param)) {
        lines.push(`\t\tPlatform.fromPlatformPointer(${paramName})`);
      } else {
        lines.push(`\t\t${paramName}`);
      }

      lines[lines.length - 1] += "!,";
    }

    lines.push(`\t\t\t\t);`);
    lines.push("\t\t\t};");
    lines.push("\t\t},");
    lines.push("\t},");
  }

  lines.push("} as const;");
  await writeLinesToFile(filePath, lines);
}

export async function writeCallbacks(
  context: CodeGenContext,
  filePath: string,
  imports: string[],
): Promise<void> {
  const lines = createLines();
  lines.push(`// deno-lint-ignore-file no-unused-vars

import { Callback, int, Pointer, Uint8 } from "../types.ts";
import { Event } from "./events.ts";
`);

  lines.push(...imports);
  lines.push("");

  for (const [callbackName, callback] of Object.entries(context.callbacks)) {
    if (callback.todo) {
      lines.push(`// TODO: ${callback.todo}`);
      lines.push(`// ${callbackName}`);
      lines.push("");
      continue;
    }

    lines.push(`export type ${stripPrefixes(callbackName)} = (`);

    lines.push("(");
    for (const [paramName, param] of Object.entries(callback.parameters)) {
      let paramType = mapFunctionParamType(context, param);

      if (
        isFunctionParamOpaqueStruct(context, param) ||
        isFunctionParamStruct(context, param)
      ) {
        paramType = getGenericParam(paramType);
      } else {
        paramType = paramType.replace("PointerLike<", "Pointer<");
      }

      lines.push(`${paramName}: ${paramType},`);
    }

    const returnType = mapFunctionReturnType(context, callback.result);
    lines.push(`) => ${returnType}`);

    lines.push(") & Callback;");
    lines.push("");
  }

  await writeLinesToFile(filePath, lines);
}

export async function writeFunctions(
  context: CodeGenContext,
  filePath: string,
  imports: string[],
): Promise<void> {
  const lines = createLines();
  lines.push(`// deno-lint-ignore-file no-unused-vars
  
import Platform from "../_platform.ts";
import { callbacks } from "./_callbacks.ts";
import { getSymbolsFromFunctions } from "../_init.ts";
import { DynamicLibrary } from "../_library.ts";
import { symbols } from "./_symbols.ts";
import { PlatformPointer } from "../_types.ts";
import { Box } from "../_boxes.ts";
import { SDLError } from "../error.ts";
import { InitOptions, double, float, int, Pointer, PointerLike, Uint8, Uint16, Uint32, Uint64 } from "../types.ts";
`);

  writeImportAllCallbacks(context, lines);

  const enumNames = Object.keys(context.enums)
    .map((x) => stripPrefixes(x))
    .join(", ");
  lines.push(`import { ${enumNames} } from "./enums.ts";`);

  // TODO: This is a hack as there is currently no way to attach metadata to opaqueStruct(s).
  let opaqueStructsToImport = [...context.opaqueStructs];
  if (context.libraryName === "SDL2_image") {
    opaqueStructsToImport = opaqueStructsToImport.filter((x) => x.startsWith("IMG_"));
  }

  writeImportAllStructs({ ...context, opaqueStructs: opaqueStructsToImport }, lines);

  lines.push("");

  lines.push(...imports);
  lines.push("");

  lines.push(`let _library: DynamicLibrary<typeof symbols> = null!;`);
  lines.push("");

  for (const [funcName, func] of Object.entries(context.functions)) {
    if (func.todo) {
      lines.push(`// TODO: ${func.todo}`);
      lines.push(`// ${funcName}`);
      lines.push("");
      continue;
    }

    if (func.implementation) {
      lines.push(func.implementation);
      writeFunctionSymbolName(lines, funcName, func);
      lines.push("");
      continue;
    }

    if (funcName.endsWith("_Init")) {
      writeInitFunction(context, lines, funcName, func);
    } else if (funcName.endsWith("_Quit")) {
      writeQuitFunction(lines, funcName);
    } else {
      for (const overload of func.overloads ?? []) {
        const returnType = mapFunctionReturnType(context, {
          ...func.result,
          ...overload.result,
        });

        lines.push(`export function ${stripPrefixes(funcName)}(`);

        for (
          const [paramName, param] of Object.entries(func.parameters).filter(
            ([_, param]) => !param.isOutput,
          )
        ) {
          lines.push(
            `${paramName}: ${
              mapFunctionParamType(context, {
                ...param,
                ...overload?.parameters?.[paramName],
              })
            },`,
          );
        }

        const returnTypePostfix = getFunctionReturnTypePostfix(
          context,
          {
            ...func,
            result: {
              ...func.result,
              ...overload,
            },
          },
        );

        lines.push(`): ${returnType}${returnTypePostfix};`);
      }

      const symbolReturnType = mapFunctionReturnType(context, func.result);

      const outputParams = Object.entries(func.parameters).filter(
        ([_, param]) => param.isOutput,
      );

      const originalReturnType = mapFunctionReturnType(context, func.result);
      let returnType = originalReturnType;

      if (outputParams.length === 1) {
        const outputParam = mapFunctionReturnTypeFromOutputParam(context, outputParams[0][1]);

        if (func.result.isOutput) {
          returnType = "[" + returnType + ", " + outputParam + "]";
        } else {
          returnType = outputParam;
        }
      } else if (outputParams.length > 1) {
        returnType = "[" +
          (func.result.isOutput ? returnType + ", " : "") +
          outputParams
            .map(([_, outputParam]) => mapFunctionReturnTypeFromOutputParam(context, outputParam))
            .join(", ") +
          "]";
      }

      if (func.checkForError && returnType === "i32") {
        returnType = "void";
      }

      lines.push(`export function ${stripPrefixes(funcName)}(`);

      for (
        const [paramName, param] of Object.entries(func.parameters).filter(
          ([_, param]) => !param.isOutput,
        )
      ) {
        lines.push(
          `${paramName}: ${mapFunctionParamType(context, param)},`,
        );
      }

      const returnTypePostfix = getFunctionReturnTypePostfix(context, func);

      lines.push(`): ${returnType}${returnTypePostfix} {`);

      const symbolName = func.symbolName ?? funcName;

      for (const [paramName, param] of outputParams) {
        let paramType = mapFunctionReturnTypeFromOutputParam(context, param);

        let paramConstructorArgs = "";

        if (!isStruct(context, paramType)) {
          paramConstructorArgs = paramType;
          if (paramType.startsWith("Pointer<")) {
            paramConstructorArgs = "Pointer";
          }

          paramType = `Box<${paramType}>`;
        }

        lines.push(
          `const ${paramName} = new ${paramType}(${paramConstructorArgs});`,
        );
      }

      if (symbolReturnType !== "void") {
        let resultStatement = "\tconst _result = ";

        if (isFunctionParamBigInt(func.result)) {
          resultStatement += "\t\tBigInt(";
        } else if (isFunctionParamString(func.result)) {
          resultStatement += "\t\tPlatform.fromPlatformString(";
        } else if (isFunctionParamStruct(context, func.result)) {
          resultStatement += `\t\t${symbolReturnType}.of(Platform.fromPlatformPointer(`;
        } else if (isFunctionParamPointer(func.result)) {
          resultStatement += `\t\tPlatform.fromPlatformPointer(`;
        }

        resultStatement += `_library.symbols.${symbolName}(`;

        lines.push(resultStatement);
      } else {
        lines.push(`\t_library.symbols.${symbolName}(`);
      }

      for (const [paramName, param] of Object.entries(func.parameters)) {
        if (isFunctionParamString(param)) {
          lines.push(`\t\tPlatform.toPlatformString(${paramName}),`);
        } else if (isFunctionParamVoidPointer(param)) {
          lines.push(
            `\t\tPlatform.toPlatformPointer(${paramName}),`,
          );
        } else if (isFunctionParamDoublePointer(param)) {
          lines.push(
            `\t\tPlatform.toPlatformPointer(${paramName}._data),`,
          );
        } else if (isFunctionParamCallback(context, param)) {
          lines.push(
            `\t\tPlatform.toPlatformCallback(${paramName}, callbacks["${param.type}"]),`,
          );
        } else if (isFunctionParamStructByValue(context, param)) {
          lines.push(
            `\t\tPlatform.toPlatformStruct(${paramName}, ${
              stripPrefixes(
                param.type,
              )
            }),`,
          );
        } else if (
          isFunctionParamPointer(param) ||
          isFunctionParamOpaqueStruct(context, param) ||
          isFunctionParamStruct(context, param)
        ) {
          lines.push(
            `\t\tPlatform.toPlatformPointer(${paramName}),`,
          );
        } else {
          lines.push(`\t\t${paramName},`);
        }
      }

      if (symbolReturnType !== "void") {
        if (isFunctionParamBigInt(func.result)) {
          lines.push("\t) as bigint | number);");
        } else if (symbolReturnType === "string") {
          lines.push(`\t) as PlatformPointer<unknown>);`);
        } else if (isFunctionParamOpaqueStruct(context, func.result)) {
          lines.push(`\t) as PlatformPointer<${originalReturnType}>);`);
        } else if (isFunctionParamStruct(context, func.result)) {
          lines.push(`\t) as PlatformPointer<${originalReturnType}>));`);
        } else if (isFunctionParamPointer(func.result)) {
          const nonNullAssertion = !func.result.nullable ? "!" : "";
          lines.push(
            `\t) as PlatformPointer<${getGenericParam(originalReturnType)}>)${nonNullAssertion};`,
          );
        } else if (symbolReturnType === "bigint") {
          lines.push(`\t) as unknown as ${symbolReturnType};`);
        } else {
          lines.push(`\t) as ${symbolReturnType};`);
        }

        if (func.checkForError) {
          if (isFunctionParamPointer(func.result)) {
            lines.push(`\tif (_result === null) {`);
          } else {
            lines.push(`\tif (_result < 0) {`);
          }

          lines.push(`\t\tthrow new SDLError(GetError());`);
          lines.push("\t}");
        }

        // returnType will be set to void if checkForErrors is true and only the error code
        // would have been returned.
        if (returnType !== "void") {
          if (outputParams.length === 0) {
            lines.push("return _result;");
          } else if (outputParams.length === 1) {
            if (func.result.isOutput) {
              lines.push(`return [_result, ${outputParams[0][0]}];`);
            } else {
              lines.push(`return ${outputParams[0][0]};`);
            }
          } else {
            const outputParamNames = outputParams
              .map(([paramName, _]) => `${paramName}.value`)
              .join(", ");

            if (func.result.isOutput) {
              lines.push(`return [_result, ${outputParamNames}];`);
            } else {
              lines.push(`return [${outputParamNames}];`);
            }
          }
        }
      } else {
        lines.push(`\t);`);
      }

      lines.push("}");
    }

    writeFunctionSymbolName(lines, funcName, func);
    lines.push("");
  }

  await writeLinesToFile(filePath, lines);
}

function writeFunctionSymbolName(
  lines: string[],
  funcName: string,
  func: CodeGenFunction,
): void {
  lines.push(
    `${stripPrefixes(funcName)}.symbolName = "${func.symbolName ? func.symbolName : funcName}";`,
  );
}

function writeInitFunction(
  context: CodeGenContext,
  lines: string[],
  funcName: string,
  func: CodeGenFunction,
): void {
  if (Object.values(func.parameters).length >= 1) {
    lines.push(`export function Init(flags: InitFlags, options?: InitOptions): void;
export function Init(flags: number, options?: InitOptions): void;
export function Init(flags: InitFlags | number, options?: InitOptions): void {`);
  } else {
    lines.push(`export function Init(options?: InitOptions): void {`);
  }

  lines.push(
    `const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
      _library = Platform.loadLibrary("${context.libraryName}", symbolsToLoad, options?.libraryPath);`,
  );

  if (Object.values(func.parameters).length >= 1) {
    lines.push(
      `\tconst _result = _library.symbols.${funcName}(flags) as number;`,
    );
  } else {
    lines.push(`\tconst _result = _library.symbols.${funcName}() as number;`);
  }

  lines.push(`\tif (_result < 0) {`);
  lines.push(`\t\tthrow new SDLError(GetError());`);
  lines.push("\t}");

  lines.push("}");
}

function writeQuitFunction(lines: string[], funcName: string): void {
  lines.push(`export function Quit(): void {
    _library.symbols.${funcName}();
    _library.close();
  }`);
}
