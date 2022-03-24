import * as sdl from "../mod.ts";

sdl.Init(sdl.INIT_VIDEO, "../ext/SDL/SDL2.dll");

console.info("SDL Initialized.");

const windowPtr = sdl.CreateWindow(
  "Hello World!",
  sdl.WINDOWPOS_CENTERED,
  sdl.WINDOWPOS_CENTERED,
  1024,
  768,
  sdl.WINDOW_SHOWN | sdl.WINDOW_RESIZABLE,
);

if (windowPtr.value === 0n) {
  console.error("Failed to create window.");
  Deno.exit(1);
}

const event = new sdl.Event();

let done = false;
while (!done) {
  while (sdl.PollEvent(event) != 0) {
    if (event.type === sdl.QUIT) {
      console.info("Done.");
      done = true;
    } else if (event.type === sdl.WINDOWEVENT) {
      const windowEvent = event as sdl.WindowEvent;
      if (windowEvent.event === sdl.WINDOWEVENT_SHOWN) {
        console.info(`Window ${windowEvent.windowID} shown.`);
      } else if (windowEvent.event === sdl.WINDOWEVENT_MINIMIZED) {
        console.info(`Window ${windowEvent.windowID} minimized.`);
      } else if (windowEvent.event === sdl.WINDOWEVENT_RESTORED) {
        console.info(`Window ${windowEvent.windowID} restored.`);
      }
    }
  }
}

console.info("Destroying SDL Window...");
sdl.DestroyWindow(windowPtr);
console.info("SDL Window destoryed.");

sdl.Quit();
console.info("SDL Shutdown.");
