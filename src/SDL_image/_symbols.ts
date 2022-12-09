// This file is auto generated. To update the file make changes to the code generator.

import { DynamicLibraryInterface } from "../_library.ts";

export const symbols: DynamicLibraryInterface = {
  IMG_Init: {
    parameters: [
      "i32", /* int flags */
    ],
    result: "i32", /* int */
  },
  IMG_Linked_Version: {
    parameters: [],
    result: "pointer", /* SDL_version* */
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
} as const;
