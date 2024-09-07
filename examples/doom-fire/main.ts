import { IMG, SDL } from "SDL_ts";
import { IMG_FUNCTIONS, SDL_FUNCTIONS } from "./sdlConfig.ts";
import { ASSETS_PATH } from "../../shared/constants.ts";
import { join } from "@std/path";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;
const HALF_WINDOW_HEIGHT = WINDOW_HEIGHT / 2;

const FIRE_WIDTH = 1024;
const FIRE_HEIGHT = 120;

const FIRE_COLORS = [
  0x00000000, 0xc0070707, 0xc007071f, 0xc0070f2f, 0xc0070f47, 0xc0071757,
  0xc0071f67, 0xc0071f77, 0xc007278f, 0xc0072f9f, 0xc0073faf, 0xc00747bf,
  0xc00747c7, 0xc0074fdf, 0xc00757df, 0xc00757df, 0xc0075fd7, 0xc00f67d7,
  0xc00f6fcf, 0xc00f77cf, 0xc00f7fcf, 0xc01787cf, 0xc01787c7, 0xc0178fc7,
  0xc01f97c7, 0xc01f9fbf, 0xc01f9fbf, 0xc027a7bf, 0xc027a7bf, 0xc02fafbf,
  0xc02fafb7, 0xc02fb7b7, 0xc037b7b7, 0xc06fcfcf, 0xc09fdfdf, 0xc0c7efef,
  0xc0ffffff,
];

function main(): void {
  SDL.Init(SDL.InitFlags.VIDEO, { functions: SDL_FUNCTIONS });
  IMG.Init(IMG.InitFlags.PNG, { functions: IMG_FUNCTIONS });

  const window = SDL.CreateWindow(
    "Doom Fire",
    SDL.WindowPos.CENTERED,
    SDL.WindowPos.CENTERED,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WindowFlags.SHOWN
  );

  const frontBuffer = SDL.GetWindowSurface(window);

  const denoSurfaceUnoptimized = IMG.Load(
    join(ASSETS_PATH, "jurassicDeno.png")
  );

  const denoSurface = SDL.ConvertSurface(
    denoSurfaceUnoptimized,
    frontBuffer.format,
    0
  );

  SDL.FreeSurface(denoSurfaceUnoptimized);

  const firePixels = new Uint32Array(FIRE_WIDTH * FIRE_HEIGHT);
  const fireSurface = SDL.CreateRGBSurfaceFrom(
    firePixels,
    FIRE_WIDTH,
    FIRE_HEIGHT,
    32,
    4 * FIRE_WIDTH,
    0x000000ff,
    0x0000ff00,
    0x00ff0000,
    0xff000000
  );

  const flamesRect = new SDL.Rect(
    0,
    HALF_WINDOW_HEIGHT,
    frontBuffer.w,
    HALF_WINDOW_HEIGHT
  );

  firePixels.fill(0x00000000);

  for (let x = 0; x < FIRE_WIDTH; x += 1) {
    firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + x] =
      FIRE_COLORS[FIRE_COLORS.length - 1];
  }

  let lastFrame = SDL.GetTicks64();

  const event = new SDL.Event();
  let done = false;
  while (!done) {
    while (SDL.PollEvent(event) != 0) {
      if (event.type === SDL.EventType.QUIT) {
        done = true;
        break;
      }
    }

    if (done) {
      break;
    }

    const current = SDL.GetTicks64();
    const elapsed = current - lastFrame;

    if (elapsed >= 16) {
      update(firePixels);

      SDL.BlitScaled(denoSurface, null, frontBuffer, null);
      SDL.BlitScaled(fireSurface, null, frontBuffer, flamesRect);
      SDL.UpdateWindowSurface(window);

      lastFrame = current;
      SDL.Delay(1);
    }
  }

  SDL.FreeSurface(denoSurface);
  SDL.FreeSurface(fireSurface);
  SDL.DestroyWindow(window);

  IMG.Quit();
  SDL.Quit();
}

function update(firePixels: Uint32Array): void {
  for (let x = 0; x < FIRE_WIDTH; x += 1) {
    for (let y = 1; y < FIRE_HEIGHT; y += 1) {
      spreadFire(firePixels, y * FIRE_WIDTH + x);
    }
  }
}

function spreadFire(firePixels: Uint32Array, from: number): void {
  const rand = Math.round(Math.random() * 3) & 3;
  const to = from - FIRE_WIDTH - rand + 1;

  let toValue = FIRE_COLORS.indexOf(firePixels[from]) - (rand & 1);

  if (toValue < 0) {
    toValue = 0;
  }

  firePixels[to] = FIRE_COLORS[toValue];
}

try {
  main();
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
