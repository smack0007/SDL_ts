import { Enum } from "SDL_ts";

export const BlockColors = {
  red: 0,
  blue: 1,
  green: 2,
  yellow: 3,
} as const;

export type BlockColors = Enum<typeof BlockColors>;
