import { asserts } from "../deps.ts";
import { Box, BoxValueFactory } from "./boxes.ts";
import { Pointer } from "./pointers.ts";
import { F32, F64, I16, I32, I8, Int, U16, U32, U8 } from "./types.ts";
import { PlatformDataView } from "./_types.ts";

const { assertEquals } = asserts;

(<Array<[BoxValueFactory<number>, keyof PlatformDataView, number]>> [
  [I8, "setInt8", -42],
  [U8, "setUint8", 42],
  [I16, "setInt16", -256],
  [U16, "setUint16", 256],
  [I32, "setInt32", -32769],
  [U32, "setUint32", 32768],
  [Int, "setInt32", 1234],
]).forEach((testData) => {
  Deno.test(`${testData[0].name} can be boxed`, () => {
    const box = new Box(testData[0]);
    const setter = (box._view[testData[1]]) as (arg1: number, arg2: number) => void;
    setter.apply(box._view, [0, testData[2]]);

    const result = box.value;
    assertEquals(result, testData[2]);
    assertEquals(typeof result, "number");
  });
});

(<Array<[BoxValueFactory<number>, keyof PlatformDataView, number]>> [
  [F32, "setFloat32", 12.34],
  [F64, "setFloat64", 12.34],
]).forEach((testData) => {
  Deno.test(`${testData[0].name} can be boxed`, () => {
    const box = new Box(testData[0]);
    const setter = (box._view[testData[1]]) as (arg1: number, arg2: number) => void;
    setter.apply(box._view, [0, testData[2]]);

    const result = box.value;
    assertEquals(Math.round(result), Math.round(testData[2]));
    assertEquals(typeof result, "number");
  });
});

Deno.test(`Pointer can be boxed`, () => {
  const pointerValue = 123456n;

  const box = new Box<Pointer<number>>(Pointer);
  box._view.setBigUint64(0, pointerValue);

  const value = box.value;
  assertEquals(value, pointerValue);
  assertEquals(typeof value, "bigint");
});
