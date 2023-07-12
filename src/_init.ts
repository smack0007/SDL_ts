import { FunctionWithSymbolName } from "./types.ts";

export function getSymbolsFromFunctions<T extends Deno.ForeignLibraryInterface>(
  symbols: T,
  functions: ReadonlyArray<FunctionWithSymbolName>,
): T {
  const result: Deno.ForeignLibraryInterface = {};

  for (const func of functions) {
    result[func.symbolName] = symbols[func.symbolName];
  }

  return result as T;
}
