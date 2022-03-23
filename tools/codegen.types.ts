export type CodeGenTypeScriptType = "boolean" | "number" | "string" | "void";

export type CodeGenTypeMapping<T extends Deno.NativeType = Deno.NativeType> =
  T extends "pointer"
    ? ["pointer", "string" | "Deno.UnsafePointer"]
    : T extends
        | "u8"
        | "i8"
        | "u16"
        | "i16"
        | "u32"
        | "i32"
        | "u64"
        | "i64"
        | "usize"
        | "isize"
        | "f32"
        | "f64"
    ? [T, "number"]
    : T extends "void"
    ? ["void", "void"]
    : never;

export type CodeGenFunction = {
  parameters: Record<string, CodeGenTypeMapping>;
  result: CodeGenTypeMapping;
};
