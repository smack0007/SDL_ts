import { denoLoadLibrary } from "./_library.ts";
import { denoFromPlatformPointer, DenoPlatformDataView, denoToPlatformPointer } from "./_pointers.ts";
import { denoFromPlatformString, denoToPlatformString } from "./_strings.ts";

export default class {
  // TODO: Is there any way to detect this correctly?
  public static POINTER_SIZE_IN_BYTES = 8;

  public static DataView = DenoPlatformDataView;

  public static fromPlatformPointer = denoFromPlatformPointer;
  public static fromPlatformString = denoFromPlatformString;
  public static loadLibrary = denoLoadLibrary;
  public static toPlatformPointer = denoToPlatformPointer;
  public static toPlatformString = denoToPlatformString;
}
