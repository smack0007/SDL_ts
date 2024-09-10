import { IMG, SDL } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.BlitScaled,
  SDL.ConvertSurface,
  SDL.CreateRGBSurfaceFrom,
  SDL.CreateWindow,
  SDL.Delay,
  SDL.DestroyWindow,
  SDL.FillRect,
  SDL.FreeSurface,
  SDL.GetError,
  SDL.GetRevision,
  SDL.GetTicks64,
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

export const IMG_FUNCTIONS = [
  IMG.Init,
  IMG.Linked_Version,
  IMG.Load,
  IMG.Quit,
] as const;
