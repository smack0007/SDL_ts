import {
  denoFromPlatformCallback,
  denoToPlatformCallback,
} from "./_callbacks.ts";
import { DenoPlatformDataView } from "./_dataView.ts";
import { denoLoadLibrary } from "./_library.ts";
import { denoFromPlatformPointer, denoIsPlatformPointer, denoToPlatformPointer } from "./_pointers.ts";
import { denoFromPlatformString, denoToPlatformString } from "./_strings.ts";
import { denoFromPlatformStruct, denoToPlatformStruct } from "./_structs.ts";

export default class {
  // TODO: Is there any way to detect this correctly?
  public static POINTER_SIZE_IN_BYTES = 8;

  public static DataView = DenoPlatformDataView;

  public static fromPlatformCallback = denoFromPlatformCallback;
  public static fromPlatformPointer = denoFromPlatformPointer;
  public static fromPlatformString = denoFromPlatformString;
  public static fromPlatformStruct = denoFromPlatformStruct;
  public static isPlatformPointer = denoIsPlatformPointer;
  public static loadLibrary = denoLoadLibrary;
  public static toPlatformCallback = denoToPlatformCallback;
  public static toPlatformPointer = denoToPlatformPointer;
  public static toPlatformString = denoToPlatformString;
  public static toPlatformStruct = denoToPlatformStruct;
}
