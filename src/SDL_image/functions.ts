// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import platform from "../_platform.ts";
import { BoxedValue } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f64, i32, int, PointerValue, TypedArray, u32, u64, u8 } from "../types.ts";
import { symbols } from "./_symbols.ts";

import { InitFlags } from "./enums.ts";
import {} from "./structs.ts";

import { Renderer, Surface, Texture, version } from "../SDL/structs.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function Init(flags: InitFlags, libraryPath?: string): number;
export function Init(flags: number, libraryPath?: string): number;
export function Init(flags: InitFlags | number, libraryPath?: string): number {
  _library = platform.loadLibrary("SDL2_image", symbols, libraryPath);
  return _library.symbols.IMG_Init(flags) as number;
}

export function Linked_Version(): version | null {
  return version.of(_library.symbols.IMG_Linked_Version() as PointerValue<version>);
}

export function Load(
  file: string,
): Surface | null {
  return Surface.of(_library.symbols.IMG_Load(
    platform.toNativeString(file),
  ) as PointerValue<Surface>);
}

export function LoadTexture(
  renderer: PointerLike<Renderer>,
  file: string,
): Texture | null {
  return Texture.of(_library.symbols.IMG_LoadTexture(
    Pointer.of(renderer),
    platform.toNativeString(file),
  ) as PointerValue<Texture>);
}

export function Quit(): void {
  _library.symbols.IMG_Quit();
  _library.close();
}
