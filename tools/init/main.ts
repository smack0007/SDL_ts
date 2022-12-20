import { SDL } from "SDL_ts";

function main(): number {
  SDL.Init(SDL.InitFlags.VIDEO);

  const window = SDL.CreateWindow(
    "SDL_ts",
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
