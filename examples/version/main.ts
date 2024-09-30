import { SDL, IMG } from "SDL_ts";
import { IMG_FUNCTIONS, SDL_FUNCTIONS } from "./sdlConfig.ts";

SDL.Init(SDL.InitFlags.VIDEO, { functions: SDL_FUNCTIONS });

let version = new SDL.version();
SDL.GetVersion(version);
console.info(`SDL Version: ${version.major}.${version.minor}.${version.patch}`);
console.info(`SDL Revision: ${SDL.GetRevision()}`);

IMG.Init(IMG.InitFlags.PNG, { functions: IMG_FUNCTIONS });

version = IMG.Linked_Version();
console.info(
  `SDL_image Version: ${version.major}.${version.minor}.${version.patch}`
);

SDL.Quit();
IMG.Quit();
