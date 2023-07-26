// This is a blunt tool that will produce output from the SDL headers
// that can then be fed directly into the codegen.

import { CodeGenEnums, CodeGenFunctions, CodeGenStructs } from "./codegen/types.ts";

const TMP_PATH = "../tmp";
const SDL_PATH = `${TMP_PATH}/SDL`;
const KHRONOS_PATH = `${TMP_PATH}/khronos`;
const OUTPUT_PATH = `${TMP_PATH}/out`;

const MACROS_TO_COMPUTE = [
  "SDL_SCANCODE_TO_KEYCODE",
];

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
  const compileCommand = new Deno.Command("clang", {
    "args": [
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
  });
  const { code: compileCode } = await compileCommand.output();

  if (compileCode !== 0) {
    return 1;
  }

  await Deno.copyFile(
    `${SDL_PATH}/lib/x64/SDL2.dll`,
    `${OUTPUT_PATH}/SDL2.dll`,
  );

  const exeCommand = new Deno.Command(exeOutputPath);

  const { code: exeCode, stdout: exeStdout } = await exeCommand.output();

  if (exeCode !== 0) {
    return 1;
  }

  await Deno.writeFile(`${OUTPUT_PATH}/codegen-scraper.ts`, exeStdout);
  const { enums, functions, structs } = await import(`${OUTPUT_PATH}/codegen-scraper.ts`);

  await updateCodeGenInput(enums as CodeGenEnums, functions as CodeGenFunctions, structs as CodeGenStructs);

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
  writePrintF('import { CodeGenEnums, CodeGenFunctions, CodeGenStructs } from "../../tools/codegen/types.ts";');
  writePrintF("export const sizeOfInt = %llu;", "sizeof(int)");
  writePrintF("export const enums: CodeGenEnums = {};");
  writePrintF("export const functions: CodeGenFunctions = {};");
  writePrintF("export const structs: CodeGenStructs = {};");
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
      // outputDefine(capture);
      shouldFlush = true;
    } else if (
      captureMode === "enum" && line.startsWith("} ") &&
      line.endsWith(";")
    ) {
      // outputEnum(capture);
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
      // outputStruct(capture);
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

  if (
    enumName === "SDL_PixelFormatEnum" ||
    enumName === "SDL_SYSWM_TYPE" ||
    enumName === "SDL_WindowFlags"
  ) {
    return;
  }

  writePrintF("/* enum */");
  writePrintF(`${enumName}: {`);
  writePrintF(`\tvalues: {`);

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

      const computeMacroValue = MACROS_TO_COMPUTE.some((x) => value!.startsWith(x));

      if (computeMacroValue) {
        writePrintF(`\t\t${key}: "%d",`, value);
      } else {
        writePrintF(`\t\t${key}: "${value}",`);
      }
    } else {
      writePrintF(`\t\t${key}: "%d",`, key);
    }
  }

  writePrintF(`\t}`);
  writePrintF("},");
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

  // These functions are problematic
  if (
    [
      "int", // SDL_HapticQuery
      "long", // SDL_strtoul

      "SDL_asprintf",
      "SDL_bsearch",
      "SDL_CreateShapedWindow",
      "SDL_hid_open_path",
      "SDL_LoadWAV_RW",
      "SDL_LockMutex",
      "SDL_Log",
      "SDL_LogCritical",
      "SDL_LogDebug",
      "SDL_LogError",
      "SDL_LogInfo",
      "SDL_LogMessage",
      "SDL_LogMessageV",
      "SDL_LogVerbose",
      "SDL_LogWarn",
      "SDL_memcpy",
      "SDL_memmove",
      "SDL_memset",
      "SDL_qsort",
      "SDL_ReportAssertion",
      "SDL_SetError",
      "SDL_snprintf",
      "SDL_sscanf",
      "SDL_strlcat",
      "SDL_strlcpy",
      "SDL_UIKitRunApp",
      "SDL_vsnprintf",
      "SDL_uitoa",
      "SDL_UnlockMutex",
      "SDL_utf8strlcpy",
      "SDL_wcslcat",
      "SDL_wcslcpy",
    ].includes(functionName)
  ) {
    return;
  }

  writePrintF(`functions["${functionName}"] = {`);
  writePrintF("\tparameters: {");

  for (let i = 2; i < parts.length; i += 2) {
    let paramType = parts[i];
    let paramName = parts[i + 1];

    if (paramName === undefined) {
      continue;
    }

    if (paramName.startsWith("**")) {
      paramType += "**";
      paramName = paramName.substring("**".length);
    } else if (paramName.startsWith("*")) {
      paramType += "*";
      paramName = paramName.substring("*".length);
    }

    writePrintF(`\t\t${paramName}: {`);
    writePrintF(`\t\t\ttype: "${paramType}",`);
    writePrintF(`\t\t},`);
  }

  writePrintF("\t},");
  writePrintF("\tresult: {");
  writePrintF(`\t\ttype: "${returnType}",`);
  writePrintF(`\t},`);
  writePrintF("};");
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
      "SDL_VirtualJoystickDesc",
    ].includes(structName)
  ) {
    return;
  }

  writePrintF("/* struct */");
  writePrintF(`${structName}: {`);
  writePrintF("\tsize: %llu,", `sizeof(${structName})`);
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
      writePrintF(`\t\t\ttype: "${type}",`);
      writePrintF(`\t\t\toffset: %llu,`, `offsetof(${structName}, ${name})`);
      writePrintF("\t\t},");
    }
  }

  writePrintF("\t}");
  writePrintF("},");
}

function stringify(obj: unknown): string {
  const json = JSON.stringify(obj);
  const unquoted = json.replace(/"([^"]+)":/g, "$1:");
  return unquoted;
}

async function updateCodeGenInput(
  scrapedEnums: CodeGenEnums,
  scrapedFunctions: CodeGenFunctions,
  scrapedStructs: CodeGenStructs,
): Promise<void> {
  await updateCodeGenFunctions(scrapedFunctions);
}

async function updateCodeGenFunctions(scrapedFunctions: CodeGenFunctions): Promise<void> {
  const { functions } = await import("./codegen/SDL/functions.ts");

  for (const [funcName, func] of Object.entries(scrapedFunctions)) {
    if (funcName.startsWith("SDL_GL") || funcName.startsWith("SDL_Vulkan")) {
      continue;
    }

    if (funcName.includes("Window") && functions[funcName] === undefined) {
      functions[funcName] = func;
    }
  }

  const output = `import { CodeGenFunctions } from "../types.ts";
  
export const functions: CodeGenFunctions = ${stringify(functions)} as const;`;

  await Deno.writeTextFile("./codegen/SDL/functions.ts", output);
}
