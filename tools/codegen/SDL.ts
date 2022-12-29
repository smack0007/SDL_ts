import { join } from "std/path/mod.ts";
import { SRC_PATH } from "../../shared/constants.ts";
import { writeEnums, writeEvents, writeFunctions, writeStructs, writeSymbols } from "./generators.ts";
import { enums } from "./SDL/enums.ts";
import { events } from "./SDL/events.ts";
import { functionImplementations, functions } from "./SDL/functions.ts";
import { opaqueStructs, structs } from "./SDL/structs.ts";

const SDL_SRC_PATH = join(SRC_PATH, "SDL");

export async function codegenSDL(): Promise<void> {
  await writeEnums(`${SDL_SRC_PATH}/enums.ts`, enums, []);
  await writeEvents(`${SDL_SRC_PATH}/events.ts`, events, enums, structs, opaqueStructs);
  await writeStructs(`${SDL_SRC_PATH}/structs.ts`, enums, structs, opaqueStructs);
  await writeSymbols(`${SDL_SRC_PATH}/_symbols.ts`, functions, enums, structs, opaqueStructs);
  await writeFunctions(
    `${SDL_SRC_PATH}/functions.ts`,
    functions,
    functionImplementations,
    enums,
    structs,
    opaqueStructs,
    [
      `import { Event } from "./events.ts";`,
      `import { RWMode } from "./types.ts";`,
    ],
  );
}
