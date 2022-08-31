// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { fromPlatformString, NULL_POINTER, PlatformDataView, PlatformPointer, toPlatformString } from "platform";
import { Event } from "./events.ts";
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
  Window,
} from "./structs.ts";
import { Symbols, symbols } from "./_symbols.ts";
import {
  f32,
  f64,
  i16,
  i32,
  i64,
  i8,
  PointerTarget,
  PointerValue,
  RWMode,
  TypedArray,
  u16,
  u32,
  u64,
  u8,
} from "../types.ts";
import { setPointerTarget } from "../_utils.ts";
import { Memory } from "../memory.ts";
import { Pointer, PointerLike } from "../pointers.ts";

interface SDLContext {
  library: Deno.DynamicLibrary<Symbols>;

  // TODO: Figure out the correct typing again. Don't know why this seems to have broken.
  // deno-lint-ignore no-explicit-any
  symbols: any;
  // symbols: Deno.StaticForeignLibraryInterface<Symbols>;
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
  src: PointerValue<Surface>,
  srcrect: PointerValue<Rect> | null,
  dst: PointerValue<Surface>,
  dstrect: PointerValue<Rect> | null,
): i32 {
  return context.symbols.SDL_UpperBlitScaled(
    src,
    srcrect ?? NULL_POINTER,
    dst,
    dstrect ?? NULL_POINTER,
  ) as i32;
}

export function BlitSurface(
  src: PointerValue<Surface>,
  srcrect: PointerValue<Rect> | null,
  dst: PointerValue<Surface>,
  dstrect: PointerValue<Rect> | null,
): i32 {
  return context.symbols.SDL_UpperBlit(
    src,
    srcrect ?? NULL_POINTER,
    dst,
    dstrect ?? NULL_POINTER,
  ) as i32;
}

export function CreateRenderer(
  window: PointerValue<Window>,
  index: i32,
  flags: u32,
): PointerValue<Renderer> {
  return context.symbols.SDL_CreateRenderer(
    window,
    index,
    flags,
  ) as PointerValue<Renderer>;
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
): PointerValue<Surface> {
  return context.symbols.SDL_CreateRGBSurfaceFrom(
    Deno.UnsafePointer.of(pixels),
    width,
    height,
    depth,
    pitch,
    Rmask,
    Gmask,
    Bmask,
    Amask,
  ) as PointerValue<Surface>;
}

export function CreateRGBSurfaceWithFormat(
  flags: u32,
  width: i32,
  height: i32,
  depth: i32,
  format: u32,
): PointerValue<Surface> {
  return context.symbols.SDL_CreateRGBSurfaceWithFormat(
    flags,
    width,
    height,
    depth,
    format,
  ) as PointerValue<Surface>;
}

export function CreateTexture(
  renderer: PointerValue<Renderer>,
  format: u32,
  access: i32,
  w: i32,
  h: i32,
): PointerValue<Texture> {
  return context.symbols.SDL_CreateTexture(
    renderer,
    format,
    access,
    w,
    h,
  ) as PointerValue<Texture>;
}

export function CreateTextureFromSurface(
  renderer: PointerValue<Renderer>,
  surface: PointerValue<Surface>,
): PointerValue<Texture> {
  return context.symbols.SDL_CreateTextureFromSurface(
    renderer,
    surface,
  ) as PointerValue<Texture>;
}

export function CreateWindow(
  title: string,
  x: i32,
  y: i32,
  w: i32,
  h: i32,
  flags: u32,
): PointerValue<Window> {
  return context.symbols.SDL_CreateWindow(
    toPlatformString(title),
    x,
    y,
    w,
    h,
    flags,
  ) as PointerValue<Window>;
}

export function CreateWindowAndRenderer(
  width: i32,
  height: i32,
  window_flags: u32,
  window: PointerTarget<Window>,
  renderer: PointerTarget<Renderer>,
): i32 {
  const windowDoublePointer = new BigUint64Array(1);
  const rendererDoublePointer = new BigUint64Array(1);

  const result = context.symbols.SDL_CreateWindowAndRenderer(
    width,
    height,
    window_flags,
    Memory.pointer(windowDoublePointer),
    Memory.pointer(rendererDoublePointer),
  ) as i32;

  setPointerTarget(window, windowDoublePointer[0]);
  setPointerTarget(renderer, rendererDoublePointer[0]);

  return result;
}

