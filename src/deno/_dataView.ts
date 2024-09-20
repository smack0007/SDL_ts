import { Callback, type Pointer } from "../types.ts";
import { PlatformCallback, PlatformPointer } from "../_types.ts";
import { ENDIANNESS } from "../_utils.ts";
import { denoFromPlatformCallback } from "./_callbacks.ts";
import { denoFromPlatformPointer, denoToPlatformPointer } from "./_pointers.ts";
import { DynamicCallbackDefinition } from "../_library.ts";
import { denoToPlatformCallback } from "./_callbacks.ts";

export class DenoPlatformDataView {
  private static DATA_MUST_BE_ARRAY_BUFFER_ERROR = "data must be an instance of ArrayBuffer in order to set values.";

  public static LITTLE_ENDIAN = ENDIANNESS === "LE";

  private _view: globalThis.DataView | Deno.UnsafePointerView;

  constructor(
    public readonly data: Uint8Array | Pointer<unknown>,
    public readonly byteOffset: number = 0,
  ) {
    if (this.data instanceof Uint8Array) {
      this._view = new globalThis.DataView(
        this.data.buffer,
        this.data.byteOffset,
        this.data.byteLength,
      );
    } else {
      this._view = new Deno.UnsafePointerView(
        // deno-lint-ignore no-explicit-any
        denoToPlatformPointer(this.data) as any,
      );
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

  public getArrayBuffer(byteLength: number, byteOffset: number): ArrayBuffer {
    if (this._view instanceof globalThis.DataView) {
      throw new Error("Not implemented.");
    } else {
      return this._view.getArrayBuffer(byteLength, byteOffset);
    }
  }

  public getCallback<T extends Callback>(
    byteOffset: number,
    definition: DynamicCallbackDefinition<T>,
  ): T {
    return denoFromPlatformCallback(
      this._view.getBigUint64(
        this.byteOffset + byteOffset,
        DenoPlatformDataView.LITTLE_ENDIAN,
      ) as unknown as PlatformCallback,
      definition,
    );
  }

  public getF32(byteOffset: number): number {
    return this._view.getFloat32(
      this.byteOffset + byteOffset,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public getF64(byteOffset: number): number {
    return this._view.getFloat64(
      this.byteOffset + byteOffset,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public getI8(byteOffset: number): number {
    return this._view.getInt8(this.byteOffset + byteOffset);
  }

  public getI16(byteOffset: number): number {
    return this._view.getInt16(
      this.byteOffset + byteOffset,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public getI32(byteOffset: number): number {
    return this._view.getInt32(
      this.byteOffset + byteOffset,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public getI64(byteOffset: number): bigint {
    return this._view.getBigInt64(
      this.byteOffset + byteOffset,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public getPointer<T>(byteOffset: number): Pointer<T> {
    // TODO: We should test here if we're on 32 or 64 bit.
    return denoFromPlatformPointer(
      Deno.UnsafePointer.create(
        this._view.getBigUint64(
          this.byteOffset + byteOffset,
          DenoPlatformDataView.LITTLE_ENDIAN,
        ),
      ) as unknown as PlatformPointer<T>,
    ) as Pointer<T>;
  }

  public getU8(byteOffset: number): number {
    return this._view.getUint8(this.byteOffset + byteOffset);
  }

  public getU16(byteOffset: number): number {
    return this._view.getUint16(
      this.byteOffset + byteOffset,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public getU32(byteOffset: number): number {
    return this._view.getUint32(
      this.byteOffset + byteOffset,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public getU64(byteOffset: number): bigint {
    return this._view.getBigUint64(
      this.byteOffset + byteOffset,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setCallback<T extends Callback>(
    byteOffset: number,
    value: T,
    definition: DynamicCallbackDefinition<T>,
  ): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setBigInt64(
      byteOffset,
      denoToPlatformCallback(value, definition) as unknown as bigint,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setF32(byteOffset: number, value: number): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setFloat32(
      this.byteOffset + byteOffset,
      value,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setF64(byteOffset: number, value: number): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setFloat64(
      this.byteOffset + byteOffset,
      value,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setI8(byteOffset: number, value: number): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setInt8(this.byteOffset + byteOffset, value);
  }

  public setI16(byteOffset: number, value: number): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setInt16(
      this.byteOffset + byteOffset,
      value,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setI32(byteOffset: number, value: number): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setInt32(
      this.byteOffset + byteOffset,
      value,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setI64(byteOffset: number, value: bigint): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setBigInt64(
      this.byteOffset + byteOffset,
      value,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setPointer<T>(byteOffset: number, value: Pointer<T>): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    return this._view.setBigUint64(
      this.byteOffset + byteOffset,
      BigInt(
        Deno.UnsafePointer.value(
          denoToPlatformPointer(
            value,
          ) as unknown as NonNullable<Deno.PointerValue>,
        ),
      ),
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setU8(byteOffset: number, value: number): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setUint8(this.byteOffset + byteOffset, value);
  }

  public setU16(byteOffset: number, value: number): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setUint16(
      this.byteOffset + byteOffset,
      value,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setU32(byteOffset: number, value: number): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setUint32(
      this.byteOffset + byteOffset,
      value,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }

  public setU64(byteOffset: number, value: bigint): void {
    DenoPlatformDataView.ensureViewIsDataView(this._view);
    this._view.setBigUint64(
      this.byteOffset + byteOffset,
      value,
      DenoPlatformDataView.LITTLE_ENDIAN,
    );
  }
}
