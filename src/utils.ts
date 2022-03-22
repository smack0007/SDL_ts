export function encode(v: string): Uint8Array {
  return new TextEncoder().encode(v + "\0");
}

export function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v);
}
