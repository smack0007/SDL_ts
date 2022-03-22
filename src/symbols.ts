export const symbols = {
  SDL_CreateWindow: {
    parameters: ["pointer", "i32", "i32", "i32", "i32", "u32"],
    result: "u32",
  },
  SDL_Delay: { parameters: ["u32"], result: "void" },
  SDL_DestroyWindow: { parameters: ["u32"], result: "void" },
  SDL_Init: { parameters: ["u32"], result: "i32" },
  SDL_PollEvent: { parameters: ["pointer"], result: "u32" },
  SDL_Quit: { parameters: [], result: "void" },
} as const;

export type Symbols = {
  [K in keyof typeof symbols]: Deno.ForeignFunction;
};
