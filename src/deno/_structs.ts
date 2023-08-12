import { Pointer } from "../pointers.ts";
import { AllocatableStruct, AllocatableStructConstructor, TypedArray } from "../types.ts";
import { isTypedArray } from "../_utils.ts";
import { DenoPlatformDataView } from "./_dataView.ts";
import { PlatformPointer } from "../_types.ts";
import { denoFromPlatformPointer } from "./_pointers.ts";

export function denoToPlatformStruct<T extends AllocatableStruct>(
  data: TypedArray | Pointer<T>,
  dataType: AllocatableStructConstructor<T>,
  byteOffset: number,
): Uint8Array {
  if (data instanceof Uint8Array) {
    return data;
  } else if (isTypedArray(data)) {
    return new Uint8Array(data.buffer, byteOffset);
  } else if (isTypedArray(data._data)) {
    return new Uint8Array(data._data.buffer, byteOffset);
  } else {
    // TODO: Could we cache this?
    const view = new DenoPlatformDataView(data);
    return view.getArray(dataType.SIZE_IN_BYTES, byteOffset);
  }
}

export function denoFromPlatformStruct<T extends AllocatableStruct>(
  data: PlatformPointer<T>,
  dataType: AllocatableStructConstructor<T>,
): T | null {
  return dataType.of(denoFromPlatformPointer(data));
}
