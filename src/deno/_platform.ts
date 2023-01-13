import { Platform } from "../_types.ts";
import { loadLibrary } from "./_library.ts";
import { PlatformDataView } from "./_pointers.ts";
import { fromPlatformString, toPlatformString } from "./_strings.ts";

const platform: Platform = {
  DataView: PlatformDataView,

  fromPlatformString,
  loadLibrary,
  toPlatformString,
};

export default platform;
