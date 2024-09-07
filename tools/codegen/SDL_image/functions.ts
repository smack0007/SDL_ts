import { CodeGenFunctions } from "../types.ts";

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
    checkForError: true,
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
    checkForError: true,
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
