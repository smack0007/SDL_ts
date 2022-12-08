import { join } from "@shared/path.ts";
import { IS_WINDOWS } from "../../shared/os.ts";
import { DynamicLibrary } from "../library.ts";
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

// deno-lint-ignore no-explicit-any
export function loadLibrary<T>(libraryPath: string, symbols: any): DynamicLibrary<T> {
  return Deno.dlopen(libraryPath, symbols) as unknown as DynamicLibrary<T>;
}
