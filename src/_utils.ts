// This file includes private utility types which should not be
// exposed as part of the API.

import { PlatformDataView } from "platform";
import {
  BoxableValueConstructor,
  F32,
  F64,
  I16,
  I32,
  I64,
  I8,
  Int,
  PointerTarget,
  PointerValue,
  U16,
  U32,
  U64,
  U8,
} from "./types.ts";
import { Window } from "./SDL/structs.ts";
import { AllocatableStruct, AllocatableStructConstructor, TypedArray } from "../mod.ts";

//
// Constants
//

export const ENDIANNESS = (function (): "BE" | "LE" {
  const buffer = new ArrayBuffer(2);
  new globalThis.DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
})();

export const DATA_VIEW_METHODS = new Map<BoxableValueConstructor, keyof PlatformDataView<unknown>>([
  [I8, "getInt8"],
  [U8, "getUint8"],

  [I16, "getInt16"],
  [U16, "getUint16"],

  [I32, "getInt32"],
  [U32, "getUint32"],

  [I64, "getBigInt64"],
  [U64, "getBigUint64"],

  [F32, "getFloat32"],
  [F64, "getFloat64"],

  [Number, "getInt32"],

  // TODO: Just hardcode this for now.
  [Window, "getBigUint64"],
]);

//
// Types
//

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

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

export function setPointerTarget<T>(target: PointerTarget<T>, value: PointerValue<T>): void {
  if (Array.isArray(target)) {
    target[0] = value;
  } else {
    target.value = value;
  }
}

export function sizeof<T>(_constructor: BoxableValueConstructor): number {
  if ("SIZE_IN_BYTES" in (_constructor as AllocatableStructConstructor<AllocatableStruct>)) {
    return (_constructor as AllocatableStructConstructor<AllocatableStruct>).SIZE_IN_BYTES;
  }
  
  switch (_constructor) {
    case I8:
    case U8:
      return 1;

    case I16:
    case U16:
      return 2;

    case Int:
    case I32:
    case U32:
    case F32:
    case Number:
      return 4;

    case I64:
    case U64:
    case F64:
      return 8;

    // TODO: Just hardcode this for now.

    case Window:
      return 8;
  }

  throw new Error(
    `sizeof not implemented for ${(_constructor as NumberConstructor)?.name ?? (_constructor as symbol).description}`,
  );
}
