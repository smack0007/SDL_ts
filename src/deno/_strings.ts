export function fromPlatformString(value: Uint8Array | Deno.UnsafePointer): string {
  if (value instanceof Deno.UnsafePointer) {
    return new Deno.UnsafePointerView(value).getCString();
  }

  return new TextDecoder().decode(value);
}

export function toPlatformString(value: string): Uint8Array {
  return new TextEncoder().encode(value + "\0");
}
