import { join } from "@std/path";
import { SRC_PATH } from "../../shared/constants.ts";
import { writeEnums, writeFunctions, writeSymbols } from "./generators.ts";
import { callbacks } from "./SDL_image/callbacks.ts";
import { enums } from "./SDL_image/enums.ts";
import { functions } from "./SDL_image/functions.ts";
import { opaqueStructs, structs } from "./SDL_image/structs.ts";
import { structs as SDL_structs } from "./SDL/structs.ts";
import { CodeGenContext } from "./types.ts";

const SDL_IMAGE_SRC_PATH = join(SRC_PATH, "SDL_image");

export async function codegenSDL_image(): Promise<void> {
  const allOpaqueStructs = ["SDL_Renderer", "SDL_Surface", "SDL_Texture", ...opaqueStructs];

  const allStructs = {
    SDL_version: {
      ...SDL_structs["SDL_version"],
      doNotImport: true,
    },
    ...structs,
  };

  const context: CodeGenContext = {
    libraryName: "SDL2_image",
    events: {},
    functions,
    callbacks,
    enums,
    structs: allStructs,
    opaqueStructs: allOpaqueStructs,
    typedefs: {},
  };

  await writeEnums(context, `${SDL_IMAGE_SRC_PATH}/enums.ts`, []);

  await writeSymbols(context, `${SDL_IMAGE_SRC_PATH}/_symbols.ts`);

  await writeFunctions(
    context,
    `${SDL_IMAGE_SRC_PATH}/functions.ts`,
    [
      `import { GetError } from "../SDL/functions.ts";`,
      `import { Renderer, Surface, Texture, version } from "../SDL/structs.ts";`,
    ],
  );
}
