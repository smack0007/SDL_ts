import { IS_WINDOWS } from "./os.ts";
import * as path from "./path.ts";

export const ROOT_PATH = new URL(import.meta.url).pathname
  .replaceAll("/", IS_WINDOWS ? "\\" : "/")
  .substring(IS_WINDOWS ? 1 : 0)
  .split(path.PATH_SEPARATOR)
  .slice(0, -2)
  .join(path.PATH_SEPARATOR);

export const SRC_PATH = path.join(ROOT_PATH, "src");

export const SDL_LIB_PATH = path.join(ROOT_PATH, "ext", "SDL", "lib", "x64", IS_WINDOWS ? "SDL2" : "libSDL2");

export const SDL_IMAGE_LIB_PATH = path.join(
  ROOT_PATH,
  "ext",
  "SDL_image",
  "x64",
  IS_WINDOWS ? "SDL2_image" : "libSDL2_image",
);

export const ASSETS_PATH = path.join(ROOT_PATH, "assets");
