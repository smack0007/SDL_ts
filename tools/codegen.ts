import { functions } from "./codegen.data.ts";

await main();

async function main(): Promise<void> {
  await writeSymbols();
}

function createLines(): string[] {
  return [
    "// This file is auto generated. To update the file",
    "// make changes to the code generator.",
    "",
  ];
}

async function writeLinesToFile(path: string, lines: string[]): Promise<void> {
  await Deno.writeTextFile(path, lines.join("\n"));
  await Deno.run({ cmd: ["deno", "fmt", path] });
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
  for (const key of Object.keys(functions)) {
    lines.push(`\t${key}: {`);
    lines.push(
      `\t\tparameters: [${Object.values(functions[key].parameters)
        .map((x) => `"${x}"`)
        .join(", ")}],`
    );
    lines.push(`\t\tresult: "${functions[key].result}"`);
    lines.push(`\t},`);
  }
  lines.push("};");
  lines.push("");

  await writeLinesToFile("../src/symbols.ts", lines);
}
