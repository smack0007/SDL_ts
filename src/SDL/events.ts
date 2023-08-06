// This file is auto generated. To update the file make changes to the code generator.

import Platform from "../_platform.ts";
import { PlatformDataView } from "../_types.ts";
import { EventType, WindowEventID } from "./enums.ts";
import { Keysym } from "./structs.ts";
import { AllocatableStruct, f32, i32, Mutable, Struct, u32, u8 } from "../types.ts";
import { Pointer } from "../pointers.ts";
import { StructInternal } from "../_structs.ts";

export class CommonEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView) {
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

  public get timestamp(): u32 {
    return this._view.getU32(4);
  }
}

export class DisplayEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView) {
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

  public get timestamp(): u32 {
    return this._view.getU32(4);
  }

  public get display(): u32 {
    return this._view.getU32(8);
  }

  public get event(): u8 {
    return this._view.getU8(12);
  }

  // padding1

  // padding2

  // padding3

  public get data1(): i32 {
    return this._view.getI32(16);
  }
}

export class KeyboardEvent {
  private _keysym: Keysym;

  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView) {
    this._keysym = Keysym.of(new Uint8Array(this._data.buffer, 16, Keysym.SIZE_IN_BYTES)) as Keysym;
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

  public get timestamp(): u32 {
    return this._view.getU32(4);
  }

  public get windowID(): u32 {
    return this._view.getU32(8);
  }

  public get state(): u8 {
    return this._view.getU8(12);
  }

  public get repeat(): u8 {
    return this._view.getU8(13);
  }

  // padding2

  // padding3

  public get keysym(): Keysym {
    return this._keysym;
  }
}

export class MouseButtonEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView) {
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

  public get timestamp(): u32 {
    return this._view.getU32(4);
  }

  public get windowID(): u32 {
    return this._view.getU32(8);
  }

  public get which(): u32 {
    return this._view.getU32(12);
  }

  public get button(): u8 {
    return this._view.getU8(16);
  }

  public get state(): u8 {
    return this._view.getU8(17);
  }

  public get clicks(): u8 {
    return this._view.getU8(18);
  }

  // padding1

  public get x(): i32 {
    return this._view.getI32(20);
  }

  public get y(): i32 {
    return this._view.getI32(24);
  }
}

export class MouseMotionEvent {
  constructor(public readonly _data: Uint8Array | Pointer<MouseMotionEvent>, private _view: PlatformDataView) {
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

  public get timestamp(): u32 {
    return this._view.getU32(4);
  }

  public get windowID(): u32 {
    return this._view.getU32(8);
  }

  public get which(): u32 {
    return this._view.getU32(12);
  }

  public get state(): u32 {
    return this._view.getU32(16);
  }

  public get x(): i32 {
    return this._view.getI32(20);
  }

  public get y(): i32 {
    return this._view.getI32(24);
  }

  public get xrel(): i32 {
    return this._view.getI32(28);
  }

  public get yrel(): i32 {
    return this._view.getI32(32);
  }
}

export class MouseWheelEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView) {
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

  public get timestamp(): u32 {
    return this._view.getU32(4);
  }

  public get windowID(): u32 {
    return this._view.getU32(8);
  }

  public get which(): u32 {
    return this._view.getU32(12);
  }

  public get x(): i32 {
    return this._view.getI32(16);
  }

  public get y(): i32 {
    return this._view.getI32(20);
  }

  public get direction(): u32 {
    return this._view.getU32(24);
  }

  public get preciseX(): f32 {
    return this._view.getF32(28);
  }

  public get preciseY(): f32 {
    return this._view.getF32(32);
  }
}

export class WindowEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView) {
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

  public get timestamp(): u32 {
    return this._view.getU32(4);
  }

  public get windowID(): u32 {
    return this._view.getU32(8);
  }

  public get event(): WindowEventID {
    return this._view.getU8(12) as WindowEventID;
  }

  // padding1

  // padding2

  // padding3

  public get data1(): i32 {
    return this._view.getI32(16);
  }

  public get data2(): i32 {
    return this._view.getI32(20);
  }
}

export class Event implements AllocatableStruct {
  public static SIZE_IN_BYTES = 64;

  public readonly _data = new Uint8Array(64);
  private readonly _view = new Platform.DataView(this._data);

  public static of(data: Uint8Array | Pointer<Event> | null): Event | null {
    if (data === null) {
      return null;
    }

    const struct = new Event() as unknown as StructInternal<Event>;
    struct._data = data;
    struct._view = new Platform.DataView(Pointer.isPointer(data) ? Platform.toPlatformPointer(data)! : data);

    // TODO: Remove this hack.
    (struct as unknown as Mutable<Event>).mousemotion = new MouseMotionEvent(struct._data, struct._view);

    return struct as unknown as Event;
  }

  public get type(): EventType {
    return this._view.getU32(0) as EventType;
  }

  public readonly common = new CommonEvent(this._data, this._view);

  public readonly display = new DisplayEvent(this._data, this._view);

  public readonly key = new KeyboardEvent(this._data, this._view);

  public readonly mousebutton = new MouseButtonEvent(this._data, this._view);

  public readonly mousemotion = new MouseMotionEvent(this._data, this._view);

  public readonly mousewheel = new MouseWheelEvent(this._data, this._view);

  public readonly window = new WindowEvent(this._data, this._view);
}
