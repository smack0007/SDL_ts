import { BoxedArray, BoxedPointer, BoxedValue, Memory, SDL } from "../../mod.ts";
import { ASSETS_PATH, joinPath, SDL_LIB_PATH } from "../paths.ts";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;

function main(): number {
  SDL.Init(SDL.INIT_VIDEO, SDL_LIB_PATH);

  const windowBox = new BoxedPointer<SDL.Window>();
  const rendererBox = new BoxedPointer<SDL.Renderer>();

  SDL.CreateWindowAndRenderer(
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WINDOW_SHOWN,
    windowBox,
    rendererBox,
  );

  if (windowBox.value == 0) {
    console.error(`Failed to create window: ${SDL.GetError()}`);
    return 1;
  }

  if (rendererBox.value == 0) {
    console.error(`Failed to create renderer: ${SDL.GetError()}`);
    return 1;
  }

  const window = windowBox.value;
  const renderer = rendererBox.value;
  console.info(window, renderer);

  const rendererInfo = new SDL.RendererInfo();
  if (SDL.GetRendererInfo(renderer, Memory.pointer(rendererInfo)) != 0) {
    console.error(`Failed to get renderer info: ${SDL.GetError()}`);
    return 1;
  }

  console.info(rendererInfo.name);
  console.info(rendererInfo.max_texture_width);
  console.info(rendererInfo.max_texture_height);
  console.info((rendererInfo.flags & SDL.RENDERER_ACCELERATED) === SDL.RENDERER_ACCELERATED);

  SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL.RenderClear(renderer);
  SDL.RenderPresent(renderer);
  SDL.RenderFlush(renderer);

  const denoSurface = SDL.Surface.createView(SDL.LoadBMP(joinPath(ASSETS_PATH, "jurassicDeno.bmp")));
  const srcRect = new SDL.Rect(0, 0, denoSurface.w, denoSurface.h);
  const destRect = new SDL.Rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  const textureCenter = new SDL.Point(denoSurface.w / 2, denoSurface.h / 2);
  let textureRotation = 0;
  const texture = SDL.CreateTextureFromSurface(renderer, Memory.pointer(denoSurface));
  SDL.FreeSurface(Memory.pointer(denoSurface));

  if (texture == 0) {
    console.error(`Failed to create texture: ${SDL.GetError()}`);
    return 1;
  }

  const points = new BoxedArray<SDL.Point>(SDL.Point, 4);
  points.at(0).x = 0;
  points.at(0).y = 0;
  points.at(1).x = 1;
  points.at(1).y = 0;
  points.at(2).x = 1;
  points.at(2).y = 1;
  points.at(3).x = 0;
  points.at(3).y = 1;

  const numkeys = new BoxedValue<number>(Number);

  const event = new SDL.Event();
  let done = false;
  while (!done) {
    while (SDL.PollEvent(Memory.pointer(event)) != 0) {
      if (event.type === SDL.QUIT) {
        done = true;
        break;
      }
    }

    if (done) {
      break;
    }

    const state = SDL.GetKeyboardState(Memory.pointer(numkeys));
    console.info(numkeys.value, Memory.readUint8(state, SDL.SCANCODE_ESCAPE));

    SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL.RenderClear(renderer);

    textureRotation += 0.1;
    SDL.RenderCopyEx(
      renderer,
      texture,
      Memory.pointer(srcRect),
      Memory.pointer(destRect),
      textureRotation,
      Memory.pointer(textureCenter),
      SDL.FLIP_NONE,
    );

    SDL.SetRenderDrawColor(renderer, 255, 0, 0, 255);
    SDL.RenderDrawPoints(renderer, points, 4);

    const rect = new SDL.Rect(100, 100, 200, 400);
    SDL.RenderDrawLine(renderer, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    SDL.RenderFillRect(renderer, Memory.pointer(rect));
    SDL.SetRenderDrawColor(renderer, 0, 0, 255, 255);
    SDL.RenderDrawRect(renderer, Memory.pointer(rect));

    SDL.RenderPresent(renderer);
    SDL.RenderFlush(renderer);

    SDL.Delay(16);
  }

  SDL.DestroyTexture(texture);
  SDL.DestroyRenderer(renderer);
  SDL.DestroyWindow(window);
  SDL.Quit();

  return 0;
}

Deno.exit(main());
