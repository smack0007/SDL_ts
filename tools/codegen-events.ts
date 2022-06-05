import { CodeGenStructType } from "./codegen-structs.ts";

export interface CodeGenEventType extends CodeGenStructType {
  // The name struct has in the event union in cases
  // where the name can simply not be infered (i.e. KeyboardEvent).
  unionName?: string;
}

export const events: Record<string, CodeGenEventType> = {
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
