import { PlatformDataView } from "platform";
import { Memory } from "./memory.ts";
import {
  AllocatableStruct,
  AllocatableStructConstructor,
  BoxableValue,
  BoxableValueConstructor,
  PointerValue,
} from "./types.ts";
import { DATA_VIEW_METHODS, sizeof } from "./_utils.ts";

export interface BoxedValue<T extends BoxableValue> {
  get value(): T;
}

export const BoxedValue = {
  create: function <T>(constructor: BoxableValueConstructor): BoxedValue<T> {
    return new BoxedValueImpl(constructor);
  },
} as const;

export class BoxedValueImpl<T extends BoxableValue> implements BoxedValue<T> {
  private readonly _data: Uint8Array;
  private readonly _pointer: PointerValue<T>;
  private readonly _view: PlatformDataView<T>;
  private readonly _viewMethod: (byteOffset: number) => T;

  constructor(constructor: BoxableValueConstructor) {
    const dataLength = sizeof(constructor);

    this._data = new Uint8Array(dataLength);
    this._pointer = Memory.pointer(this._data) as PointerValue<T>;
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

export class BoxedArray<T extends AllocatableStruct> {
  private constructor(
    public readonly array: T[],
    public readonly memory: Uint8Array,
    public readonly sizeOfElement: number,
  ) {
  }

  public static create<T extends AllocatableStruct>(
    _constructor: AllocatableStructConstructor<T>,
    length: number,
  ): BoxedArray<T> {
    if (length <= 0) {
      throw new Error("length must be > 0.");
    }

    const array = new Array<T>(length);
    const memory = new Uint8Array(_constructor.SIZE_IN_BYTES * length);

    for (let i = 0; i < length; i++) {
      const memoryOffset = new Uint8Array(memory.buffer, _constructor.SIZE_IN_BYTES * i, _constructor.SIZE_IN_BYTES);
      array[i] = new _constructor(memoryOffset);
    }

    return new BoxedArray<T>(
      array,
      memory,
      sizeof(_constructor),
    );
  }

  public at(index: number): T {
    return this.array[index];
  }
}

export function isBoxedArray(value: unknown): value is BoxedArray<AllocatableStruct> {
  return value instanceof BoxedArray;
}
