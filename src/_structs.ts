import { Pointer, Struct } from "./types.ts";

export interface StructInternal<T extends Struct> {
  _data: Uint8Array | Pointer<T>;
}

export function isStruct<T extends Struct>(value: unknown): value is T & StructInternal<T> {
  return ("_data" in (value as Struct));
}
