import { BlockColors } from "./blockColors.ts";

export class Block {
  public static readonly WidthInPixels: number = 32;
  public static readonly HeightInPixels: number = 32;

  public static readonly FallRate: number = Block.HeightInPixels * 20;

  private _isActive = true;
  private _offsetY = 0;

  public get color(): BlockColors {
    return this._color;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public get isSelected(): boolean {
    return this._isSelected;
  }

  public get offsetY(): number {
    return this._offsetY;
  }

  constructor(private _color: BlockColors, private _isSelected: boolean = false) {}

  public select(): void {
    this._isSelected = true;
  }

  public unselect(): void {
    this._isSelected = false;
  }

  public deactivate(): void {
    this._isSelected = false;
    this._isActive = false;
  }

  public fallDown(blockBelow: Block): void {
    const tempColor = this._color;
    this._color = blockBelow._color;
    blockBelow._color = tempColor;

    const tempIsActive = this._isActive;
    this._isActive = blockBelow._isActive;
    blockBelow._isActive = tempIsActive;

    blockBelow._offsetY = this._offsetY - Block.HeightInPixels;
    this._offsetY = 0;
  }

  public update(elapsed: number): void {
    if (this._offsetY < 0) {
      this._offsetY += Block.FallRate * elapsed;
    }

    if (this._offsetY > 0) {
      this._offsetY = 0;
    }
  }
}
