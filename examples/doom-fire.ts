import * as SDL from "../mod.ts";

function main(): number {
  SDL.Init(SDL.INIT_VIDEO, "../ext/SDL/lib/x64/SDL2.dll");

  const window = SDL.CreateWindow(
    "Doom Fire",
    SDL.WINDOWPOS_CENTERED,
    SDL.WINDOWPOS_CENTERED,
    1024,
    768,
    SDL.WINDOW_SHOWN | SDL.WINDOW_RESIZABLE,
  );

  if (window.value === 0n) {
    console.error("Failed to create window.");
    return 1;
  }

  const frontbuffer = SDL.GetWindowSurface(window);
  const backbuffer = SDL.CreateRGBSurfaceWithFormat(0, frontbuffer.w, frontbuffer.h, 32, SDL.PIXELFORMAT_RGBX8888);

  console.info(backbuffer.pointer?.value);

  const event = new SDL.Event();

  let done = false;
  while (!done) {
    while (SDL.PollEvent(event) != 0) {
      if (event.type === SDL.QUIT) {
        done = true;
      }
    }

    SDL.LockSurface(backbuffer);
    draw(backbuffer);
    SDL.UnlockSurface(backbuffer);

    SDL.BlitSurface(backbuffer, null, frontbuffer, null);
    SDL.UpdateWindowSurface(window);

    SDL.Delay(16);
  }

  SDL.DestroyWindow(window);
  SDL.Quit();

  return 0;
}

let color = 0;

function draw(surface: SDL.Surface): void {
  color += 1;

  if (color >= 256) {
    color = 0;
  }

  SDL.FillRect(
    surface,
    null,
    SDL.MapRGB(surface.format, color, 0, 0),
  );
}

Deno.exit(main());
