import {
  AllocatableStruct,
  AllocatableStructConstructor,
  BoxableValue,
  BoxableValueConstructor,
  PointerValue,
} from "./types.ts";
import { Pointer } from "./_pointers.ts";
import { NumberStruct, PointerStruct } from "./_structs.ts";
import { sizeof } from "./_utils.ts";

export function getBoxableValueFactory<T extends BoxableValue>(
  _constructor: BoxableValueConstructor<T>,
): (data: Uint8Array) => T {
  let result = _constructor as unknown as AllocatableStructConstructor<AllocatableStruct>;

  if (_constructor === Number as unknown as BoxableValueConstructor<T>) {
    result = NumberStruct;
  } else if (_constructor === Pointer as unknown as BoxableValueConstructor<T>) {
    result = PointerStruct;
  }

  return result.of as (data: Uint8Array) => T;
}

export class BoxedValue<T extends BoxableValue> {
  public readonly _data: Uint8Array;
  private readonly _value: T;

  public constructor(_constructor: BoxableValueConstructor<T>) {
    const factory = getBoxableValueFactory(_constructor);

    const dataLength = sizeof(_constructor);

    this._data = new Uint8Array(dataLength);
    this._value = factory(this._data);
  }

  public static isBoxedValue(value: unknown): value is BoxedValue<BoxableValue> {
    return (value instanceof BoxedValue);
  }

  public get value(): T {
    if (this._value instanceof NumberStruct || this._value instanceof PointerStruct) {
      return this._value.value as T;
    }

    return this._value;
  }
}

export class BoxedArray<T extends BoxableValue> {
  public readonly sizeOfElementInBytes: number;
  public readonly array: T[];
  public readonly _data: Uint8Array;

  public constructor(
    _constructor: BoxableValueConstructor<T>,
    length: number,
  ) {
    if (length <= 0) {
      throw new Error("length must be > 0.");
    }

    const factory = getBoxableValueFactory(_constructor);

    this.sizeOfElementInBytes = sizeof(_constructor);

    this.array = new Array<T>(length);
    this._data = new Uint8Array(this.sizeOfElementInBytes * length);

    for (let i = 0; i < length; i++) {
      const dataSlice = new Uint8Array(this._data.buffer, this.sizeOfElementInBytes * i, this.sizeOfElementInBytes);
      this.array[i] = factory(dataSlice);
    }
  }

  public static isBoxedArray(value: unknown): value is BoxedArray<BoxableValue> {
    return value instanceof BoxedArray;
  }

  public at(index: number): T {
    return this.array[index];
  }
}

export class BoxedNumber extends BoxedValue<number> {
  public constructor() {
    super(Number as unknown as BoxableValueConstructor<number>);
  }

  public static isBoxedNumber(value: unknown): value is BoxedNumber {
    return value instanceof BoxedNumber;
  }
}

export class BoxedPointer<T> extends BoxedValue<PointerValue<T>> {
  public constructor() {
    super(Pointer as unknown as BoxableValueConstructor<PointerValue<T>>);
  }

  public static isBoxedPointer<T>(value: unknown): value is BoxedPointer<T> {
    return value instanceof BoxedPointer;
  }
}
