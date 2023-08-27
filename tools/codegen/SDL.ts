import { path } from "../../deps.ts";
import { SRC_PATH } from "../../shared/constants.ts";
import {
  writeCallbacks,
  writeCallbacksSymbols,
  writeEnums,
  writeEvents,
  writeFunctions,
  writeStructs,
  writeSymbols,
} from "./generators.ts";
import { callbacks } from "./SDL/callbacks.ts";
import { enums } from "./SDL/enums.ts";
import { events } from "./SDL/events.ts";
import { functions } from "./SDL/functions.ts";
import { opaqueStructs, structs } from "./SDL/structs.ts";

const SDL_SRC_PATH = path.join(SRC_PATH, "SDL");

export async function codegenSDL(): Promise<void> {
  await writeEnums(`${SDL_SRC_PATH}/enums.ts`, enums, []);
  await writeEvents(`${SDL_SRC_PATH}/events.ts`, events, callbacks, enums, structs, opaqueStructs);
  await writeStructs(`${SDL_SRC_PATH}/structs.ts`, callbacks, enums, structs, opaqueStructs);
  await writeSymbols(`${SDL_SRC_PATH}/_symbols.ts`, functions, callbacks, enums, structs, opaqueStructs);
  await writeCallbacksSymbols(`${SDL_SRC_PATH}/_callbacks.ts`, callbacks, enums, structs, opaqueStructs, []);
  await writeCallbacks(`${SDL_SRC_PATH}/callbacks.ts`, callbacks, enums, structs, opaqueStructs, []);
  await writeFunctions(
    `${SDL_SRC_PATH}/functions.ts`,
    "SDL2",
    functions,
    callbacks,
    enums,
    structs,
    opaqueStructs,
    [
      `import { Event } from "./events.ts";`,
      `import { RWMode } from "./types.ts";`,
    ],
  );
}
