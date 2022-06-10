// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-empty-interface no-unused-vars

import { fromCString, PlatformDataView, PlatformPointer } from "platform";
import { AllocatableStruct, f32, f64, i16, i32, i64, i8, Pointer, Struct, u16, u32, u64, u8 } from "../types.ts";

export interface BlitMap {}
export interface PixelFormat {}
export interface Renderer {}
export interface RWops {}
export interface Texture {}
export interface Window {}

export class Keysym implements Struct {
  public static SIZE_IN_BYTES = 16;

  private _data: Uint8Array | Pointer<Keysym>;
  private _view: PlatformDataView<Keysym>;
  private _pointer: PlatformPointer<Keysym>;

  constructor(data: Uint8Array);
  constructor(data: Pointer<Keysym>);
  constructor(data: Uint8Array | Pointer<Keysym>) {
    this._data = data;
    this._view = new PlatformDataView(this._data as Uint8Array | PlatformPointer<Keysym>);

    if (this._data instanceof Uint8Array) {
      this._pointer = new PlatformPointer<Keysym>(Deno.UnsafePointer.of(this._data), this);
    } else {
      this._pointer = this._data as PlatformPointer<Keysym>;
    }
  }

  public get pointer(): Pointer<Keysym> {
    return this._pointer;
  }

  public get scancode(): u32 {
    return this._view.getUint32(0);
  }

  public get sym(): u32 {
    return this._view.getUint32(4);
  }

  public get mod(): u16 {
    return this._view.getUint16(8);
  }

  public get unused(): u32 {
    return this._view.getUint32(12);
  }
}

export class Point implements AllocatableStruct {
  public static SIZE_IN_BYTES = 8;

  private _data: Uint8Array | Pointer<Point>;
  private _view: PlatformDataView<Point>;
  private _pointer: PlatformPointer<Point>;

  constructor();
  constructor(data: Uint8Array);
  constructor(data: Pointer<Point>);
  constructor(data: Partial<Point>);
  constructor(x: i32, y: i32);
  constructor(_1?: Uint8Array | Pointer<Point> | Partial<Point> | i32, _2?: i32) {
    if (_1 instanceof Uint8Array || _1 instanceof PlatformPointer) {
      this._data = _1;
      this._view = new PlatformDataView(this._data as Uint8Array | PlatformPointer<Point>);
    } else {
      this._data = new Uint8Array(Point.SIZE_IN_BYTES);
      this._view = new PlatformDataView(this._data);

      if (_1 !== undefined) {
        if (_2 === undefined) {
          Object.assign(this, _1);
        } else {
          this.x = _1 as i32;
          this.y = _2 as i32;
        }
      }
    }

    if (this._data instanceof Uint8Array) {
      this._pointer = new PlatformPointer<Point>(Deno.UnsafePointer.of(this._data), this);
    } else {
      this._pointer = this._data as PlatformPointer<Point>;
    }
  }

  public get pointer(): Pointer<Point> {
    return this._pointer;
  }

  public get x(): i32 {
    return this._view.getInt32(0);
  }

  public set x(value: i32) {
    this._view.setInt32(0, value);
  }

  public get y(): i32 {
    return this._view.getInt32(4);
  }

  public set y(value: i32) {
    this._view.setInt32(4, value);
  }
}

export class Rect implements AllocatableStruct {
  public static SIZE_IN_BYTES = 16;

  private _data: Uint8Array | Pointer<Rect>;
  private _view: PlatformDataView<Rect>;
  private _pointer: PlatformPointer<Rect>;

  constructor();
  constructor(data: Uint8Array);
  constructor(data: Pointer<Rect>);
  constructor(data: Partial<Rect>);
  constructor(x: i32, y: i32, w: i32, h: i32);
  constructor(_1?: Uint8Array | Pointer<Rect> | Partial<Rect> | i32, _2?: i32, _3?: i32, _4?: i32) {
    if (_1 instanceof Uint8Array || _1 instanceof PlatformPointer) {
      this._data = _1;
      this._view = new PlatformDataView(this._data as Uint8Array | PlatformPointer<Rect>);
    } else {
      this._data = new Uint8Array(Rect.SIZE_IN_BYTES);
      this._view = new PlatformDataView(this._data);

      if (_1 !== undefined) {
        if (_2 === undefined) {
          Object.assign(this, _1);
        } else {
          this.x = _1 as i32;
          this.y = _2 as i32;
          this.w = _3 as i32;
          this.h = _4 as i32;
        }
      }
    }

    if (this._data instanceof Uint8Array) {
      this._pointer = new PlatformPointer<Rect>(Deno.UnsafePointer.of(this._data), this);
    } else {
      this._pointer = this._data as PlatformPointer<Rect>;
    }
  }

