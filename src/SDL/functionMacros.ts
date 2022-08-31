// This file contains function macros that aren't just a simple
// 1 to 1 mapping.

import { PointerValue } from "../types.ts";
import { LoadBMP_RW, RWFromFile } from "./functions.ts";
import { Surface } from "./structs.ts";

export function LoadBMP(file: string): PointerValue<Surface> {
  return LoadBMP_RW(RWFromFile(file, "rb"), 1);
}
