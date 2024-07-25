import { SDL } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.AddEventWatch,
  SDL.CreateWindow,
  SDL.Delay,
  SDL.DelEventWatch,
  SDL.DestroyWindow,
  SDL.FillRect,
  SDL.GetError,
  SDL.GetScancodeName,
  SDL.GetSystemRAM,
  SDL.GetWindowSurface,
  SDL.Init,
  SDL.MapRGB,
  SDL.MinimizeWindow,
  SDL.PollEvent,
  SDL.RestoreWindow,
  SDL.Quit,
  SDL.UpdateWindowSurface,
] as const;
