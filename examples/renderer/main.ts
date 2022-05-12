import SDL from "../../mod.ts";
import { SDL_LIB_PATH } from "../paths.ts";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;

function main(): number {
  SDL.Init(SDL.INIT_VIDEO, SDL_LIB_PATH);

  const window = SDL.CreateWindow(
    "SDL Renderer",
    SDL.WINDOWPOS_UNDEFINED,
    SDL.WINDOWPOS_UNDEFINED,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WINDOW_SHOWN,
  );

  if (window.value === 0n) {
    console.error(`Failed to create window: ${SDL.GetError()}`);
    return 1;
  }

  const renderer = SDL.CreateRenderer(window, -1, SDL.RENDERER_ACCELERATED | SDL.RENDERER_PRESENTVSYNC);

  if (renderer.value === 0n) {
    console.error(`Failed to create renderer: ${SDL.GetError()}`);
    return 1;
  }

  SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL.RenderClear(renderer);
  SDL.RenderPresent(renderer);

  const texture = SDL.CreateTexture(
    renderer,
    SDL.PIXELFORMAT_RGBX8888,
    SDL.TEXTUREACCESS_STREAMING,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
  );

  if (texture.value === 0n) {
    console.error(`Failed to create texture: ${SDL.GetError()}`);
    return 1;
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

    SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL.RenderClear(renderer);

    SDL.SetRenderDrawColor(renderer, 255, 0, 0, 255);
    const rect = new SDL.Rect(100, 100, 200, 400);
    SDL.RenderFillRect(renderer, rect);

    SDL.RenderPresent(renderer);

    SDL.Delay(16);
  }

  SDL.DestroyWindow(window);
  SDL.Quit();

  return 0;
}

Deno.exit(main());
