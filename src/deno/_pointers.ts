import { Pointer } from "../pointers.ts";
import { PlatformPointer } from "../_types.ts";
import { isTypedArray } from "../_utils.ts";

export function denoToPlatformPointer<T>(value: Pointer<T> | null): PlatformPointer<T> | null {
  let result: ReturnType<typeof denoToPlatformPointer> = null;

  if (value) {
    if (isTypedArray(value._data)) {
      result = Deno.UnsafePointer.of(value._data) as unknown as PlatformPointer<T>;
    } else {
      result = value._data;
    }

    if (value._offset != 0) {
      result = Deno.UnsafePointer.offset(
        result as unknown as NonNullable<Deno.PointerValue>,
        value._offset,
      ) as unknown as PlatformPointer<T>;
    }
  }

  return result;
}

export function denoFromPlatformPointer<T>(value: PlatformPointer<T>): Pointer<T> | null {
  if (value === null) {
    return null;
  }

  return new Pointer<T>(value);
}
