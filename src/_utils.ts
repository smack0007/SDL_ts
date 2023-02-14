// This file includes private utility types which should not be
// exposed as part of the API.

import { SDLError } from "./error.ts";
import { OrFactory, TypedArray } from "./types.ts";

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

export function throwError(message: OrFactory<string>, cause?: Error): never {
  throw new SDLError(typeof message === "function" ? message() : message, cause);
}
