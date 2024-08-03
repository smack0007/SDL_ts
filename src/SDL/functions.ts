// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { Box } from "../boxes.ts";
import { DynamicLibrary } from "../_library.ts";
import { PlatformPointer } from "../_types.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { f32, f64, i32, InitOptions, int, TypedArray, u16, u32, u64, u8 } from "../types.ts";
import { callbacks } from "./_callbacks.ts";
import { getSymbolsFromFunctions } from "../_init.ts";
import { symbols } from "./_symbols.ts";

import { AudioCallback, EventFilter } from "./callbacks.ts";
import {
  ArrayOrder,
  BitmapOrder,
  BlendFactor,
  BlendMode,
  BlendOperation,
  EventType,
  FlashOperation,
  InitFlags,
  Keycode,
  PackedLayout,
  PackedOrder,
  PixelType,
  RendererFlags,
  RendererFlip,
  ScaleMode,
  Scancode,
  SYSWM_TYPE,
  TextureAccess,
  TextureModulate,
  WindowEventID,
  WindowFlags,
  WindowPos,
} from "./enums.ts";
import {
  AudioSpec,
  Color,
  DisplayMode,
  Keysym,
  Palette,
  PixelFormat,
  Point,
  Rect,
  Renderer,
  RendererInfo,
  RWops,
  Surface,
  SysWMinfo,
  Texture,
  version,
  Window,
} from "./structs.ts";

import { AudioDeviceID } from "./audio.ts";
import { Event } from "./events.ts";
import { RWMode } from "./rw.ts";

let _library: DynamicLibrary<typeof symbols> = null!;

export function AddEventWatch(
  filter: EventFilter,
  userdata: PointerLike<unknown> | null,
): void {
  _library.symbols.SDL_AddEventWatch(
    Platform.toPlatformCallback(filter, callbacks["SDL_EventFilter"]),
    Platform.toPlatformPointer(Pointer.of(userdata)),
  );
}
AddEventWatch.symbolName = "SDL_AddEventWatch";

// TODO: Doesn't seem to be supported yet perhaps due to background thread?
// SDL_AddTimer

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
BlitScaled.symbolName = "SDL_UpperBlitScaled";

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
BlitSurface.symbolName = "SDL_UpperBlit";

export function CloseAudioDevice(
  dev: AudioDeviceID,
): void {
  _library.symbols.SDL_CloseAudioDevice(
    dev,
  );
}
CloseAudioDevice.symbolName = "SDL_CloseAudioDevice";

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
  pixels: PointerLike<unknown>,
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
    Platform.toPlatformPointer(Pointer.of(pixels)),
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

export function CreateWindowFrom(
  data: PointerLike<unknown>,
): Window | null {
  return Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateWindowFrom(
    Platform.toPlatformPointer(Pointer.of(data)),
  ) as PlatformPointer<Window>));
}
CreateWindowFrom.symbolName = "SDL_CreateWindowFrom";

export function Delay(
  ms: u32,
): void {
  _library.symbols.SDL_Delay(
    ms,
  );
}
Delay.symbolName = "SDL_Delay";

export function DelEventWatch(
  filter: EventFilter,
  userdata: PointerLike<unknown> | null,
): void {
  _library.symbols.SDL_DelEventWatch(
    Platform.toPlatformCallback(filter, callbacks["SDL_EventFilter"]),
    Platform.toPlatformPointer(Pointer.of(userdata)),
  );
}
DelEventWatch.symbolName = "SDL_DelEventWatch";

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

export function DestroyWindowSurface(
  window: PointerLike<Window>,
): i32 {
  return _library.symbols.SDL_DestroyWindowSurface(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as i32;
}
DestroyWindowSurface.symbolName = "SDL_DestroyWindowSurface";

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

export function FlashWindow(
  window: PointerLike<Window>,
  operation: FlashOperation,
): i32 {
  return _library.symbols.SDL_FlashWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
    operation,
  ) as i32;
}
FlashWindow.symbolName = "SDL_FlashWindow";

export function FreeWAV(
  audio_buf: PointerLike<u8>,
): void {
  _library.symbols.SDL_FreeWAV(
    Platform.toPlatformPointer(Pointer.of(audio_buf)),
  );
}
FreeWAV.symbolName = "SDL_FreeWAV";

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

export function GetGrabbedWindow(): Window | null {
  return Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_GetGrabbedWindow() as PlatformPointer<Window>));
}
GetGrabbedWindow.symbolName = "SDL_GetGrabbedWindow";

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

