import { joinPath, SRC_PATH } from "../paths.ts";
import { writeEnums, writeEvents, writeFunctions, writeStructs, writeSymbols } from "./generators.ts";
import { enums } from "./SDL/enums.ts";
import { events } from "./SDL/events.ts";
import { functionImplementations, functions } from "./SDL/functions.ts";
import { opaqueStructs, structs } from "./SDL/structs.ts";

const SDL_PATH = joinPath(SRC_PATH, "SDL");

export async function codegenSDL(): Promise<void> {
  await writeEnums(`${SDL_PATH}/enums.ts`, enums, [`import { SCANCODE_TO_KEYCODE } from "./keycode.ts";`]);
  await writeEvents(`${SDL_PATH}/events.ts`, events, enums, structs, opaqueStructs);
  await writeStructs(`${SDL_PATH}/structs.ts`, enums, structs, opaqueStructs);
  await writeSymbols(`${SDL_PATH}/_symbols.ts`, functions, enums, structs, opaqueStructs);
  await writeFunctions(`${SDL_PATH}/functions.ts`, functions, functionImplementations, enums, structs, opaqueStructs, [
    `import { Event } from "./events.ts";`,
    `import { RWMode } from "./types.ts";`,
  ]);
}
