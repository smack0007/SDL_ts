import { basename, join } from "std/path/mod.ts";
import { SDLError } from "../error.ts";
import { DynamicLibrary, DynamicLibraryInterface } from "../_library.ts";
import { ENV_LIBRARY_PATH } from "../_constants.ts";

const IS_WINDOWS = Deno.build.os === "windows";

function getLibrarySuffix(): string {
  switch (Deno.build.os) {
    case "windows":
      return ".dll";

    case "darwin":
      return ".dylib";
  }

  return ".so";
}

export function getLibraryPath(libraryName: string): string {
  const libraryPath = Deno.env.get(ENV_LIBRARY_PATH);

  if (!libraryPath) {
    return libraryName;
  }

  const libraryPrefix = !IS_WINDOWS ? "lib" : "";
  const librarySuffix = getLibrarySuffix();

  return join(
    libraryPath,
    Deno.build.os,
    "x64",
    libraryPrefix + libraryName + librarySuffix,
  );
}

export function loadLibrary<T>(libraryPath: string, symbols: DynamicLibraryInterface): DynamicLibrary<T> {
  let loadError: Error | undefined;

  try {
    return Deno.dlopen(libraryPath, symbols as Deno.ForeignLibraryInterface) as unknown as DynamicLibrary<T>;
  } catch (error) {
    loadError = error;

    // If the basename is not the same as the given path then attempt
    // to load a fallback library.
    const libraryBasename = basename(libraryPath);
    if (libraryBasename != libraryPath) {
      try {
        return Deno.dlopen(libraryPath, symbols as Deno.ForeignLibraryInterface) as unknown as DynamicLibrary<T>;
      } catch {
        // Just ignore the error if we can't load the fallback library.
      }
    }
  }

  throw new SDLError(`Failed to load library "${libraryPath}"`, loadError);
}
