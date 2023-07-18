import { DynamicLibraryInterface } from "./_library.ts";
import { FunctionWithSymbolName } from "./types.ts";

export function getSymbolsFromFunctions<T extends DynamicLibraryInterface>(
  symbols: T,
  functions: ReadonlyArray<FunctionWithSymbolName>,
): T {
  const result: DynamicLibraryInterface = {};

  for (const func of functions) {
    result[func.symbolName] = symbols[func.symbolName];
  }

  return result as T;
}
