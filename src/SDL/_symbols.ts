// This file is auto generated. To update the file make changes to the code generator.

import { DynamicLibraryInterface } from "../_library.ts";

export const symbols: DynamicLibraryInterface = {
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
  SDL_ConvertSurface: {
    parameters: [
      "pointer", /* SDL_Surface* src */
      "pointer", /* SDL_PixelFormat* fmt */
      "u32", /* Uint32 flags */
    ],
    result: "pointer", /* SDL_Surface* */
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
  SDL_CreateTextureFromSurface: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Surface* surface */
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
  SDL_CreateWindowAndRenderer: {
    parameters: [
      "i32", /* int width */
      "i32", /* int height */
      "u32", /* Uint32 window_flags */
      "pointer", /* SDL_Window** window */
      "pointer", /* SDL_Renderer** renderer */
    ],
    result: "i32", /* int */
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
  SDL_GetKeyboardState: {
    parameters: [
      "pointer", /* int* numkeys */
    ],
    result: "pointer", /* Uint8* */
  },
  SDL_GetRendererInfo: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_RendererInfo* info */
    ],
    result: "i32", /* int */
  },
  SDL_GetRevision: {
    parameters: [],
    result: "pointer", /* char* */
  },
  SDL_GetScancodeFromKey: {
    parameters: [
      "u32", /* SDL_Keycode key */
    ],
    result: "u32", /* SDL_Scancode */
  },
  SDL_GetScancodeName: {
    parameters: [
      "u32", /* SDL_Scancode scancode */
    ],
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
  SDL_GetVersion: {
    parameters: [
      "pointer", /* SDL_version* ver */
    ],
    result: "void", /* void */
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
  SDL_RenderCopy: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Texture* texture */
      "pointer", /* SDL_Rect* srcrect */
      "pointer", /* SDL_Rect* dstrect */
    ],
    result: "i32", /* int */
  },
  SDL_RenderCopyEx: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Texture* texture */
      "pointer", /* SDL_Rect* srcrect */
      "pointer", /* SDL_Rect* dstrect */
      "f64", /* double angle */
      "pointer", /* SDL_Point* center */
      "u32", /* SDL_RendererFlip flip */
    ],
    result: "i32", /* int */
  },
  SDL_RenderDrawLine: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "i32", /* int x1 */
      "i32", /* int y1 */
      "i32", /* int x2 */
      "i32", /* int y2 */
    ],
    result: "i32", /* int */
  },
  SDL_RenderDrawLines: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Point* points */
      "i32", /* int count */
    ],
    result: "i32", /* int */
  },
  SDL_RenderDrawPoint: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "i32", /* int x */
      "i32", /* int y */
    ],
    result: "i32", /* int */
  },
  SDL_RenderDrawPoints: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Point* points */
      "i32", /* int count */
    ],
    result: "i32", /* int */
  },
  SDL_RenderDrawRect: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Rect* rect */
    ],
    result: "i32", /* int */
  },
  SDL_RenderDrawRects: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Rect* rects */
      "i32", /* int count */
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
  SDL_RenderFillRects: {
    parameters: [
      "pointer", /* SDL_Renderer* renderer */
      "pointer", /* SDL_Rect* rects */
      "i32", /* int count */
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
} as const;
