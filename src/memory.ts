import { PlatformDataView, PlatformPointer } from "platform";
import { BoxedValue, isBoxedValue } from "./boxes.ts";
import { BoxableValue, PointerValue, Struct, TypedArray, u8 } from "./types.ts";
import { isStruct } from "./_structs.ts";
import { isTypedArray } from "./_utils.ts";

export class Memory {
  public static isPointer(value: unknown): value is PointerValue<unknown> {
    return typeof value === "bigint" || typeof value === "number";
  }

  public static pointer<T extends BoxableValue>(value: BoxedValue<T>): PointerValue<BoxedValue<T>>;
  public static pointer<T>(value: TypedArray, offset: number): PointerValue<T>;
  public static pointer<T>(value: T): PointerValue<T>;
  public static pointer<T>(value: BoxedValue<BoxableValue> | T[] | T, offset?: number): PointerValue<T> {
    if (offset === undefined) {
      offset = 0;
    }

    if (offset < 0) {
      throw new Error("offset must be >= 0.");
    }

    if (isBoxedValue(value)) {
      return PlatformPointer.of(value._data);
    } else if (isTypedArray(value)) {
      return PlatformPointer.of(value, offset);
    } else if (isStruct<T>(value)) {
      if (Memory.isPointer(value._data)) {
        return value._data;
      } else {
        return PlatformPointer.of(value._data);
      }
    } else {
      throw new Error("Unable to create pointer.");
    }
  }

  public static readUint8<T>(pointer: PointerValue<T>, byteOffset: number): u8 {
    // TODO: See if we can cache this somewhere.
    const dataView = new PlatformDataView(pointer);
    return dataView.getUint8(byteOffset);
  }

  public static structView<T extends Struct>(
    _constructor: { createView: (pointer: PointerValue<T>) => T },
    pointer: PointerValue<T>,
  ): T {
    return _constructor.createView(pointer);
  }
}
