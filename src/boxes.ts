import {
  AllocatableStruct,
  AllocatableStructConstructor,
  BoxableValue,
  BoxableValueConstructor,
  BoxableValueFactory,
  F32,
  F64,
  Factory,
  I16,
  I32,
  I64,
  I8,
  Int,
  OrFactory,
  PointerValue,
  Predicate,
  U16,
  U32,
  U64,
  U8,
} from "./types.ts";
import { Pointer } from "./_pointers.ts";
import { NumberStruct, PointerStruct } from "./_structs.ts";
import { throwError } from "./_utils.ts";

type BoxableValueConverter<T extends BoxableValue> = (data: Uint8Array) => T;

function sizeof<T extends BoxableValue>(
  factoryOrConstructor: BoxableValueFactory<T> | BoxableValueConstructor<T>,
): number {
  if ("SIZE_IN_BYTES" in (factoryOrConstructor as unknown as AllocatableStructConstructor<AllocatableStruct>)) {
    return (factoryOrConstructor as unknown as AllocatableStructConstructor<AllocatableStruct>).SIZE_IN_BYTES;
  }

  switch (factoryOrConstructor) {
    case I8:
    case U8:
      return 1;

    case I16:
    case U16:
      return 2;

    case I32:
    case U32:
    case F32:
    case Int: // TODO: Does this need to be platform dependent?
      return 4;

    case I64:
    case U64:
    case F64:
      return 8;
  }

  throwError(`${(factoryOrConstructor)?.name} is not boxable. sizeof not implemented.`);
}

export function getConverter<T extends BoxableValue>(
  factoryOrConstructor: BoxableValueFactory<T> | BoxableValueConstructor<T>,
): BoxableValueConverter<T> {
  if (
    NumberStruct.isFactory(factoryOrConstructor as unknown as Factory<T>)
  ) {
    return NumberStruct.of as unknown as BoxableValueConverter<T>;
  } else if (factoryOrConstructor === Pointer as unknown as BoxableValueFactory<T>) {
    return PointerStruct.of as unknown as BoxableValueConverter<T>;
  } else if ("of" in factoryOrConstructor as unknown as AllocatableStructConstructor<T>) {
    return (factoryOrConstructor as unknown as AllocatableStructConstructor<T>).of as unknown as BoxableValueConverter<
      T
    >;
  }

  throw new Error(
    `${(factoryOrConstructor)?.name} is not boxable. getConverter not implemented.`,
  );
}

export class BoxedValue<T extends BoxableValue> {
  public readonly _data: Uint8Array;
  private readonly _value: T;

  public constructor(factoryOrConstructor: BoxableValueFactory<T> | BoxableValueConstructor<T>) {
    const dataLength = sizeof(factoryOrConstructor);
    const converter = getConverter(factoryOrConstructor);

    this._data = new Uint8Array(dataLength);
    this._value = converter(this._data);
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
    factoryOrConstructor: BoxableValueFactory<T> | BoxableValueConstructor<T>,
    length: number,
  ) {
    if (length <= 0) {
      throw new Error("length must be > 0.");
    }

    this.sizeOfElementInBytes = sizeof(factoryOrConstructor);
    const converter = getConverter(factoryOrConstructor);

    this.array = new Array<T>(length);
    this._data = new Uint8Array(this.sizeOfElementInBytes * length);

    for (let i = 0; i < length; i++) {
      const dataSlice = new Uint8Array(this._data.buffer, this.sizeOfElementInBytes * i, this.sizeOfElementInBytes);
      this.array[i] = converter(dataSlice);
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
    super(Number as unknown as BoxableValueFactory<number>);
  }

  public static isBoxedNumber(value: unknown): value is BoxedNumber {
    return value instanceof BoxedNumber;
  }
}

export class BoxedNumberArray extends BoxedArray<number> {
  public constructor(length: number) {
    super(Number as unknown as BoxableValueFactory<number>, length);
  }

  public static isBoxedNumberArray(value: unknown): value is BoxedNumberArray {
    return value instanceof BoxedNumberArray;
  }
}

export class BoxedPointer<T> extends BoxedValue<PointerValue<T>> {
  public constructor() {
    super(Pointer as unknown as BoxableValueFactory<PointerValue<T>>);
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
    super(Pointer as unknown as BoxableValueFactory<PointerValue<T>>, length);
  }

  public static isBoxedPointerArray<T>(value: unknown): value is BoxedPointerArray<T> {
    return value instanceof BoxedPointerArray;
  }
}
