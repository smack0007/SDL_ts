import { CodeGenFunctionImplementations, CodeGenFunctions } from "../types.ts";

export const functions: CodeGenFunctions = {
  TTF_Init: {
    parameters: {},
    result: {
      type: "int",
    },
  },

  TTF_CloseFont: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
    },
    result: {
      type: "void",
    },
  },

  TTF_Linked_Version: {
    parameters: {},
    result: {
      type: "SDL_version*",
    },
  },

  TTF_OpenFont: {
    parameters: {
      file: {
        type: "char*",
      },
      ptsize: {
        type: "int",
      },
    },
    result: {
      type: "TTF_Font*",
    },
  },

  TTF_Quit: {
    parameters: {},
    result: {
      type: "void",
    },
  },

  TTF_RenderText_Blended: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
      },
      fg: {
        type: "SDL_Color",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  TTF_RenderText_LCD: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
      },
      fg: {
        type: "SDL_Color",
      },
      bg: {
        type: "SDL_Color",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  TTF_RenderText_Solid: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
      },
      fg: {
        type: "SDL_Color",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  TTF_RenderText_Shaded: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
      },
      fg: {
        type: "SDL_Color",
      },
      bg: {
        type: "SDL_Color",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  TTF_RenderUTF8_Blended: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
      },
      fg: {
        type: "SDL_Color",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  TTF_RenderUTF8_LCD: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
      },
      fg: {
        type: "SDL_Color",
      },
      bg: {
        type: "SDL_Color",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  TTF_RenderUTF8_Solid: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
      },
      fg: {
        type: "SDL_Color",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  TTF_RenderUTF8_Shaded: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
      },
      fg: {
        type: "SDL_Color",
      },
      bg: {
        type: "SDL_Color",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  TTF_SizeText: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
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

  TTF_SizeUTF8: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
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

  TTF_SizeUNICODE: {
    parameters: {
      font: {
        type: "TTF_Font*",
      },
      text: {
        type: "char*",
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
} as const;

export const functionImplementations: CodeGenFunctionImplementations = {
  TTF_Init: `export function Init(libraryPath?: string): number {
  _library = Platform.loadLibrary("SDL2_ttf", symbols, libraryPath);  
  return _library.symbols.TTF_Init() as number;
}`,

  TTF_Quit: `export function Quit(): void {
  _library.symbols.TTF_Quit();
  _library.close();
}`,
} as const;
