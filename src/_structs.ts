import platform from "./_platform.ts";
import { AllocatableStruct, F32, Factory, I16, I32, I8, Int, PointerValue, Struct, U16, U32, U8 } from "./types.ts";
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

  private static NUMBER_STRUCT_FACTORIES = [
    I8,
    U8,
    I16,
    U16,
    I32,
    U32,
    F32,
    Int,
  ];

  private _data!: Uint8Array;
  private _view!: PlatformDataView;

  private constructor() {
  }

  public static isFactory(factory: unknown): factory is Factory<number> {
    return this.NUMBER_STRUCT_FACTORIES.includes(factory as Factory<number>);
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
