import { enums, events, functions } from "./codegen.data.ts";

const dataViewMethods: Record<string, (offset: number) => string> = {
  "i32": (offset) => `getInt32(${offset})`,
  "u8": (offset) => `getUint8(${offset})`,
  "u32": (offset) => `getUint32(${offset}, true)`,
} as const;

await main();

async function main(): Promise<void> {
  await writeEnums();
  await writeEvents();
  await writeSymbols();
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
  }

  return type;
}

async function writeEvents(): Promise<void> {
  const lines = createLines();
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
  public _dataView = new DataView(this._buffer.buffer);

`);

  const eventMembers = Object.entries(eventMembersMap);
  eventMembers.sort((a, b) => {
    const offsetDiff = a[1].offset - b[1].offset;

    if (offsetDiff !== 0) {
      return offsetDiff;
    }

    return a[0].localeCompare(b[0]);
  });

  for (const eventMember of eventMembers) {
    const memberName = eventMember[0];
    const member = eventMember[1];
    lines.push(`\tpublic get ${memberName}(): ${mapFFIType(member.type)} {`);

    const dataViewMethod = dataViewMethods[member.type];

    if (dataViewMethod === undefined) {
      console.error(`dataViewMethods is missing ${member.type}.`);
    }

    lines.push(
      `\t\treturn this._dataView.${dataViewMethods[member.type](member.offset)};`,
    );
    lines.push("\t}");
    lines.push("");
  }

  lines.push("}");
  lines.push("");

  await writeLinesToFile("../src/events.ts", lines);
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
    lines.push(
      `\t\tparameters: [${
        Object.keys(functions[funcName].parameters)
          .map(
            (paramName) => `/* ${paramName} */ "${functions[funcName].parameters[paramName]}"`,
          )
          .join(", ")
      }],`,
    );
    lines.push(`\t\tresult: "${functions[funcName].result}"`);
    lines.push(`\t},`);
  }
  lines.push("};");
  lines.push("");

  await writeLinesToFile("../src/symbols.ts", lines);
}