export function Delay(
  ms: u32,
): void {
  context.symbols.SDL_Delay(
    ms,
  );
}

export function DestroyRenderer(
  renderer: PointerValue<Renderer>,
): void {
  context.symbols.SDL_DestroyRenderer(
    renderer,
  );
}

export function DestroyTexture(
  texture: PointerValue<Texture>,
): void {
  context.symbols.SDL_DestroyTexture(
    texture,
  );
}

export function DestroyWindow(
  window: PointerValue<Window>,
): void {
  context.symbols.SDL_DestroyWindow(
    window,
  );
}

export function FillRect(
  dst: PointerValue<Surface>,
  rect: PointerValue<Rect> | null,
  color: u32,
): i32 {
  return context.symbols.SDL_FillRect(
    dst,
    rect ?? NULL_POINTER,
    color,
  ) as i32;
}

export function FreeSurface(
  surface: PointerValue<Surface>,
): void {
  context.symbols.SDL_FreeSurface(
    surface,
  );
}

export function GetError(): string {
  return fromPlatformString(context.symbols.SDL_GetError() as PointerValue<unknown>);
}

export function GetKeyboardState(
  numkeys: PointerValue<number> | null,
): PointerValue<u8[]> {
  return context.symbols.SDL_GetKeyboardState(
    numkeys ?? NULL_POINTER,
  ) as PointerValue<u8[]>;
}

export function GetRendererInfo(
  renderer: PointerValue<Renderer>,
  info: PointerValue<RendererInfo>,
): i32 {
  return context.symbols.SDL_GetRendererInfo(
    renderer,
    info,
  ) as i32;
}

export function GetScancodeFromKey(
  key: u32,
): u32 {
  return context.symbols.SDL_GetScancodeFromKey(
    key,
  ) as u32;
}

