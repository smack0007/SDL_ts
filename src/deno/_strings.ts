import { PointerValue } from "../types.ts";

export function fromPlatformString(value: Uint8Array | PointerValue<unknown>): string {
  if (value instanceof Uint8Array) {
    return new TextDecoder().decode(value);
  }

  return new Deno.UnsafePointerView(value as bigint).getCString();
}

export function toPlatformString(value: string): Deno.PointerValue {
  return Deno.UnsafePointer.of(new TextEncoder().encode(value + "\0"));
}
