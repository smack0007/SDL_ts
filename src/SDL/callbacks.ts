// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { Pointer } from "../pointers.ts";
import { Callback, int } from "../types.ts";
import { Event } from "./events.ts";

export type EventFilter = Callback & ((userdata: Pointer<unknown> | null, event: Event) => int);
