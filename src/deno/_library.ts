import { dotenv, path } from "../../deps.ts";
import { SDLError } from "../error.ts";
import { DynamicLibrary, DynamicLibraryInterface } from "../_library.ts";
import { ENV_ENV_DIR, ENV_LIBRARY_PATH } from "../_constants.ts";

const IS_WINDOWS = Deno.build.os === "windows";
const IS_MAC = Deno.build.os === "darwin";

const WINDOWS_LIBRARY_PATHS: string[] = [];

const UNIX_LIBRARY_PATHS: string[] = [
  "/usr/local/lib",
  "/usr/lib64",
];

const MACOS_LIBRARY_PATHS: string[] = ["/System/Volumes/Data/opt/homebrew/lib"];

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

  const os = Deno.build.os;
  const arch = "x64"; // TODO: Detect this somehow.

  if (libraryPath) {
    libraryPaths.push(path.join(
      libraryPath,
      os,
      arch,
      fullLibraryName,
    ));
  }

  libraryPaths.push(path.join(".", fullLibraryName));

  if (!IS_WINDOWS && !IS_MAC) {
    // On Debain libSDL2_image and libSDL2_ttf only have symbolic links with this format.
    libraryPaths.push(libraryPrefix + libraryName + "-2.0" + librarySuffix + ".0");
  }

  try {
    const envDir = Deno.env.get(ENV_ENV_DIR) ?? ".";

    const env = dotenv.loadSync({
      envPath: path.join(envDir, `.env.${Deno.build.os}`),
    });

    libraryPath = env[ENV_LIBRARY_PATH];

    if (libraryPath) {
      // If the path in the .env file starts with a . then replace it with
      // the directory of the .env file.
      if (libraryPath.startsWith(".")) {
        libraryPath = path.join(envDir, libraryPath.substring(1));
      }

      libraryPaths.push(path.join(
        libraryPath,
        os,
        arch,
        fullLibraryName,
      ));
    }
  } catch {
    // If we can't load the .env than just ignore it.
  }

  libraryPath = Deno.env.get(ENV_LIBRARY_PATH);

  if (libraryPath) {
    libraryPaths.push(path.join(
      libraryPath,
      os,
      arch,
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
    ...searchPaths.map((libraryPath) => path.join(libraryPath, fullLibraryName)),
  );

  return libraryPaths;
}

export function denoLoadLibrary<T extends DynamicLibraryInterface>(
  libraryName: string,
  symbols: T,
  libraryPath?: string,
): DynamicLibrary<T> {
  const libraryPaths = getLibraryPaths(libraryName, libraryPath);
  const errors: Record<string, Error> = {};

  for (const libraryPath of libraryPaths) {
    try {
      // Cast the symbols as any in order to prevent a type checking bug.
      // deno-lint-ignore no-explicit-any
      return Deno.dlopen(libraryPath, symbols as any) as unknown as DynamicLibrary<T>;
    } catch (error) {
      errors[libraryPath] = error;
    }
  }

  throw new SDLError(
    `Failed to load library "${libraryName}" from "${libraryPaths.join(", ")}"\n` +
      Object.entries(errors).map(([libraryPath, error]) => `\t=> ${libraryPath}: ${error.message}`).join("\n"),
    new AggregateError(Object.values(errors)),
  );
}
