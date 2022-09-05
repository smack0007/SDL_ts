import { path } from "./deps.ts";

export const ROOT_DIRECTORY = path.fromFileUrl(new URL("..", import.meta.url));
