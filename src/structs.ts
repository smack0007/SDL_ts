// This file is auto generated. To update the file make changes to the code generator.

import { BufferOrPointerView } from "./utils.ts";

export type Window = Deno.UnsafePointer;

export class Rect {
  public _data: BufferOrPointerView;

  constructor(data: ArrayBuffer | Deno.UnsafePointer) {
    this._data = new BufferOrPointerView(data);
  }

  public get buffer(): ArrayBuffer | null {
    return this._data.buffer;
  }

  public get pointer(): Deno.UnsafePointer | null {
    return this._data.pointer;
  }

  public get x(): number {
    return this._data.getInt32(0);
  }

  public get y(): number {
    return this._data.getInt32(4);
  }

  public get w(): number {
    return this._data.getInt32(8);
  }

  public get h(): number {
    return this._data.getInt32(12);
  }
}

export class Surface {
  public _data: BufferOrPointerView;

  constructor(data: ArrayBuffer | Deno.UnsafePointer) {
    this._data = new BufferOrPointerView(data);
  }

  public get buffer(): ArrayBuffer | null {
    return this._data.buffer;
  }

  public get pointer(): Deno.UnsafePointer | null {
    return this._data.pointer;
  }

  public get flags(): number {
    return this._data.getUint32(0);
  }

  public get format(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._data.getBigUint64(8));
  }

  public get w(): number {
    return this._data.getInt32(16);
  }

  public get h(): number {
    return this._data.getInt32(20);
  }

  public get pitch(): number {
    return this._data.getInt32(24);
  }

  public get pixels(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._data.getBigUint64(32));
  }

  public get userdata(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._data.getBigUint64(40));
  }

  public get locked(): number {
    return this._data.getInt32(48);
  }

  public get list_blitmap(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._data.getBigUint64(56));
  }

  public get clip_rect(): Rect {
    return new Rect(this._data.getArrayBuffer(16, 64));
  }

  public get map(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._data.getBigUint64(80));
  }

  public get refcount(): number {
    return this._data.getInt32(88);
  }
}
