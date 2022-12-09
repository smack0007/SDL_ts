// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { fromPlatformString, getLibraryPath, loadLibrary, PlatformPointer, toPlatformString } from "@platform";
import { BoxedPointer } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { Pointer, PointerTo } from "../pointers.ts";
import { f64, i32, PointerValue, TypedArray, u32, u64, u8 } from "../types.ts";
import { symbols } from "./_symbols.ts";

import { InitFlags } from "./enums.ts";
import {} from "./structs.ts";

import { Surface, version } from "../SDL/structs.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function Init(flags: number, libraryPath?: string): number {
  if (!libraryPath) {
    libraryPath = getLibraryPath("SDL2_image");
  }

  _library = loadLibrary(libraryPath, symbols);

  return _library.symbols.IMG_Init(flags) as number;
}

export function Linked_Version(): version | null {
  return version.of(_library.symbols.IMG_Linked_Version() as PointerValue<version>);
}

export function Load(
  file: string,
): Surface | null {
  return Surface.of(_library.symbols.IMG_Load(
    toPlatformString(file),
  ) as PointerValue<Surface>);
}

export function Quit(): void {
  _library.symbols.IMG_Quit();
  _library.close();
}
