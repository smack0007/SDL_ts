import { enums, functions } from "./codegen.data.ts";

await main();

async function main(): Promise<void> {
  await writeEnums();
  await writeSymbols();
}

function createLines(): string[] {
  return [
    "// This file is auto generated. To update the file make changes to the code generator.",
    "",
  ];
}

async function writeLinesToFile(path: string, lines: string[]): Promise<void> {
  await Deno.writeTextFile(path, lines.join("\n"));
  await (await Deno.run({ cmd: ["deno", "fmt", path] })).status();
}

async function writeEnums(): Promise<void> {
  const lines = createLines();

  for (const enumName of Object.keys(enums)) {
    lines.push(`// ${enumName}`);
    for (const key of Object.keys(enums[enumName])) {
      lines.push(`export const ${key} = ${enums[enumName][key]}`);
    }
    lines.push("");
  }

  await writeLinesToFile("../src/enums.ts", lines);
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
            (paramName) =>
              `/* ${paramName} */ "${
                functions[funcName].parameters[paramName]
              }"`,
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
