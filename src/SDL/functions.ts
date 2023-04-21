// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { Box } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { PlatformPointer } from "../_types.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f64, i32, InitOptions, int, TypedArray, u32, u64, u8 } from "../types.ts";
import { symbols } from "./_symbols.ts";

import {
  ArrayOrder,
  BitmapOrder,
  BlendFactor,
  BlendMode,
  BlendOperation,
  EventType,
  InitFlags,
  Keycode,
  PackedLayout,
  PackedOrder,
  PixelType,
  RendererFlags,
  RendererFlip,
  ScaleMode,
  Scancode,
  TextureAccess,
  TextureModulate,
  WindowEventID,
  WindowFlags,
  WindowPos,
} from "./enums.ts";
import {
  Color,
  Keysym,
  Palette,
  PixelFormat,
  Point,
  Rect,
  Renderer,
  RendererInfo,
  RWops,
  Surface,
  Texture,
  version,
  Window,
} from "./structs.ts";

import { Event } from "./events.ts";
import { RWMode } from "./types.ts";
import { getSymbolsFromFunctions } from "../_init.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function BlitScaled(
  src: PointerLike<Surface>,
  srcrect: PointerLike<Rect> | null,
  dst: PointerLike<Surface>,
  dstrect: PointerLike<Rect> | null,
): i32 {
  return _library.symbols.SDL_UpperBlitScaled(
    Platform.toPlatformPointer(Pointer.of(src)),
    Platform.toPlatformPointer(Pointer.of(srcrect)),
    Platform.toPlatformPointer(Pointer.of(dst)),
    Platform.toPlatformPointer(Pointer.of(dstrect)),
  ) as i32;
}
BlitScaled.symbolName = "SDL_BlitScaled";

export function BlitSurface(
  src: PointerLike<Surface>,
  srcrect: PointerLike<Rect> | null,
  dst: PointerLike<Surface>,
  dstrect: PointerLike<Rect> | null,
): i32 {
  return _library.symbols.SDL_UpperBlit(
    Platform.toPlatformPointer(Pointer.of(src)),
    Platform.toPlatformPointer(Pointer.of(srcrect)),
    Platform.toPlatformPointer(Pointer.of(dst)),
    Platform.toPlatformPointer(Pointer.of(dstrect)),
  ) as i32;
}
BlitSurface.symbolName = "SDL_BlitSurface";

export function ConvertSurface(
  src: PointerLike<Surface>,
  fmt: PointerLike<PixelFormat>,
  flags: u32,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_ConvertSurface(
    Platform.toPlatformPointer(Pointer.of(src)),
    Platform.toPlatformPointer(Pointer.of(fmt)),
    flags,
  ) as PlatformPointer<Surface>));
}
ConvertSurface.symbolName = "SDL_ConvertSurface";

export function CreateRenderer(
  window: PointerLike<Window>,
  index: i32,
  flags: u32,
): Renderer | null {
  return Renderer.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateRenderer(
    Platform.toPlatformPointer(Pointer.of(window)),
    index,
    flags,
  ) as PlatformPointer<Renderer>));
}
CreateRenderer.symbolName = "SDL_CreateRenderer";

export function CreateRGBSurface(
  flags: u32,
  width: i32,
  height: i32,
  depth: i32,
  Rmask: u32,
  Gmask: u32,
  Bmask: u32,
  Amask: u32,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateRGBSurface(
    flags,
    width,
    height,
    depth,
    Rmask,
    Gmask,
    Bmask,
    Amask,
  ) as PlatformPointer<Surface>));
}
CreateRGBSurface.symbolName = "SDL_CreateRGBSurface";

export function CreateRGBSurfaceFrom(
  pixels: TypedArray,
  width: i32,
  height: i32,
  depth: i32,
  pitch: i32,
  Rmask: u32,
  Gmask: u32,
  Bmask: u32,
  Amask: u32,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateRGBSurfaceFrom(
    Platform.toPlatformPointer(Pointer.ofTypedArray(pixels)),
    width,
    height,
    depth,
    pitch,
    Rmask,
    Gmask,
    Bmask,
    Amask,
  ) as PlatformPointer<Surface>));
}
CreateRGBSurfaceFrom.symbolName = "SDL_CreateRGBSurfaceFrom";

