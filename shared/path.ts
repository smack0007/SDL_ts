import { IS_WINDOWS } from "./os.ts";

export const PATH_SEPARATOR = IS_WINDOWS ? "\\" : "/";

export function join(...parts: string[]): string {
  return parts.join(PATH_SEPARATOR);
}
