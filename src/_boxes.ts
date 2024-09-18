import Platform from "./_platform.ts";
import {
  AllocatableStruct,
  AllocatableStructConstructor,
  Constructor,
  double,
  Factory,
  float,
  int,
  OrFactory,
  Predicate,
  Sint32,
  Struct,
  TypedNumber,
  Uint16,
  Uint32,
  Uint64,
  Uint8,
} from "./types.ts";
import { throwError } from "./_utils.ts";
import { PlatformDataView } from "./_types.ts";
import { Pointer } from "./pointers.ts";

export type BoxValue = Pointer<unknown> | TypedNumber | Struct;

export type BoxValueConstructor<T extends BoxValue> = Constructor<T>;

export type BoxValueFactory<T extends BoxValue> = Factory<T>;

type BoxValueTransformer<T extends BoxValue> = (
  data: Uint8Array,
  view: PlatformDataView,
  offset: number,
) => T;

function sizeof<T extends BoxValue>(
  factoryOrConstructor: BoxValueFactory<T> | BoxValueConstructor<T>,
): number {
  if (
    "SIZE_IN_BYTES" in
      (factoryOrConstructor as unknown as AllocatableStructConstructor<AllocatableStruct>)
  ) {
    return (
      factoryOrConstructor as unknown as AllocatableStructConstructor<AllocatableStruct>
    ).SIZE_IN_BYTES;
  }

  switch (factoryOrConstructor) {
    case Uint8:
      return 1;

    case Uint16:
      return 2;

    case float:
    case int:
    case Sint32:
    case Uint32:
      return 4;

    case double:
    case Uint64:
      return 8;

    case Pointer as unknown as BoxValueFactory<T>:
      return Platform.POINTER_SIZE_IN_BYTES;
  }

  throwError(
    `${factoryOrConstructor?.name} is not boxable. sizeof not implemented.`,
  );
}

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

  if ("of" in factoryOrConstructor) {
    return factoryOrConstructor.of as unknown as BoxValueTransformer<T>;
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

  public unbox(predicate: Predicate<T>, errorMessage: OrFactory<string>): T {
    const value = this.value;
    return predicate(value) ? value : throwError(errorMessage);
  }

  public unboxNotNull(errorMessage: OrFactory<string>): T {
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
    this._view = new Platform.DataView(this._data);
  }

  public static isBoxArray(value: unknown): value is BoxArray<BoxValue> {
    return value instanceof BoxArray;
  }

  public at(index: number): T {
    return this._transformer(
      this._data,
      this._view,
      this.sizeOfElementInBytes * index,
    );
  }

  public unboxAt(
    index: number,
    predicate: Predicate<T>,
    errorMessage: string,
  ): T {
    const value = this.at(index);
    return predicate(value) ? value : throwError(errorMessage);
  }

  public pointersAt(index: number): Pointer<T> {
    return Pointer.ofTypedArray<T>(
      this._data,
      this.sizeOfElementInBytes * index,
    );
  }
}
