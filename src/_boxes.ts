import Platform from "./_platform.ts";
import {
  Constructor,
  double,
  Factory,
  float,
  int,
  Pointer,
  Sint32,
  TypedNumber,
  Uint16,
  Uint32,
  Uint64,
  Uint8,
} from "./types.ts";
import { PlatformDataView } from "./_types.ts";
import { sizeof } from "./_utils.ts";

type BoxValue = TypedNumber | Pointer<unknown>;
export type BoxValueConstructor<T extends BoxValue> = Constructor<T>;
export type BoxValueFactory<T extends BoxValue> = Factory<T>;

type BoxValueTransformer<T extends BoxValue> = (
  data: Uint8Array,
  view: PlatformDataView,
  offset: number,
) => T;

export function getTransformer<T extends BoxValue>(
  factoryOrConstructor: BoxValueFactory<T> | BoxValueConstructor<T>,
): BoxValueTransformer<T> {
  switch (factoryOrConstructor) {
    case double:
      return ((_, view, offset) => view.getF64(offset)) as BoxValueTransformer<T>;

    case float:
      return ((_, view, offset) => view.getF32(offset)) as BoxValueTransformer<T>;

    case int:
    case Sint32:
      return ((_, view, offset) => view.getI32(offset)) as BoxValueTransformer<T>;

    case Uint8:
      return ((_, view, offset) => view.getU8(offset)) as BoxValueTransformer<T>;

    case Uint16:
      return ((_, view, offset) => view.getU16(offset)) as BoxValueTransformer<T>;

    case Uint32:
      return ((_, view, offset) => view.getU32(offset)) as BoxValueTransformer<T>;

    case Uint64:
      return ((_, view, offset) => view.getU64(offset)) as BoxValueTransformer<T>;

    case Pointer as unknown as BoxValueFactory<T>:
      return ((_, view, offset) => view.getPointer(offset)) as BoxValueTransformer<T>;
  }

  throw new Error(
    `${factoryOrConstructor?.name} is not boxable. getTransformer not implemented.`,
  );
}

export class Box<T extends BoxValue> {
  private readonly _transformer: BoxValueTransformer<T>;
  public readonly _data: Uint8Array;
  public readonly _view: PlatformDataView;

  public constructor(
    factoryOrConstructor: BoxValueFactory<T> | BoxValueConstructor<T>,
  ) {
    const dataLength = sizeof(factoryOrConstructor);
    this._transformer = getTransformer(factoryOrConstructor);

    this._data = new Uint8Array(dataLength);
    this._view = new Platform.DataView(this._data);
  }

  public static isBox(value: unknown): value is Box<BoxValue> {
    return value instanceof Box;
  }

  public get value(): T {
    return this._transformer(this._data, this._view, 0);
  }
}
