// This file is auto generated. To update the file make changes to the code generator.

export const symbols = {
  IMG_Init: {
    parameters: [
      /* int flags */ "i32",
    ],
    result: /* int */ "i32",
  },
  IMG_Linked_Version: {
    parameters: [],
    result: /* SDL_version* */ "pointer",
  },
  IMG_Load: {
    parameters: [
      /* char* file */ "pointer",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  IMG_LoadTexture: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* char* file */ "pointer",
    ],
    result: /* SDL_Texture* */ "pointer",
  },
  IMG_Quit: {
    parameters: [],
    result: /* void */ "void",
  },
} as const;
