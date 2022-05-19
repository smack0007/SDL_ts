// This file is for types exposed as part of the API.

export type DoublePointerTarget<T extends Struct> = { value?: Pointer<T> };

export type PointerData = TypedArray | Struct | void;

export interface Pointer<T> {
  // Used for PointerOrStruct scenarios.
  readonly pointer: Pointer<T>;

  readonly isNullPointer: boolean;
}

export type PointerOrStruct<T extends PointerData> = Pointer<T> | Struct;

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
