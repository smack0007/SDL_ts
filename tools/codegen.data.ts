export const enums: Record<string, Record<string, string>> = {
  SDL_EventType: {
    SDL_FIRSTEVENT: "0",
    SDL_QUIT: "0x100",
    SDL_APP_TERMINATING: "257",
    SDL_APP_LOWMEMORY: "258",
    SDL_APP_WILLENTERBACKGROUND: "259",
    SDL_APP_DIDENTERBACKGROUND: "260",
    SDL_APP_WILLENTERFOREGROUND: "261",
    SDL_APP_DIDENTERFOREGROUND: "262",
    SDL_LOCALECHANGED: "263",
    SDL_DISPLAYEVENT: "0x150",
    SDL_WINDOWEVENT: "0x200",
    SDL_SYSWMEVENT: "513",
    SDL_KEYDOWN: "0x300",
    SDL_KEYUP: "769",
    SDL_TEXTEDITING: "770",
    SDL_TEXTINPUT: "771",
    SDL_KEYMAPCHANGED: "772",
    SDL_MOUSEMOTION: "0x400",
    SDL_MOUSEBUTTONDOWN: "1025",
    SDL_MOUSEBUTTONUP: "1026",
    SDL_MOUSEWHEEL: "1027",
    SDL_JOYAXISMOTION: "0x600",
    SDL_JOYBALLMOTION: "1537",
    SDL_JOYHATMOTION: "1538",
    SDL_JOYBUTTONDOWN: "1539",
    SDL_JOYBUTTONUP: "1540",
    SDL_JOYDEVICEADDED: "1541",
    SDL_JOYDEVICEREMOVED: "1542",
    SDL_CONTROLLERAXISMOTION: "0x650",
    SDL_CONTROLLERBUTTONDOWN: "1617",
    SDL_CONTROLLERBUTTONUP: "1618",
    SDL_CONTROLLERDEVICEADDED: "1619",
    SDL_CONTROLLERDEVICEREMOVED: "1620",
    SDL_CONTROLLERDEVICEREMAPPED: "1621",
    SDL_CONTROLLERTOUCHPADDOWN: "1622",
    SDL_CONTROLLERTOUCHPADMOTION: "1623",
    SDL_CONTROLLERTOUCHPADUP: "1624",
    SDL_CONTROLLERSENSORUPDATE: "1625",
    SDL_FINGERDOWN: "0x700",
    SDL_FINGERUP: "1793",
    SDL_FINGERMOTION: "1794",
    SDL_DOLLARGESTURE: "0x800",
    SDL_DOLLARRECORD: "2049",
    SDL_MULTIGESTURE: "2050",
    SDL_CLIPBOARDUPDATE: "0x900",
    SDL_DROPFILE: "0x1000",
    SDL_DROPTEXT: "4097",
    SDL_DROPBEGIN: "4098",
    SDL_DROPCOMPLETE: "4099",
    SDL_AUDIODEVICEADDED: "0x1100",
    SDL_AUDIODEVICEREMOVED: "4353",
    SDL_SENSORUPDATE: "0x1200",
    SDL_RENDER_TARGETS_RESET: "0x2000",
    SDL_RENDER_DEVICE_RESET: "8193",
    SDL_POLLSENTINEL: "0x7F00",
    SDL_USEREVENT: "0x8000",
    SDL_LASTEVENT: "0xFFFF",
  },

  SDL_Init: {
    SDL_INIT_TIMER: "0x00000001",
    SDL_INIT_AUDIO: "0x00000010",
    SDL_INIT_VIDEO: "0x00000020",
    SDL_INIT_JOYSTICK: "0x00000200",
    SDL_INIT_HAPTIC: "0x00001000",
    SDL_INIT_GAMECONTROLLER: "0x00002000",
    SDL_INIT_EVENTS: "0x00004000",
    SDL_INIT_SENSOR: "0x00008000",
    SDL_INIT_NOPARACHUTE: "0x00100000",
    SDL_INIT_EVERYTHING:
      "( SDL_INIT_TIMER | SDL_INIT_AUDIO | SDL_INIT_VIDEO | SDL_INIT_EVENTS | SDL_INIT_JOYSTICK | SDL_INIT_HAPTIC | SDL_INIT_GAMECONTROLLER | SDL_INIT_SENSOR )",
  },

  SDL_WindowEventID: {
    SDL_WINDOWEVENT_NONE: "0",
    SDL_WINDOWEVENT_SHOWN: "1",
    SDL_WINDOWEVENT_HIDDEN: "2",
    SDL_WINDOWEVENT_EXPOSED: "3",
    SDL_WINDOWEVENT_MOVED: "4",
    SDL_WINDOWEVENT_RESIZED: "5",
    SDL_WINDOWEVENT_SIZE_CHANGED: "6",
    SDL_WINDOWEVENT_MINIMIZED: "7",
    SDL_WINDOWEVENT_MAXIMIZED: "8",
    SDL_WINDOWEVENT_RESTORED: "9",
    SDL_WINDOWEVENT_ENTER: "10",
    SDL_WINDOWEVENT_LEAVE: "11",
    SDL_WINDOWEVENT_FOCUS_GAINED: "12",
    SDL_WINDOWEVENT_FOCUS_LOST: "13",
    SDL_WINDOWEVENT_CLOSE: "14",
    SDL_WINDOWEVENT_TAKE_FOCUS: "15",
    SDL_WINDOWEVENT_HIT_TEST: "16",
    SDL_WINDOWEVENT_ICCPROF_CHANGED: "17",
    SDL_WINDOWEVENT_DISPLAY_CHANGED: "18",
  },

  SDL_WindowFlags: {
    SDL_WINDOW_FULLSCREEN: "0x00000001",
    SDL_WINDOW_OPENGL: "0x00000002",
    SDL_WINDOW_SHOWN: "0x00000004",
    SDL_WINDOW_HIDDEN: "0x00000008",
    SDL_WINDOW_BORDERLESS: "0x00000010",
    SDL_WINDOW_RESIZABLE: "0x00000020",
    SDL_WINDOW_MINIMIZED: "0x00000040",
    SDL_WINDOW_MAXIMIZED: "0x00000080",
    SDL_WINDOW_MOUSE_GRABBED: "0x00000100",
    SDL_WINDOW_INPUT_FOCUS: "0x00000200",
    SDL_WINDOW_MOUSE_FOCUS: "0x00000400",
    SDL_WINDOW_FULLSCREEN_DESKTOP: "( SDL_WINDOW_FULLSCREEN | 0x00001000 )",
    SDL_WINDOW_FOREIGN: "0x00000800",
    SDL_WINDOW_ALLOW_HIGHDPI: "0x00002000",
    SDL_WINDOW_MOUSE_CAPTURE: "0x00004000",
    SDL_WINDOW_ALWAYS_ON_TOP: "0x00008000",
    SDL_WINDOW_SKIP_TASKBAR: "0x00010000",
    SDL_WINDOW_UTILITY: "0x00020000",
    SDL_WINDOW_TOOLTIP: "0x00040000",
    SDL_WINDOW_POPUP_MENU: "0x00080000",
    SDL_WINDOW_KEYBOARD_GRABBED: "0x00100000",
    SDL_WINDOW_VULKAN: "0x10000000",
    SDL_WINDOW_METAL: "0x20000000",
    SDL_WINDOW_INPUT_GRABBED: "SDL_WINDOW_MOUSE_GRABBED",
  },

  SDL_WindowPos: {
    SDL_WINDOWPOS_UNDEFINED: "0x1fff0000",
    SDL_WINDOWPOS_CENTERED: "0x2FFF0000",
  },
};

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

