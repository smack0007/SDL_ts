// This file is auto generated. To update the file make changes to the code generator.

export const symbols = {
  SDL_AddEventWatch: {
    parameters: [
      /* SDL_EventFilter filter */ "function",
      /* void* userdata */ "pointer",
    ],
    result: /* void */ "void",
  },
  // TODO: Doesn't seem to be supported yet perhaps due to background thread?
  // SDL_AddTimer
  /* SDL_BlitScaled */ SDL_UpperBlitScaled: {
    parameters: [
      /* SDL_Surface* src */ "pointer",
      /* SDL_Rect* srcrect */ "pointer",
      /* SDL_Surface* dst */ "pointer",
      /* SDL_Rect* dstrect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  /* SDL_BlitSurface */ SDL_UpperBlit: {
    parameters: [
      /* SDL_Surface* src */ "pointer",
      /* SDL_Rect* srcrect */ "pointer",
      /* SDL_Surface* dst */ "pointer",
      /* SDL_Rect* dstrect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_CloseAudioDevice: {
    parameters: [
      /* SDL_AudioDeviceID dev */ "u32",
    ],
    result: /* void */ "void",
  },
  SDL_ConvertSurface: {
    parameters: [
      /* SDL_Surface* src */ "pointer",
      /* SDL_PixelFormat* fmt */ "pointer",
      /* Uint32 flags */ "u32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_CreateRGBSurface: {
    parameters: [
      /* Uint32 flags */ "u32",
      /* int width */ "i32",
      /* int height */ "i32",
      /* int depth */ "i32",
      /* Uint32 Rmask */ "u32",
      /* Uint32 Gmask */ "u32",
      /* Uint32 Bmask */ "u32",
      /* Uint32 Amask */ "u32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_CreateRGBSurfaceFrom: {
    parameters: [
      /* void* pixels */ "pointer",
      /* int width */ "i32",
      /* int height */ "i32",
      /* int depth */ "i32",
      /* int pitch */ "i32",
      /* Uint32 Rmask */ "u32",
      /* Uint32 Gmask */ "u32",
      /* Uint32 Bmask */ "u32",
      /* Uint32 Amask */ "u32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_CreateRGBSurfaceWithFormat: {
    parameters: [
      /* Uint32 flags */ "u32",
      /* int width */ "i32",
      /* int height */ "i32",
      /* int depth */ "i32",
      /* Uint32 format */ "u32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_CreateRenderer: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int index */ "i32",
      /* Uint32 flags */ "u32",
    ],
    result: /* SDL_Renderer* */ "pointer",
  },
  SDL_CreateTexture: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* Uint32 format */ "u32",
      /* int access */ "i32",
      /* int w */ "i32",
      /* int h */ "i32",
    ],
    result: /* SDL_Texture* */ "pointer",
  },
  SDL_CreateTextureFromSurface: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* SDL_Texture* */ "pointer",
  },
  SDL_CreateWindow: {
    parameters: [
      /* char* title */ "pointer",
      /* int x */ "i32",
      /* int y */ "i32",
      /* int w */ "i32",
      /* int h */ "i32",
      /* Uint32 flags */ "u32",
    ],
    result: /* SDL_Window* */ "pointer",
  },
  SDL_CreateWindowAndRenderer: {
    parameters: [
      /* int width */ "i32",
      /* int height */ "i32",
      /* Uint32 window_flags */ "u32",
      /* SDL_Window** window */ "pointer",
      /* SDL_Renderer** renderer */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_CreateWindowFrom: {
    parameters: [
      /* void* data */ "pointer",
    ],
    result: /* SDL_Window* */ "pointer",
  },
  SDL_Delay: {
    parameters: [
      /* Uint32 ms */ "u32",
    ],
    result: /* void */ "void",
  },
  SDL_DelEventWatch: {
    parameters: [
      /* SDL_EventFilter filter */ "function",
      /* void* userdata */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_DestroyRenderer: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_DestroyTexture: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_DestroyWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_DestroyWindowSurface: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_FillRect: {
    parameters: [
      /* SDL_Surface* dst */ "pointer",
      /* SDL_Rect* rect */ "pointer",
      /* Uint32 color */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_FlashWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_FlashOperation operation */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_FreeWAV: {
    parameters: [
      /* Uint8* audio_buf */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_FreeSurface: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetColorKey: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
      /* Uint32* key */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetError: {
    parameters: [],
    result: /* char* */ "pointer",
  },
  SDL_GetGrabbedWindow: {
    parameters: [],
    result: /* SDL_Window* */ "pointer",
  },
  SDL_GetKeyboardState: {
    parameters: [
      /* int* numkeys */ "pointer",
    ],
    result: /* Uint8* */ "pointer",
  },
  SDL_GetRendererInfo: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_RendererInfo* info */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetRevision: {
    parameters: [],
    result: /* char* */ "pointer",
  },
  SDL_GetScancodeFromKey: {
    parameters: [
      /* SDL_Keycode key */ "u32",
    ],
    result: /* SDL_Scancode */ "u32",
  },
  SDL_GetScancodeName: {
    parameters: [
      /* SDL_Scancode scancode */ "u32",
    ],
    result: /* char* */ "pointer",
  },
  // TODO: SDL_WindowShapeMode is a struct and WindowShapeMode is an enum. Figure out how to fix the name collision.
  // SDL_GetShapedWindowMode
  SDL_GetSystemRAM: {
    parameters: [],
    result: /* int */ "i32",
  },
  SDL_GetTextureAlphaMod: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint8* alpha */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetTextureBlendMode: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* SDL_BlendMode* blendMode */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetTextureColorMod: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint8* r */ "pointer",
      /* Uint8* g */ "pointer",
      /* Uint8* b */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetTicks: {
    parameters: [],
    result: /* Uint32 */ "u32",
  },
  SDL_GetTicks64: {
    parameters: [],
    result: /* Uint64 */ "u64",
  },
  SDL_GetVersion: {
    parameters: [
      /* SDL_version* ver */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetWindowBordersSize: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int* top */ "pointer",
      /* int* left */ "pointer",
      /* int* bottom */ "pointer",
      /* int* right */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetWindowBrightness: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* float */ "f32",
  },
  SDL_GetWindowData: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* char* name */ "pointer",
    ],
    result: /* void* */ "pointer",
  },
  SDL_GetWindowDisplayIndex: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetWindowDisplayMode: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_DisplayMode* mode */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetWindowFlags: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* Uint32 */ "u32",
  },
  SDL_GetWindowFromID: {
    parameters: [
      /* Uint32 id */ "u32",
    ],
    result: /* SDL_Window* */ "pointer",
  },
  SDL_GetWindowGammaRamp: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* Uint16* red */ "pointer",
      /* Uint16* green */ "pointer",
      /* Uint16* blue */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetWindowGrab: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_GetWindowICCProfile: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* size_t* size */ "pointer",
    ],
    result: /* void* */ "pointer",
  },
  SDL_GetWindowID: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* Uint32 */ "u32",
  },
  SDL_GetWindowKeyboardGrab: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_GetWindowMaximumSize: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetWindowMinimumSize: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetWindowMouseGrab: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_GetWindowMouseRect: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* SDL_Rect* */ "pointer",
  },
  SDL_GetWindowOpacity: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* float* out_opacity */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_GetWindowPixelFormat: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* Uint32 */ "u32",
  },
  SDL_GetWindowPosition: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int* x */ "pointer",
      /* int* y */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetWindowSize: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetWindowSizeInPixels: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_GetWindowSurface: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_GetWindowTitle: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* char* */ "pointer",
  },
  SDL_GetWindowWMInfo: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_SysWMinfo* info */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_HasColorKey: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_HasIntersection: {
    parameters: [
      /* SDL_Rect* A */ "pointer",
      /* SDL_Rect* B */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_HasWindowSurface: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_HideWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_Init: {
    parameters: [
      /* Uint32 flags */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_IntersectRect: {
    parameters: [
      /* SDL_Rect* A */ "pointer",
      /* SDL_Rect* B */ "pointer",
      /* SDL_Rect* result */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_IsShapedWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* SDL_bool */ "bool",
  },
  SDL_LoadBMP_RW: {
    parameters: [
      /* SDL_RWops* src */ "pointer",
      /* int freesrc */ "i32",
    ],
    result: /* SDL_Surface* */ "pointer",
  },
  SDL_LoadWAV_RW: {
    parameters: [
      /* SDL_RWops* src */ "pointer",
      /* int freesrc */ "i32",
      /* SDL_AudioSpec* spec */ "pointer",
      /* Uint8** audio_buf */ "pointer",
      /* Uint32* audio_len */ "pointer",
    ],
    result: /* SDL_AudioSpec* */ "pointer",
  },
  SDL_LockSurface: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_MapRGB: {
    parameters: [
      /* SDL_PixelFormat* format */ "pointer",
      /* Uint8 r */ "u8",
      /* Uint8 g */ "u8",
      /* Uint8 b */ "u8",
    ],
    result: /* Uint32 */ "u32",
  },
  SDL_MapRGBA: {
    parameters: [
      /* SDL_PixelFormat* format */ "pointer",
      /* Uint8 r */ "u8",
      /* Uint8 g */ "u8",
      /* Uint8 b */ "u8",
      /* Uint8 a */ "u8",
    ],
    result: /* Uint32 */ "u32",
  },
  SDL_MaximizeWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_MinimizeWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_OpenAudioDevice: {
    parameters: [
      /* char* device */ "pointer",
      /* int iscapture */ "i32",
      /* SDL_AudioSpec* desired */ "pointer",
      /* SDL_AudioSpec* obtained */ "pointer",
      /* int allowed_changes */ "i32",
    ],
    result: /* SDL_AudioDeviceID */ "u32",
  },
  SDL_PauseAudioDevice: {
    parameters: [
      /* SDL_AudioDeviceID dev */ "u32",
      /* int pause_on */ "i32",
    ],
    result: /* void */ "void",
  },
  SDL_PollEvent: {
    parameters: [
      /* SDL_Event* event */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_QueryTexture: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint32* format */ "pointer",
      /* int* access */ "pointer",
      /* int* w */ "pointer",
      /* int* h */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_Quit: {
    parameters: [],
    result: /* void */ "void",
  },
  SDL_QueueAudio: {
    parameters: [
      /* SDL_AudioDeviceID dev */ "u32",
      /* void* data */ "pointer",
      /* Uint32 len */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_RWFromFile: {
    parameters: [
      /* char* file */ "pointer",
      /* char* mode */ "pointer",
    ],
    result: /* SDL_RWops* */ "pointer",
  },
  SDL_RaiseWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  // TODO: Doesn't seem to be supported yet perhaps due to background thread?
  // SDL_RemoveTimer
  SDL_RenderClear: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderCopy: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Texture* texture */ "pointer",
      /* SDL_Rect* srcrect */ "pointer",
      /* SDL_Rect* dstrect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderCopyEx: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Texture* texture */ "pointer",
      /* SDL_Rect* srcrect */ "pointer",
      /* SDL_Rect* dstrect */ "pointer",
      /* double angle */ "f64",
      /* SDL_Point* center */ "pointer",
      /* SDL_RendererFlip flip */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawLine: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* int x1 */ "i32",
      /* int y1 */ "i32",
      /* int x2 */ "i32",
      /* int y2 */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawLines: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Point* points */ "pointer",
      /* int count */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawPoint: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* int x */ "i32",
      /* int y */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawPoints: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Point* points */ "pointer",
      /* int count */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawRect: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Rect* rect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderDrawRects: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Rect* rects */ "pointer",
      /* int count */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderFillRect: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Rect* rect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderFillRects: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_Rect* rects */ "pointer",
      /* int count */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderFlush: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderGetWindow: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* SDL_Window* */ "pointer",
  },
  SDL_RenderSetLogicalSize: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* int width */ "i32",
      /* int height */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_RenderLogicalToWindow: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* float logicalX */ "f32",
      /* float logicalY */ "f32",
      /* int* windowX */ "pointer",
      /* int* windowY */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_RenderPresent: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_RenderWindowToLogical: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* int windowX */ "i32",
      /* int windowY */ "i32",
      /* float* logicalX */ "pointer",
      /* float* logicalY */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_RestoreWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_SetColorKey: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
      /* int flag */ "i32",
      /* Uint32 key */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetRenderDrawBlendMode: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* SDL_BlendMode blendMode */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetRenderDrawColor: {
    parameters: [
      /* SDL_Renderer* renderer */ "pointer",
      /* Uint8 r */ "u8",
      /* Uint8 g */ "u8",
      /* Uint8 b */ "u8",
      /* Uint8 a */ "u8",
    ],
    result: /* int */ "i32",
  },
  SDL_SetSurfaceBlendMode: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
      /* SDL_BlendMode blendMode */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetTextureAlphaMod: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint8 alpha */ "u8",
    ],
    result: /* int */ "i32",
  },
  SDL_SetTextureBlendMode: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* SDL_BlendMode blendMode */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetTextureColorMod: {
    parameters: [
      /* SDL_Texture* texture */ "pointer",
      /* Uint8 r */ "u8",
      /* Uint8 g */ "u8",
      /* Uint8 b */ "u8",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowAlwaysOnTop: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_bool on_top */ "bool",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowBordered: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_bool bordered */ "bool",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowBrightness: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* float brightness */ "f32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowData: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* char* name */ "pointer",
      /* void* userdata */ "pointer",
    ],
    result: /* void* */ "pointer",
  },
  SDL_SetWindowDisplayMode: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_DisplayMode* mode */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowFullscreen: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* Uint32 flags */ "u32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowGammaRamp: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* Uint16* red */ "pointer",
      /* Uint16* green */ "pointer",
      /* Uint16* blue */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowGrab: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_bool grabbed */ "bool",
    ],
    result: /* void */ "void",
  },
  // TODO: Implement callbacks
  // SDL_SetWindowHitTest
  SDL_SetWindowIcon: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_Surface* icon */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowInputFocus: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowKeyboardGrab: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_bool grabbed */ "bool",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowMaximumSize: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int max_w */ "i32",
      /* int max_h */ "i32",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowMinimumSize: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int min_w */ "i32",
      /* int min_h */ "i32",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowModalFor: {
    parameters: [
      /* SDL_Window* modal_window */ "pointer",
      /* SDL_Window* parent_window */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowMouseGrab: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_bool grabbed */ "bool",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowMouseRect: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_Rect* rect */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowOpacity: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* float opacity */ "f32",
    ],
    result: /* int */ "i32",
  },
  SDL_SetWindowPosition: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int x */ "i32",
      /* int y */ "i32",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowResizable: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_bool resizable */ "bool",
    ],
    result: /* void */ "void",
  },
  // TODO: SDL_WindowShapeMode is a struct and WindowShapeMode is an enum. Figure out how to fix the name collision.
  // SDL_SetWindowShape
  SDL_SetWindowSize: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int w */ "i32",
      /* int h */ "i32",
    ],
    result: /* void */ "void",
  },
  SDL_SetWindowTitle: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* char* title */ "pointer",
    ],
    result: /* void */ "void",
  },
  // TODO: Implement callbacks
  // SDL_SetWindowsMessageHook
  SDL_ShowWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_UnlockSurface: {
    parameters: [
      /* SDL_Surface* surface */ "pointer",
    ],
    result: /* void */ "void",
  },
  SDL_UpdateWindowSurface: {
    parameters: [
      /* SDL_Window* window */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_UpdateWindowSurfaceRects: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* SDL_Rect* rects */ "pointer",
      /* int numrects */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_WaitEvent: {
    parameters: [
      /* SDL_Event* event */ "pointer",
    ],
    result: /* int */ "i32",
  },
  SDL_WaitEventTimeout: {
    parameters: [
      /* SDL_Event* event */ "pointer",
      /* int timeout */ "i32",
    ],
    result: /* int */ "i32",
  },
  SDL_WarpMouseInWindow: {
    parameters: [
      /* SDL_Window* window */ "pointer",
      /* int x */ "i32",
      /* int y */ "i32",
    ],
    result: /* void */ "void",
  },
} as const;
