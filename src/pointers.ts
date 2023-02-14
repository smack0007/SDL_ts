import platform from "./_platform.ts";
import { isStruct } from "./_structs.ts";
import { isTypedArray } from "./_utils.ts";
import { Box, BoxArray, BoxValue } from "./boxes.ts";
import { PointerValue, Struct, TypedArray } from "./types.ts";

type PointerBoxableValue<T> = T extends BoxValue ? (BoxArray<T> | Box<T>) : never;

export type PointerLike<T> = PointerValue<T> | Struct | TypedArray | PointerBoxableValue<T>;

export class Pointer<T> {
  public static SIZE_IN_BYTES = platform.Pointer.SIZE_IN_BYTES;

  public static isPointer(value: unknown): value is PointerValue<unknown> {
    return typeof value === "bigint" || typeof value === "number";
  }

  public static isNullPointer(value: unknown): boolean {
    return Pointer.isPointer(value) && value == 0;
  }

  public static of<T>(
    value: PointerLike<T> | null | undefined,
    offset = 0,
  ): PointerValue<T> {
    if (value === null || value === undefined) {
      return platform.NULL_POINTER;
    }

    if (Pointer.isPointer(value)) {
      return value;
    }

    if (isTypedArray(value)) {
      return Pointer.ofTypedArray(value, offset);
    } else if (BoxArray.isBoxArray(value)) {
      return platform.Pointer.of(value._data, offset * value.sizeOfElementInBytes);
    } else if (Box.isBox(value)) {
      return platform.Pointer.of(value._data);
    } else if (isStruct(value)) {
      if (Pointer.isPointer(value._data)) {
        return value._data;
      } else {
        return platform.Pointer.of(value._data);
      }
    }

    throw new Error(`Unable to get pointer of ${value}.`);
  }

  public static ofTypedArray<T>(
    value: TypedArray,
    offset = 0,
  ): PointerValue<T> {
    return platform.Pointer.of(value, offset);
  }
}
