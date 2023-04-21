// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { Box } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { PlatformPointer } from "../_types.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f64, i32, InitOptions, int, TypedArray, u32, u64, u8 } from "../types.ts";
import { getSymbolsFromFunctions } from "../_init.ts";
import { symbols } from "./_symbols.ts";

import { InitFlags } from "./enums.ts";
import {} from "./structs.ts";

import { Renderer, Surface, Texture, version } from "../SDL/structs.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function Init(flags: InitFlags, options?: InitOptions): number;
export function Init(flags: number, options?: InitOptions): number;
export function Init(flags: InitFlags | number, options?: InitOptions): number {
  const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
  _library = Platform.loadLibrary("SDL2_image", symbolsToLoad, options?.libraryPath);
  return _library.symbols.IMG_Init(flags) as number;
}
Init.symbolName = "IMG_Init";

export function Linked_Version(): version | null {
  return version.of(Platform.fromPlatformPointer(_library.symbols.IMG_Linked_Version() as PlatformPointer<version>));
}
Linked_Version.symbolName = "IMG_Linked_Version";

export function Load(
  file: string,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.IMG_Load(
    Platform.toPlatformString(file),
  ) as PlatformPointer<Surface>));
}
Load.symbolName = "IMG_Load";

export function LoadTexture(
  renderer: PointerLike<Renderer>,
  file: string,
): Texture | null {
  return Texture.of(Platform.fromPlatformPointer(_library.symbols.IMG_LoadTexture(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformString(file),
  ) as PlatformPointer<Texture>));
}
LoadTexture.symbolName = "IMG_LoadTexture";

export function Quit(): void {
  _library.symbols.SDL_Quit();
  _library.close();
}
Quit.symbolName = "IMG_Quit";
