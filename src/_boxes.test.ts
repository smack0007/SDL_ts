import { assertEquals } from "@std/assert";
import { Box, BoxValueFactory } from "./_boxes.ts";
import { double, float, int, Pointer, Sint32, Uint16, Uint32, Uint8 } from "./types.ts";
import { PlatformDataView, PlatformPointer } from "./_types.ts";

(<Array<[BoxValueFactory<number>, keyof PlatformDataView, number]>> [
  [int, "setI32", -42],
  [Sint32, "setI32", -42],
  [Uint8, "setU8", 42],
  [Uint16, "setU16", 256],
  [Uint32, "setU32", 32768],
]).forEach((testData) => {
  Deno.test(`${testData[0].name} can be boxed`, () => {
    const box = new Box(testData[0]);
    const setter = box._view[testData[1]] as (
      arg1: number,
      arg2: number,
    ) => void;
    setter.apply(box._view, [0, testData[2]]);

    const result = box.value;
    assertEquals(result, testData[2]);
    assertEquals(typeof result, "number");
  });
});

(<Array<[BoxValueFactory<number>, keyof PlatformDataView, number]>> [
  [float, "setF32", 12.34],
  [double, "setF64", 12.34],
]).forEach((testData) => {
  Deno.test(`${testData[0].name} can be boxed`, () => {
    const box = new Box(testData[0]);
    const setter = box._view[testData[1]] as (
      arg1: number,
      arg2: number,
    ) => void;
    setter.apply(box._view, [0, testData[2]]);

    const result = box.value;
    assertEquals(Math.round(result), Math.round(testData[2]));
    assertEquals(typeof result, "number");
  });
});

Deno.test(`Pointer can be boxed`, () => {
  const pointerValue = Pointer(
    Deno.UnsafePointer.create(12345n) as unknown as PlatformPointer<unknown>,
  );

  const box = new Box<Pointer<number>>(Pointer);
  box._view.setPointer(0, pointerValue);

  const value = box.value;
  assertEquals(value, pointerValue);
});
