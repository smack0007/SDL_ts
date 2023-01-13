import { PointerValue } from "./types.ts";
import { DynamicLibrary, DynamicLibraryInterface } from "./_library.ts";

export interface Platform {
  DataView: new (data: PointerValue<unknown>) => unknown;

  fromPlatformString(value: Uint8Array | PointerValue<unknown>): string;

  loadLibrary<T>(
    libraryName: string,
    symbols: DynamicLibraryInterface,
    libraryPath?: string,
  ): DynamicLibrary<T>;

  toPlatformString(value: string): unknown;
}
