import { Pointer, PointerValue } from "../mod.ts";
import { AllocatableStruct, AllocatableStructConstructor, BoxableValue, BoxableValueConstructor } from "./types.ts";
import { NumberStruct, PointerStruct } from "./_structs.ts";
import { sizeof } from "./_utils.ts";

export function getBoxableValueConsturctor(
  _constructor: BoxableValueConstructor,
): AllocatableStructConstructor<AllocatableStruct> {
  if (_constructor === Number) {
    _constructor = NumberStruct;
  } else if (_constructor === Pointer) {
    _constructor = PointerStruct;
  }

  return _constructor as AllocatableStructConstructor<AllocatableStruct>;
}

export class BoxedValue<T extends BoxableValue> {
  public readonly _data: Uint8Array;
  private readonly _value: T;

  protected constructor(_constructor: BoxableValueConstructor) {
    const realConstructor = getBoxableValueConsturctor(_constructor);

    const dataLength = sizeof(_constructor);

    this._data = new Uint8Array(dataLength);
    this._value = new realConstructor(this._data) as T;
  }

  public static create<T>(_constructor: BoxableValueConstructor): BoxedValue<T> {
    return new BoxedValue(_constructor);
  }

  public get value(): T {
    if (this._value instanceof NumberStruct || this._value instanceof PointerStruct) {
      return this._value.value as T;
    }

    return this._value;
  }
}

export function isBoxedValue(value: unknown): value is BoxedValue<BoxableValue> {
  return (value instanceof BoxedValue);
}

export class BoxedArray<T extends BoxableValue> {
  private constructor(
    public readonly _data: Uint8Array,
    public readonly array: T[],
    public readonly sizeOfElementInBytes: number,
  ) {
  }

  public static create<T extends BoxableValue>(
    _constructor: BoxableValueConstructor,
    length: number,
  ): BoxedArray<T> {
    if (length <= 0) {
      throw new Error("length must be > 0.");
    }

    const realConstructor = getBoxableValueConsturctor(_constructor);

    const sizeInBytes = sizeof(_constructor);

    const array = new Array<T>(length);
    const data = new Uint8Array(sizeInBytes * length);

    for (let i = 0; i < length; i++) {
      const dataOffset = new Uint8Array(data.buffer, sizeInBytes * i, sizeInBytes);
      array[i] = new realConstructor(dataOffset) as T;
    }

    return new BoxedArray<T>(
      data,
      array,
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

// @ts-ignore TypeScript doesn't like that we're declaring a new create method.
export class BoxedPointer<T> extends BoxedValue<PointerValue<T>> {
  public static create<T>(): BoxedValue<PointerValue<T>> {
    return BoxedValue.create<PointerValue<T>>(Pointer);
  }
}
