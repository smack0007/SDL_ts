import { NULL_POINTER, PlatformPointer } from "platform";
import { BoxedArray, isBoxedArray } from "./boxes.ts";
import { PointerValue, TypedArray } from "./types.ts";
import { isTypedArray } from "./_utils.ts";

export type PointerLike<T> = BoxedArray<T>;

export type PointerTo<T> = PointerValue<T> | PointerLike<T>;

export class Pointer {
  public static readonly SIZE_IN_BYTES = PlatformPointer.SIZE_IN_BYTES;

  private constructor() {
  }

  public static of<T>(
    value: TypedArray | PointerValue<T> | PointerLike<T> | null | undefined,
    offset = 0,
  ): PointerValue<T> {
    if (value === null || value === undefined) {
      return NULL_POINTER;
    }

    if (isTypedArray(value)) {
      return PlatformPointer.of(value, offset);
    } else if (isBoxedArray(value)) {
      return PlatformPointer.of(value._data, offset * value.sizeOfElementInBytes);
    }

    return value as PointerValue<T>;
  }
}
