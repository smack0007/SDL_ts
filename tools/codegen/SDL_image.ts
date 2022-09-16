import { joinPath, SRC_PATH } from "../paths.ts";
import { writeEnums, writeEvents, writeFunctions, writeStructs, writeSymbols } from "./functions.ts";
import { enums } from "./SDL_image/enums.ts";


const SDL_IMAGE_PATH = joinPath(SRC_PATH, "SDL_image");

export async function codegenSDL_image(): Promise<void> {
  await writeEnums(`${SDL_IMAGE_PATH}/enums.ts`, enums, []);
  // await writeEvents(`${SDL_PATH}/events.ts`, events, structs, opaqueStructs);
  // await writeStructs(`${SDL_PATH}/structs.ts`, structs, opaqueStructs);
  // await writeSymbols(`${SDL_PATH}/_symbols.ts`, functions);
  // await writeFunctions(`${SDL_PATH}/functions.ts`, functions, functionImplementations, structs, opaqueStructs);
}
