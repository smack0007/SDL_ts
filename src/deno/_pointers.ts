import { Box } from "../_boxes.ts";
import { isStruct } from "../_structs.ts";
import { PlatformPointer } from "../_types.ts";
import { isTypedArray } from "../_utils.ts";
import { Pointer, PointerLike, TypedArray } from "../types.ts";

type DenoPointer<T> = ReturnType<typeof Deno.UnsafePointer.of<T>>;

class DenoPointerWrapper<T> {
  constructor(public readonly _data: DenoPointer<T>) {}
}

export function denoIsPlatformPointer<T>(value: unknown): value is PlatformPointer<T> & DenoPointerWrapper<T> {
  return value instanceof DenoPointerWrapper;
}

export function denoToPlatformPointer<T>(value: PointerLike<T> | null): PlatformPointer<T> | null {
  if (value === undefined || value === null) {
    return null;
  }

  // If it's an existing pointer unwrap it.
  if (denoIsPlatformPointer(value)) {
    return value._data as unknown as PlatformPointer<T>;
  }

  if (isTypedArray(value)) {
    return Deno.UnsafePointer.of(value) as unknown as PlatformPointer<T>;
  } else if (Box.isBox(value)) {
    return Deno.UnsafePointer.of(value._data) as unknown as PlatformPointer<T>;
  } else if (isStruct(value)) {
    if (denoIsPlatformPointer(value._data)) {
      // Unwrap the struct's pointer.
      return value._data._data as unknown as PlatformPointer<T>;
    } else {
      // If it's not a pointer it has to be a TypedArray. TypeScript can't infer that here though.
      return Deno.UnsafePointer.of(value._data as TypedArray) as unknown as PlatformPointer<T>;
    }
  }

  throw new Error(`Unable to convert "${typeof value}" into a pointer.`);
}

export function denoFromPlatformPointer<T>(value: PlatformPointer<T>): Pointer<T> | null {
  if (value === null) {
    return null;
  }

  // Return DenoPointerWrapper here so that denoIsPlatformPointer and denoToPlatformPointer can
  // identify the pointer later and unwrap it.
  return new DenoPointerWrapper(value as unknown as DenoPointer<T>) as unknown as Pointer<T>;
}
