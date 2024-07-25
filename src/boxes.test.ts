import { assertEquals } from "@std/assert";
import { Box, BoxValueFactory } from "./boxes.ts";
import { Pointer } from "./pointers.ts";
import { F32, F64, I16, I32, I8, Int, U16, U32, U8 } from "./types.ts";
import { PlatformDataView, PlatformPointer } from "./_types.ts";

(<Array<[BoxValueFactory<number>, keyof PlatformDataView, number]>>[
  [I8, "setI8", -42],
  [U8, "setU8", 42],
  [I16, "setI16", -256],
  [U16, "setU16", 256],
  [I32, "setI32", -32769],
  [U32, "setU32", 32768],
  [Int, "setI32", 1234],
]).forEach((testData) => {
  Deno.test(`${testData[0].name} can be boxed`, () => {
    const box = new Box(testData[0]);
    const setter = box._view[testData[1]] as (
      arg1: number,
      arg2: number
    ) => void;
    setter.apply(box._view, [0, testData[2]]);

    const result = box.value;
    assertEquals(result, testData[2]);
    assertEquals(typeof result, "number");
  });
});

(<Array<[BoxValueFactory<number>, keyof PlatformDataView, number]>>[
  [F32, "setF32", 12.34],
  [F64, "setF64", 12.34],
]).forEach((testData) => {
  Deno.test(`${testData[0].name} can be boxed`, () => {
    const box = new Box(testData[0]);
    const setter = box._view[testData[1]] as (
      arg1: number,
      arg2: number
    ) => void;
    setter.apply(box._view, [0, testData[2]]);

    const result = box.value;
    assertEquals(Math.round(result), Math.round(testData[2]));
    assertEquals(typeof result, "number");
  });
});

Deno.test(`Pointer can be boxed`, () => {
  const pointerValue = new Pointer(
    Deno.UnsafePointer.create(12345n) as unknown as PlatformPointer<unknown>
  );

  const box = new Box<Pointer<number>>(Pointer);
  box._view.setPointer(0, pointerValue);

  const value = box.value;
  assertEquals(value, pointerValue);
  assertEquals(Pointer.isPointer(value), true);
});
