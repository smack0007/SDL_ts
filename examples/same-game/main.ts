import { Box, BoxArray, IMG, Int, int, Pointer, SDL, SDLError } from "SDL_ts";
import { path } from "../../deps.ts";
import { ASSETS_PATH } from "../../shared/constants.ts";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;

function main(): number {
  SDL.Init(SDL.InitFlags.VIDEO);
  IMG.Init(IMG.InitFlags.PNG);

  const windowBox = new Box<Pointer<SDL.Window>>(Pointer);
  const rendererBox = new Box<Pointer<SDL.Renderer>>(Pointer);

  SDL.CreateWindowAndRenderer(
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WindowFlags.SHOWN,
    windowBox,
    rendererBox,
  );

  const window = windowBox.unboxNotNull(() => `Failed to create window: ${SDL.GetError()}`);
  const renderer = rendererBox.unboxNotNull(() => `Failed to create renderer: ${SDL.GetError()}`);

  SDL.SetWindowTitle(window, "Same Game");

  const blockTexture = IMG.LoadTexture(renderer, path.join(ASSETS_PATH, "blocks.png"));

  if (blockTexture == null) {
    throw new SDLError("Failed to create texture for block.png");
  }

  const textureSizeBox = new BoxArray<int>(Int, 2);
  SDL.QueryTexture(blockTexture, null, null, textureSizeBox.pointers.at(0), textureSizeBox.pointers.at(1));

  const blockTextureWidth = textureSizeBox.at(0);
  const blockTextureHeight = textureSizeBox.at(1);
  console.info("Block Texture Size", blockTextureWidth, blockTextureHeight);

  SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL.RenderClear(renderer);
  SDL.RenderCopy(renderer, blockTexture, null, new SDL.Rect(0, 0, blockTextureWidth, blockTextureHeight));
  SDL.RenderPresent(renderer);
  SDL.RenderFlush(renderer);

  const event = new SDL.Event();

  let done = false;
  while (!done) {
    while (SDL.PollEvent(event) != 0) {
      if (event.type === SDL.EventType.QUIT) {
        done = true;
      }
    }
  }

  SDL.DestroyWindow(window);
  SDL.Quit();

  return 0;
}

try {
  Deno.exit(main());
} catch (err) {
  console.error(err);
  Deno.exit(1);
}
