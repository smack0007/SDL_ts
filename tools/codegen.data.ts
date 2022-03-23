import { CodeGenFunction } from "./codegen.types.ts";

export const functions: Record<string, CodeGenFunction> = {
  SDL_CreateWindow: {
    parameters: {
      title: "pointer",
      x: "i32",
      y: "i32",
      width: "i32",
      height: "i32",
      flags: "u32",
    },
    result: "pointer",
  },
  SDL_Delay: {
    parameters: { time: "u32" },
    result: "void",
  },
  SDL_DestroyWindow: {
    parameters: { window: "pointer" },
    result: "void",
  },
  SDL_Init: {
    parameters: { flags: "u32" },
    result: "i32",
  },
  SDL_PollEvent: {
    parameters: { event: "pointer" },
    result: "u32",
  },
  SDL_Quit: { parameters: {}, result: "void" },
};
