import { PlatformDataView, PlatformPointer } from "platform";
import { BoxableValue, BoxableValueConstructor, Pointer } from "./types.ts";
import { DATA_VIEW_METHODS, sizeof } from "./_utils.ts";

export interface PointerInternal<T> extends Pointer<T> {
  isPlatformPointer: boolean;

  setValue(value: T): void;
}

export function isPlatformPointer<T>(pointer: Pointer<T>): pointer is PlatformPointer<T> {
  return (pointer as PointerInternal<T>).isPlatformPointer;
}

export class ArrayPointer<T> implements PointerInternal<T> {
  public _pointer: Deno.UnsafePointer = null!;

  constructor(
    private _array: T[],
    private _offset: number,
  ) {
  }

  public get isPlatformPointer(): boolean {
    return false;
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

export class BoxedValue<T extends BoxableValue> implements Pointer<T> {
  private readonly _data: Uint8Array;
  private readonly _pointer: PlatformPointer<T>;
  private readonly _view: PlatformDataView<T>;
  private readonly _viewMethod: (byteOffset: number) => T;

  constructor(constructor: BoxableValueConstructor) {
    const dataLength = sizeof(constructor);

    this._data = new Uint8Array(dataLength);
    this._pointer = PlatformPointer.of<T>(this._data);
    this._view = new PlatformDataView(this._data);

    const viewMethodName = DATA_VIEW_METHODS.get(constructor)!;
    this._viewMethod = this._view[viewMethodName].bind(this._view) as (byteOffset: number) => T;
  }

  public get isNull(): boolean {
    return this._pointer.isNull;
  }

  public get address(): bigint {
    return this._pointer.address;
  }

  public get value(): T {
    return this._viewMethod(0);
  }
}
