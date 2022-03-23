import {
  SDL_CreateWindow,
  SDL_DestroyWindow,
  SDL_Init,
  SDL_INIT_VIDEO,
  SDL_PollEvent,
  SDL_QUIT,
  SDL_Quit,
  SDL_WINDOW_RESIZABLE,
  SDL_WINDOW_SHOWN,
  SDL_WINDOWPOS_CENTERED,
  SDL_WINDOWPOS_UNDEFINED,
} from "../mod.ts";

SDL_Init(SDL_INIT_VIDEO, "../ext/SDL/SDL2.dll");

console.info("SDL Initialized.");

const windowPtr = SDL_CreateWindow(
  "Hello World!",
  SDL_WINDOWPOS_CENTERED,
  SDL_WINDOWPOS_CENTERED,
  1024,
  768,
  SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE,
);

if (windowPtr.value === 0n) {
  console.error("Failed to create window.");
  Deno.exit(1);
}

const event = new Uint8Array(64);
const eventDataView = new DataView(event.buffer);
const eventPtr = Deno.UnsafePointer.of(event);

let done = false;
while (!done) {
  while (SDL_PollEvent(eventPtr) != 0) {
    const eventType = eventDataView.getUint32(0, true);
    if (eventType === SDL_QUIT) {
      console.info("Done.");
      done = true;
    }
  }
}

console.info("Destroying SDL Window...");
SDL_DestroyWindow(windowPtr);
console.info("SDL Window destoryed.");

SDL_Quit();
console.info("SDL Shutdown.");
