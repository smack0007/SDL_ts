import { BoxedValue, Memory, Pointer, Renderer, SDL, Window } from "../../mod.ts";
import { ASSETS_PATH, joinPath, SDL_LIB_PATH } from "../paths.ts";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;

function main(): number {
  SDL.Init(SDL.INIT_VIDEO, SDL_LIB_PATH);

  const pointers: Pointer<Window | Renderer>[] = [];
  const windowBox = BoxedValue.create(SDL.Window);

  SDL.CreateWindowAndRenderer(
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WINDOW_SHOWN,
    Memory.pointer(windowBox),
    Memory.pointer(pointers, 1),
  );

  const window = windowBox.value;
  const renderer = pointers[1] as Pointer<Renderer>;
  console.info(window, renderer);

  if (windowBox.isNull) {
    console.error(`Failed to create window: ${SDL.GetError()}`);
    return 1;
  }

  if (renderer.isNull) {
    console.error(`Failed to create renderer: ${SDL.GetError()}`);
    return 1;
  }

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

  const denoSurface = SDL.LoadBMP(joinPath(ASSETS_PATH, "jurassicDeno.bmp"));
  const srcRect = new SDL.Rect(0, 0, denoSurface.value.w, denoSurface.value.h);
  const destRect = new SDL.Rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  const textureCenter = new SDL.Point(denoSurface.value.w / 2, denoSurface.value.h / 2);
  let textureRotation = 0;
  const texture = SDL.CreateTextureFromSurface(renderer, denoSurface);
  SDL.FreeSurface(denoSurface);

  if (texture.isNull) {
    console.error(`Failed to create texture: ${SDL.GetError()}`);
    return 1;
  }

  const points = Memory.allocateArray(SDL.Point, 4);
  points.array[0].x = 0;
  points.array[0].y = 0;
  points.array[1].x = 1;
  points.array[1].y = 0;
  points.array[2].x = 1;
  points.array[2].y = 1;
  points.array[3].x = 0;
  points.array[3].y = 1;

  const numkeys = BoxedValue.create<number>(Number);

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

    const state = SDL.GetKeyboardState(numkeys);
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
    const rect = new SDL.Rect(100, 100, 200, 400);
    SDL.RenderDrawPoints(renderer, points.pointer, 4);
    // SDL.RenderDrawLine(renderer, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    SDL.RenderFillRect(renderer, Memory.pointer(rect));
    SDL.SetRenderDrawColor(renderer, 0, 0, 255, 255);
    SDL.RenderDrawRect(renderer, Memory.pointer(rect));

    SDL.RenderPresent(renderer);
    SDL.RenderFlush(renderer);

    SDL.Delay(16);
  }

  SDL.DestroyTexture(texture);
  SDL.DestroyRenderer(renderer);
  SDL.DestroyWindow(windowBox);
  SDL.Quit();

  return 0;
}

Deno.exit(main());
