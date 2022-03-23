import {
  SDL_CreateWindowFunc,
  SDL_DelayFunc,
  SDL_DestroyWindowFunc,
  SDL_InitFunc,
  SDL_PollEventFunc,
  SDL_QuitFunc,
} from "./interfaces.ts";
import { symbols, Symbols } from "./symbols.ts";
import { encode } from "./utils.ts";

interface SDL_Context {
  library: Deno.DynamicLibrary<Symbols>;
  symbols: Deno.StaticForeignLibraryInterface<Symbols>;
}

const context: SDL_Context = {
  // We don't want to check in every function if the
  // library has been loaded so the following are
  // set to null even though the type says it shouldn't
  // be null.
  library: null!,
  symbols: null!,
};

export const SDL_CreateWindow: SDL_CreateWindowFunc = function (
  title: string,
  x: number,
  y: number,
  width: number,
  height: number,
  flags: number
): Deno.UnsafePointer {
  return context.symbols.SDL_CreateWindow(
    encode(title),
    x,
    y,
    width,
    height,
    flags
  ) as Deno.UnsafePointer;
};

export const SDL_Delay: SDL_DelayFunc = function (delay: number) {
  context.symbols.SDL_Delay(delay);
};

export const SDL_DestroyWindow: SDL_DestroyWindowFunc = function (
  window: Deno.UnsafePointer
): void {
  context.symbols.SDL_DestroyWindow(window);
};

export type SDL_LibraryLoaderFunc =
  | SDL_InitFunc
  | ((flags: number, libraryPath?: string) => number);

export const SDL_Init: SDL_LibraryLoaderFunc = function (
  flags: number,
  libraryPath?: string
) {
  // TODO: Improve this logic.
  if (!libraryPath) {
    libraryPath = "sdl2";
  }

  context.library = Deno.dlopen(libraryPath, symbols);
  context.symbols = context.library.symbols;

  return context.symbols.SDL_Init(flags) as number;
};

export const SDL_PollEvent: SDL_PollEventFunc = function (
  event: Deno.UnsafePointer
): number {
  return context.symbols.SDL_PollEvent(event) as number;
};

export const SDL_Quit: SDL_QuitFunc = function (): void {
  context.symbols.SDL_Quit();
  context.library.close();
};
