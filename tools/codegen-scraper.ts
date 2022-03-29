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
      writePrintF(`// ${entry.name}`);
      await scrapeFile(`${SDL_PATH}/include/${entry.name}`);
      writePrintF("");
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
  write("#include <stddef.h>");
  write("#include <stdio.h>");
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

function writeLineNumber(num: number): void {
  writePrintF(`// Line ${num}`);
}

async function scrapeFile(filePath: string): Promise<void> {
  let captureMode: "define" | "enum" | "function" | "struct" | null = null;

  const lines = (await Deno.readTextFile(filePath)).split("\n");
  let capture = "";

  const flush = () => {
    captureMode = null;
    capture = "";
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("#define SDL_")) {
      flush();
      captureMode = "define";
      writeLineNumber(i);
    } else if (line.startsWith("typedef enum")) {
      flush();
      captureMode = "enum";
      writeLineNumber(i);
    } else if (line.startsWith("extern DECLSPEC ")) {
      flush();
      captureMode = "function";
      writeLineNumber(i);
    } else if (
      line.startsWith("typedef struct") && !line.endsWith(";")
    ) {
      flush();
      captureMode = "struct";
      writeLineNumber(i);
    }

    if (captureMode !== null) {
      capture += line;
    }

    let shouldFlush = false;

    if (captureMode === "define" && !line.endsWith("\\")) {
      outputDefine(capture);
      shouldFlush = true;
    } else if (
      captureMode === "enum" && line.startsWith("} ") &&
      line.endsWith(";")
    ) {
      outputEnum(capture);
      shouldFlush = true;
    } else if (
      captureMode === "function" && line.endsWith(";")
    ) {
      outputFunction(capture);
      shouldFlush = true;
    } else if (
      captureMode === "struct" && line.startsWith("} ") &&
      line.endsWith(";")
    ) {
      outputStruct(capture);
      shouldFlush = true;
    }

    if (shouldFlush) {
      flush();
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
    .replaceAll("','", "__");

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

  writePrintF("/* enum */");
  writePrintF(`${enumName}: {`);

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    let value: string | null = null;

    if (parts[i + 1] === "=") {
      value = parts[i + 2];
      i += 2;
    } else if (parts[i + 1].startsWith("=")) {
      value = parts[i + 1].substring(1);
      i += 1;
    }

    if (value === "_") {
      value = "' '";
    } else if (value === "__") {
      value = "','";
    }

    if (value !== null) {
      value = value.replaceAll("\\", "\\\\");
      writePrintF(`\t${key}: "${value}",`);
    } else {
      writePrintF(`\t${key}: "%d",`, key);
    }
  }

  writePrintF("}");
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

  if (functionName.startsWith("*")) {
    returnType += "*";
    functionName = functionName.substring(1);
  }

  writePrintF("/* function */");
  writePrintF(`${functionName}: {`);
  writePrintF("\tparameters: {");

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

    writePrintF(
      `\t\t${paramName}: "${guessFFIType(paramType)}", /* ${paramType} */`,
    );
  }

  writePrintF("\t},");
  writePrintF(`\tresult: "${guessFFIType(returnType)}", /* ${returnType} */`);
  writePrintF("}");
}

function outputStruct(capture: string): void {
  capture = capture
    .replace(/\/\*([.\s\S]*?)\*\//g, "")
    .replaceAll("typedef struct", "")
    .replaceAll("{", " ")
    .replaceAll("}", " ")
    .replaceAll(";", " ")
    .replaceAll(", ", ",") // Move multiple members declarations together
    .replaceAll("unsigned int", "uint")
    .replaceAll("unsigned short", "ushort")
    .replaceAll("char * ", "char* ");

  const parts = capture.split(/(\;|\s)/)
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .filter((x) => x !== ";");

  // TODO: Figure out what to do with unions.
  if (parts.indexOf("union") !== -1) {
    return;
  }

  // write(`/* struct ${JSON.stringify(parts, undefined, 2)} */`);

  let structName = parts[0];
  let membersStart = 1;

  // When struct name / typedef don't match.
  if (parts[0] !== parts[parts.length - 1]) {
    structName = parts[parts.length - 1];
    membersStart = 0;
  }

  // Skip these structs for now.
  if (
    structName.startsWith("SDLTest_") ||
    [
      "SDL_AudioCVT",
    ].includes(structName)
  ) {
    return;
  }

  writePrintF("/* struct */");
  writePrintF(`${structName}: {`);
  writePrintF("\tsize: %llu", `sizeof(${structName})`);
  writePrintF("\tmembers: {");

  for (let i = membersStart; i < parts.length - 1; i += 2) {
    if (parts[i] === "const") {
      i += 1;
    }

    if (parts[i] === "struct") {
      i += 1;
    }

    let type = parts[i];
    let name = parts[i + 1];

    if (name === undefined) {
      continue;
    }

    if (name.startsWith("**")) {
      type += "**";
      name = name.substring(2);
    } else if (name.startsWith("*")) {
      type += "*";
      name = name.substring(1);
    }

    // If multiple members are specified with a comma.
    const names = name.split(",");

    for (const name of names) {
      writePrintF(`\t\t${name}: {`);
      writePrintF(`\t\t\ttype: "${guessFFIType(type)}", /* ${type} */`);
      writePrintF(`\t\t\toffset: %llu,`, `offsetof(${structName}, ${name})`);
      writePrintF("\t\t}");
    }
  }

  writePrintF("\t}");
  writePrintF("}");
}
