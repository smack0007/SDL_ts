import { SDL } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.CreateTextureFromSurface,
  SDL.CreateWindowAndRenderer,
  SDL.DestroyRenderer,
  SDL.DestroyTexture,
  SDL.DestroyWindow,
  SDL.Delay,
  SDL.FreeSurface,
  SDL.GetError,
  SDL.GetKeyboardState,
  SDL.GetRendererInfo,
  SDL.Init,
  SDL.LoadBMP_RW,
  SDL.PollEvent,
  SDL.Quit,
  SDL.RenderClear,
  SDL.RenderCopyEx,
  SDL.RenderDrawLine,
  SDL.RenderDrawPoints,
  SDL.RenderDrawRect,
  SDL.RenderFillRect,
  SDL.RenderFlush,
  SDL.RenderPresent,
  SDL.RWFromFile,
  SDL.SetRenderDrawColor,
] as const;
