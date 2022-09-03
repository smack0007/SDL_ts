import { PlatformDataView } from "platform";
import { PointerValue, Struct, u8 } from "./types.ts";

export class Memory {
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
