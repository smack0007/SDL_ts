// This file contains function macros that aren't just a simple
// 1 to 1 mapping.

import { LoadBMP_RW, RWFromFile } from "./functions.ts";
import { AudioSpec, Surface } from "./structs.ts";
import { PointerLike } from "../pointers.ts";
import { LoadWAV_RW } from "../../mod.SDL.ts";

export function LoadBMP(file: string): Surface {
  return LoadBMP_RW(RWFromFile(file, "rb"), 1);
}

export function LoadWAV(
  file: string,
  spec: PointerLike<AudioSpec>
): [AudioSpec, Uint8Array] {
  return LoadWAV_RW(RWFromFile(file, "rb"), 1, spec);
}