export function CreateRGBSurfaceWithFormat(
  flags: u32,
  width: i32,
  height: i32,
  depth: i32,
  format: u32,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateRGBSurfaceWithFormat(
    flags,
    width,
    height,
    depth,
    format,
  ) as PlatformPointer<Surface>));
}
CreateRGBSurfaceWithFormat.symbolName = "SDL_CreateRGBSurfaceWithFormat";

export function CreateTexture(
  renderer: PointerLike<Renderer>,
  format: u32,
  access: i32,
  w: i32,
  h: i32,
): Texture | null {
  return Texture.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateTexture(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    format,
    access,
    w,
    h,
  ) as PlatformPointer<Texture>));
}
CreateTexture.symbolName = "SDL_CreateTexture";

export function CreateTextureFromSurface(
  renderer: PointerLike<Renderer>,
  surface: PointerLike<Surface>,
): Texture | null {
  return Texture.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateTextureFromSurface(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(surface)),
  ) as PlatformPointer<Texture>));
}
CreateTextureFromSurface.symbolName = "SDL_CreateTextureFromSurface";

export function CreateWindow(
  title: string,
  x: WindowPos,
  y: WindowPos,
  w: i32,
  h: i32,
  flags: WindowFlags,
): Window | null;
export function CreateWindow(
  title: string,
  x: i32,
  y: i32,
  w: i32,
  h: i32,
  flags: WindowFlags,
): Window | null;
export function CreateWindow(
  title: string,
  x: WindowPos | i32,
  y: WindowPos | i32,
  w: i32,
  h: i32,
  flags: WindowFlags,
): Window | null {
  return Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateWindow(
    Platform.toPlatformString(title),
    x,
    y,
    w,
    h,
    flags,
  ) as PlatformPointer<Window>));
}
CreateWindow.symbolName = "SDL_CreateWindow";

export function CreateWindowAndRenderer(
  width: i32,
  height: i32,
  window_flags: WindowFlags,
  window: Box<Pointer<Window>>,
  renderer: Box<Pointer<Renderer>>,
): i32 {
  return _library.symbols.SDL_CreateWindowAndRenderer(
    width,
    height,
    window_flags,
    Platform.toPlatformPointer(Pointer.ofTypedArray(window._data)),
    Platform.toPlatformPointer(Pointer.ofTypedArray(renderer._data)),
  ) as i32;
}
CreateWindowAndRenderer.symbolName = "SDL_CreateWindowAndRenderer";

export function Delay(
  ms: u32,
): void {
  _library.symbols.SDL_Delay(
    ms,
  );
}
Delay.symbolName = "SDL_Delay";

export function DestroyRenderer(
  renderer: PointerLike<Renderer>,
): void {
  _library.symbols.SDL_DestroyRenderer(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  );
}
DestroyRenderer.symbolName = "SDL_DestroyRenderer";

export function DestroyTexture(
  texture: PointerLike<Texture>,
): void {
  _library.symbols.SDL_DestroyTexture(
    Platform.toPlatformPointer(Pointer.of(texture)),
  );
}
DestroyTexture.symbolName = "SDL_DestroyTexture";

export function DestroyWindow(
  window: PointerLike<Window>,
): void {
  _library.symbols.SDL_DestroyWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  );
}
DestroyWindow.symbolName = "SDL_DestroyWindow";

export function FillRect(
  dst: PointerLike<Surface>,
  rect: PointerLike<Rect> | null,
  color: u32,
): i32 {
  return _library.symbols.SDL_FillRect(
    Platform.toPlatformPointer(Pointer.of(dst)),
    Platform.toPlatformPointer(Pointer.of(rect)),
    color,
  ) as i32;
}
FillRect.symbolName = "SDL_FillRect";

