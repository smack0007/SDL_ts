import { BoxedArray, BoxedValue } from "./boxes.ts";
import { BoxableValue, PointerValue, Struct, TypedArray } from "./types.ts";

type PointerBoxableValue<T> = T extends BoxableValue ? BoxedArray<T> | BoxedValue<T> : never;

export type PointerLike<T> = PointerValue<T> | Struct | TypedArray | PointerBoxableValue<T>;
