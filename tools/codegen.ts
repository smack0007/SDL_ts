import { functions } from "./codegen.data.ts";

const lines: string[] = [];

lines.push("// This file is auto generated.");
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

await Deno.writeTextFile("../src/symbols.ts", lines.join("\n"));
await Deno.run({ cmd: ["deno", "fmt", "../src/symbols.ts"] });
