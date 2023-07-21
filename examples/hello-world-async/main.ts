import { Events, SDL } from "SDL_ts";
import { SDL_FUNCTIONS } from "./sdlConfig.ts";

SDL.Init(SDL.InitFlags.VIDEO, { functions: SDL_FUNCTIONS });

console.info("SDL Initialized.");

const window = SDL.CreateWindow(
  "Hello World!",
  SDL.WindowPos.CENTERED,
  SDL.WindowPos.CENTERED,
  1024,
  768,
  SDL.WindowFlags.SHOWN | SDL.WindowFlags.RESIZABLE,
);

if (window == null) {
  console.error(`Failed to create window: ${SDL.GetError()}`);
  Deno.exit(1);
}

let surface = SDL.GetWindowSurface(window);

if (surface == null) {
  console.error(`Failed to get window surface: ${SDL.GetError()}`);
  Deno.exit(1);
}

SDL.FillRect(
  surface,
  null,
  SDL.MapRGB(surface.format, 0x64, 0x95, 0xED),
);
SDL.UpdateWindowSurface(window);

for await (const event of Events.asyncIterator()) {
  if (event.type === SDL.EventType.QUIT) {
    console.info("Done.");
    break;
  } else if (event.type === SDL.EventType.WINDOWEVENT) {
    if (event.window.event === SDL.WindowEventID.SHOWN) {
      console.info(`Window ${event.window.windowID} shown.`);
    } else if (event.window.event === SDL.WindowEventID.MINIMIZED) {
      console.info(`Window ${event.window.windowID} minimized.`);
    } else if (event.window.event === SDL.WindowEventID.RESTORED) {
      console.info(`Window ${event.window.windowID} restored.`);
    } else if (event.window.event === SDL.WindowEventID.RESIZED) {
      console.info(`Window ${event.window.windowID} resized: ${event.window.data1} ${event.window.data2}`);
      surface = SDL.GetWindowSurface(window);

      if (surface == null) {
        console.error(`Failed to get window surface: ${SDL.GetError()}`);
        Deno.exit(1);
      }

      SDL.FillRect(
        surface,
        null,
        SDL.MapRGB(surface.format, 0x64, 0x95, 0xED),
      );
      SDL.UpdateWindowSurface(window);
    }
  } else if (event.type === SDL.EventType.KEYDOWN) {
    console.info(`KeyDown: ${event.key.keysym.scancode} "${SDL.GetScancodeName(event.key.keysym.scancode)}"`);
  } else if (event.type === SDL.EventType.KEYUP) {
    console.info(`KeyUp: ${event.key.keysym.scancode} "${SDL.GetScancodeName(event.key.keysym.scancode)}"`);
  } else if (event.type === SDL.EventType.MOUSEMOTION) {
    console.info(`MouseMotion: (${event.mousebutton.x}, ${event.mousebutton.y})`);
  } else if (event.type === SDL.EventType.MOUSEBUTTONDOWN) {
    console.info(`MouseButtonDown: ${event.mousebutton.button} (${event.mousebutton.x}, ${event.mousebutton.y})`);
  } else if (event.type === SDL.EventType.MOUSEBUTTONUP) {
    console.info(`MouseButtonUp: ${event.mousebutton.button} (${event.mousebutton.x}, ${event.mousebutton.y})`);
  } else if (event.type === SDL.EventType.MOUSEWHEEL) {
    console.info(`MouseWheel: ${event.mousewheel.direction} (${event.mousebutton.x}, ${event.mousebutton.y})`);
  }
}

SDL.DestroyWindow(window);
SDL.Quit();
console.info("SDL Shutdown.");
