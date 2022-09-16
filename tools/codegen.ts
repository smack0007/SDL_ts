import { codegenSDL } from "./codegen/SDL.ts";

await main();

async function main(): Promise<void> {
  await codegenSDL();
}
