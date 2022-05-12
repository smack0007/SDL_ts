export interface CodeGenFunctionParam {
  // SDL type.
  nativeType: string;

  // FFI type.
  type: Deno.NativeType;

  // Can the parameter be null.
  nullable?: boolean;

  // If set this type will be used as the deno type.
  overrideType?: string;
}

export interface CodeGenFunction {
  // Some functions are (i.e. SDL_BlitSurface) are just
  // macros that proxy to another name.
  symbolName?: string;

  parameters: Record<string, CodeGenFunctionParam>;

  result: {
    nativeType: string;
    type: Deno.NativeType;
  };
}

export const functions: Record<string, CodeGenFunction> = {
  SDL_BlitScaled: {
    symbolName: "SDL_UpperBlitScaled",
    parameters: {
      src: {
        nativeType: "SDL_Surface*",
        type: "pointer",
      },
      srcrect: {
        nativeType: "SDL_Rect*",
        type: "pointer",
        nullable: true,
      },
      dst: {
        nativeType: "SDL_Surface*",
        type: "pointer",
      },
      dstrect: {
        nativeType: "SDL_Rect*",
        type: "pointer",
        nullable: true,
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_BlitSurface: {
    symbolName: "SDL_UpperBlit",
    parameters: {
      src: {
        nativeType: "SDL_Surface*",
        type: "pointer",
      },
      srcrect: {
        nativeType: "SDL_Rect*",
        type: "pointer",
        nullable: true,
      },
      dst: {
        nativeType: "SDL_Surface*",
        type: "pointer",
      },
      dstrect: {
        nativeType: "SDL_Rect*",
        type: "pointer",
        nullable: true,
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_CreateRenderer: {
    parameters: {
      window: {
        nativeType: "SDL_Window*",
        type: "pointer",
      },
      index: {
        nativeType: "int",
        type: "i32",
      },
      flags: {
        nativeType: "Uint32",
        type: "u32",
      },
    },
    result: {
      nativeType: "SDL_Renderer*",
      type: "pointer",
    },
  },

  SDL_CreateRGBSurfaceFrom: {
    parameters: {
      pixels: {
        nativeType: "void*",
        type: "pointer",
      },
      width: {
        nativeType: "int",
        type: "i32",
      },
      height: {
        nativeType: "int",
        type: "i32",
      },
      depth: {
        nativeType: "int",
        type: "i32",
      },
      pitch: {
        nativeType: "int",
        type: "i32",
      },
      Rmask: {
        nativeType: "Uint32",
        type: "u32",
      },
      Gmask: {
        nativeType: "Uint32",
        type: "u32",
      },
      Bmask: {
        nativeType: "Uint32",
        type: "u32",
      },
      Amask: {
        nativeType: "Uint32",
        type: "u32",
      },
    },
    result: {
      nativeType: "SDL_Surface*",
      type: "pointer",
    },
  },

  SDL_CreateRGBSurfaceWithFormat: {
    parameters: {
      flags: {
        nativeType: "Uint32",
        type: "u32",
      },
      width: {
        nativeType: "int",
        type: "i32",
      },
      height: {
        nativeType: "int",
        type: "i32",
      },
      depth: {
        nativeType: "int",
        type: "i32",
      },
      format: {
        nativeType: "Uint32",
        type: "u32",
      },
    },
    result: {
      nativeType: "SDL_Surface*",
      type: "pointer",
    },
  },

  SDL_CreateTexture: {
    parameters: {
      renderer: {
        nativeType: "SDL_Renderer*",
        type: "pointer",
      },
      format: {
        nativeType: "Uint32",
        type: "u32",
      },
      access: {
        nativeType: "int",
        type: "i32",
      },
      w: {
        nativeType: "int",
        type: "i32",
      },
      h: {
        nativeType: "int",
        type: "i32",
      },
    },
    result: {
      nativeType: "SDL_Texture*",
      type: "pointer",
    },
  },

  SDL_CreateWindow: {
    parameters: {
      title: {
        nativeType: "char*",
        type: "pointer",
      },
      x: {
        nativeType: "int",
        type: "i32",
      },
      y: {
        nativeType: "int",
        type: "i32",
      },
      w: {
        nativeType: "int",
        type: "i32",
      },
      h: {
        nativeType: "int",
        type: "i32",
      },
      flags: {
        nativeType: "Uint32",
        type: "u32",
      },
    },
    result: {
      nativeType: "SDL_Window*",
      type: "pointer",
    },
  },

  SDL_Delay: {
    parameters: {
      ms: {
        nativeType: "Uint32",
        type: "u32",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_DestroyRenderer: {
    parameters: {
      renderer: {
        nativeType: "SDL_Renderer*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_DestroyTexture: {
    parameters: {
      texture: {
        nativeType: "SDL_Texture*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_DestroyWindow: {
    parameters: {
      window: {
        nativeType: "SDL_Window*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_FillRect: {
    parameters: {
      dst: {
        nativeType: "SDL_Surface*",
        type: "pointer",
      },
      rect: {
        nativeType: "SDL_Rect*",
        type: "pointer",
        nullable: true,
      },
      color: {
        nativeType: "Uint32",
        type: "u32",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_FreeSurface: {
    parameters: {
      surface: {
        nativeType: "SDL_Surface*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_GetError: {
    parameters: {},
    result: {
      nativeType: "char*",
      type: "pointer",
    },
  },

  SDL_GetSystemRAM: {
    parameters: {},
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_GetTicks: {
    parameters: {},
    result: {
      nativeType: "Uint32",
      type: "u32",
    },
  },

  SDL_GetTicks64: {
    parameters: {},
    result: {
      nativeType: "Uint64",
      type: "u64",
    },
  },

  SDL_GetWindowSurface: {
    parameters: {
      window: {
        nativeType: "SDL_Window*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "SDL_Surface*",
      type: "pointer",
    },
  },

  SDL_Init: {
    parameters: {
      flags: {
        nativeType: "Uint32",
        type: "u32",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_LoadBMP_RW: {
    parameters: {
      src: {
        nativeType: "SDL_RWops*",
        type: "pointer",
      },
      freesrc: {
        nativeType: "int",
        type: "i32",
      },
    },
    result: {
      nativeType: "SDL_Surface*",
      type: "pointer",
    },
  },

  SDL_LockSurface: {
    parameters: {
      surface: {
        nativeType: "SDL_Surface*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_MapRGB: {
    parameters: {
      format: {
        nativeType: "SDL_PixelFormat*",
        type: "pointer",
      },
      r: {
        nativeType: "Uint8",
        type: "u8",
      },
      g: {
        nativeType: "Uint8",
        type: "u8",
      },
      b: {
        nativeType: "Uint8",
        type: "u8",
      },
    },
    result: {
      nativeType: "Uint32",
      type: "u32",
    },
  },

  SDL_MapRGBA: {
    parameters: {
      format: {
        nativeType: "SDL_PixelFormat*",
        type: "pointer",
      },
      r: {
        nativeType: "Uint8",
        type: "u8",
      },
      g: {
        nativeType: "Uint8",
        type: "u8",
      },
      b: {
        nativeType: "Uint8",
        type: "u8",
      },
      a: {
        nativeType: "Uint8",
        type: "u8",
      },
    },
    result: {
      nativeType: "Uint32",
      type: "u32",
    },
  },

  SDL_MaximizeWindow: {
    parameters: {
      window: {
        nativeType: "SDL_Window*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_MinimizeWindow: {
    parameters: {
      window: {
        nativeType: "SDL_Window*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_PollEvent: {
    parameters: {
      event: {
        nativeType: "SDL_Event*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_Quit: {
    parameters: {},
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_RenderClear: {
    parameters: {
      renderer: {
        nativeType: "SDL_Renderer*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_RenderFillRect: {
    parameters: {
      renderer: {
        nativeType: "SDL_Renderer*",
        type: "pointer",
      },
      rect: {
        nativeType: "SDL_Rect*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_RenderFlush: {
    parameters: {
      renderer: {
        nativeType: "SDL_Renderer*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_RenderPresent: {
    parameters: {
      renderer: {
        nativeType: "SDL_Renderer*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_RestoreWindow: {
    parameters: {
      window: {
        nativeType: "SDL_Window*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_RWFromFile: {
    parameters: {
      file: {
        nativeType: "char*",
        type: "pointer",
      },
      mode: {
        nativeType: "char*",
        type: "pointer",
        overrideType: "RWMode",
      },
    },
    result: {
      nativeType: "SDL_RWops*",
      type: "pointer",
    },
  },

  SDL_SetRenderDrawColor: {
    parameters: {
      renderer: {
        nativeType: "SDL_Renderer*",
        type: "pointer",
      },
      r: {
        nativeType: "Uint8",
        type: "u8",
      },
      g: {
        nativeType: "Uint8",
        type: "u8",
      },
      b: {
        nativeType: "Uint8",
        type: "u8",
      },
      a: {
        nativeType: "Uint8",
        type: "u8",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },

  SDL_UnlockSurface: {
    parameters: {
      surface: {
        nativeType: "SDL_Surface*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "void",
      type: "void",
    },
  },

  SDL_UpdateWindowSurface: {
    parameters: {
      window: {
        nativeType: "SDL_Window*",
        type: "pointer",
      },
    },
    result: {
      nativeType: "int",
      type: "i32",
    },
  },
};

export const functionImplementations: Record<string, string> = {
  SDL_Init: `export function Init(flags: number, libraryPath?: string): number {
  // TODO: Improve this logic.
  if (!libraryPath) {
    libraryPath = "sdl2";
  }

  context.library = Deno.dlopen(libraryPath, symbols);
  context.symbols = context.library.symbols;

  return context.symbols.SDL_Init(flags) as number;
}`,

  SDL_Quit: `export function Quit(): void {
  context.symbols.SDL_Quit();
  context.library.close();
}`,
} as const;
