import { BoxedPointer, SDL } from "SDL_ts";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;

function main(): number {
  SDL.Init(SDL.InitFlags.VIDEO);

  const windowBox = new BoxedPointer<SDL.Window>();
  const rendererBox = new BoxedPointer<SDL.Renderer>();

  SDL.CreateWindowAndRenderer(
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WindowFlags.SHOWN,
    windowBox,
    rendererBox,
  );

  const window = windowBox.unboxNotNull(() => `Failed to create window: ${SDL.GetError()}`);
  const renderer = rendererBox.unboxNotNull(() => `Failed to create renderer: ${SDL.GetError()}`);

  SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL.RenderClear(renderer);
  SDL.RenderPresent(renderer);
  SDL.RenderFlush(renderer);

  const event = new SDL.Event();

  let done = false;
  while (!done) {
    while (SDL.PollEvent(event) != 0) {
      if (event.type === SDL.EventType.QUIT) {
        console.info("Done.");
        done = true;
      }
    }
  }

  SDL.DestroyWindow(window);
  SDL.Quit();

  return 0;
}

try {
  Deno.exit(main());
} catch {
  Deno.exit(1);
}
