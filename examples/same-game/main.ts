import { Box, BoxArray, IMG, Int, int, Pointer, SDL, SDLError, TTF, u64 } from "SDL_ts";
import { path } from "../../deps.ts";
import { Board } from "./logic/board.ts";
import { Random } from "./logic/random.ts";
import { drawBoard } from "./rendering/board.ts";
import { ASSETS_PATH } from "../../shared/constants.ts";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;
const UPDATE_INTERVAL = 16n; // 1000ms / 60fps

function main(): number {
  SDL.Init(SDL.InitFlags.VIDEO);
  IMG.Init(IMG.InitFlags.PNG);
  TTF.Init();

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

  const font = TTF.OpenFont(path.join(ASSETS_PATH, "Hack.ttf"), 24);

  if (font == null) {
    throw new SDLError(`Failed to load Hack.ttf: ${SDL.GetError()}`);
  }

  const fontSurface = TTF.RenderText_Solid(font, "Hello World!", new SDL.Color(255, 255, 255, 255));

  if (fontSurface == null) {
    throw new SDLError(`Failed to render fontSurface: ${SDL.GetError()}`);
  }

  const fontTexture = SDL.CreateTextureFromSurface(renderer, fontSurface);

  if (fontTexture == null) {
    throw new SDLError(`Failed to create texture from frontSurface: ${SDL.GetError()}`);
  }

  const board = new Board(new Random(12345));

  const event = new SDL.Event();

  let done = false;
  let lastTime = 0n;

  while (!done) {
    while (SDL.PollEvent(event) != 0) {
      switch (event.type) {
        case SDL.EventType.QUIT:
          done = true;
          break;

        case SDL.EventType.MOUSEBUTTONDOWN: {
          const mouseButtonEvent = event.mousebutton;
          if (event.mousebutton.clicks >= 2) {
            board.onDoubleClick();
          } else {
            board.onClick(mouseButtonEvent.x, mouseButtonEvent.y);
          }
          break;
        }
      }
    }

    const currentTime = SDL.GetTicks64();
    const elapsedTime = currentTime - lastTime;

    if (elapsedTime >= UPDATE_INTERVAL) {
      update(elapsedTime, board);
      draw(renderer, board, blockTexture, fontTexture);
      lastTime = currentTime;
    }
  }

  TTF.CloseFont(font);

  SDL.DestroyWindow(window);
  SDL.Quit();

  return 0;
}

function update(
  elapsed: u64,
  board: Board,
): void {
  board.update(elapsed);
}

function draw(
  renderer: Pointer<SDL.Renderer>,
  board: Board,
  blockTexture: SDL.Texture,
  fontTexture: SDL.Texture,
): void {
  SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL.RenderClear(renderer);

  drawBoard(renderer, board, blockTexture);

  SDL.RenderCopy(renderer, fontTexture, null, null);

  SDL.RenderPresent(renderer);
  SDL.RenderFlush(renderer);
}

try {
  Deno.exit(main());
} catch (err) {
  console.error(err);
  Deno.exit(1);
}
