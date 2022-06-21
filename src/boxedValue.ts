import { PlatformDataView, PlatformPointer } from "platform";
import { Pointer } from "./pointer.ts";
import { PrimitiveType, Struct } from "./types.ts";
import { PointerInternal } from "./_pointer.ts";
import { DATA_VIEW_METHODS, sizeof } from "./_utils.ts";

export type BoxableValue = number | PrimitiveType | Struct;

export type BoxableValueConstructor = NumberConstructor | symbol | (new () => Struct);

// deno-lint-ignore no-empty-interface
export interface BoxedValue<T extends BoxableValue> extends Pointer<T> {
}

export const BoxedValue = {
  create: function <T>(constructor: BoxableValueConstructor): BoxedValue<T> {
    return new BoxedValueImpl(constructor);
  },
} as const;

class BoxedValueImpl<T extends BoxableValue> implements BoxedValue<T>, PointerInternal<T> {
  private readonly _data: Uint8Array;
  private readonly _platformPointer: PlatformPointer<T>;
  private readonly _view: PlatformDataView<T>;
  private readonly _viewMethod: (byteOffset: number) => T;

  constructor(constructor: BoxableValueConstructor) {
    const dataLength = sizeof(constructor);

    this._data = new Uint8Array(dataLength);
    this._platformPointer = PlatformPointer.of<T>(this._data);
    this._view = new PlatformDataView(this._data);

    const viewMethodName = DATA_VIEW_METHODS.get(constructor)!;
    this._viewMethod = this._view[viewMethodName].bind(this._view) as (byteOffset: number) => T;
  }

  // Necessary for BoxedValue to behave as if it's a PlatformPointer.
  public get _pointer(): unknown {
    return this._platformPointer._pointer;
  }

  public get isPlatformPointer(): boolean {
    return false;
  }

  public get isNull(): boolean {
    return this._platformPointer.isNull;
  }

  public get address(): bigint {
    return this._platformPointer.address;
  }

  public get value(): T {
    return this._viewMethod(0);
  }

  public setValue(value: T): void {
    this._platformPointer.setValue(value);
  }
}

export interface BoxedValueInternal {
  _data: Uint8Array;
}

export function isBoxedValue(value: unknown): value is BoxedValueInternal {
  return (value instanceof BoxedValueImpl);
}
