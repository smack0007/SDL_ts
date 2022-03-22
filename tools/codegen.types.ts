export type CodeGenTypeScriptType = "boolean" | "number" | "string" | "void";

export type CodeGenTypeMapping<T extends Deno.NativeType = Deno.NativeType> =
  T extends "pointer"
    ? ["pointer", "string"]
    : T extends "u32" | "i32"
    ? [T, "number"]
    : T extends "void"
    ? ["void", "void"]
    : never;

export type CodeGenFunction = {
  parameters: CodeGenTypeMapping[];
  result: CodeGenTypeMapping;
};
