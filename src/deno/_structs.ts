import { Pointer } from "../pointers.ts";
import { AllocatableStruct, AllocatableStructConstructor, Struct, StructConstructor, TypedArray } from "../types.ts";
import { isTypedArray, throwError } from "../_utils.ts";
import { DenoPlatformDataView } from "./_dataView.ts";
import { PlatformPointer } from "../_types.ts";
import { denoFromPlatformPointer } from "./_pointers.ts";

export function denoToPlatformStruct<T extends AllocatableStruct>(
  data: TypedArray | Pointer<T>,
  dataType?: AllocatableStructConstructor<T>,
): Uint8Array {
  if (data instanceof Uint8Array) {
    return data;
  } else if (isTypedArray(data)) {
    return new Uint8Array(data.buffer);
  } else {
    if (isTypedArray(data._data)) {
      return new Uint8Array(data._data.buffer);
    } else {
      if (dataType === undefined) {
        throwError("Cannot retrieve a buffer from a pointer without type!");
      } else {
        const view = new DenoPlatformDataView(data._data);
        return view.getArray(dataType.SIZE_IN_BYTES, 0);
      }
    }
  }
}

export function denoFromPlatformStruct<T extends AllocatableStruct>(
  data: PlatformPointer<T>,
  dataType: AllocatableStructConstructor<T>,
): T | null {
  return dataType.of(denoFromPlatformPointer(data));
}
