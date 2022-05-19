// This file is auto generated. To update the file make changes to the code generator.

import { Pointer, Struct } from "./types.ts";
import { DataPointer, DataView } from "./utils.ts";

export class CommonEvent {
  constructor(private _view: DataView) {}

  public get type(): number {
    return this._view.getUint32(0);
  }

  public get timestamp(): number {
    return this._view.getUint32(4);
  }
}

export class DisplayEvent {
  constructor(private _view: DataView) {}

  public get type(): number {
    return this._view.getUint32(0);
  }

  public get timestamp(): number {
    return this._view.getUint32(4);
  }

  public get display(): number {
    return this._view.getUint32(8);
  }

  public get event(): number {
    return this._view.getUint8(12);
  }

  public get data1(): number {
    return this._view.getInt32(16);
  }
}

export class WindowEvent {
  constructor(private _view: DataView) {}

  public get type(): number {
    return this._view.getUint32(0);
  }

  public get timestamp(): number {
    return this._view.getUint32(4);
  }

  public get windowID(): number {
    return this._view.getUint32(8);
  }

  public get event(): number {
    return this._view.getUint8(12);
  }

  public get data1(): number {
    return this._view.getInt32(16);
  }

  public get data2(): number {
    return this._view.getInt32(20);
  }
}

export class Event implements Struct {
  private _data = new Uint8Array(64);
  private _view = new DataView(this._data);

  public get pointer(): Pointer<Event> {
    return DataPointer.of(this._data); // TODO: Can we save the pointer?
  }

  public get type(): number {
    return this._view.getUint32(0);
  }

  public readonly common = new CommonEvent(this._view);

  public readonly display = new DisplayEvent(this._view);

  public readonly window = new WindowEvent(this._view);
}
