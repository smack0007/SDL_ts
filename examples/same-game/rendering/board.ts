import { Pointer, SDL } from "SDL_ts";
import { Board } from "../logic/board.ts";
import { Block } from "../logic/block.ts";
import { BlockColors } from "../logic/blockColors.ts";

export function drawBoard(
  renderer: Pointer<SDL.Renderer>,
  board: Board,
  blockTexture: Pointer<SDL.Texture>,
): void {
  SDL.SetTextureBlendMode(blockTexture, SDL.BlendMode.BLEND);

  for (let y = 0; y < Board.Height; y++) {
    for (let x = 0; x < Board.Width; x++) {
      const block = board.at(x, y);

      if (!block.isActive) {
        continue;
      }

      const xSrc = 0;

      const xDest = Math.trunc(x * Block.WidthInPixels);
      const yDest = Math.trunc(y * Block.HeightInPixels + block.offsetY);

      let r = 0, g = 0, b = 0;

      switch (block.color) {
        case BlockColors.red:
          r = 255;
          break;

        case BlockColors.green:
          g = 255;
          break;

        case BlockColors.blue:
          b = 255;
          break;

        case BlockColors.yellow:
          r = 255;
          g = 255;
          break;
      }

      SDL.SetTextureColorMod(blockTexture, r, g, b);
      SDL.SetTextureAlphaMod(blockTexture, 255);

      SDL.RenderCopy(
        renderer,
        blockTexture,
        new SDL.Rect(xSrc, 0, Block.WidthInPixels, Block.HeightInPixels),
        new SDL.Rect(xDest, yDest, Block.WidthInPixels, Block.HeightInPixels),
      );

      if (block.isSelected) {
        SDL.SetTextureColorMod(blockTexture, 0, 0, 0);
        SDL.SetTextureAlphaMod(blockTexture, 128);
        SDL.RenderCopy(
          renderer,
          blockTexture,
          new SDL.Rect(Block.WidthInPixels * 4, 0, Block.WidthInPixels, Block.HeightInPixels),
          new SDL.Rect(xDest, yDest, Block.WidthInPixels, Block.HeightInPixels),
        );
      }
    }
  }
}
