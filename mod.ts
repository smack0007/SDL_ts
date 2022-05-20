import * as enums from "./src/enums.ts";
import * as events from "./src/events.ts";
import * as functions from "./src/functions.ts";
import * as functionMacros from "./src/functionMacros.ts";
import * as pixels from "./src/pixels.ts";
import * as structs from "./src/structs.ts";

export const SDL = {
  ...enums,
  ...events,
  ...functions,
  ...functionMacros,
  ...pixels,
  ...structs,
};

import type { Pointer, PointerTarget } from "./src/types.ts";
import type { Renderer, Window } from "./src/structs.ts";
export type { Pointer, PointerTarget, Renderer, Window };
