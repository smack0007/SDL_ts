import {
  SDL_INIT_VIDEO,
  SDL_QUIT,
  SDL_WINDOWPOS_UNDEFINED,
  SDL_WINDOW_RESIZABLE,
  SDL_WINDOW_SHOWN,
} from "./constants.ts";
import { Symbols, symbols } from "./symbols.ts";
import { encode } from "./utils.ts";

const sdl2Library = Deno.dlopen("../ext/SDL/SDL2.dll", symbols as Symbols);

const sdl2 = sdl2Library.symbols;

if ((sdl2.SDL_Init(SDL_INIT_VIDEO) as number) < 0) {
  console.error("Initialization failed.");
  Deno.exit(1);
}

console.info("SDL Initialized.");

const windowHandle = sdl2.SDL_CreateWindow(
  encode("Hello World!"),
  SDL_WINDOWPOS_UNDEFINED,
  SDL_WINDOWPOS_UNDEFINED,
  1024,
  768,
  SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE
) as number;

if (windowHandle === 0) {
  console.error("Failed to create window.");
  Deno.exit(1);
}

const event = new Uint8Array(64);
const eventDataView = new DataView(event.buffer);

let done = false;
while (!done) {
  while (sdl2.SDL_PollEvent(Deno.UnsafePointer.of(event)) != 0) {
    const eventType = eventDataView.getUint32(0, true);
    if (eventType === SDL_QUIT) {
      done = true;
    }
  }
}

sdl2.SDL_DestroyWindow(windowHandle);
sdl2.SDL_Quit();

console.info("SDL Shutdown.");
