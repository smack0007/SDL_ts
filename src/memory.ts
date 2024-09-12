import Platform from "./_platform.ts";
import { PointerLike } from "./pointers.ts";
import { Pointer } from "./pointers.ts";

export class Memory {
  public static readU8<T>(pointer: PointerLike<T>, byteOffset: number): number {
    // TODO: See if we can cache this somewhere.
    const dataView = new Platform.DataView(Pointer.of(pointer)!);
    return dataView.getU8(byteOffset);
  }
}
