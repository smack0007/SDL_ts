import { CodeGenStructType } from "./codegen-structs.ts";

export const events: Record<string, CodeGenStructType> = {
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
