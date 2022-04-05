export interface CodeGenFunctionParam {
  nativeType: string;
  type: Deno.NativeType;
  nullable?: boolean; 
}

export interface CodeGenFunction {
  parameters: Record<string, CodeGenFunctionParam>;

  result: {
    nativeType: string;
    type: Deno.NativeType;
  };
}

export const functions: Record<string, CodeGenFunction> = {
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
        nullable: true
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
