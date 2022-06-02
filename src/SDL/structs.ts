// This file is auto generated. To update the file make changes to the code generator.

import { AllocatableStruct, f32, f64, i16, i32, i64, i8, Pointer, Struct, u16, u32, u64, u8 } from "../types.ts";
import { DataPointer, DataView, fromCString } from "../_utils.ts";
import { MemoryOffset } from "../memory.ts";

export type BlitMap = Record<never, never>;
export type PixelFormat = Record<never, never>;
export type Renderer = Record<never, never>;
export type RWops = Record<never, never>;
export type Texture = Record<never, never>;
export type Window = Record<never, never>;

export class Keysym implements Struct {
  public static SIZE_IN_BYTES = 16;

  private _data: Pointer<Keysym>;
  private _view: DataView<Keysym>;

  constructor(data: Pointer<Keysym>) {
    this._data = data;
    this._view = new DataView(this._data as DataPointer<Keysym>);
  }

  public get pointer(): Pointer<Keysym> {
    return this._data;
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
  private _view: DataView<Point>;
  private _pointer: DataPointer<Point>;

  constructor();
  constructor(data: MemoryOffset);
  constructor(data: Uint8Array);
  constructor(data: Pointer<Point>);
  constructor(data: Partial<Point>);
  constructor(x: i32, y: i32);
  constructor(_1?: MemoryOffset | Uint8Array | Pointer<Point> | Partial<Point> | i32, _2?: i32) {
    if (_1 instanceof MemoryOffset) {
      this._data = _1.memory;
      this._view = new DataView(this._data, _1.byteOffset);
    } else if (_1 instanceof Uint8Array || _1 instanceof DataPointer) {
      this._data = _1;
      this._view = new DataView(this._data as Uint8Array | DataPointer<Point>);
    } else {
      this._data = new Uint8Array(Point.SIZE_IN_BYTES);
      this._view = new DataView(this._data);

      if (_1 !== undefined) {
        if (_2 === undefined) {
          Object.assign(this, _1);
        } else {
          this.x = _1 as i32;
          this.y = _2 as i32;
        }
      }
    }

    if (_1 instanceof MemoryOffset) {
      this._pointer = new DataPointer<Point>(_1, this);
    } else if (this._data instanceof Uint8Array) {
      this._pointer = new DataPointer<Point>(Deno.UnsafePointer.of(this._data), this);
    } else {
      this._pointer = this._data as DataPointer<Point>;
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
  private _view: DataView<Rect>;
  private _pointer: DataPointer<Rect>;

  constructor();
  constructor(data: MemoryOffset);
  constructor(data: Uint8Array);
  constructor(data: Pointer<Rect>);
  constructor(data: Partial<Rect>);
  constructor(x: i32, y: i32, w: i32, h: i32);
  constructor(_1?: MemoryOffset | Uint8Array | Pointer<Rect> | Partial<Rect> | i32, _2?: i32, _3?: i32, _4?: i32) {
    if (_1 instanceof MemoryOffset) {
      this._data = _1.memory;
      this._view = new DataView(this._data, _1.byteOffset);
    } else if (_1 instanceof Uint8Array || _1 instanceof DataPointer) {
      this._data = _1;
      this._view = new DataView(this._data as Uint8Array | DataPointer<Rect>);
    } else {
      this._data = new Uint8Array(Rect.SIZE_IN_BYTES);
      this._view = new DataView(this._data);

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

    if (_1 instanceof MemoryOffset) {
      this._pointer = new DataPointer<Rect>(_1, this);
    } else if (this._data instanceof Uint8Array) {
      this._pointer = new DataPointer<Rect>(Deno.UnsafePointer.of(this._data), this);
    } else {
      this._pointer = this._data as DataPointer<Rect>;
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
  private _view: DataView<RendererInfo>;
  private _pointer: DataPointer<RendererInfo>;

  constructor();
  constructor(data: MemoryOffset);
  constructor(data: Uint8Array);
  constructor(data: Pointer<RendererInfo>);
  constructor(data?: MemoryOffset | Uint8Array | Pointer<RendererInfo>) {
    if (data instanceof MemoryOffset) {
      this._data = data.memory;
      this._view = new DataView(this._data, data.byteOffset);
    } else if (data instanceof Uint8Array || data instanceof DataPointer) {
      this._data = data;
      this._view = new DataView(this._data as Uint8Array | DataPointer<RendererInfo>);
    } else {
      this._data = new Uint8Array(RendererInfo.SIZE_IN_BYTES);
      this._view = new DataView(this._data as Uint8Array | DataPointer<RendererInfo>);
    }

    if (data instanceof MemoryOffset) {
      this._pointer = new DataPointer<RendererInfo>(data, this);
    } else if (this._data instanceof Uint8Array) {
      this._pointer = new DataPointer<RendererInfo>(Deno.UnsafePointer.of(this._data), this);
    } else {
      this._pointer = this._data as DataPointer<RendererInfo>;
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

  private _data: Pointer<Surface>;
  private _view: DataView<Surface>;

  constructor(data: Pointer<Surface>) {
    this._data = data;
    this._view = new DataView(this._data as DataPointer<Surface>);
  }

  public get pointer(): Pointer<Surface> {
    return this._data;
  }

  public get flags(): u32 {
    return this._view.getUint32(0);
  }

  public get format(): Pointer<PixelFormat> {
    return new DataPointer<PixelFormat>(this._view.getBigUint64(8));
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
    return new DataPointer<void>(this._view.getBigUint64(32));
  }

  public get userdata(): Pointer<void> {
    return new DataPointer<void>(this._view.getBigUint64(40));
  }

  public get locked(): i32 {
    return this._view.getInt32(48);
  }

  public get list_blitmap(): Pointer<void> {
    return new DataPointer<void>(this._view.getBigUint64(56));
  }

  public get clip_rect(): Rect {
    return new Rect(this._view.getArray(16, 64));
  }

  public get map(): Pointer<BlitMap> {
    return new DataPointer<BlitMap>(this._view.getBigUint64(80));
  }

  public get refcount(): i32 {
    return this._view.getInt32(88);
  }
}
