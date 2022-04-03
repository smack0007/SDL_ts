import { enums } from "./codegen-enums.ts";
import { events } from "./codegen-events.ts";
import { functions } from "./codegen-functions.ts";
import { opaqueStructs, structs } from "./codegen-structs.ts";

const dataViewMethods: Record<string, (offset: number, length: number) => string> = {
  "i32": (offset, _) => `getInt32(${offset})`,
  "u8": (offset, _) => `getUint8(${offset})`,
  "u32": (offset, _) => `getUint32(${offset})`,

  "pointer": (offset, _) => `getBigUint64(${offset})`,

  "struct": (offset, length) => `getArrayBuffer(${length}, ${offset})`,
} as const;

await main();

async function main(): Promise<void> {
  await writeEnums();
  await writeEvents();
  await writeStructs();
  await writeSymbols();
  // await writeFunctions();
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

function mapFFIType(type: string): string {
  switch (type) {
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

  return type;
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

  const eventMembersMap: Record<string, { type: string; offset: number }> = {};

  for (const eventName of Object.keys(events)) {
    const shortEventName = shortenName(eventName);
    lines.push(`export interface ${shortEventName} {`);

    for (const memberName of Object.keys(events[eventName].members)) {
      if (memberName.startsWith("padding")) {
        continue;
      }

      const memberType = mapFFIType(events[eventName].members[memberName].type);
      lines.push(`\t${memberName}: ${memberType};`);

      eventMembersMap[memberName] = events[eventName].members[memberName];
    }

    lines.push("}");
    lines.push("");
  }

  const eventTypeNames = Object.keys(events).map(shortenName).join(", ");
  lines.push(`export class Event implements ${eventTypeNames} {
  public _buffer = new Uint8Array(64);
  public _data = new BufferOrPointerView(this._buffer.buffer);

`);

  const eventMembers = Object.entries(eventMembersMap);
  eventMembers.sort(sortStructMembers);

  for (const eventMember of eventMembers) {
    const memberName = eventMember[0];
    const member = eventMember[1];
    lines.push(`\tpublic get ${memberName}(): ${mapFFIType(member.type)} {`);

    const dataViewMethod = dataViewMethods[member.type];

    if (dataViewMethod === undefined) {
      console.error(`dataViewMethods is missing ${member.type}.`);
    }

    const length = 0;
    lines.push(
      `\t\treturn this._data.${dataViewMethods[member.type](member.offset, length)};`,
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
  public _data: BufferOrPointerView;

  constructor(data: ArrayBuffer | Deno.UnsafePointer) {
    this._data = new BufferOrPointerView(data);
  }

  public get buffer(): ArrayBuffer | null {
    return this._data.buffer;
  }

  public get pointer(): Deno.UnsafePointer | null {
    return this._data.pointer;
  }
`);

    const structMembers = Object.entries(struct.members);
    structMembers.sort(sortStructMembers);

    for (const [memberName, member] of structMembers) {
      let readOp = "";
      let length = 0;
      let returnType = mapFFIType(member.type);

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

      readOp += `this._data.${dataViewMethods[member.type](member.offset, length)}`;

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

async function writeFunctions(): Promise<void> {
  const lines = createLines();

  const structNames = Object.keys(structs).map(shortenName).join(", ");

  lines.push(`import { Event } from "./events.ts";`);
  lines.push(`import { ${structNames} } from "./structs.ts";`);
  lines.push(`import { Symbols, symbols } from "./symbols.ts";`);
  lines.push(`import { toCString } from "./utils.ts";`);

  for (const funcName of Object.keys(functions)) {
  }

  lines.push("");

  await writeLinesToFile("../src/functions.ts", lines);
}
