// This file is auto generated. To update the file make changes to the code generator.

export interface Symbols extends Deno.ForeignLibraryInterface {
  SDL_CreateWindow: Deno.ForeignFunction;
  SDL_Delay: Deno.ForeignFunction;
  SDL_DestroyWindow: Deno.ForeignFunction;
  SDL_FillRect: Deno.ForeignFunction;
  SDL_GetWindowSurface: Deno.ForeignFunction;
  SDL_Init: Deno.ForeignFunction;
  SDL_MapRGB: Deno.ForeignFunction;
  SDL_MapRGBA: Deno.ForeignFunction;
  SDL_PollEvent: Deno.ForeignFunction;
  SDL_Quit: Deno.ForeignFunction;
  SDL_UpdateWindowSurface: Deno.ForeignFunction;
}

export const symbols: Symbols = {
  SDL_CreateWindow: {
    parameters: [
      /* title */ "pointer",
      /* x */ "i32",
      /* y */ "i32",
      /* w */ "i32",
      /* h */ "i32",
      /* flags */ "u32",
    ],
    result: "pointer",
  },
  SDL_Delay: {
    parameters: [/* ms */ "u32"],
    result: "void",
  },
  SDL_DestroyWindow: {
    parameters: [/* window */ "pointer"],
    result: "void",
  },
  SDL_FillRect: {
    parameters: [/* dst */ "pointer", /* rect */ "pointer", /* color */ "u32"],
    result: "i32",
  },
  SDL_GetWindowSurface: {
    parameters: [/* window */ "pointer"],
    result: "pointer",
  },
  SDL_Init: {
    parameters: [/* flags */ "u32"],
    result: "i32",
  },
  SDL_MapRGB: {
    parameters: [
      /* format */ "pointer",
      /* r */ "u8",
      /* g */ "u8",
      /* b */ "u8",
    ],
    result: "u32",
  },
  SDL_MapRGBA: {
    parameters: [
      /* format */ "pointer",
      /* r */ "u8",
      /* g */ "u8",
      /* b */ "u8",
      /* a */ "u8",
    ],
    result: "u32",
  },
  SDL_PollEvent: {
    parameters: [/* event */ "pointer"],
    result: "i32",
  },
  SDL_Quit: {
    parameters: [],
    result: "void",
  },
  SDL_UpdateWindowSurface: {
    parameters: [/* window */ "pointer"],
    result: "i32",
  },
};
