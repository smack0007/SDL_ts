// This file is auto generated. To update the file make changes to the code generator.

export interface Symbols extends Deno.ForeignLibraryInterface {
  IMG_Init: Deno.ForeignFunction;
  IMG_Load: Deno.ForeignFunction;
  IMG_Quit: Deno.ForeignFunction;
}

export const symbols: Symbols = {
  IMG_Init: {
    parameters: [
      "i32", /* int flags */
    ],
    result: "i32", /* int */
  },
  IMG_Load: {
    parameters: [
      "pointer", /* char* file */
    ],
    result: "pointer", /* SDL_Surface* */
  },
  IMG_Quit: {
    parameters: [],
    result: "void", /* void */
  },
};
