import { CodeGenFunctions } from "../types.ts";

export const functions: CodeGenFunctions = {
  SDL_AddEventWatch: {
    parameters: {
      filter: {
        type: "SDL_EventFilter",
      },
      userdata: {
        type: "void*",
        nullable: true,
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_AddTimer: {
    todo: "Doesn't seem to be supported yet perhaps due to background thread?",
    parameters: {
      interval: {
        type: "Uint32",
      },
      callback: {
        type: "SDL_TimerCallback",
      },
      param: {
        type: "void*",
        nullable: true,
      },
    },
    result: {
      type: "SDL_TimerID",
    },
  },
  SDL_BlitScaled: {
    symbolName: "SDL_UpperBlitScaled",
    parameters: {
      src: {
        type: "SDL_Surface*",
      },
      srcrect: {
        type: "SDL_Rect*",
        nullable: true,
      },
      dst: {
        type: "SDL_Surface*",
      },
      dstrect: {
        type: "SDL_Rect*",
        nullable: true,
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_BlitSurface: {
    symbolName: "SDL_UpperBlit",
    parameters: {
      src: {
        type: "SDL_Surface*",
      },
      srcrect: {
        type: "SDL_Rect*",
        nullable: true,
      },
      dst: {
        type: "SDL_Surface*",
      },
      dstrect: {
        type: "SDL_Rect*",
        nullable: true,
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_CloseAudioDevice: {
    parameters: {
      dev: {
        type: "SDL_AudioDeviceID",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_ConvertSurface: {
    parameters: {
      src: {
        type: "SDL_Surface*",
      },
      fmt: {
        type: "SDL_PixelFormat*",
      },
      flags: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },
  SDL_CreateRGBSurface: {
    parameters: {
      flags: {
        type: "Uint32",
      },
      width: {
        type: "int",
      },
      height: {
        type: "int",
      },
      depth: {
        type: "int",
      },
      Rmask: {
        type: "Uint32",
      },
      Gmask: {
        type: "Uint32",
      },
      Bmask: {
        type: "Uint32",
      },
      Amask: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },
  SDL_CreateRGBSurfaceFrom: {
    parameters: {
      pixels: {
        type: "void*",
      },
      width: {
        type: "int",
      },
      height: {
        type: "int",
      },
      depth: {
        type: "int",
      },
      pitch: {
        type: "int",
      },
      Rmask: {
        type: "Uint32",
      },
      Gmask: {
        type: "Uint32",
      },
      Bmask: {
        type: "Uint32",
      },
      Amask: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },
  SDL_CreateRGBSurfaceWithFormat: {
    parameters: {
      flags: {
        type: "Uint32",
      },
      width: {
        type: "int",
      },
      height: {
        type: "int",
      },
      depth: {
        type: "int",
      },
      format: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },
  SDL_CreateRenderer: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      index: {
        type: "int",
      },
      flags: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Renderer*",
    },
  },
  SDL_CreateTexture: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      format: {
        type: "Uint32",
      },
      access: {
        type: "int",
      },
      w: {
        type: "int",
      },
      h: {
        type: "int",
      },
    },
    result: {
      type: "SDL_Texture*",
    },
  },
  SDL_CreateTextureFromSurface: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "SDL_Texture*",
    },
  },
  SDL_CreateWindow: {
    parameters: {
      title: {
        type: "char*",
      },
      x: {
        type: "int",
        overrideType: "WindowPos | i32",
      },
      y: {
        type: "int",
        overrideType: "WindowPos | i32",
      },
      w: {
        type: "int",
      },
      h: {
        type: "int",
      },
      flags: {
        type: "Uint32",
        overrideType: "WindowFlags",
      },
    },
    result: {
      type: "SDL_Window*",
    },
    overloads: [
      {
        parameters: {
          x: {
            overrideType: "WindowPos",
          },
          y: {
            overrideType: "WindowPos",
          },
        },
      },
      {
        parameters: {
          x: {
            overrideType: "i32",
          },
          y: {
            overrideType: "i32",
          },
        },
      },
    ],
  },
  SDL_CreateWindowAndRenderer: {
    parameters: {
      width: {
        type: "int",
      },
      height: {
        type: "int",
      },
      window_flags: {
        type: "Uint32",
        overrideType: "WindowFlags",
      },
      window: {
        type: "SDL_Window**",
      },
      renderer: {
        type: "SDL_Renderer**",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_CreateWindowFrom: {
    parameters: {
      data: {
        type: "void*",
      },
    },
    result: {
      type: "SDL_Window*",
    },
  },
  SDL_Delay: {
    parameters: {
      ms: {
        type: "Uint32",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_DelEventWatch: {
    parameters: {
      filter: {
        type: "SDL_EventFilter",
      },
      userdata: {
        type: "void*",
        nullable: true,
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_DestroyRenderer: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_DestroyTexture: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_DestroyWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_DestroyWindowSurface: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_FillRect: {
    parameters: {
      dst: {
        type: "SDL_Surface*",
      },
      rect: {
        type: "SDL_Rect*",
        nullable: true,
      },
      color: {
        type: "Uint32",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_FlashWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      operation: {
        type: "SDL_FlashOperation",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_FreeWAV: {
    parameters: {
      audio_buf: {
        type: "Uint8*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_FreeSurface: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_GetColorKey: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
      key: {
        type: "Uint32*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetError: {
    parameters: {},
    result: {
      type: "char*",
    },
  },
  SDL_GetGrabbedWindow: {
    parameters: {},
    result: {
      type: "SDL_Window*",
    },
  },
  SDL_GetKeyboardState: {
    parameters: {
      numkeys: {
        type: "int*",
        nullable: true,
      },
    },
    result: {
      type: "Uint8*",
    },
  },
  SDL_GetRendererInfo: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      info: {
        type: "SDL_RendererInfo*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetRevision: {
    parameters: {},
    result: {
      type: "char*",
    },
  },
  SDL_GetScancodeFromKey: {
    parameters: {
      key: {
        type: "SDL_Keycode",
      },
    },
    result: {
      type: "SDL_Scancode",
    },
  },
  SDL_GetScancodeName: {
    parameters: {
      scancode: {
        type: "SDL_Scancode",
      },
    },
    result: {
      type: "char*",
    },
  },
  SDL_GetShapedWindowMode: {
    todo: "SDL_WindowShapeMode is a struct and WindowShapeMode is an enum. Figure out how to fix the name collision.",
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      shape_mode: {
        type: "SDL_WindowShapeMode*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetSystemRAM: {
    parameters: {},
    result: {
      type: "int",
    },
  },
  SDL_GetTextureAlphaMod: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      alpha: {
        type: "Uint8*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetTextureBlendMode: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      blendMode: {
        type: "SDL_BlendMode*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetTextureColorMod: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      r: {
        type: "Uint8*",
      },
      g: {
        type: "Uint8*",
      },
      b: {
        type: "Uint8*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetTicks: {
    parameters: {},
    result: {
      type: "Uint32",
    },
  },
  SDL_GetTicks64: {
    parameters: {},
    result: {
      type: "Uint64",
    },
  },
  SDL_GetVersion: {
    parameters: {
      ver: {
        type: "SDL_version*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_GetWindowBordersSize: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      top: {
        type: "int*",
      },
      left: {
        type: "int*",
      },
      bottom: {
        type: "int*",
      },
      right: {
        type: "int*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetWindowBrightness: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "float",
    },
  },
  SDL_GetWindowData: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      name: {
        type: "char*",
      },
    },
    result: {
      type: "void*",
    },
  },
  SDL_GetWindowDisplayIndex: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetWindowDisplayMode: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      mode: {
        type: "SDL_DisplayMode*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetWindowFlags: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "Uint32",
    },
  },
  SDL_GetWindowFromID: {
    parameters: {
      id: {
        type: "Uint32",
      },
    },
    result: {
      type: "SDL_Window*",
    },
  },
  SDL_GetWindowGammaRamp: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      red: {
        type: "Uint16*",
      },
      green: {
        type: "Uint16*",
      },
      blue: {
        type: "Uint16*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetWindowGrab: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_GetWindowICCProfile: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      size: {
        type: "size_t*",
      },
    },
    result: {
      type: "void*",
    },
  },
  SDL_GetWindowID: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "Uint32",
    },
  },
  SDL_GetWindowKeyboardGrab: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_GetWindowMaximumSize: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      w: {
        type: "int*",
      },
      h: {
        type: "int*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_GetWindowMinimumSize: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      w: {
        type: "int*",
      },
      h: {
        type: "int*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_GetWindowMouseGrab: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_GetWindowMouseRect: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "SDL_Rect*",
    },
  },
  SDL_GetWindowOpacity: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      out_opacity: {
        type: "float*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_GetWindowPixelFormat: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "Uint32",
    },
  },
  SDL_GetWindowPosition: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      x: {
        type: "int*",
      },
      y: {
        type: "int*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_GetWindowSize: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      w: {
        type: "int*",
      },
      h: {
        type: "int*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_GetWindowSizeInPixels: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      w: {
        type: "int*",
      },
      h: {
        type: "int*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_GetWindowSurface: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },
  SDL_GetWindowTitle: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "char*",
    },
  },
  SDL_GetWindowWMInfo: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      info: {
        type: "SDL_SysWMinfo*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_HasColorKey: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_HasIntersection: {
    parameters: {
      A: {
        type: "SDL_Rect*",
      },
      B: {
        type: "SDL_Rect*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_HasWindowSurface: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_HideWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_Init: {
    parameters: {
      flags: {
        type: "Uint32",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_IntersectRect: {
    parameters: {
      A: {
        type: "SDL_Rect*",
      },
      B: {
        type: "SDL_Rect*",
      },
      result: {
        type: "SDL_Rect*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_IsShapedWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_LoadBMP_RW: {
    parameters: {
      src: {
        type: "SDL_RWops*",
      },
      freesrc: {
        type: "int",
      },
    },
    result: {
      type: "SDL_Surface*",
    },
  },
  SDL_LoadWAV_RW: {
    parameters: {
      src: {
        type: "SDL_RWops*",
      },
      freesrc: {
        type: "int",
      },
      spec: {
        type: "SDL_AudioSpec*",
      },
      audio_buf: {
        type: "Uint8**",
      },
      audio_len: {
        type: "Uint32*",
      },
    },
    result: {
      type: "SDL_AudioSpec*",
    },
  },
  SDL_LockSurface: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_MapRGB: {
    parameters: {
      format: {
        type: "SDL_PixelFormat*",
      },
      r: {
        type: "Uint8",
      },
      g: {
        type: "Uint8",
      },
      b: {
        type: "Uint8",
      },
    },
    result: {
      type: "Uint32",
    },
  },
  SDL_MapRGBA: {
    parameters: {
      format: {
        type: "SDL_PixelFormat*",
      },
      r: {
        type: "Uint8",
      },
      g: {
        type: "Uint8",
      },
      b: {
        type: "Uint8",
      },
      a: {
        type: "Uint8",
      },
    },
    result: {
      type: "Uint32",
    },
  },
  SDL_MaximizeWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_MinimizeWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_OpenAudioDevice: {
    parameters: {
      device: {
        type: "char*",
        nullable: true,
      },
      iscapture: {
        type: "int",
      },
      desired: {
        type: "SDL_AudioSpec*",
      },
      obtained: {
        type: "SDL_AudioSpec*",
        nullable: true,
      },
      allowed_changes: {
        type: "int",
      },
    },
    result: {
      type: "SDL_AudioDeviceID",
    },
  },
  SDL_PauseAudioDevice: {
    parameters: {
      dev: {
        type: "SDL_AudioDeviceID",
      },
      pause_on: {
        type: "int",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_PollEvent: {
    parameters: {
      event: {
        type: "SDL_Event*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_QueryTexture: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      format: {
        type: "Uint32*",
        nullable: true,
      },
      access: {
        type: "int*",
        nullable: true,
      },
      w: {
        type: "int*",
      },
      h: {
        type: "int*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_Quit: {
    parameters: {},
    result: {
      type: "void",
    },
  },
  SDL_QueueAudio: {
    parameters: {
      dev: {
        type: "SDL_AudioDeviceID",
      },
      data: {
        type: "void*",
      },
      len: {
        type: "Uint32",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RWFromFile: {
    parameters: {
      file: {
        type: "char*",
      },
      mode: {
        type: "char*",
        overrideType: "RWMode",
      },
    },
    result: {
      type: "SDL_RWops*",
    },
  },
  SDL_RaiseWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_RemoveTimer: {
    todo: "Doesn't seem to be supported yet perhaps due to background thread?",
    parameters: {
      id: {
        type: "SDL_TimerID",
      },
    },
    result: {
      type: "SDL_bool",
    },
  },
  SDL_RenderClear: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderCopy: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      texture: {
        type: "SDL_Texture*",
      },
      srcrect: {
        type: "SDL_Rect*",
        nullable: true,
      },
      dstrect: {
        type: "SDL_Rect*",
        nullable: true,
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderCopyEx: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      texture: {
        type: "SDL_Texture*",
      },
      srcrect: {
        type: "SDL_Rect*",
      },
      dstrect: {
        type: "SDL_Rect*",
      },
      angle: {
        type: "double",
      },
      center: {
        type: "SDL_Point*",
      },
      flip: {
        type: "SDL_RendererFlip",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderDrawLine: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      x1: {
        type: "int",
      },
      y1: {
        type: "int",
      },
      x2: {
        type: "int",
      },
      y2: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderDrawLines: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      points: {
        type: "SDL_Point*",
      },
      count: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderDrawPoint: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      x: {
        type: "int",
      },
      y: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderDrawPoints: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      points: {
        type: "SDL_Point*",
      },
      count: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderDrawRect: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      rect: {
        type: "SDL_Rect*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderDrawRects: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      rects: {
        type: "SDL_Rect*",
      },
      count: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderFillRect: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      rect: {
        type: "SDL_Rect*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderFillRects: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      rects: {
        type: "SDL_Rect*",
      },
      count: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderFlush: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_RenderGetWindow: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "SDL_Window*",
    },
  },
  SDL_RenderLogicalToWindow: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      logicalX: {
        type: "float",
      },
      logicalY: {
        type: "float",
      },
      windowX: {
        type: "int*",
      },
      windowY: {
        type: "int*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_RenderPresent: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_RenderWindowToLogical: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      windowX: {
        type: "int",
      },
      windowY: {
        type: "int",
      },
      logicalX: {
        type: "float*",
      },
      logicalY: {
        type: "float*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_RestoreWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetColorKey: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
      flag: {
        type: "int",
      },
      key: {
        type: "Uint32",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetRenderDrawBlendMode: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      blendMode: {
        type: "SDL_BlendMode",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetRenderDrawColor: {
    parameters: {
      renderer: {
        type: "SDL_Renderer*",
      },
      r: {
        type: "Uint8",
      },
      g: {
        type: "Uint8",
      },
      b: {
        type: "Uint8",
      },
      a: {
        type: "Uint8",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetSurfaceBlendMode: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
      blendMode: {
        type: "SDL_BlendMode",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetTextureAlphaMod: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      alpha: {
        type: "Uint8",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetTextureBlendMode: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      blendMode: {
        type: "SDL_BlendMode",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetTextureColorMod: {
    parameters: {
      texture: {
        type: "SDL_Texture*",
      },
      r: {
        type: "Uint8",
      },
      g: {
        type: "Uint8",
      },
      b: {
        type: "Uint8",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowAlwaysOnTop: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      on_top: {
        type: "SDL_bool",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowBordered: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      bordered: {
        type: "SDL_bool",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowBrightness: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      brightness: {
        type: "float",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowData: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      name: {
        type: "char*",
      },
      userdata: {
        type: "void*",
      },
    },
    result: {
      type: "void*",
    },
  },
  SDL_SetWindowDisplayMode: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      mode: {
        type: "SDL_DisplayMode*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowFullscreen: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      flags: {
        type: "Uint32",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowGammaRamp: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      red: {
        type: "Uint16*",
      },
      green: {
        type: "Uint16*",
      },
      blue: {
        type: "Uint16*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowGrab: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      grabbed: {
        type: "SDL_bool",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowHitTest: {
    todo: "Implement callbacks",
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      callback: {
        type: "SDL_HitTest",
      },
      callback_data: {
        type: "void*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowIcon: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      icon: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowInputFocus: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowKeyboardGrab: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      grabbed: {
        type: "SDL_bool",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowMaximumSize: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      max_w: {
        type: "int",
      },
      max_h: {
        type: "int",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowMinimumSize: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      min_w: {
        type: "int",
      },
      min_h: {
        type: "int",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowModalFor: {
    parameters: {
      modal_window: {
        type: "SDL_Window*",
      },
      parent_window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowMouseGrab: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      grabbed: {
        type: "SDL_bool",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowMouseRect: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      rect: {
        type: "SDL_Rect*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowOpacity: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      opacity: {
        type: "float",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowPosition: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      x: {
        type: "int",
      },
      y: {
        type: "int",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowResizable: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      resizable: {
        type: "SDL_bool",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowShape: {
    todo: "SDL_WindowShapeMode is a struct and WindowShapeMode is an enum. Figure out how to fix the name collision.",
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      shape: {
        type: "SDL_Surface*",
      },
      shape_mode: {
        type: "SDL_WindowShapeMode*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_SetWindowSize: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      w: {
        type: "int",
      },
      h: {
        type: "int",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowTitle: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      title: {
        type: "char*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_SetWindowsMessageHook: {
    todo: "Implement callbacks",
    parameters: {
      callback: {
        type: "SDL_WindowsMessageHook",
      },
      userdata: {
        type: "void*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_ShowWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_UnlockSurface: {
    parameters: {
      surface: {
        type: "SDL_Surface*",
      },
    },
    result: {
      type: "void",
    },
  },
  SDL_UpdateWindowSurface: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_UpdateWindowSurfaceRects: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      rects: {
        type: "SDL_Rect*",
      },
      numrects: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_WaitEvent: {
    parameters: {
      event: {
        type: "SDL_Event*",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_WaitEventTimeout: {
    parameters: {
      event: {
        type: "SDL_Event*",
      },
      timeout: {
        type: "int",
      },
    },
    result: {
      type: "int",
    },
  },
  SDL_WarpMouseInWindow: {
    parameters: {
      window: {
        type: "SDL_Window*",
      },
      x: {
        type: "int",
      },
      y: {
        type: "int",
      },
    },
    result: {
      type: "void",
    },
  },
} as const;
