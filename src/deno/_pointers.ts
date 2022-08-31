import { PointerValue, TypedArray } from "../types.ts";
import { ENDIANNESS } from "../_utils.ts";

export const NULL_POINTER = 0n;

export class PlatformPointer {
  // TODO: Is there any way to detect this correctly?
  public static readonly SIZE_IN_BYTES = 8;
  
  private constructor() {
  }
  
  public static of<T>(memory: TypedArray, offsetInBytes: Deno.PointerValue = 0): PointerValue<T> {
    // Note: as bigint is just to make TypeScript happy.
    return (Deno.UnsafePointer.of(memory) as bigint) + (offsetInBytes as bigint);
  }
}

export class PlatformDataView<T> {
  private static DATA_MUST_BE_ARRAY_BUFFER_ERROR = "data must be an instance of ArrayBuffer in order to set values.";

  public static LITTLE_ENDIAN = ENDIANNESS === "LE";

  private _view: globalThis.DataView | Deno.UnsafePointerView;

  constructor(
    private _data: Uint8Array | PointerValue<T>,
  ) {
    if (this._data instanceof Uint8Array) {
      this._view = new globalThis.DataView(this._data.buffer, this._data.byteOffset, this._data.byteLength);
    } else {
      // TODO: bigint cast is currently necessary but will hopefully be removed in future versions
      // of Deno.
      this._view = new Deno.UnsafePointerView(this._data as bigint);
    }
  }

  public getArray(byteLength: number, byteOffset: number): Uint8Array {
    if (this._view instanceof globalThis.DataView) {
      throw new Error("Not implemented.");
    } else {
      return new Uint8Array(this._view.getArrayBuffer(byteLength, byteOffset));
    }
  }

  public getBigInt64(byteOffset: number): bigint {
    return this._view.getBigInt64(byteOffset, PlatformDataView.LITTLE_ENDIAN) as bigint;
  }

  public getBigUint64(byteOffset: number): bigint {
    return this._view.getBigUint64(byteOffset, PlatformDataView.LITTLE_ENDIAN) as bigint;
  }

  public getInt8(byteOffset: number): number {
    return this._view.getInt8(byteOffset);
  }

  public getInt16(byteOffset: number): number {
    return this._view.getInt16(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getInt32(byteOffset: number): number {
    return this._view.getInt32(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getFloat32(byteOffset: number): number {
    return this._view.getFloat32(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getFloat64(byteOffset: number): number {
    return this._view.getFloat64(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getPointer<T>(byteOffset: number): PointerValue<T> {
    // TODO: We should test here if we're on 32 or 64 bit.
    return this._view.getBigUint64(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getUint8(byteOffset: number): number {
    return this._view.getUint8(byteOffset);
  }

  public getUint16(byteOffset: number): number {
    return this._view.getUint16(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getUint32(byteOffset: number): number {
    return this._view.getUint32(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public setInt32(byteOffset: number, value: number): void {
    if (!(this._view instanceof globalThis.DataView)) {
      throw new Error(PlatformDataView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._view.setInt32(byteOffset, value, PlatformDataView.LITTLE_ENDIAN);
  }

  public setUint8(byteOffset: number, value: number): void {
    if (!(this._view instanceof globalThis.DataView)) {
      throw new Error(PlatformDataView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._view.setUint8(byteOffset, value);
  }

  public setUint32(byteOffset: number, value: number): void {
    if (!(this._view instanceof globalThis.DataView)) {
      throw new Error(PlatformDataView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._view.setUint32(byteOffset, value, PlatformDataView.LITTLE_ENDIAN);
  }
}
