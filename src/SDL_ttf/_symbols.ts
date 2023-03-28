// This file is auto generated. To update the file make changes to the code generator.

import { DynamicLibraryInterface } from "../_library.ts";

export const symbols: DynamicLibraryInterface = {
  TTF_Init: {
    parameters: [],
    result: /* int */ "i32",
  },
  TTF_CloseFont: {
    parameters: [
      /* TTF_Font* font */ "pointer",
    ],
    result: /* void */ "void",
  },
  TTF_Linked_Version: {
    parameters: [],
    result: /* SDL_version* */ "pointer",
  },
  TTF_OpenFont: {
    parameters: [
      /* char* file */ "pointer",
      /* int ptsize */ "i32",
    ],
    result: /* TTF_Font* */ "pointer",
  },
  TTF_Quit: {
    parameters: [],
    result: /* void */ "void",
  },
  TTF_RenderText_Solid: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
} as const;
