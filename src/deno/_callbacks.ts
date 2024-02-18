import { DynamicCallbackDefinition } from "../_library.ts";
import { PlatformCallback } from "../_types.ts";
import { Callback } from "../types.ts";

interface CallbackInternal extends Callback {
  denoCallback?: Deno.UnsafeCallback;
}

export function denoFromPlatformCallback<T extends Callback>(
  callback: PlatformCallback,
  definition: DynamicCallbackDefinition<T>
): T {
  return null as unknown as T;
}

export function denoToPlatformCallback<T extends Callback>(
  callback: T,
  definition: DynamicCallbackDefinition<T>
): PlatformCallback {
  const callbackInternal = callback as CallbackInternal;
  if (callbackInternal.denoCallback) {
    return callbackInternal.denoCallback.pointer as unknown as PlatformCallback;
  }

  callbackInternal.denoCallback = new Deno.UnsafeCallback(
    // deno-lint-ignore no-explicit-any
    definition as any,
    // deno-lint-ignore no-explicit-any
    definition.wrap(callback) as any
  );

  return callbackInternal.denoCallback.pointer as unknown as PlatformCallback;
}
