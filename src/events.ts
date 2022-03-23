export class SDL_Event {
  public _buffer = new Uint8Array(64);
  public _dataView = new DataView(this._buffer.buffer);

  public get type(): number {
    return this._dataView.getUint32(0, true);
  }
}
