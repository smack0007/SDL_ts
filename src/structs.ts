import Platform from "./_platform.ts";
import { PlatformDataView } from "./_types.ts";
import { sizeof } from "./_utils.ts";
import { AllocatableStruct, AllocatableStructConstructor } from "./types.ts";

export class StructArray<T extends AllocatableStruct> {
  public readonly sizeOfElementInBytes: number;
  public readonly _data: Uint8Array;
  public readonly _view: PlatformDataView;

  public constructor(constructor: AllocatableStructConstructor<T>, data: T[]);
  public constructor(constructor: AllocatableStructConstructor<T>, length: number);
  public constructor(
    constructor: AllocatableStructConstructor<T>,
    dataOrLength: T[] | number,
  ) {
    this.sizeOfElementInBytes = sizeof(constructor);

    const isArray = Array.isArray(dataOrLength);
    const length = isArray ? dataOrLength.length : dataOrLength;

    if (length < 0) {
      throw new Error("length must be >= 0.");
    }

    this._data = new Uint8Array(this.sizeOfElementInBytes * length);
    this._view = new Platform.DataView(this._data);

    if (isArray) {
      for (let i = 0; i < dataOrLength.length; i += 1) {
        if (!(dataOrLength[i]._data instanceof Uint8Array)) {
          throw new Error(`Struct at index ${i} is not backed by a Uint8Array.`);
        }
        
        this._data.set(dataOrLength[i]._data as Uint8Array, i * this.sizeOfElementInBytes);
      }
    }
  }
}

export function isStructArray<T extends AllocatableStruct>(value: unknown): value is StructArray<T> {
  return value instanceof StructArray;
}
