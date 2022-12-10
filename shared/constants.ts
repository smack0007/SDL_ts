import { IS_WINDOWS } from "./os.ts";
import * as path from "./path.ts";

export const REPO_URL = "https://raw.githubusercontent.com/smack0007/sdl-ts/blob/main";

export const ROOT_PATH = new URL(import.meta.url).pathname
  .replaceAll("/", IS_WINDOWS ? "\\" : "/")
  .substring(IS_WINDOWS ? 1 : 0)
  .split(path.PATH_SEPARATOR)
  .slice(0, -2)
  .join(path.PATH_SEPARATOR);

export const ASSETS_PATH = path.join(ROOT_PATH, "assets");

export const EXT_PATH = path.join(ROOT_PATH, "ext");

export const SRC_PATH = path.join(ROOT_PATH, "src");
