import { IMG, SDL } from "sdl-ts";
import { ASSETS_PATH } from "@shared/constants.ts";
import * as path from "@shared/path.ts";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;
const HALF_WINDOW_HEIGHT = WINDOW_HEIGHT / 2;

const FIRE_WIDTH = 1024;
const FIRE_HEIGHT = 120;

const FIRE_COLORS = [
  0x00000000,
  0xC0070707,
  0xC007071F,
  0xC0070F2F,
  0xC0070F47,
  0xC0071757,
  0xC0071F67,
  0xC0071F77,
  0xC007278F,
  0xC0072F9F,
  0xC0073FAF,
  0xC00747BF,
  0xC00747C7,
  0xC0074FDF,
  0xC00757DF,
  0xC00757DF,
  0xC0075FD7,
  0xC00F67D7,
  0xC00F6FCF,
  0xC00F77CF,
  0xC00F7FCF,
  0xC01787CF,
  0xC01787C7,
  0xC0178FC7,
  0xC01F97C7,
  0xC01F9FBF,
  0xC01F9FBF,
  0xC027A7BF,
  0xC027A7BF,
  0xC02FAFBF,
  0xC02FAFB7,
  0xC02FB7B7,
  0xC037B7B7,
  0xC06FCFCF,
  0xC09FDFDF,
  0xC0C7EFEF,
  0xC0FFFFFF,
];

function main(): number {
  SDL.Init(SDL.InitFlags.VIDEO);
  IMG.Init(IMG.InitFlags.PNG);

  const version = IMG.Linked_Version();

  if (version == null) {
    console.error("Failed to get SDL_image version.");
    return 1;
  }

  console.info(`SDL_image Version: ${version.major}.${version.minor}.${version.patch}`);

  const window = SDL.CreateWindow(
    "Doom Fire",
    SDL.WindowPos.CENTERED,
    SDL.WindowPos.CENTERED,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WindowFlags.SHOWN,
  );

  if (window == null) {
    console.error("Failed to create window.");
    return 1;
  }

  const frontBuffer = SDL.GetWindowSurface(window);

  if (frontBuffer == null) {
    console.error("Failed to get window surface.");
    return 1;
  }

  const denoSurfaceUnoptimized = IMG.Load(path.join(ASSETS_PATH, "jurassicDeno.png"));

  if (denoSurfaceUnoptimized == null) {
    console.error("Failed to load jurassicDeno.png.");
    return 1;
  }

  const denoSurface = SDL.ConvertSurface(denoSurfaceUnoptimized, frontBuffer.format, 0);

  if (denoSurface == null) {
    console.error("Failed to convert surface format of jurassicDeno.png.");
    return 1;
  }

  SDL.FreeSurface(denoSurfaceUnoptimized);

  const firePixels = new Uint32Array(FIRE_WIDTH * FIRE_HEIGHT);
  const fireSurface = SDL.CreateRGBSurfaceFrom(
    firePixels,
    FIRE_WIDTH,
    FIRE_HEIGHT,
    32,
    4 * FIRE_WIDTH,
    0x000000FF,
    0x0000FF00,
    0x00FF0000,
    0xFF000000,
  );

  if (fireSurface == null) {
    console.error("Failed to create fireSurface.");
    return 1;
  }

  const flamesRect = new SDL.Rect(0, HALF_WINDOW_HEIGHT, frontBuffer.w, HALF_WINDOW_HEIGHT);

  firePixels.fill(0x00000000);

  for (let x = 0; x < FIRE_WIDTH; x += 1) {
    firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + x] = FIRE_COLORS[FIRE_COLORS.length - 1];
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

  return 0;
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

Deno.exit(main());
