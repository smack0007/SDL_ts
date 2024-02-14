# SDL_ts

[SDL](https://www.libsdl.org/) bindings for [TypeScript](https://www.typescriptlang.org/).

Currently working via [deno](https://deno.land/) on Windows, Linux, and mac OS using
[FFI](https://deno.land/manual/runtime/ffi_api) (Foreign Function Interface).

## Primary Goals

- Resembling the C API as much as possible. If someone reads a SDL tutorial (for example
  [LazyFoo](https://lazyfoo.net/tutorials/SDL/)) then they should be able to easily translate the tutorial to the
  equivalent in this library.

## Secondary Goals

- Provide utiltiy functions which wrap SDL features into idomatic JavaScript (i.e. `Events.asyncIterator`).

## Non Goals

- Creating a higher level API or Game Framework. This library's only purpose is to expose the SDL API to deno.

## Getting Started

### SDL2 Installation

#### Linux

##### Debain

```shell
sudo apt install libsdl2-2.0-0 libsdl2-image-2.0-0 libsdl2-ttf-2.0-0
```

##### Fedora

```shell
sudo dnf install SDL2 SDL2_image SDL2_ttf
```

#### Windows

##### MSYS2

```shell
pacman -S mingw-w64-ucrt-x86_64-SDL2 mingw-w64-ucrt-x86_64-SDL2_image mingw-w64-ucrt-x86_64-SDL2_ttf
```

You'll need to ensure then that the sysroot (in this case ucrt) is in your path. Assuming the default install location
for msys2 then `C:\msys64\ucrt64\bin`.

#### MacOS

##### Homebrew

```shell
brew install sdl2 sdl2_image sdl2_ttf
```

### Creating a Project

To aid in creating a new project which uses `SDL_ts` there is an `init.ts` script to aid in getting your project set up:

```bash
deno run --allow-net --allow-read=/path/to/project --allow-write=/path/to/project --import-map https://deno.land/x/sdl_ts@0.0.4/imports.deno.json https://deno.land/x/sdl_ts@0.0.4/init.ts /path/to/project
```

Replace `/path/to/project` with the desired project path. After that the new project can be started via a deno task:

```bash
deno task start
```

You should be presented with a window titled "SDL_ts".

### Loading only required functions

Per default `SDL.Init` (or `IMG.Init` or `TTF.Init`) will load all known functions from the SDL assemblies. This can be
problematic when attempting to run your script on an older version of the SDL assemblies than the version against which
this library is developed. The Init functions accept an options parameter in which the functions to load can be
specified:

```ts
SDL.Init(SDL.InitFlags.VIDEO, {
  functions: [
    SDL.Init,
    SDL.PollEvent,
    SDL.Quit,
    // And so on
  ],
});
```

## Credits

Deno images taken from https://deno.land/artwork.

Thanks to:

- [Samip Poudel](https://github.com/SamipPoudel58) for the Jurassic deno image.
- [Andy Baird](https://github.com/ajbdev) for initial MacOS Support.
- [Yiheng Wu](https://github.com/jingkaimori) for struct handling and other bug fixes.
