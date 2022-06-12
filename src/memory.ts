import { PlatformDataView, PlatformPointer } from "platform";
import {
  AllocatableStruct,
  AllocatableStructConstructor,
  BoxableValue,
  BoxableValueConstructor,
  Pointer,
  u8,
} from "./types.ts";
import { ArrayPointer, BoxedValue } from "./_pointers.ts";
import { isStruct } from "./_structs.ts";

interface MemoryPointerCache<T> {
  _pointer?: Pointer<T>;
}

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

  public static boxedValue<T extends BoxableValue>(constructor: BoxableValueConstructor): BoxedValue<T> {
    return new BoxedValue(constructor);
  }

  public static pointer<T extends BoxableValue>(value: BoxedValue<T>): Pointer<T>;
  public static pointer<T>(value: T[], offset: number): Pointer<T>;
  public static pointer<T>(value: T): Pointer<T>;
  // deno-lint-ignore no-explicit-any
  public static pointer<T>(value: BoxedValue<any> | T[] | T, offset?: number): Pointer<T> {
    if (offset === undefined) {
      offset = 0;
    }

    if (offset < 0) {
      throw new Error("offset must be >= 0.");
    }

    if (value instanceof BoxedValue) {
      return (value as unknown as MemoryPointerCache<T>)._pointer as Pointer<T>;
    } else if (Array.isArray(value)) {
      return new ArrayPointer<T>(value, offset);
    } else if (isStruct<T>(value)) {
      if (value._data instanceof Uint8Array) {
        const cache = value as unknown as MemoryPointerCache<T>;

        if (cache._pointer === undefined) {
          cache._pointer = PlatformPointer.of(value._data, value);
        }

        return cache._pointer;
      } else {
        return value._data;
      }
    } else {
      throw new Error("Unable to create pointer.");
    }
  }

  public static readUint8<T>(pointer: Pointer<T>, byteOffset: number): u8 {
    const dataView = new PlatformDataView(pointer as PlatformPointer<T>);
    return dataView.getUint8(byteOffset);
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