// TODO: SDL_WindowShapeMode is a struct and WindowShapeMode is an enum. Figure out how to fix the name collision.
// SDL_GetShapedWindowMode

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

export function GetWindowBordersSize(
  window: PointerLike<Window>,
  top: PointerLike<int>,
  left: PointerLike<int>,
  bottom: PointerLike<int>,
  right: PointerLike<int>,
): i32 {
  return _library.symbols.SDL_GetWindowBordersSize(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(top)),
    Platform.toPlatformPointer(Pointer.of(left)),
    Platform.toPlatformPointer(Pointer.of(bottom)),
    Platform.toPlatformPointer(Pointer.of(right)),
  ) as i32;
}
GetWindowBordersSize.symbolName = "SDL_GetWindowBordersSize";

export function GetWindowBrightness(
  window: PointerLike<Window>,
): f32 {
  return _library.symbols.SDL_GetWindowBrightness(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as f32;
}
GetWindowBrightness.symbolName = "SDL_GetWindowBrightness";

export function GetWindowData(
  window: PointerLike<Window>,
  name: string,
): Pointer<unknown> {
  return Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowData(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformString(name),
  ) as PlatformPointer<unknown>)!;
}
GetWindowData.symbolName = "SDL_GetWindowData";

export function GetWindowDisplayIndex(
  window: PointerLike<Window>,
): i32 {
  return _library.symbols.SDL_GetWindowDisplayIndex(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as i32;
}
GetWindowDisplayIndex.symbolName = "SDL_GetWindowDisplayIndex";

export function GetWindowDisplayMode(
  window: PointerLike<Window>,
  mode: PointerLike<DisplayMode>,
): i32 {
  return _library.symbols.SDL_GetWindowDisplayMode(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(mode)),
  ) as i32;
}
GetWindowDisplayMode.symbolName = "SDL_GetWindowDisplayMode";

export function GetWindowFlags(
  window: PointerLike<Window>,
): u32 {
  return _library.symbols.SDL_GetWindowFlags(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as u32;
}
GetWindowFlags.symbolName = "SDL_GetWindowFlags";

export function GetWindowFromID(
  id: u32,
): Window | null {
  return Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowFromID(
    id,
  ) as PlatformPointer<Window>));
}
GetWindowFromID.symbolName = "SDL_GetWindowFromID";

export function GetWindowGammaRamp(
  window: PointerLike<Window>,
  red: PointerLike<u16>,
  green: PointerLike<u16>,
  blue: PointerLike<u16>,
): i32 {
  return _library.symbols.SDL_GetWindowGammaRamp(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(red)),
    Platform.toPlatformPointer(Pointer.of(green)),
    Platform.toPlatformPointer(Pointer.of(blue)),
  ) as i32;
}
GetWindowGammaRamp.symbolName = "SDL_GetWindowGammaRamp";

export function GetWindowGrab(
  window: PointerLike<Window>,
): boolean {
  return _library.symbols.SDL_GetWindowGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
}
GetWindowGrab.symbolName = "SDL_GetWindowGrab";

export function GetWindowICCProfile(
  window: PointerLike<Window>,
  size: PointerLike<int>,
): Pointer<unknown> {
  return Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowICCProfile(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(size)),
  ) as PlatformPointer<unknown>)!;
}
GetWindowICCProfile.symbolName = "SDL_GetWindowICCProfile";

export function GetWindowID(
  window: PointerLike<Window>,
): u32 {
  return _library.symbols.SDL_GetWindowID(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as u32;
}
GetWindowID.symbolName = "SDL_GetWindowID";

export function GetWindowKeyboardGrab(
  window: PointerLike<Window>,
): boolean {
  return _library.symbols.SDL_GetWindowKeyboardGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
}
GetWindowKeyboardGrab.symbolName = "SDL_GetWindowKeyboardGrab";

export function GetWindowMaximumSize(
  window: PointerLike<Window>,
  w: PointerLike<int>,
  h: PointerLike<int>,
): void {
  _library.symbols.SDL_GetWindowMaximumSize(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  );
}
GetWindowMaximumSize.symbolName = "SDL_GetWindowMaximumSize";

export function GetWindowMinimumSize(
  window: PointerLike<Window>,
  w: PointerLike<int>,
  h: PointerLike<int>,
): void {
  _library.symbols.SDL_GetWindowMinimumSize(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  );
}
GetWindowMinimumSize.symbolName = "SDL_GetWindowMinimumSize";

export function GetWindowMouseGrab(
  window: PointerLike<Window>,
): boolean {
  return _library.symbols.SDL_GetWindowMouseGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
}
GetWindowMouseGrab.symbolName = "SDL_GetWindowMouseGrab";

export function GetWindowMouseRect(
  window: PointerLike<Window>,
): Rect | null {
  return Rect.of(Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowMouseRect(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as PlatformPointer<Rect>));
}
GetWindowMouseRect.symbolName = "SDL_GetWindowMouseRect";

export function GetWindowOpacity(
  window: PointerLike<Window>,
  out_opacity: PointerLike<f32>,
): i32 {
  return _library.symbols.SDL_GetWindowOpacity(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(out_opacity)),
  ) as i32;
}
GetWindowOpacity.symbolName = "SDL_GetWindowOpacity";

