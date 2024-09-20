// This file includes private utility types which should not be
// exposed as part of the API.

import Platform from "./_platform.ts";
import { SDLError } from "./error.ts";
import {
  AllocatableStruct,
  AllocatableStructConstructor,
  Constructor,
  double,
  Factory,
  float,
  int,
  type OrFactory,
  Pointer,
  Sint32,
  type TypedArray,
  Uint16,
  Uint32,
  Uint64,
  Uint8,
} from "./types.ts";

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

// deno-lint-ignore ban-types
export function hasSizeInBytesProperty(value: {}): value is { SIZE_IN_BYTES: number } {
  return "SIZE_IN_BYTES" in value;
}

export function isPointer<T>(value: unknown): value is Pointer<T> {
  return Platform.isPlatformPointer(value);
}

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

export function sizeof<T>(
  factoryOrConstructor: Constructor<T> | Factory<T>,
): number {
  if (
    "SIZE_IN_BYTES" in
      (factoryOrConstructor as unknown as AllocatableStructConstructor<AllocatableStruct>)
  ) {
    return (
      factoryOrConstructor as unknown as AllocatableStructConstructor<AllocatableStruct>
    ).SIZE_IN_BYTES;
  }

  switch (factoryOrConstructor) {
    case Uint8:
      return 1;

    case Uint16:
      return 2;

    case float:
    case int:
    case Sint32:
    case Uint32:
      return 4;

    case double:
    case Uint64:
      return 8;

    case Pointer:
      return Platform.POINTER_SIZE_IN_BYTES;
  }

  throw new Error(
    `${factoryOrConstructor?.name} is not boxable. sizeof not implemented.`,
  );
}

export function throwError(message: OrFactory<string>, cause?: Error): never {
  throw new SDLError(typeof message === "function" ? message() : message, cause);
}
