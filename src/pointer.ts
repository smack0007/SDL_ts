import { PlatformPointer } from "platform";
import { isStruct } from "./_structs.ts";

export interface Pointer<T> {
  readonly isNull: boolean;

  readonly address: bigint;

  readonly value: T;
}

interface PointerCache<T> {
  __pointer?: Pointer<T>;
}

export const Pointer = {
  of: function<T>(value: T, offset?: number): Pointer<T> {
    if (offset === undefined) {
      offset = 0;
    }

    if (offset < 0) {
      throw new Error("offset must be >= 0.");
    }

    if (isStruct<T>(value)) {
      if (value._data instanceof Uint8Array) {
        const cache = value as unknown as PointerCache<T>;

        if (cache.__pointer === undefined) {
          cache.__pointer = PlatformPointer.of(value._data, value);
        }

        return cache.__pointer;
      } else {
        return value._data;
      }
    } else {
      throw new Error("Unable to create pointer.");
    }
  }
} as const;