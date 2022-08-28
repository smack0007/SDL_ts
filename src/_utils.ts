// This file includes private utility types which should not be
// exposed as part of the API.

import { PlatformDataView } from "platform";
import { F32, F64, I16, I32, I64, I8, Int, U16, U32, U64, U8 } from "./types.ts";
import { Window } from "./SDL/structs.ts";
import { BoxableValueConstructor } from "./boxedValue.ts";

//
// Constants
//

export const ENDIANNESS = (function (): "BE" | "LE" {
  const buffer = new ArrayBuffer(2);
  new globalThis.DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
})();

export const DATA_VIEW_METHODS = new Map<BoxableValueConstructor, keyof PlatformDataView<unknown>>([
  [I8, "getInt8"],
  [U8, "getUint8"],

  [I16, "getInt16"],
  [U16, "getUint16"],

  [I32, "getInt32"],
  [U32, "getUint32"],

  [I64, "getBigInt64"],
  [U64, "getBigUint64"],

  [F32, "getFloat32"],
  [F64, "getFloat64"],

  [Number, "getInt32"],

  // TODO: Just hardcode this for now.
  [Window, "getBigUint64"],
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

    case Int:
    case I32:
    case U32:
    case F32:
    case Number:
      return 4;

    case I64:
    case U64:
    case F64:
      return 8;

    // TODO: Just hardcode this for now.

    case Window:
      return 8;
  }

  throw new Error(
    `sizeof not implemented for ${(constructor as NumberConstructor)?.name ?? (constructor as symbol).description}`,
  );
}
