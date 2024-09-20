// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { callbacks } from "./_callbacks.ts";
import { PlatformDataView } from "../_types.ts";
import { isPointer, isTypedArray } from "../_utils.ts";
import { AllocatableStruct, double, float, int, Pointer, Struct, Uint16, Uint32, Uint8 } from "../types.ts";

import {} from "./callbacks.ts";

import {} from "./enums.ts";

export class Font implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<Font>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Pointer<Font> | null,
    byteOffset: number = 0,
  ): Font | null {
    return data !== null ? new Font(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }
}
