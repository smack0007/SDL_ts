// This file is auto generated. To update the file make changes to the code generator.

export interface Symbols extends Deno.ForeignLibraryInterface {
  SDL_UpperBlitScaled: Deno.ForeignFunction;
  SDL_UpperBlit: Deno.ForeignFunction;
  SDL_CreateRenderer: Deno.ForeignFunction;
  SDL_CreateRGBSurfaceFrom: Deno.ForeignFunction;
  SDL_CreateRGBSurfaceWithFormat: Deno.ForeignFunction;
  SDL_CreateTexture: Deno.ForeignFunction;
  SDL_CreateWindow: Deno.ForeignFunction;
  SDL_Delay: Deno.ForeignFunction;
  SDL_DestroyRenderer: Deno.ForeignFunction;
  SDL_DestroyTexture: Deno.ForeignFunction;
  SDL_DestroyWindow: Deno.ForeignFunction;
  SDL_FillRect: Deno.ForeignFunction;
  SDL_FreeSurface: Deno.ForeignFunction;
  SDL_GetError: Deno.ForeignFunction;
  SDL_GetSystemRAM: Deno.ForeignFunction;
  SDL_GetTicks: Deno.ForeignFunction;
  SDL_GetTicks64: Deno.ForeignFunction;
  SDL_GetWindowSurface: Deno.ForeignFunction;
  SDL_Init: Deno.ForeignFunction;
  SDL_LoadBMP_RW: Deno.ForeignFunction;
  SDL_LockSurface: Deno.ForeignFunction;
  SDL_MapRGB: Deno.ForeignFunction;
  SDL_MapRGBA: Deno.ForeignFunction;
  SDL_MaximizeWindow: Deno.ForeignFunction;
  SDL_MinimizeWindow: Deno.ForeignFunction;
  SDL_PollEvent: Deno.ForeignFunction;
  SDL_Quit: Deno.ForeignFunction;
  SDL_RenderClear: Deno.ForeignFunction;
  SDL_RenderFillRect: Deno.ForeignFunction;
  SDL_RenderFlush: Deno.ForeignFunction;
  SDL_RenderPresent: Deno.ForeignFunction;
  SDL_RestoreWindow: Deno.ForeignFunction;
  SDL_RWFromFile: Deno.ForeignFunction;
  SDL_SetRenderDrawColor: Deno.ForeignFunction;
  SDL_UnlockSurface: Deno.ForeignFunction;
  SDL_UpdateWindowSurface: Deno.ForeignFunction;
}

