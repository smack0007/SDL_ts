// deno task codegen-scraper > codegen-scraper.out

// This is a blunt tool that will produce output from the SDL headers
// that can then be fed directly into the codegen.

let buffer = "";

Deno.exit(await main());

function write(value: string): void {
  if (value === "") {
    return;
  }
  buffer += value + "\n";
}

function writePrintF(value: string): void {
  if (value === "") {
    return;
  }

  value = value
    .replaceAll("\n", "\\n")
    .replaceAll("\t", "\\t")
    .replaceAll('"', '\\"');

  write(`printf("${value}\\n");`);
}

async function main(): Promise<number> {
  writeStartCode();

  for await (const entry of Deno.readDir("../ext/SDL/include")) {
    if (entry.name.startsWith("SDL") && entry.name.endsWith(".h")) {
      write(`// ${entry.name}`);
      await scrapeFile(`../ext/SDL/include/${entry.name}`);
      write("");
    }
  }

  writeEndCode();

  try {
    await Deno.mkdir("../tmp");
  } catch {
    // Ignore
  }

  const cOutputPath = "../tmp/codgen-scraper.c";
  await Deno.writeTextFile(cOutputPath, buffer);

  const exeOutputPath = "../tmp/codgen-scraper.exe";
  await Deno.run({
    cmd: ["clang", cOutputPath, "-o", exeOutputPath],
    stdout: "null",
  }).status();

  const process = Deno.run({ cmd: [exeOutputPath] });
  const { code } = await process.status();

  // console.info("writing");
  // await Deno.writeFile("../tmp/codegen-scraper.out", output);
  // console.info("done");

  return code;
}

function writeStartCode(): void {
  write("#include <stdio.h>");
  write("");
  write("int main() {");
}

function writeEndCode(): void {
  write("}");
  write("");
}

type CaptureMode = "define" | "enum" | "function" | null;

async function scrapeFile(filePath: string): Promise<void> {
  const lines = (await Deno.readTextFile(filePath)).split("\n");
  let captureMode: CaptureMode = null;
  let capture = "";

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("#define SDL_")) {
      captureMode = "define";
    } else if (trimmedLine.startsWith("typedef enum")) {
      captureMode = "enum";
    } else if (trimmedLine.startsWith("extern DECLSPEC ")) {
      captureMode = "function";
    }

    if (captureMode !== null) {
      capture += trimmedLine;
    }

    let shouldWrite = false;

    if (captureMode === "define" && !trimmedLine.endsWith("\\")) {
      capture = transformDefine(capture);
      shouldWrite = true;
    } else if (
      captureMode === "enum" && trimmedLine.startsWith("}") &&
      trimmedLine.endsWith(";")
    ) {
      capture = transformEnum(capture);
      shouldWrite = true;
    } else if (
      captureMode === "function" && trimmedLine.endsWith(";")
    ) {
      capture = transformFunction(capture);
      shouldWrite = true;
    }

    if (shouldWrite) {
      writePrintF(capture);
      captureMode = null;
      capture = "";
    }
  }
}

function transformDefine(capture: string): string {
  capture = capture
    .replaceAll("#define", "")
    .replaceAll("\\", "");

  const parts = capture.split(" ")
    .map((x) => x.trim())
    .filter((x) => x !== "");

  if (parts.length < 2) {
    return "";
  }

  return `/* define */ ${parts[0]}: ${parts.slice(1).join(" ")};`;
}

function transformEnum(capture: string): string {
  capture = capture
    .replace(/\/\*(.*?)\*\//g, "")
    .replaceAll("typedef enum", "")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll(";", "");

  const parts = capture.split(/(\,|\s)/)
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .filter((x) => x !== ",");

  const enumName = parts[parts.length - 1];
  let enumMembers = "";

  let currentEnumValue = 0;
  for (let i = 0; i < parts.length - 1; i++) {
    enumMembers += `\t${parts[i]}`;

    if (parts[i + 1] === "=") {
      enumMembers += `: "${parts[i + 2]}"`;

      try {
        currentEnumValue = parseInt(parts[i + 2], 10);
      } catch {
        // Ignore
      }

      i += 2;
    } else {
      enumMembers += `: "${currentEnumValue}"`;
    }

    enumMembers += "\n";
    currentEnumValue += 1;
  }

  return `/* enum */
${enumName}: {
${enumMembers}
}`;
}

function guessFFIType(type: string): string {
  if (type.endsWith("*")) {
    return "pointer";
  }

  switch (type) {
    case "int":
      return "i32";

    case "Uint8":
      return "u8";

    case "Uint32":
      return "u32";
  }

  return type;
}

function transformFunction(capture: string): string {
  capture = capture
    .replaceAll("extern DECLSPEC", "")
    .replaceAll("SDLCALL", "")
    .replaceAll(";", "")
    .replaceAll("const", "")
    .replaceAll("(", " ")
    .replaceAll(")", " ");

  let parts = capture.split(/(\,|\s)/)
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .filter((x) => x !== ",");

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "*") {
      parts[i - 1] += "*";
      parts[i] = "";
    }
  }

  parts = parts.filter((x) => x !== "");

  let returnType = parts[0];
  let functionName = parts[1];
  let params = "";

  if (functionName.startsWith("*")) {
    returnType += "*";
    functionName = functionName.substring(1);
  }

  for (let i = 2; i < parts.length; i += 2) {
    let paramType = parts[i];
    let paramName = parts[i + 1];

    if (paramName === undefined) {
      continue;
    }

    if (paramName.startsWith("*")) {
      paramType += "*";
      paramName = paramName.substring(1);
    }

    params += `\t\t${paramName}: "${
      guessFFIType(paramType)
    }", /* ${paramType} */\n`;
  }

  return `/* function */
${functionName}: {
  parameters: {
${params.trimEnd()}
  },
  result: "${guessFFIType(returnType)}", /* ${returnType} */
},`;
}
