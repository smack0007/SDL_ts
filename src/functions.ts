import { Event } from "./events.ts";
import { symbols, Symbols } from "./symbols.ts";
import { toCString } from "./utils.ts";

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
  width: number,
  height: number,
  flags: number
): Deno.UnsafePointer {
  return context.symbols.SDL_CreateWindow(
    toCString(title),
    x,
    y,
    width,
    height,
    flags
  ) as Deno.UnsafePointer;
}

export function Delay(delay: number): void {
  context.symbols.SDL_Delay(delay);
}

export function DestroyWindow(window: Deno.UnsafePointer): void {
  context.symbols.SDL_DestroyWindow(window);
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

export function PollEvent(event: Event): number {
  return context.symbols.SDL_PollEvent(Deno.UnsafePointer.of(event._buffer)) as number;
}

export function Quit(): void {
  context.symbols.SDL_Quit();
  context.library.close();
}