export function FreeSurface(
  surface: PointerLike<Surface>,
): void {
  _library.symbols.SDL_FreeSurface(
    Platform.toPlatformPointer(Pointer.of(surface)),
  );
}
FreeSurface.symbolName = "SDL_FreeSurface";

export function GetColorKey(
  surface: PointerLike<Surface>,
  key: PointerLike<u32>,
): i32 {
  return _library.symbols.SDL_GetColorKey(
    Platform.toPlatformPointer(Pointer.of(surface)),
    Platform.toPlatformPointer(Pointer.of(key)),
  ) as i32;
}
GetColorKey.symbolName = "SDL_GetColorKey";

export function GetError(): string {
  return Platform.fromPlatformString(_library.symbols.SDL_GetError() as PlatformPointer<unknown>);
}
GetError.symbolName = "SDL_GetError";

export function GetKeyboardState(
  numkeys: PointerLike<int> | null,
): Pointer<u8> {
  return Platform.fromPlatformPointer(_library.symbols.SDL_GetKeyboardState(
    Platform.toPlatformPointer(Pointer.of(numkeys)),
  ) as PlatformPointer<u8>)!;
}
GetKeyboardState.symbolName = "SDL_GetKeyboardState";

export function GetRendererInfo(
  renderer: PointerLike<Renderer>,
  info: PointerLike<RendererInfo>,
): i32 {
  return _library.symbols.SDL_GetRendererInfo(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(info)),
  ) as i32;
}
GetRendererInfo.symbolName = "SDL_GetRendererInfo";

export function GetRevision(): string {
  return Platform.fromPlatformString(_library.symbols.SDL_GetRevision() as PlatformPointer<unknown>);
}
GetRevision.symbolName = "SDL_GetRevision";

export function GetScancodeFromKey(
  key: Keycode,
): Scancode {
  return _library.symbols.SDL_GetScancodeFromKey(
    key,
  ) as Scancode;
}
GetScancodeFromKey.symbolName = "SDL_GetScancodeFromKey";

export function GetScancodeName(
  scancode: Scancode,
): string {
  return Platform.fromPlatformString(_library.symbols.SDL_GetScancodeName(
    scancode,
  ) as PlatformPointer<unknown>);
}
GetScancodeName.symbolName = "SDL_GetScancodeName";

export function GetSystemRAM(): i32 {
  return _library.symbols.SDL_GetSystemRAM() as i32;
}
GetSystemRAM.symbolName = "SDL_GetSystemRAM";

export function GetTextureAlphaMod(
  texture: PointerLike<Texture>,
  alpha: PointerLike<u8>,
): i32 {
  return _library.symbols.SDL_GetTextureAlphaMod(
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(alpha)),
  ) as i32;
}
GetTextureAlphaMod.symbolName = "SDL_GetTextureAlphaMod";

export function GetTextureBlendMode(
  texture: PointerLike<Texture>,
  blendMode: PointerLike<BlendMode>,
): i32 {
  return _library.symbols.SDL_GetTextureBlendMode(
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(blendMode)),
  ) as i32;
}
GetTextureBlendMode.symbolName = "SDL_GetTextureBlendMode";

export function GetTextureColorMod(
  texture: PointerLike<Texture>,
  r: PointerLike<u8>,
  g: PointerLike<u8>,
  b: PointerLike<u8>,
): i32 {
  return _library.symbols.SDL_GetTextureColorMod(
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(r)),
    Platform.toPlatformPointer(Pointer.of(g)),
    Platform.toPlatformPointer(Pointer.of(b)),
  ) as i32;
}
GetTextureColorMod.symbolName = "SDL_GetTextureColorMod";

export function GetTicks(): u32 {
  return _library.symbols.SDL_GetTicks() as u32;
}
GetTicks.symbolName = "SDL_GetTicks";

export function GetTicks64(): u64 {
  return BigInt(_library.symbols.SDL_GetTicks64() as bigint | number);
}
GetTicks64.symbolName = "SDL_GetTicks64";

export function GetVersion(
  ver: PointerLike<version>,
): void {
  _library.symbols.SDL_GetVersion(
    Platform.toPlatformPointer(Pointer.of(ver)),
  );
}
GetVersion.symbolName = "SDL_GetVersion";

