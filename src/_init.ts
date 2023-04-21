import { DynamicLibraryInterface } from "./_library.ts";
import { FunctionWithSymbolName } from "./types.ts";

export function getSymbolsFromFunctions(
  symbols: DynamicLibraryInterface,
  functions: ReadonlyArray<FunctionWithSymbolName>,
): DynamicLibraryInterface {
  const result: DynamicLibraryInterface = {};

  for (const func of functions) {
    result[func.symbolName] = symbols[func.symbolName];
  }

  return result;
}
