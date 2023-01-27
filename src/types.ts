// deno-lint-ignore-file no-empty-interface
// This file is for types exposed as part of the API.

declare const _: unique symbol;

//
// Simple types
//

export type i8 = number;
export const I8 = Symbol("i8");
export type u8 = number;
export const U8 = Symbol("u8");
export type i16 = number;
export const I16 = Symbol("i16");
export type u16 = number;
export const U16 = Symbol("u16");
export type i32 = number;
export const I32 = Symbol("i32");
export type u32 = number;
export const U32 = Symbol("u32");
export type i64 = number;
export const I64 = Symbol("i64");
export type u64 = number;
export const U64 = Symbol("u64");
export type f32 = number;
export const F32 = Symbol("f32");
export type f64 = number;
export const F64 = Symbol("f64");
export type int = number;
export const Int = Symbol("int");

export type PrimitiveType =
  | i8
  | u8
  | i16
  | u16
  | i32
  | u32
  | i64
  | u64
  | f32
  | f64
  | int;

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

//
// Complex types
//

export type AllocatableStructConstructor<T extends AllocatableStruct> = {
  SIZE_IN_BYTES: number;
  of(data: Uint8Array): T;
};

export interface AllocatableStruct extends Struct {}

export type BoxableValue = number | PointerValue<unknown> | PrimitiveType | Struct;

// deno-lint-ignore no-explicit-any
export type BoxableValueConstructor<T extends BoxableValue> = new (...args: any[]) => T;

export type PointerValue<T> = number | bigint;

export interface StructConstructor<T extends Struct> {
  SIZE_IN_BYTES: number;
  of(data: PointerValue<T>): T;
}

export interface Struct {}

//
// Type Helpers
//

export type Enum<T extends Record<string, number>> = T[keyof T];

export type Flags<T extends Record<string, number>, Name extends string> =
  | {
    [K in keyof T]: { [_]: Name } & T[K];
  }[keyof T]
  | number;

export type OrFactory<T> = T | (() => T);

export type Predicate<T> = (value: T) => boolean;

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
