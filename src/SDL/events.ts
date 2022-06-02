// This file is auto generated. To update the file make changes to the code generator.

import { f32, f64, i16, i32, i64, i8, Pointer, u16, u32, u64, u8 } from "../types.ts";
import { DataPointer, DataView } from "../_utils.ts";

export class CommonEvent {
  constructor(private _view: DataView<Event>) {}

  public get type(): u32 {
    return this._view.getUint32(0);
  }

  public get timestamp(): u32 {
    return this._view.getUint32(4);
  }
}

export class DisplayEvent {
  constructor(private _view: DataView<Event>) {}

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

  public get data1(): i32 {
    return this._view.getInt32(16);
  }
}

export class WindowEvent {
  constructor(private _view: DataView<Event>) {}

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

  public get data1(): i32 {
    return this._view.getInt32(16);
  }

  public get data2(): i32 {
    return this._view.getInt32(20);
  }
}

export class Event {
  private _data = new Uint8Array(64);
  private _view = new DataView<Event>(this._data);
  private _pointer = new DataPointer<Event>(Deno.UnsafePointer.of(this._data), Event);

  public get pointer(): Pointer<Event> {
    return this._pointer;
  }

  public get type(): number {
    return this._view.getUint32(0);
  }

  public readonly common = new CommonEvent(this._view);

  public readonly display = new DisplayEvent(this._view);

  public readonly window = new WindowEvent(this._view);
}
