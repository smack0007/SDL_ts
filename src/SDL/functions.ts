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
): int {
  const _result = _library.symbols.SDL_UpperBlitScaled(
    Platform.toPlatformPointer(Pointer.of(src)),
    Platform.toPlatformPointer(Pointer.of(srcrect)),
    Platform.toPlatformPointer(Pointer.of(dst)),
    Platform.toPlatformPointer(Pointer.of(dstrect)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
BlitScaled.symbolName = "SDL_UpperBlitScaled";

export function BlitSurface(
  src: PointerLike<Surface>,
  srcrect: PointerLike<Rect> | null,
  dst: PointerLike<Surface>,
  dstrect: PointerLike<Rect> | null,
): int {
  const _result = _library.symbols.SDL_UpperBlit(
    Platform.toPlatformPointer(Pointer.of(src)),
    Platform.toPlatformPointer(Pointer.of(srcrect)),
    Platform.toPlatformPointer(Pointer.of(dst)),
    Platform.toPlatformPointer(Pointer.of(dstrect)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
BlitSurface.symbolName = "SDL_UpperBlit";

export function CloseAudioDevice(
  dev: Uint32,
): void {
  _library.symbols.SDL_CloseAudioDevice(
    dev,
  );
}
CloseAudioDevice.symbolName = "SDL_CloseAudioDevice";

export function ConvertSurface(
  src: PointerLike<Surface>,
  fmt: PointerLike<PixelFormat>,
  flags: Uint32,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_ConvertSurface(
    Platform.toPlatformPointer(Pointer.of(src)),
    Platform.toPlatformPointer(Pointer.of(fmt)),
    flags,
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
ConvertSurface.symbolName = "SDL_ConvertSurface";

export function CreateRGBSurface(
  flags: Uint32,
  width: int,
  height: int,
  depth: int,
  Rmask: Uint32,
  Gmask: Uint32,
  Bmask: Uint32,
  Amask: Uint32,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateRGBSurface(
    flags,
    width,
    height,
    depth,
    Rmask,
    Gmask,
    Bmask,
    Amask,
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
CreateRGBSurface.symbolName = "SDL_CreateRGBSurface";

export function CreateRGBSurfaceFrom(
  pixels: PointerLike<unknown>,
  width: int,
  height: int,
  depth: int,
  pitch: int,
  Rmask: Uint32,
  Gmask: Uint32,
  Bmask: Uint32,
  Amask: Uint32,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateRGBSurfaceFrom(
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
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
CreateRGBSurfaceFrom.symbolName = "SDL_CreateRGBSurfaceFrom";

export function CreateRGBSurfaceWithFormat(
  flags: Uint32,
  width: int,
  height: int,
  depth: int,
  format: Uint32,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateRGBSurfaceWithFormat(
    flags,
    width,
    height,
    depth,
    format,
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
CreateRGBSurfaceWithFormat.symbolName = "SDL_CreateRGBSurfaceWithFormat";

export function CreateRenderer(
  window: PointerLike<Window>,
  index: int,
  flags: Uint32,
): Renderer {
  const _result = Renderer.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateRenderer(
    Platform.toPlatformPointer(Pointer.of(window)),
    index,
    flags,
  ) as PlatformPointer<Renderer>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
CreateRenderer.symbolName = "SDL_CreateRenderer";

export function CreateTexture(
  renderer: PointerLike<Renderer>,
  format: Uint32,
  access: int,
  w: int,
  h: int,
): Texture {
  const _result = Texture.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateTexture(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    format,
    access,
    w,
    h,
  ) as PlatformPointer<Texture>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
CreateTexture.symbolName = "SDL_CreateTexture";

export function CreateTextureFromSurface(
  renderer: PointerLike<Renderer>,
  surface: PointerLike<Surface>,
): Texture {
  const _result = Texture.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateTextureFromSurface(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(surface)),
  ) as PlatformPointer<Texture>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
CreateTextureFromSurface.symbolName = "SDL_CreateTextureFromSurface";

export function CreateWindow(
  title: string,
  x: WindowPos,
  y: WindowPos,
  w: int,
  h: int,
  flags: WindowFlags,
): Window;
export function CreateWindow(
  title: string,
  x: int,
  y: int,
  w: int,
  h: int,
  flags: WindowFlags,
): Window;
export function CreateWindow(
  title: string,
  x: WindowPos | int,
  y: WindowPos | int,
  w: int,
  h: int,
  flags: WindowFlags,
): Window {
  const _result = Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateWindow(
    Platform.toPlatformString(title),
    x,
    y,
    w,
    h,
    flags,
  ) as PlatformPointer<Window>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
CreateWindow.symbolName = "SDL_CreateWindow";

export function CreateWindowAndRenderer(
  width: int,
  height: int,
  window_flags: WindowFlags,
): [Pointer<Window>, Pointer<Renderer>] {
  const window = new Box<Pointer<Window>>(Pointer);
  const renderer = new Box<Pointer<Renderer>>(Pointer);
  const _result = _library.symbols.SDL_CreateWindowAndRenderer(
    width,
    height,
    window_flags,
    Platform.toPlatformPointer(Pointer.ofTypedArray(window._data)),
    Platform.toPlatformPointer(Pointer.ofTypedArray(renderer._data)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return [window.value, renderer.value];
}
CreateWindowAndRenderer.symbolName = "SDL_CreateWindowAndRenderer";

export function CreateWindowFrom(
  data: PointerLike<unknown>,
): Window {
  const _result = Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_CreateWindowFrom(
    Platform.toPlatformPointer(Pointer.of(data)),
  ) as PlatformPointer<Window>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
CreateWindowFrom.symbolName = "SDL_CreateWindowFrom";

export function Delay(
  ms: Uint32,
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
): int {
  const _result = _library.symbols.SDL_DestroyWindowSurface(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as int;
  return _result;
}
DestroyWindowSurface.symbolName = "SDL_DestroyWindowSurface";

export function FillRect(
  dst: PointerLike<Surface>,
  rect: PointerLike<Rect> | null,
  color: Uint32,
): int {
  const _result = _library.symbols.SDL_FillRect(
    Platform.toPlatformPointer(Pointer.of(dst)),
    Platform.toPlatformPointer(Pointer.of(rect)),
    color,
  ) as int;
  return _result;
}
FillRect.symbolName = "SDL_FillRect";

export function FlashWindow(
  window: PointerLike<Window>,
  operation: FlashOperation,
): int {
  const _result = _library.symbols.SDL_FlashWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
    operation,
  ) as int;
  return _result;
}
FlashWindow.symbolName = "SDL_FlashWindow";

export function FreeWAV(
  audio_buf: PointerLike<Uint8>,
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
  key: PointerLike<Uint32>,
): int {
  const _result = _library.symbols.SDL_GetColorKey(
    Platform.toPlatformPointer(Pointer.of(surface)),
    Platform.toPlatformPointer(Pointer.of(key)),
  ) as int;
  return _result;
}
GetColorKey.symbolName = "SDL_GetColorKey";

export function GetError(): string {
  const _result = Platform.fromPlatformString(_library.symbols.SDL_GetError() as PlatformPointer<unknown>);
  return _result;
}
GetError.symbolName = "SDL_GetError";

export function GetGrabbedWindow(): Window | null {
  const _result = Window.of(
    Platform.fromPlatformPointer(_library.symbols.SDL_GetGrabbedWindow() as PlatformPointer<Window>),
  );
  return _result;
}
GetGrabbedWindow.symbolName = "SDL_GetGrabbedWindow";

export function GetKeyboardState(): Uint8Array {
  const numkeys = new Box<int>(int);
  const _result = Platform.fromPlatformPointer(
    _library.symbols.SDL_GetKeyboardState(
      Platform.toPlatformPointer(Pointer.of(numkeys)),
    ) as PlatformPointer<Uint8>,
  )!;
  const dataView = new Platform.DataView(_result);
  return new Uint8Array(dataView.getArrayBuffer(numkeys.value, 0));
}
GetKeyboardState.symbolName = "SDL_GetKeyboardState";

export function GetRendererInfo(
  renderer: PointerLike<Renderer>,
): RendererInfo {
  const info = new RendererInfo();
  const _result = _library.symbols.SDL_GetRendererInfo(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(info)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return info;
}
GetRendererInfo.symbolName = "SDL_GetRendererInfo";

export function GetRevision(): string {
  const _result = Platform.fromPlatformString(_library.symbols.SDL_GetRevision() as PlatformPointer<unknown>);
  return _result;
}
GetRevision.symbolName = "SDL_GetRevision";

export function GetScancodeFromKey(
  key: Keycode,
): Scancode {
  const _result = _library.symbols.SDL_GetScancodeFromKey(
    key,
  ) as Scancode;
  return _result;
}
GetScancodeFromKey.symbolName = "SDL_GetScancodeFromKey";

export function GetScancodeName(
  scancode: Scancode,
): string {
  const _result = Platform.fromPlatformString(_library.symbols.SDL_GetScancodeName(
    scancode,
  ) as PlatformPointer<unknown>);
  return _result;
}
GetScancodeName.symbolName = "SDL_GetScancodeName";

// TODO: SDL_WindowShapeMode is a struct and WindowShapeMode is an enum. Figure out how to fix the name collision.
// SDL_GetShapedWindowMode

export function GetSystemRAM(): int {
  const _result = _library.symbols.SDL_GetSystemRAM() as int;
  return _result;
}
GetSystemRAM.symbolName = "SDL_GetSystemRAM";

export function GetTextureAlphaMod(
  texture: PointerLike<Texture>,
  alpha: PointerLike<Uint8>,
): int {
  const _result = _library.symbols.SDL_GetTextureAlphaMod(
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(alpha)),
  ) as int;
  return _result;
}
GetTextureAlphaMod.symbolName = "SDL_GetTextureAlphaMod";

export function GetTextureBlendMode(
  texture: PointerLike<Texture>,
  blendMode: PointerLike<BlendMode>,
): int {
  const _result = _library.symbols.SDL_GetTextureBlendMode(
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(blendMode)),
  ) as int;
  return _result;
}
GetTextureBlendMode.symbolName = "SDL_GetTextureBlendMode";

export function GetTextureColorMod(
  texture: PointerLike<Texture>,
  r: PointerLike<Uint8>,
  g: PointerLike<Uint8>,
  b: PointerLike<Uint8>,
): int {
  const _result = _library.symbols.SDL_GetTextureColorMod(
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(r)),
    Platform.toPlatformPointer(Pointer.of(g)),
    Platform.toPlatformPointer(Pointer.of(b)),
  ) as int;
  return _result;
}
GetTextureColorMod.symbolName = "SDL_GetTextureColorMod";

export function GetTicks(): Uint32 {
  const _result = _library.symbols.SDL_GetTicks() as Uint32;
  return _result;
}
GetTicks.symbolName = "SDL_GetTicks";

export function GetTicks64(): Uint64 {
  const _result = BigInt(_library.symbols.SDL_GetTicks64() as bigint | number);
  return _result;
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
): int {
  const _result = _library.symbols.SDL_GetWindowBordersSize(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(top)),
    Platform.toPlatformPointer(Pointer.of(left)),
    Platform.toPlatformPointer(Pointer.of(bottom)),
    Platform.toPlatformPointer(Pointer.of(right)),
  ) as int;
  return _result;
}
GetWindowBordersSize.symbolName = "SDL_GetWindowBordersSize";

export function GetWindowBrightness(
  window: PointerLike<Window>,
): float {
  const _result = _library.symbols.SDL_GetWindowBrightness(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as float;
  return _result;
}
GetWindowBrightness.symbolName = "SDL_GetWindowBrightness";

export function GetWindowData(
  window: PointerLike<Window>,
  name: string,
): Pointer<unknown> {
  const _result = Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowData(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformString(name),
  ) as PlatformPointer<unknown>)!;
  return _result;
}
GetWindowData.symbolName = "SDL_GetWindowData";

export function GetWindowDisplayIndex(
  window: PointerLike<Window>,
): int {
  const _result = _library.symbols.SDL_GetWindowDisplayIndex(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as int;
  return _result;
}
GetWindowDisplayIndex.symbolName = "SDL_GetWindowDisplayIndex";

export function GetWindowDisplayMode(
  window: PointerLike<Window>,
  mode: PointerLike<DisplayMode>,
): int {
  const _result = _library.symbols.SDL_GetWindowDisplayMode(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(mode)),
  ) as int;
  return _result;
}
GetWindowDisplayMode.symbolName = "SDL_GetWindowDisplayMode";

export function GetWindowFlags(
  window: PointerLike<Window>,
): Uint32 {
  const _result = _library.symbols.SDL_GetWindowFlags(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as Uint32;
  return _result;
}
GetWindowFlags.symbolName = "SDL_GetWindowFlags";

export function GetWindowFromID(
  id: Uint32,
): Window | null {
  const _result = Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowFromID(
    id,
  ) as PlatformPointer<Window>));
  return _result;
}
GetWindowFromID.symbolName = "SDL_GetWindowFromID";

export function GetWindowGammaRamp(
  window: PointerLike<Window>,
  red: PointerLike<Uint16>,
  green: PointerLike<Uint16>,
  blue: PointerLike<Uint16>,
): int {
  const _result = _library.symbols.SDL_GetWindowGammaRamp(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(red)),
    Platform.toPlatformPointer(Pointer.of(green)),
    Platform.toPlatformPointer(Pointer.of(blue)),
  ) as int;
  return _result;
}
GetWindowGammaRamp.symbolName = "SDL_GetWindowGammaRamp";

export function GetWindowGrab(
  window: PointerLike<Window>,
): boolean {
  const _result = _library.symbols.SDL_GetWindowGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
  return _result;
}
GetWindowGrab.symbolName = "SDL_GetWindowGrab";

export function GetWindowICCProfile(
  window: PointerLike<Window>,
  size: PointerLike<int>,
): Pointer<unknown> {
  const _result = Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowICCProfile(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(size)),
  ) as PlatformPointer<unknown>)!;
  return _result;
}
GetWindowICCProfile.symbolName = "SDL_GetWindowICCProfile";

export function GetWindowID(
  window: PointerLike<Window>,
): Uint32 {
  const _result = _library.symbols.SDL_GetWindowID(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as Uint32;
  return _result;
}
GetWindowID.symbolName = "SDL_GetWindowID";

export function GetWindowKeyboardGrab(
  window: PointerLike<Window>,
): boolean {
  const _result = _library.symbols.SDL_GetWindowKeyboardGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
  return _result;
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
  const _result = _library.symbols.SDL_GetWindowMouseGrab(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
  return _result;
}
GetWindowMouseGrab.symbolName = "SDL_GetWindowMouseGrab";

export function GetWindowMouseRect(
  window: PointerLike<Window>,
): Rect | null {
  const _result = Rect.of(Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowMouseRect(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as PlatformPointer<Rect>));
  return _result;
}
GetWindowMouseRect.symbolName = "SDL_GetWindowMouseRect";

export function GetWindowOpacity(
  window: PointerLike<Window>,
  out_opacity: PointerLike<float>,
): int {
  const _result = _library.symbols.SDL_GetWindowOpacity(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(out_opacity)),
  ) as int;
  return _result;
}
GetWindowOpacity.symbolName = "SDL_GetWindowOpacity";

export function GetWindowPixelFormat(
  window: PointerLike<Window>,
): Uint32 {
  const _result = _library.symbols.SDL_GetWindowPixelFormat(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as Uint32;
  return _result;
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
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_GetWindowSurface(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
GetWindowSurface.symbolName = "SDL_GetWindowSurface";

export function GetWindowTitle(
  window: PointerLike<Window>,
): string {
  const _result = Platform.fromPlatformString(_library.symbols.SDL_GetWindowTitle(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as PlatformPointer<unknown>);
  return _result;
}
GetWindowTitle.symbolName = "SDL_GetWindowTitle";

export function GetWindowWMInfo(
  window: PointerLike<Window>,
  info: PointerLike<SysWMinfo>,
): boolean {
  const _result = _library.symbols.SDL_GetWindowWMInfo(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(info)),
  ) as boolean;
  return _result;
}
GetWindowWMInfo.symbolName = "SDL_GetWindowWMInfo";

export function HasColorKey(
  surface: PointerLike<Surface>,
): boolean {
  const _result = _library.symbols.SDL_HasColorKey(
    Platform.toPlatformPointer(Pointer.of(surface)),
  ) as boolean;
  return _result;
}
HasColorKey.symbolName = "SDL_HasColorKey";

export function HasIntersection(
  A: PointerLike<Rect>,
  B: PointerLike<Rect>,
): boolean {
  const _result = _library.symbols.SDL_HasIntersection(
    Platform.toPlatformPointer(Pointer.of(A)),
    Platform.toPlatformPointer(Pointer.of(B)),
  ) as boolean;
  return _result;
}
HasIntersection.symbolName = "SDL_HasIntersection";

export function HasWindowSurface(
  window: PointerLike<Window>,
): boolean {
  const _result = _library.symbols.SDL_HasWindowSurface(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
  return _result;
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

export function Init(flags: InitFlags, options?: InitOptions): void;
export function Init(flags: number, options?: InitOptions): void;
export function Init(flags: InitFlags | number, options?: InitOptions): void {
  const symbolsToLoad = options?.functions ? getSymbolsFromFunctions(symbols, options.functions) : symbols;
  _library = Platform.loadLibrary("SDL2", symbolsToLoad, options?.libraryPath);
  const _result = _library.symbols.SDL_Init(flags) as number;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
}
Init.symbolName = "SDL_Init";

export function IntersectRect(
  A: PointerLike<Rect>,
  B: PointerLike<Rect>,
  result: PointerLike<Rect>,
): boolean {
  const _result = _library.symbols.SDL_IntersectRect(
    Platform.toPlatformPointer(Pointer.of(A)),
    Platform.toPlatformPointer(Pointer.of(B)),
    Platform.toPlatformPointer(Pointer.of(result)),
  ) as boolean;
  return _result;
}
IntersectRect.symbolName = "SDL_IntersectRect";

export function IsShapedWindow(
  window: PointerLike<Window>,
): boolean {
  const _result = _library.symbols.SDL_IsShapedWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as boolean;
  return _result;
}
IsShapedWindow.symbolName = "SDL_IsShapedWindow";

export function LoadBMP_RW(
  src: PointerLike<RWops>,
  freesrc: int,
): Surface {
  const _result = Surface.of(Platform.fromPlatformPointer(_library.symbols.SDL_LoadBMP_RW(
    Platform.toPlatformPointer(Pointer.of(src)),
    freesrc,
  ) as PlatformPointer<Surface>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
LoadBMP_RW.symbolName = "SDL_LoadBMP_RW";

export function LoadWAV_RW(
  src: PointerLike<RWops>,
  freesrc: int,
  spec: PointerLike<AudioSpec>,
): [AudioSpec, Uint8Array] {
  const audio_buf = new Box<Pointer<Uint8>>(Pointer);
  const audio_len = new Box<Uint32>(Uint32);
  const _result = AudioSpec.of(Platform.fromPlatformPointer(_library.symbols.SDL_LoadWAV_RW(
    Platform.toPlatformPointer(Pointer.of(src)),
    freesrc,
    Platform.toPlatformPointer(Pointer.of(spec)),
    Platform.toPlatformPointer(Pointer.of(audio_buf)),
    Platform.toPlatformPointer(Pointer.of(audio_len)),
  ) as PlatformPointer<AudioSpec>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  const dataView = new Platform.DataView(audio_buf.value);
  return [_result, new Uint8Array(dataView.getArrayBuffer(audio_len.value, 0))];
}
LoadWAV_RW.symbolName = "SDL_LoadWAV_RW";

export function LockSurface(
  surface: PointerLike<Surface>,
): int {
  const _result = _library.symbols.SDL_LockSurface(
    Platform.toPlatformPointer(Pointer.of(surface)),
  ) as int;
  return _result;
}
LockSurface.symbolName = "SDL_LockSurface";

export function MapRGB(
  format: PointerLike<PixelFormat>,
  r: Uint8,
  g: Uint8,
  b: Uint8,
): Uint32 {
  const _result = _library.symbols.SDL_MapRGB(
    Platform.toPlatformPointer(Pointer.of(format)),
    r,
    g,
    b,
  ) as Uint32;
  return _result;
}
MapRGB.symbolName = "SDL_MapRGB";

export function MapRGBA(
  format: PointerLike<PixelFormat>,
  r: Uint8,
  g: Uint8,
  b: Uint8,
  a: Uint8,
): Uint32 {
  const _result = _library.symbols.SDL_MapRGBA(
    Platform.toPlatformPointer(Pointer.of(format)),
    r,
    g,
    b,
    a,
  ) as Uint32;
  return _result;
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
  iscapture: int,
  desired: PointerLike<AudioSpec>,
  obtained: PointerLike<AudioSpec> | null,
  allowed_changes: int,
): Uint32 {
  const _result = _library.symbols.SDL_OpenAudioDevice(
    Platform.toPlatformString(device),
    iscapture,
    Platform.toPlatformPointer(Pointer.of(desired)),
    Platform.toPlatformPointer(Pointer.of(obtained)),
    allowed_changes,
  ) as Uint32;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
OpenAudioDevice.symbolName = "SDL_OpenAudioDevice";

export function PauseAudioDevice(
  dev: Uint32,
  pause_on: int,
): void {
  _library.symbols.SDL_PauseAudioDevice(
    dev,
    pause_on,
  );
}
PauseAudioDevice.symbolName = "SDL_PauseAudioDevice";

export function PollEvent(
  event: PointerLike<Event>,
): int {
  const _result = _library.symbols.SDL_PollEvent(
    Platform.toPlatformPointer(Pointer.of(event)),
  ) as int;
  return _result;
}
PollEvent.symbolName = "SDL_PollEvent";

export function QueryTexture(
  texture: PointerLike<Texture>,
  format: PointerLike<Uint32> | null,
  access: PointerLike<int> | null,
  w: PointerLike<int>,
  h: PointerLike<int>,
): int {
  const _result = _library.symbols.SDL_QueryTexture(
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(format)),
    Platform.toPlatformPointer(Pointer.of(access)),
    Platform.toPlatformPointer(Pointer.of(w)),
    Platform.toPlatformPointer(Pointer.of(h)),
  ) as int;
  return _result;
}
QueryTexture.symbolName = "SDL_QueryTexture";

export function Quit(): void {
  _library.symbols.SDL_Quit();
  _library.close();
}
Quit.symbolName = "SDL_Quit";

export function QueueAudio(
  dev: Uint32,
  data: PointerLike<unknown>,
  len: Uint32,
): int {
  const _result = _library.symbols.SDL_QueueAudio(
    dev,
    Platform.toPlatformPointer(Pointer.of(data)),
    len,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
QueueAudio.symbolName = "SDL_QueueAudio";

export function RWFromFile(
  file: string,
  mode: RWMode,
): RWops {
  const _result = RWops.of(Platform.fromPlatformPointer(_library.symbols.SDL_RWFromFile(
    Platform.toPlatformString(file),
    Platform.toPlatformString(mode),
  ) as PlatformPointer<RWops>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
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
): int {
  const _result = _library.symbols.SDL_RenderClear(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderClear.symbolName = "SDL_RenderClear";

export function RenderCopy(
  renderer: PointerLike<Renderer>,
  texture: PointerLike<Texture>,
  srcrect: PointerLike<Rect> | null,
  dstrect: PointerLike<Rect> | null,
): int {
  const _result = _library.symbols.SDL_RenderCopy(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(srcrect)),
    Platform.toPlatformPointer(Pointer.of(dstrect)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderCopy.symbolName = "SDL_RenderCopy";

export function RenderCopyEx(
  renderer: PointerLike<Renderer>,
  texture: PointerLike<Texture>,
  srcrect: PointerLike<Rect>,
  dstrect: PointerLike<Rect>,
  angle: double,
  center: PointerLike<Point>,
  flip: RendererFlip,
): int {
  const _result = _library.symbols.SDL_RenderCopyEx(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(texture)),
    Platform.toPlatformPointer(Pointer.of(srcrect)),
    Platform.toPlatformPointer(Pointer.of(dstrect)),
    angle,
    Platform.toPlatformPointer(Pointer.of(center)),
    flip,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderCopyEx.symbolName = "SDL_RenderCopyEx";

export function RenderDrawLine(
  renderer: PointerLike<Renderer>,
  x1: int,
  y1: int,
  x2: int,
  y2: int,
): int {
  const _result = _library.symbols.SDL_RenderDrawLine(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    x1,
    y1,
    x2,
    y2,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderDrawLine.symbolName = "SDL_RenderDrawLine";

export function RenderDrawLines(
  renderer: PointerLike<Renderer>,
  points: PointerLike<Point>,
  count: int,
): int {
  const _result = _library.symbols.SDL_RenderDrawLines(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(points)),
    count,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderDrawLines.symbolName = "SDL_RenderDrawLines";

export function RenderDrawPoint(
  renderer: PointerLike<Renderer>,
  x: int,
  y: int,
): int {
  const _result = _library.symbols.SDL_RenderDrawPoint(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    x,
    y,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderDrawPoint.symbolName = "SDL_RenderDrawPoint";

export function RenderDrawPoints(
  renderer: PointerLike<Renderer>,
  points: PointerLike<Point>,
  count: int,
): int {
  const _result = _library.symbols.SDL_RenderDrawPoints(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(points)),
    count,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderDrawPoints.symbolName = "SDL_RenderDrawPoints";

export function RenderDrawRect(
  renderer: PointerLike<Renderer>,
  rect: PointerLike<Rect>,
): int {
  const _result = _library.symbols.SDL_RenderDrawRect(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(rect)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderDrawRect.symbolName = "SDL_RenderDrawRect";

export function RenderDrawRects(
  renderer: PointerLike<Renderer>,
  rects: PointerLike<Rect>,
  count: int,
): int {
  const _result = _library.symbols.SDL_RenderDrawRects(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(rects)),
    count,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderDrawRects.symbolName = "SDL_RenderDrawRects";

export function RenderFillRect(
  renderer: PointerLike<Renderer>,
  rect: PointerLike<Rect>,
): int {
  const _result = _library.symbols.SDL_RenderFillRect(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(rect)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderFillRect.symbolName = "SDL_RenderFillRect";

export function RenderFillRects(
  renderer: PointerLike<Renderer>,
  rects: PointerLike<Rect>,
  count: int,
): int {
  const _result = _library.symbols.SDL_RenderFillRects(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    Platform.toPlatformPointer(Pointer.of(rects)),
    count,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderFillRects.symbolName = "SDL_RenderFillRects";

export function RenderFlush(
  renderer: PointerLike<Renderer>,
): int {
  const _result = _library.symbols.SDL_RenderFlush(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderFlush.symbolName = "SDL_RenderFlush";

export function RenderGetWindow(
  renderer: PointerLike<Renderer>,
): Window {
  const _result = Window.of(Platform.fromPlatformPointer(_library.symbols.SDL_RenderGetWindow(
    Platform.toPlatformPointer(Pointer.of(renderer)),
  ) as PlatformPointer<Window>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderGetWindow.symbolName = "SDL_RenderGetWindow";

export function RenderSetLogicalSize(
  renderer: PointerLike<Renderer>,
  width: int,
  height: int,
): int {
  const _result = _library.symbols.SDL_RenderSetLogicalSize(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    width,
    height,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
RenderSetLogicalSize.symbolName = "SDL_RenderSetLogicalSize";

export function RenderLogicalToWindow(
  renderer: PointerLike<Renderer>,
  logicalX: float,
  logicalY: float,
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
  windowX: int,
  windowY: int,
  logicalX: PointerLike<float>,
  logicalY: PointerLike<float>,
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
  flag: int,
  key: Uint32,
): int {
  const _result = _library.symbols.SDL_SetColorKey(
    Platform.toPlatformPointer(Pointer.of(surface)),
    flag,
    key,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetColorKey.symbolName = "SDL_SetColorKey";

export function SetRenderDrawBlendMode(
  renderer: PointerLike<Renderer>,
  blendMode: BlendMode,
): int {
  const _result = _library.symbols.SDL_SetRenderDrawBlendMode(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    blendMode,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetRenderDrawBlendMode.symbolName = "SDL_SetRenderDrawBlendMode";

export function SetRenderDrawColor(
  renderer: PointerLike<Renderer>,
  r: Uint8,
  g: Uint8,
  b: Uint8,
  a: Uint8,
): int {
  const _result = _library.symbols.SDL_SetRenderDrawColor(
    Platform.toPlatformPointer(Pointer.of(renderer)),
    r,
    g,
    b,
    a,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetRenderDrawColor.symbolName = "SDL_SetRenderDrawColor";

export function SetSurfaceBlendMode(
  surface: PointerLike<Surface>,
  blendMode: BlendMode,
): int {
  const _result = _library.symbols.SDL_SetSurfaceBlendMode(
    Platform.toPlatformPointer(Pointer.of(surface)),
    blendMode,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetSurfaceBlendMode.symbolName = "SDL_SetSurfaceBlendMode";

export function SetTextureAlphaMod(
  texture: PointerLike<Texture>,
  alpha: Uint8,
): int {
  const _result = _library.symbols.SDL_SetTextureAlphaMod(
    Platform.toPlatformPointer(Pointer.of(texture)),
    alpha,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetTextureAlphaMod.symbolName = "SDL_SetTextureAlphaMod";

export function SetTextureBlendMode(
  texture: PointerLike<Texture>,
  blendMode: BlendMode,
): int {
  const _result = _library.symbols.SDL_SetTextureBlendMode(
    Platform.toPlatformPointer(Pointer.of(texture)),
    blendMode,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetTextureBlendMode.symbolName = "SDL_SetTextureBlendMode";

export function SetTextureColorMod(
  texture: PointerLike<Texture>,
  r: Uint8,
  g: Uint8,
  b: Uint8,
): int {
  const _result = _library.symbols.SDL_SetTextureColorMod(
    Platform.toPlatformPointer(Pointer.of(texture)),
    r,
    g,
    b,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
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
  brightness: float,
): int {
  const _result = _library.symbols.SDL_SetWindowBrightness(
    Platform.toPlatformPointer(Pointer.of(window)),
    brightness,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetWindowBrightness.symbolName = "SDL_SetWindowBrightness";

export function SetWindowData(
  window: PointerLike<Window>,
  name: string,
  userdata: PointerLike<unknown>,
): Pointer<unknown> {
  const _result = Platform.fromPlatformPointer(_library.symbols.SDL_SetWindowData(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformString(name),
    Platform.toPlatformPointer(Pointer.of(userdata)),
  ) as PlatformPointer<unknown>)!;
  return _result;
}
SetWindowData.symbolName = "SDL_SetWindowData";

export function SetWindowDisplayMode(
  window: PointerLike<Window>,
  mode: PointerLike<DisplayMode>,
): int {
  const _result = _library.symbols.SDL_SetWindowDisplayMode(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(mode)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetWindowDisplayMode.symbolName = "SDL_SetWindowDisplayMode";

export function SetWindowFullscreen(
  window: PointerLike<Window>,
  flags: Uint32,
): int {
  const _result = _library.symbols.SDL_SetWindowFullscreen(
    Platform.toPlatformPointer(Pointer.of(window)),
    flags,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetWindowFullscreen.symbolName = "SDL_SetWindowFullscreen";

export function SetWindowGammaRamp(
  window: PointerLike<Window>,
  red: PointerLike<Uint16>,
  green: PointerLike<Uint16>,
  blue: PointerLike<Uint16>,
): int {
  const _result = _library.symbols.SDL_SetWindowGammaRamp(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(red)),
    Platform.toPlatformPointer(Pointer.of(green)),
    Platform.toPlatformPointer(Pointer.of(blue)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
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
): int {
  const _result = _library.symbols.SDL_SetWindowInputFocus(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
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
  max_w: int,
  max_h: int,
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
  min_w: int,
  min_h: int,
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
): int {
  const _result = _library.symbols.SDL_SetWindowModalFor(
    Platform.toPlatformPointer(Pointer.of(modal_window)),
    Platform.toPlatformPointer(Pointer.of(parent_window)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
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
): int {
  const _result = _library.symbols.SDL_SetWindowMouseRect(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(rect)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetWindowMouseRect.symbolName = "SDL_SetWindowMouseRect";

export function SetWindowOpacity(
  window: PointerLike<Window>,
  opacity: float,
): int {
  const _result = _library.symbols.SDL_SetWindowOpacity(
    Platform.toPlatformPointer(Pointer.of(window)),
    opacity,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
SetWindowOpacity.symbolName = "SDL_SetWindowOpacity";

export function SetWindowPosition(
  window: PointerLike<Window>,
  x: int,
  y: int,
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
  w: int,
  h: int,
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
): int {
  const _result = _library.symbols.SDL_UpdateWindowSurface(
    Platform.toPlatformPointer(Pointer.of(window)),
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
UpdateWindowSurface.symbolName = "SDL_UpdateWindowSurface";

export function UpdateWindowSurfaceRects(
  window: PointerLike<Window>,
  rects: PointerLike<Rect>,
  numrects: int,
): int {
  const _result = _library.symbols.SDL_UpdateWindowSurfaceRects(
    Platform.toPlatformPointer(Pointer.of(window)),
    Platform.toPlatformPointer(Pointer.of(rects)),
    numrects,
  ) as int;
  if (_result < 0) {
    throw new SDLError(GetError());
  }
  return _result;
}
UpdateWindowSurfaceRects.symbolName = "SDL_UpdateWindowSurfaceRects";

export function WaitEvent(
  event: PointerLike<Event>,
): int {
  const _result = _library.symbols.SDL_WaitEvent(
    Platform.toPlatformPointer(Pointer.of(event)),
  ) as int;
  return _result;
}
WaitEvent.symbolName = "SDL_WaitEvent";

export function WaitEventTimeout(
  event: PointerLike<Event>,
  timeout: int,
): int {
  const _result = _library.symbols.SDL_WaitEventTimeout(
    Platform.toPlatformPointer(Pointer.of(event)),
    timeout,
  ) as int;
  return _result;
}
WaitEventTimeout.symbolName = "SDL_WaitEventTimeout";

export function WarpMouseInWindow(
  window: PointerLike<Window>,
  x: int,
  y: int,
): void {
  _library.symbols.SDL_WarpMouseInWindow(
    Platform.toPlatformPointer(Pointer.of(window)),
    x,
    y,
  );
}
WarpMouseInWindow.symbolName = "SDL_WarpMouseInWindow";
