type CodeGenEventType = {
  size: number;
  members: Record<string, {
    type: string;
    offset: number;
  }>;
};

export const events: Record<string, CodeGenEventType> = {
  SDL_CommonEvent: {
    size: 8,
    members: {
      type: {
        type: "u32", /* Uint32 */
        offset: 0,
      },
      timestamp: {
        type: "u32", /* Uint32 */
        offset: 4,
      },
    },
  },

  SDL_DisplayEvent: {
    size: 20,
    members: {
      type: {
        type: "u32", /* Uint32 */
        offset: 0,
      },
      timestamp: {
        type: "u32", /* Uint32 */
        offset: 4,
      },
      display: {
        type: "u32", /* Uint32 */
        offset: 8,
      },
      event: {
        type: "u8", /* Uint8 */
        offset: 12,
      },
      padding1: {
        type: "u8", /* Uint8 */
        offset: 13,
      },
      padding2: {
        type: "u8", /* Uint8 */
        offset: 14,
      },
      padding3: {
        type: "u8", /* Uint8 */
        offset: 15,
      },
      data1: {
        type: "i32", /* Sint32 */
        offset: 16,
      },
    },
  },

  SDL_WindowEvent: {
    size: 24,
    members: {
      type: {
        type: "u32", /* Uint32 */
        offset: 0,
      },
      timestamp: {
        type: "u32", /* Uint32 */
        offset: 4,
      },
      windowID: {
        type: "u32", /* Uint32 */
        offset: 8,
      },
      event: {
        type: "u8", /* Uint8 */
        offset: 12,
      },
      padding1: {
        type: "u8", /* Uint8 */
        offset: 13,
      },
      padding2: {
        type: "u8", /* Uint8 */
        offset: 14,
      },
      padding3: {
        type: "u8", /* Uint8 */
        offset: 15,
      },
      data1: {
        type: "i32", /* Sint32 */
        offset: 16,
      },
      data2: {
        type: "i32", /* Sint32 */
        offset: 20,
      },
    },
  },
};
