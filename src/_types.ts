import { PointerValue, TypedArray } from "./types.ts";
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
  getBigInt64(byteOffset: number): bigint;
  getBigUint64(byteOffset: number): bigint;
  getInt8(byteOffset: number): number;
  getInt16(byteOffset: number): number;
  getInt32(byteOffset: number): number;
  getFloat32(byteOffset: number): number;
  getFloat64(byteOffset: number): number;
  getPointer<T>(byteOffset: number): PointerValue<T>;
  getUint8(byteOffset: number): number;
  getUint16(byteOffset: number): number;
  getUint32(byteOffset: number): number;
  setInt32(byteOffset: number, value: number): void;
  setUint8(byteOffset: number, value: number): void;
  setUint32(byteOffset: number, value: number): void;
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
