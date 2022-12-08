// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { fromPlatformString, getLibraryPath, PlatformPointer, toPlatformString } from "@platform";
import { BoxedPointer } from "../boxes.ts";
import { Pointer, PointerTo } from "../pointers.ts";
import { f64, i32, PointerValue, TypedArray, u32, u64, u8 } from "../types.ts";
import { Symbols, symbols } from "./_symbols.ts";

import {
  ArrayOrder,
  BitmapOrder,
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
  BlitMap,
  Keysym,
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

interface SDLContext {
  library: Deno.DynamicLibrary<Symbols>;

  // TODO: In order to use the correct types we'll have to do a bunch of casts.
  // deno-lint-ignore no-explicit-any
  symbols: any;
  // symbols: Deno.DynamicLibrary<Symbols>["symbols"];
}

const context: SDLContext = {
  // We don't want to check in every function if the
  // library has been loaded so the following are
  // set to null even though the type says it shouldn't
  // be null.
  library: null!,
  symbols: null!,
};

export function BlitScaled(
  src: PointerTo<Surface>,
  srcrect: PointerTo<Rect> | null,
  dst: PointerTo<Surface>,
  dstrect: PointerTo<Rect> | null,
): i32 {
  return context.symbols.SDL_UpperBlitScaled(
    Pointer.of(src),
    Pointer.of(srcrect),
    Pointer.of(dst),
    Pointer.of(dstrect),
  ) as i32;
}

export function BlitSurface(
  src: PointerTo<Surface>,
  srcrect: PointerTo<Rect> | null,
  dst: PointerTo<Surface>,
  dstrect: PointerTo<Rect> | null,
): i32 {
  return context.symbols.SDL_UpperBlit(
    Pointer.of(src),
    Pointer.of(srcrect),
    Pointer.of(dst),
    Pointer.of(dstrect),
  ) as i32;
}

export function ConvertSurface(
  src: PointerTo<Surface>,
  fmt: PointerTo<PixelFormat>,
  flags: u32,
): Surface | null {
  return Surface.of(context.symbols.SDL_ConvertSurface(
    Pointer.of(src),
    Pointer.of(fmt),
    flags,
  ) as PointerValue<Surface>);
}

export function CreateRenderer(
  window: PointerTo<Window>,
  index: i32,
  flags: u32,
): Renderer | null {
  return Renderer.of(context.symbols.SDL_CreateRenderer(
    Pointer.of(window),
    index,
    flags,
  ) as PointerValue<Renderer>);
}

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
  return Surface.of(context.symbols.SDL_CreateRGBSurfaceFrom(
    PlatformPointer.of(pixels),
    width,
    height,
    depth,
    pitch,
    Rmask,
    Gmask,
    Bmask,
    Amask,
  ) as PointerValue<Surface>);
}

export function CreateRGBSurfaceWithFormat(
  flags: u32,
  width: i32,
  height: i32,
  depth: i32,
  format: u32,
): Surface | null {
  return Surface.of(context.symbols.SDL_CreateRGBSurfaceWithFormat(
    flags,
    width,
    height,
    depth,
    format,
  ) as PointerValue<Surface>);
}

export function CreateTexture(
  renderer: PointerTo<Renderer>,
  format: u32,
  access: i32,
  w: i32,
  h: i32,
): Texture | null {
  return Texture.of(context.symbols.SDL_CreateTexture(
    Pointer.of(renderer),
    format,
    access,
    w,
    h,
  ) as PointerValue<Texture>);
}

export function CreateTextureFromSurface(
  renderer: PointerTo<Renderer>,
  surface: PointerTo<Surface>,
): Texture | null {
  return Texture.of(context.symbols.SDL_CreateTextureFromSurface(
    Pointer.of(renderer),
    Pointer.of(surface),
  ) as PointerValue<Texture>);
}

export function CreateWindow(
  title: string,
  x: WindowPos | i32,
  y: WindowPos | i32,
  w: i32,
  h: i32,
  flags: WindowFlags,
): Window | null {
  return Window.of(context.symbols.SDL_CreateWindow(
    toPlatformString(title),
    x,
    y,
    w,
    h,
    flags,
  ) as PointerValue<Window>);
}

export function CreateWindowAndRenderer(
  width: i32,
  height: i32,
  window_flags: WindowFlags,
  window: BoxedPointer<Window>,
  renderer: BoxedPointer<Renderer>,
): i32 {
  return context.symbols.SDL_CreateWindowAndRenderer(
    width,
    height,
    window_flags,
    PlatformPointer.of(window._data),
    PlatformPointer.of(renderer._data),
  ) as i32;
}

export function Delay(
  ms: u32,
): void {
  context.symbols.SDL_Delay(
    ms,
  );
}

export function DestroyRenderer(
  renderer: PointerTo<Renderer>,
): void {
  context.symbols.SDL_DestroyRenderer(
    Pointer.of(renderer),
  );
}

