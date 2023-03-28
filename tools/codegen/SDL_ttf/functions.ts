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
