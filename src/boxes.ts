import platform from "./_platform.ts";
import {
  AllocatableStruct,
  AllocatableStructConstructor,
  Constructor,
  F32,
  F64,
  Factory,
  I16,
  I32,
  I64,
  I8,
  Int,
  OrFactory,
  Predicate,
  Struct,
  TypedNumber,
  U16,
  U32,
  U64,
  U8,
} from "./types.ts";
import { throwError } from "./_utils.ts";
import { PlatformDataView } from "./_types.ts";
import { Pointer } from "./pointers.ts";

export type BoxValue = Pointer<unknown> | TypedNumber | Struct;

export type BoxValueConstructor<T extends BoxValue> = Constructor<T>;

export type BoxValueFactory<T extends BoxValue> = Factory<T>;

type BoxValueTransformer<T extends BoxValue> = (data: Uint8Array, view: PlatformDataView, offset: number) => T;

function sizeof<T extends BoxValue>(
  factoryOrConstructor: BoxValueFactory<T> | BoxValueConstructor<T>,
): number {
  if ("SIZE_IN_BYTES" in (factoryOrConstructor as unknown as AllocatableStructConstructor<AllocatableStruct>)) {
    return (factoryOrConstructor as unknown as AllocatableStructConstructor<AllocatableStruct>).SIZE_IN_BYTES;
  }

  switch (factoryOrConstructor) {
    case I8:
    case U8:
      return 1;

    case I16:
    case U16:
      return 2;

    case I32:
    case U32:
    case F32:
      return 4;

    case I64:
    case U64:
    case F64:
      return 8;

    case Int: // TODO: Does this need to be platform dependent?
      return 4;
  }

  throwError(`${(factoryOrConstructor)?.name} is not boxable. sizeof not implemented.`);
}

export function getTransformer<T extends BoxValue>(
  factoryOrConstructor: BoxValueFactory<T> | BoxValueConstructor<T>,
): BoxValueTransformer<T> {
  switch (factoryOrConstructor) {
    case I8:
      return ((_, view, offset) => view.getInt8(offset)) as BoxValueTransformer<T>;

    case U8:
      return ((_, view, offset) => view.getUint8(offset)) as BoxValueTransformer<T>;

    case I16:
      return ((_, view, offset) => view.getInt16(offset)) as BoxValueTransformer<T>;

    case U16:
      return ((_, view, offset) => view.getUint16(offset)) as BoxValueTransformer<T>;

    case I32:
      return ((_, view, offset) => view.getInt32(offset)) as BoxValueTransformer<T>;

    case U32:
      return ((_, view, offset) => view.getUint32(offset)) as BoxValueTransformer<T>;

    case F32:
      return ((_, view, offset) => view.getFloat32(offset)) as BoxValueTransformer<T>;

    case I64:
      return ((_, view, offset) => view.getBigInt64(offset)) as BoxValueTransformer<T>;

    case U64:
      return ((_, view, offset) => view.getBigUint64(offset)) as BoxValueTransformer<T>;

    case F64:
      return ((_, view, offset) => view.getFloat64(offset)) as BoxValueTransformer<T>;

    case Int: // TODO: Does this need to be platform dependent?
      return ((_, view, offset) => view.getInt32(offset)) as BoxValueTransformer<T>;

    case Pointer as unknown as BoxValueFactory<T>:
      return ((_, view, offset) => view.getPointer(offset)) as BoxValueTransformer<T>;
  }

  if ("of" in factoryOrConstructor as unknown as AllocatableStructConstructor<T>) {
    return (factoryOrConstructor as unknown as AllocatableStructConstructor<T>)
      .of as unknown as BoxValueTransformer<
        T
      >;
  }

  throw new Error(
    `${(factoryOrConstructor)?.name} is not boxable. getTransformer not implemented.`,
  );
}

export class Box<T extends BoxValue> {
  private readonly _transformer: BoxValueTransformer<T>;
  public readonly _data: Uint8Array;
  public readonly _view: PlatformDataView;

  public constructor(factoryOrConstructor: BoxValueFactory<T> | BoxValueConstructor<T>) {
    const dataLength = sizeof(factoryOrConstructor);
    this._transformer = getTransformer(factoryOrConstructor);

    this._data = new Uint8Array(dataLength);
    this._view = new platform.DataView(this._data);
  }

  public static isBox(value: unknown): value is Box<BoxValue> {
    return (value instanceof Box);
  }

  public get value(): T {
    return this._transformer(this._data, this._view, 0);
  }

  public unbox(
    predicate: Predicate<T>,
    errorMessage: OrFactory<string>,
  ): T {
    const value = this.value;
    return predicate(value) ? value : throwError(errorMessage);
  }

  public unboxNotNull(
    errorMessage: OrFactory<string>,
  ): T {
    return this.unbox((value) => value != 0, errorMessage);
  }
}

export class BoxArray<T extends BoxValue> {
  public readonly sizeOfElementInBytes: number;
  private readonly _transformer: BoxValueTransformer<T>;
  public readonly _data: Uint8Array;
  public readonly _view: PlatformDataView;

  public constructor(
    factoryOrConstructor: BoxValueFactory<T> | BoxValueConstructor<T>,
    length: number,
  ) {
    if (length <= 0) {
      throw new Error("length must be > 0.");
    }

    this.sizeOfElementInBytes = sizeof(factoryOrConstructor);
    this._transformer = getTransformer(factoryOrConstructor);

    this._data = new Uint8Array(this.sizeOfElementInBytes * length);
    this._view = new platform.DataView(this._data);
  }

  public static isBoxArray(value: unknown): value is BoxArray<BoxValue> {
    return value instanceof BoxArray;
  }

  public at(index: number): T {
    return this._transformer(this._data, this._view, this.sizeOfElementInBytes * index);
  }

  public unboxAt(
    index: number,
    predicate: Predicate<T>,
    errorMessage: string,
  ): T {
    const value = this.at(index);
    return predicate(value) ? value : throwError(errorMessage);
  }

  public readonly pointers = {
    at: (index: number) => {
      return Pointer.ofTypedArray(this._data, this.sizeOfElementInBytes * index);
    },
  };
}
