// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { PlatformDataView } from "../_types.ts";
import { isTypedArray } from "../_utils.ts";
import { Pointer } from "../pointers.ts";
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
  SYSWM_TYPE,
  TextureAccess,
  TextureModulate,
  WindowEventID,
  WindowFlags,
  WindowPos,
} from "./enums.ts";

export class Renderer implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<Renderer>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Pointer<Renderer> | null,
    offset: number = 0,
  ): Renderer | null {
    return data !== null ? new Renderer(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
  }
}

export class RWops implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<RWops>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Pointer<RWops> | null,
    offset: number = 0,
  ): RWops | null {
    return data !== null ? new RWops(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
  }
}

export class Texture implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<Texture>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Pointer<Texture> | null,
    offset: number = 0,
  ): Texture | null {
    return data !== null ? new Texture(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
  }
}

export class Window implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<Window>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Pointer<Window> | null,
    offset: number = 0,
  ): Window | null {
    return data !== null ? new Window(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
  }
}

export class Color implements AllocatableStruct {
  public static SIZE_IN_BYTES = 4;

  public readonly _data: Uint8Array | Pointer<Color>;
  public readonly _view: PlatformDataView;

  constructor(
    data: Uint8Array | Pointer<Color>,
    offset: number,
  );
  constructor(props: Partial<Color>);
  constructor(r: u8, g: u8, b: u8, a: u8);
  constructor(
    _1?: Uint8Array | Pointer<Color> | Partial<Color> | u8,
    _2?: number | u8,
    _3?: u8,
    _4?: u8,
  ) {
    const dataPassedIn = isTypedArray(_1) || Pointer.isPointer(_1);
    if (dataPassedIn) {
      this._data = _1;
      this._view = new Platform.DataView(this._data, _2);
    } else {
      this._data = new Uint8Array(Color.SIZE_IN_BYTES);
      this._view = new Platform.DataView(this._data, 0);
    }

    if (!dataPassedIn && _1 !== undefined) {
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

  public static of(
    data: Uint8Array | Pointer<Color> | null,
    offset: number = 0,
  ): Color | null {
    return data !== null ? new Color(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
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

export class DisplayMode implements Struct {
  public static SIZE_IN_BYTES = 24;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<DisplayMode>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Uint8Array | Pointer<DisplayMode> | null,
    offset: number = 0,
  ): DisplayMode | null {
    return data !== null ? new DisplayMode(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
  }

  public get format(): u32 {
    return this._view.getU32(0);
  }

  public get w(): i32 {
    return this._view.getI32(4);
  }

  public get h(): i32 {
    return this._view.getI32(8);
  }

  public get refresh_rate(): i32 {
    return this._view.getI32(12);
  }

  public get driverdata(): Pointer<void> {
    return this._view.getPointer(16);
  }
}

export class Keysym implements Struct {
  public static SIZE_IN_BYTES = 16;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<Keysym>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Uint8Array | Pointer<Keysym> | null,
    offset: number = 0,
  ): Keysym | null {
    return data !== null ? new Keysym(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
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

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<Palette>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Uint8Array | Pointer<Palette> | null,
    offset: number = 0,
  ): Palette | null {
    return data !== null ? new Palette(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
  }

  public get ncolors(): i32 {
    return this._view.getI32(0);
  }

  public get colors(): Color {
    return Color.of(this._view.getPointer(8)) as Color;
  }

  // version

  // refcount
}

export class PixelFormat implements Struct {
  public static SIZE_IN_BYTES = 56;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<PixelFormat>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Uint8Array | Pointer<PixelFormat> | null,
    offset: number = 0,
  ): PixelFormat | null {
    return data !== null ? new PixelFormat(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
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

  // Rloss

  // Gloss

  // Bloss

  // Aloss

  // Rshift

  // Gshift

  // Bshift

  // Ashift

  // refcount

  // next
}

export class Point implements AllocatableStruct {
  public static SIZE_IN_BYTES = 8;

  public readonly _data: Uint8Array | Pointer<Point>;
  public readonly _view: PlatformDataView;

  constructor(
    data: Uint8Array | Pointer<Point>,
    offset: number,
  );
  constructor(props: Partial<Point>);
  constructor(x: i32, y: i32);
  constructor(
    _1?: Uint8Array | Pointer<Point> | Partial<Point> | i32,
    _2?: number | i32,
  ) {
    const dataPassedIn = isTypedArray(_1) || Pointer.isPointer(_1);
    if (dataPassedIn) {
      this._data = _1;
      this._view = new Platform.DataView(this._data, _2);
    } else {
      this._data = new Uint8Array(Point.SIZE_IN_BYTES);
      this._view = new Platform.DataView(this._data, 0);
    }

    if (!dataPassedIn && _1 !== undefined) {
      if (typeof _1 === "object") {
        if (_1.x !== undefined) this.x = _1.x;
        if (_1.y !== undefined) this.y = _1.y;
      } else {
        if (_1 !== undefined) this.x = _1;
        if (_2 !== undefined) this.y = _2;
      }
    }
  }

  public static of(
    data: Uint8Array | Pointer<Point> | null,
    offset: number = 0,
  ): Point | null {
    return data !== null ? new Point(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
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

  public readonly _data: Uint8Array | Pointer<Rect>;
  public readonly _view: PlatformDataView;

  constructor(
    data: Uint8Array | Pointer<Rect>,
    offset: number,
  );
  constructor(props: Partial<Rect>);
  constructor(x: i32, y: i32, w: i32, h: i32);
  constructor(
    _1?: Uint8Array | Pointer<Rect> | Partial<Rect> | i32,
    _2?: number | i32,
    _3?: i32,
    _4?: i32,
  ) {
    const dataPassedIn = isTypedArray(_1) || Pointer.isPointer(_1);
    if (dataPassedIn) {
      this._data = _1;
      this._view = new Platform.DataView(this._data, _2);
    } else {
      this._data = new Uint8Array(Rect.SIZE_IN_BYTES);
      this._view = new Platform.DataView(this._data, 0);
    }

    if (!dataPassedIn && _1 !== undefined) {
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

  public static of(
    data: Uint8Array | Pointer<Rect> | null,
    offset: number = 0,
  ): Rect | null {
    return data !== null ? new Rect(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
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

  public readonly _data: Uint8Array | Pointer<RendererInfo>;
  private readonly _view: PlatformDataView;

  constructor(
    data?: Uint8Array | Pointer<RendererInfo>,
    offset: number = 0,
  ) {
    this._data = data ?? new Uint8Array(RendererInfo.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Uint8Array | Pointer<RendererInfo> | null,
    offset: number = 0,
  ): RendererInfo | null {
    return data !== null ? new RendererInfo(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
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

  // TODO: Add support for arrays in structs.
  // texture_formats

  public get max_texture_width(): i32 {
    return this._view.getI32(80);
  }

  public get max_texture_height(): i32 {
    return this._view.getI32(84);
  }
}

export class Surface implements Struct {
  public static SIZE_IN_BYTES = 96;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<Surface>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Uint8Array | Pointer<Surface> | null,
    offset: number = 0,
  ): Surface | null {
    return data !== null ? new Surface(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
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

  // locked

  // list_data

  public get clip_rect(): Rect {
    return Rect.of(this._view.getArray(16, 64)) as Rect;
  }

  // map

  public get refcount(): i32 {
    return this._view.getI32(88);
  }
}

export class SysWMinfo implements Struct {
  public static SIZE_IN_BYTES = 72;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<SysWMinfo>,
    offset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Uint8Array | Pointer<SysWMinfo> | null,
    offset: number = 0,
  ): SysWMinfo | null {
    return data !== null ? new SysWMinfo(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
  }

  public get version(): version {
    return version.of(this._view.getArray(3, 0)) as version;
  }

  public get subsystem(): SYSWM_TYPE {
    return this._view.getU32(4) as SYSWM_TYPE;
  }

  // TODO: Figure out how to map unions.
  // info
}

export class version implements AllocatableStruct {
  public static SIZE_IN_BYTES = 3;

  public readonly _data: Uint8Array | Pointer<version>;
  private readonly _view: PlatformDataView;

  constructor(
    data?: Uint8Array | Pointer<version>,
    offset: number = 0,
  ) {
    this._data = data ?? new Uint8Array(version.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data, offset);
  }

  public static of(
    data: Uint8Array | Pointer<version> | null,
    offset: number = 0,
  ): version | null {
    return data !== null ? new version(data, offset) : null;
  }

  public get _offset(): number {
    return this._view.offset;
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
