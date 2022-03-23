export type CodeGenFunction = {
  parameters: Record<string, Deno.NativeType>;
  result: Deno.NativeType;
};
