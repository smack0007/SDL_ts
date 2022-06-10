// This file includes private utility types which should not be
// exposed as part of the API.

//
// Constants
//

export const ENDIANNESS = (function (): "BE" | "LE" {
  const buffer = new ArrayBuffer(2);
  new globalThis.DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
})();

//
// Types
//

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

//
// Functions
//


