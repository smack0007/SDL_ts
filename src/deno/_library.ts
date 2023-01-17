import { path } from "../../deps.ts";
import { SDLError } from "../error.ts";
import { DynamicLibrary, DynamicLibraryInterface } from "../_library.ts";
import { ENV_LIBRARY_PATH } from "../_constants.ts";

const IS_WINDOWS = Deno.build.os === "windows";

// An array of paths to search for SDL2 libraries on non Windows platforms
const UNIX_LIBRARY_PATHS = [
  "/usr/local/lib",
  "/usr/lib64",
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

function getLibraryPaths(libraryName: string, libraryPath?: string): string[] {
  const libraryPrefix = !IS_WINDOWS ? "lib" : "";
  const librarySuffix = getLibrarySuffix();
  const fullLibraryName = libraryPrefix + libraryName + librarySuffix;

  const libraryPaths: string[] = [];

  if (libraryPath) {
    libraryPaths.push(path.join(
      libraryPath,
      Deno.build.os,
      "x64",
      fullLibraryName,
    ));
  }

  libraryPath = Deno.env.get(ENV_LIBRARY_PATH);

  if (libraryPath) {
    libraryPaths.push(path.join(
      libraryPath,
      Deno.build.os,
      "x64",
      fullLibraryName,
    ));
  }

  if (!IS_WINDOWS) {
    const ldLibraryPath = Deno.env.get("LD_LIBRARY_PATH");

    if (ldLibraryPath) {
      libraryPaths.push(
        ...ldLibraryPath
          .split(":")
          .map((libraryPath) => path.join(libraryPath, fullLibraryName)),
      );
    }

    libraryPaths.push(...UNIX_LIBRARY_PATHS.map((libraryPath) => path.join(libraryPath, fullLibraryName)));
  }

  return libraryPaths;
}

export function denoLoadLibrary<T>(
  libraryName: string,
  symbols: DynamicLibraryInterface,
  libraryPath?: string,
): DynamicLibrary<T> {
  const libraryPaths = getLibraryPaths(libraryName, libraryPath);
  const errors: Error[] = [];

  for (const libraryPath of libraryPaths) {
    try {
      return Deno.dlopen(libraryPath, symbols as Deno.ForeignLibraryInterface) as unknown as DynamicLibrary<T>;
    } catch (error) {
      errors.push(error);
    }
  }

  throw new SDLError(
    `Failed to load library "${libraryName}" from "${libraryPaths.join(", ")}"`,
    new AggregateError(errors),
  );
}
