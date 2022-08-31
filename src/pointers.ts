import { NULL_POINTER, PlatformPointer } from "platform";
import { BoxedArray, isBoxedArray } from "./boxes.ts";
import { PointerValue } from "./types.ts";

export type PointerLike<T> = BoxedArray<T>;

export type PointerTo<T> = PointerValue<T> | PointerLike<T>;

export class Pointer {
  private constructor() {
  }

  public static of<T>(value: PointerValue<T> | PointerLike<T> | null | undefined, offset = 0): PointerValue<T> {
    if (value === null || value === undefined) {
      return NULL_POINTER;
    }

    if (isBoxedArray(value)) {
      return PlatformPointer.of(value._data, offset * value.sizeOfElementInBytes);
    }

    return value as PointerValue<T>;
  }
}
