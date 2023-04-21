// deno-lint-ignore-file no-empty-interface
// This file is for types exposed as part of the API.

import { Pointer } from "./pointers.ts";

declare const _: unique symbol;

//
// Simple types
//

export type i8 = number;
export const I8 = (value = 0): i8 => value;
export type u8 = number;
export const U8 = (value = 0): u8 => value;
export type i16 = number;
export const I16 = (value = 0): i16 => value;
export type u16 = number;
export const U16 = (value = 0): u16 => value;
export type i32 = number;
export const I32 = (value = 0): i32 => value;
export type u32 = number;
export const U32 = (value = 0): u32 => value;
export type i64 = bigint;
export const I64 = (value: number | bigint = 0n): i64 => BigInt(value);
export type u64 = bigint;
export const U64 = (value: number | bigint = 0n): u64 => BigInt(value);
export type f32 = number;
export const F32 = (value = 0): f32 => value;
export type f64 = number;
export const F64 = (value = 0): f64 => value;
export type int = number;
export const Int = (value = 0): int => value;

export type TypedNumber =
  | i8
  | u8
  | i16
  | u16
  | i32
  | u32
  | i64
  | u64
  | int
  | f32
  | f64;

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

// deno-lint-ignore ban-types
export type FunctionWithSymbolName = Function & { symbolName: string };

//
// Complex types
//

export type AllocatableStructConstructor<T extends AllocatableStruct> = {
  SIZE_IN_BYTES: number;
  of(data: Uint8Array): T;
};

export interface AllocatableStruct extends Struct {}

export interface InitOptions {
  libraryPath?: string;
  functions?: ReadonlyArray<FunctionWithSymbolName>;
}

export interface StructConstructor<T extends Struct> {
  SIZE_IN_BYTES: number;
  of(data: Pointer<T>): T;
}

export interface Struct {}

//
// Type Helpers
//

// deno-lint-ignore no-explicit-any
export type Constructor<T> = new (...args: any[]) => T;

export type Enum<T extends Record<string, number>> = T[keyof T];

// deno-lint-ignore no-explicit-any
export type Factory<T> = (...args: any[]) => T;

export type Flags<T extends Record<string, number>, Name extends string> =
  | {
    [K in keyof T]: { [_]: Name } & T[K];
  }[keyof T]
  | number;

export type OrFactory<T> = T | Factory<T>;

export type Predicate<T> = (value: T) => boolean;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
