# SDL_ts

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

To aid in creating a new project which uses `SDL_ts` there is an `init.ts` script to aid in getting your project set up:

```bash
deno run --allow-net --allow-read=/path/to/project --allow-write=/path/to/project --import-map https://deno.land/x/sdl_ts@0.0.3/imports.deno.json https://deno.land/x/sdl_ts@0.0.3/init.ts /path/to/project
```

Replace `/path/to/project` with the desired project path. After that the new project can be started via a deno task:

```bash
deno task start
```

You should be presented with a window titled "SDL_ts".

## Credits

Deno images taken from https://deno.land/artwork.

Thanks to:

- [Samip Poudel](https://github.com/SamipPoudel58) for the Jurassic deno image.
