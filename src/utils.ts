// This file includes public utility types which should be
// exposed as part of the API.

import { AllocatableStruct, Pointer } from "./types.ts";
import { DataPointer } from "./_utils.ts";

export class Memory {
  public static createArray<
    T extends AllocatableStruct,
    C extends { new (data: Pointer<T>): T; SIZE_IN_BYTES: number },
  >(_constructor: C, length: number): MemoryArray<T> {
    const array = new Array<T>(length);
    const memory = new Uint8Array(_constructor.SIZE_IN_BYTES * length);
    const basePointer = Deno.UnsafePointer.of(memory);

    for (let i = 0; i < length; i++) {
      const pointer = new DataPointer<T>(basePointer.value + BigInt(_constructor.SIZE_IN_BYTES * i));
      array[i] = new _constructor(pointer as unknown as Pointer<T>);
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
