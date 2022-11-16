// This file is auto generated. To update the file make changes to the code generator.

import { PlatformDataView } from "platform";
import { EventType, WindowEventID } from "./enums.ts";
import { Keysym } from "./structs.ts";
import { f32, i32, u32, u8 } from "../types.ts";

export class CommonEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): EventType {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }
}

export class DisplayEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): EventType {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }

  public get display(): u32 {
    return this._view.getUint32(8);
  }

  public get event(): u8 {
    return this._view.getUint8(12);
  }

  // padding1

  // padding2

  // padding3

  public get data1(): i32 {
    return this._view.getInt32(16);
  }
}

export class KeyboardEvent {
  private _keysym: Keysym;

  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
    this._keysym = Keysym.of(new Uint8Array(this._data.buffer, 16, Keysym.SIZE_IN_BYTES)) as Keysym;
  }

  public get type(): EventType {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }

  public get windowID(): u32 {
    return this._view.getUint32(8);
  }

  public get state(): u8 {
    return this._view.getUint8(12);
  }

  public get repeat(): u8 {
    return this._view.getUint8(13);
  }

  // padding2

  // padding3

  public get keysym(): Keysym {
    return this._keysym;
  }
}

export class MouseButtonEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): EventType {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }

  public get windowID(): u32 {
    return this._view.getUint32(8);
  }

  public get which(): u32 {
    return this._view.getUint32(12);
  }

  public get button(): u8 {
    return this._view.getUint8(16);
  }

  public get state(): u8 {
    return this._view.getUint8(17);
  }

  public get clicks(): u8 {
    return this._view.getUint8(18);
  }

  // padding1

  public get x(): i32 {
    return this._view.getInt32(20);
  }

  public get y(): i32 {
    return this._view.getInt32(24);
  }
}

export class MouseMotionEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): EventType {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }

  public get windowID(): u32 {
    return this._view.getUint32(8);
  }

  public get which(): u32 {
    return this._view.getUint32(12);
  }

  public get state(): u32 {
    return this._view.getUint32(16);
  }

  public get x(): i32 {
    return this._view.getInt32(20);
  }

  public get y(): i32 {
    return this._view.getInt32(24);
  }

  public get xrel(): i32 {
    return this._view.getInt32(28);
  }

  public get yrel(): i32 {
    return this._view.getInt32(32);
  }
}

export class MouseWheelEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): EventType {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }

  public get windowID(): u32 {
    return this._view.getUint32(8);
  }

  public get which(): u32 {
    return this._view.getUint32(12);
  }

  public get x(): i32 {
    return this._view.getInt32(16);
  }

  public get y(): i32 {
    return this._view.getInt32(20);
  }

  public get direction(): u32 {
    return this._view.getUint32(24);
  }

  public get preciseX(): f32 {
    return this._view.getFloat32(28);
  }

  public get preciseY(): f32 {
    return this._view.getFloat32(32);
  }
}

export class WindowEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): EventType {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }

  public get windowID(): u32 {
    return this._view.getUint32(8);
  }

  public get event(): WindowEventID {
    return this._view.getUint8(12);
  }

  // padding1

  // padding2

  // padding3

  public get data1(): i32 {
    return this._view.getInt32(16);
  }

  public get data2(): i32 {
    return this._view.getInt32(20);
  }
}

export class Event {
  public readonly _data = new Uint8Array(64);
  private readonly _view = new PlatformDataView<Event>(this._data);

  public get type(): EventType {
    return this._view.getUint32(0);
  }

  public readonly common = new CommonEvent(this._data, this._view);

  public readonly display = new DisplayEvent(this._data, this._view);

  public readonly key = new KeyboardEvent(this._data, this._view);

  public readonly mousebutton = new MouseButtonEvent(this._data, this._view);

  public readonly mousemotion = new MouseMotionEvent(this._data, this._view);

  public readonly mousewheel = new MouseWheelEvent(this._data, this._view);

  public readonly window = new WindowEvent(this._data, this._view);
}
