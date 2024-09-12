// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { Pointer } from "../pointers.ts";
import { Callback, int, Uint8 } from "../types.ts";
import { Event } from "./events.ts";

export type AudioCallback =
  & (
    (
      userdata: Pointer<unknown> | null,
      stream: Pointer<Uint8>,
      len: int,
    ) => void
  )
  & Callback;

export type EventFilter =
  & (
    (
      userdata: Pointer<unknown> | null,
      event: Event,
    ) => int
  )
  & Callback;

// TODO: Doesn't seem to be supported yet perhaps due to background thread?
// SDL_TimerCallback
