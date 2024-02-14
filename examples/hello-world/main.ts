import { SDL } from "SDL_ts";
import { SDL_FUNCTIONS } from "./sdlConfig.ts";

SDL.Init(SDL.InitFlags.VIDEO, { functions: SDL_FUNCTIONS });

console.info("SDL Initialized.");

const version = new SDL.version();
SDL.GetVersion(version);
console.info(`SDL Version: ${version.major}.${version.minor}.${version.patch}`);
console.info(`SDL Revision: ${SDL.GetRevision()}`);

console.info(`${SDL.GetSystemRAM()} MB RAM available.`);

const createWindowResult = SDL.CreateWindow(
  "Hello World!",
  SDL.WindowPos.CENTERED,
  SDL.WindowPos.CENTERED,
  1024,
  768,
  SDL.WindowFlags.SHOWN | SDL.WindowFlags.RESIZABLE
);

if (createWindowResult == null) {
  console.error(`Failed to create window: ${SDL.GetError()}`);
  Deno.exit(1);
}

const window = createWindowResult;

let surface: SDL.Surface = null!;

function redraw(): void {
  const getWindowSurfaceResult = SDL.GetWindowSurface(window);

  if (getWindowSurfaceResult == null) {
    console.error(`Failed to get window surface: ${SDL.GetError()}`);
    Deno.exit(1);
  }

  surface = getWindowSurfaceResult;
  SDL.FillRect(surface, null, SDL.MapRGB(surface.format, 0x64, 0x95, 0xed));
  SDL.UpdateWindowSurface(window);
}

redraw();
console.info(surface.flags);
console.info("Width", surface.w, "Height", surface.h);

const event = new SDL.Event();
let done = false;
while (!done) {
  while (SDL.PollEvent(event) != 0) {
    if (event.type === SDL.EventType.QUIT) {
      console.info("Done.");
      done = true;
    } else if (event.type === SDL.EventType.WINDOWEVENT) {
      if (event.window.event === SDL.WindowEventID.SHOWN) {
        console.info(`Window ${event.window.windowID} shown.`);
      } else if (event.window.event === SDL.WindowEventID.EXPOSED) {
        console.info(`Window ${event.window.windowID} exposed.`);
        redraw();
      } else if (event.window.event === SDL.WindowEventID.MINIMIZED) {
        console.info(`Window ${event.window.windowID} minimized.`);
      } else if (event.window.event === SDL.WindowEventID.RESTORED) {
        console.info(`Window ${event.window.windowID} restored.`);
      } else if (event.window.event === SDL.WindowEventID.RESIZED) {
        console.info(
          `Window ${event.window.windowID} resized: ${event.window.data1} ${event.window.data2}`
        );
        redraw();
      } else {
        console.info("Unknown Window event: ", event.window.event);
      }
    } else if (event.type === SDL.EventType.KEYDOWN) {
      console.info(
        `KeyDown: ${event.key.keysym.scancode} "${SDL.GetScancodeName(
          event.key.keysym.scancode
        )}"`
      );
    } else if (event.type === SDL.EventType.KEYUP) {
      console.info(
        `KeyUp: ${event.key.keysym.scancode} "${SDL.GetScancodeName(
          event.key.keysym.scancode
        )}"`
      );
    } else if (event.type === SDL.EventType.MOUSEMOTION) {
      console.info(
        `MouseMotion: (${event.mousemotion.x}, ${event.mousemotion.y})`
      );
    } else if (event.type === SDL.EventType.MOUSEBUTTONDOWN) {
      console.info(
        `MouseButtonDown: ${event.mousebutton.button} (${event.mousebutton.x}, ${event.mousebutton.y})`
      );
    } else if (event.type === SDL.EventType.MOUSEBUTTONUP) {
      console.info(
        `MouseButtonUp: ${event.mousebutton.button} (${event.mousebutton.x}, ${event.mousebutton.y})`
      );
    } else if (event.type === SDL.EventType.MOUSEWHEEL) {
      console.info(
        `MouseWheel: ${event.mousewheel.direction} (${event.mousebutton.x}, ${event.mousebutton.y})`
      );
    }
  }
  SDL.Delay(1);
  // console.info(SDL.GetTicks64());
}

console.info("Destroying SDL Window...");
SDL.DestroyWindow(window);
console.info("SDL Window destoryed.");

SDL.Quit();
console.info("SDL Shutdown.");
