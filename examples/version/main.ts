import { SDL } from "SDL_ts";
import { SDL_FUNCTIONS } from "./sdlConfig.ts";

SDL.Init(SDL.InitFlags.VIDEO, { functions: SDL_FUNCTIONS });

const version = new SDL.version();
SDL.GetVersion(version);
console.info(`SDL Version: ${version.major}.${version.minor}.${version.patch}`);
console.info(`SDL Revision: ${SDL.GetRevision()}`);

SDL.Quit();
