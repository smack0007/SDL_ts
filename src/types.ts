// deno-lint-ignore-file no-empty-interface
// This file is for types exposed as part of the API.

import { Pointer } from "./pointers.ts";

declare const _: unique symbol;

//
// Simple types
//

export type double = number;
export type float = number;
export type int = number;
export type Sint32 = number;
export type Uint8 = number;
export type Uint16 = number;
export type Uint32 = number;
export type Uint64 = bigint;

export const double = (value = 0): double => value;
export const float = (value = 0): float => value;
export const int = (value = 0): int => value;
export const Sint32 = (value = 0): Sint32 => value;
export const Uint8 = (value = 0): Uint8 => value;
export const Uint16 = (value = 0): Uint16 => value;
export const Uint32 = (value = 0): Uint32 => value;
export const Uint64 = (value = 0): Uint64 => BigInt(value);

export type TypedNumber =
  | double
  | float
  | int
  | Uint8
  | Uint16
  | Uint32
  | Uint64;

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
export type Callback = Function;

// deno-lint-ignore ban-types
export type FunctionWithSymbolName = Function & { symbolName: string };

//
// Complex types
//

export type AllocatableStructConstructor<T extends AllocatableStruct> = StructConstructor<T> & {
  SIZE_IN_BYTES: number;
};

export interface AllocatableStruct extends Struct {
}

export interface InitOptions {
  libraryPath?: string;
  functions?: ReadonlyArray<FunctionWithSymbolName>;
}

export interface StructConstructor<T extends Struct> {
  of(data: Uint8Array | Pointer<T> | null, byteOffset?: number): T | null;
}

export interface Struct {
  readonly _data: Uint8Array | Pointer<unknown>;
  readonly _byteOffset: number;
}

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

export type Mutable<T> = T extends object ? { -readonly [P in keyof T]: Mutable<T[P]> }
  : T;

export type OrFactory<T> = T | Factory<T>;

export type Predicate<T> = (value: T) => boolean;
