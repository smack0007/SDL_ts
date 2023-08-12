// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { Box } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { PlatformPointer } from "../_types.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f32, f64, i32, InitOptions, int, TypedArray, u16, u32, u64, u8 } from "../types.ts";
import { getSymbolsFromFunctions } from "../_init.ts";
import { symbols } from "./_symbols.ts";

import {} from "./enums.ts";
import { Font } from "./structs.ts";

import { Color, Surface, version } from "../SDL/structs.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function Init(options?: InitOptions): number {
  const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
  _library = Platform.loadLibrary("SDL2_ttf", symbolsToLoad, options?.libraryPath);
  return _library.symbols.TTF_Init() as number;
}
Init.symbolName = "TTF_Init";

export function CloseFont(
  font: PointerLike<Font>,
): void {
  _library.symbols.TTF_CloseFont(
    Platform.toPlatformPointer(Pointer.of(font)),
  );
}
CloseFont.symbolName = "TTF_CloseFont";

export function Linked_Version(): version | null {
  return version.of(Platform.fromPlatformPointer(_library.symbols.TTF_Linked_Version() as PlatformPointer<version>));
}
Linked_Version.symbolName = "TTF_Linked_Version";

export function OpenFont(
  file: string,
  ptsize: i32,
): Font | null {
  return Font.of(Platform.fromPlatformPointer(_library.symbols.TTF_OpenFont(
    Platform.toPlatformString(file),
    ptsize,
  ) as PlatformPointer<Font>));
}
OpenFont.symbolName = "TTF_OpenFont";

export function Quit(): void {
  _library.symbols.TTF_Quit();
  _library.close();
}
Quit.symbolName = "TTF_Quit";

export function RenderText_Blended(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_Blended(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg._data, Color, fg._byteOffset),
  ) as PlatformPointer<Surface>));
}
RenderText_Blended.symbolName = "TTF_RenderText_Blended";

export function RenderText_LCD(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_LCD(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg._data, Color, fg._byteOffset),
    Platform.toPlatformStruct(bg._data, Color, bg._byteOffset),
  ) as PlatformPointer<Surface>));
}
RenderText_LCD.symbolName = "TTF_RenderText_LCD";

export function RenderText_Solid(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_Solid(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg._data, Color, fg._byteOffset),
  ) as PlatformPointer<Surface>));
}
RenderText_Solid.symbolName = "TTF_RenderText_Solid";

export function RenderText_Shaded(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_Shaded(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg._data, Color, fg._byteOffset),
    Platform.toPlatformStruct(bg._data, Color, bg._byteOffset),
  ) as PlatformPointer<Surface>));
}
RenderText_Shaded.symbolName = "TTF_RenderText_Shaded";

export function RenderUTF8_Blended(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_Blended(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg._data, Color, fg._byteOffset),
  ) as PlatformPointer<Surface>));
}
RenderUTF8_Blended.symbolName = "TTF_RenderUTF8_Blended";

export function RenderUTF8_LCD(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_LCD(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg._data, Color, fg._byteOffset),
    Platform.toPlatformStruct(bg._data, Color, bg._byteOffset),
  ) as PlatformPointer<Surface>));
}
RenderUTF8_LCD.symbolName = "TTF_RenderUTF8_LCD";

export function RenderUTF8_Solid(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_Solid(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg._data, Color, fg._byteOffset),
  ) as PlatformPointer<Surface>));
}
RenderUTF8_Solid.symbolName = "TTF_RenderUTF8_Solid";

export function RenderUTF8_Shaded(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_Shaded(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg._data, Color, fg._byteOffset),
    Platform.toPlatformStruct(bg._data, Color, bg._byteOffset),
  ) as PlatformPointer<Surface>));
}
RenderUTF8_Shaded.symbolName = "TTF_RenderUTF8_Shaded";

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
SizeText.symbolName = "TTF_SizeText";

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
SizeUTF8.symbolName = "TTF_SizeUTF8";

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
SizeUNICODE.symbolName = "TTF_SizeUNICODE";
