// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { Box } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { PlatformPointer } from "../_types.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f64, i32, int, TypedArray, u32, u64, u8 } from "../types.ts";
import { symbols } from "./_symbols.ts";

import { InitFlags } from "./enums.ts";
import {} from "./structs.ts";

import { Renderer, Surface, Texture, version } from "../SDL/structs.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function Init(flags: InitFlags, libraryPath?: string): number;
export function Init(flags: number, libraryPath?: string): number;
export function Init(flags: InitFlags | number, libraryPath?: string): number {
  _library = Platform.loadLibrary("SDL2_image", symbols, libraryPath);
  return _library.symbols.IMG_Init(flags) as number;
}

export function Linked_Version(): version | null {
  return version.of(Platform.fromPlatformPointer(_library.symbols.IMG_Linked_Version() as PlatformPointer<version>));
}

export function Load(
  file: string,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.IMG_Load(
    Platform.toPlatformString(file),
  ) as PlatformPointer<Surface>));
}

export function LoadTexture(
  renderer: PointerLike<Renderer>,
  file: string,
): Texture | null {
  return Texture.of(Platform.fromPlatformPointer(_library.symbols.IMG_LoadTexture(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformString(file),
  ) as PlatformPointer<Texture>));
}

export function Quit(): void {
  _library.symbols.IMG_Quit();
  _library.close();
}