export function GetWindowSurface(
  window: PointerLike<Window>,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowSurface(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as PlatformPointer<Surface>));
}
GetWindowSurface.symbolName = "SDL_GetWindowSurface";

export function GetWindowTitle(
  window: PointerLike<Window>,
): string {
  return Platform.fromPlatformString(_library.symbols.SDL_GetWindowTitle(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as PlatformPointer<unknown>);
}
GetWindowTitle.symbolName = "SDL_GetWindowTitle";

export function HasColorKey(
  surface: PointerLike<Surface>,
): boolean {
  return _library.symbols.SDL_HasColorKey(
    Platform.toPlatformPointer(Pointer.of(surface)),
  ) as boolean;
}
HasColorKey.symbolName = "SDL_HasColorKey";

export function Init(flags: InitFlags, options?: InitOptions): number;
export function Init(flags: number, options?: InitOptions): number;
export function Init(flags: InitFlags | number, options?: InitOptions): number {
  const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
  _library = Platform.loadLibrary("SDL2", symbolsToLoad, options?.libraryPath);
  return _library.symbols.SDL_Init(flags) as number;
}
Init.symbolName = "SDL_Init";

export function LoadBMP_RW(
  src: PointerLike<RWops>,
  freesrc: i32,
): Surface | null {
  return Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_LoadBMP_RW(
    Platform.toPlatformPointer(Pointer.of(src)),
    freesrc,
  ) as PlatformPointer<Surface>));
}
LoadBMP_RW.symbolName = "SDL_LoadBMP_RW";

export function LockSurface(
  surface: PointerLike<Surface>,
): i32 {
  return _library.symbols.SDL_LockSurface(
    Platform.toPlatformPointer(Pointer.of(surface)),
  ) as i32;
}
LockSurface.symbolName = "SDL_LockSurface";

export function MapRGB(
  format: PointerLike<PixelFormat>,
  r: u8,
  g: u8,
  b: u8,
): u32 {
  return _library.symbols.SDL_MapRGB(
    Platform.toPlatformPointer(Pointer.of(format)),
    r,
    g,
    b,
  ) as u32;
}
MapRGB.symbolName = "SDL_MapRGB";

export function MapRGBA(
  format: PointerLike<PixelFormat>,
  r: u8,
  g: u8,
  b: u8,
  a: u8,
): u32 {
  return _library.symbols.SDL_MapRGBA(
    Platform.toPlatformPointer(Pointer.of(format)),
    r,
    g,
    b,
    a,
  ) as u32;
}
MapRGBA.symbolName = "SDL_MapRGBA";

export function MaximizeWindow(
  window: PointerLike<Window>,
): void {
  _library.symbols.SDL_MaximizeWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  );
}
MaximizeWindow.symbolName = "SDL_MaximizeWindow";

export function MinimizeWindow(
  window: PointerLike<Window>,
): void {
  _library.symbols.SDL_MinimizeWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  );
}
MinimizeWindow.symbolName = "SDL_MinimizeWindow";

export function PollEvent(
  event: PointerLike<Event>,
): i32 {
  return _library.symbols.SDL_PollEvent(
    Platform.toPlatformPointer(Pointer.of(event)),
  ) as i32;
}
PollEvent.symbolName = "SDL_PollEvent";

export function QueryTexture(
  texture: PointerLike<Texture>,
  format: PointerLike<u32> | null,
  access: PointerLike<int> | null,
  w: PointerLike<int>,
  h: PointerLike<int>,
): i32 {
  return _library.symbols.SDL_QueryTexture(
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(format)),
    Platform.toPlatformPointer(Pointer.of(access)),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  ) as i32;
}
QueryTexture.symbolName = "SDL_QueryTexture";

export function Quit(): void {
  _library.symbols.SDL_Quit();
  _library.close();
}
Quit.symbolName = "SDL_Quit";

export function RenderClear(
  renderer: PointerLike<Renderer>,
): i32 {
  return _library.symbols.SDL_RenderClear(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  ) as i32;
}
RenderClear.symbolName = "SDL_RenderClear";

