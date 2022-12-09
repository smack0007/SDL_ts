import { join } from "@shared/path.ts";
import { IS_WINDOWS } from "../../shared/os.ts";
import { SDLError } from "../error.ts";
import { DynamicLibrary, DynamicLibraryInterface } from "../library.ts";
import { ENV_LIBRARY_PATH } from "../_constants.ts";

export function getLibraryPath(libraryName: string): string {
  const libraryPath = Deno.env.get(ENV_LIBRARY_PATH) ?? ".";
  const libraryPrefix = !IS_WINDOWS ? "lib" : "";
  const libraryExtension = IS_WINDOWS ? ".dll" : ".a";

  return join(
    libraryPath,
    Deno.build.os,
    "x64",
    libraryPrefix + libraryName + libraryExtension,
  );
}

export function loadLibrary<T>(libraryPath: string, symbols: DynamicLibraryInterface): DynamicLibrary<T> {
  try {
    return Deno.dlopen(libraryPath, symbols as Deno.ForeignLibraryInterface) as unknown as DynamicLibrary<T>;
  } catch (error) {
    throw new SDLError(`Failed to load library "${libraryPath}"`, error);
  }
}
