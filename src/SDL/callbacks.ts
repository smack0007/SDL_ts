// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { Pointer } from "../pointers.ts";
import { Callback, i32 } from "../types.ts";
import { Event } from "./events.ts";

export type EventFilter =
  & (
    (
      userdata: Pointer<unknown> | null,
      event: Pointer<Event>,
    ) => i32
  )
  & Callback;
