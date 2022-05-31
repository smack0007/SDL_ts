import { AllocatableStruct, AllocatableStructConstructor, Pointer } from "./types.ts";
import { Writeable } from "./_utils.ts";

export class MemoryOffset {
  constructor(
    public readonly memory: Uint8Array,
    public readonly byteOffset: number = 0,
  ) {
  }
}

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
    const offset = new MemoryOffset(memory);

    for (let i = 0; i < length; i++) {
      (offset as Writeable<MemoryOffset>).byteOffset = _constructor.SIZE_IN_BYTES * i;
      array[i] = new _constructor(offset);
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
