import {
  CodeGenCallbacks,
  CodeGenEnum,
  CodeGenEnums,
  CodeGenEvents,
  CodeGenEventType,
  CodeGenFunction,
  CodeGenFunctionParam,
  CodeGenFunctionResult,
  CodeGenFunctions,
  CodeGenOpaqueStructs,
  CodeGenStructMember,
  CodeGenStructs,
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

  function: (offset, name) =>
    `setCallback(${offset}, value, callbacks["${name}"])`,

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
  filePath: string,
  enums: CodeGenEnums,
  imports: string[]
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

      lines.push(
        `\t${enumValueName} = ${mapEnumValue(enumData.values[key], enumData)},`
      );
    }
    lines.push("} as const;");
    lines.push("");

    if (enumName.endsWith("Flags")) {
      lines.push(
        `export type ${strippedEnumName} = Flags<typeof ${strippedEnumName}, "${strippedEnumName}">;`
      );
    } else {
      lines.push(
        `export type ${strippedEnumName} = Enum<typeof ${strippedEnumName}>;`
      );
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

function isStruct(
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  type: string
): boolean {
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

function isStructPointer(
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  type: string
): boolean {
  if (!type.endsWith("*")) {
    return false;
  }

  return isStruct(structs, opaqueStructs, stripPointerPostfix(type));
}

function isCallback(callbacks: CodeGenCallbacks, type: string): boolean {
  return Object.keys(callbacks).includes(type);
}

function mapTypeToFFIType(
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  type: string
): string {
  if (type.endsWith("*")) {
    return "pointer";
  }

  if (isEnum(enums, type)) {
    return "u32";
  }

  if (isStruct(structs, opaqueStructs, type)) {
    const struct = structs[type];

    if (!struct) {
      throw new Error(
        `Failed to map "${type}" in ${mapTypeToFFIType.name}. Type seems to be an opaque struct.`
      );
    }

    const members = Object.values(struct.members)
      .map(
        (member) =>
          `"${mapTypeToFFIType(
            callbacks,
            enums,
            structs,
            opaqueStructs,
            member.type
          )}"`
      )
      .join(", ");

    return `{ "struct": [ ${members} ] }`;
  }

  if (isCallback(callbacks, type)) {
    return "function";
  }

  switch (type) {
    case "SDL_AudioDeviceID":
      return "u32";

    case "SDL_AudioFormat":
      return "u16";

    case "SDL_bool":
      return "bool";

    case "SDL_TimerID":
      return "i32";

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
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  member: CodeGenStructMember
): string {
  if (member.overrideType) {
    return member.overrideType;
  }

  if (isCallback(callbacks, member.type)) {
    return stripPrefixes(member.type);
  }

  if (isEnum(enums, member.type)) {
    const enumData = enums[member.type];
    return enumData?.prefixToStrip
      ? stripPrefixes(member.type, enumData.prefixToStrip)
      : stripPrefixes(member.type);
  }

  if (isStruct(structs, opaqueStructs, member.type)) {
    return stripPrefixes(member.type);
  }

  if (isStructPointer(structs, opaqueStructs, member.type)) {
    return `${stripPrefixes(stripPointerPostfix(member.type))}`;
  }

  switch (member.type) {
    case "char*":
      return "string";

    case "void*":
      return "Pointer<void>";
  }

  return mapTypeToFFIType(
    callbacks,
    enums,
    structs,
    opaqueStructs,
    member.type
  );
}

function sortStructMembers(
  a: [string, { type: string; offset: number }],
  b: [string, { type: string; offset: number }]
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
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs
): Promise<void> {
  const lines = createLines();

  lines.push(`import Platform from "../_platform.ts";
import { PlatformDataView } from "../_types.ts";
import { EventType, WindowEventID } from "./enums.ts";
import { Keysym } from "./structs.ts";
import { AllocatableStruct, f32, i32, u32, u8 } from "../types.ts";
import { Pointer } from "../pointers.ts";

`);

  const eventPropName = (eventName: string, event: CodeGenEventType) =>
    event.unionName ??
    stripPrefixes(eventName).slice(0, -"Event".length).toLowerCase();

  for (const [eventName, event] of Object.entries(events)) {
    const className = stripPrefixes(eventName);
    lines.push(`export class ${className} {`);

    const subStructMembers = Object.entries(event.members).filter((x) =>
      isStruct(structs, opaqueStructs, x[1].type)
    );

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
        `this._${memberName} = ${memberTypeName}.of(this._data, ${member.offset}) as ${memberTypeName};`
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

      const type = mapStructMemberType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        member
      );
      lines.push(`\tpublic get ${memberName}(): ${type} {`);

      if (isStruct(structs, opaqueStructs, member.type)) {
        lines.push(`return this._${memberName};`);
      } else {
        const ffiType = mapTypeToFFIType(
          callbacks,
          enums,
          structs,
          opaqueStructs,
          member.type
        );

        const PlatformDataViewMethod = PlatformDataViewGetMethods[ffiType];

        if (PlatformDataViewMethod === undefined) {
          console.error(
            `PlatformDataViewMethods is missing "${ffiType}" member "${memberName}".`
          );
        }

        // FIXME: isEnum expects the type to be prefixed with SDL_ but mapStructMemberType chops it off already.
        const asEnum = isEnum(enums, "SDL_" + type) ? ` as ${type}` : "";

        const length = 0;
        lines.push(
          `\t\treturn this._view.${PlatformDataViewGetMethods[ffiType](
            member.offset,
            length
          )}${asEnum};`
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

  for (const [eventName, event] of Object.entries(events)) {
    lines.push(
      `public readonly ${eventPropName(eventName, event)}: ${stripPrefixes(
        eventName
      )};`
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

  for (const [eventName, event] of Object.entries(events)) {
    lines.push(
      `this.${eventPropName(eventName, event)} = new ${stripPrefixes(
        eventName
      )}(this._data, this._view);`
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
  filePath: string,
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs
): Promise<void> {
  const lines = createLines();
  lines.push("// deno-lint-ignore-file no-unused-vars");
  lines.push("");

  lines.push(`import Platform from "../_platform.ts";`);
  lines.push(`import { callbacks } from "./_callbacks.ts";`);
  lines.push(`import { PlatformDataView } from "../_types.ts";`);
  lines.push(`import { isTypedArray } from "../_utils.ts";`);
  lines.push(`import { Pointer } from "../pointers.ts";`);
  lines.push(
    `import { AllocatableStruct, f32, f64, i16, i32, i64, i8, Struct, u16, u32, u64, u8 } from "../types.ts";`
  );
  lines.push("");

  const callbackNames = Object.entries(callbacks)
    .filter(([_, value]) => !value.todo)
    .map(([key, _]) => stripPrefixes(key))
    .join(", ");
  lines.push(`import { ${callbackNames} } from "./callbacks.ts";`);
  lines.push("");

  const enumNames = Object.keys(enums)
    .map((x) => stripPrefixes(x))
    .join(", ");
  lines.push(`import { ${enumNames} } from "./enums.ts";`);
  lines.push("");

  for (const structName of opaqueStructs) {
    const className = stripPrefixes(structName);
    lines.push(`export class ${className} implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<${className}>,
    byteOffset: number = 0
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Pointer<${className}> | null,
    byteOffset: number = 0
  ): ${className} | null {
    return data !== null ? new ${className}(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }
}
`);
  }

  lines.push("");

  for (const [structName, struct] of Object.entries(structs)) {
    const className = stripPrefixes(structName);

    const implementsExpression = struct.allocatable
      ? " implements AllocatableStruct"
      : " implements Struct";

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
            `${memberName}: ${mapStructMemberType(
              callbacks,
              enums,
              structs,
              opaqueStructs,
              member
            )}`
        )
        .join(",\n");
      lines.push(`constructor(${constructorParams});`);

      const firstMemberType = mapStructMemberType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        Object.values(struct.members)[0]
      );
      const secondMemberType = mapStructMemberType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        Object.values(struct.members)[1]
      );
      const otherMembers = Object.values(struct.members)
        .slice(2)
        .map(
          (member, index) =>
            (member.todo ? "// " : "") +
            `_${index + 3}?: ${mapStructMemberType(
              callbacks,
              enums,
              structs,
              opaqueStructs,
              member
            )}`
        )
        .join(",\n");
      lines.push(
        `constructor(
          _1: Uint8Array | Pointer<${className}> | Partial<${className}> | ${firstMemberType} = {},
          _2?: number | ${secondMemberType},
          ${otherMembers}
        ) {`
      );

      const assignMemmbersFromObject = Object.entries(struct.members)
        .map(
          ([memberName, member]) =>
            (member.todo ? "// " : "") +
            `if (_1.${memberName} !== undefined) this.${memberName} = _1.${memberName};`
        )
        .join("\n");

      const assignMemmbersFromParameters = Object.entries(struct.members)
        .map(
          ([memberName, member], index) =>
            (member.todo ? "// " : "") +
            `if (_${index + 1} !== undefined) this.${memberName} = _${
              index + 1
            };`
        )
        .join("\n");

      lines.push(`
    const dataPassedIn = isTypedArray(_1) || Pointer.isPointer(_1);
    if (dataPassedIn) {
      this._data = _1;
      this._view = new Platform.DataView(this._data, _2);
    } else {
      this._data = new Uint8Array(${className}.SIZE_IN_BYTES);
      this._view = new Platform.DataView(this._data, 0);
    }
    
    if (!dataPassedIn && _1 !== undefined) {
      if (typeof _1 === "object") {
        ${assignMemmbersFromObject}
      } else {
        ${assignMemmbersFromParameters}
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

      const memberFFIType = mapTypeToFFIType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        member.type
      );

      const getMethod = isStruct(structs, opaqueStructs, member.type)
        ? PlatformDataViewGetMethods["struct"]
        : PlatformDataViewGetMethods[memberFFIType];

      if (getMethod === undefined) {
        console.error(
          `Failure while generating "${structName}" member "${memberName}": PlatformDataViewGetMethods is missing ${memberFFIType}.`
        );
        lines.push(`// ERROR: ${memberName}`);
        lines.push("");
        continue;
      }

      let readOp = "";
      let writeOp = "";
      let lengthOrName: number | string = 0;
      let memberType = mapStructMemberType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        member
      );
      let memberStructName = "";

      if (isCallback(callbacks, member.type)) {
        lengthOrName = member.type;
      } else if (memberType === "string") {
        readOp += `Platform.fromPlatformString(Platform.toPlatformPointer(`;
      } else if (isStructPointer(structs, opaqueStructs, member.type)) {
        memberStructName = stripPrefixes(stripPointerPostfix(member.type));
        memberType = memberStructName;
        readOp += `${memberStructName}.of(`;
      } else if (memberFFIType === "pointer") {
        const subStructName = stripPrefixes(stripPointerPostfix(member.type));
        memberType = `Pointer<${subStructName}>`;
      } else if (isStruct(structs, opaqueStructs, member.type)) {
        memberStructName = stripPrefixes(member.type);
        memberType = memberStructName;
        readOp += `${memberStructName}.of(`;
        lengthOrName = structs[member.type].size;
      }

      lines.push(`\tpublic get ${memberName}(): ${memberType} {`);

      readOp += `this._view.${getMethod(member.offset, lengthOrName)}`;

      if (isEnum(enums, member.type)) {
        readOp += `as ${memberType}`;
      } else if (memberType === "string") {
        readOp += ")!)";
      } else if (isStruct(structs, opaqueStructs, member.type)) {
        readOp += `) as ${memberStructName}`;
      } else if (isStructPointer(structs, opaqueStructs, member.type)) {
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
            `PlatformDataViewSetMethods is missing ${memberFFIType}.`
          );
        }

        writeOp += `this._view.${setMethod(member.offset, lengthOrName)}`;

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

export function writeSymbolParametersAndResult(
  lines: string[],
  symbol: Pick<CodeGenFunction, "parameters" | "result">,
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs
): void {
  lines.push(`\t\tparameters: [`);

  for (const paramName of Object.keys(symbol.parameters)) {
    const param = symbol.parameters[paramName];
    const ffiType = mapTypeToFFIType(
      callbacks,
      enums,
      structs,
      opaqueStructs,
      param.type
    );
    let line = `\t\t\t/* ${param.type} ${paramName} */ `;

    if (ffiType.startsWith("{")) {
      line += `${ffiType},`;
    } else {
      line += `"${ffiType}",`;
    }

    lines.push(line);
  }

  lines.push("\t\t],");

  const resultFFIType = mapTypeToFFIType(
    callbacks,
    enums,
    structs,
    opaqueStructs,
    symbol.result.type
  );
  let resultLine = `\t\tresult: /* ${symbol.result.type} */ `;

  if (resultFFIType.startsWith("{")) {
    resultLine += resultFFIType;
  } else {
    resultLine += `"${resultFFIType}"`;
  }

  lines.push(resultLine + ",");
}

export async function writeSymbols(
  filePath: string,
  functions: CodeGenFunctions,
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs
): Promise<void> {
  const lines = createLines();

  lines.push("export const symbols = {");
  for (const [funcName, func] of Object.entries(functions)) {
    if (func.todo) {
      lines.push(`// TODO: ${func.todo}`);
      lines.push(`// ${funcName}`);
      continue;
    }

    if (func.symbolName !== undefined) {
      lines.push(`\t${func.symbolName}: {`);
    } else {
      lines.push(`\t${funcName}: {`);
    }

    writeSymbolParametersAndResult(
      lines,
      func,
      callbacks,
      enums,
      structs,
      opaqueStructs
    );

    lines.push("\t},");
  }
  lines.push("} as const;");
  lines.push("");

  await writeLinesToFile(filePath, lines);
}

function isFunctionParamCallback(
  callbacks: CodeGenCallbacks,
  param: CodeGenFunctionParam
): boolean {
  let callbackName = param.type;

  while (callbackName.endsWith("*")) {
    callbackName = callbackName.slice(0, -1);
  }

  return Object.keys(callbacks).includes(callbackName);
}

function isFunctionParamOpaqueStruct(
  opaqueStructs: CodeGenOpaqueStructs,
  param: CodeGenFunctionParam
): boolean {
  let structName = param.type;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  return opaqueStructs.includes(structName);
}

function isFunctionParamStruct(
  structs: CodeGenStructs,
  param: CodeGenFunctionParam
): boolean {
  let structName = param.type;

  while (structName.endsWith("*")) {
    structName = structName.slice(0, -1);
  }

  if (structName === "SDL_Event") {
    return true;
  }

  return Object.keys(structs).includes(structName);
}

function isFunctionParamStructByValue(
  structs: CodeGenStructs,
  param: CodeGenFunctionParam
): boolean {
  if (!isFunctionParamStruct(structs, param)) {
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

function hasDoublePointerParams(func: CodeGenFunction): boolean {
  return Object.values(func.parameters).some(isFunctionParamDoublePointer);
}

function isFunctionParamString(param: CodeGenFunctionParam): boolean {
  return param.type === "char*";
}

function isFunctionParamBigInt(param: CodeGenFunctionParam): boolean {
  return ["Uint64"].includes(param.type);
}

function mapFunctionReturnType(
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  param: CodeGenFunctionParam
): string {
  return mapFunctionParamType(
    callbacks,
    enums,
    structs,
    opaqueStructs,
    param,
    true
  );
}

function mapFunctionParamType(
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  param: CodeGenFunctionParam,
  isReturnType = false
): string {
  if (param.overrideType) {
    if (param.nullable) {
      return param.overrideType + "| null";
    }

    return param.overrideType;
  }

  if (isFunctionParamCallback(callbacks, param)) {
    return stripPrefixes(param.type);
  }

  if (
    isFunctionParamOpaqueStruct(opaqueStructs, param) ||
    isFunctionParamStruct(structs, param)
  ) {
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
    return enumData?.prefixToStrip
      ? stripPrefixes(param.type, enumData.prefixToStrip)
      : stripPrefixes(param.type);
  }

  if (
    param.type.endsWith("*") &&
    isEnum(enums, param.type.substring(0, param.type.length - 1))
  ) {
    const enumName = param.type.substring(0, param.type.length - 1);
    const enumData = enums[enumName];
    const result = enumData?.prefixToStrip
      ? stripPrefixes(enumName, enumData.prefixToStrip)
      : stripPrefixes(enumName);
    return isReturnType ? `PointerValue<${result}>` : `PointerLike<${result}>`;
  }

  let result = "";

  switch (param.type) {
    case "SDL_bool":
      result = "boolean";
      break;

    case "char*":
      result = "string";
      break;

    case "float*":
      result = isReturnType ? "Pointer<f32>" : "PointerLike<f32>";
      break;

    case "int*":
      result = isReturnType ? "Pointer<int>" : "PointerLike<int>";
      break;

    case "size_t*":
      // TODO: There should probably be a size and usize type.
      result = isReturnType ? "Pointer<int>" : "PointerLike<int>";
      break;

    case "Uint8*":
      result = isReturnType ? "Pointer<u8>" : "PointerLike<u8>";
      break;

    case "Uint8**":
      result = isReturnType ? "Pointer<Pointer<u8>>" : "Box<Pointer<u8>>";
      break;

    case "Uint16*":
      result = isReturnType ? "Pointer<u16>" : "PointerLike<u16>";
      break;

    case "Uint32*":
      result = isReturnType ? "Pointer<u32>" : "PointerLike<u32>";
      break;

    case "void*":
      result = isReturnType ? "Pointer<unknown>" : "PointerLike<unknown>";
      break;
  }

  if (result) {
    if (param.nullable) {
      result += "| null";
    }

    return result;
  }

  if (param.type.startsWith("SDL_")) {
    result = stripPrefixes(param.type);
  }

  const ffiType = mapTypeToFFIType(
    callbacks,
    enums,
    structs,
    opaqueStructs,
    param.type
  );

  switch (ffiType) {
    case "pointer":
      throw new Error(
        `Unable to map param in ${mapFunctionParamType.name}: ${JSON.stringify(
          param
        )}`
      );
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
  result: CodeGenFunctionResult
): string {
  return isFunctionParamOpaqueStruct(opaqueStructs, result) ||
    isFunctionParamStruct(structs, result)
    ? "| null"
    : "";
}

function writeImportAllStructs(
  lines: string[],
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs
): void {
  const structNames = Object.entries(structs)
    .filter((x) => !x[1].doNotImport)
    .map((x) => x[0])
    .concat(opaqueStructs)
    .map((x) => stripPrefixes(x))
    .join(", ");

  lines.push(`import { ${structNames} } from "./structs.ts";`);
}

function writeImportAllCallbacks(
  lines: string[],
  callbacks: CodeGenCallbacks
): void {
  lines.push(
    `import { ${Object.entries(callbacks)
      .filter(([_, value]) => !value.todo)
      .map(([key, _]) => stripPrefixes(key))
      .join(", ")} } from "./callbacks.ts";`
  );
}

export async function writeCallbacksSymbols(
  filePath: string,
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  imports: string[]
): Promise<void> {
  const lines = createLines();
  lines.push(`// deno-lint-ignore-file no-unused-vars
  
import Platform from "../_platform.ts";
import { PlatformPointer } from "../_types.ts";
import { Event } from "./events.ts";
import { i32, u8, u32 } from "../types.ts";
`);

  writeImportAllCallbacks(lines, callbacks);
  writeImportAllStructs(lines, structs, opaqueStructs);
  lines.push("");

  if (imports.length > 0) {
    lines.push(...imports);
    lines.push("");
  }

  lines.push("export const callbacks = {");

  for (const [callbackName, callback] of Object.entries(callbacks)) {
    if (callback.todo) {
      lines.push(`// TODO: ${callback.todo}`);
      lines.push(`// ${callbackName}`);
      lines.push("");
      continue;
    }

    lines.push(`\t${callbackName}: {`);

    writeSymbolParametersAndResult(
      lines,
      callback,
      callbacks,
      enums,
      structs,
      opaqueStructs
    );

    const returnType = mapFunctionReturnType(
      callbacks,
      enums,
      structs,
      opaqueStructs,
      callback.result
    );
    lines.push(`\t\twrap: (callback: ${stripPrefixes(callbackName)}) => {`);

    let platformParams = "";
    for (const [paramName, param] of Object.entries(callback.parameters)) {
      platformParams += `${paramName}: `;
      const paramType = mapFunctionParamType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        param
      );

      if (isFunctionParamString(param)) {
        platformParams += "PlatformString";
      } else if (isFunctionParamVoidPointer(param)) {
        platformParams += `PlatformPointer<unknown>`;
      } else if (isFunctionParamPointer(param)) {
        platformParams += paramType.replaceAll(
          "PointerLike",
          "PlatformPointer"
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
      const paramType = mapFunctionParamType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        param
      );

      if (isFunctionParamString(param)) {
        lines.push(`\t\tPlatform.fromPlatformString(${paramName})`);
      } else if (
        isFunctionParamOpaqueStruct(opaqueStructs, param) ||
        isFunctionParamStruct(structs, param)
      ) {
        lines.push(
          `\t\t${getGenericParam(
            paramType
          )}.of(Platform.fromPlatformPointer(${paramName}))`
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
  filePath: string,
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  imports: string[]
): Promise<void> {
  const lines = createLines();
  lines.push(`// deno-lint-ignore-file no-unused-vars

import { Pointer } from "../pointers.ts";
import { Callback, i32, u8, u32 } from "../types.ts";
import { Event } from "./events.ts";
`);

  lines.push(...imports);
  lines.push("");

  for (const [callbackName, callback] of Object.entries(callbacks)) {
    if (callback.todo) {
      lines.push(`// TODO: ${callback.todo}`);
      lines.push(`// ${callbackName}`);
      lines.push("");
      continue;
    }

    lines.push(`export type ${stripPrefixes(callbackName)} = (`);

    lines.push("(");
    for (const [paramName, param] of Object.entries(callback.parameters)) {
      let paramType = mapFunctionParamType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        param
      );

      if (
        isFunctionParamOpaqueStruct(opaqueStructs, param) ||
        isFunctionParamStruct(structs, param)
      ) {
        paramType = getGenericParam(paramType);
      } else {
        paramType = paramType.replace("PointerLike<", "Pointer<");
      }

      lines.push(`${paramName}: ${paramType},`);
    }

    const returnType = mapFunctionReturnType(
      callbacks,
      enums,
      structs,
      opaqueStructs,
      callback.result
    );
    lines.push(`) => ${returnType}`);

    lines.push(") & Callback;");
    lines.push("");
  }

  await writeLinesToFile(filePath, lines);
}

export async function writeFunctions(
  filePath: string,
  libraryName: string,
  functions: CodeGenFunctions,
  callbacks: CodeGenCallbacks,
  enums: CodeGenEnums,
  structs: CodeGenStructs,
  opaqueStructs: CodeGenOpaqueStructs,
  imports: string[]
): Promise<void> {
  const lines = createLines();
  lines.push(`// deno-lint-ignore-file no-unused-vars
  
import Platform from "../_platform.ts";
import { Box } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { PlatformPointer } from "../_types.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f32, f64, i32, InitOptions, int, TypedArray, u16, u32, u64, u8 } from "../types.ts";
import { callbacks } from "./_callbacks.ts";
import { getSymbolsFromFunctions } from "../_init.ts";
import { symbols } from "./_symbols.ts";
`);

  writeImportAllCallbacks(lines, callbacks);

  const enumNames = Object.keys(enums)
    .map((x) => stripPrefixes(x))
    .join(", ");
  lines.push(`import { ${enumNames} } from "./enums.ts";`);

  writeImportAllStructs(lines, structs, opaqueStructs);

  lines.push("");

  lines.push(...imports);
  lines.push("");

  lines.push(`let _library: DynamicLibrary<typeof symbols> = null!;`);
  lines.push("");

  for (const [funcName, func] of Object.entries(functions)) {
    if (func.todo) {
      lines.push(`// TODO: ${func.todo}`);
      lines.push(`// ${funcName}`);
      lines.push("");
      continue;
    }

    if (funcName.endsWith("_Init")) {
      if (Object.values(func.parameters).length >= 1) {
        lines.push(`export function Init(flags: InitFlags, options?: InitOptions): number;
export function Init(flags: number, options?: InitOptions): number;
export function Init(flags: InitFlags | number, options?: InitOptions): number {`);
      } else {
        lines.push(`export function Init(options?: InitOptions): number {`);
      }

      lines.push(
        `const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
      _library = Platform.loadLibrary("${libraryName}", symbolsToLoad, options?.libraryPath);`
      );

      if (Object.values(func.parameters).length >= 1) {
        lines.push(`\treturn _library.symbols.${funcName}(flags) as number;`);
      } else {
        lines.push(`\treturn _library.symbols.${funcName}() as number;`);
      }

      lines.push("}");
    } else if (funcName.endsWith("_Quit")) {
      lines.push(`export function Quit(): void {
        _library.symbols.${funcName}();
        _library.close();
      }`);
    } else {
      for (const overload of func.overloads ?? []) {
        const returnType = mapFunctionReturnType(
          callbacks,
          enums,
          structs,
          opaqueStructs,
          {
            ...func.result,
            ...overload.result,
          }
        );

        lines.push(`export function ${stripPrefixes(funcName)}(`);

        for (const [paramName, param] of Object.entries(func.parameters)) {
          lines.push(
            `${paramName}: ${mapFunctionParamType(
              callbacks,
              enums,
              structs,
              opaqueStructs,
              {
                ...param,
                ...overload?.parameters?.[paramName],
              }
            )},`
          );
        }

        const returnTypePostfix = getReturnTypePostfix(structs, opaqueStructs, {
          ...func.result,
          ...overload.result,
        });

        lines.push(`): ${returnType}${returnTypePostfix};`);
      }

      const returnType = mapFunctionReturnType(
        callbacks,
        enums,
        structs,
        opaqueStructs,
        func.result
      );

      lines.push(`export function ${stripPrefixes(funcName)}(`);

      for (const [paramName, param] of Object.entries(func.parameters)) {
        lines.push(
          `${paramName}: ${mapFunctionParamType(
            callbacks,
            enums,
            structs,
            opaqueStructs,
            param
          )},`
        );
      }

      const returnTypePostfix = getReturnTypePostfix(
        structs,
        opaqueStructs,
        func.result
      );

      lines.push(`): ${returnType}${returnTypePostfix} {`);

      let symbolName = funcName;
      if (func.symbolName !== undefined) {
        symbolName = func.symbolName;
      }

      if (returnType !== "void") {
        let returnStatement = "\treturn ";

        if (isFunctionParamBigInt(func.result)) {
          returnStatement += "\t\tBigInt(";
        } else if (isFunctionParamString(func.result)) {
          returnStatement += "\t\tPlatform.fromPlatformString(";
        } else if (
          isFunctionParamOpaqueStruct(opaqueStructs, func.result) ||
          isFunctionParamStruct(structs, func.result)
        ) {
          returnStatement += `\t\t${returnType}.of(Platform.fromPlatformPointer(`;
        } else if (isFunctionParamPointer(func.result)) {
          returnStatement += `\t\tPlatform.fromPlatformPointer(`;
        }

        returnStatement += `_library.symbols.${symbolName}(`;
        lines.push(returnStatement);
      } else {
        lines.push(`\t_library.symbols.${symbolName}(`);
      }

      for (const [paramName, param] of Object.entries(func.parameters)) {
        if (isFunctionParamString(param)) {
          lines.push(`\t\tPlatform.toPlatformString(${paramName}),`);
        } else if (isFunctionParamVoidPointer(param)) {
          lines.push(
            `\t\tPlatform.toPlatformPointer(Pointer.of(${paramName})),`
          );
        } else if (isFunctionParamDoublePointer(param)) {
          lines.push(
            `\t\tPlatform.toPlatformPointer(Pointer.ofTypedArray(${paramName}._data)),`
          );
        } else if (isFunctionParamCallback(callbacks, param)) {
          lines.push(
            `\t\tPlatform.toPlatformCallback(${paramName}, callbacks["${param.type}"]),`
          );
        } else if (isFunctionParamStructByValue(structs, param)) {
          lines.push(
            `\t\tPlatform.toPlatformStruct(${paramName}, ${stripPrefixes(
              param.type
            )}),`
          );
        } else if (
          isFunctionParamPointer(param) ||
          isFunctionParamOpaqueStruct(opaqueStructs, param) ||
          isFunctionParamStruct(structs, param)
        ) {
          lines.push(
            `\t\tPlatform.toPlatformPointer(Pointer.of(${paramName})),`
          );
        } else {
          lines.push(`\t\t${paramName},`);
        }
      }

      if (returnType !== "void") {
        if (isFunctionParamBigInt(func.result)) {
          lines.push("\t) as bigint | number);");
        } else if (returnType === "string") {
          lines.push(`\t) as PlatformPointer<unknown>);`);
        } else if (
          isFunctionParamOpaqueStruct(opaqueStructs, func.result) ||
          isFunctionParamStruct(structs, func.result)
        ) {
          lines.push(`\t) as PlatformPointer<${returnType}>));`);
        } else if (isFunctionParamPointer(func.result)) {
          const nonNullAssertion = !func.result.nullable ? "!" : "";
          lines.push(
            `\t) as PlatformPointer<${getGenericParam(
              returnType
            )}>)${nonNullAssertion};`
          );
        } else if (returnType === "bigint") {
          lines.push(`\t) as unknown as ${returnType};`);
        } else {
          lines.push(`\t) as ${returnType};`);
        }
      } else {
        lines.push(`\t);`);
      }

      lines.push("}");
    }

    lines.push(
      `${stripPrefixes(funcName)}.symbolName = "${
        func.symbolName ? func.symbolName : funcName
      }";`
    );
    lines.push("");
  }

  await writeLinesToFile(filePath, lines);
}
