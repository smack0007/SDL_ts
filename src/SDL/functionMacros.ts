// This file contains function macros that aren't just a simple
// 1 to 1 mapping.

import { LoadBMP_RW, RWFromFile } from "./functions.ts";
import { Surface } from "./structs.ts";

export function LoadBMP(file: string): Surface {
  return LoadBMP_RW(RWFromFile(file, "rb"), 1);
}
