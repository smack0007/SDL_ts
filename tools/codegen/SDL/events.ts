import { CodeGenEvents } from "../types.ts";

export const events: CodeGenEvents = {
  SDL_CommonEvent: {
    size: 8,
    members: {
      type: {
        type: "Uint32",
        overrideType: "EventType",
        offset: 0,
      },
      timestamp: {
        type: "Uint32",
        offset: 4,
      },
    },
  },

  SDL_DisplayEvent: {
    size: 20,
    members: {
      type: {
        type: "Uint32",
        overrideType: "EventType",
        offset: 0,
      },
      timestamp: {
        type: "Uint32",

        offset: 4,
      },
      display: {
        type: "Uint32",

        offset: 8,
      },
      event: {
        type: "Uint8",
        offset: 12,
      },
      padding1: {
        type: "Uint8",
        offset: 13,
      },
      padding2: {
        type: "Uint8",
        offset: 14,
      },
      padding3: {
        type: "Uint8",
        offset: 15,
      },
      data1: {
        type: "Sint32",
        offset: 16,
      },
    },
  },

  SDL_KeyboardEvent: {
    unionName: "key",
    size: 32,
    members: {
      type: {
        type: "Uint32",
        overrideType: "EventType",
        offset: 0,
      },
      timestamp: {
        type: "Uint32",

        offset: 4,
      },
      windowID: {
        type: "Uint32",

        offset: 8,
      },
      state: {
        type: "Uint8",
        offset: 12,
      },
      repeat: {
        type: "Uint8",
        offset: 13,
      },
      padding2: {
        type: "Uint8",
        offset: 14,
      },
      padding3: {
        type: "Uint8",
        offset: 15,
      },
      keysym: {
        type: "SDL_Keysym",
        offset: 16,
      },
    },
  },

  SDL_MouseButtonEvent: {
    size: 28,
    members: {
      type: {
        type: "Uint32",
        overrideType: "EventType",
        offset: 0,
      },
      timestamp: {
        type: "Uint32",
        offset: 4,
      },
      windowID: {
        type: "Uint32",
        offset: 8,
      },
      which: {
        type: "Uint32",
        offset: 12,
      },
      button: {
        type: "Uint8",
        offset: 16,
      },
      state: {
        type: "Uint8",
        offset: 17,
      },
      clicks: {
        type: "Uint8",
        offset: 18,
      },
      padding1: {
        type: "Uint8",
        offset: 19,
      },
      x: {
        type: "Sint32",
        offset: 20,
      },
      y: {
        type: "Sint32",
        offset: 24,
      },
    },
  },

  SDL_MouseMotionEvent: {
    size: 36,
    members: {
      type: {
        type: "Uint32",
        overrideType: "EventType",
        offset: 0,
      },
      timestamp: {
        type: "Uint32",
        offset: 4,
      },
      windowID: {
        type: "Uint32",
        offset: 8,
      },
      which: {
        type: "Uint32",
        offset: 12,
      },
      state: {
        type: "Uint32",
        offset: 16,
      },
      x: {
        type: "Sint32",
        offset: 20,
      },
      y: {
        type: "Sint32",
        offset: 24,
      },
      xrel: {
        type: "Sint32",
        offset: 28,
      },
      yrel: {
        type: "Sint32",
        offset: 32,
      },
    },
  },

  SDL_MouseWheelEvent: {
    size: 36,
    members: {
      type: {
        type: "Uint32",
        overrideType: "EventType",
        offset: 0,
      },
      timestamp: {
        type: "Uint32",
        offset: 4,
      },
      windowID: {
        type: "Uint32",
        offset: 8,
      },
      which: {
        type: "Uint32",
        offset: 12,
      },
      x: {
        type: "Sint32",
        offset: 16,
      },
      y: {
        type: "Sint32",
        offset: 20,
      },
      direction: {
        type: "Uint32",
        offset: 24,
      },
      preciseX: {
        type: "float",
        offset: 28,
      },
      preciseY: {
        type: "float",
        offset: 32,
      },
    },
  },

  SDL_WindowEvent: {
    size: 24,
    members: {
      type: {
        type: "Uint32",
        overrideType: "EventType",
        offset: 0,
      },
      timestamp: {
        type: "Uint32",
        offset: 4,
      },
      windowID: {
        type: "Uint32",
        offset: 8,
      },
      event: {
        type: "Uint8",
        overrideType: "WindowEventID",
        offset: 12,
      },
      padding1: {
        type: "Uint8",
        offset: 13,
      },
      padding2: {
        type: "Uint8",
        offset: 14,
      },
      padding3: {
        type: "Uint8",
        offset: 15,
      },
      data1: {
        type: "Sint32",
        offset: 16,
      },
      data2: {
        type: "Sint32",
        offset: 20,
      },
    },
  },
} as const;
