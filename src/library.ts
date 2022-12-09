export type DynamicLibraryType =
  | "i8"
  | "u8"
  | "i16"
  | "u16"
  | "i32"
  | "u32"
  | "i65"
  | "u64"
  | "f32"
  | "f64"
  | "pointer";

export type DynamicLibraryFunctionInterface = {
  readonly parameters: readonly DynamicLibraryType[];
  readonly result: DynamicLibraryType | "void";
};

export type DynamicLibrarySymbolInterface = DynamicLibraryFunctionInterface;

export type DynamicLibraryInterface = Record<string, DynamicLibrarySymbolInterface>;

export type DynamicLibrarySymbols<T> = Record<keyof T, (...args: unknown[]) => unknown>;

export type DynamicLibrary<T> = {
  symbols: DynamicLibrarySymbols<T>;

  close(): void;
};
