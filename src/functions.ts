// This file is auto generated. To update the file make changes to the code generator.

import { Event } from "./events.ts";
import { Rect, Surface, Window } from "./structs.ts";
import { Symbols, symbols } from "./symbols.ts";
import { nullPointer, toCString } from "./utils.ts";

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

export function CreateWindow(
  title: string,
  x: number,
  y: number,
  w: number,
  h: number,
  flags: number,
): Window {
  return context.symbols.SDL_CreateWindow(
    toCString(title),
    x,
    y,
    w,
    h,
    flags,
  ) as Window;
}

export function Delay(
  ms: number,
): void {
  context.symbols.SDL_Delay(
    ms,
  );
}

export function DestroyWindow(
  window: Window,
): void {
  context.symbols.SDL_DestroyWindow(
    window,
  );
}

export function FillRect(
  dst: Surface,
  rect: Rect | null,
  color: number,
): number {
  return context.symbols.SDL_FillRect(
    dst.pointer,
    rect?.pointer ?? nullPointer,
    color,
  ) as number;
}

export function GetWindowSurface(
  window: Window,
): Surface {
  return new Surface(context.symbols.SDL_GetWindowSurface(
    window,
  ) as Deno.UnsafePointer);
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

export function MapRGB(
  format: Deno.UnsafePointer,
  r: number,
  g: number,
  b: number,
): number {
  return context.symbols.SDL_MapRGB(
    format,
    r,
    g,
    b,
  ) as number;
}

export function MapRGBA(
  format: Deno.UnsafePointer,
  r: number,
  g: number,
  b: number,
  a: number,
): number {
  return context.symbols.SDL_MapRGBA(
    format,
    r,
    g,
    b,
    a,
  ) as number;
}

export function PollEvent(
  event: Event,
): number {
  return context.symbols.SDL_PollEvent(
    event.pointer,
  ) as number;
}

export function Quit(): void {
  context.symbols.SDL_Quit();
  context.library.close();
}

export function UpdateWindowSurface(
  window: Window,
): number {
  return context.symbols.SDL_UpdateWindowSurface(
    window,
  ) as number;
}
