import { asserts } from "../deps.ts";
import { BoxedValue } from "./boxes.ts";
import { BoxableValueFactory, I16, I32, I8, Int, U16, U32, U8 } from "./types.ts";
import { PlatformDataView } from "./_types.ts";

const { assertEquals } = asserts;

(<Array<[BoxableValueFactory<number>, keyof PlatformDataView, number]>> [
  [I8, "setInt8", -42],
  [U8, "setUint8", 42],
  [I16, "setInt16", -256],
  [U16, "setUint16", 256],
  [I32, "setInt32", -32769],
  [U32, "setUint32", 32768],
  [Int, "setInt32", 1234],
]).forEach((testData) => {
  Deno.test(`${testData[0].name} can be boxed`, () => {
    const value = new BoxedValue(testData[0]);
    const setter = (value._view[testData[1]]) as (arg1: number, arg2: number) => void;
    setter.apply(value._view, [0, testData[2]]);

    const result = value.value;
    assertEquals(result, testData[2]);
    assertEquals(typeof result, "number");
  });
});
