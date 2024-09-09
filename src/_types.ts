import { Pointer } from "./pointers.ts";
import {
  Callback,
  f32,
  f64,
  i16,
  i32,
  i64,
  i8,
  Struct,
  StructConstructor,
  u16,
  u32,
  u64,
  u8,
} from "./types.ts";
import {
  DynamicCallbackDefinition,
  DynamicLibrary,
  DynamicLibraryInterface,
} from "./_library.ts";

declare const _: unique symbol;

export type PlatformCallback = { [_]: "PlatformCallback" };
export type PlatformPointer<T> = { [_]: "PlatformPointer" };
export type PlatformString = { [_]: "PlatformString" };

export interface PlatformDataViewConstructor {
  new (data: Uint8Array | Pointer<unknown>, offset?: number): PlatformDataView;
}

export interface PlatformDataView {
  readonly data: Uint8Array | Pointer<unknown>;
  readonly byteOffset: number;

  getArray(byteLength: number, byteOffset: number): Uint8Array;
  getArrayBuffer(byteLength: number, byteOffset: number): ArrayBuffer;
  getCallback<T extends Callback>(
    byteOffset: number,
    definition: DynamicCallbackDefinition<T>
  ): T;
  getF32(byteOffset: number): f32;
  getF64(byteOffset: number): f64;
  getI8(byteOffset: number): i8;
  getI16(byteOffset: number): i16;
  getI32(byteOffset: number): i32;
  getI64(byteOffset: number): i64;
  getPointer<T>(byteOffset: number): Pointer<T>;
  getU8(byteOffset: number): u8;
  getU16(byteOffset: number): u16;
  getU32(byteOffset: number): u32;
  getU64(byteOffset: number): u64;
  setCallback<T extends Callback>(
    byteOffset: number,
    value: T,
    definition: DynamicCallbackDefinition<T>
  ): void;
  setF32(byteOffset: number, value: f32): void;
  setF64(byteOffset: number, value: f64): void;
  setI8(byteOffset: number, value: i8): void;
  setI16(byteOffset: number, value: i16): void;
  setI32(byteOffset: number, value: i32): void;
  setI64(byteOffset: number, value: i64): void;
  setPointer<T>(byteOffset: number, value: Pointer<T>): void;
  setU8(byteOffset: number, value: u8): void;
  setU16(byteOffset: number, value: u16): void;
  setU32(byteOffset: number, value: u32): void;
  setU64(byteOffset: number, value: u64): void;
}

export interface Platform {
  POINTER_SIZE_IN_BYTES: number;

  DataView: PlatformDataViewConstructor;

  fromPlatformCallback<T extends Callback>(
    value: PlatformCallback,
    definition: DynamicCallbackDefinition<T>
  ): T;

  fromPlatformPointer<T>(value: PlatformPointer<T> | null): Pointer<T> | null;

  fromPlatformString(value: Uint8Array | PlatformPointer<unknown>): string;

  fromPlatformStruct<T extends Struct>(
    data: PlatformPointer<T>,
    structConstructor: StructConstructor<T>
  ): T | null;

  loadLibrary<T extends DynamicLibraryInterface>(
    libraryName: string,
    symbols: T,
    libraryPath?: string
  ): DynamicLibrary<T>;

  toPlatformCallback<T extends Callback>(
    value: T,
    definition: DynamicCallbackDefinition<T>
  ): PlatformCallback;

  toPlatformPointer<T>(value: Pointer<T> | null): PlatformPointer<T> | null;

  toPlatformString(value: string | null): PlatformString;

  toPlatformStruct<T extends Struct>(
    struct: T,
    stuctConstructor: StructConstructor<T>
  ): Uint8Array;
}
