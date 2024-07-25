import { SDL } from "@smack0007/sdl-ts";

function main(): number {
  SDL.Init(SDL.InitFlags.VIDEO);

  const window = SDL.CreateWindow(
    "SDL_ts",
    SDL.WindowPos.CENTERED,
    SDL.WindowPos.CENTERED,
    1024,
    768,
    SDL.WindowFlags.SHOWN | SDL.WindowFlags.RESIZABLE
  );

  if (window == null) {
    console.error(`Failed to create window: ${SDL.GetError()}`);
    return 1;
  }

  const renderer = SDL.CreateRenderer(window, 0, SDL.RendererFlags.ACCELERATED);

  if (renderer === null) {
    console.error(`Failed to create window: ${SDL.GetError()}`);
    return 1;
  }

  SDL.RenderClear(renderer);
  SDL.RenderPresent(renderer);

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

Deno.exit(main());