export function RenderCopy(
  renderer: PointerLike<Renderer>,
  texture: PointerLike<Texture>,
  srcrect: PointerLike<Rect> | null,
  dstrect: PointerLike<Rect> | null,
): i32 {
  return _library.symbols.SDL_RenderCopy(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(srcrect)),
    Platform.toPlatformPointer(Pointer.of(dstrect)),
  ) as i32;
}
RenderCopy.symbolName = "SDL_RenderCopy";

export function RenderCopyEx(
  renderer: PointerLike<Renderer>,
  texture: PointerLike<Texture>,
  srcrect: PointerLike<Rect>,
  dstrect: PointerLike<Rect>,
  angle: f64,
  center: PointerLike<Point>,
  flip: RendererFlip,
): i32 {
  return _library.symbols.SDL_RenderCopyEx(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(srcrect)),
    Platform.toPlatformPointer(Pointer.of(dstrect)),
    angle,
    Platform.toPlatformPointer(Pointer.of(center)),
    flip,
  ) as i32;
}
RenderCopyEx.symbolName = "SDL_RenderCopyEx";

export function RenderDrawLine(
  renderer: PointerLike<Renderer>,
  x1: i32,
  y1: i32,
  x2: i32,
  y2: i32,
): i32 {
  return _library.symbols.SDL_RenderDrawLine(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    x1,
    y1,
    x2,
    y2,
  ) as i32;
}
RenderDrawLine.symbolName = "SDL_RenderDrawLine";

export function RenderDrawLines(
  renderer: PointerLike<Renderer>,
  points: PointerLike<Point>,
  count: i32,
): i32 {
  return _library.symbols.SDL_RenderDrawLines(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(points)),
    count,
  ) as i32;
}
RenderDrawLines.symbolName = "SDL_RenderDrawLines";

export function RenderDrawPoint(
  renderer: PointerLike<Renderer>,
  x: i32,
  y: i32,
): i32 {
  return _library.symbols.SDL_RenderDrawPoint(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    x,
    y,
  ) as i32;
}
RenderDrawPoint.symbolName = "SDL_RenderDrawPoint";

export function RenderDrawPoints(
  renderer: PointerLike<Renderer>,
  points: PointerLike<Point>,
  count: i32,
): i32 {
  return _library.symbols.SDL_RenderDrawPoints(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(points)),
    count,
  ) as i32;
}
RenderDrawPoints.symbolName = "SDL_RenderDrawPoints";

export function RenderDrawRect(
  renderer: PointerLike<Renderer>,
  rect: PointerLike<Rect>,
): i32 {
  return _library.symbols.SDL_RenderDrawRect(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(rect)),
  ) as i32;
}
RenderDrawRect.symbolName = "SDL_RenderDrawRect";

export function RenderDrawRects(
  renderer: PointerLike<Renderer>,
  rects: PointerLike<Rect>,
  count: i32,
): i32 {
  return _library.symbols.SDL_RenderDrawRects(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(rects)),
    count,
  ) as i32;
}
RenderDrawRects.symbolName = "SDL_RenderDrawRects";

export function RenderFillRect(
  renderer: PointerLike<Renderer>,
  rect: PointerLike<Rect>,
): i32 {
  return _library.symbols.SDL_RenderFillRect(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(rect)),
  ) as i32;
}
RenderFillRect.symbolName = "SDL_RenderFillRect";

export function RenderFillRects(
  renderer: PointerLike<Renderer>,
  rects: PointerLike<Rect>,
  count: i32,
): i32 {
  return _library.symbols.SDL_RenderFillRects(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(rects)),
    count,
  ) as i32;
}
RenderFillRects.symbolName = "SDL_RenderFillRects";

export function RenderFlush(
  renderer: PointerLike<Renderer>,
): i32 {
  return _library.symbols.SDL_RenderFlush(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  ) as i32;
}
RenderFlush.symbolName = "SDL_RenderFlush";

export function RenderPresent(
  renderer: PointerLike<Renderer>,
): void {
  _library.symbols.SDL_RenderPresent(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  );
}
RenderPresent.symbolName = "SDL_RenderPresent";

