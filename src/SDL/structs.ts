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
  FlashOperation,
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

export class Color implements AllocatableStruct {
  public static SIZE_IN_BYTES = 4;

  public readonly _data!: Uint8Array | Pointer<Color>;
  private readonly _view!: PlatformDataView;

  constructor(command: StructCommand);
  constructor(props: Partial<Color>);
  constructor(r: u8, g: u8, b: u8, a: u8);
  constructor(_1?: StructCommand | Partial<Color> | u8, _2?: u8, _3?: u8, _4?: u8) {
    if (_1 === STRUCT_NO_ALLOCATE) {
      return;
    }

    this._data = new Uint8Array(Color.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data);

    if (_1 !== undefined) {
      if (typeof _1 === "object") {
        if (_1.r !== undefined) this.r = _1.r;
        if (_1.g !== undefined) this.g = _1.g;
        if (_1.b !== undefined) this.b = _1.b;
        if (_1.a !== undefined) this.a = _1.a;
      } else {
        if (_1 !== undefined) this.r = _1;
        if (_2 !== undefined) this.g = _2;
        if (_3 !== undefined) this.b = _3;
        if (_4 !== undefined) this.a = _4;
      }
    }
  }

  public static of(data: Uint8Array | Pointer<Color> | null): Color | null {
    if (data === null) {
      return null;
    }

    const struct = new Color(STRUCT_NO_ALLOCATE) as unknown as StructInternal<Color>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as Color;
  }

  public get r(): u8 {
    return this._view.getU8(0);
  }

  public set r(value: u8) {
    this._view.setU8(0, value);
  }

  public get g(): u8 {
    return this._view.getU8(1);
  }

  public set g(value: u8) {
    this._view.setU8(1, value);
  }

  public get b(): u8 {
    return this._view.getU8(2);
  }

  public set b(value: u8) {
    this._view.setU8(2, value);
  }

  public get a(): u8 {
    return this._view.getU8(3);
  }

  public set a(value: u8) {
    this._view.setU8(3, value);
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

export class Palette implements Struct {
  public static SIZE_IN_BYTES = 24;

  public readonly _data!: Uint8Array | Pointer<Palette>;
  private readonly _view!: PlatformDataView;

  public static of(data: Uint8Array | Pointer<Palette> | null): Palette | null {
    if (data === null) {
      return null;
    }

    const struct = new Palette() as unknown as StructInternal<Palette>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as Palette;
  }

  public get ncolors(): i32 {
    return this._view.getI32(0);
  }

  public get colors(): Color {
    return Color.of(this._view.getPointer(8)) as Color;
  }
}

export class PixelFormat implements Struct {
  public static SIZE_IN_BYTES = 56;

  public readonly _data!: Uint8Array | Pointer<PixelFormat>;
  private readonly _view!: PlatformDataView;

  public static of(data: Uint8Array | Pointer<PixelFormat> | null): PixelFormat | null {
    if (data === null) {
      return null;
    }

    const struct = new PixelFormat() as unknown as StructInternal<PixelFormat>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);
    return struct as unknown as PixelFormat;
  }

  public get format(): u32 {
    return this._view.getU32(0);
  }

  public get palette(): Palette {
    return Palette.of(this._view.getPointer(8)) as Palette;
  }

  public get BitsPerPixel(): u8 {
    return this._view.getU8(16);
  }

  public get BytesPerPixel(): u8 {
    return this._view.getU8(17);
  }

  public get Rmask(): u32 {
    return this._view.getU32(20);
  }

  public get Gmask(): u32 {
    return this._view.getU32(24);
  }

  public get Bmask(): u32 {
    return this._view.getU32(28);
  }

  public get Amask(): u32 {
    return this._view.getU32(32);
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
      if (typeof _1 === "object") {
        if (_1.x !== undefined) this.x = _1.x;
        if (_1.y !== undefined) this.y = _1.y;
      } else {
        if (_1 !== undefined) this.x = _1;
        if (_2 !== undefined) this.y = _2;
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
      if (typeof _1 === "object") {
        if (_1.x !== undefined) this.x = _1.x;
        if (_1.y !== undefined) this.y = _1.y;
        if (_1.w !== undefined) this.w = _1.w;
        if (_1.h !== undefined) this.h = _1.h;
      } else {
        if (_1 !== undefined) this.x = _1;
        if (_2 !== undefined) this.y = _2;
        if (_3 !== undefined) this.w = _3;
        if (_4 !== undefined) this.h = _4;
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

  public get format(): PixelFormat {
    return PixelFormat.of(this._view.getPointer(8)) as PixelFormat;
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

  public get clip_rect(): Rect {
    return Rect.of(this._view.getArray(16, 64)) as Rect;
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
