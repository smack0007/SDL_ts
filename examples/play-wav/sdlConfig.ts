import { SDL } from "SDL_ts";

// This file contains the list of functions that are used in the project.

export const SDL_FUNCTIONS = [
  SDL.CloseAudioDevice,
  SDL.Delay,
  SDL.FreeWAV,
  SDL.GetError,
  SDL.Init,
  SDL.LoadWAV_RW,
  SDL.OpenAudioDevice,
  SDL.PauseAudioDevice,
  SDL.QueueAudio,
  SDL.Quit,
  SDL.RWFromFile,
] as const;
