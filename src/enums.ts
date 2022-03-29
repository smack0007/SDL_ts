// This file is auto generated. To update the file make changes to the code generator.

// EventType
export const FIRSTEVENT = 0;
export const QUIT = 0x100;
export const APP_TERMINATING = 0x101;
export const APP_LOWMEMORY = 0x102;
export const APP_WILLENTERBACKGROUND = 0x103;
export const APP_DIDENTERBACKGROUND = 0x104;
export const APP_WILLENTERFOREGROUND = 0x105;
export const APP_DIDENTERFOREGROUND = 0x106;
export const LOCALECHANGED = 0x107;
export const DISPLAYEVENT = 0x150;
export const WINDOWEVENT = 0x200;
export const SYSWMEVENT = 0x201;
export const KEYDOWN = 0x300;
export const KEYUP = 0x301;
export const TEXTEDITING = 0x302;
export const TEXTINPUT = 0x303;
export const KEYMAPCHANGED = 0x304;
export const MOUSEMOTION = 0x400;
export const MOUSEBUTTONDOWN = 0x401;
export const MOUSEBUTTONUP = 0x402;
export const MOUSEWHEEL = 0x403;
export const JOYAXISMOTION = 0x600;
export const JOYBALLMOTION = 0x601;
export const JOYHATMOTION = 0x602;
export const JOYBUTTONDOWN = 0x603;
export const JOYBUTTONUP = 0x604;
export const JOYDEVICEADDED = 0x605;
export const JOYDEVICEREMOVED = 0x606;
export const CONTROLLERAXISMOTION = 0x650;
export const CONTROLLERBUTTONDOWN = 0x651;
export const CONTROLLERBUTTONUP = 0x652;
export const CONTROLLERDEVICEADDED = 0x653;
export const CONTROLLERDEVICEREMOVED = 0x654;
export const CONTROLLERDEVICEREMAPPED = 0x655;
export const CONTROLLERTOUCHPADDOWN = 0x656;
export const CONTROLLERTOUCHPADMOTION = 0x657;
export const CONTROLLERTOUCHPADUP = 0x658;
export const CONTROLLERSENSORUPDATE = 0x659;
export const FINGERDOWN = 0x700;
export const FINGERUP = 0x701;
export const FINGERMOTION = 0x702;
export const DOLLARGESTURE = 0x800;
export const DOLLARRECORD = 0x801;
export const MULTIGESTURE = 0x802;
export const CLIPBOARDUPDATE = 0x900;
export const DROPFILE = 0x1000;
export const DROPTEXT = 0x1001;
export const DROPBEGIN = 0x1002;
export const DROPCOMPLETE = 0x1003;
export const AUDIODEVICEADDED = 0x1100;
export const AUDIODEVICEREMOVED = 0x1101;
export const SENSORUPDATE = 0x1200;
export const RENDER_TARGETS_RESET = 0x2000;
export const RENDER_DEVICE_RESET = 0x2001;
export const POLLSENTINEL = 0x7F00;
export const USEREVENT = 0x8000;
export const LASTEVENT = 0xFFFF;

// Init
export const INIT_TIMER = 0x00000001;
export const INIT_AUDIO = 0x00000010;
export const INIT_VIDEO = 0x00000020;
export const INIT_JOYSTICK = 0x00000200;
export const INIT_HAPTIC = 0x00001000;
export const INIT_GAMECONTROLLER = 0x00002000;
export const INIT_EVENTS = 0x00004000;
export const INIT_SENSOR = 0x00008000;
export const INIT_NOPARACHUTE = 0x00100000;
export const INIT_EVERYTHING = (INIT_TIMER | INIT_AUDIO | INIT_VIDEO | INIT_EVENTS | INIT_JOYSTICK |
  INIT_HAPTIC | INIT_GAMECONTROLLER | INIT_SENSOR);

// WindowEventID
export const WINDOWEVENT_NONE = 0;
export const WINDOWEVENT_SHOWN = 1;
export const WINDOWEVENT_HIDDEN = 2;
export const WINDOWEVENT_EXPOSED = 3;
export const WINDOWEVENT_MOVED = 4;
export const WINDOWEVENT_RESIZED = 5;
export const WINDOWEVENT_SIZE_CHANGED = 6;
export const WINDOWEVENT_MINIMIZED = 7;
export const WINDOWEVENT_MAXIMIZED = 8;
export const WINDOWEVENT_RESTORED = 9;
export const WINDOWEVENT_ENTER = 10;
export const WINDOWEVENT_LEAVE = 11;
export const WINDOWEVENT_FOCUS_GAINED = 12;
export const WINDOWEVENT_FOCUS_LOST = 13;
export const WINDOWEVENT_CLOSE = 14;
export const WINDOWEVENT_TAKE_FOCUS = 15;
export const WINDOWEVENT_HIT_TEST = 16;
export const WINDOWEVENT_ICCPROF_CHANGED = 17;
export const WINDOWEVENT_DISPLAY_CHANGED = 18;

// WindowFlags
export const WINDOW_FULLSCREEN = 0x00000001;
export const WINDOW_OPENGL = 0x00000002;
export const WINDOW_SHOWN = 0x00000004;
export const WINDOW_HIDDEN = 0x00000008;
export const WINDOW_BORDERLESS = 0x00000010;
export const WINDOW_RESIZABLE = 0x00000020;
export const WINDOW_MINIMIZED = 0x00000040;
export const WINDOW_MAXIMIZED = 0x00000080;
export const WINDOW_MOUSE_GRABBED = 0x00000100;
export const WINDOW_INPUT_FOCUS = 0x00000200;
export const WINDOW_MOUSE_FOCUS = 0x00000400;
export const WINDOW_FULLSCREEN_DESKTOP = (WINDOW_FULLSCREEN | 0x00001000);
export const WINDOW_FOREIGN = 0x00000800;
export const WINDOW_ALLOW_HIGHDPI = 0x00002000;
export const WINDOW_MOUSE_CAPTURE = 0x00004000;
export const WINDOW_ALWAYS_ON_TOP = 0x00008000;
export const WINDOW_SKIP_TASKBAR = 0x00010000;
export const WINDOW_UTILITY = 0x00020000;
export const WINDOW_TOOLTIP = 0x00040000;
export const WINDOW_POPUP_MENU = 0x00080000;
export const WINDOW_KEYBOARD_GRABBED = 0x00100000;
export const WINDOW_VULKAN = 0x10000000;
export const WINDOW_METAL = 0x20000000;
export const WINDOW_INPUT_GRABBED = WINDOW_MOUSE_GRABBED;

// WindowPos
export const WINDOWPOS_UNDEFINED = 0x1fff0000;
export const WINDOWPOS_CENTERED = 0x2FFF0000;
