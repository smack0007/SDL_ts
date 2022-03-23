export function toCString(v: string): Uint8Array {
  return new TextEncoder().encode(v + "\0");
}

export function fromCString(v: Uint8Array): string {
  return new TextDecoder().decode(v);
}
