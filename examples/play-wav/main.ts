// Adapted from https://gigi.nullneuron.net/gigilabs/playing-a-wav-file-using-sdl2/

import { Box, Pointer, SDL, U32, u32, u8 } from "SDL_ts";
import { SDL_FUNCTIONS } from "./sdlConfig.ts";
import { ASSETS_PATH } from "../../shared/constants.ts";
import { join } from "@std/path";

function main(): void {
  SDL.Init(SDL.InitFlags.AUDIO, { functions: SDL_FUNCTIONS });

  const wavSpec = new SDL.AudioSpec();
  const wavBufferBox = new Box<Pointer<u8>>(Pointer);
  const wavLengthBox = new Box<u32>(U32);

  // TODO: wavBuffer and wavLength could be made into outputParam(s).
  const _wav = SDL.LoadWav(
    join(ASSETS_PATH, "powerup.wav"),
    wavSpec,
    wavBufferBox,
    wavLengthBox
  );

  const audioDeviceID = SDL.OpenAudioDevice(null, 0, wavSpec, null, 0);

  SDL.QueueAudio(audioDeviceID, wavBufferBox.value, wavLengthBox.value);

  SDL.PauseAudioDevice(audioDeviceID, 0);

  SDL.Delay(1000);

  SDL.CloseAudioDevice(audioDeviceID);
  SDL.FreeWAV(wavBufferBox.value);
  SDL.Quit();
}

try {
  main();
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
