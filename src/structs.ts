// This file is auto generated. To update the file make changes to the code generator.

export type Window = Deno.UnsafePointer;

export class Rect {
  public _data: ArrayBuffer | Deno.UnsafePointer;
  public _dataView: DataView | Deno.UnsafePointerView;

  constructor(buffer: ArrayBuffer);
  constructor(pointer: Deno.UnsafePointer);
  constructor(bufferOrPointer: ArrayBuffer | Deno.UnsafePointer) {
    this._data = bufferOrPointer;
    if (bufferOrPointer instanceof ArrayBuffer) {
      this._dataView = new DataView(bufferOrPointer);
    } else {
      this._dataView = new Deno.UnsafePointerView(bufferOrPointer);
    }
  }

  public get x(): number {
    return this._dataView.getInt32(0, true);
  }

  public get y(): number {
    return this._dataView.getInt32(4, true);
  }

  public get w(): number {
    return this._dataView.getInt32(8, true);
  }

  public get h(): number {
    return this._dataView.getInt32(12, true);
  }
}

export class Surface {
  public _pointerView: Deno.UnsafePointerView;

  constructor(pointer: Deno.UnsafePointer) {
    this._pointerView = new Deno.UnsafePointerView(pointer);
  }

  public get flags(): number {
    return this._pointerView.getUint32(0);
  }

  public get format(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._pointerView.getBigUint64(8));
  }

  public get w(): number {
    return this._pointerView.getInt32(16);
  }

  public get h(): number {
    return this._pointerView.getInt32(20);
  }

  public get pitch(): number {
    return this._pointerView.getInt32(24);
  }

  public get pixels(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._pointerView.getBigUint64(32));
  }

  public get userdata(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._pointerView.getBigUint64(40));
  }

  public get locked(): number {
    return this._pointerView.getInt32(48);
  }

  public get list_blitmap(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._pointerView.getBigUint64(56));
  }

  public get map(): Deno.UnsafePointer {
    return new Deno.UnsafePointer(this._pointerView.getBigUint64(80));
  }

  public get refcount(): number {
    return this._pointerView.getInt32(88);
  }

  public get clip_rect(): Rect {
    return new Rect(this._pointerView.getArrayBuffer(16, 64));
  }
}
