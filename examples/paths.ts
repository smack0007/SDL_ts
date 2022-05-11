import { isWindows } from "./os.ts";

export const PATH_SEPARATOR_REGEX = /(\\|\/)/;
export const PATH_SEPARATOR = isWindows ? "\\" : "/";

export function joinPath(...parts: string[]): string {
  return parts.join(PATH_SEPARATOR);
}

export const ROOT_PATH = (!isWindows ? PATH_SEPARATOR : "") +
  import.meta.url
    .substring("file:///".length)
    .replaceAll("/", PATH_SEPARATOR)
    .split(PATH_SEPARATOR)
    .slice(0, -2)
    .join(PATH_SEPARATOR);

export const SDL_LIB_PATH = joinPath(ROOT_PATH, "ext", "SDL", "lib", "x64", "SDL2.dll");

export const ASSETS_PATH = joinPath(ROOT_PATH, "assets");