interface CodeGenFunction {
  parameters: Record<string, Deno.NativeType>;
  result: Deno.NativeType;
}

export const functions: Record<string, CodeGenFunction> = {
  SDL_CreateWindow: {
    parameters: {
      title: "pointer", /* char* */
      x: "i32", /* int */
      y: "i32", /* int */
      w: "i32", /* int */
      h: "i32", /* int */
      flags: "u32", /* Uint32 */
    },
    result: "pointer", /* SDL_Window* */
  },
  SDL_Delay: {
    parameters: {
      ms: "u32", /* Uint32 */
    },
    result: "void", /* void */
  },
  SDL_DestroyWindow: {
    parameters: {
      window: "pointer", /* SDL_Window* */
    },
    result: "void", /* void */
  },
  SDL_FillRect: {
    parameters: {
      dst: "pointer", /* SDL_Surface* */
      rect: "pointer", /* SDL_Rect* */
      color: "u32", /* Uint32 */
    },
    result: "i32", /* int */
  },
  SDL_GetWindowSurface: {
    parameters: {
      window: "pointer", /* SDL_Window* */
    },
    result: "pointer", /* SDL_Surface* */
  },
  SDL_Init: {
    parameters: {
      flags: "u32", /* Uint32 */
    },
    result: "i32", /* int */
  },
  SDL_MapRGB: {
    parameters: {
      format: "pointer", /* SDL_PixelFormat* */
      r: "u8", /* Uint8 */
      g: "u8", /* Uint8 */
      b: "u8", /* Uint8 */
    },
    result: "u32", /* Uint32 */
  },
  SDL_MapRGBA: {
    parameters: {
      format: "pointer", /* SDL_PixelFormat* */
      r: "u8", /* Uint8 */
      g: "u8", /* Uint8 */
      b: "u8", /* Uint8 */
      a: "u8", /* Uint8 */
    },
    result: "u32", /* Uint32 */
  },
  SDL_PollEvent: {
    parameters: {
      event: "pointer", /* SDL_Event* */
    },
    result: "i32", /* int */
  },
  SDL_Quit: {
    parameters: {},
    result: "void", /* void */
  },
  SDL_UpdateWindowSurface: {
    parameters: {
      window: "pointer", /* SDL_Window* */
    },
    result: "i32", /* int */
  },
};
