import { isStruct } from "./_structs.ts";
import { isTypedArray } from "./_utils.ts";
import { Box, BoxArray, BoxValue } from "./boxes.ts";
import { Struct, TypedArray } from "./types.ts";
import { PlatformPointer } from "./_types.ts";

type PointerBoxableValue<T> = T extends BoxValue ? (BoxArray<T> | Box<T>) : never;

export type PointerLike<T> = TypedArray | Struct | PointerBoxableValue<T>;

export class Pointer<T> {
  constructor(
    public readonly _data: TypedArray | PlatformPointer<T>,
    public readonly _offset = 0,
  ) {
  }

  public static isPointer(value: unknown): value is Pointer<unknown> {
    return value instanceof Pointer;
  }

  public static of<T>(
    value: PointerLike<T> | null | undefined,
    offset = 0,
  ): Pointer<T> | null {
    if (value === null || value === undefined) {
      return null;
    }

    if (Pointer.isPointer(value)) {
      return value;
    }

    if (isTypedArray(value)) {
      return Pointer.ofTypedArray(value, offset);
    } else if (Box.isBox(value) || BoxArray.isBoxArray(value)) {
      return new Pointer(value._data, offset);
    } else if (isStruct(value)) {
      if (Pointer.isPointer(value._data)) {
        return value._data;
      } else {
        return new Pointer(value._data, offset);
      }
    }

    throw new Error(`Unable to get pointer of ${value}.`);
  }

  public static ofTypedArray<T>(value: TypedArray, offset = 0): Pointer<T> {
    return new Pointer(value, offset);
  }
}
