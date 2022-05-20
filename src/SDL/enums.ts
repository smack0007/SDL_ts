// This file is auto generated. To update the file make changes to the code generator.

// ArrayOrder
export const ARRAYORDER_NONE = 0;
export const ARRAYORDER_RGB = 1;
export const ARRAYORDER_RGBA = 2;
export const ARRAYORDER_ARGB = 3;
export const ARRAYORDER_BGR = 4;
export const ARRAYORDER_BGRA = 5;
export const ARRAYORDER_ABGR = 6;

// BitmapOrder
export const BITMAPORDER_NONE = 0;
export const BITMAPORDER_4321 = 1;
export const BITMAPORDER_1234 = 2;

// EventType
export const FIRSTEVENT = 0;
export const QUIT = 0x100;
export const APP_TERMINATING = 257;
export const APP_LOWMEMORY = 258;
export const APP_WILLENTERBACKGROUND = 259;
export const APP_DIDENTERBACKGROUND = 260;
export const APP_WILLENTERFOREGROUND = 261;
export const APP_DIDENTERFOREGROUND = 262;
export const LOCALECHANGED = 263;
export const DISPLAYEVENT = 0x150;
export const WINDOWEVENT = 0x200;
export const SYSWMEVENT = 513;
export const KEYDOWN = 0x300;
export const KEYUP = 769;
export const TEXTEDITING = 770;
export const TEXTINPUT = 771;
export const KEYMAPCHANGED = 772;
export const MOUSEMOTION = 0x400;
export const MOUSEBUTTONDOWN = 1025;
export const MOUSEBUTTONUP = 1026;
export const MOUSEWHEEL = 1027;
export const JOYAXISMOTION = 0x600;
export const JOYBALLMOTION = 1537;
export const JOYHATMOTION = 1538;
export const JOYBUTTONDOWN = 1539;
export const JOYBUTTONUP = 1540;
export const JOYDEVICEADDED = 1541;
export const JOYDEVICEREMOVED = 1542;
export const CONTROLLERAXISMOTION = 0x650;
export const CONTROLLERBUTTONDOWN = 1617;
export const CONTROLLERBUTTONUP = 1618;
export const CONTROLLERDEVICEADDED = 1619;
export const CONTROLLERDEVICEREMOVED = 1620;
export const CONTROLLERDEVICEREMAPPED = 1621;
export const CONTROLLERTOUCHPADDOWN = 1622;
export const CONTROLLERTOUCHPADMOTION = 1623;
export const CONTROLLERTOUCHPADUP = 1624;
export const CONTROLLERSENSORUPDATE = 1625;
export const FINGERDOWN = 0x700;
export const FINGERUP = 1793;
export const FINGERMOTION = 1794;
export const DOLLARGESTURE = 0x800;
export const DOLLARRECORD = 2049;
export const MULTIGESTURE = 2050;
export const CLIPBOARDUPDATE = 0x900;
export const DROPFILE = 0x1000;
export const DROPTEXT = 4097;
export const DROPBEGIN = 4098;
export const DROPCOMPLETE = 4099;
export const AUDIODEVICEADDED = 0x1100;
export const AUDIODEVICEREMOVED = 4353;
export const SENSORUPDATE = 0x1200;
export const RENDER_TARGETS_RESET = 0x2000;
export const RENDER_DEVICE_RESET = 8193;
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
export const INIT_EVERYTHING =
  (INIT_TIMER | INIT_AUDIO | INIT_VIDEO | INIT_EVENTS | INIT_JOYSTICK | INIT_HAPTIC | INIT_GAMECONTROLLER |
    INIT_SENSOR);

// PackedLayout
export const PACKEDLAYOUT_NONE = 0;
export const PACKEDLAYOUT_332 = 1;
export const PACKEDLAYOUT_4444 = 2;
export const PACKEDLAYOUT_1555 = 3;
export const PACKEDLAYOUT_5551 = 4;
export const PACKEDLAYOUT_565 = 5;
export const PACKEDLAYOUT_8888 = 6;
export const PACKEDLAYOUT_2101010 = 7;
export const PACKEDLAYOUT_1010102 = 8;

// PackedOrder
export const PACKEDORDER_NONE = 0;
export const PACKEDORDER_XRGB = 1;
export const PACKEDORDER_RGBX = 2;
export const PACKEDORDER_ARGB = 3;
export const PACKEDORDER_RGBA = 4;
export const PACKEDORDER_XBGR = 5;
export const PACKEDORDER_BGRX = 6;
export const PACKEDORDER_ABGR = 7;
export const PACKEDORDER_BGRA = 8;

// PixelType
export const PIXELTYPE_UNKNOWN = 0;
export const PIXELTYPE_INDEX1 = 1;
export const PIXELTYPE_INDEX4 = 2;
export const PIXELTYPE_INDEX8 = 3;
export const PIXELTYPE_PACKED8 = 4;
export const PIXELTYPE_PACKED16 = 5;
export const PIXELTYPE_PACKED32 = 6;
export const PIXELTYPE_ARRAYU8 = 7;
export const PIXELTYPE_ARRAYU16 = 8;
export const PIXELTYPE_ARRAYU32 = 9;
export const PIXELTYPE_ARRAYF16 = 10;
export const PIXELTYPE_ARRAYF32 = 11;

// RendererFlags
export const RENDERER_SOFTWARE = 0x00000001;
export const RENDERER_ACCELERATED = 0x00000002;
export const RENDERER_PRESENTVSYNC = 0x00000004;
export const RENDERER_TARGETTEXTURE = 0x00000008;

// RendererFlip
export const FLIP_NONE = 0x00000000;
export const FLIP_HORIZONTAL = 0x00000001;
export const FLIP_VERTICAL = 0x00000002;

// ScaleMode
export const ScaleModeNearest = 0;
export const ScaleModeLinear = 1;
export const ScaleModeBest = 2;

// TextureAccess
export const TEXTUREACCESS_STATIC = 0;
export const TEXTUREACCESS_STREAMING = 1;
export const TEXTUREACCESS_TARGET = 2;

// TextureModulate
export const TEXTUREMODULATE_NONE = 0x00000000;
export const TEXTUREMODULATE_COLOR = 0x00000001;
export const TEXTUREMODULATE_ALPHA = 0x00000002;

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
