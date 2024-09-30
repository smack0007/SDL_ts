import { IMG, Pointer, SDL, SDLError, TTF } from "SDL_ts";
import { IMG_FUNCTIONS, SDL_FUNCTIONS, TTF_FUNCTIONS } from "./sdlConfig.ts";
import { join } from "@std/path";
import { Board } from "./logic/board.ts";
import { Random } from "./logic/random.ts";
import { drawBoard } from "./rendering/board.ts";
import { ASSETS_PATH } from "../../shared/constants.ts";
import { createFontAtlas, drawString, FontAtlas } from "./fonts.ts";

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;
const UPDATE_INTERVAL = 16n; // 1000ms / 60fps
const FONT_SIZE = 24;

function main(): number {
  SDL.Init(SDL.InitFlags.VIDEO, { functions: SDL_FUNCTIONS });
  IMG.Init(IMG.InitFlags.PNG, { functions: IMG_FUNCTIONS });
  TTF.Init({ functions: TTF_FUNCTIONS });

  const [window, renderer] = SDL.CreateWindowAndRenderer(
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SDL.WindowFlags.SHOWN
  );

  SDL.SetWindowTitle(window, "Same Game");

  const blockTexture = IMG.LoadTexture(
    renderer,
    join(ASSETS_PATH, "blocks.png")
  );

  if (blockTexture == null) {
    throw new SDLError("Failed to create texture for block.png");
  }

  const font = createFontAtlas(
    renderer,
    join(ASSETS_PATH, "Hack.ttf"),
    FONT_SIZE
  );

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
            if (board.selectedBlockCount) {
              board.onDoubleClick();
            } else {
              board.onClick(mouseButtonEvent.x, mouseButtonEvent.y);
            }
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
      draw(renderer, board, blockTexture, font);
      lastTime = currentTime;
    }
  }

  SDL.DestroyWindow(window);
  SDL.Quit();

  return 0;
}

function update(elapsed: bigint, board: Board): void {
  board.update(elapsed);
}

function draw(
  renderer: Pointer<SDL.Renderer>,
  board: Board,
  blockTexture: Pointer<SDL.Texture>,
  font: FontAtlas
): void {
  SDL.SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL.RenderClear(renderer);

  drawBoard(renderer, board, blockTexture);

  drawString(
    renderer,
    font,
    new SDL.Point(0, Board.HeightInPixels + 2),
    `Score: ${board.score}`
  );
  drawString(
    renderer,
    font,
    new SDL.Point(0, Board.HeightInPixels + FONT_SIZE + 2),
    `Selected: ${board.selectedBlockCount}`
  );

  SDL.RenderPresent(renderer);
  SDL.RenderFlush(renderer);
}

try {
  Deno.exit(main());
} catch (err) {
  console.error(err);
  Deno.exit(1);
}
