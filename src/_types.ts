import { Pointer } from "./pointers.ts";
import { Callback, Struct, StructConstructor } from "./types.ts";
import { DynamicCallbackDefinition, DynamicLibrary, DynamicLibraryInterface } from "./_library.ts";

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
    definition: DynamicCallbackDefinition<T>,
  ): T;
  getF32(byteOffset: number): number;
  getF64(byteOffset: number): number;
  getI8(byteOffset: number): number;
  getI16(byteOffset: number): number;
  getI32(byteOffset: number): number;
  getI64(byteOffset: number): bigint;
  getPointer<T>(byteOffset: number): Pointer<T>;
  getU8(byteOffset: number): number;
  getU16(byteOffset: number): number;
  getU32(byteOffset: number): number;
  getU64(byteOffset: number): bigint;
  setCallback<T extends Callback>(
    byteOffset: number,
    value: T,
    definition: DynamicCallbackDefinition<T>,
  ): void;
  setF32(byteOffset: number, value: number): void;
  setF64(byteOffset: number, value: number): void;
  setI8(byteOffset: number, value: number): void;
  setI16(byteOffset: number, value: number): void;
  setI32(byteOffset: number, value: number): void;
  setI64(byteOffset: number, value: bigint): void;
  setPointer<T>(byteOffset: number, value: Pointer<T>): void;
  setU8(byteOffset: number, value: number): void;
  setU16(byteOffset: number, value: number): void;
  setU32(byteOffset: number, value: number): void;
  setU64(byteOffset: number, value: bigint): void;
}

export interface Platform {
  POINTER_SIZE_IN_BYTES: number;

  DataView: PlatformDataViewConstructor;

  fromPlatformCallback<T extends Callback>(
    value: PlatformCallback,
    definition: DynamicCallbackDefinition<T>,
  ): T;

  fromPlatformPointer<T>(value: PlatformPointer<T> | null): Pointer<T> | null;

  fromPlatformString(value: Uint8Array | PlatformPointer<unknown>): string;

  fromPlatformStruct<T extends Struct>(
    data: PlatformPointer<T>,
    structConstructor: StructConstructor<T>,
  ): T | null;

  loadLibrary<T extends DynamicLibraryInterface>(
    libraryName: string,
    symbols: T,
    libraryPath?: string,
  ): DynamicLibrary<T>;

  toPlatformCallback<T extends Callback>(
    value: T,
    definition: DynamicCallbackDefinition<T>,
  ): PlatformCallback;

  toPlatformPointer<T>(value: Pointer<T> | null): PlatformPointer<T> | null;

  toPlatformString(value: string | null): PlatformString;

  toPlatformStruct<T extends Struct>(
    struct: T,
    stuctConstructor: StructConstructor<T>,
  ): Uint8Array;
}
