import { joinPath, SRC_PATH } from "../paths.ts";
import { writeEnums, writeEvents, writeFunctions, writeStructs, writeSymbols } from "./functions.ts";
import { enums } from "./SDL/enums.ts";
import { events } from "./SDL/events.ts";
import { functionImplementations, functions } from "./SDL/functions.ts";
import { opaqueStructs, structs } from "./SDL/structs.ts";

const SDL_PATH = joinPath(SRC_PATH, "SDL");

export async function codegenSDL(): Promise<void> {
  await writeEnums(`${SDL_PATH}/enums.ts`, enums, [`import { SCANCODE_TO_KEYCODE } from "./keycode.ts";`]);
  await writeEvents(`${SDL_PATH}/events.ts`, events, structs, opaqueStructs);
  await writeStructs(`${SDL_PATH}/structs.ts`, structs, opaqueStructs);
  await writeSymbols(`${SDL_PATH}/_symbols.ts`, functions);
  await writeFunctions(`${SDL_PATH}/functions.ts`, functions, functionImplementations, structs, opaqueStructs, [
    `import { Event } from "./events.ts";`,
`import { RWMode } from "./types.ts";`
  ]);
}
