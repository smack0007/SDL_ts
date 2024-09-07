import { IMG, SDL } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.Init,
  SDL.GetRevision,
  SDL.GetVersion,
  SDL.Quit,
] as const;

export const IMG_FUNCTIONS = [IMG.Init, IMG.Linked_Version, IMG.Quit];
