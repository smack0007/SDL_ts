import { PlatformPointer } from "../mod.deno.ts";
import { PointerValue } from "../mod.ts";
import { BoxedArray, isBoxedArray } from "./boxes.ts";

export type PointerLike<T> = BoxedArray<T>;

export class Pointer {
  private constructor() {
  }

  public static of<T>(value: PointerValue<T> | PointerLike<T>, offset = 0): PointerValue<T> {
    if (isBoxedArray(value)) {
      return PlatformPointer.of(value.memory, offset * value.sizeOfElementInBytes);
    }

    return value as PointerValue<T>;
  }
}
