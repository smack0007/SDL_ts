import { f32, f64, i16, i32, i64, i8, PointerValue, TypedArray, u16, u32, u64, u8 } from "../types.ts";
import { ENDIANNESS } from "../_utils.ts";

export const DENO_NULL_POINTER = 0n;

export class DenoPlatformPointer {
  // TODO: Is there any way to detect this correctly?
  public static readonly SIZE_IN_BYTES = 8;

  private constructor() {
  }

  public static of<T>(memory: TypedArray, offsetInBytes: Deno.PointerValue = 0): PointerValue<T> {
    // Note: as bigint is just to make TypeScript happy.
    return (Deno.UnsafePointer.of(memory) as bigint) + (offsetInBytes as bigint);
  }
}

export class DenoPlatformDataView {
  private static DATA_MUST_BE_ARRAY_BUFFER_ERROR = "data must be an instance of ArrayBuffer in order to set values.";

  public static LITTLE_ENDIAN = ENDIANNESS === "LE";

  private _view: globalThis.DataView | Deno.UnsafePointerView;

  constructor(
    public readonly data: Uint8Array | PointerValue<unknown>,
  ) {
    if (this.data instanceof Uint8Array) {
      this._view = new globalThis.DataView(this.data.buffer, this.data.byteOffset, this.data.byteLength);
    } else {
      // TODO: bigint cast is currently necessary but will hopefully be removed in future versions
      // of Deno.
      this._view = new Deno.UnsafePointerView(this.data as bigint);
    }
  }

  private static ensureViewIsDataView(
    view: globalThis.DataView | Deno.UnsafePointerView,
  ): asserts view is globalThis.DataView {
    if (!(view instanceof globalThis.DataView)) {
      throw new Error(DenoPlatformDataView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
  }

  public getArray(byteLength: number, byteOffset: number): Uint8Array {
    if (this._view instanceof globalThis.DataView) {
      throw new Error("Not implemented.");
    } else {
      return new Uint8Array(this._view.getArrayBuffer(byteLength, byteOffset));
    }
  }

  public getBigInt64(byteOffset: number): i64 {
    return this._view.getBigInt64(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN) as i64;
  }

  public getBigUint64(byteOffset: number): u64 {
    return this._view.getBigUint64(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN) as u64;
  }

  public getInt8(byteOffset: number): i8 {
    return this._view.getInt8(byteOffset) as i8;
  }

  public getInt16(byteOffset: number): i16 {
    return this._view.getInt16(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN) as i16;
  }

  public getInt32(byteOffset: number): i32 {
    return this._view.getInt32(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN) as i32;
  }

  public getFloat32(byteOffset: number): f32 {
    return this._view.getFloat32(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN) as f32;
  }

  public getFloat64(byteOffset: number): f64 {
    return this._view.getFloat64(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN) as f64;
  }

  public getPointer<T>(byteOffset: number): PointerValue<T> {
    // TODO: We should test here if we're on 32 or 64 bit.
    return this._view.getBigUint64(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN);
  }

  public getUint8(byteOffset: number): u8 {
    return this._view.getUint8(byteOffset) as u8;
  }

  public getUint16(byteOffset: number): u16 {
    return this._view.getUint16(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN) as u16;
  }

  public getUint32(byteOffset: number): u32 {
    return this._view.getUint32(byteOffset, DenoPlatformDataView.LITTLE_ENDIAN) as u32;
  }

  public setInt8(byteOffset: number, value: i8): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setInt8(byteOffset, value);
  }

  public setInt16(byteOffset: number, value: i16): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setInt16(byteOffset, value, DenoPlatformDataView.LITTLE_ENDIAN);
  }

  public setInt32(byteOffset: number, value: i32): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setInt32(byteOffset, value, DenoPlatformDataView.LITTLE_ENDIAN);
  }

  public setBigInt64(byteOffset: number, value: i64): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setBigInt64(byteOffset, value, DenoPlatformDataView.LITTLE_ENDIAN);
  }

  public setUint8(byteOffset: number, value: u8): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setUint8(byteOffset, value);
  }

  public setUint16(byteOffset: number, value: u16): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setUint16(byteOffset, value, DenoPlatformDataView.LITTLE_ENDIAN);
  }

  public setUint32(byteOffset: number, value: u32): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setUint32(byteOffset, value, DenoPlatformDataView.LITTLE_ENDIAN);
  }

  public setBigUint64(byteOffset: number, value: u64): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setBigUint64(byteOffset, value, DenoPlatformDataView.LITTLE_ENDIAN);
  }

  public setFloat32(byteOffset: number, value: f32): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setFloat32(byteOffset, value, DenoPlatformDataView.LITTLE_ENDIAN);
  }

  public setFloat64(byteOffset: number, value: f64): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setFloat64(byteOffset, value, DenoPlatformDataView.LITTLE_ENDIAN);
  }
}
