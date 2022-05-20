// This file is for types exposed as part of the API.

export interface Pointer<T> {
  readonly isNull: boolean;

  readonly address: bigint;

  readonly value: T;
}

export type PointerTargetArray<T> = Pointer<T>[];

export type PointerTargetObject<T> = { value: Pointer<T> };

export type PointerTarget<T> = PointerTargetArray<T> | PointerTargetObject<T>;

export type RWMode = "a" | "a+" | "r" | "r+" | "w" | "w+" | "ab" | "ab+" | "rb" | "rb+" | "wb" | "wb+";

export interface Struct {
  readonly pointer: Pointer<Struct>;
}

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;
