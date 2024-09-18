// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { callbacks } from "./_callbacks.ts";
import { getSymbolsFromFunctions } from "../_init.ts";
import { DynamicLibrary } from "../_library.ts";
import { symbols } from "./_symbols.ts";
import { PlatformPointer } from "../_types.ts";
import { Box } from "../_boxes.ts";
import { SDLError } from "../error.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { double, float, InitOptions, int, Uint16, Uint32, Uint64, Uint8 } from "../types.ts";

import {} from "./callbacks.ts";
import {} from "./enums.ts";
import { Font } from "./structs.ts";

import { GetError } from "../SDL/functions.ts";
import { Color, Surface, version } from "../SDL/structs.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function Init(options?: InitOptions): void {
  const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
  _library = Platform.loadLibrary("SDL2_ttf", symbolsToLoad, options?.libraryPath);
  const _result = _library.symbols.TTF_Init() as number;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
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

export function Linked_Version(): version {
  const _result = version.of(
    Platform.fromPlatformPointer(_library.symbols.TTF_Linked_Version() as PlatformPointer<version>),
  );
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
Linked_Version.symbolName = "TTF_Linked_Version";

export function OpenFont(
  file: string,
  ptsize: int,
): Font {
  const _result = Font.of(Platform.fromPlatformPointer(_library.symbols.TTF_OpenFont(
    Platform.toPlatformString(file),
    ptsize,
  ) as PlatformPointer<Font>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
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
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_Blended(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg, Color),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderText_Blended.symbolName = "TTF_RenderText_Blended";

export function RenderText_LCD(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_LCD(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg, Color),
    Platform.toPlatformStruct(bg, Color),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderText_LCD.symbolName = "TTF_RenderText_LCD";

export function RenderText_Solid(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_Solid(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg, Color),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderText_Solid.symbolName = "TTF_RenderText_Solid";

export function RenderText_Shaded(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderText_Shaded(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg, Color),
    Platform.toPlatformStruct(bg, Color),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderText_Shaded.symbolName = "TTF_RenderText_Shaded";

export function RenderUTF8_Blended(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_Blended(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg, Color),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderUTF8_Blended.symbolName = "TTF_RenderUTF8_Blended";

export function RenderUTF8_LCD(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_LCD(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg, Color),
    Platform.toPlatformStruct(bg, Color),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderUTF8_LCD.symbolName = "TTF_RenderUTF8_LCD";

export function RenderUTF8_Solid(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_Solid(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg, Color),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderUTF8_Solid.symbolName = "TTF_RenderUTF8_Solid";

export function RenderUTF8_Shaded(
  font: PointerLike<Font>,
  text: string,
  fg: Color,
  bg: Color,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.TTF_RenderUTF8_Shaded(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformStruct(fg, Color),
    Platform.toPlatformStruct(bg, Color),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderUTF8_Shaded.symbolName = "TTF_RenderUTF8_Shaded";

export function SizeText(
  font: PointerLike<Font>,
  text: string,
  w: PointerLike<int>,
  h: PointerLike<int>,
): int {
  const _result = _library.symbols.TTF_SizeText(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SizeText.symbolName = "TTF_SizeText";

export function SizeUTF8(
  font: PointerLike<Font>,
  text: string,
): [int, int] {
  const w = new Box<int>(int);
  const h = new Box<int>(int);
  const _result = _library.symbols.TTF_SizeUTF8(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return [w.value, h.value];
}
SizeUTF8.symbolName = "TTF_SizeUTF8";

export function SizeUNICODE(
  font: PointerLike<Font>,
  text: string,
  w: PointerLike<int>,
  h: PointerLike<int>,
): int {
  const _result = _library.symbols.TTF_SizeUNICODE(
    Platform.toPlatformPointer(Pointer.of(font)),
    Platform.toPlatformString(text),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SizeUNICODE.symbolName = "TTF_SizeUNICODE";
