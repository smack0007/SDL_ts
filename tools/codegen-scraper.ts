// deno task codegen-scraper > ./tmp/codegen-scraper.out

// This is a blunt tool that will produce output from the SDL headers
// that can then be fed directly into the codegen.

const EXT_PATH = "../ext";
const SDL_PATH = `${EXT_PATH}/SDL`;
const KHRONOS_PATH = `${EXT_PATH}/khronos`;
const OUTPUT_PATH = "../tmp";

let buffer = "";

Deno.exit(await main());

function write(value: string): void {
  buffer += value + "\n";
}

function writePrintF(value: string, ...args: string[]): void {
  value = value
    .replaceAll("\n", "\\n")
    .replaceAll("\t", "\\t")
    .replaceAll('"', '\\"');

  if (args.length <= 0) {
    value = value.replaceAll("%", "%%");
  }

  let argsString = args.join(", ");

  if (argsString.length > 0) {
    argsString = ", " + argsString;
  }

  write(`printf("${value}\\n"${argsString});`);
}

async function main(): Promise<number> {
  writeStartCode();

  for await (const entry of Deno.readDir(`${SDL_PATH}/include`)) {
    if (entry.name.startsWith("SDL") && entry.name.endsWith(".h")) {
      write(`// ${entry.name}`);
      await scrapeFile(`${SDL_PATH}/include/${entry.name}`);
      write("");
    }
  }

  writeEndCode();

  try {
    await Deno.mkdir(OUTPUT_PATH);
  } catch {
    // Ignore
  }

  const cOutputPath = `${OUTPUT_PATH}/codegen-scraper.c`;
  await Deno.writeTextFile(cOutputPath, buffer);

  const exeOutputPath = `${OUTPUT_PATH}/codegen-scraper.exe`;
  const { code } = await Deno.run({
    cmd: [
      "clang",
      cOutputPath,
      "-o",
      exeOutputPath,
      `-I${SDL_PATH}/include`,
      `-I${KHRONOS_PATH}`,
      `-L${SDL_PATH}/lib/x64`,
      "-Wl,/SUBSYSTEM:CONSOLE",
      "-lSDL2main",
      "-lSDL2",
      "-lShell32",
    ],
    // stdout: "null",
  }).status();

  if (code !== 0) {
    return 1;
  }

  await Deno.copyFile(
    `${SDL_PATH}/lib/x64/SDL2.dll`,
    `${OUTPUT_PATH}/SDL2.dll`,
  );

  const process = Deno.run({ cmd: [exeOutputPath] });
  await process.status();

  return 0;
}

function writeStartCode(): void {
  write("#include <stdio.h>");
  write("#include <windows.h>");
  write("#include <SDL.h>");
  write("#include <KHR/khrplatform.h>");
  write("");
  write("int main(int argc, char* args[]) {");
  write("SDL_Init(SDL_INIT_VIDEO);");
}

function writeEndCode(): void {
  write("SDL_Quit();");
  write("return 0;");
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

    let shouldFlush = false;

    if (captureMode === "define" && !trimmedLine.endsWith("\\")) {
      outputDefine(capture);
      shouldFlush = true;
    } else if (
      captureMode === "enum" && trimmedLine.startsWith("} ") &&
      trimmedLine.endsWith(";")
    ) {
      outputEnum(capture);
      shouldFlush = true;
    } else if (
      captureMode === "function" && trimmedLine.endsWith(";")
    ) {
      outputFunction(capture);
      shouldFlush = true;
    }

    if (shouldFlush) {
      captureMode = null;
      capture = "";
    }
  }
}

function outputDefine(capture: string): void {
  capture = capture
    .replaceAll("#define", "")
    .replaceAll("\\", "");

  const parts = capture.split(" ")
    .map((x) => x.trim())
    .filter((x) => x !== "");

  if (parts.length < 2) {
    return;
  }

  writePrintF(`/* define */ ${parts[0]}: ${parts.slice(1).join(" ")};`);
}

function outputEnum(capture: string): void {
  capture = capture
    .replace(/\/\*([.\s\S]*?)\*\//g, "")
    .replaceAll("typedef enum", "")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll(";", "")
    .replaceAll(" | ", "|")
    .replaceAll("' '", "_") // These 2 come from SDL_keycode
    .replaceAll("','", "_");

  const parts = capture.split(/(\,|\s)/)
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .filter((x) => x !== ",");

  const enumName = parts[parts.length - 1];

  if (enumName.startsWith("SDL_WinRT")) {
    return;
  }

  // TODO: Need SDL_PixelFormatEnum eventually.
  if (
    enumName === "SDL_PixelFormatEnum" || enumName === "SDL_SYSWM_TYPE" ||
    enumName === "SDL_WindowFlags"
  ) {
    return;
  }

  // if (enumName === "SDL_KeyCode") {
  //   write(`// ${capture}`);
  // }

  let enumMembers = "";
  const args = [];
  for (let i = 0; i < parts.length - 1; i++) {
    enumMembers += `\t${parts[i]}: "%d"\n`;
    args.push(parts[i]);

    if (parts[i + 1] === "=") {
      i += 2;
    } else if (parts[i + 1].startsWith("=")) {
      i += 1;
    }
  }

  writePrintF(
    `/* enum */
${enumName}: {
${enumMembers}
}`,
    ...args,
  );
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

function outputFunction(capture: string): void {
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

  writePrintF(`/* function */
${functionName}: {
  parameters: {
${params.trimEnd()}
  },
  result: "${guessFFIType(returnType)}", /* ${returnType} */
},`);
}
