import { Box, BoxArray, Int, int, Memory, Pointer, SDL } from "SDL_ts";
import { SDL_FUNCTIONS } from "./sdlConfig.ts";
import { ASSETS_PATH } from "../../shared/constants.ts";
import { join } from "@std/path";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;

function main(): void {
  SDL.Init(SDL.InitFlags.VIDEO, { functions: SDL_FUNCTIONS });

  const [window, renderer] = SDL.CreateWindowAndRenderer(
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WindowFlags.SHOWN | SDL.WindowFlags.RESIZABLE
  );

  SDL.RenderSetLogicalSize(renderer, WINDOW_WIDTH, WINDOW_HEIGHT);

  const rendererInfo = SDL.GetRendererInfo(renderer);
  console.info(rendererInfo.name);
  console.info(rendererInfo.max_texture_width);
  console.info(rendererInfo.max_texture_height);
  console.info(
    (rendererInfo.flags & SDL.RendererFlags.ACCELERATED) ===
      SDL.RendererFlags.ACCELERATED
  );

  SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL.RenderClear(renderer);
  SDL.RenderPresent(renderer);
  SDL.RenderFlush(renderer);

  const denoSurface = SDL.LoadBMP(join(ASSETS_PATH, "jurassicDeno.bmp"));

  const srcRect = new SDL.Rect(0, 0, denoSurface.w, denoSurface.h);
  const destRect = new SDL.Rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  const textureCenter = new SDL.Point(denoSurface.w / 2, denoSurface.h / 2);
  let textureRotation = 0;
  const texture = SDL.CreateTextureFromSurface(renderer, denoSurface);
  SDL.FreeSurface(denoSurface);

  const points = new BoxArray<SDL.Point>(SDL.Point, 4);
  points.at(0).x = 0;
  points.at(0).y = 0;
  points.at(1).x = 1;
  points.at(1).y = 0;
  points.at(2).x = 1;
  points.at(2).y = 1;
  points.at(3).x = 0;
  points.at(3).y = 1;

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

    // TODO: Move this to some kind of keyboard example.
    const state = SDL.GetKeyboardState();
    if (state[SDL.Scancode.ESCAPE]) {
      console.info("ESC is down.");
    }

    SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL.RenderClear(renderer);

    textureRotation += 0.1;
    SDL.RenderCopyEx(
      renderer,
      texture,
      srcRect,
      destRect,
      textureRotation,
      textureCenter,
      SDL.RendererFlip.NONE
    );

    SDL.SetRenderDrawColor(renderer, 255, 0, 0, 255);
    SDL.RenderDrawPoints(renderer, points, 4);

    const rect = new SDL.Rect(100, 100, 200, 400);
    SDL.RenderDrawLine(renderer, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    SDL.RenderFillRect(renderer, rect);
    SDL.SetRenderDrawColor(renderer, 0, 0, 255, 255);
    SDL.RenderDrawRect(renderer, rect);

    SDL.RenderPresent(renderer);
    SDL.RenderFlush(renderer);

    SDL.Delay(1);
  }

  SDL.DestroyTexture(texture);
  SDL.DestroyRenderer(renderer);
  SDL.DestroyWindow(window);
  SDL.Quit();
}

try {
  main();
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
