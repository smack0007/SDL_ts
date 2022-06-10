import { Pointer } from "./types.ts";

export interface PointerInternal<T> extends Pointer<T> {
  setValue(value: T): void;
}

export class ArrayPointer<T> implements PointerInternal<T> {
  public _pointer: Deno.UnsafePointer = null!;

  constructor(
    private _array: T[],
    private _offset: number,
  ) {
  }

  public get isNull(): boolean {
    return false;
  }

  public get address(): bigint {
    return 0n;
  }

  public get value(): T {
    return this._array[this._offset];
  }

  public setValue(value: T): void {
    this._array[this._offset] = value;
  }
}
