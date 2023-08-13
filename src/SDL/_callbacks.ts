// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { PlatformPointer } from "../_types.ts";
import { Event } from "./events.ts";
import { i32 } from "../types.ts";

import { EventFilter } from "./callbacks.ts";
import {
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
          Platform.fromPlatformStruct(event, Event)!,
        );
      };
    },
  },
} as const;
