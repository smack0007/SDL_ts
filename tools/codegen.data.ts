export const enums: Record<string, Record<string, string>> = {
  SDL_EventType: {
    SDL_FIRSTEVENT: "0",

    SDL_QUIT: "0x100",
    SDL_APP_TERMINATING: "0x101",
    SDL_APP_LOWMEMORY: "0x102",
    SDL_APP_WILLENTERBACKGROUND: "0x103",
    SDL_APP_DIDENTERBACKGROUND: "0x104",
    SDL_APP_WILLENTERFOREGROUND: "0x105",
    SDL_APP_DIDENTERFOREGROUND: "0x106",
    SDL_LOCALECHANGED: "0x107",

    SDL_DISPLAYEVENT: "0x150",

    SDL_WINDOWEVENT: "0x200",
    SDL_SYSWMEVENT: "0x201",

    SDL_KEYDOWN: "0x300",
    SDL_KEYUP: "0x301",
    SDL_TEXTEDITING: "0x302",
    SDL_TEXTINPUT: "0x303",
    SDL_KEYMAPCHANGED: "0x304",

    SDL_MOUSEMOTION: "0x400",
    SDL_MOUSEBUTTONDOWN: "0x401",
    SDL_MOUSEBUTTONUP: "0x402",
    SDL_MOUSEWHEEL: "0x403",

    SDL_JOYAXISMOTION: "0x600",
    SDL_JOYBALLMOTION: "0x601",
    SDL_JOYHATMOTION: "0x602",
    SDL_JOYBUTTONDOWN: "0x603",
    SDL_JOYBUTTONUP: "0x604",
    SDL_JOYDEVICEADDED: "0x605",
    SDL_JOYDEVICEREMOVED: "0x606",

    SDL_CONTROLLERAXISMOTION: "0x650",
    SDL_CONTROLLERBUTTONDOWN: "0x651",
    SDL_CONTROLLERBUTTONUP: "0x652",
    SDL_CONTROLLERDEVICEADDED: "0x653",
    SDL_CONTROLLERDEVICEREMOVED: "0x654",
    SDL_CONTROLLERDEVICEREMAPPED: "0x655",
    SDL_CONTROLLERTOUCHPADDOWN: "0x656",
    SDL_CONTROLLERTOUCHPADMOTION: "0x657",
    SDL_CONTROLLERTOUCHPADUP: "0x658",
    SDL_CONTROLLERSENSORUPDATE: "0x659",

    SDL_FINGERDOWN: "0x700",
    SDL_FINGERUP: "0x701",
    SDL_FINGERMOTION: "0x702",

    SDL_DOLLARGESTURE: "0x800",
    SDL_DOLLARRECORD: "0x801",
    SDL_MULTIGESTURE: "0x802",

    SDL_CLIPBOARDUPDATE: "0x900",

    SDL_DROPFILE: "0x1000",
    SDL_DROPTEXT: "0x1001",
    SDL_DROPBEGIN: "0x1002",
    SDL_DROPCOMPLETE: "0x1003",

    SDL_AUDIODEVICEADDED: "0x1100",
    SDL_AUDIODEVICEREMOVED: "0x1101",

    SDL_SENSORUPDATE: "0x1200",

    SDL_RENDER_TARGETS_RESET: "0x2000",
    SDL_RENDER_DEVICE_RESET: "0x2001",

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

type CodeGenEventType = Record<string, string>;

export const eventTypes: Record<string, CodeGenEventType> = {
  SDL_CommonEvent: {
    type: "number",
    timestamp: "number",
  },

  SDL_DisplayEvent: {
    type: "number",
    timestamp: "number",
    display: "number",
    event: "number",
    // data1: "unknown",
  },

  SDL_WindowEvent: {
    type: "number",
    timestamp: "number",
    windowID: "number",
    event: "number",
    // data1: "unknown",
    // data2: "unknown",
  },
};

interface CodeGenEventMember {
  offset: number;
  nativeType: string;
  type: string;
}

export const eventMembers: Record<string, CodeGenEventMember> = {
  type: {
    type: "number",
    offset: 0,
    nativeType: "u32",
  },
  timestamp: {
    type: "number",
    offset: 4,
    nativeType: "u32",
  },
  display: {
    type: "number",
    offset: 8,
    nativeType: "u32",
  },
  windowID: {
    type: "number",
    offset: 8,
    nativeType: "u32",
  },
  event: {
    type: "number",
    offset: 12,
    nativeType: "u8",
  },
};

interface CodeGenFunction {
  parameters: Record<string, Deno.NativeType>;
  result: Deno.NativeType;
}

export const functions: Record<string, CodeGenFunction> = {
  SDL_CreateWindow: {
    parameters: {
      title: "pointer",
      x: "i32",
      y: "i32",
      width: "i32",
      height: "i32",
      flags: "u32",
    },
    result: "pointer",
  },
  SDL_Delay: {
    parameters: { time: "u32" },
    result: "void",
  },
  SDL_DestroyWindow: {
    parameters: { window: "pointer" },
    result: "void",
  },
  SDL_Init: {
    parameters: { flags: "u32" },
    result: "i32",
  },
  SDL_PollEvent: {
    parameters: { event: "pointer" },
    result: "u32",
  },
  SDL_Quit: { parameters: {}, result: "void" },
};
