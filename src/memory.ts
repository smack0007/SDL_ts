import { PlatformDataView, PlatformPointer } from "platform";
import { Struct } from "../mod.ts";
import { BoxableValue, BoxedValue, isBoxedValue } from "./boxedValue.ts";
import { AllocatableStruct, AllocatableStructConstructor, Pointer, u8 } from "./types.ts";
import { isStruct } from "./_structs.ts";

export class Memory {
  public static allocateArray<T extends AllocatableStruct>(
    _constructor: AllocatableStructConstructor<T>,
    length: number,
  ): MemoryArray<T> {
    if (length <= 0) {
      throw new Error("length must be > 0.");
    }

    const array = new Array<T>(length);
    const memory = new Uint8Array(_constructor.SIZE_IN_BYTES * length);

    for (let i = 0; i < length; i++) {
      const memoryOffset = new Uint8Array(memory.buffer, _constructor.SIZE_IN_BYTES * i, _constructor.SIZE_IN_BYTES);
      array[i] = new _constructor(memoryOffset);
    }

    return new MemoryArray<T>(array, memory, Memory.pointer(array, 0));
  }

  public static isPointer(value: unknown): value is Pointer<unknown> {
    return typeof value === "bigint" || typeof value === "number";
  }

  public static pointer<T extends BoxableValue>(value: BoxedValue<T>): Pointer<BoxedValue<T>>;
  public static pointer<T>(value: T[], offset: number): Pointer<T>;
  public static pointer<T>(value: T): Pointer<T>;
  public static pointer<T>(value: BoxedValue<BoxableValue> | T[] | T, offset?: number): Pointer<T> {
    if (offset === undefined) {
      offset = 0;
    }

    if (offset < 0) {
      throw new Error("offset must be >= 0.");
    }

    if (isBoxedValue(value)) {
      return PlatformPointer.of(value._data);
      // } else if (Array.isArray(value)) {
      //   return new ArrayPointer<T>(value, offset);
    } else if (isStruct<T>(value)) {
      if (value._data instanceof Uint8Array) {
        return PlatformPointer.of(value._data);
      } else {
        return value._data;
      }
    } else {
      throw new Error("Unable to create pointer.");
    }
  }

  public static readUint8<T>(pointer: Pointer<T>, byteOffset: number): u8 {
    // TODO: See if we can cache this somewhere.
    const dataView = new PlatformDataView(pointer);
    return dataView.getUint8(byteOffset);
  }

  public static structView<T extends Struct>(
    pointer: Pointer<T>,
    _constructor: new (pointer: Pointer<T>) => T,
  ): T {
    return new _constructor(pointer);
  }
}

export class MemoryArray<T extends AllocatableStruct> {
  constructor(
    public readonly array: T[],
    public readonly memory: Uint8Array,
    public readonly pointer: Pointer<T>,
  ) {
  }
}
