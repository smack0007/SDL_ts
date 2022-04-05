// This file is auto generated. To update the file make changes to the code generator.

import { BufferOrPointerView } from "./utils.ts";

export type Window = Deno.UnsafePointer;

export class Rect {
  public _data: ArrayBuffer | Deno.UnsafePointer;
  public _view: BufferOrPointerView;

  constructor(data: ArrayBuffer | Deno.UnsafePointer) {
    this._data = data;
    this._view = new BufferOrPointerView(this._data);
  }

  public get buffer(): ArrayBuffer | null {
    return this._view.buffer;
  }

  public get pointer(): Deno.UnsafePointer | null {
    return this._view.pointer;
  }

  public get x(): number {
    return this._view.getInt32(0);
  }

  public get y(): number {
    return this._view.getInt32(4);
  }

  public get w(): number {
    return this._view.getInt32(8);
  }

  public get h(): number {
    return this._view.getInt32(12);
  }
}

export class Surface {
  public _data: ArrayBuffer | Deno.UnsafePointer;
  public _view: BufferOrPointerView;

  constructor(data: ArrayBuffer | Deno.UnsafePointer) {
    this._data = data;
    this._view = new BufferOrPointerView(this._data);
  }

  public get buffer(): ArrayBuffer | null {
    return this._view.buffer;
  }

  public get pointer(): Deno.UnsafePointer | null {
    return this._view.pointer;
  }

  public get flags(): number {
    return this._view.getUint32(0);
  }

  public get format(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._view.getBigUint64(8));
  }

  public get w(): number {
    return this._view.getInt32(16);
  }

  public get h(): number {
    return this._view.getInt32(20);
  }

  public get pitch(): number {
    return this._view.getInt32(24);
  }

  public get pixels(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._view.getBigUint64(32));
  }

  public get userdata(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._view.getBigUint64(40));
  }

  public get locked(): number {
    return this._view.getInt32(48);
  }

  public get list_blitmap(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._view.getBigUint64(56));
  }

  public get clip_rect(): Rect {
    return new Rect(this._view.getArrayBuffer(16, 64));
  }

  public get map(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._view.getBigUint64(80));
  }

  public get refcount(): number {
    return this._view.getInt32(88);
  }
}
