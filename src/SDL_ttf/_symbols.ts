// This file is auto generated. To update the file make changes to the code generator.

export const symbols = {
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
  TTF_RenderText_Blended: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  TTF_RenderText_LCD: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
      /* SDL_Color bg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  TTF_RenderText_Solid: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  TTF_RenderText_Shaded: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
      /* SDL_Color bg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  TTF_RenderUTF8_Blended: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  TTF_RenderUTF8_LCD: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
      /* SDL_Color bg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  TTF_RenderUTF8_Solid: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  TTF_RenderUTF8_Shaded: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* SDL_Color fg */ { "struct": ["u8", "u8", "u8", "u8"] },
      /* SDL_Color bg */ { "struct": ["u8", "u8", "u8", "u8"] },
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  TTF_SizeText: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* int */ "i32",
  },
  TTF_SizeUTF8: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* int */ "i32",
  },
  TTF_SizeUNICODE: {
    parameters: [
      /* TTF_Font* font */ "pointer",
      /* char* text */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* int */ "i32",
  },
} as const;
