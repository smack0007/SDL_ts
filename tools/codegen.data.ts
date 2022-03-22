import { CodeGenFunction } from "./codegen.types.ts";

export const functions: Record<string, CodeGenFunction> = {
  SDL_CreateWindow: {
    parameters: [
      ["pointer", "string"],
      ["i32", "number"],
      ["i32", "number"],
      ["i32", "number"],
      ["i32", "number"],
      ["u32", "number"],
    ],
    result: ["u32", "number"],
  },
  SDL_Delay: { parameters: [["u32", "number"]], result: ["void", "void"] },
  SDL_DestroyWindow: {
    parameters: [["u32", "number"]],
    result: ["void", "void"],
  },
  SDL_Init: { parameters: [["u32", "number"]], result: ["i32", "number"] },
  SDL_PollEvent: { parameters: [["u32", "number"]], result: ["u32", "number"] },
  SDL_Quit: { parameters: [], result: ["void", "void"] },
};
