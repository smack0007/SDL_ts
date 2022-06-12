// This file includes private utility types which should not be
// exposed as part of the API.

import { PlatformDataView } from "platform";
import { BoxableValueConstructor, I16, I32, I64, I8, U16, U32, U64, U8 } from "./types.ts";

//
// Constants
//

export const ENDIANNESS = (function (): "BE" | "LE" {
  const buffer = new ArrayBuffer(2);
  new globalThis.DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
})();

export const DATA_VIEW_METHODS = new Map<NumberConstructor | symbol, keyof PlatformDataView<unknown>>([
  [U8, "getUint8"],
  [Number, "getInt32"],
]);

//
// Types
//

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

//
// Functions
//

export function sizeof<T>(constructor: BoxableValueConstructor): number {
  switch (constructor) {
    case I8:
    case U8:
      return 1;

    case I16:
    case U16:
      return 2;

    case I32:
    case U32:
      return 4;

    case I64:
    case U64:
      return 8;

    case Number:
      return 4;
  }

  throw new Error(
    `sizeof not implemented for ${(constructor as NumberConstructor)?.name ?? (constructor as symbol).description}`,
  );
}