export function RestoreWindow(
  window: PointerLike<Window>,
): void {
  _library.symbols.SDL_RestoreWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  );
}
RestoreWindow.symbolName = "SDL_RestoreWindow";

export function RWFromFile(
  file: string,
  mode: RWMode,
): RWops | null {
  return RWops.of(Platform.fromPlatformPointer(_library.symbols.SDL_RWFromFile(
    Platform.toPlatformString(file),
    Platform.toPlatformString(mode),
  ) as PlatformPointer<RWops>));
}
RWFromFile.symbolName = "SDL_RWFromFile";

export function SetColorKey(
  surface: PointerLike<Surface>,
  flag: i32,
  key: u32,
): i32 {
  return _library.symbols.SDL_SetColorKey(
    Platform.toPlatformPointer(Pointer.of(surface)),
    flag,
    key,
  ) as i32;
}
SetColorKey.symbolName = "SDL_SetColorKey";

export function SetRenderDrawBlendMode(
  renderer: PointerLike<Renderer>,
  blendMode: BlendMode,
): i32 {
  return _library.symbols.SDL_SetRenderDrawBlendMode(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    blendMode,
  ) as i32;
}
SetRenderDrawBlendMode.symbolName = "SDL_SetRenderDrawBlendMode";

export function SetRenderDrawColor(
  renderer: PointerLike<Renderer>,
  r: u8,
  g: u8,
  b: u8,
  a: u8,
): i32 {
  return _library.symbols.SDL_SetRenderDrawColor(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    r,
    g,
    b,
    a,
  ) as i32;
}
SetRenderDrawColor.symbolName = "SDL_SetRenderDrawColor";

export function SetSurfaceBlendMode(
  surface: PointerLike<Surface>,
  blendMode: BlendMode,
): i32 {
  return _library.symbols.SDL_SetSurfaceBlendMode(
    Platform.toPlatformPointer(Pointer.of(surface)),
    blendMode,
  ) as i32;
}
SetSurfaceBlendMode.symbolName = "SDL_SetSurfaceBlendMode";

export function SetTextureAlphaMod(
  texture: PointerLike<Texture>,
  alpha: u8,
): i32 {
  return _library.symbols.SDL_SetTextureAlphaMod(
    Platform.toPlatformPointer(Pointer.of(texture)),
    alpha,
  ) as i32;
}
SetTextureAlphaMod.symbolName = "SDL_SetTextureAlphaMod";

export function SetTextureBlendMode(
  texture: PointerLike<Texture>,
  blendMode: BlendMode,
): i32 {
  return _library.symbols.SDL_SetTextureBlendMode(
    Platform.toPlatformPointer(Pointer.of(texture)),
    blendMode,
  ) as i32;
}
SetTextureBlendMode.symbolName = "SDL_SetTextureBlendMode";

export function SetTextureColorMod(
  texture: PointerLike<Texture>,
  r: u8,
  g: u8,
  b: u8,
): i32 {
  return _library.symbols.SDL_SetTextureColorMod(
    Platform.toPlatformPointer(Pointer.of(texture)),
    r,
    g,
    b,
  ) as i32;
}
SetTextureColorMod.symbolName = "SDL_SetTextureColorMod";

export function SetWindowTitle(
  window: PointerLike<Window>,
  title: string,
): void {
  _library.symbols.SDL_SetWindowTitle(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformString(title),
  );
}
SetWindowTitle.symbolName = "SDL_SetWindowTitle";

export function UnlockSurface(
  surface: PointerLike<Surface>,
): void {
  _library.symbols.SDL_UnlockSurface(
    Platform.toPlatformPointer(Pointer.of(surface)),
  );
}
UnlockSurface.symbolName = "SDL_UnlockSurface";

export function UpdateWindowSurface(
  window: PointerLike<Window>,
): i32 {
  return _library.symbols.SDL_UpdateWindowSurface(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as i32;
}
UpdateWindowSurface.symbolName = "SDL_UpdateWindowSurface";
