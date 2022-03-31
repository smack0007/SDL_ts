type CodeGenStructType = {
  size: number;
  members: Record<string, {
    nativeType: string;
    type: Deno.NativeType;
    offset: number;
  }>;
};