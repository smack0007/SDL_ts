import { IMG, SDL, TTF } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.BlitSurface,
  SDL.CreateRGBSurfaceWithFormat,
  SDL.CreateTextureFromSurface,
  SDL.CreateWindowAndRenderer,
  SDL.DestroyWindow,
  SDL.FillRect,
  SDL.FreeSurface,
  SDL.GetError,
  SDL.GetTicks64,
  SDL.Init,
  SDL.MapRGBA,
  SDL.PollEvent,
  SDL.Quit,
  SDL.RenderClear,
  SDL.RenderCopy,
  SDL.RenderFlush,
  SDL.RenderPresent,
  SDL.SetRenderDrawBlendMode,
  SDL.SetRenderDrawColor,
  SDL.SetSurfaceBlendMode,
  SDL.SetTextureAlphaMod,
  SDL.SetTextureBlendMode,
  SDL.SetTextureColorMod,
  SDL.SetWindowTitle,
] as const;

export const IMG_FUNCTIONS = [
  IMG.Init,
  IMG.LoadTexture,
  IMG.Quit,
] as const;

export const TTF_FUNCTIONS = [
  TTF.CloseFont,
  TTF.Init,
  TTF.OpenFont,
  TTF.Quit,
  TTF.RenderUTF8_Blended,
  TTF.SizeUTF8,
] as const;
