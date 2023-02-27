import { CodeGenFunctionImplementations, CodeGenFunctions } from "../types.ts";

export const functions: CodeGenFunctions = {
  IMG_Init: {
    parameters: {
      flags: {
        type: "int",
        overrideType: "InitFlags",
      },
    },
    result: {
      type: "int",
    },
  },

  IMG_Linked_Version: {
    parameters: {},
    result: {
      type: "SDL_version*",
    },
  },

  IMG_Load: {
    parameters: {
      file: {
        type: "char*",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },

  IMG_LoadTexture: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      file: {
        type: "char*",
      },
    },
    result: {
      type: "SDL_Texture*",
    },
  },

  IMG_Quit: {
    parameters: {},
    result: {
      type: "void",
    },
  },
} as const;

export const functionImplementations: CodeGenFunctionImplementations = {
  IMG_Init: `export function Init(flags: InitFlags, libraryPath?: string): number;
  export function Init(flags: number, libraryPath?: string): number;
  export function Init(flags: InitFlags | number, libraryPath?: string): number {
  _library = Platform.loadLibrary("SDL2_image", symbols, libraryPath);  
  return _library.symbols.IMG_Init(flags) as number;
}`,

  IMG_Quit: `export function Quit(): void {
  _library.symbols.IMG_Quit();
  _library.close();
}`,
} as const;
