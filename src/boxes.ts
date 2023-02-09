import {
  AllocatableStruct,
  AllocatableStructConstructor,
  BoxableValue,
  BoxableValueConstructor,
  OrFactory,
  PointerValue,
  Predicate,
} from "./types.ts";
import { Pointer } from "./_pointers.ts";
import { NumberStruct, PointerStruct } from "./_structs.ts";
import { sizeof, throwError } from "./_utils.ts";

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

  public unbox(
    predicate: Predicate<T>,
    errorMessage: OrFactory<string>,
  ): T {
    return predicate(this.value) ? this.value : throwError(errorMessage);
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
    const result = this.array[index];

    if (result instanceof NumberStruct || result instanceof PointerStruct) {
      return result.value as T;
    }

    return result;
  }

  public unbox(
    predicate: Predicate<T[]>,
    errorMessage: string,
  ): T[] {
    return predicate(this.array) ? this.array : throwError(errorMessage);
  }

  public readonly pointers = {
    at: (index: number) => {
      return Pointer.ofTypedArray(this._data, index * this.sizeOfElementInBytes);
    },
  };
}

export class BoxedNumber extends BoxedValue<number> {
  public constructor() {
    super(Number as unknown as BoxableValueConstructor<number>);
  }

  public static isBoxedNumber(value: unknown): value is BoxedNumber {
    return value instanceof BoxedNumber;
  }
}

export class BoxedNumberArray extends BoxedArray<number> {
  public constructor(length: number) {
    super(Number as unknown as BoxableValueConstructor<number>, length);
  }

  public static isBoxedNumberArray(value: unknown): value is BoxedNumberArray {
    return value instanceof BoxedNumberArray;
  }
}

export class BoxedPointer<T> extends BoxedValue<PointerValue<T>> {
  public constructor() {
    super(Pointer as unknown as BoxableValueConstructor<PointerValue<T>>);
  }

  public static isBoxedPointer<T>(value: unknown): value is BoxedPointer<T> {
    return value instanceof BoxedPointer;
  }

  public unboxNotNull(
    errorMessage: OrFactory<string>,
  ): PointerValue<T> {
    return this.unbox((value) => value != 0, errorMessage);
  }
}

export class BoxedPointerArray<T> extends BoxedArray<PointerValue<T>> {
  public constructor(length: number) {
    super(Pointer as unknown as BoxableValueConstructor<PointerValue<T>>, length);
  }

  public static isBoxedPointerArray<T>(value: unknown): value is BoxedPointerArray<T> {
    return value instanceof BoxedPointerArray;
  }
}
