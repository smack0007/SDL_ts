import platform from "./_platform.ts";
import { AllocatableStruct, PointerValue, Struct } from "./types.ts";
import type { PlatformDataView } from "./_types.ts";

export const STRUCT_NO_ALLOCATE = Symbol("STRUCT_NO_ALLOCATE");

export type StructCommand = typeof STRUCT_NO_ALLOCATE;

export interface StructInternal<T extends Struct> {
  _data: Uint8Array | PointerValue<T>;
  _view: PlatformDataView;
}

export function isStruct<T extends Struct>(value: unknown): value is T & StructInternal<T> {
  return typeof value === "object" &&
    ("_data" in (value as Struct));
}

export class NumberStruct implements AllocatableStruct {
  public static SIZE_IN_BYTES = 4;

  private _data!: Uint8Array;
  private _view!: PlatformDataView;

  private constructor() {
  }

  public static of(data: Uint8Array): NumberStruct {
    const struct = new NumberStruct();
    struct._data = data;
    struct._view = new platform.DataView(data);
    return struct;
  }

  public get value(): number {
    return this._view.getInt32(0);
  }

  public set value(value: number) {
    this._view.setInt32(0, value);
  }
}

export class PointerStruct implements AllocatableStruct {
  public static SIZE_IN_BYTES = platform.Pointer.SIZE_IN_BYTES;

  private _data!: Uint8Array;
  private _view!: PlatformDataView;

  private constructor() {
  }

  public static of(data: Uint8Array): PointerStruct {
    const struct = new PointerStruct();
    struct._data = data;
    struct._view = new platform.DataView(data);
    return struct;
  }

  public get value(): PointerValue<unknown> {
    return this._view.getPointer(0);
  }
}
