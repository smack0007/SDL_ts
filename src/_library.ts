import { Callback } from "./types.ts";

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
  | "function"
  | { struct: Readonly<Array<DynamicLibraryType>> };

export type DynamicLibraryFunctionDefinition = {
  readonly parameters: readonly DynamicLibraryType[];
  readonly result: DynamicLibraryType | "void";
};

export type DynamicCallbackDefinition<T extends Callback> = DynamicLibraryFunctionDefinition & {
  wrap: (callback: T) => unknown;
};

export type DynamicLibraryInterface = Record<string, DynamicLibraryFunctionDefinition>;

export type DynamicLibrary<T> = {
  symbols: Record<keyof T, (...args: unknown[]) => unknown>;

  close(): void;
};
