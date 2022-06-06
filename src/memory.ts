import { AllocatableStruct, AllocatableStructConstructor, Pointer } from "./types.ts";

export class Memory {
  public static createArray<T extends AllocatableStruct>(
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

    return new MemoryArray<T>(array, memory, array[0].pointer as Pointer<T>);
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
