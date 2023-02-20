import { f32, f64, i16, i32, i64, i8, PointerValue, TypedArray, u16, u32, u64, u8 } from "./types.ts";
import { DynamicLibrary, DynamicLibraryInterface } from "./_library.ts";

export interface PlatformPointerConstructor {
  readonly SIZE_IN_BYTES: number;

  of<T>(memory: TypedArray): PointerValue<T>;
  of<T>(memory: TypedArray, offsetInBytes: PointerValue<T>): PointerValue<T>;
}

export interface PlatformDataViewConstructor {
  new (data: Uint8Array | PointerValue<unknown>): PlatformDataView;
}

export interface PlatformDataView {
  readonly data: Uint8Array | PointerValue<unknown>;

  getArray(byteLength: number, byteOffset: number): Uint8Array;
  getF32(byteOffset: number): f32;
  getF64(byteOffset: number): f64;
  getI8(byteOffset: number): i8;
  getI16(byteOffset: number): i16;
  getI32(byteOffset: number): i32;
  getI64(byteOffset: number): i64;
  getPointer<T>(byteOffset: number): PointerValue<T>;
  getU8(byteOffset: number): u8;
  getU16(byteOffset: number): u16;
  getU32(byteOffset: number): u32;
  getU64(byteOffset: number): u64;
  setF32(byteOffset: number, value: f32): void;
  setF64(byteOffset: number, value: f64): void;
  setI8(byteOffset: number, value: i8): void;
  setI16(byteOffset: number, value: i16): void;
  setI32(byteOffset: number, value: i32): void;
  setI64(byteOffset: number, value: i64): void;
  setPointer<T>(byteOffset: number, value: PointerValue<T>): void;
  setU8(byteOffset: number, value: u8): void;
  setU16(byteOffset: number, value: u16): void;
  setU32(byteOffset: number, value: u32): void;
  setU64(byteOffset: number, value: u64): void;
}

export interface Platform {
  NULL_POINTER: PointerValue<unknown>;

  Pointer: PlatformPointerConstructor;

  DataView: PlatformDataViewConstructor;

  fromNativeString(value: Uint8Array | PointerValue<unknown>): string;

  loadLibrary<T extends DynamicLibraryInterface>(
    libraryName: string,
    symbols: T,
    libraryPath?: string,
  ): DynamicLibrary<T>;

  toNativeString(value: string): unknown;
}
