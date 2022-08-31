// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { fromPlatformString, PlatformDataView, PlatformPointer } from "platform";
import { Memory } from "../memory.ts";
import { AllocatableStruct, f32, f64, i16, i32, i64, i8, PointerValue, Struct, u16, u32, u64, u8 } from "../types.ts";

export class BlitMap implements Struct {
  public static IS_OPAQUE = true;
}

export class PixelFormat implements Struct {
  public static IS_OPAQUE = true;
}

export class Renderer implements Struct {
  public static IS_OPAQUE = true;
}

export class RWops implements Struct {
  public static IS_OPAQUE = true;
}

export class Texture implements Struct {
  public static IS_OPAQUE = true;
}

export class Window implements Struct {
  public static IS_OPAQUE = true;
}

export class Keysym implements Struct {
  public static SIZE_IN_BYTES = 16;

  private _data!: Uint8Array | PointerValue<Keysym>;
  private _view!: PlatformDataView<Keysym>;

  public static createView(data: Uint8Array | PointerValue<Keysym>): Keysym {
    const struct = new Keysym();
    struct._data = data;
    struct._view = new PlatformDataView(data);
    return struct;
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

  private _data!: Uint8Array | PointerValue<Point>;
  private _view!: PlatformDataView<Point>;

  constructor();
  constructor(props: Partial<Point>);
  constructor(x: i32, y: i32);
  constructor(_1?: Partial<Point> | i32, _2?: i32) {
    this._data = new Uint8Array(Point.SIZE_IN_BYTES);
    this._view = new PlatformDataView(this._data);

    if (_1 !== undefined) {
      if (typeof _2 === "object") {
        Object.assign(this, _1);
      } else {
        this.x = _1 as i32;
        this.y = _2 as i32;
      }
    }
  }

  public static createView(data: Uint8Array | PointerValue<Point>): Point {
    const struct = new Point();
    struct._data = data;
    struct._view = new PlatformDataView(data);
    return struct;
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

  private _data!: Uint8Array | PointerValue<Rect>;
  private _view!: PlatformDataView<Rect>;

  constructor();
  constructor(props: Partial<Rect>);
  constructor(x: i32, y: i32, w: i32, h: i32);
  constructor(_1?: Partial<Rect> | i32, _2?: i32, _3?: i32, _4?: i32) {
    this._data = new Uint8Array(Rect.SIZE_IN_BYTES);
    this._view = new PlatformDataView(this._data);

    if (_1 !== undefined) {
      if (typeof _2 === "object") {
        Object.assign(this, _1);
      } else {
        this.x = _1 as i32;
        this.y = _2 as i32;
        this.w = _3 as i32;
        this.h = _4 as i32;
      }
    }
  }

  public static createView(data: Uint8Array | PointerValue<Rect>): Rect {
    const struct = new Rect();
    struct._data = data;
    struct._view = new PlatformDataView(data);
    return struct;
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

  private _data!: Uint8Array | PointerValue<RendererInfo>;
  private _view!: PlatformDataView<RendererInfo>;

  constructor();
  constructor() {
    this._data = new Uint8Array(RendererInfo.SIZE_IN_BYTES);
    this._view = new PlatformDataView(this._data as Uint8Array | PointerValue<RendererInfo>);
  }

  public static createView(data: Uint8Array | PointerValue<RendererInfo>): RendererInfo {
    const struct = new RendererInfo();
    struct._data = data;
    struct._view = new PlatformDataView(data);
    return struct;
  }

  public get name(): string {
    return fromPlatformString(this._view.getPointer(0));
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

  private _data!: Uint8Array | PointerValue<Surface>;
  private _view!: PlatformDataView<Surface>;

  public static createView(data: Uint8Array | PointerValue<Surface>): Surface {
    const struct = new Surface();
    struct._data = data;
    struct._view = new PlatformDataView(data);
    return struct;
  }

  public get flags(): u32 {
    return this._view.getUint32(0);
  }

  public get format(): PointerValue<PixelFormat> {
    return this._view.getPointer(8);
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

  public get pixels(): PointerValue<void> {
    return this._view.getPointer(32);
  }

  public get userdata(): PointerValue<void> {
    return this._view.getPointer(40);
  }

  public get locked(): i32 {
    return this._view.getInt32(48);
  }

  public get list_blitmap(): PointerValue<void> {
    return this._view.getPointer(56);
  }

  public get clip_rect(): Rect {
    return Rect.createView(this._view.getArray(16, 64));
  }

  public get map(): PointerValue<BlitMap> {
    return this._view.getPointer(80);
  }

  public get refcount(): i32 {
    return this._view.getInt32(88);
  }
}