export function GetScancodeName(
  scancode: u32,
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

export function GetWindowSurface(
  window: PointerValue<Window>,
): PointerValue<Surface> {
  return context.symbols.SDL_GetWindowSurface(
    window,
  ) as PointerValue<Surface>;
}

export function Init(flags: number, libraryPath?: string): number {
  // TODO: Improve this logic.
  if (!libraryPath) {
    libraryPath = "libSDL2";
  }

  context.library = Deno.dlopen(libraryPath, symbols);
  context.symbols = context.library.symbols;

  return context.symbols.SDL_Init(flags) as number;
}

export function LoadBMP_RW(
  src: PointerValue<RWops>,
  freesrc: i32,
): PointerValue<Surface> {
  return context.symbols.SDL_LoadBMP_RW(
    src,
    freesrc,
  ) as PointerValue<Surface>;
}

export function LockSurface(
  surface: PointerValue<Surface>,
): i32 {
  return context.symbols.SDL_LockSurface(
    surface,
  ) as i32;
}

export function MapRGB(
  format: PointerValue<PixelFormat>,
  r: u8,
  g: u8,
  b: u8,
): u32 {
  return context.symbols.SDL_MapRGB(
    format,
    r,
    g,
    b,
  ) as u32;
}

export function MapRGBA(
  format: PointerValue<PixelFormat>,
  r: u8,
  g: u8,
  b: u8,
  a: u8,
): u32 {
  return context.symbols.SDL_MapRGBA(
    format,
    r,
    g,
    b,
    a,
  ) as u32;
}

export function MaximizeWindow(
  window: PointerValue<Window>,
): void {
  context.symbols.SDL_MaximizeWindow(
    window,
  );
}

export function MinimizeWindow(
  window: PointerValue<Window>,
): void {
  context.symbols.SDL_MinimizeWindow(
    window,
  );
}

export function PollEvent(
  event: PointerValue<Event>,
): i32 {
  return context.symbols.SDL_PollEvent(
    event,
  ) as i32;
}

export function Quit(): void {
  context.symbols.SDL_Quit();
  context.library.close();
}

export function RenderClear(
  renderer: PointerValue<Renderer>,
): i32 {
  return context.symbols.SDL_RenderClear(
    renderer,
  ) as i32;
}

export function RenderCopy(
  renderer: PointerValue<Renderer>,
  texture: PointerValue<Texture>,
  srcrect: PointerValue<Rect> | null,
  dstrect: PointerValue<Rect> | null,
): i32 {
  return context.symbols.SDL_RenderCopy(
    renderer,
    texture,
    srcrect ?? NULL_POINTER,
    dstrect ?? NULL_POINTER,
  ) as i32;
}

export function RenderCopyEx(
  renderer: PointerValue<Renderer>,
  texture: PointerValue<Texture>,
  srcrect: PointerValue<Rect>,
  dstrect: PointerValue<Rect>,
  angle: f64,
  center: PointerValue<Point>,
  flip: u32,
): i32 {
  return context.symbols.SDL_RenderCopyEx(
    renderer,
    texture,
    srcrect,
    dstrect,
    angle,
    center,
    flip,
  ) as i32;
}

export function RenderDrawLine(
  renderer: PointerValue<Renderer>,
  x1: i32,
  y1: i32,
  x2: i32,
  y2: i32,
): i32 {
  return context.symbols.SDL_RenderDrawLine(
    renderer,
    x1,
    y1,
    x2,
    y2,
  ) as i32;
}

export function RenderDrawLines(
  renderer: PointerValue<Renderer>,
  points: PointerValue<Point>,
  count: i32,
): i32 {
  return context.symbols.SDL_RenderDrawLines(
    renderer,
    points,
    count,
  ) as i32;
}

export function RenderDrawPoint(
  renderer: PointerValue<Renderer>,
  x: i32,
  y: i32,
): i32 {
  return context.symbols.SDL_RenderDrawPoint(
    renderer,
    x,
    y,
  ) as i32;
}

export function RenderDrawPoints(
  renderer: PointerValue<Renderer>,
  points: PointerLike<Point>,
  count: i32,
): i32 {
  return context.symbols.SDL_RenderDrawPoints(
    renderer,
    Pointer.of(points),
    count,
  ) as i32;
}

export function RenderDrawRect(
  renderer: PointerValue<Renderer>,
  rect: PointerValue<Rect>,
): i32 {
  return context.symbols.SDL_RenderDrawRect(
    renderer,
    rect,
  ) as i32;
}

export function RenderDrawRects(
  renderer: PointerValue<Renderer>,
  rects: PointerValue<Rect>,
  count: i32,
): i32 {
  return context.symbols.SDL_RenderDrawRects(
    renderer,
    rects,
    count,
  ) as i32;
}

export function RenderFillRect(
  renderer: PointerValue<Renderer>,
  rect: PointerValue<Rect>,
): i32 {
  return context.symbols.SDL_RenderFillRect(
    renderer,
    rect,
  ) as i32;
}

export function RenderFillRects(
  renderer: PointerValue<Renderer>,
  rects: PointerValue<Rect>,
  count: i32,
): i32 {
  return context.symbols.SDL_RenderFillRects(
    renderer,
    rects,
    count,
  ) as i32;
}

export function RenderFlush(
  renderer: PointerValue<Renderer>,
): i32 {
  return context.symbols.SDL_RenderFlush(
    renderer,
  ) as i32;
}

export function RenderPresent(
  renderer: PointerValue<Renderer>,
): void {
  context.symbols.SDL_RenderPresent(
    renderer,
  );
}

export function RestoreWindow(
  window: PointerValue<Window>,
): void {
  context.symbols.SDL_RestoreWindow(
    window,
  );
}

export function RWFromFile(
  file: string,
  mode: RWMode,
): PointerValue<RWops> {
  return context.symbols.SDL_RWFromFile(
    toPlatformString(file),
    toPlatformString(mode),
  ) as PointerValue<RWops>;
}

export function SetRenderDrawColor(
  renderer: PointerValue<Renderer>,
  r: u8,
  g: u8,
  b: u8,
  a: u8,
): i32 {
  return context.symbols.SDL_SetRenderDrawColor(
    renderer,
    r,
    g,
    b,
    a,
  ) as i32;
}

export function UnlockSurface(
  surface: PointerValue<Surface>,
): void {
  context.symbols.SDL_UnlockSurface(
    surface,
  );
}

export function UpdateWindowSurface(
  window: PointerValue<Window>,
): i32 {
  return context.symbols.SDL_UpdateWindowSurface(
    window,
  ) as i32;
}
