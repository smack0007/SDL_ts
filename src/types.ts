// This file is for types exposed as part of the API.

// deno-lint-ignore-file no-empty-enum

// Simple types

export enum i8 {}
export enum u8 {}
export enum i16 {}
export enum u16 {}
export enum i32 {}
export enum u32 {}
export enum i64 {}
export enum u64 {}
export enum f32 {}
export enum f64 {}

// Complex types

export type AllocatableStructConstructor<T extends AllocatableStruct> = {
  new (data: Uint8Array): T;
  SIZE_IN_BYTES: number;
};

export type AllocatableStruct = Struct;

export type Pointer<T> = {
  readonly isNull: boolean;

  readonly address: bigint;

  readonly value: T;
};

// TODO: Move this to it's own file as it's not generic.
export type RWMode = "a" | "a+" | "r" | "r+" | "w" | "w+" | "ab" | "ab+" | "rb" | "rb+" | "wb" | "wb+";

export interface Struct {
  pointer: Pointer<Struct>;
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
