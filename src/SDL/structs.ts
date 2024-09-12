// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import Platform from "../_platform.ts";
import { callbacks } from "./_callbacks.ts";
import { PlatformDataView } from "../_types.ts";
import { isTypedArray } from "../_utils.ts";
import { Pointer } from "../pointers.ts";
import { AllocatableStruct, double, float, int, Struct, Uint16, Uint32, Uint8 } from "../types.ts";

import { AudioFormat } from "./audio.ts";

import { AudioCallback, EventFilter } from "./callbacks.ts";

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
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Pointer<Renderer> | null,
    byteOffset: number = 0,
  ): Renderer | null {
    return data !== null ? new Renderer(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }
}

export class RWops implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<RWops>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Pointer<RWops> | null,
    byteOffset: number = 0,
  ): RWops | null {
    return data !== null ? new RWops(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }
}

export class Texture implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<Texture>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Pointer<Texture> | null,
    byteOffset: number = 0,
  ): Texture | null {
    return data !== null ? new Texture(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }
}

export class Window implements Struct {
  public static IS_OPAQUE = true;

  public readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Pointer<Window>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Pointer<Window> | null,
    byteOffset: number = 0,
  ): Window | null {
    return data !== null ? new Window(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }
}

export class AudioSpec implements AllocatableStruct {
  public static SIZE_IN_BYTES = 32;

  public readonly _data: Uint8Array | Pointer<AudioSpec>;
  public readonly _view: PlatformDataView;

  constructor();
  constructor(
    data: Uint8Array | Pointer<AudioSpec>,
    byteOffset: number,
  );
  constructor(props: Partial<AudioSpec>);
  constructor(
    freq: int,
    format: AudioFormat,
    channels: Uint8,
    silence: Uint8,
    samples: Uint16,
    padding: Uint16,
    size: Uint32,
    // callback: AudioCallback,
    userdata: Pointer<void>,
  );
  constructor(
    _1: Uint8Array | Pointer<AudioSpec> | Partial<AudioSpec> | int = {},
    _2?: number | AudioFormat,
    _3?: Uint8,
    _4?: Uint8,
    _5?: Uint16,
    _6?: Uint16,
    _7?: Uint32,
    // _8?: AudioCallback,
    _9?: Pointer<void>,
  ) {
    const dataPassedIn = isTypedArray(_1) || Pointer.isPointer(_1);
    if (dataPassedIn) {
      this._data = _1;
      this._view = new Platform.DataView(this._data, _2);
    } else {
      this._data = new Uint8Array(AudioSpec.SIZE_IN_BYTES);
      this._view = new Platform.DataView(this._data, 0);
    }

    if (!dataPassedIn && _1 !== undefined) {
      if (typeof _1 === "object") {
        if (_1.freq !== undefined) this.freq = _1.freq;
        if (_1.format !== undefined) this.format = _1.format;
        if (_1.channels !== undefined) this.channels = _1.channels;
        if (_1.silence !== undefined) this.silence = _1.silence;
        if (_1.samples !== undefined) this.samples = _1.samples;
        if (_1.padding !== undefined) this.padding = _1.padding;
        if (_1.size !== undefined) this.size = _1.size;
        // if (_1.callback !== undefined) this.callback = _1.callback;
        if (_1.userdata !== undefined) this.userdata = _1.userdata;
      } else {
        if (_1 !== undefined) this.freq = _1;
        if (_2 !== undefined) this.format = _2;
        if (_3 !== undefined) this.channels = _3;
        if (_4 !== undefined) this.silence = _4;
        if (_5 !== undefined) this.samples = _5;
        if (_6 !== undefined) this.padding = _6;
        if (_7 !== undefined) this.size = _7;
        // if (_8 !== undefined) this.callback = _8;
        if (_9 !== undefined) this.userdata = _9;
      }
    }
  }

