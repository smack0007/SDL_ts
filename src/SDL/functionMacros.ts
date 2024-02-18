// This file contains function macros that aren't just a simple
// 1 to 1 mapping.

import { LoadBMP_RW, RWFromFile } from "./functions.ts";
import { AudioSpec, Surface } from "./structs.ts";
import { Box } from "../boxes.ts";
import { SDLError } from "../error.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { LoadWAV_RW } from "../../mod.SDL.ts";
import { u32, u8 } from "../types.ts";

export function LoadBMP(file: string): Surface | null {
  const rw = RWFromFile(file, "rb");

  if (rw == null) {
    throw new SDLError("RWFromFile failed.");
  }

  return LoadBMP_RW(rw, 1);
}

export function LoadWav(
  file: string,
  spec: PointerLike<AudioSpec>,
  audio_buf: Box<Pointer<u8>>,
  audio_len: PointerLike<u32>
): AudioSpec | null {
  const rw = RWFromFile(file, "rb");

  if (rw == null) {
    throw new SDLError("RWFromFile failed.");
  }

  return LoadWAV_RW(rw, 1, spec, audio_buf, audio_len);
}
