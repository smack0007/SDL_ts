export const endianness = (function (): "BE" | "LE" {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
})();

export function toCString(v: string): Uint8Array {
  return new TextEncoder().encode(v + "\0");
}

export function fromCString(v: Uint8Array): string {
  return new TextDecoder().decode(v);
}

export class BufferOrPointerView {
  public static littleEndian = endianness === "LE";

  public _dataView: DataView | Deno.UnsafePointerView;

  constructor(public _data: ArrayBuffer | Deno.UnsafePointer) {
    if (this._data instanceof ArrayBuffer) {
      this._dataView = new DataView(this._data);
    } else {
      this._dataView = new Deno.UnsafePointerView(this._data);
    }
  }

  public get buffer(): ArrayBuffer | null {
    return this._data instanceof ArrayBuffer ? this._data : null;
  }

  public get pointer(): Deno.UnsafePointer | null {
    return this._data instanceof Deno.UnsafePointer ? this._data : null;
  }

  public getArrayBuffer(byteLength: number, byteOffset: number): ArrayBuffer {
    if (this._dataView instanceof DataView) {
      throw new Error("Not implemented.");
    } else {
      return this._dataView.getArrayBuffer(byteLength, byteOffset);
    }
  }

  public getBigUint64(byteOffset: number): bigint {
    return this._dataView.getBigUint64(byteOffset, BufferOrPointerView.littleEndian);
  }

  public getInt32(byteOffset: number): number {
    return this._dataView.getInt32(byteOffset, BufferOrPointerView.littleEndian);
  }

  public getUint8(byteOffset: number): number {
    return this._dataView.getUint8(byteOffset);
  }

  public getUint32(byteOffset: number): number {
    return this._dataView.getUint32(byteOffset, BufferOrPointerView.littleEndian);
  }
}
