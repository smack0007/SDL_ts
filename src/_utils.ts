// This file includes private utility types which should not be
// exposed as part of the API.

import { BoxableValueConstructor } from "./types.ts";
import { AllocatableStruct, AllocatableStructConstructor, TypedArray } from "../mod.ts";

//
// Constants
//

export const ENDIANNESS = (function (): "BE" | "LE" {
  const buffer = new ArrayBuffer(2);
  new globalThis.DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
})();

//
// Functions
//

export function isTypedArray(value: unknown): value is TypedArray {
  return (
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Int8Array ||
    value instanceof Uint16Array ||
    value instanceof Int16Array ||
    value instanceof Uint32Array ||
    value instanceof Int32Array ||
    value instanceof BigUint64Array ||
    value instanceof BigInt64Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array
  );
}

export function sizeof<T>(_constructor: BoxableValueConstructor): number {
  if ("SIZE_IN_BYTES" in (_constructor as AllocatableStructConstructor<AllocatableStruct>)) {
    return (_constructor as AllocatableStructConstructor<AllocatableStruct>).SIZE_IN_BYTES;
  }

  switch (_constructor) {
    case Number:
      return 4;
  }

  throw new Error(
    `sizeof not implemented for ${(_constructor as NumberConstructor)?.name}`,
  );
}
