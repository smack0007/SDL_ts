// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { callbacks } from "./_callbacks.ts";
import { getSymbolsFromFunctions } from "../_init.ts";
import { DynamicLibrary } from "../_library.ts";
import { symbols } from "./_symbols.ts";
import { PlatformPointer } from "../_types.ts";
import { Box } from "../boxes.ts";
import { SDLError } from "../error.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { double, float, InitOptions, int, Uint16, Uint32, Uint64, Uint8 } from "../types.ts";

import {} from "./callbacks.ts";
import { InitFlags } from "./enums.ts";
import {} from "./structs.ts";

import { GetError } from "../SDL/functions.ts";
import { Renderer, Surface, Texture, version } from "../SDL/structs.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function Init(flags: InitFlags, options?: InitOptions): void;
export function Init(flags: number, options?: InitOptions): void;
export function Init(flags: InitFlags | number, options?: InitOptions): void {
  const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
  _library = Platform.loadLibrary("SDL2_image", symbolsToLoad, options?.libraryPath);
  const _result = _library.symbols.IMG_Init(flags) as number;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
}
Init.symbolName = "IMG_Init";

export function Linked_Version(): version {
  const _result = version.of(
    Platform.fromPlatformPointer(_library.symbols.IMG_Linked_Version() as PlatformPointer<version>),
  );
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
Linked_Version.symbolName = "IMG_Linked_Version";

export function Load(
  file: string,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.IMG_Load(
    Platform.toPlatformString(file),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
Load.symbolName = "IMG_Load";

export function LoadTexture(
  renderer: PointerLike<Renderer>,
  file: string,
): Texture {
  const _result = Texture.of(Platform.fromPlatformPointer(_library.symbols.IMG_LoadTexture(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformString(file),
  ) as PlatformPointer<Texture>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
LoadTexture.symbolName = "IMG_LoadTexture";

export function Quit(): void {
  _library.symbols.IMG_Quit();
  _library.close();
}
Quit.symbolName = "IMG_Quit";
