import { CodeGenFunctions } from "../types.ts";

export const functions: CodeGenFunctions = {
  TTF_Init: {
    parameters: {},
    result: {
      type: "int",
    },
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
    checkForError: true,
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
        isOutput: true,
      },
      h: {
        type: "int*",
        isOutput: true,
      },
    },
    result: {
      type: "int",
    },
    checkForError: true,
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
    checkForError: true,
  },
} as const;