export function GetWindowPixelFormat(
  window: PointerLike<Window>,
): u32 {
  return _library.symbols.SDL_GetWindowPixelFormat(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as u32;
}
GetWindowPixelFormat.symbolName = "SDL_GetWindowPixelFormat";

export function GetWindowPosition(
  window: PointerLike<Window>,
  x: PointerLike<int>,
  y: PointerLike<int>,
): void {
  _library.symbols.SDL_GetWindowPosition(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(x)),
    Platform.toPlatformPointer(Pointer.of(y)),
  );
}
GetWindowPosition.symbolName = "SDL_GetWindowPosition";

export function GetWindowSize(
  window: PointerLike<Window>,
  w: PointerLike<int>,
  h: PointerLike<int>,
): void {
  _library.symbols.SDL_GetWindowSize(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  );
}
GetWindowSize.symbolName = "SDL_GetWindowSize";

export function GetWindowSizeInPixels(
  window: PointerLike<Window>,
  w: PointerLike<int>,
  h: PointerLike<int>,
): void {
  _library.symbols.SDL_GetWindowSizeInPixels(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  );
}
GetWindowSizeInPixels.symbolName = "SDL_GetWindowSizeInPixels";

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

export function GetWindowWMInfo(
  window: PointerLike<Window>,
  info: PointerLike<SysWMinfo>,
): boolean {
  return _library.symbols.SDL_GetWindowWMInfo(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(info)),
  ) as boolean;
}
GetWindowWMInfo.symbolName = "SDL_GetWindowWMInfo";

export function HasColorKey(
  surface: PointerLike<Surface>,
): boolean {
  return _library.symbols.SDL_HasColorKey(
    Platform.toPlatformPointer(Pointer.of(surface)),
  ) as boolean;
}
HasColorKey.symbolName = "SDL_HasColorKey";

export function HasIntersection(
  A: PointerLike<Rect>,
  B: PointerLike<Rect>,
): boolean {
  return _library.symbols.SDL_HasIntersection(
    Platform.toPlatformPointer(Pointer.of(A)),
    Platform.toPlatformPointer(Pointer.of(B)),
  ) as boolean;
}
HasIntersection.symbolName = "SDL_HasIntersection";

export function HasWindowSurface(
  window: PointerLike<Window>,
): boolean {
  return _library.symbols.SDL_HasWindowSurface(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
}
HasWindowSurface.symbolName = "SDL_HasWindowSurface";

export function HideWindow(
  window: PointerLike<Window>,
): void {
  _library.symbols.SDL_HideWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  );
}
HideWindow.symbolName = "SDL_HideWindow";

export function Init(flags: InitFlags, options?: InitOptions): number;
export function Init(flags: number, options?: InitOptions): number;
export function Init(flags: InitFlags | number, options?: InitOptions): number {
  const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
  _library = Platform.loadLibrary("SDL2", symbolsToLoad, options?.libraryPath);
  return _library.symbols.SDL_Init(flags) as number;
}
Init.symbolName = "SDL_Init";

export function IntersectRect(
  A: PointerLike<Rect>,
  B: PointerLike<Rect>,
  result: PointerLike<Rect>,
): boolean {
  return _library.symbols.SDL_IntersectRect(
    Platform.toPlatformPointer(Pointer.of(A)),
    Platform.toPlatformPointer(Pointer.of(B)),
    Platform.toPlatformPointer(Pointer.of(result)),
  ) as boolean;
}
IntersectRect.symbolName = "SDL_IntersectRect";

