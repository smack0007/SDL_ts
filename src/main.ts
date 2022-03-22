import {
  SDL_INIT_VIDEO,
  SDL_QUIT,
  SDL_WINDOWPOS_UNDEFINED,
  SDL_WINDOW_RESIZABLE,
  SDL_WINDOW_SHOWN,
} from "./constants.ts";
import {
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_Init,
  SDL_PollEvent,
  SDL_Quit,
} from "./functions.ts";

SDL_Init(SDL_INIT_VIDEO, "../ext/SDL/SDL2.dll");

console.info("SDL Initialized.");

const windowHandle = SDL_CreateWindow(
  "Hello World!",
  SDL_WINDOWPOS_UNDEFINED,
  SDL_WINDOWPOS_UNDEFINED,
  1024,
  768,
  SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE
);

if (windowHandle === 0) {
  console.error("Failed to create window.");
  Deno.exit(1);
}

const event = new Uint8Array(64);
const eventDataView = new DataView(event.buffer);

let done = false;
while (!done) {
  while (SDL_PollEvent(Deno.UnsafePointer.of(event)) != 0) {
    const eventType = eventDataView.getUint32(0, true);
    if (eventType === SDL_QUIT) {
      console.info("Done.");
      done = true;
    }
  }
}

console.info("Destroying SDL Window...");
SDL_DestroyWindow(windowHandle);
console.info("SDL Window destoryed.");

SDL_Quit();
console.info("SDL Shutdown.");
