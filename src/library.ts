// deno-lint-ignore no-explicit-any
export type DynamicLibrarySymbols<T> = Record<keyof T, (...args: any[]) => any>;

export type DynamicLibrary<T> = {
  symbols: DynamicLibrarySymbols<T>;

  close(): void;
};
