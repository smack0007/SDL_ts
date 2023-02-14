import platform from "./_platform.ts";
import { u8 } from "./types.ts";
import { PointerLike } from "./pointers.ts";
import { Pointer } from "./pointers.ts";

export class Memory {
  public static readUint8<T>(pointer: PointerLike<T>, byteOffset: number): u8 {
    // TODO: See if we can cache this somewhere.
    const dataView = new platform.DataView(Pointer.of(pointer));
    return dataView.getUint8(byteOffset);
  }
}
