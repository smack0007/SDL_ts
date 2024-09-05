import { join, SEPARATOR } from "@std/path";
import { SDLError } from "../error.ts";
import { DynamicLibrary, DynamicLibraryInterface } from "../_library.ts";
import { ENV_LIBRARY_PATH } from "../_constants.ts";

const IS_WINDOWS = Deno.build.os === "windows";
const IS_MAC = Deno.build.os === "darwin";

const WINDOWS_LIBRARY_PATHS: string[] = [];

const UNIX_LIBRARY_PATHS: string[] = [
  "/usr/local/lib",
  "/usr/lib64",
  "/home/linuxbrew/.linuxbrew/lib",
];

const MACOS_LIBRARY_PATHS: string[] = [
  "/usr/local/lib",
  "/System/Volumes/Data/opt/homebrew/lib",
];

function getLibrarySuffix(): string {
  switch (Deno.build.os) {
    case "windows":
      return ".dll";

    case "darwin":
      return ".dylib";
  }

  return ".so";
}

function getLibraryPaths(libraryName: string): string[] {
  const libraryPrefix = !IS_WINDOWS ? "lib" : "";
  const librarySuffix = getLibrarySuffix();
  const fullLibraryName = libraryPrefix + libraryName + librarySuffix;

  const libraryPaths: string[] = [];

  // Try and load it from the same directory.
  // NOTE: Using `join` here doesn't seem to work as it was just returning the file without the ./
  libraryPaths.push(`.${SEPARATOR}${fullLibraryName}`);

  // Then look and see if SDL_TS_LIBRARY_PATH was specified.
  const envLibraryPath = Deno.env.get(ENV_LIBRARY_PATH);
  if (envLibraryPath) {
    libraryPaths.push(join(envLibraryPath, fullLibraryName));
  }

  // Next try and load it globally
  libraryPaths.push(fullLibraryName);

  if (!IS_WINDOWS && !IS_MAC) {
    // On Debain libSDL2_image and libSDL2_ttf only have symbolic links with this format so
    // search for those globally as well.
    libraryPaths.push(
      libraryPrefix + libraryName + "-2.0" + librarySuffix + ".0"
    );
  }

  if (!IS_WINDOWS) {
    const ldLibraryPath = Deno.env.get("LD_LIBRARY_PATH");

    if (ldLibraryPath) {
      libraryPaths.push(
        ...ldLibraryPath
          .split(":")
          .map((libraryPath) => join(libraryPath, fullLibraryName))
      );
    }
  }

  let searchPaths: string[] = [];

  switch (Deno.build.os) {
    case "windows":
      searchPaths = WINDOWS_LIBRARY_PATHS;
      break;

    case "darwin":
      searchPaths = MACOS_LIBRARY_PATHS;
      break;

    case "linux":
      searchPaths = UNIX_LIBRARY_PATHS;
      break;
  }

  libraryPaths.push(
    ...searchPaths.map((libraryPath) => join(libraryPath, fullLibraryName))
  );

  return libraryPaths;
}

export function denoLoadLibrary<T extends DynamicLibraryInterface>(
  libraryName: string,
  symbols: T,
  libraryPath?: string
): DynamicLibrary<T> {
  const libraryPaths = libraryPath
    ? [libraryPath]
    : getLibraryPaths(libraryName);
  const errors: Record<string, Error> = {};

  for (const libraryPath of libraryPaths) {
    try {
      const result = Deno.dlopen(
        libraryPath,
        // Cast the symbols as any in order to prevent a type checking bug.
        // deno-lint-ignore no-explicit-any
        symbols as any
      ) as DynamicLibrary<T>;
      console.debug(`SDL_ts: Loaded ${libraryName} from "${libraryPath}"`);
      return result;
    } catch (error) {
      errors[libraryPath] = error;
    }
  }

  throw new SDLError(
    `Failed to load library "${libraryName}" from "${libraryPaths.join(
      ", "
    )}"\n` +
      Object.entries(errors)
        .map(([libraryPath, error]) => `\t=> ${libraryPath}: ${error.message}`)
        .join("\n"),
    new AggregateError(Object.values(errors))
  );
}
