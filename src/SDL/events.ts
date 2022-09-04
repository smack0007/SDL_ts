// This file is auto generated. To update the file make changes to the code generator.

// deno-lint-ignore-file no-unused-vars

import { PlatformDataView, PlatformPointer } from "platform";
import { Keysym } from "./structs.ts";
import { f32, f64, i16, i32, i64, i8, Pointer, u16, u32, u64, u8 } from "../types.ts";

export class CommonEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): u32 {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }
}

export class DisplayEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): u32 {
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
    this._keysym = Keysym.of(new Uint8Array(this._data.buffer, 16, Keysym.SIZE_IN_BYTES));
  }

  public get type(): u32 {
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

export class WindowEvent {
  constructor(public readonly _data: Uint8Array, private _view: PlatformDataView<Event>) {
  }

  public get type(): u32 {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }

  public get windowID(): u32 {
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

  public get data2(): i32 {
    return this._view.getInt32(20);
  }
}

export class Event {
  public readonly _data = new Uint8Array(64);
  private readonly _view = new PlatformDataView<Event>(this._data);

  public get type(): number {
    return this._view.getUint32(0);
  }

  public readonly common = new CommonEvent(this._data, this._view);

  public readonly display = new DisplayEvent(this._data, this._view);

  public readonly key = new KeyboardEvent(this._data, this._view);

  public readonly window = new WindowEvent(this._data, this._view);
}
