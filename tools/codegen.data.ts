import { CodeGenFunction } from "./codegen.types.ts";

export const functions: Record<string, CodeGenFunction> = {
  SDL_CreateWindow: {
    parameters: {
      title: ["pointer", "string"],
      x: ["i32", "number"],
      y: ["i32", "number"],
      width: ["i32", "number"],
      height: ["i32", "number"],
      flags: ["u32", "number"],
    },
    result: ["u32", "number"],
  },
  SDL_Delay: {
    parameters: { time: ["u32", "number"] },
    result: ["void", "void"],
  },
  SDL_DestroyWindow: {
    parameters: { window: ["u32", "number"] },
    result: ["void", "void"],
  },
  SDL_Init: {
    parameters: { flags: ["u32", "number"] },
    result: ["i32", "number"],
  },
  SDL_PollEvent: {
    parameters: { event: ["pointer", "Deno.UnsafePointer"] },
    result: ["u32", "number"],
  },
  SDL_Quit: { parameters: {}, result: ["void", "void"] },
};
