import { PlatformDataView } from "platform";
import { AllocatableStruct } from "../mod.ts";
import { PointerValue, Struct } from "./types.ts";

export interface StructInternal<T extends Struct> {
  _data: Uint8Array | PointerValue<T>;
}

export function isStruct<T extends Struct>(value: unknown): value is T & StructInternal<T> {
  return ("_data" in (value as Struct));
}

export class NumberStruct implements AllocatableStruct {
  public static SIZE_IN_BYTES = 4;

  private _data!: Uint8Array | PointerValue<number>;
  private _view!: PlatformDataView<NumberStruct>;

  public constructor(data: Uint8Array) {
    this._data = data;
    this._view = new PlatformDataView(this._data);
  }

  public get value(): number {
    return this._view.getInt32(0);
  }
}
