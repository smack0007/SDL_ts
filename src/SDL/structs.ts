// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { PlatformDataView } from "../_types.ts";
import { STRUCT_NO_ALLOCATE, StructCommand, StructInternal } from "../_structs.ts";
import { Pointer, PointerLike } from "../pointers.ts";
import { AllocatableStruct, f32, f64, i16, i32, i64, i8, Struct, u16, u32, u64, u8 } from "../types.ts";

import {
  ArrayOrder,
  BitmapOrder,
  BlendFactor,
  BlendMode,
  BlendOperation,
  EventType,
  InitFlags,
  Keycode,
  PackedLayout,
  PackedOrder,
  PixelType,
  RendererFlags,
  RendererFlip,
  ScaleMode,
  Scancode,
  TextureAccess,
  TextureModulate,
  WindowEventID,
  WindowFlags,
  WindowPos,
} from "./enums.ts";

export class BlitMap implements Struct {
  public static IS_OPAQUE = true;
  public readonly _data!: Pointer<BlitMap>;

  public static of(data: Pointer<BlitMap> | null): BlitMap | null {
    if (data === null) {
      return null;
    }

    const struct = new BlitMap() as unknown as StructInternal<BlitMap>;
    struct._data = data;
    return struct as unknown as BlitMap;
  }
}

export class PixelFormat implements Struct {
  public static IS_OPAQUE = true;
  public readonly _data!: Pointer<PixelFormat>;

  public static of(data: Pointer<PixelFormat> | null): PixelFormat | null {
    if (data === null) {
      return null;
    }

    const struct = new PixelFormat() as unknown as StructInternal<PixelFormat>;
    struct._data = data;
    return struct as unknown as PixelFormat;
  }
}

export class Renderer implements Struct {
  public static IS_OPAQUE = true;
  public readonly _data!: Pointer<Renderer>;

  public static of(data: Pointer<Renderer> | null): Renderer | null {
    if (data === null) {
      return null;
    }

    const struct = new Renderer() as unknown as StructInternal<Renderer>;
    struct._data = data;
    return struct as unknown as Renderer;
  }
}

export class RWops implements Struct {
  public static IS_OPAQUE = true;
  public readonly _data!: Pointer<RWops>;

  public static of(data: Pointer<RWops> | null): RWops | null {
    if (data === null) {
      return null;
    }

    const struct = new RWops() as unknown as StructInternal<RWops>;
    struct._data = data;
    return struct as unknown as RWops;
  }
}

export class Texture implements Struct {
  public static IS_OPAQUE = true;
  public readonly _data!: Pointer<Texture>;

  public static of(data: Pointer<Texture> | null): Texture | null {
    if (data === null) {
      return null;
    }

    const struct = new Texture() as unknown as StructInternal<Texture>;
    struct._data = data;
    return struct as unknown as Texture;
  }
}

export class Window implements Struct {
  public static IS_OPAQUE = true;
  public readonly _data!: Pointer<Window>;

  public static of(data: Pointer<Window> | null): Window | null {
    if (data === null) {
      return null;
    }

    const struct = new Window() as unknown as StructInternal<Window>;
    struct._data = data;
    return struct as unknown as Window;
  }
}

export class Keysym implements Struct {
  public static SIZE_IN_BYTES = 16;

  public readonly _data!: Uint8Array | Pointer<Keysym>;
  private readonly _view!: PlatformDataView;

  public static of(data: Uint8Array | Pointer<Keysym> | null): Keysym | null {
    if (data === null) {
      return null;
    }

    const struct = new Keysym() as unknown as StructInternal<Keysym>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as Keysym;
  }

  public get scancode(): Scancode {
    return this._view.getU32(0) as Scancode;
  }

  public get sym(): Keycode {
    return this._view.getU32(4) as Keycode;
  }

  public get mod(): u16 {
    return this._view.getU16(8);
  }

  public get unused(): u32 {
    return this._view.getU32(12);
  }
}

export class Point implements AllocatableStruct {
  public static SIZE_IN_BYTES = 8;

  public readonly _data!: Uint8Array | Pointer<Point>;
  private readonly _view!: PlatformDataView;

  constructor(command: StructCommand);
  constructor(props: Partial<Point>);
  constructor(x: i32, y: i32);
  constructor(_1?: StructCommand | Partial<Point> | i32, _2?: i32) {
    if (_1 === STRUCT_NO_ALLOCATE) {
      return;
    }

    this._data = new Uint8Array(Point.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data);

    if (_1 !== undefined) {
      if (typeof _2 === "object") {
        Object.assign(this, _1);
      } else {
        this.x = _1 as i32;
        this.y = _2 as i32;
      }
    }
  }

  public static of(data: Uint8Array | Pointer<Point> | null): Point | null {
    if (data === null) {
      return null;
    }

    const struct = new Point(STRUCT_NO_ALLOCATE) as unknown as StructInternal<Point>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as Point;
  }

  public get x(): i32 {
    return this._view.getI32(0);
  }

