export type DynamicLibraryType =
  | "bool"
  | "i8"
  | "u8"
  | "i16"
  | "u16"
  | "i32"
  | "u32"
  | "i64"
  | "u64"
  | "f32"
  | "f64"
  | "pointer"
  | { struct: Readonly<Array<DynamicLibraryType>> };

export type DynamicLibraryFunctionInterface = {
  readonly parameters: readonly DynamicLibraryType[];
  readonly result: DynamicLibraryType | "void";
};

export type DynamicLibraryInterface = Record<string, DynamicLibraryFunctionInterface>;

export type DynamicLibrary<T> = {
  symbols: Record<keyof T, (...args: unknown[]) => unknown>;

  close(): void;
};
