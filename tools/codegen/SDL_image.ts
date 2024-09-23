import { join } from "@std/path";
import { SRC_PATH } from "../../shared/constants.ts";
import { writeCallbacks, writeEnums, writeFunctions, writeStructs, writeSymbols } from "./generators.ts";
import { callbacks } from "./SDL_image/callbacks.ts";
import { enums } from "./SDL_image/enums.ts";
import { functions } from "./SDL_image/functions.ts";
import { opaqueStructs, structs } from "./SDL_image/structs.ts";
import { structs as SDL_structs } from "./SDL/structs.ts";

const SDL_IMAGE_SRC_PATH = join(SRC_PATH, "SDL_image");

export async function codegenSDL_image(): Promise<void> {
  const allOpaqueStructs = [ "SDL_Renderer", "SDL_Surface", "SDL_Texture", ...opaqueStructs, ]
  
  const allStructs = {
    SDL_version: {
      ...SDL_structs["SDL_version"],
      doNotImport: true,
    },
    ...structs,
  };

  await writeEnums(`${SDL_IMAGE_SRC_PATH}/enums.ts`, enums, []);
  // await writeStructs(`${SDL_IMAGE_SRC_PATH}/structs.ts`, structs, opaqueStructs, []);
  await writeSymbols(
    `${SDL_IMAGE_SRC_PATH}/_symbols.ts`,
    functions,
    callbacks,
    enums,
    allStructs,
    allOpaqueStructs,
  );
  // await writeCallbacks(`${SDL_IMAGE_SRC_PATH}/callbacks.ts`, callbacks, enums, structs, opaqueStructs, []);
  await writeFunctions(
    `${SDL_IMAGE_SRC_PATH}/functions.ts`,
    "SDL2_image",
    functions,
    callbacks,
    enums,
    allStructs,
    allOpaqueStructs,
    [
      `import { GetError } from "../SDL/functions.ts";`,
      `import { Renderer, Surface, Texture, version } from "../SDL/structs.ts";`,
    ],
  );
}
