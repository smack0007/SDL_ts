// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { PlatformDataView } from "../_types.ts";
import { isTypedArray } from "../_utils.ts";
import { Pointer } from "../pointers.ts";
import { AllocatableStruct, f32, f64, i16, i32, i64, i8, Struct, u16, u32, u64, u8 } from "../types.ts";

import {} from "./enums.ts";

export class Font implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<Font>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Pointer<Font> | null,
    offset: number = 0,
  ): Font | null {
    return data !== null ? new Font(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
  }
}
