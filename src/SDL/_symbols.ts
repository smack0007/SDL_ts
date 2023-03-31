// This file is auto generated. To update the file make changes to the code generator.

import { DynamicLibraryInterface } from "../_library.ts";

export const symbols: DynamicLibraryInterface = {
  SDL_UpperBlitScaled: {
    parameters: [
      /* SDL_Surface* src */ "pointer",
      /* SDL_Rect* srcrect */ "pointer",
      /* SDL_Surface* dst */ "pointer",
      /* SDL_Rect* dstrect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_UpperBlit: {
    parameters: [
      /* SDL_Surface* src */ "pointer",
      /* SDL_Rect* srcrect */ "pointer",
      /* SDL_Surface* dst */ "pointer",
      /* SDL_Rect* dstrect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_ConvertSurface: {
    parameters: [
      /* SDL_Surface* src */ "pointer",
      /* SDL_PixelFormat* fmt */ "pointer",
      /* Uint32 flags */ "u32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_CreateRenderer: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int index */ "i32",
      /* Uint32 flags */ "u32",
    ],
    result: /* SDL_Renderer* */ "pointer",
  },
  SDL_CreateRGBSurface: {
    parameters: [
      /* Uint32 flags */ "u32",
      /* int width */ "i32",
      /* int height */ "i32",
      /* int depth */ "i32",
      /* Uint32 Rmask */ "u32",
      /* Uint32 Gmask */ "u32",
      /* Uint32 Bmask */ "u32",
      /* Uint32 Amask */ "u32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_CreateRGBSurfaceFrom: {
    parameters: [
      /* void* pixels */ "pointer",
      /* int width */ "i32",
      /* int height */ "i32",
      /* int depth */ "i32",
      /* int pitch */ "i32",
      /* Uint32 Rmask */ "u32",
      /* Uint32 Gmask */ "u32",
      /* Uint32 Bmask */ "u32",
      /* Uint32 Amask */ "u32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_CreateRGBSurfaceWithFormat: {
    parameters: [
      /* Uint32 flags */ "u32",
      /* int width */ "i32",
      /* int height */ "i32",
      /* int depth */ "i32",
      /* Uint32 format */ "u32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_CreateTexture: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* Uint32 format */ "u32",
      /* int access */ "i32",
      /* int w */ "i32",
      /* int h */ "i32",
    ],
    result: /* SDL_Texture* */ "pointer",
  },
  SDL_CreateTextureFromSurface: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* SDL_Texture* */ "pointer",
  },
  SDL_CreateWindow: {
    parameters: [
      /* char* title */ "pointer",
      /* int x */ "i32",
      /* int y */ "i32",
      /* int w */ "i32",
      /* int h */ "i32",
      /* Uint32 flags */ "u32",
    ],
    result: /* SDL_Window* */ "pointer",
  },
  SDL_CreateWindowAndRenderer: {
    parameters: [
      /* int width */ "i32",
      /* int height */ "i32",
      /* Uint32 window_flags */ "u32",
      /* SDL_Window** window */ "pointer",
      /* SDL_Renderer** renderer */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_Delay: {
    parameters: [
      /* Uint32 ms */ "u32",
    ],
    result: /* void */ "void",
  },
  SDL_DestroyRenderer: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_DestroyTexture: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_DestroyWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_FillRect: {
    parameters: [
      /* SDL_Surface* dst */ "pointer",
      /* SDL_Rect* rect */ "pointer",
      /* Uint32 color */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_FreeSurface: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetColorKey: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
      /* Uint32* key */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetError: {
    parameters: [],
    result: /* char* */ "pointer",
  },
  SDL_GetKeyboardState: {
    parameters: [
      /* int* numkeys */ "pointer",
    ],
    result: /* Uint8* */ "pointer",
  },
  SDL_GetRendererInfo: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_RendererInfo* info */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetRevision: {
    parameters: [],
    result: /* char* */ "pointer",
  },
  SDL_GetScancodeFromKey: {
    parameters: [
      /* SDL_Keycode key */ "u32",
    ],
    result: /* SDL_Scancode */ "u32",
  },
  SDL_GetScancodeName: {
    parameters: [
      /* SDL_Scancode scancode */ "u32",
    ],
    result: /* char* */ "pointer",
  },
  SDL_GetSystemRAM: {
    parameters: [],
    result: /* int */ "i32",
  },
  SDL_GetTextureAlphaMod: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint8* alpha */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetTextureBlendMode: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* SDL_BlendMode* blendMode */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetTextureColorMod: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint8* r */ "pointer",
      /* Uint8* g */ "pointer",
      /* Uint8* b */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetTicks: {
    parameters: [],
    result: /* Uint32 */ "u32",
  },
  SDL_GetTicks64: {
    parameters: [],
    result: /* Uint64 */ "u64",
  },
  SDL_GetVersion: {
    parameters: [
      /* SDL_version* ver */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetWindowSurface: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_GetWindowTitle: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* char* */ "pointer",
  },
  SDL_HasColorKey: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_Init: {
    parameters: [
      /* Uint32 flags */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_LoadBMP_RW: {
    parameters: [
      /* SDL_RWops* src */ "pointer",
      /* int freesrc */ "i32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_LockSurface: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_MapRGB: {
    parameters: [
      /* SDL_PixelFormat* format */ "pointer",
      /* Uint8 r */ "u8",
      /* Uint8 g */ "u8",
      /* Uint8 b */ "u8",
    ],
    result: /* Uint32 */ "u32",
  },
  SDL_MapRGBA: {
    parameters: [
      /* SDL_PixelFormat* format */ "pointer",
      /* Uint8 r */ "u8",
      /* Uint8 g */ "u8",
      /* Uint8 b */ "u8",
      /* Uint8 a */ "u8",
    ],
    result: /* Uint32 */ "u32",
  },
  SDL_MaximizeWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_MinimizeWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_PollEvent: {
    parameters: [
      /* SDL_Event* event */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_QueryTexture: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint32* format */ "pointer",
      /* int* access */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_Quit: {
    parameters: [],
    result: /* void */ "void",
  },
  SDL_RenderClear: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderCopy: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Texture* texture */ "pointer",
      /* SDL_Rect* srcrect */ "pointer",
      /* SDL_Rect* dstrect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderCopyEx: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Texture* texture */ "pointer",
      /* SDL_Rect* srcrect */ "pointer",
      /* SDL_Rect* dstrect */ "pointer",
      /* double angle */ "f64",
      /* SDL_Point* center */ "pointer",
      /* SDL_RendererFlip flip */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawLine: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* int x1 */ "i32",
      /* int y1 */ "i32",
      /* int x2 */ "i32",
      /* int y2 */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawLines: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Point* points */ "pointer",
      /* int count */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawPoint: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* int x */ "i32",
      /* int y */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawPoints: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Point* points */ "pointer",
      /* int count */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawRect: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Rect* rect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawRects: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Rect* rects */ "pointer",
      /* int count */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderFillRect: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Rect* rect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderFillRects: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Rect* rects */ "pointer",
      /* int count */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderFlush: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderPresent: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_RestoreWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_RWFromFile: {
    parameters: [
      /* char* file */ "pointer",
      /* char* mode */ "pointer",
    ],
    result: /* SDL_RWops* */ "pointer",
  },
  SDL_SetColorKey: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
      /* int flag */ "i32",
      /* Uint32 key */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetRenderDrawColor: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* Uint8 r */ "u8",
      /* Uint8 g */ "u8",
      /* Uint8 b */ "u8",
      /* Uint8 a */ "u8",
    ],
    result: /* int */ "i32",
  },
  SDL_SetTextureAlphaMod: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint8 alpha */ "u8",
    ],
    result: /* int */ "i32",
  },
  SDL_SetTextureBlendMode: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* SDL_BlendMode blendMode */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetTextureColorMod: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint8 r */ "u8",
      /* Uint8 g */ "u8",
      /* Uint8 b */ "u8",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowTitle: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* char* title */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_UnlockSurface: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_UpdateWindowSurface: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* int */ "i32",
  },
} as const;
