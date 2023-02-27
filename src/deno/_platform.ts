import { Platform } from "../_types.ts";
import { denoLoadLibrary } from "./_library.ts";
import { denoFromPlatformPointer, DenoPlatformDataView, denoToPlatformPointer } from "./_pointers.ts";
import { denoFromPlatformString, denoToPlatformString } from "./_strings.ts";

const denoPlatform: Platform = {
  // TODO: Is there any way to detect this correctly?
  POINTER_SIZE_IN_BYTES: 8,

  DataView: DenoPlatformDataView,

  fromPlatformPointer: denoFromPlatformPointer,
  fromPlatformString: denoFromPlatformString,
  loadLibrary: denoLoadLibrary,
  toPlatformPointer: denoToPlatformPointer,
  toPlatformString: denoToPlatformString,
};

export default denoPlatform;
