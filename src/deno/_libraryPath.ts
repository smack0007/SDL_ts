import { join } from "@shared/path.ts";
import { IS_WINDOWS } from "../../shared/os.ts";
import { ENV_LIBRARY_PATH } from "../_constants.ts";

export function getLibraryPath(libraryName: string): string {
  const libraryPath = Deno.env.get(ENV_LIBRARY_PATH) ?? ".";
  const libraryPrefix = !IS_WINDOWS ? "lib" : "";

  return join(
    libraryPath,
    Deno.build.os,
    "x64",
    libraryPrefix + libraryName,
  );
}
