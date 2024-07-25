// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { PlatformPointer } from "../_types.ts";
import { Event } from "./events.ts";
import { i32, u32, u8 } from "../types.ts";

import { AudioCallback, EventFilter } from "./callbacks.ts";
import {
  AudioSpec,
  Color,
  DisplayMode,
  Keysym,
  Palette,
  PixelFormat,
  Point,
  Rect,
  Renderer,
  RendererInfo,
  RWops,
  Surface,
  SysWMinfo,
  Texture,
  version,
  Window,
} from "./structs.ts";

export const callbacks = {
  SDL_AudioCallback: {
    parameters: [
      /* void* userdata */ "pointer",
      /* Uint8* stream */ "pointer",
      /* int len */ "i32",
    ],
    result: /* void */ "void",
    wrap: (callback: AudioCallback) => {
      return (userdata: PlatformPointer<unknown>, stream: PlatformPointer<u8>, len: i32): void => {
        return callback(
          Platform.fromPlatformPointer(userdata)!,
          Platform.fromPlatformPointer(stream)!,
          len!,
        );
      };
    },
  },
  SDL_EventFilter: {
    parameters: [
      /* void* userdata */ "pointer",
      /* SDL_Event* event */ "pointer",
    ],
    result: /* int */ "i32",
    wrap: (callback: EventFilter) => {
      return (userdata: PlatformPointer<unknown>, event: PlatformPointer<Event>): i32 => {
        return callback(
          Platform.fromPlatformPointer(userdata)!,
          Event.of(Platform.fromPlatformPointer(event))!,
        );
      };
    },
  },
  // TODO: Doesn't seem to be supported yet perhaps due to background thread?
  // SDL_TimerCallback
} as const;