export function DestroyTexture(
  texture: PointerTo<Texture>,
): void {
  context.symbols.SDL_DestroyTexture(
    Pointer.of(texture),
  );
}

export function DestroyWindow(
  window: PointerTo<Window>,
): void {
  context.symbols.SDL_DestroyWindow(
    Pointer.of(window),
  );
}

export function FillRect(
  dst: PointerTo<Surface>,
  rect: PointerTo<Rect> | null,
  color: u32,
): i32 {
  return context.symbols.SDL_FillRect(
    Pointer.of(dst),
    Pointer.of(rect),
    color,
  ) as i32;
}

export function FreeSurface(
  surface: PointerTo<Surface>,
): void {
  context.symbols.SDL_FreeSurface(
    Pointer.of(surface),
  );
}

export function GetError(): string {
  return fromPlatformString(context.symbols.SDL_GetError() as PointerValue<unknown>);
}

export function GetKeyboardState(
  numkeys: PointerValue<number> | null,
): PointerValue<u8[]> {
  return context.symbols.SDL_GetKeyboardState(
    Pointer.of(numkeys),
  ) as PointerValue<u8[]>;
}

export function GetRendererInfo(
  renderer: PointerTo<Renderer>,
  info: PointerTo<RendererInfo>,
): i32 {
  return context.symbols.SDL_GetRendererInfo(
    Pointer.of(renderer),
    Pointer.of(info),
  ) as i32;
}

export function GetRevision(): string {
  return fromPlatformString(context.symbols.SDL_GetRevision() as PointerValue<unknown>);
}

export function GetScancodeFromKey(
  key: Keycode,
): Scancode {
  return context.symbols.SDL_GetScancodeFromKey(
    key,
  ) as Scancode;
}

export function GetScancodeName(
  scancode: Scancode,
): string {
  return fromPlatformString(context.symbols.SDL_GetScancodeName(
    scancode,
  ) as PointerValue<unknown>);
}

export function GetSystemRAM(): i32 {
  return context.symbols.SDL_GetSystemRAM() as i32;
}

export function GetTicks(): u32 {
  return context.symbols.SDL_GetTicks() as u32;
}

export function GetTicks64(): u64 {
  return context.symbols.SDL_GetTicks64() as u64;
}

export function GetVersion(
  ver: PointerTo<version>,
): void {
  context.symbols.SDL_GetVersion(
    Pointer.of(ver),
  );
}

export function GetWindowSurface(
  window: PointerTo<Window>,
): Surface | null {
  return Surface.of(context.symbols.SDL_GetWindowSurface(
    Pointer.of(window),
  ) as PointerValue<Surface>);
}

export function Init(flags: number, libraryPath?: string): number {
  if (!libraryPath) {
    libraryPath = getLibraryPath("SDL2");
  }

  context.library = Deno.dlopen(libraryPath, symbols);
  context.symbols = context.library.symbols;

  return context.symbols.SDL_Init(flags) as number;
}

export function LoadBMP_RW(
  src: PointerTo<RWops>,
  freesrc: i32,
): Surface | null {
  return Surface.of(context.symbols.SDL_LoadBMP_RW(
    Pointer.of(src),
    freesrc,
  ) as PointerValue<Surface>);
}

export function LockSurface(
  surface: PointerTo<Surface>,
): i32 {
  return context.symbols.SDL_LockSurface(
    Pointer.of(surface),
  ) as i32;
}

export function MapRGB(
  format: PointerTo<PixelFormat>,
  r: u8,
  g: u8,
  b: u8,
): u32 {
  return context.symbols.SDL_MapRGB(
    Pointer.of(format),
    r,
    g,
    b,
  ) as u32;
}

export function MapRGBA(
  format: PointerTo<PixelFormat>,
  r: u8,
  g: u8,
  b: u8,
  a: u8,
): u32 {
  return context.symbols.SDL_MapRGBA(
    Pointer.of(format),
    r,
    g,
    b,
    a,
  ) as u32;
}

export function MaximizeWindow(
  window: PointerTo<Window>,
): void {
  context.symbols.SDL_MaximizeWindow(
    Pointer.of(window),
  );
}

export function MinimizeWindow(
  window: PointerTo<Window>,
): void {
  context.symbols.SDL_MinimizeWindow(
    Pointer.of(window),
  );
}

export function PollEvent(
  event: PointerTo<Event>,
): i32 {
  return context.symbols.SDL_PollEvent(
    Pointer.of(event),
  ) as i32;
}

export function Quit(): void {
  context.symbols.SDL_Quit();
  context.library.close();
}

export function RenderClear(
  renderer: PointerTo<Renderer>,
): i32 {
  return context.symbols.SDL_RenderClear(
    Pointer.of(renderer),
  ) as i32;
}

