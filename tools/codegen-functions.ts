interface CodeGenFunction {
  parameters: Record<string, Deno.NativeType>;
  result: Deno.NativeType;
}

export const functions: Record<string, CodeGenFunction> = {
  SDL_CreateWindow: {
    parameters: {
      title: "pointer", /* char* */
      x: "i32", /* int */
      y: "i32", /* int */
      w: "i32", /* int */
      h: "i32", /* int */
      flags: "u32", /* Uint32 */
    },
    result: "pointer", /* SDL_Window* */
  },

  SDL_Delay: {
    parameters: {
      ms: "u32", /* Uint32 */
    },
    result: "void", /* void */
  },

  SDL_DestroyWindow: {
    parameters: {
      window: "pointer", /* SDL_Window* */
    },
    result: "void", /* void */
  },

  SDL_FillRect: {
    parameters: {
      dst: "pointer", /* SDL_Surface* */
      rect: "pointer", /* SDL_Rect* */
      color: "u32", /* Uint32 */
    },
    result: "i32", /* int */
  },

  SDL_GetWindowSurface: {
    parameters: {
      window: "pointer", /* SDL_Window* */
    },
    result: "pointer", /* SDL_Surface* */
  },

  SDL_Init: {
    parameters: {
      flags: "u32", /* Uint32 */
    },
    result: "i32", /* int */
  },

  SDL_MapRGB: {
    parameters: {
      format: "pointer", /* SDL_PixelFormat* */
      r: "u8", /* Uint8 */
      g: "u8", /* Uint8 */
      b: "u8", /* Uint8 */
    },
    result: "u32", /* Uint32 */
  },

  SDL_MapRGBA: {
    parameters: {
      format: "pointer", /* SDL_PixelFormat* */
      r: "u8", /* Uint8 */
      g: "u8", /* Uint8 */
      b: "u8", /* Uint8 */
      a: "u8", /* Uint8 */
    },
    result: "u32", /* Uint32 */
  },

  SDL_PollEvent: {
    parameters: {
      event: "pointer", /* SDL_Event* */
    },
    result: "i32", /* int */
  },

  SDL_Quit: {
    parameters: {},
    result: "void", /* void */
  },

  SDL_UpdateWindowSurface: {
    parameters: {
      window: "pointer", /* SDL_Window* */
    },
    result: "i32", /* int */
  },
};
