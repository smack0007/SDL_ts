import { SDL } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.Init,
  SDL.GetRevision,
  SDL.GetVersion,
  SDL.Quit,
] as const;
