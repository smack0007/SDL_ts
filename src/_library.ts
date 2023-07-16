import { PlatformPointer } from "./_types.ts";
type DynamicLibraryStructType = { readonly struct: Readonly<Array<DynamicLibraryType>> };
type DynamicLibraryTypeMap = {
  "bool": boolean;
  "i8": number;
  "u8": number;
  "i16": number;
  "u16": number;
  "i32": number;
  "u32": number;
  "i64": number | bigint;
  "u64": number | bigint;
  "f32": number;
  "f64": number;
  "pointer": PlatformPointer<unknown>;
  "void": void;
};
export type DynamicLibraryType = Exclude<keyof DynamicLibraryTypeMap, "void"> | DynamicLibraryStructType;
export type DynamicLibraryResultType = keyof DynamicLibraryTypeMap | DynamicLibraryStructType;

export type DynamicLibraryFunctionInterface = {
  readonly parameters: readonly DynamicLibraryType[];
  readonly result: DynamicLibraryResultType;
};

export type DynamicLibraryInterface = Record<string, DynamicLibraryFunctionInterface>;

type ToNativeType<T extends DynamicLibraryType = DynamicLibraryType> = T extends DynamicLibraryStructType ? BufferSource
  : DynamicLibraryTypeMap[Exclude<T, DynamicLibraryStructType>];
type StaticForeignSymbolReturnType<T extends DynamicLibraryFunctionInterface> = T["result"] extends
  DynamicLibraryStructType ? Uint8Array
  : DynamicLibraryTypeMap[Exclude<T["result"], DynamicLibraryStructType>];
type ToNativeParameterTypes<T extends readonly DynamicLibraryType[]> =
  //
  [(T[number])[]] extends [T] ? ToNativeType<T[number]>[]
    : [readonly (T[number])[]] extends [T] ? readonly ToNativeType<T[number]>[]
    : T extends readonly [...DynamicLibraryType[]] ? {
        [K in keyof T]: ToNativeType<T[K]>;
      }
    : never;
type FromForeignFunction<T extends DynamicLibraryFunctionInterface> = T["parameters"] extends readonly []
  ? () => StaticForeignSymbolReturnType<T>
  : (
    ...args: ToNativeParameterTypes<T["parameters"]>
  ) => StaticForeignSymbolReturnType<T>;
type StaticForeignLibraryInterface<T extends DynamicLibraryInterface> = {
  [K in keyof T]: FromForeignFunction<T[K]>;
};

export type DynamicLibrary<T extends DynamicLibraryInterface> = {
  symbols: StaticForeignLibraryInterface<T>;

  close(): void;
};
