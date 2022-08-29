import { PlatformDataView } from "platform";
import { Memory } from "./memory.ts";
import { Pointer, PrimitiveType, Struct } from "./types.ts";
import { DATA_VIEW_METHODS, sizeof } from "./_utils.ts";

export type BoxableValue = number | PrimitiveType | Struct;

export type BoxableValueConstructor = NumberConstructor | symbol | (new () => Struct);

export interface BoxedValue<T extends BoxableValue> {
  get value(): T;
}

export const BoxedValue = {
  create: function <T>(constructor: BoxableValueConstructor): BoxedValue<T> {
    return new BoxedValueImpl(constructor);
  },
} as const;

class BoxedValueImpl<T extends BoxableValue> implements BoxedValue<T> {
  private readonly _data: Uint8Array;
  private readonly _pointer: Pointer<T>;
  private readonly _view: PlatformDataView<T>;
  private readonly _viewMethod: (byteOffset: number) => T;

  constructor(constructor: BoxableValueConstructor) {
    const dataLength = sizeof(constructor);

    this._data = new Uint8Array(dataLength);
    this._pointer = Memory.pointer(this._data) as Pointer<T>;
    this._view = new PlatformDataView(this._data);

    const viewMethodName = DATA_VIEW_METHODS.get(constructor)!;
    this._viewMethod = this._view[viewMethodName].bind(this._view) as (byteOffset: number) => T;
  }

  public get value(): T {
    return this._viewMethod(0);
  }
}

export interface BoxedValueInternal {
  _data: Uint8Array;
}

export function isBoxedValue(value: unknown): value is BoxedValueInternal {
  return (value instanceof BoxedValueImpl);
}