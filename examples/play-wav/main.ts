// Adapted from https://gigi.nullneuron.net/gigilabs/playing-a-wav-file-using-sdl2/

import { SDL } from "SDL_ts";
import { SDL_FUNCTIONS } from "./sdlConfig.ts";
import { ASSETS_PATH } from "../../shared/constants.ts";
import { join } from "@std/path";

function main(): void {
  SDL.Init(SDL.InitFlags.AUDIO, { functions: SDL_FUNCTIONS });

  const [wavSpec, buffer] = SDL.LoadWAV(
    join(ASSETS_PATH, "powerup.wav"),
    new SDL.AudioSpec()
  );

  const audioDeviceID = SDL.OpenAudioDevice(null, 0, wavSpec, null, 0);

  SDL.QueueAudio(audioDeviceID, buffer, buffer.length);

  SDL.PauseAudioDevice(audioDeviceID, 0);

  SDL.Delay(1000);

  SDL.CloseAudioDevice(audioDeviceID);
  SDL.FreeWAV(buffer);
  SDL.Quit();
}

try {
  main();
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
