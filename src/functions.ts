// This file is auto generated. To update the file make changes to the code generator.

import { Event } from "./events.ts";
import { BlitMap, PixelFormat, Point, Rect, Renderer, RWops, Surface, Texture, Window } from "./structs.ts";
import { Symbols, symbols } from "./symbols.ts";
import { RWMode, TypedArray } from "./types.ts";
import { Pointer, PointerOrStruct, PointerTarget } from "./types.ts";
import { DataPointer, fromCString, NULL_POINTER, toCString } from "./utils.ts";

interface SDLContext {
  library: Deno.DynamicLibrary<Symbols>;
  symbols: Deno.StaticForeignLibraryInterface<Symbols>;
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
  src: PointerOrStruct<Surface>,
  srcrect: PointerOrStruct<Rect> | null,
  dst: PointerOrStruct<Surface>,
  dstrect: PointerOrStruct<Rect> | null,
): number {
  return context.symbols.SDL_UpperBlitScaled(
    (src.pointer as DataPointer<Surface>)._value,
    (srcrect?.pointer as DataPointer<Rect> | undefined)?._value ?? NULL_POINTER,
    (dst.pointer as DataPointer<Surface>)._value,
    (dstrect?.pointer as DataPointer<Rect> | undefined)?._value ?? NULL_POINTER,
  ) as number;
}

export function BlitSurface(
  src: PointerOrStruct<Surface>,
  srcrect: PointerOrStruct<Rect> | null,
  dst: PointerOrStruct<Surface>,
  dstrect: PointerOrStruct<Rect> | null,
): number {
  return context.symbols.SDL_UpperBlit(
    (src.pointer as DataPointer<Surface>)._value,
    (srcrect?.pointer as DataPointer<Rect> | undefined)?._value ?? NULL_POINTER,
    (dst.pointer as DataPointer<Surface>)._value,
    (dstrect?.pointer as DataPointer<Rect> | undefined)?._value ?? NULL_POINTER,
  ) as number;
}

export function CreateRenderer(
  window: Pointer<Window>,
  index: number,
  flags: number,
): Pointer<Renderer> {
  return new DataPointer<Renderer>(context.symbols.SDL_CreateRenderer(
    (window as DataPointer<Window>)._value,
    index,
    flags,
  ) as Deno.UnsafePointer);
}

export function CreateRGBSurfaceFrom(
  pixels: TypedArray,
  width: number,
  height: number,
  depth: number,
  pitch: number,
  Rmask: number,
  Gmask: number,
  Bmask: number,
  Amask: number,
): Surface {
  return new Surface(
    new DataPointer(context.symbols.SDL_CreateRGBSurfaceFrom(
      Deno.UnsafePointer.of(pixels),
      width,
      height,
      depth,
      pitch,
      Rmask,
      Gmask,
      Bmask,
      Amask,
    ) as Deno.UnsafePointer),
  );
}

export function CreateRGBSurfaceWithFormat(
  flags: number,
  width: number,
  height: number,
  depth: number,
  format: number,
): Surface {
  return new Surface(
    new DataPointer(context.symbols.SDL_CreateRGBSurfaceWithFormat(
      flags,
      width,
      height,
      depth,
      format,
    ) as Deno.UnsafePointer),
  );
}

export function CreateTexture(
  renderer: Pointer<Renderer>,
  format: number,
  access: number,
  w: number,
  h: number,
): Pointer<Texture> {
  return new DataPointer<Texture>(context.symbols.SDL_CreateTexture(
    (renderer as DataPointer<Renderer>)._value,
    format,
    access,
    w,
    h,
  ) as Deno.UnsafePointer);
}

export function CreateWindow(
  title: string,
  x: number,
  y: number,
  w: number,
  h: number,
  flags: number,
): Pointer<Window> {
  return new DataPointer<Window>(context.symbols.SDL_CreateWindow(
    toCString(title),
    x,
    y,
    w,
    h,
    flags,
  ) as Deno.UnsafePointer);
}

export function CreateWindowAndRenderer(
  width: number,
  height: number,
  window_flags: number,
  window: PointerTarget<Window>,
  renderer: PointerTarget<Renderer>,
): number {
  const windowDoublePointer = new BigUint64Array(1);
  const rendererDoublePointer = new BigUint64Array(1);

  const result = context.symbols.SDL_CreateWindowAndRenderer(
    width,
    height,
    window_flags,
    windowDoublePointer,
    rendererDoublePointer,
  ) as number;

  window.value = new DataPointer<Window>(windowDoublePointer[0]);
  renderer.value = new DataPointer<Renderer>(rendererDoublePointer[0]);

  return result;
}

export function Delay(
  ms: number,
): void {
  context.symbols.SDL_Delay(
    ms,
  );
}

export function DestroyRenderer(
  renderer: Pointer<Renderer>,
): void {
  context.symbols.SDL_DestroyRenderer(
    (renderer as DataPointer<Renderer>)._value,
  );
}

export function DestroyTexture(
  texture: Pointer<Texture>,
): void {
  context.symbols.SDL_DestroyTexture(
    (texture as DataPointer<Texture>)._value,
  );
}

export function DestroyWindow(
  window: Pointer<Window>,
): void {
  context.symbols.SDL_DestroyWindow(
    (window as DataPointer<Window>)._value,
  );
}

