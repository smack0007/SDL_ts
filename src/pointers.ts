import { NULL_POINTER, PlatformPointer } from "platform";
import { BoxedArray, BoxedValue } from "./boxes.ts";
import { BoxableValue, PointerValue, Struct, TypedArray } from "./types.ts";
import { isStruct } from "./_structs.ts";
import { isTypedArray } from "./_utils.ts";

export type PointerLike<T> = T extends BoxableValue ? (BoxedArray<T> | BoxedValue<T> | Struct) : Struct;

export type PointerTo<T> = PointerValue<T> | PointerLike<T>;

export class Pointer {
  public static readonly SIZE_IN_BYTES = PlatformPointer.SIZE_IN_BYTES;

  private constructor() {
  }

  public static isPointer(value: unknown): value is PointerValue<unknown> {
    return typeof value === "bigint" || typeof value === "number";
  }

  public static isNullPointer(value: unknown): boolean {
    return Pointer.isPointer(value) && value == 0;
  }

  public static of<T>(
    value: TypedArray | PointerTo<T> | null | undefined,
    offset = 0,
  ): PointerValue<T> {
    if (value === null || value === undefined) {
      return NULL_POINTER;
    }

    if (Pointer.isPointer(value)) {
      return value;
    }

    if (isTypedArray(value)) {
      return PlatformPointer.of(value, offset);
    } else if (BoxedArray.isBoxedArray(value)) {
      return PlatformPointer.of(value._data, offset * value.sizeOfElementInBytes);
    } else if (BoxedValue.isBoxedValue(value)) {
      return PlatformPointer.of(value._data);
    } else if (isStruct(value)) {
      if (Pointer.isPointer(value._data)) {
        return value._data;
      } else {
        return PlatformPointer.of(value._data);
      }
    }

    throw new Error(`Unable to get pointer of ${value}.`);
  }
}
