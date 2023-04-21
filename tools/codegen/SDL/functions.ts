import { CodeGenFunctions } from "../types.ts";

export const functions: CodeGenFunctions = {
  SDL_BlitScaled: {
    symbolName: "SDL_UpperBlitScaled",
    parameters: {
      src: {
        type: "SDL_Surface*",
      },
      srcrect: {
        type: "SDL_Rect*",
        nullable: true,
      },
      dst: {
        type: "SDL_Surface*",
      },
      dstrect: {
        type: "SDL_Rect*",
        nullable: true,
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_BlitSurface: {
    symbolName: "SDL_UpperBlit",
    parameters: {
      src: {
        type: "SDL_Surface*",
      },
      srcrect: {
        type: "SDL_Rect*",

        nullable: true,
      },
      dst: {
        type: "SDL_Surface*",
      },
      dstrect: {
        type: "SDL_Rect*",

        nullable: true,
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_ConvertSurface: {
    parameters: {
      src: {
        type: "SDL_Surface*",
      },
      fmt: {
        type: "SDL_PixelFormat*",
      },
      flags: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  SDL_CreateRenderer: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      index: {
        type: "int",
      },
      flags: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Renderer*",
    },
  },

  SDL_CreateRGBSurface: {
    parameters: {
      flags: {
        type: "Uint32",
      },
      width: {
        type: "int",
      },
      height: {
        type: "int",
      },
      depth: {
        type: "int",
      },
      Rmask: {
        type: "Uint32",
      },
      Gmask: {
        type: "Uint32",
      },
      Bmask: {
        type: "Uint32",
      },
      Amask: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  SDL_CreateRGBSurfaceFrom: {
    parameters: {
      pixels: {
        type: "void*",
      },
      width: {
        type: "int",
      },
      height: {
        type: "int",
      },
      depth: {
        type: "int",
      },
      pitch: {
        type: "int",
      },
      Rmask: {
        type: "Uint32",
      },
      Gmask: {
        type: "Uint32",
      },
      Bmask: {
        type: "Uint32",
      },
      Amask: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  SDL_CreateRGBSurfaceWithFormat: {
    parameters: {
      flags: {
        type: "Uint32",
      },
      width: {
        type: "int",
      },
      height: {
        type: "int",
      },
      depth: {
        type: "int",
      },
      format: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  SDL_CreateTexture: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      format: {
        type: "Uint32",
      },
      access: {
        type: "int",
      },
      w: {
        type: "int",
      },
      h: {
        type: "int",
      },
    },
    result: {
      type: "SDL_Texture*",
    },
  },

  SDL_CreateTextureFromSurface: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "SDL_Texture*",
    },
  },

  SDL_CreateWindow: {
    parameters: {
      title: {
        type: "char*",
      },
      x: {
        type: "int",
        overrideType: "WindowPos | i32",
      },
      y: {
        type: "int",
        overrideType: "WindowPos | i32",
      },
      w: {
        type: "int",
      },
      h: {
        type: "int",
      },
      flags: {
        type: "Uint32",
        overrideType: "WindowFlags",
      },
    },
    result: {
      type: "SDL_Window*",
    },
    overloads: [
      {
        parameters: {
          x: { overrideType: "WindowPos" },
          y: { overrideType: "WindowPos" },
        },
      },
      {
        parameters: {
          x: { overrideType: "i32" },
          y: { overrideType: "i32" },
        },
      },
    ],
  },

  SDL_CreateWindowAndRenderer: {
    parameters: {
      width: {
        type: "int",
      },
      height: {
        type: "int",
      },
      window_flags: {
        type: "Uint32",
        overrideType: "WindowFlags",
      },
      window: {
        type: "SDL_Window**",
      },
      renderer: {
        type: "SDL_Renderer**",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_Delay: {
    parameters: {
      ms: {
        type: "Uint32",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_DestroyRenderer: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_DestroyTexture: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_DestroyWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_FillRect: {
    parameters: {
      dst: {
        type: "SDL_Surface*",
      },
      rect: {
        type: "SDL_Rect*",

        nullable: true,
      },
      color: {
        type: "Uint32",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_FreeSurface: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_GetColorKey: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
      key: {
        type: "Uint32*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_GetError: {
    parameters: {},
    result: {
      type: "char*",
    },
  },

  SDL_GetKeyboardState: {
    parameters: {
      numkeys: {
        type: "int*",
        nullable: true,
      },
    },
    result: {
      type: "Uint8*",
    },
  },

  SDL_GetRendererInfo: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      info: {
        type: "SDL_RendererInfo*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_GetRevision: {
    parameters: {},
    result: {
      type: "char*",
    },
  },

  SDL_GetScancodeFromKey: {
    parameters: {
      key: {
        type: "SDL_Keycode",
      },
    },
    result: {
      type: "SDL_Scancode",
    },
  },

  SDL_GetScancodeName: {
    parameters: {
      scancode: {
        type: "SDL_Scancode",
      },
    },
    result: {
      type: "char*",
    },
  },

  SDL_GetSystemRAM: {
    parameters: {},
    result: {
      type: "int",
    },
  },

  SDL_GetTextureAlphaMod: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      alpha: {
        type: "Uint8*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_GetTextureBlendMode: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      blendMode: {
        type: "SDL_BlendMode*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_GetTextureColorMod: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      r: {
        type: "Uint8*",
      },
      g: {
        type: "Uint8*",
      },
      b: {
        type: "Uint8*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_GetTicks: {
    parameters: {},
    result: {
      type: "Uint32",
    },
  },

  SDL_GetTicks64: {
    parameters: {},
    result: {
      type: "Uint64",
    },
  },

  SDL_GetVersion: {
    parameters: {
      ver: {
        type: "SDL_version*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_GetWindowSurface: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  SDL_GetWindowTitle: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "char*",
    },
  },

  SDL_HasColorKey: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },

  SDL_Init: {
    parameters: {
      flags: {
        type: "Uint32",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_LoadBMP_RW: {
    parameters: {
      src: {
        type: "SDL_RWops*",
      },
      freesrc: {
        type: "int",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  SDL_LockSurface: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_MapRGB: {
    parameters: {
      format: {
        type: "SDL_PixelFormat*",
      },
      r: {
        type: "Uint8",
      },
      g: {
        type: "Uint8",
      },
      b: {
        type: "Uint8",
      },
    },
    result: {
      type: "Uint32",
    },
  },

  SDL_MapRGBA: {
    parameters: {
      format: {
        type: "SDL_PixelFormat*",
      },
      r: {
        type: "Uint8",
      },
      g: {
        type: "Uint8",
      },
      b: {
        type: "Uint8",
      },
      a: {
        type: "Uint8",
      },
    },
    result: {
      type: "Uint32",
    },
  },

  SDL_MaximizeWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_MinimizeWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_PollEvent: {
    parameters: {
      event: {
        type: "SDL_Event*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_QueryTexture: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      format: {
        type: "Uint32*",
        nullable: true,
      },
      access: {
        type: "int*",
        nullable: true,
      },
      w: {
        type: "int*",
      },
      h: {
        type: "int*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_Quit: {
    parameters: {},
    result: {
      type: "void",
    },
  },

  SDL_RenderClear: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderCopy: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      texture: {
        type: "SDL_Texture*",
      },
      srcrect: {
        type: "SDL_Rect*",

        nullable: true,
      },
      dstrect: {
        type: "SDL_Rect*",

        nullable: true,
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderCopyEx: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      texture: {
        type: "SDL_Texture*",
      },
      srcrect: {
        type: "SDL_Rect*",
      },
      dstrect: {
        type: "SDL_Rect*",
      },
      angle: {
        type: "double",
      },
      center: {
        type: "SDL_Point*",
      },
      flip: {
        type: "SDL_RendererFlip",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderDrawLine: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      x1: {
        type: "int",
      },
      y1: {
        type: "int",
      },
      x2: {
        type: "int",
      },
      y2: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderDrawLines: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      points: {
        type: "SDL_Point*",
      },
      count: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderDrawPoint: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      x: {
        type: "int",
      },
      y: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderDrawPoints: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      points: {
        type: "SDL_Point*",
      },
      count: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderDrawRect: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      rect: {
        type: "SDL_Rect*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderDrawRects: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      rects: {
        type: "SDL_Rect*",
      },
      count: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderFillRect: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      rect: {
        type: "SDL_Rect*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderFillRects: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      rects: {
        type: "SDL_Rect*",
      },
      count: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderFlush: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_RenderPresent: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_RestoreWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_RWFromFile: {
    parameters: {
      file: {
        type: "char*",
      },
      mode: {
        type: "char*",

        overrideType: "RWMode",
      },
    },
    result: {
      type: "SDL_RWops*",
    },
  },

  SDL_SetColorKey: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
      flag: {
        type: "int",
      },
      key: {
        type: "Uint32",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_SetRenderDrawBlendMode: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      blendMode: {
        type: "SDL_BlendMode",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_SetRenderDrawColor: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      r: {
        type: "Uint8",
      },
      g: {
        type: "Uint8",
      },
      b: {
        type: "Uint8",
      },
      a: {
        type: "Uint8",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_SetSurfaceBlendMode: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
      blendMode: {
        type: "SDL_BlendMode",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_SetTextureAlphaMod: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      alpha: {
        type: "Uint8",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_SetTextureBlendMode: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      blendMode: {
        type: "SDL_BlendMode",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_SetTextureColorMod: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      r: {
        type: "Uint8",
      },
      g: {
        type: "Uint8",
      },
      b: {
        type: "Uint8",
      },
    },
    result: {
      type: "int",
    },
  },

  SDL_SetWindowTitle: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      title: {
        type: "char*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_UnlockSurface: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "void",
    },
  },

  SDL_UpdateWindowSurface: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "int",
    },
  },
} as const;