export function IsShapedWindow(
  window: PointerLike<Window>,
): boolean {
  return _library.symbols.SDL_IsShapedWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
}
IsShapedWindow.symbolName = "SDL_IsShapedWindow";

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

export function LoadWAV_RW(
  src: PointerLike<RWops>,
  freesrc: i32,
  spec: PointerLike<AudioSpec>,
  audio_buf: Box<Pointer<u8>>,
  audio_len: PointerLike<u32>,
): AudioSpec | null {
  return AudioSpec.of(Platform.fromPlatformPointer(_library.symbols.SDL_LoadWAV_RW(
    Platform.toPlatformPointer(Pointer.of(src)),
    freesrc,
    Platform.toPlatformPointer(Pointer.of(spec)),
    Platform.toPlatformPointer(Pointer.ofTypedArray(audio_buf._data)),
    Platform.toPlatformPointer(Pointer.of(audio_len)),
  ) as PlatformPointer<AudioSpec>));
}
LoadWAV_RW.symbolName = "SDL_LoadWAV_RW";

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

export function OpenAudioDevice(
  device: string | null,
  iscapture: i32,
  desired: PointerLike<AudioSpec>,
  obtained: PointerLike<AudioSpec> | null,
  allowed_changes: i32,
): AudioDeviceID {
  return _library.symbols.SDL_OpenAudioDevice(
    Platform.toPlatformString(device),
    iscapture,
    Platform.toPlatformPointer(Pointer.of(desired)),
    Platform.toPlatformPointer(Pointer.of(obtained)),
    allowed_changes,
  ) as AudioDeviceID;
}
OpenAudioDevice.symbolName = "SDL_OpenAudioDevice";

export function PauseAudioDevice(
  dev: AudioDeviceID,
  pause_on: i32,
): void {
  _library.symbols.SDL_PauseAudioDevice(
    dev,
    pause_on,
  );
}
PauseAudioDevice.symbolName = "SDL_PauseAudioDevice";

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

export function QueueAudio(
  dev: AudioDeviceID,
  data: PointerLike<unknown>,
  len: u32,
): i32 {
  return _library.symbols.SDL_QueueAudio(
    dev,
    Platform.toPlatformPointer(Pointer.of(data)),
    len,
  ) as i32;
}
QueueAudio.symbolName = "SDL_QueueAudio";

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

export function RaiseWindow(
  window: PointerLike<Window>,
): void {
  _library.symbols.SDL_RaiseWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  );
}
RaiseWindow.symbolName = "SDL_RaiseWindow";

// TODO: Doesn't seem to be supported yet perhaps due to background thread?
// SDL_RemoveTimer

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

export function RenderGetWindow(
  renderer: PointerLike<Renderer>,
): Window | null {
  return Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_RenderGetWindow(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  ) as PlatformPointer<Window>));
}
RenderGetWindow.symbolName = "SDL_RenderGetWindow";

export function RenderSetLogicalSize(
  renderer: PointerLike<Renderer>,
  width: i32,
  height: i32,
): i32 {
  return _library.symbols.SDL_RenderSetLogicalSize(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    width,
    height,
  ) as i32;
}
RenderSetLogicalSize.symbolName = "SDL_RenderSetLogicalSize";

export function RenderLogicalToWindow(
  renderer: PointerLike<Renderer>,
  logicalX: f32,
  logicalY: f32,
  windowX: PointerLike<int>,
  windowY: PointerLike<int>,
): void {
  _library.symbols.SDL_RenderLogicalToWindow(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    logicalX,
    logicalY,
    Platform.toPlatformPointer(Pointer.of(windowX)),
    Platform.toPlatformPointer(Pointer.of(windowY)),
  );
}
RenderLogicalToWindow.symbolName = "SDL_RenderLogicalToWindow";

export function RenderPresent(
  renderer: PointerLike<Renderer>,
): void {
  _library.symbols.SDL_RenderPresent(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  );
}
RenderPresent.symbolName = "SDL_RenderPresent";

export function RenderWindowToLogical(
  renderer: PointerLike<Renderer>,
  windowX: i32,
  windowY: i32,
  logicalX: PointerLike<f32>,
  logicalY: PointerLike<f32>,
): void {
  _library.symbols.SDL_RenderWindowToLogical(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    windowX,
    windowY,
    Platform.toPlatformPointer(Pointer.of(logicalX)),
    Platform.toPlatformPointer(Pointer.of(logicalY)),
  );
}
RenderWindowToLogical.symbolName = "SDL_RenderWindowToLogical";

