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
