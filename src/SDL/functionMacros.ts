// This file contains function macros that aren't just a simple
// 1 to 1 mapping.

import { LoadBMP_RW, RWFromFile } from "./functions.ts";
import { Surface } from "./structs.ts";

export function LoadBMP(file: string): Surface | null {
  const rw = RWFromFile(file, "rb");

  if (rw == null) {
    throw new Error("RWFromFile failed.");
  }

  return LoadBMP_RW(rw, 1);
}