export function RestoreWindow(
  window: PointerLike<Window>,
): void {
  _library.symbols.SDL_RestoreWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  );
}
RestoreWindow.symbolName = "SDL_RestoreWindow";

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

export function SetWindowAlwaysOnTop(
  window: PointerLike<Window>,
  on_top: boolean,
): void {
  _library.symbols.SDL_SetWindowAlwaysOnTop(
    Platform.toPlatformPointer(Pointer.of(window)),
    on_top,
  );
}
SetWindowAlwaysOnTop.symbolName = "SDL_SetWindowAlwaysOnTop";

export function SetWindowBordered(
  window: PointerLike<Window>,
  bordered: boolean,
): void {
  _library.symbols.SDL_SetWindowBordered(
    Platform.toPlatformPointer(Pointer.of(window)),
    bordered,
  );
}
SetWindowBordered.symbolName = "SDL_SetWindowBordered";

export function SetWindowBrightness(
  window: PointerLike<Window>,
  brightness: f32,
): i32 {
  return _library.symbols.SDL_SetWindowBrightness(
    Platform.toPlatformPointer(Pointer.of(window)),
    brightness,
  ) as i32;
}
SetWindowBrightness.symbolName = "SDL_SetWindowBrightness";

export function SetWindowData(
  window: PointerLike<Window>,
  name: string,
  userdata: PointerLike<unknown>,
): Pointer<unknown> {
  return Platform.fromPlatformPointer(_library.symbols.SDL_SetWindowData(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformString(name),
    Platform.toPlatformPointer(Pointer.of(userdata)),
  ) as PlatformPointer<unknown>)!;
}
SetWindowData.symbolName = "SDL_SetWindowData";

export function SetWindowDisplayMode(
  window: PointerLike<Window>,
  mode: PointerLike<DisplayMode>,
): i32 {
  return _library.symbols.SDL_SetWindowDisplayMode(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(mode)),
  ) as i32;
}
SetWindowDisplayMode.symbolName = "SDL_SetWindowDisplayMode";

export function SetWindowFullscreen(
  window: PointerLike<Window>,
  flags: u32,
): i32 {
  return _library.symbols.SDL_SetWindowFullscreen(
    Platform.toPlatformPointer(Pointer.of(window)),
    flags,
  ) as i32;
}
SetWindowFullscreen.symbolName = "SDL_SetWindowFullscreen";

export function SetWindowGammaRamp(
  window: PointerLike<Window>,
  red: PointerLike<u16>,
  green: PointerLike<u16>,
  blue: PointerLike<u16>,
): i32 {
  return _library.symbols.SDL_SetWindowGammaRamp(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(red)),
    Platform.toPlatformPointer(Pointer.of(green)),
    Platform.toPlatformPointer(Pointer.of(blue)),
  ) as i32;
}
SetWindowGammaRamp.symbolName = "SDL_SetWindowGammaRamp";

export function SetWindowGrab(
  window: PointerLike<Window>,
  grabbed: boolean,
): void {
  _library.symbols.SDL_SetWindowGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
    grabbed,
  );
}
SetWindowGrab.symbolName = "SDL_SetWindowGrab";

// TODO: Implement callbacks
// SDL_SetWindowHitTest

export function SetWindowIcon(
  window: PointerLike<Window>,
  icon: PointerLike<Surface>,
): void {
  _library.symbols.SDL_SetWindowIcon(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(icon)),
  );
}
SetWindowIcon.symbolName = "SDL_SetWindowIcon";

export function SetWindowInputFocus(
  window: PointerLike<Window>,
): i32 {
  return _library.symbols.SDL_SetWindowInputFocus(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as i32;
}
SetWindowInputFocus.symbolName = "SDL_SetWindowInputFocus";

export function SetWindowKeyboardGrab(
  window: PointerLike<Window>,
  grabbed: boolean,
): void {
  _library.symbols.SDL_SetWindowKeyboardGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
    grabbed,
  );
}
SetWindowKeyboardGrab.symbolName = "SDL_SetWindowKeyboardGrab";

export function SetWindowMaximumSize(
  window: PointerLike<Window>,
  max_w: i32,
  max_h: i32,
): void {
  _library.symbols.SDL_SetWindowMaximumSize(
    Platform.toPlatformPointer(Pointer.of(window)),
    max_w,
    max_h,
  );
}
SetWindowMaximumSize.symbolName = "SDL_SetWindowMaximumSize";

