import { CodeGenCallbacks } from "../types.ts";

export const callbacks: CodeGenCallbacks = {
  SDL_AudioCallback: {
    parameters: {
      userdata: {
        type: "void*",
        isNullable: true,
      },
      stream: {
        type: "Uint8*",
      },
      len: {
        type: "int",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_EventFilter: {
    parameters: {
      userdata: {
        type: "void*",
        isNullable: true,
      },
      event: {
        type: "SDL_Event*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_TimerCallback: {
    todo: "Doesn't seem to be supported yet perhaps due to background thread?",
    parameters: {
      interval: {
        type: "Uint32",
      },
      param: {
        type: "void*",
      },
    },
    result: {
      type: "Uint32",
    },
  },
};
