// This file contains function macros that aren't just a simple
// 1 to 1 mapping.

import { LoadBMP_RW, RWFromFile } from "./functions.ts";
import { AudioSpec, Surface } from "./structs.ts";
import { Box } from "../boxes.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { LoadWAV_RW } from "../../mod.SDL.ts";
import { u32, u8 } from "../types.ts";

export function LoadBMP(file: string): Surface {
  return LoadBMP_RW(RWFromFile(file, "rb"), 1);
}

export function LoadWav(
  file: string,
  spec: PointerLike<AudioSpec>,
  audio_buf: Box<Pointer<u8>>,
  audio_len: PointerLike<u32>
): AudioSpec {
  return LoadWAV_RW(RWFromFile(file, "rb"), 1, spec, audio_buf, audio_len);
}
