import { Block } from "./block.ts";
import { BlockColors } from "./blockColors.ts";
import { Random } from "./random.ts";

export class Board {
  public static readonly WidthInPixels = 1024;
  public static readonly HeightInPixels = 768 - Block.HeightInPixels * 2;

  public static readonly Width = Board.WidthInPixels / Block.WidthInPixels;
  public static readonly Height = Board.HeightInPixels / Block.HeightInPixels;
  public static readonly BlockCount = Board.Width * Board.Height;

  private _blocks: Block[] = [];
  private _score = 0;

  public get selectedBlockCount(): number {
    return this._blocks.filter((x) => x.isSelected).length;
  }

  public get score(): number {
    return this._score;
  }

  constructor(private _random: Random) {
    for (let i = 0; i < Board.BlockCount; i++) {
      const blockColor = this._random.nextInt(0, 3) as BlockColors;
      this._blocks[i] = new Block(blockColor);
    }
  }

  public at(x: number, y: number): Block {
    return this._blocks[y * Board.Width + x];
  }

  public onClick(x: number, y: number): void {
    this.unselectAllBlocks();

    const blockX = Math.floor(x / Block.WidthInPixels);
    const blockY = Math.floor(y / Block.HeightInPixels);
    const block = this.at(blockX, blockY);

    this.selectBlock(block, blockX, blockY);
  }

  public onDoubleClick(): void {
    const selected = this._blocks.filter((block) => block.isSelected);
    if (selected.length <= 1) {
      return;
    }

    let scoreForSelectedBlocks = 0;
    for (const block of selected) {
      block.deactivate();
      scoreForSelectedBlocks += 1;
    }

    this._score += scoreForSelectedBlocks;
  }

  public update(elapsed: bigint): void {
    for (let y = Board.Height - 1; y >= 0; y -= 1) {
      for (let x = 0; x < Board.Width; x += 1) {
        const block = this.at(x, y);
        block.update(elapsed);

        if (y < Board.Height - 1) {
          const blockBelow = this.at(x, y + 1);
          if (!blockBelow.isActive) {
            block.fallDown(blockBelow);
          }
        }
      }
    }
  }

  private unselectAllBlocks(): void {
    for (const block of this._blocks) {
      block.unselect();
    }
  }

  private selectBlock(startingBlock: Block, x: number, y: number): void {
    const block = this.at(x, y);

    if (!block.isActive || block.isSelected || block.color !== startingBlock.color) {
      return;
    }

    block.select();

    if (x > 0) {
      this.selectBlock(startingBlock, x - 1, y);
    }

    if (x < Board.Width - 1) {
      this.selectBlock(startingBlock, x + 1, y);
    }

    if (y > 0) {
      this.selectBlock(startingBlock, x, y - 1);
    }

    if (y < Board.Height - 1) {
      this.selectBlock(startingBlock, x, y + 1);
    }
  }
}