export function RenderCopy(
  renderer: PointerTo<Renderer>,
  texture: PointerTo<Texture>,
  srcrect: PointerTo<Rect> | null,
  dstrect: PointerTo<Rect> | null,
): i32 {
  return context.symbols.SDL_RenderCopy(
    Pointer.of(renderer),
    Pointer.of(texture),
    Pointer.of(srcrect),
    Pointer.of(dstrect),
  ) as i32;
}

export function RenderCopyEx(
  renderer: PointerTo<Renderer>,
  texture: PointerTo<Texture>,
  srcrect: PointerTo<Rect>,
  dstrect: PointerTo<Rect>,
  angle: f64,
  center: PointerTo<Point>,
  flip: RendererFlip,
): i32 {
  return context.symbols.SDL_RenderCopyEx(
    Pointer.of(renderer),
    Pointer.of(texture),
    Pointer.of(srcrect),
    Pointer.of(dstrect),
    angle,
    Pointer.of(center),
    flip,
  ) as i32;
}

export function RenderDrawLine(
  renderer: PointerTo<Renderer>,
  x1: i32,
  y1: i32,
  x2: i32,
  y2: i32,
): i32 {
  return context.symbols.SDL_RenderDrawLine(
    Pointer.of(renderer),
    x1,
    y1,
    x2,
    y2,
  ) as i32;
}

export function RenderDrawLines(
  renderer: PointerTo<Renderer>,
  points: PointerTo<Point>,
  count: i32,
): i32 {
  return context.symbols.SDL_RenderDrawLines(
    Pointer.of(renderer),
    Pointer.of(points),
    count,
  ) as i32;
}

export function RenderDrawPoint(
  renderer: PointerTo<Renderer>,
  x: i32,
  y: i32,
): i32 {
  return context.symbols.SDL_RenderDrawPoint(
    Pointer.of(renderer),
    x,
    y,
  ) as i32;
}

export function RenderDrawPoints(
  renderer: PointerTo<Renderer>,
  points: PointerTo<Point>,
  count: i32,
): i32 {
  return context.symbols.SDL_RenderDrawPoints(
    Pointer.of(renderer),
    Pointer.of(points),
    count,
  ) as i32;
}

export function RenderDrawRect(
  renderer: PointerTo<Renderer>,
  rect: PointerTo<Rect>,
): i32 {
  return context.symbols.SDL_RenderDrawRect(
    Pointer.of(renderer),
    Pointer.of(rect),
  ) as i32;
}

export function RenderDrawRects(
  renderer: PointerTo<Renderer>,
  rects: PointerTo<Rect>,
  count: i32,
): i32 {
  return context.symbols.SDL_RenderDrawRects(
    Pointer.of(renderer),
    Pointer.of(rects),
    count,
  ) as i32;
}

export function RenderFillRect(
  renderer: PointerTo<Renderer>,
  rect: PointerTo<Rect>,
): i32 {
  return context.symbols.SDL_RenderFillRect(
    Pointer.of(renderer),
    Pointer.of(rect),
  ) as i32;
}

export function RenderFillRects(
  renderer: PointerTo<Renderer>,
  rects: PointerTo<Rect>,
  count: i32,
): i32 {
  return context.symbols.SDL_RenderFillRects(
    Pointer.of(renderer),
    Pointer.of(rects),
    count,
  ) as i32;
}

export function RenderFlush(
  renderer: PointerTo<Renderer>,
): i32 {
  return context.symbols.SDL_RenderFlush(
    Pointer.of(renderer),
  ) as i32;
}

export function RenderPresent(
  renderer: PointerTo<Renderer>,
): void {
  context.symbols.SDL_RenderPresent(
    Pointer.of(renderer),
  );
}

export function RestoreWindow(
  window: PointerTo<Window>,
): void {
  context.symbols.SDL_RestoreWindow(
    Pointer.of(window),
  );
}

export function RWFromFile(
  file: string,
  mode: RWMode,
): RWops | null {
  return RWops.of(context.symbols.SDL_RWFromFile(
    toPlatformString(file),
    toPlatformString(mode),
  ) as PointerValue<RWops>);
}

export function SetRenderDrawColor(
  renderer: PointerTo<Renderer>,
  r: u8,
  g: u8,
  b: u8,
  a: u8,
): i32 {
  return context.symbols.SDL_SetRenderDrawColor(
    Pointer.of(renderer),
    r,
    g,
    b,
    a,
  ) as i32;
}

export function UnlockSurface(
  surface: PointerTo<Surface>,
): void {
  context.symbols.SDL_UnlockSurface(
    Pointer.of(surface),
  );
}

export function UpdateWindowSurface(
  window: PointerTo<Window>,
): i32 {
  return context.symbols.SDL_UpdateWindowSurface(
    Pointer.of(window),
  ) as i32;
}
