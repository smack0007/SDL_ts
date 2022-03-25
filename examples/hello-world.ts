import * as SDL from "../mod.ts";

SDL.Init(SDL.INIT_VIDEO, "../ext/SDL/SDL2.dll");

console.info("SDL Initialized.");

const windowPtr = SDL.CreateWindow(
  "Hello World!",
  SDL.WINDOWPOS_CENTERED,
  SDL.WINDOWPOS_CENTERED,
  1024,
  768,
  SDL.WINDOW_SHOWN | SDL.WINDOW_RESIZABLE,
);

if (windowPtr.value === 0n) {
  console.error("Failed to create window.");
  Deno.exit(1);
}

const event = new SDL.Event();

let done = false;
while (!done) {
  while (SDL.PollEvent(event) != 0) {
    if (event.type === SDL.QUIT) {
      console.info("Done.");
      done = true;
    } else if (event.type === SDL.WINDOWEVENT) {
      const windowEvent = event as SDL.WindowEvent;
      if (windowEvent.event === SDL.WINDOWEVENT_SHOWN) {
        console.info(`Window ${windowEvent.windowID} shown.`);
      } else if (windowEvent.event === SDL.WINDOWEVENT_MINIMIZED) {
        console.info(`Window ${windowEvent.windowID} minimized.`);
      } else if (windowEvent.event === SDL.WINDOWEVENT_RESTORED) {
        console.info(`Window ${windowEvent.windowID} restored.`);
      }
    }
  }
}

console.info("Destroying SDL Window...");
SDL.DestroyWindow(windowPtr);
console.info("SDL Window destoryed.");

SDL.Quit();
console.info("SDL Shutdown.");
