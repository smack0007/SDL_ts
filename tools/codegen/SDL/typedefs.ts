import { CodeGenTypedefs } from "../types.ts";

export const typedefs: CodeGenTypedefs = {
  "SDL_AudioDeviceID": "Uint32",
  "SDL_AudioFormat": "Uint16",
  "SDL_TimerID": "int",
} as const;
