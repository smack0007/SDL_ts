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

  public constructor(_constructor: BoxableValueConstructor) {
    const realConstructor = getBoxableValueConsturctor(_constructor);

    const dataLength = sizeof(_constructor);

    this._data = new Uint8Array(dataLength);
    this._value = new realConstructor(this._data) as T;
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
      this.array[i] = new realConstructor(dataOffset) as T;
    }
  }

  public at(index: number): T {
    return this.array[index];
  }
}

export function isBoxedArray(value: unknown): value is BoxedArray<AllocatableStruct> {
  return value instanceof BoxedArray;
}

export class BoxedPointer<T> extends BoxedValue<PointerValue<T>> {
  public constructor() {
    super(Pointer);
  }
}
