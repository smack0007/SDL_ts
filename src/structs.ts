// This file is auto generated. To update the file make changes to the code generator.

import { ArrayOrPointerView } from "./utils.ts";

export type RWops = Deno.UnsafePointer;
export type Window = Deno.UnsafePointer;

export class Rect {
  public static SIZE_IN_BYTES = 16;
  public _data: Uint8Array | Deno.UnsafePointer;
  public _view: ArrayOrPointerView;

  constructor(data?: Uint8Array | Deno.UnsafePointer) {
    if (!data) {
      data = new Uint8Array(Rect.SIZE_IN_BYTES);
    }

    this._data = data;
    this._view = new ArrayOrPointerView(this._data);
  }

  public get array(): Uint8Array | null {
    return this._view.array;
  }

  public get pointer(): Deno.UnsafePointer {
    return this._view.pointer;
  }

  public get x(): number {
    return this._view.getInt32(0);
  }

  public set x(value: number) {
    this._view.setInt32(0, value);
  }

  public get y(): number {
    return this._view.getInt32(4);
  }

  public set y(value: number) {
    this._view.setInt32(4, value);
  }

  public get w(): number {
    return this._view.getInt32(8);
  }

  public set w(value: number) {
    this._view.setInt32(8, value);
  }

  public get h(): number {
    return this._view.getInt32(12);
  }

  public set h(value: number) {
    this._view.setInt32(12, value);
  }
}

export class Surface {
  public static SIZE_IN_BYTES = 96;
  public _data: Uint8Array | Deno.UnsafePointer;
  public _view: ArrayOrPointerView;

  constructor(data?: Uint8Array | Deno.UnsafePointer) {
    if (!data) {
      data = new Uint8Array(Surface.SIZE_IN_BYTES);
    }

    this._data = data;
    this._view = new ArrayOrPointerView(this._data);
  }

  public get array(): Uint8Array | null {
    return this._view.array;
  }

  public get pointer(): Deno.UnsafePointer {
    return this._view.pointer;
  }

  public get flags(): number {
    return this._view.getUint32(0);
  }

  public set flags(value: number) {
    this._view.setUint32(0, value);
  }

  public get format(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._view.getBigUint64(8));
  }

  public get w(): number {
    return this._view.getInt32(16);
  }

  public set w(value: number) {
    this._view.setInt32(16, value);
  }

  public get h(): number {
    return this._view.getInt32(20);
  }

  public set h(value: number) {
    this._view.setInt32(20, value);
  }

  public get pitch(): number {
    return this._view.getInt32(24);
  }

  public set pitch(value: number) {
    this._view.setInt32(24, value);
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

  public set locked(value: number) {
    this._view.setInt32(48, value);
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

  public set refcount(value: number) {
    this._view.setInt32(88, value);
  }
}
