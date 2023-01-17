import { Platform } from "../_types.ts";
import { denoLoadLibrary } from "./_library.ts";
import { DENO_NULL_POINTER, DenoPlatformDataView, DenoPlatformPointer } from "./_pointers.ts";
import { denoFromNativeString, denoToNativeString } from "./_strings.ts";

const denoPlatform: Platform = {
  NULL_POINTER: DENO_NULL_POINTER,

  Pointer: DenoPlatformPointer,
  DataView: DenoPlatformDataView,

  fromNativeString: denoFromNativeString,
  loadLibrary: denoLoadLibrary,
  toNativeString: denoToNativeString,
};

export default denoPlatform;