  public static of(
    data: Uint8Array | Pointer<AudioSpec> | null,
    byteOffset: number = 0,
  ): AudioSpec | null {
    return data !== null ? new AudioSpec(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get freq(): int {
    return this._view.getI32(0);
  }

  public set freq(value: int) {
    this._view.setI32(0, value);
  }

  public get format(): AudioFormat {
    return this._view.getU16(4);
  }

  public set format(value: AudioFormat) {
    this._view.setU16(4, value);
  }

  public get channels(): Uint8 {
    return this._view.getU8(6);
  }

  public set channels(value: Uint8) {
    this._view.setU8(6, value);
  }

  public get silence(): Uint8 {
    return this._view.getU8(7);
  }

  public set silence(value: Uint8) {
    this._view.setU8(7, value);
  }

  public get samples(): Uint16 {
    return this._view.getU16(8);
  }

  public set samples(value: Uint16) {
    this._view.setU16(8, value);
  }

  public get padding(): Uint16 {
    return this._view.getU16(10);
  }

  public set padding(value: Uint16) {
    this._view.setU16(10, value);
  }

  public get size(): Uint32 {
    return this._view.getU32(12);
  }

  public set size(value: Uint32) {
    this._view.setU32(12, value);
  }

  // TODO: Doesn't seem to work due to background thread.
  // callback

  public get userdata(): Pointer<void> {
    return this._view.getPointer(24);
  }

  public set userdata(value: Pointer<void>) {
    this._view.setPointer(24, value);
  }
}

export class Color implements AllocatableStruct {
  public static SIZE_IN_BYTES = 4;

  public readonly _data: Uint8Array | Pointer<Color>;
  public readonly _view: PlatformDataView;

  constructor();
  constructor(
    data: Uint8Array | Pointer<Color>,
    byteOffset: number,
  );
  constructor(props: Partial<Color>);
  constructor(r: Uint8, g: Uint8, b: Uint8, a: Uint8);
  constructor(
    _1: Uint8Array | Pointer<Color> | Partial<Color> | Uint8 = {},
    _2?: number | Uint8,
    _3?: Uint8,
    _4?: Uint8,
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
    byteOffset: number = 0,
  ): Color | null {
    return data !== null ? new Color(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get r(): Uint8 {
    return this._view.getU8(0);
  }

  public set r(value: Uint8) {
    this._view.setU8(0, value);
  }

  public get g(): Uint8 {
    return this._view.getU8(1);
  }

  public set g(value: Uint8) {
    this._view.setU8(1, value);
  }

  public get b(): Uint8 {
    return this._view.getU8(2);
  }

  public set b(value: Uint8) {
    this._view.setU8(2, value);
  }

  public get a(): Uint8 {
    return this._view.getU8(3);
  }

  public set a(value: Uint8) {
    this._view.setU8(3, value);
  }
}

export class DisplayMode implements Struct {
  public static SIZE_IN_BYTES = 24;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<DisplayMode>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Uint8Array | Pointer<DisplayMode> | null,
    byteOffset: number = 0,
  ): DisplayMode | null {
    return data !== null ? new DisplayMode(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get format(): Uint32 {
    return this._view.getU32(0);
  }

  public get w(): int {
    return this._view.getI32(4);
  }

  public get h(): int {
    return this._view.getI32(8);
  }

  public get refresh_rate(): int {
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
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Uint8Array | Pointer<Keysym> | null,
    byteOffset: number = 0,
  ): Keysym | null {
    return data !== null ? new Keysym(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get scancode(): Scancode {
    return this._view.getU32(0) as Scancode;
  }

  public get sym(): Keycode {
    return this._view.getU32(4) as Keycode;
  }

  public get mod(): Uint16 {
    return this._view.getU16(8);
  }

  public get unused(): Uint32 {
    return this._view.getU32(12);
  }
}

export class Palette implements Struct {
  public static SIZE_IN_BYTES = 24;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<Palette>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Uint8Array | Pointer<Palette> | null,
    byteOffset: number = 0,
  ): Palette | null {
    return data !== null ? new Palette(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get ncolors(): int {
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
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Uint8Array | Pointer<PixelFormat> | null,
    byteOffset: number = 0,
  ): PixelFormat | null {
    return data !== null ? new PixelFormat(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get format(): Uint32 {
    return this._view.getU32(0);
  }

  public get palette(): Palette {
    return Palette.of(this._view.getPointer(8)) as Palette;
  }

  public get BitsPerPixel(): Uint8 {
    return this._view.getU8(16);
  }

  public get BytesPerPixel(): Uint8 {
    return this._view.getU8(17);
  }

  public get Rmask(): Uint32 {
    return this._view.getU32(20);
  }

  public get Gmask(): Uint32 {
    return this._view.getU32(24);
  }

  public get Bmask(): Uint32 {
    return this._view.getU32(28);
  }

  public get Amask(): Uint32 {
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

  constructor();
  constructor(
    data: Uint8Array | Pointer<Point>,
    byteOffset: number,
  );
  constructor(props: Partial<Point>);
  constructor(x: int, y: int);
  constructor(
    _1: Uint8Array | Pointer<Point> | Partial<Point> | int = {},
    _2?: number | int,
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
    byteOffset: number = 0,
  ): Point | null {
    return data !== null ? new Point(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get x(): int {
    return this._view.getI32(0);
  }

  public set x(value: int) {
    this._view.setI32(0, value);
  }

  public get y(): int {
    return this._view.getI32(4);
  }

  public set y(value: int) {
    this._view.setI32(4, value);
  }
}

export class Rect implements AllocatableStruct {
  public static SIZE_IN_BYTES = 16;

  public readonly _data: Uint8Array | Pointer<Rect>;
  public readonly _view: PlatformDataView;

  constructor();
  constructor(
    data: Uint8Array | Pointer<Rect>,
    byteOffset: number,
  );
  constructor(props: Partial<Rect>);
  constructor(x: int, y: int, w: int, h: int);
  constructor(
    _1: Uint8Array | Pointer<Rect> | Partial<Rect> | int = {},
    _2?: number | int,
    _3?: int,
    _4?: int,
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
    byteOffset: number = 0,
  ): Rect | null {
    return data !== null ? new Rect(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get x(): int {
    return this._view.getI32(0);
  }

  public set x(value: int) {
    this._view.setI32(0, value);
  }

  public get y(): int {
    return this._view.getI32(4);
  }

  public set y(value: int) {
    this._view.setI32(4, value);
  }

  public get w(): int {
    return this._view.getI32(8);
  }

  public set w(value: int) {
    this._view.setI32(8, value);
  }

  public get h(): int {
    return this._view.getI32(12);
  }

  public set h(value: int) {
    this._view.setI32(12, value);
  }
}

export class RendererInfo implements AllocatableStruct {
  public static SIZE_IN_BYTES = 88;

  public readonly _data: Uint8Array | Pointer<RendererInfo>;
  private readonly _view: PlatformDataView;

  constructor(
    data?: Uint8Array | Pointer<RendererInfo>,
    byteOffset: number = 0,
  ) {
    this._data = data ?? new Uint8Array(RendererInfo.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Uint8Array | Pointer<RendererInfo> | null,
    byteOffset: number = 0,
  ): RendererInfo | null {
    return data !== null ? new RendererInfo(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get name(): string {
    return Platform.fromPlatformString(Platform.toPlatformPointer(this._view.getPointer(0))!);
  }

  public get flags(): Uint32 {
    return this._view.getU32(8);
  }

  public get num_texture_formats(): Uint32 {
    return this._view.getU32(12);
  }

  // TODO: Add support for arrays in structs.
  // texture_formats

  public get max_texture_width(): int {
    return this._view.getI32(80);
  }

  public get max_texture_height(): int {
    return this._view.getI32(84);
  }
}

export class Surface implements Struct {
  public static SIZE_IN_BYTES = 96;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<Surface>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Uint8Array | Pointer<Surface> | null,
    byteOffset: number = 0,
  ): Surface | null {
    return data !== null ? new Surface(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get flags(): Uint32 {
    return this._view.getU32(0);
  }

  public get format(): PixelFormat {
    return PixelFormat.of(this._view.getPointer(8)) as PixelFormat;
  }

  public get w(): int {
    return this._view.getI32(16);
  }

  public get h(): int {
    return this._view.getI32(20);
  }

  public get pitch(): int {
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

  public get refcount(): int {
    return this._view.getI32(88);
  }
}

export class SysWMinfo implements Struct {
  public static SIZE_IN_BYTES = 72;

  private readonly _view: PlatformDataView;

  constructor(
    public readonly _data: Uint8Array | Pointer<SysWMinfo>,
    byteOffset: number = 0,
  ) {
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Uint8Array | Pointer<SysWMinfo> | null,
    byteOffset: number = 0,
  ): SysWMinfo | null {
    return data !== null ? new SysWMinfo(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
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
    byteOffset: number = 0,
  ) {
    this._data = data ?? new Uint8Array(version.SIZE_IN_BYTES);
    this._view = new Platform.DataView(this._data, byteOffset);
  }

  public static of(
    data: Uint8Array | Pointer<version> | null,
    byteOffset: number = 0,
  ): version | null {
    return data !== null ? new version(data, byteOffset) : null;
  }

  public get _byteOffset(): number {
    return this._view.byteOffset;
  }

  public get major(): Uint8 {
    return this._view.getU8(0);
  }

  public get minor(): Uint8 {
    return this._view.getU8(1);
  }

  public get patch(): Uint8 {
    return this._view.getU8(2);
  }
}
