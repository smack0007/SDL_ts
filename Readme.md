# sdl-ts

[SDL](https://www.libsdl.org/) bindings for [TypeScript](https://www.typescriptlang.org/).

Currently working via [deno](https://deno.land/) on Windows using [FFI](https://deno.land/manual/runtime/ffi_api)
(Foreign Function Interface).

## Goals

- Resembling the C API as much as possible. If someone reads a SDL tutorial (for example
  [LazyFoo](https://lazyfoo.net/tutorials/SDL/)) then they should be able to easily translate the tutorial to the
  equivalent in this library.

## Non Goals

- Creating a higher level API or Game Framework. This library's only purpose is to expose the SDL API to deno.

## Getting Started

### Creating a Project

To aid in creating a new project which uses `sdl-ts` there is an `init.ts` script to aid in getting your project set up:

```bash
deno run --allow-read --allow-write --allow-net --import-map https://raw.githubusercontent.com/smack0007/sdl-ts/main/imports.deno.json https://raw.githubusercontent.com/smack0007/sdl-ts/main/init.ts /path/to/project
```

## Credits

Deno images taken from https://deno.land/artwork.

Thanks to:

- [Samip Poudel](https://github.com/SamipPoudel58) for the Jurassic deno image.
