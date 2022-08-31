import { PlatformDataView } from "platform";
import { AllocatableStruct, AllocatableStructConstructor, BoxableValue, BoxableValueConstructor } from "./types.ts";
import { DATA_VIEW_METHODS, sizeof } from "./_utils.ts";

export class BoxedValue<T extends BoxableValue> {
  public readonly _data: Uint8Array;
  private readonly _view: PlatformDataView<T>;
  private readonly _viewMethod: (byteOffset: number) => T;

  private constructor(_constructor: BoxableValueConstructor) {
    const dataLength = sizeof(_constructor);

    this._data = new Uint8Array(dataLength);
    this._view = new PlatformDataView(this._data);

    const viewMethodName = DATA_VIEW_METHODS.get(_constructor)!;
    this._viewMethod = this._view[viewMethodName].bind(this._view) as (byteOffset: number) => T;
  }

  public static create<T>(_constructor: BoxableValueConstructor): BoxedValue<T> {
    return new BoxedValue(_constructor);
  }

  public get value(): T {
    return this._viewMethod(0);
  }
}

export function isBoxedValue(value: unknown): value is BoxedValue<BoxableValue> {
  return (value instanceof BoxedValue);
}

export class BoxedArray<T extends AllocatableStruct> {
  private constructor(
    public readonly array: T[],
    public readonly _data: Uint8Array,
    public readonly sizeOfElementInBytes: number,
  ) {
  }

  public static create<T extends AllocatableStruct>(
    _constructor: AllocatableStructConstructor<T>,
    length: number,
  ): BoxedArray<T> {
    if (length <= 0) {
      throw new Error("length must be > 0.");
    }

    const sizeInBytes = sizeof(_constructor);

    const array = new Array<T>(length);
    const data = new Uint8Array(sizeInBytes * length);

    for (let i = 0; i < length; i++) {
      const dataOffset = new Uint8Array(data.buffer, sizeInBytes * i, sizeInBytes);
      array[i] = new _constructor(dataOffset);
    }

    return new BoxedArray<T>(
      array,
      data,
      sizeof(_constructor),
    );
  }

  public at(index: number): T {
    return this.array[index];
  }
}

export function isBoxedArray(value: unknown): value is BoxedArray<AllocatableStruct> {
  return value instanceof BoxedArray;
}
