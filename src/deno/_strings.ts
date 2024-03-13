import { PlatformPointer, PlatformString } from "../_types.ts";

export function denoFromPlatformString(
  value: Uint8Array | PlatformPointer<unknown>
): string {
  if (value instanceof Uint8Array) {
    return new TextDecoder().decode(value);
  }

  return new Deno.UnsafePointerView(
    value as unknown as NonNullable<Deno.PointerValue>
  ).getCString();
}

export function denoToPlatformString(value: string | null): PlatformString {
  if (value === null) {
    return null as unknown as PlatformString;
  }

  return Deno.UnsafePointer.of(
    new TextEncoder().encode(value + "\0")
  ) as unknown as PlatformString;
}