  public get pointer(): Pointer<Rect> {
    return this._pointer;
  }

  public get x(): i32 {
    return this._view.getInt32(0);
  }

  public set x(value: i32) {
    this._view.setInt32(0, value);
  }

  public get y(): i32 {
    return this._view.getInt32(4);
  }

  public set y(value: i32) {
    this._view.setInt32(4, value);
  }

  public get w(): i32 {
    return this._view.getInt32(8);
  }

  public set w(value: i32) {
    this._view.setInt32(8, value);
  }

  public get h(): i32 {
    return this._view.getInt32(12);
  }

  public set h(value: i32) {
    this._view.setInt32(12, value);
  }
}

export class RendererInfo implements AllocatableStruct {
  public static SIZE_IN_BYTES = 88;

  private _data: Uint8Array | Pointer<RendererInfo>;
  private _view: PlatformDataView<RendererInfo>;
  private _pointer: PlatformPointer<RendererInfo>;

  constructor();
  constructor(data: Uint8Array);
  constructor(data: Pointer<RendererInfo>);
  constructor(data?: Uint8Array | Pointer<RendererInfo>) {
    if (data instanceof Uint8Array || data instanceof PlatformPointer) {
      this._data = data;
      this._view = new PlatformDataView(this._data as Uint8Array | PlatformPointer<RendererInfo>);
    } else {
      this._data = new Uint8Array(RendererInfo.SIZE_IN_BYTES);
      this._view = new PlatformDataView(this._data as Uint8Array | PlatformPointer<RendererInfo>);
    }

    if (this._data instanceof Uint8Array) {
      this._pointer = new PlatformPointer<RendererInfo>(Deno.UnsafePointer.of(this._data), this);
    } else {
      this._pointer = this._data as PlatformPointer<RendererInfo>;
    }
  }

  public get pointer(): Pointer<RendererInfo> {
    return this._pointer;
  }

  public get name(): string {
    return fromCString(new Deno.UnsafePointer(this._view.getBigUint64(0)));
  }

  public get flags(): u32 {
    return this._view.getUint32(8);
  }

  public get num_texture_formats(): u32 {
    return this._view.getUint32(12);
  }

  public get max_texture_width(): i32 {
    return this._view.getInt32(80);
  }

  public get max_texture_height(): i32 {
    return this._view.getInt32(84);
  }
}

export class Surface implements Struct {
  public static SIZE_IN_BYTES = 96;

  private _data: Uint8Array | Pointer<Surface>;
  private _view: PlatformDataView<Surface>;
  private _pointer: PlatformPointer<Surface>;

  constructor(data: Uint8Array);
  constructor(data: Pointer<Surface>);
  constructor(data: Uint8Array | Pointer<Surface>) {
    this._data = data;
    this._view = new PlatformDataView(this._data as Uint8Array | PlatformPointer<Surface>);

    if (this._data instanceof Uint8Array) {
      this._pointer = new PlatformPointer<Surface>(Deno.UnsafePointer.of(this._data), this);
    } else {
      this._pointer = this._data as PlatformPointer<Surface>;
    }
  }

  public get pointer(): Pointer<Surface> {
    return this._pointer;
  }

  public get flags(): u32 {
    return this._view.getUint32(0);
  }

  public get format(): Pointer<PixelFormat> {
    return new PlatformPointer<PixelFormat>(this._view.getBigUint64(8));
  }

  public get w(): i32 {
    return this._view.getInt32(16);
  }

  public get h(): i32 {
    return this._view.getInt32(20);
  }

  public get pitch(): i32 {
    return this._view.getInt32(24);
  }

  public get pixels(): Pointer<void> {
    return new PlatformPointer<void>(this._view.getBigUint64(32));
  }

  public get userdata(): Pointer<void> {
    return new PlatformPointer<void>(this._view.getBigUint64(40));
  }

  public get locked(): i32 {
    return this._view.getInt32(48);
  }

  public get list_blitmap(): Pointer<void> {
    return new PlatformPointer<void>(this._view.getBigUint64(56));
  }

  public get clip_rect(): Rect {
    return new Rect(this._view.getArray(16, 64));
  }

  public get map(): Pointer<BlitMap> {
    return new PlatformPointer<BlitMap>(this._view.getBigUint64(80));
  }

  public get refcount(): i32 {
    return this._view.getInt32(88);
  }
}
