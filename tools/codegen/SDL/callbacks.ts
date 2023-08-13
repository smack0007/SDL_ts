import { CodeGenCallbacks } from "../types.ts";

export const callbacks: CodeGenCallbacks = {
  SDL_EventFilter: {
    parameters: {
      userdata: {
        type: "void*",
        nullable: true,
      },
      event: {
        type: "SDL_Event*",
      },
    },
    result: {
      type: "int",
    },
  },
};