export function FillRect(
  dst: PointerOrStruct<Surface>,
  rect: PointerOrStruct<Rect> | null,
  color: number,
): number {
  return context.symbols.SDL_FillRect(
    (dst.pointer as DataPointer<Surface>)._value,
    (rect?.pointer as DataPointer<Rect> | undefined)?._value ?? NULL_POINTER,
    color,
  ) as number;
}

export function FreeSurface(
  surface: PointerOrStruct<Surface>,
): void {
  context.symbols.SDL_FreeSurface(
    (surface.pointer as DataPointer<Surface>)._value,
  );
}

export function GetError(): string {
  return fromCString(context.symbols.SDL_GetError() as Deno.UnsafePointer);
}

export function GetSystemRAM(): number {
  return context.symbols.SDL_GetSystemRAM() as number;
}

export function GetTicks(): number {
  return context.symbols.SDL_GetTicks() as number;
}

export function GetTicks64(): bigint {
  return context.symbols.SDL_GetTicks64() as unknown as bigint;
}

export function GetWindowSurface(
  window: Pointer<Window>,
): Surface {
  return new Surface(
    new DataPointer(context.symbols.SDL_GetWindowSurface(
      (window as DataPointer<Window>)._value,
    ) as Deno.UnsafePointer),
  );
}

export function Init(flags: number, libraryPath?: string): number {
  // TODO: Improve this logic.
  if (!libraryPath) {
    libraryPath = "sdl2";
  }

  context.library = Deno.dlopen(libraryPath, symbols);
  context.symbols = context.library.symbols;

  return context.symbols.SDL_Init(flags) as number;
}

export function LoadBMP_RW(
  src: Pointer<RWops>,
  freesrc: number,
): Surface {
  return new Surface(
    new DataPointer(context.symbols.SDL_LoadBMP_RW(
      (src as DataPointer<RWops>)._value,
      freesrc,
    ) as Deno.UnsafePointer),
  );
}

export function LockSurface(
  surface: PointerOrStruct<Surface>,
): number {
  return context.symbols.SDL_LockSurface(
    (surface.pointer as DataPointer<Surface>)._value,
  ) as number;
}

export function MapRGB(
  format: Pointer<PixelFormat>,
  r: number,
  g: number,
  b: number,
): number {
  return context.symbols.SDL_MapRGB(
    (format as DataPointer<PixelFormat>)._value,
    r,
    g,
    b,
  ) as number;
}

export function MapRGBA(
  format: Pointer<PixelFormat>,
  r: number,
  g: number,
  b: number,
  a: number,
): number {
  return context.symbols.SDL_MapRGBA(
    (format as DataPointer<PixelFormat>)._value,
    r,
    g,
    b,
    a,
  ) as number;
}

export function MaximizeWindow(
  window: Pointer<Window>,
): void {
  context.symbols.SDL_MaximizeWindow(
    (window as DataPointer<Window>)._value,
  );
}

export function MinimizeWindow(
  window: Pointer<Window>,
): void {
  context.symbols.SDL_MinimizeWindow(
    (window as DataPointer<Window>)._value,
  );
}

export function PollEvent(
  event: PointerOrStruct<Event>,
): number {
  return context.symbols.SDL_PollEvent(
    (event.pointer as DataPointer<Event>)._value,
  ) as number;
}

export function Quit(): void {
  context.symbols.SDL_Quit();
  context.library.close();
}

export function RenderClear(
  renderer: Pointer<Renderer>,
): number {
  return context.symbols.SDL_RenderClear(
    (renderer as DataPointer<Renderer>)._value,
  ) as number;
}

export function RenderFillRect(
  renderer: Pointer<Renderer>,
  rect: PointerOrStruct<Rect>,
): number {
  return context.symbols.SDL_RenderFillRect(
    (renderer as DataPointer<Renderer>)._value,
    (rect.pointer as DataPointer<Rect>)._value,
  ) as number;
}

export function RenderFlush(
  renderer: Pointer<Renderer>,
): number {
  return context.symbols.SDL_RenderFlush(
    (renderer as DataPointer<Renderer>)._value,
  ) as number;
}

export function RenderPresent(
  renderer: Pointer<Renderer>,
): void {
  context.symbols.SDL_RenderPresent(
    (renderer as DataPointer<Renderer>)._value,
  );
}

export function RestoreWindow(
  window: Pointer<Window>,
): void {
  context.symbols.SDL_RestoreWindow(
    (window as DataPointer<Window>)._value,
  );
}

export function RWFromFile(
  file: string,
  mode: RWMode,
): Pointer<RWops> {
  return new DataPointer<RWops>(context.symbols.SDL_RWFromFile(
    toCString(file),
    toCString(mode),
  ) as Deno.UnsafePointer);
}

export function SetRenderDrawColor(
  renderer: Pointer<Renderer>,
  r: number,
  g: number,
  b: number,
  a: number,
): number {
  return context.symbols.SDL_SetRenderDrawColor(
    (renderer as DataPointer<Renderer>)._value,
    r,
    g,
    b,
    a,
  ) as number;
}

export function UnlockSurface(
  surface: PointerOrStruct<Surface>,
): void {
  context.symbols.SDL_UnlockSurface(
    (surface.pointer as DataPointer<Surface>)._value,
  );
}

export function UpdateWindowSurface(
  window: Pointer<Window>,
): number {
  return context.symbols.SDL_UpdateWindowSurface(
    (window as DataPointer<Window>)._value,
  ) as number;
}
