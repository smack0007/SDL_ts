import { CodeGenEvents } from "../types.ts";

export const events: CodeGenEvents = {
  SDL_CommonEvent: {
    size: 8,
    members: {
      type: {
        nativeType: "Uint32",
        type: "u32",
        offset: 0,
      },
      timestamp: {
        nativeType: "Uint32",
        type: "u32",
        offset: 4,
      },
    },
  },

  SDL_DisplayEvent: {
    size: 20,
    members: {
      type: {
        nativeType: "Uint32",
        type: "u32",
        offset: 0,
      },
      timestamp: {
        nativeType: "Uint32",
        type: "u32",
        offset: 4,
      },
      display: {
        nativeType: "Uint32",
        type: "u32",
        offset: 8,
      },
      event: {
        nativeType: "Uint8",
        type: "u8",
        offset: 12,
      },
      padding1: {
        nativeType: "Uint8",
        type: "u8",
        offset: 13,
      },
      padding2: {
        nativeType: "Uint8",
        type: "u8",
        offset: 14,
      },
      padding3: {
        nativeType: "Uint8",
        type: "u8",
        offset: 15,
      },
      data1: {
        nativeType: "Sint32",
        type: "i32",
        offset: 16,
      },
    },
  },

  SDL_KeyboardEvent: {
    unionName: "key",
    size: 32,
    members: {
      type: {
        nativeType: "Uint32",
        type: "u32",
        offset: 0,
      },
      timestamp: {
        nativeType: "Uint32",
        type: "u32",
        offset: 4,
      },
      windowID: {
        nativeType: "Uint32",
        type: "u32",
        offset: 8,
      },
      state: {
        nativeType: "Uint8",
        type: "u8",
        offset: 12,
      },
      repeat: {
        nativeType: "Uint8",
        type: "u8",
        offset: 13,
      },
      padding2: {
        nativeType: "Uint8",
        type: "u8",
        offset: 14,
      },
      padding3: {
        nativeType: "Uint8",
        type: "u8",
        offset: 15,
      },
      keysym: {
        nativeType: "SDL_Keysym",
        type: "struct",
        offset: 16,
      },
    },
  },

  SDL_MouseButtonEvent: {
    size: 28,
    members: {
      type: {
        nativeType: "Uint32",
        type: "u32",
        offset: 0,
      },
      timestamp: {
        nativeType: "Uint32",
        type: "u32",
        offset: 4,
      },
      windowID: {
        nativeType: "Uint32",
        type: "u32",
        offset: 8,
      },
      which: {
        nativeType: "Uint32",
        type: "u32",
        offset: 12,
      },
      button: {
        nativeType: "Uint8",
        type: "u8",
        offset: 16,
      },
      state: {
        nativeType: "Uint8",
        type: "u8",
        offset: 17,
      },
      clicks: {
        nativeType: "Uint8",
        type: "u8",
        offset: 18,
      },
      padding1: {
        nativeType: "Uint8",
        type: "u8",
        offset: 19,
      },
      x: {
        nativeType: "Sint32",
        type: "i32",
        offset: 20,
      },
      y: {
        nativeType: "Sint32",
        type: "i32",
        offset: 24,
      },
    },
  },

  SDL_MouseMotionEvent: {
    size: 36,
    members: {
      type: {
        nativeType: "Uint32",
        type: "u32",
        offset: 0,
      },
      timestamp: {
        nativeType: "Uint32",
        type: "u32",
        offset: 4,
      },
      windowID: {
        nativeType: "Uint32",
        type: "u32",
        offset: 8,
      },
      which: {
        nativeType: "Uint32",
        type: "u32",
        offset: 12,
      },
      state: {
        nativeType: "Uint32",
        type: "u32",
        offset: 16,
      },
      x: {
        nativeType: "Sint32",
        type: "i32",
        offset: 20,
      },
      y: {
        nativeType: "Sint32",
        type: "i32",
        offset: 24,
      },
      xrel: {
        nativeType: "Sint32",
        type: "i32",
        offset: 28,
      },
      yrel: {
        nativeType: "Sint32",
        type: "i32",
        offset: 32,
      },
    },
  },

  SDL_MouseWheelEvent: {
    size: 36,
    members: {
      type: {
        nativeType: "Uint32",
        type: "u32",
        offset: 0,
      },
      timestamp: {
        nativeType: "Uint32",
        type: "u32",
        offset: 4,
      },
      windowID: {
        nativeType: "Uint32",
        type: "u32",
        offset: 8,
      },
      which: {
        nativeType: "Uint32",
        type: "u32",
        offset: 12,
      },
      x: {
        nativeType: "Sint32",
        type: "i32",
        offset: 16,
      },
      y: {
        nativeType: "Sint32",
        type: "i32",
        offset: 20,
      },
      direction: {
        nativeType: "Uint32",
        type: "u32",
        offset: 24,
      },
      preciseX: {
        nativeType: "float",
        type: "f32",
        offset: 28,
      },
      preciseY: {
        nativeType: "float",
        type: "f32",
        offset: 32,
      },
    },
  },

  SDL_WindowEvent: {
    size: 24,
    members: {
      type: {
        nativeType: "Uint32",
        type: "u32",
        offset: 0,
      },
      timestamp: {
        nativeType: "Uint32",
        type: "u32",
        offset: 4,
      },
      windowID: {
        nativeType: "Uint32",
        type: "u32",
        offset: 8,
      },
      event: {
        nativeType: "Uint8",
        type: "u8",
        offset: 12,
      },
      padding1: {
        nativeType: "Uint8",
        type: "u8",
        offset: 13,
      },
      padding2: {
        nativeType: "Uint8",
        type: "u8",
        offset: 14,
      },
      padding3: {
        nativeType: "Uint8",
        type: "u8",
        offset: 15,
      },
      data1: {
        nativeType: "Sint32",
        type: "i32",
        offset: 16,
      },
      data2: {
        nativeType: "Sint32",
        type: "i32",
        offset: 20,
      },
    },
  },
};
