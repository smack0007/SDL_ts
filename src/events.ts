// This file is auto generated. To update the file make changes to the code generator.

export interface CommonEvent {
  type: number;
  timestamp: number;
}

export interface DisplayEvent {
  type: number;
  timestamp: number;
  display: number;
  event: number;
  data1: number;
}

export interface WindowEvent {
  type: number;
  timestamp: number;
  windowID: number;
  event: number;
  data1: number;
  data2: number;
}

export class Event implements CommonEvent, DisplayEvent, WindowEvent {
  public _buffer = new Uint8Array(64);
  public _dataView = new DataView(this._buffer.buffer);

  public get type(): number {
    return this._dataView.getUint32(0, true);
  }

  public get timestamp(): number {
    return this._dataView.getUint32(4, true);
  }

  public get display(): number {
    return this._dataView.getUint32(8, true);
  }

  public get windowID(): number {
    return this._dataView.getUint32(8, true);
  }

  public get event(): number {
    return this._dataView.getUint8(12);
  }

  public get data1(): number {
    return this._dataView.getInt32(16);
  }

  public get data2(): number {
    return this._dataView.getInt32(20);
  }
}
