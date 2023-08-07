import { SDL } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.AddEventWatch,
  SDL.CreateWindow,
  SDL.Delay,
  SDL.DestroyWindow,
  SDL.FillRect,
  SDL.GetError,
  SDL.GetRevision,
  SDL.GetScancodeName,
  SDL.GetSystemRAM,
  SDL.GetVersion,
  SDL.GetWindowSurface,
  SDL.Init,
  SDL.MapRGB,
  SDL.MinimizeWindow,
  SDL.PollEvent,
  SDL.RestoreWindow,
  SDL.Quit,
  SDL.UpdateWindowSurface,
] as const;