  public set x(value: i32) {
    this._view.setI32(0, value);
  }

  public get y(): i32 {
    return this._view.getI32(4);
  }

  public set y(value: i32) {
    this._view.setI32(4, value);
  }
}

export class Rect implements AllocatableStruct {
  public static SIZE_IN_BYTES = 16;

  public readonly _data!: Uint8Array | Pointer<Rect>;
  private readonly _view!: PlatformDataView;

  constructor(command: StructCommand);
  constructor(props: Partial<Rect>);
  constructor(x: i32, y: i32, w: i32, h: i32);
  constructor(_1?: StructCommand | Partial<Rect> | i32, _2?: i32, _3?: i32, _4?: i32) {
    if (_1 === STRUCT_NO_ALLOCATE) {
      return;
    }

    this._data = new Uint8Array(Rect.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data);

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

  public static of(data: Uint8Array | Pointer<Rect> | null): Rect | null {
    if (data === null) {
      return null;
    }

    const struct = new Rect(STRUCT_NO_ALLOCATE) as unknown as StructInternal<Rect>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as Rect;
  }

  public get x(): i32 {
    return this._view.getI32(0);
  }

  public set x(value: i32) {
    this._view.setI32(0, value);
  }

  public get y(): i32 {
    return this._view.getI32(4);
  }

  public set y(value: i32) {
    this._view.setI32(4, value);
  }

  public get w(): i32 {
    return this._view.getI32(8);
  }

  public set w(value: i32) {
    this._view.setI32(8, value);
  }

  public get h(): i32 {
    return this._view.getI32(12);
  }

  public set h(value: i32) {
    this._view.setI32(12, value);
  }
}

export class RendererInfo implements AllocatableStruct {
  public static SIZE_IN_BYTES = 88;

  public readonly _data!: Uint8Array | Pointer<RendererInfo>;
  private readonly _view!: PlatformDataView;

  constructor(command?: StructCommand) {
    if (command === STRUCT_NO_ALLOCATE) {
      return;
    }

    this._data = new Uint8Array(RendererInfo.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data);
  }

  public static of(data: Uint8Array | Pointer<RendererInfo> | null): RendererInfo | null {
    if (data === null) {
      return null;
    }

    const struct = new RendererInfo(STRUCT_NO_ALLOCATE) as unknown as StructInternal<RendererInfo>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as RendererInfo;
  }

  public get name(): string {
    return Platform.fromPlatformString(Platform.toPlatformPointer(this._view.getPointer(0))!);
  }

  public get flags(): u32 {
    return this._view.getU32(8);
  }

  public get num_texture_formats(): u32 {
    return this._view.getU32(12);
  }

  public get max_texture_width(): i32 {
    return this._view.getI32(80);
  }

  public get max_texture_height(): i32 {
    return this._view.getI32(84);
  }
}

export class Surface implements Struct {
  public static SIZE_IN_BYTES = 96;

  public readonly _data!: Uint8Array | Pointer<Surface>;
  private readonly _view!: PlatformDataView;

  public static of(data: Uint8Array | Pointer<Surface> | null): Surface | null {
    if (data === null) {
      return null;
    }

    const struct = new Surface() as unknown as StructInternal<Surface>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as Surface;
  }

  public get flags(): u32 {
    return this._view.getU32(0);
  }

  public get format(): Pointer<PixelFormat> {
    return this._view.getPointer(8);
  }

  public get w(): i32 {
    return this._view.getI32(16);
  }

  public get h(): i32 {
    return this._view.getI32(20);
  }

  public get pitch(): i32 {
    return this._view.getI32(24);
  }

  public get pixels(): Pointer<void> {
    return this._view.getPointer(32);
  }

  public get userdata(): Pointer<void> {
    return this._view.getPointer(40);
  }

  public get locked(): i32 {
    return this._view.getI32(48);
  }

  public get list_blitmap(): Pointer<void> {
    return this._view.getPointer(56);
  }

  public get clip_rect(): Rect {
    return Rect.of(this._view.getArray(16, 64)) as Rect;
  }

  public get map(): Pointer<BlitMap> {
    return this._view.getPointer(80);
  }

  public get refcount(): i32 {
    return this._view.getI32(88);
  }
}

export class version implements AllocatableStruct {
  public static SIZE_IN_BYTES = 3;

  public readonly _data!: Uint8Array | Pointer<version>;
  private readonly _view!: PlatformDataView;

  constructor(command?: StructCommand) {
    if (command === STRUCT_NO_ALLOCATE) {
      return;
    }

    this._data = new Uint8Array(version.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data);
  }

  public static of(data: Uint8Array | Pointer<version> | null): version | null {
    if (data === null) {
      return null;
    }

    const struct = new version(STRUCT_NO_ALLOCATE) as unknown as StructInternal<version>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as version;
  }

  public get major(): u8 {
    return this._view.getU8(0);
  }

  public get minor(): u8 {
    return this._view.getU8(1);
  }

  public get patch(): u8 {
    return this._view.getU8(2);
  }
}
