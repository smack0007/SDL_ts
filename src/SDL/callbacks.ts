// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { Pointer } from "../pointers.ts";
import { Callback, i32, u32 } from "../types.ts";
import { Event } from "./events.ts";

export type EventFilter =
  & (
    (
      userdata: Pointer<unknown> | null,
      event: Event,
    ) => i32
  )
  & Callback;

// TODO: Doesn't seem to be supported yet perhaps due to background thread?
// SDL_TimerCallback
