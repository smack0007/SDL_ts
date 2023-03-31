// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { Box } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { PlatformPointer } from "../_types.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f64, i32, int, TypedArray, u32, u64, u8 } from "../types.ts";
import { symbols } from "./_symbols.ts";

import {} from "./enums.ts";
import { Font } from "./structs.ts";

import { Color, Surface, version } from "../SDL/structs.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function Init(libraryPath?: string): number {
  _library = Platform.loadLibrary("SDL2_ttf", symbols, libraryPath);
  return _library.symbols.TTF_Init() as number;
}

export function CloseFont(
  font: PointerLike<Font>,
): void {
  _library.symbols.TTF_CloseFont(
    Platform.toPlatformPointer(Pointer.of(font)),
  );
}

export function Linked_Version(): version | null {
  return version.of(Platform.fromPlatformPointer(_library.symbols.TTF_Linked_Version() as PlatformPointer<version>));
}

export function OpenFont(
  file: string,
  ptsize: i32,
): Font | null {
  return Font.of(Platform.fromPlatformPointer(_library.symbols.TTF_OpenFont(
    Platform.toPlatformString(file),
    ptsize,
  ) as PlatformPointer<Font>));
}

export function Quit(): void {
  _library.symbols.TTF_Quit();
  _library.close();
}

export function RenderText_Blended(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_Blended(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    fg._data,
  ) as PlatformPointer<Surface>));
}

export function RenderText_LCD(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_LCD(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    fg._data,
    bg._data,
  ) as PlatformPointer<Surface>));
}

export function RenderText_Solid(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_Solid(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    fg._data,
  ) as PlatformPointer<Surface>));
}

export function RenderUTF8_Blended(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_Blended(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    fg._data,
  ) as PlatformPointer<Surface>));
}

export function RenderUTF8_LCD(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_LCD(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    fg._data,
    bg._data,
  ) as PlatformPointer<Surface>));
}

export function RenderUTF8_Solid(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_Solid(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    fg._data,
  ) as PlatformPointer<Surface>));
}

export function SizeText(
  font: PointerLike<Font>,
  text: string,
  w: PointerLike<int>,
  h: PointerLike<int>,
): i32 {
  return _library.symbols.TTF_SizeText(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  ) as i32;
}

export function SizeUTF8(
  font: PointerLike<Font>,
  text: string,
  w: PointerLike<int>,
  h: PointerLike<int>,
): i32 {
  return _library.symbols.TTF_SizeUTF8(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  ) as i32;
}

export function SizeUNICODE(
  font: PointerLike<Font>,
  text: string,
  w: PointerLike<int>,
  h: PointerLike<int>,
): i32 {
  return _library.symbols.TTF_SizeUNICODE(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  ) as i32;
}
