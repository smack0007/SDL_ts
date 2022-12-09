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

  IMG_Quit: {
    parameters: {},
    result: {
      type: "void",
    },
  },
} as const;

export const functionImplementations: CodeGenFunctionImplementations = {
  IMG_Init: `export function Init(flags: number, libraryPath?: string): number {
    if (!libraryPath) {
      libraryPath = getLibraryPath("SDL2_image");
    }
  
    _library = loadLibrary(libraryPath, symbols);
  
    return _library.symbols.IMG_Init(flags) as number;
  }`,

  IMG_Quit: `export function Quit(): void {
    _library.symbols.IMG_Quit();
    _library.close();
  }`,
} as const;
