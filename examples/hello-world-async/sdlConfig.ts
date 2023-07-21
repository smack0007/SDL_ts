import { SDL } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.CreateWindow,
  SDL.DestroyWindow,
  SDL.FillRect,
  SDL.GetError,
  SDL.GetWindowSurface,
  SDL.Init,
  SDL.MapRGB,
  SDL.Quit,
  SDL.UpdateWindowSurface,
  SDL.WaitEvent,
] as const;
