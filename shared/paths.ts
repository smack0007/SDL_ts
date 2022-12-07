import { IS_WINDOWS } from "./os.ts";

export const PATH_SEPARATOR = IS_WINDOWS ? "\\" : "/";

export function joinPath(...parts: string[]): string {
  return parts.join(PATH_SEPARATOR);
}

export const ROOT_PATH = new URL(import.meta.url).pathname
  .replaceAll("/", IS_WINDOWS ? "\\" : "/")
  .substring(IS_WINDOWS ? 1 : 0)
  .split(PATH_SEPARATOR)
  .slice(0, -2)
  .join(PATH_SEPARATOR);

export const SRC_PATH = joinPath(ROOT_PATH, "src");

export const SDL_LIB_PATH = joinPath(ROOT_PATH, "ext", "SDL", "lib", "x64", IS_WINDOWS ? "SDL2" : "libSDL2");

export const SDL_IMAGE_LIB_PATH = joinPath(
  ROOT_PATH,
  "ext",
  "SDL_image",
  "x64",
  IS_WINDOWS ? "SDL2_image" : "libSDL2_image",
);

export const ASSETS_PATH = joinPath(ROOT_PATH, "assets");
