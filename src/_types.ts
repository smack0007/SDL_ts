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
  getArray(byteLength: number, byteOffset: number): Uint8Array;
  getBigInt64(byteOffset: number): i64;
  getBigUint64(byteOffset: number): u64;
  getInt8(byteOffset: number): i8;
  getInt16(byteOffset: number): i16;
  getInt32(byteOffset: number): i32;
  getFloat32(byteOffset: number): f32;
  getFloat64(byteOffset: number): f64;
  getPointer<T>(byteOffset: number): PointerValue<T>;
  getUint8(byteOffset: number): u8;
  getUint16(byteOffset: number): u16;
  getUint32(byteOffset: number): u32;
  setInt32(byteOffset: number, value: i32): void;
  setUint8(byteOffset: number, value: u8): void;
  setUint32(byteOffset: number, value: u32): void;
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
