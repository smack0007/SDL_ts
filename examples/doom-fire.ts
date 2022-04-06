import * as SDL from "../mod.ts";

const FIRE_WIDTH = 500;
const FIRE_HEIGHT = 120;

const FIRE_COLORS = [
  0x00000000,
  0xC0070707,
  0xC007071f,
  0xC0070f2f,
  0xC0070f47,
  0xC0071757,
  0xC0071f67,
  0xC0071f77,
  0xC007278f,
  0xC0072f9f,
  0xC0073faf,
  0xC00747bf,
  0xC00747c7,
  0xC0074FDF,
  0xC00757DF,
  0xC00757DF,
  0xC0075FD7,
  0xC00F67D7,
  0xC00f6fcf,
  0xC00f77cf,
  0xC00f7fcf,
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

  const frontBuffer = SDL.GetWindowSurface(window);

  const pixels = new Uint32Array(FIRE_WIDTH * FIRE_HEIGHT);
  const backBuffer = SDL.CreateRGBSurfaceFrom(
    Deno.UnsafePointer.of(pixels),
    FIRE_WIDTH,
    FIRE_HEIGHT,
    32,
    4 * FIRE_WIDTH,
    0x000000FF,
    0x0000FF00,
    0x00FF0000,
    0xFF000000,
  );

  pixels.fill(0x00000000);

  for (let x = 0; x < FIRE_WIDTH; x += 1) {
    pixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + x] = FIRE_COLORS[FIRE_COLORS.length - 1];
  }

  const event = new SDL.Event();

  let done = false;
  while (!done) {
    while (SDL.PollEvent(event) != 0) {
      if (event.type === SDL.QUIT) {
        done = true;
        break;
      }
    }

    if (done) {
      break;
    }

    draw(pixels);

    SDL.FillRect(frontBuffer, null, 0x00000000);
    SDL.BlitSurface(backBuffer, null, frontBuffer, null);
    SDL.UpdateWindowSurface(window);

    SDL.Delay(16);
  }

  SDL.DestroyWindow(window);
  SDL.Quit();

  return 0;
}

function draw(pixels: Uint32Array): void {
  for (let x = 0; x < FIRE_WIDTH; x += 1) {
    for (let y = 1; y < FIRE_HEIGHT; y += 1) {
      spreadFire(y * FIRE_WIDTH + x, pixels);
    }
  }
}

function spreadFire(from: number, pixels: Uint32Array): void {
  const rand = Math.round(Math.random() * 3.0) & 3;
  const to = from - FIRE_WIDTH - rand + 1;

  let toValue = FIRE_COLORS.indexOf(pixels[from]) - 1 - (rand & 1);

  if (toValue < 0) {
    toValue = 0;
  }

  pixels[to] = FIRE_COLORS[toValue];
}

Deno.exit(main());
