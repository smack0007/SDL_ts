import {
  AllocatableStruct,
  AllocatableStructConstructor,
  BoxableValue,
  BoxableValueConstructor,
  PointerValue,
} from "./types.ts";
import { Pointer } from "./pointers.ts";
import { NumberStruct, PointerStruct } from "./_structs.ts";
import { sizeof } from "./_utils.ts";

export function getBoxableValueConsturctor(
  _constructor: typeof Number | BoxableValueConstructor,
): AllocatableStructConstructor<AllocatableStruct> {
  let result = _constructor as unknown as AllocatableStructConstructor<AllocatableStruct>;
  
  if (_constructor === Number) {
    result = NumberStruct;
  } else if (_constructor === Pointer) {
    result = PointerStruct;
  }

  return result;
}

export class BoxedValue<T extends BoxableValue> {
  public readonly _data: Uint8Array;
  private readonly _value: T;

  public constructor(_constructor: BoxableValueConstructor) {
    const realConstructor = getBoxableValueConsturctor(_constructor);

    const dataLength = sizeof(_constructor);

    this._data = new Uint8Array(dataLength);
    this._value = realConstructor.of(this._data) as T;
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
    _constructor: BoxableValueConstructor,
    length: number,
  ) {
    if (length <= 0) {
      throw new Error("length must be > 0.");
    }

    const realConstructor = getBoxableValueConsturctor(_constructor);

    this.sizeOfElementInBytes = sizeof(_constructor);

    this.array = new Array<T>(length);
    this._data = new Uint8Array(this.sizeOfElementInBytes * length);

    for (let i = 0; i < length; i++) {
      const dataOffset = new Uint8Array(this._data.buffer, this.sizeOfElementInBytes * i, this.sizeOfElementInBytes);
      this.array[i] = realConstructor.of(dataOffset) as T;
    }
  }

  public static isBoxedArray(value: unknown): value is BoxedArray<BoxableValue> {
    return value instanceof BoxedArray;
  }

  public at(index: number): T {
    return this.array[index];
  }
}

export class BoxedPointer<T> extends BoxedValue<PointerValue<T>> {
  public constructor() {
    super(Pointer);
  }

  public static isBoxedPointer(value: unknown): value is BoxedPointer<unknown> {
    return value instanceof BoxedPointer;
  }
}
