import { join } from "@std/path";
import { SRC_PATH } from "../../shared/constants.ts";
import {
  writeCallbacks,
  writeEnums,
  writeFunctions,
  writeStructs,
  writeSymbols,
} from "./generators.ts";
import { callbacks } from "./SDL_ttf/callbacks.ts";
import { enums } from "./SDL_ttf/enums.ts";
import { functions } from "./SDL_ttf/functions.ts";
import { opaqueStructs, structs } from "./SDL_ttf/structs.ts";
import { structs as SDL_structs } from "./SDL/structs.ts";

const SDL_TTF_SRC_PATH = join(SRC_PATH, "SDL_ttf");

export async function codegenSDL_ttf(): Promise<void> {
  const allStructs = {
    SDL_Color: {
      ...SDL_structs["SDL_Color"],
      doNotImport: true,
    },
    SDL_Surface: {
      ...SDL_structs["SDL_Surface"],
      doNotImport: true,
    },
    SDL_version: {
      ...SDL_structs["SDL_version"],
      doNotImport: true,
    },
    ...structs,
  };

  // await writeEnums(`${SDL_TTF_SRC_PATH}/enums.ts`, enums, []);
  await writeStructs(
    `${SDL_TTF_SRC_PATH}/structs.ts`,
    callbacks,
    enums,
    structs,
    opaqueStructs
  );
  // await writeSymbols(`${SDL_TTF_SRC_PATH}/_symbols.ts`, functions, enums, allStructs, opaqueStructs);
  // await writeCallbacks(`${SDL_TTF_SRC_PATH}/callbacks.ts`, callbacks, enums, structs, opaqueStructs, []);
  await writeFunctions(
    `${SDL_TTF_SRC_PATH}/functions.ts`,
    "SDL2_ttf",
    functions,
    callbacks,
    enums,
    allStructs,
    opaqueStructs,
    [
      `import { GetError } from "../SDL/functions.ts";`,
      `import { Color, Surface, version } from "../SDL/structs.ts";`,
    ]
  );
}
