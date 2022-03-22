import { functions } from "./codegen.data.ts";

await main();

async function main(): Promise<void> {
  await writeInterfaces();
  await writeSymbols();
}

function createLines(): string[] {
  return ["// This file is auto generated."];
}

async function writeLinesToFile(path: string, lines: string[]): Promise<void> {
  await Deno.writeTextFile(path, lines.join("\n"));
  await Deno.run({ cmd: ["deno", "fmt", path] });
}

async function writeInterfaces(): Promise<void> {
  const lines = createLines();

  for (const key of Object.keys(functions)) {
    lines.push(
      `export type ${key}Func = (${Object.keys(functions[key].parameters)
        .map((x) => `${x}: ${functions[key].parameters[x][1]}`)
        .join(", ")}) => ${functions[key].result[1]};`
    );
    lines.push("");
  }

  await writeLinesToFile("../src/interfaces.ts", lines);
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
        .map((x) => `"${x[0]}"`)
        .join(", ")}],`
    );
    lines.push(`\t\tresult: "${functions[key].result[0]}"`);
    lines.push(`\t},`);
  }
  lines.push("};");
  lines.push("");

  await writeLinesToFile("../src/symbols.ts", lines);
}
