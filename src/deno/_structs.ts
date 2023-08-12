import { Struct, StructConstructor } from "../types.ts";
import { DenoPlatformDataView } from "./_dataView.ts";
import { PlatformPointer } from "../_types.ts";
import { denoFromPlatformPointer } from "./_pointers.ts";
import { hasSizeInBytesProperty, throwError } from "../_utils.ts";

export function denoToPlatformStruct<T extends Struct>(
  struct: T,
  structConstructor: StructConstructor<T>,
): Uint8Array {
  if (struct._data instanceof Uint8Array) {
    if (struct._byteOffset === 0) {
      return struct._data;
    } else {
      return new Uint8Array(struct._data, struct._byteOffset);
    }
  } else if (hasSizeInBytesProperty(structConstructor)) {
    const view = new DenoPlatformDataView(struct._data);
    return view.getArray(structConstructor.SIZE_IN_BYTES, struct._byteOffset);
  }

  throwError(`Unable to convert struct to platform struct in ${denoToPlatformStruct.name}.`);
}

export function denoFromPlatformStruct<T extends Struct>(
  data: PlatformPointer<T>,
  structConstructor: StructConstructor<T>,
): T | null {
  return structConstructor.of(denoFromPlatformPointer(data));
}
