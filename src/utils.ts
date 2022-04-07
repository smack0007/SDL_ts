export const ENDIANNESS = (function (): "BE" | "LE" {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
})();

export const NULL_POINTER = new Deno.UnsafePointer(0n);

export function toCString(value: string): Uint8Array {
  return new TextEncoder().encode(value + "\0");
}

export function fromCString(value: Uint8Array | Deno.UnsafePointer): string {
  if (value instanceof Deno.UnsafePointer) {
    return new Deno.UnsafePointerView(value).getCString();
  }

  return new TextDecoder().decode(value);
}

export class ArrayOrPointerView {
  private static DATA_MUST_BE_ARRAY_BUFFER_ERROR = "data must be an instance of ArrayBuffer in order to set values.";

  public static LITTLE_ENDIAN = ENDIANNESS === "LE";

  public _dataView: DataView | Deno.UnsafePointerView;

  constructor(public _data: Uint8Array | Deno.UnsafePointer) {
    if (this._data instanceof Uint8Array) {
      this._dataView = new DataView(this._data.buffer);
    } else {
      this._dataView = new Deno.UnsafePointerView(this._data);
    }
  }

  public get pointer(): Deno.UnsafePointer {
    return this._data instanceof Deno.UnsafePointer ? this._data : Deno.UnsafePointer.of(this._data);
  }

  public getArray(byteLength: number, byteOffset: number): Uint8Array {
    if (this._dataView instanceof DataView) {
      throw new Error("Not implemented.");
    } else {
      return new Uint8Array(this._dataView.getArrayBuffer(byteLength, byteOffset));
    }
  }

  public getBigUint64(byteOffset: number): bigint {
    return this._dataView.getBigUint64(byteOffset, ArrayOrPointerView.LITTLE_ENDIAN);
  }

  public getInt32(byteOffset: number): number {
    return this._dataView.getInt32(byteOffset, ArrayOrPointerView.LITTLE_ENDIAN);
  }

  public getUint8(byteOffset: number): number {
    return this._dataView.getUint8(byteOffset);
  }

  public getUint32(byteOffset: number): number {
    return this._dataView.getUint32(byteOffset, ArrayOrPointerView.LITTLE_ENDIAN);
  }

  public setInt32(byteOffset: number, value: number): void {
    if (!(this._dataView instanceof DataView)) {
      throw new Error(ArrayOrPointerView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._dataView.setInt32(byteOffset, value, ArrayOrPointerView.LITTLE_ENDIAN);
  }

  public setUint8(byteOffset: number, value: number): void {
    if (!(this._dataView instanceof DataView)) {
      throw new Error(ArrayOrPointerView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._dataView.setUint8(byteOffset, value);
  }

  public setUint32(byteOffset: number, value: number): void {
    if (!(this._dataView instanceof DataView)) {
      throw new Error(ArrayOrPointerView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._dataView.setUint32(byteOffset, value, ArrayOrPointerView.LITTLE_ENDIAN);
  }
}
