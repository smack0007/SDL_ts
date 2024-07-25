// Adapted from https://gigi.nullneuron.net/gigilabs/playing-a-wav-file-using-sdl2/

import { Box, Pointer, SDL, U32, u32, u8 } from "SDL_ts";
import { SDL_FUNCTIONS } from "./sdlConfig.ts";
import { ASSETS_PATH } from "../../shared/constants.ts";
import { join } from "@std/path";

const main = (): number => {
  if (SDL.Init(SDL.InitFlags.AUDIO, { functions: SDL_FUNCTIONS }) < 0) {
    return 1;
  }

  console.info("SDL Initialized.");

  const wavSpec = new SDL.AudioSpec();
  const wavBufferBox = new Box<Pointer<u8>>(Pointer);
  const wavLengthBox = new Box<u32>(U32);

  if (
    SDL.LoadWav(
      join(ASSETS_PATH, "powerup.wav"),
      wavSpec,
      wavBufferBox,
      wavLengthBox
    ) == null
  ) {
    console.error("ERROR: Failed to load wav file.");
    return 1;
  }

  const audioDeviceID = SDL.OpenAudioDevice(null, 0, wavSpec, null, 0);
  if (audioDeviceID <= 0) {
    console.error("ERROR: Faield to open an audio device.");
    return 1;
  }

  if (
    SDL.QueueAudio(audioDeviceID, wavBufferBox.value, wavLengthBox.value) != 0
  ) {
    console.error(`ERROR: Faield to queue audio: ${SDL.GetError()}`);
    return 1;
  }

  SDL.PauseAudioDevice(audioDeviceID, 0);

  SDL.Delay(1000);

  SDL.CloseAudioDevice(audioDeviceID);
  SDL.FreeWAV(wavBufferBox.value);
  SDL.Quit();
  console.info("SDL Shutdown.");

  return 0;
};

try {
  Deno.exit(main());
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
