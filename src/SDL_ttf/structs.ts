// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { PlatformDataView } from "../_types.ts";
import { STRUCT_NO_ALLOCATE, StructCommand, StructInternal } from "../_structs.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { AllocatableStruct, f32, f64, i16, i32, i64, i8, Struct, u16, u32, u64, u8 } from "../types.ts";

import {} from "./enums.ts";

export class Font implements Struct {
  public static IS_OPAQUE = true;
  public readonly _data!: Pointer<Font>;

  public static of(data: Pointer<Font> | null): Font | null {
    if (data === null) {
      return null;
    }

    const struct = new Font() as unknown as StructInternal<Font>;
    struct._data = data;
    return struct as unknown as Font;
  }
}
