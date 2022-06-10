// This file includes private utility types which should not be
// exposed as part of the API.

import { Pointer } from "./types.ts";

//
// Types
//

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

//
// Functions
//

export const ENDIANNESS = (function (): "BE" | "LE" {
  const buffer = new ArrayBuffer(2);
  new globalThis.DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256 ? "LE" : "BE";
})();

export const NULL_POINTER = new Deno.UnsafePointer(0n);

export function fromCString(value: Uint8Array | Deno.UnsafePointer): string {
  if (value instanceof Deno.UnsafePointer) {
    return new Deno.UnsafePointerView(value).getCString();
  }

  return new TextDecoder().decode(value);
}

export function toCString(value: string): Uint8Array {
  return new TextEncoder().encode(value + "\0");
}

//
// Classes
//

// DataPointer cannot explicitly implement Pointer<T> because Pointer<T>
// has dynamic members.
export class PlatformPointer<T> /* implements Pointer<T> */ {
  public _pointer: Deno.UnsafePointer;
  private readonly _constructor: (new (pointer: PlatformPointer<T>) => T) | null = null;
  private _value: T | null = null;

  constructor(
    pointer: Deno.UnsafePointer | bigint,
    constructorOrValue: (new (pointer: PlatformPointer<T>) => T) | T | null = null,
  ) {
    if (typeof pointer === "bigint") {
      pointer = new Deno.UnsafePointer(pointer);
    }

    this._pointer = pointer;

    if (constructorOrValue) {
      if (typeof constructorOrValue === "function") {
        this._constructor = constructorOrValue as (new (pointer: PlatformPointer<T>) => T);
      } else {
        this._value = constructorOrValue;
      }
    }
  }

  public get isNull(): boolean {
    return this._pointer.value === 0n;
  }

  public get address(): bigint {
    return this._pointer.value;
  }

  public get value(): T {
    if (this._value === null) {
      if (!this._constructor) {
        throw new Error("Unable to create type pointed to by pointer as no constructor was provided.");
      }

      this._value = new this._constructor(this);
    }

    return this._value as T;
  }

  public setValue(value: T): void {
    this._value = value;
  }
}

export class PlatformDataView<T> {
  private static DATA_MUST_BE_ARRAY_BUFFER_ERROR = "data must be an instance of ArrayBuffer in order to set values.";

  public static LITTLE_ENDIAN = ENDIANNESS === "LE";

  private _dataView: globalThis.DataView | Deno.UnsafePointerView;

  constructor(
    private _data: Uint8Array | PlatformPointer<T>,
  ) {
    if (this._data instanceof Uint8Array) {
      this._dataView = new globalThis.DataView(this._data.buffer, this._data.byteOffset, this._data.byteLength);
    } else {
      this._dataView = new Deno.UnsafePointerView(this._data._pointer);
    }
  }

  public getArray(byteLength: number, byteOffset: number): Uint8Array {
    if (this._dataView instanceof globalThis.DataView) {
      throw new Error("Not implemented.");
    } else {
      return new Uint8Array(this._dataView.getArrayBuffer(byteLength, byteOffset));
    }
  }

  public getBigUint64(byteOffset: number): bigint {
    return this._dataView.getBigUint64(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getInt32(byteOffset: number): number {
    return this._dataView.getInt32(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getUint8(byteOffset: number): number {
    return this._dataView.getUint8(byteOffset);
  }

  public getUint16(byteOffset: number): number {
    return this._dataView.getUint16(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public getUint32(byteOffset: number): number {
    return this._dataView.getUint32(byteOffset, PlatformDataView.LITTLE_ENDIAN);
  }

  public setInt32(byteOffset: number, value: number): void {
    if (!(this._dataView instanceof globalThis.DataView)) {
      throw new Error(PlatformDataView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._dataView.setInt32(byteOffset, value, PlatformDataView.LITTLE_ENDIAN);
  }

  public setUint8(byteOffset: number, value: number): void {
    if (!(this._dataView instanceof globalThis.DataView)) {
      throw new Error(PlatformDataView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._dataView.setUint8(byteOffset, value);
  }

  public setUint32(byteOffset: number, value: number): void {
    if (!(this._dataView instanceof globalThis.DataView)) {
      throw new Error(PlatformDataView.DATA_MUST_BE_ARRAY_BUFFER_ERROR);
    }
    this._dataView.setUint32(byteOffset, value, PlatformDataView.LITTLE_ENDIAN);
  }
}
