import { codegenSDL } from "./codegen/SDL.ts";
import { codegenSDL_image } from "./codegen/SDL_image.ts";
import { codegenSDL_ttf } from "./codegen/SDL_ttf.ts";

await main();

async function main(): Promise<void> {
  await codegenSDL();
  await codegenSDL_image();
  await codegenSDL_ttf();
}
