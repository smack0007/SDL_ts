// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { Enum, Flags } from "../types.ts";

export const InitFlags = {
  JPG: 1,
  PNG: 2,
  TIF: 4,
  WEBP: 8,
  JXL: 16,
  AVIF: 32,
} as const;

export type InitFlags = Flags<typeof InitFlags>;
