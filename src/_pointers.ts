import { BoxedArray, BoxedValue } from "./boxes.ts";
import { PointerLike } from "./pointers.ts";
import { PointerValue, TypedArray } from "./types.ts";
import platform from "./_platform.ts";
import { isStruct } from "./_structs.ts";
import { isTypedArray } from "./_utils.ts";

export const Pointer = {
  SIZE_IN_BYTES: platform.Pointer.SIZE_IN_BYTES,

  isPointer: (value: unknown): value is PointerValue<unknown> => {
    return typeof value === "bigint" || typeof value === "number";
  },

  isNullPointer: (value: unknown): boolean => {
    return Pointer.isPointer(value) && value == 0;
  },

  of: <T>(
    value: PointerLike<T> | null | undefined,
    offset = 0,
  ): PointerValue<T> => {
    if (value === null || value === undefined) {
      return platform.NULL_POINTER;
    }

    if (Pointer.isPointer(value)) {
      return value;
    }

    if (isTypedArray(value)) {
      return Pointer.ofTypedArray(value, offset);
    } else if (BoxedArray.isBoxedArray(value)) {
      return platform.Pointer.of(value._data, offset * value.sizeOfElementInBytes);
    } else if (BoxedValue.isBoxedValue(value)) {
      return platform.Pointer.of(value._data);
    } else if (isStruct(value)) {
      if (Pointer.isPointer(value._data)) {
        return value._data;
      } else {
        return platform.Pointer.of(value._data);
      }
    }

    throw new Error(`Unable to get pointer of ${value}.`);
  },

  ofTypedArray: <T>(
    value: TypedArray,
    offset = 0,
  ): PointerValue<T> => {
    return platform.Pointer.of(value, offset);
  },
};