export function SetWindowMinimumSize(
  window: PointerLike<Window>,
  min_w: i32,
  min_h: i32,
): void {
  _library.symbols.SDL_SetWindowMinimumSize(
    Platform.toPlatformPointer(Pointer.of(window)),
    min_w,
    min_h,
  );
}
SetWindowMinimumSize.symbolName = "SDL_SetWindowMinimumSize";

export function SetWindowModalFor(
  modal_window: PointerLike<Window>,
  parent_window: PointerLike<Window>,
): i32 {
  return _library.symbols.SDL_SetWindowModalFor(
    Platform.toPlatformPointer(Pointer.of(modal_window)),
    Platform.toPlatformPointer(Pointer.of(parent_window)),
  ) as i32;
}
SetWindowModalFor.symbolName = "SDL_SetWindowModalFor";

export function SetWindowMouseGrab(
  window: PointerLike<Window>,
  grabbed: boolean,
): void {
  _library.symbols.SDL_SetWindowMouseGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
    grabbed,
  );
}
SetWindowMouseGrab.symbolName = "SDL_SetWindowMouseGrab";

export function SetWindowMouseRect(
  window: PointerLike<Window>,
  rect: PointerLike<Rect>,
): i32 {
  return _library.symbols.SDL_SetWindowMouseRect(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(rect)),
  ) as i32;
}
SetWindowMouseRect.symbolName = "SDL_SetWindowMouseRect";

export function SetWindowOpacity(
  window: PointerLike<Window>,
  opacity: f32,
): i32 {
  return _library.symbols.SDL_SetWindowOpacity(
    Platform.toPlatformPointer(Pointer.of(window)),
    opacity,
  ) as i32;
}
SetWindowOpacity.symbolName = "SDL_SetWindowOpacity";

export function SetWindowPosition(
  window: PointerLike<Window>,
  x: i32,
  y: i32,
): void {
  _library.symbols.SDL_SetWindowPosition(
    Platform.toPlatformPointer(Pointer.of(window)),
    x,
    y,
  );
}
SetWindowPosition.symbolName = "SDL_SetWindowPosition";

export function SetWindowResizable(
  window: PointerLike<Window>,
  resizable: boolean,
): void {
  _library.symbols.SDL_SetWindowResizable(
    Platform.toPlatformPointer(Pointer.of(window)),
    resizable,
  );
}
SetWindowResizable.symbolName = "SDL_SetWindowResizable";

// TODO: SDL_WindowShapeMode is a struct and WindowShapeMode is an enum. Figure out how to fix the name collision.
// SDL_SetWindowShape

export function SetWindowSize(
  window: PointerLike<Window>,
  w: i32,
  h: i32,
): void {
  _library.symbols.SDL_SetWindowSize(
    Platform.toPlatformPointer(Pointer.of(window)),
    w,
    h,
  );
}
SetWindowSize.symbolName = "SDL_SetWindowSize";

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

// TODO: Implement callbacks
// SDL_SetWindowsMessageHook

export function ShowWindow(
  window: PointerLike<Window>,
): void {
  _library.symbols.SDL_ShowWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  );
}
ShowWindow.symbolName = "SDL_ShowWindow";

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

export function UpdateWindowSurfaceRects(
  window: PointerLike<Window>,
  rects: PointerLike<Rect>,
  numrects: i32,
): i32 {
  return _library.symbols.SDL_UpdateWindowSurfaceRects(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(rects)),
    numrects,
  ) as i32;
}
UpdateWindowSurfaceRects.symbolName = "SDL_UpdateWindowSurfaceRects";

export function WaitEvent(
  event: PointerLike<Event>,
): i32 {
  return _library.symbols.SDL_WaitEvent(
    Platform.toPlatformPointer(Pointer.of(event)),
  ) as i32;
}
WaitEvent.symbolName = "SDL_WaitEvent";

export function WaitEventTimeout(
  event: PointerLike<Event>,
  timeout: i32,
): i32 {
  return _library.symbols.SDL_WaitEventTimeout(
    Platform.toPlatformPointer(Pointer.of(event)),
    timeout,
  ) as i32;
}
WaitEventTimeout.symbolName = "SDL_WaitEventTimeout";

export function WarpMouseInWindow(
  window: PointerLike<Window>,
  x: i32,
  y: i32,
): void {
  _library.symbols.SDL_WarpMouseInWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
    x,
    y,
  );
}
WarpMouseInWindow.symbolName = "SDL_WarpMouseInWindow";