export const symbols: Symbols = {
  SDL_UpperBlitScaled: {
    parameters: [
      "pointer", /* SDL_Surface* src */
      "pointer", /* SDL_Rect* srcrect */
      "pointer", /* SDL_Surface* dst */
      "pointer", /* SDL_Rect* dstrect */
    ],
    result: "i32", /* int */
  },
  SDL_UpperBlit: {
    parameters: [
      "pointer", /* SDL_Surface* src */
      "pointer", /* SDL_Rect* srcrect */
      "pointer", /* SDL_Surface* dst */
      "pointer", /* SDL_Rect* dstrect */
    ],
    result: "i32", /* int */
  },
  SDL_CreateRenderer: {
    parameters: [
      "pointer", /* SDL_Window* window */
      "i32", /* int index */
      "u32", /* Uint32 flags */
    ],
    result: "pointer", /* SDL_Renderer* */
  },
  SDL_CreateRGBSurfaceFrom: {
    parameters: [
      "pointer", /* void* pixels */
      "i32", /* int width */
      "i32", /* int height */
      "i32", /* int depth */
      "i32", /* int pitch */
      "u32", /* Uint32 Rmask */
      "u32", /* Uint32 Gmask */
      "u32", /* Uint32 Bmask */
      "u32", /* Uint32 Amask */
    ],
    result: "pointer", /* SDL_Surface* */
  },
  SDL_CreateRGBSurfaceWithFormat: {
    parameters: [
      "u32", /* Uint32 flags */
      "i32", /* int width */
      "i32", /* int height */
      "i32", /* int depth */
      "u32", /* Uint32 format */
    ],
    result: "pointer", /* SDL_Surface* */
  },
  SDL_CreateTexture: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "u32", /* Uint32 format */
      "i32", /* int access */
      "i32", /* int w */
      "i32", /* int h */
    ],
    result: "pointer", /* SDL_Texture* */
  },
  SDL_CreateWindow: {
    parameters: [
      "pointer", /* char* title */
      "i32", /* int x */
      "i32", /* int y */
      "i32", /* int w */
      "i32", /* int h */
      "u32", /* Uint32 flags */
    ],
    result: "pointer", /* SDL_Window* */
  },
  SDL_Delay: {
    parameters: [
      "u32", /* Uint32 ms */
    ],
    result: "void", /* void */
  },
  SDL_DestroyRenderer: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
    ],
    result: "void", /* void */
  },
  SDL_DestroyTexture: {
    parameters: [
      "pointer", /* SDL_Texture* texture */
    ],
    result: "void", /* void */
  },
  SDL_DestroyWindow: {
    parameters: [
      "pointer", /* SDL_Window* window */
    ],
    result: "void", /* void */
  },
  SDL_FillRect: {
    parameters: [
      "pointer", /* SDL_Surface* dst */
      "pointer", /* SDL_Rect* rect */
      "u32", /* Uint32 color */
    ],
    result: "i32", /* int */
  },
  SDL_FreeSurface: {
    parameters: [
      "pointer", /* SDL_Surface* surface */
    ],
    result: "void", /* void */
  },
  SDL_GetError: {
    parameters: [],
    result: "pointer", /* char* */
  },
  SDL_GetSystemRAM: {
    parameters: [],
    result: "i32", /* int */
  },
  SDL_GetTicks: {
    parameters: [],
    result: "u32", /* Uint32 */
  },
  SDL_GetTicks64: {
    parameters: [],
    result: "u64", /* Uint64 */
  },
  SDL_GetWindowSurface: {
    parameters: [
      "pointer", /* SDL_Window* window */
    ],
    result: "pointer", /* SDL_Surface* */
  },
  SDL_Init: {
    parameters: [
      "u32", /* Uint32 flags */
    ],
    result: "i32", /* int */
  },
  SDL_LoadBMP_RW: {
    parameters: [
      "pointer", /* SDL_RWops* src */
      "i32", /* int freesrc */
    ],
    result: "pointer", /* SDL_Surface* */
  },
  SDL_LockSurface: {
    parameters: [
      "pointer", /* SDL_Surface* surface */
    ],
    result: "i32", /* int */
  },
  SDL_MapRGB: {
    parameters: [
      "pointer", /* SDL_PixelFormat* format */
      "u8", /* Uint8 r */
      "u8", /* Uint8 g */
      "u8", /* Uint8 b */
    ],
    result: "u32", /* Uint32 */
  },
  SDL_MapRGBA: {
    parameters: [
      "pointer", /* SDL_PixelFormat* format */
      "u8", /* Uint8 r */
      "u8", /* Uint8 g */
      "u8", /* Uint8 b */
      "u8", /* Uint8 a */
    ],
    result: "u32", /* Uint32 */
  },
  SDL_MaximizeWindow: {
    parameters: [
      "pointer", /* SDL_Window* window */
    ],
    result: "void", /* void */
  },
  SDL_MinimizeWindow: {
    parameters: [
      "pointer", /* SDL_Window* window */
    ],
    result: "void", /* void */
  },
  SDL_PollEvent: {
    parameters: [
      "pointer", /* SDL_Event* event */
    ],
    result: "i32", /* int */
  },
  SDL_Quit: {
    parameters: [],
    result: "void", /* void */
  },
  SDL_RenderClear: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
    ],
    result: "i32", /* int */
  },
  SDL_RenderFillRect: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Rect* rect */
    ],
    result: "i32", /* int */
  },
  SDL_RenderFlush: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
    ],
    result: "i32", /* int */
  },
  SDL_RenderPresent: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
    ],
    result: "void", /* void */
  },
  SDL_RestoreWindow: {
    parameters: [
      "pointer", /* SDL_Window* window */
    ],
    result: "void", /* void */
  },
  SDL_RWFromFile: {
    parameters: [
      "pointer", /* char* file */
      "pointer", /* char* mode */
    ],
    result: "pointer", /* SDL_RWops* */
  },
  SDL_SetRenderDrawColor: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "u8", /* Uint8 r */
      "u8", /* Uint8 g */
      "u8", /* Uint8 b */
      "u8", /* Uint8 a */
    ],
    result: "i32", /* int */
  },
  SDL_UnlockSurface: {
    parameters: [
      "pointer", /* SDL_Surface* surface */
    ],
    result: "void", /* void */
  },
  SDL_UpdateWindowSurface: {
    parameters: [
      "pointer", /* SDL_Window* window */
    ],
    result: "i32", /* int */
  },
};
