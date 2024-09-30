import type { Pointer, Struct } from "./types.ts";
import type { PlatformDataView } from "./_types.ts";

export const STRUCT_NO_ALLOCATE = Symbol("STRUCT_NO_ALLOCATE");

export type StructCommand = typeof STRUCT_NO_ALLOCATE;

export interface StructInternal<T extends Struct> {
  _data: Uint8Array | Pointer<T>;
  _view: PlatformDataView;
}

export function isStruct<T extends Struct>(value: unknown): value is T & StructInternal<T> {
  return typeof value === "object" &&
    ("_data" in (value as Struct)) &&
    ("_view" in (value as Struct));
}
