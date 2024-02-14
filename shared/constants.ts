import { path } from "../deps.ts";

const IS_WINDOWS = Deno.build.os === "windows";

export const REPO_URL = "https://deno.land/x/sdl_ts";

export const ROOT_PATH = new URL(import.meta.url).pathname
  .replaceAll("/", IS_WINDOWS ? "\\" : "/")
  .substring(IS_WINDOWS ? 1 : 0)
  .split(path.SEPARATOR)
  .slice(0, -2)
  .join(path.SEPARATOR);

export const ASSETS_PATH = path.join(ROOT_PATH, "assets");

export const EXAMPLES_PATH = path.join(ROOT_PATH, "examples");

export const EXT_PATH = path.join(ROOT_PATH, "ext");

export const SRC_PATH = path.join(ROOT_PATH, "src");

export const TOOLS_PATH = path.join(ROOT_PATH, "tools");
