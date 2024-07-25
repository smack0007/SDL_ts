import DenoPlatform from "./deno/_platform.ts";
import { SDLError } from "./error.ts";
import { Platform } from "./_types.ts";

let platform: Platform | null = null;

if ("Deno" in globalThis) {
  platform = DenoPlatform;
}

if (!platform) {
  throw new SDLError("Unsupported platform.");
}

export default platform as Platform;
