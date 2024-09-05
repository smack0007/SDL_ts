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

- Creating a higher level API or Game Framework. This library's only purpose is to expose the SDL API to TypeScript.

## Versioning

This library's version number will match the SDL major and minor version against which it is currently tested. The patch
number will be specifici to this library. I.E.

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

Located in the directory [examples/getting-started](examples/getting-started/) are a minimal set of files needed to get
a project up and running. Copy these files onto your computer and start the project with `deno task start`. You should
see a window with `SDL_ts` as the title.

### Loading shared libraries

Unless `libraryPath` is specified in the `Init` functions, `SDL_ts` will attempt to "find" the SDL shared libraries by
determining the prefix and file extension appropriate for the operating system and looking in a set of different places
also based on the operating system. The places where the shared libraries are searched for can be influenced by the
environment variable [`SDL_TS_LIBRARY_PATH`](#sdl-ts-library-path).

#### libraryPath

The `Init` functions (i.e. `SDL_Init`) have in their `options` object a `libraryPath` property. This property should be
a path to the shared library and `SDL_ts` will make no attempt to guess where the library should be loaded from. This
means it's up to the caller of the `Init` function to account for changes in the name of the library between the
different platforms. For example the shared library on Linux is called `libSDL2.so` and Windows it is called `SDL2.dll`.
There is a `lib` prefix on Linux and on Windows the file extension is `.dll` instead of `.so`.

#### SDL_TS_LIBRARY_PATH

The environmnet variable `SDL_TS_LIBRARY_PATH` can be used to instruct SDL_ts where the SDL shared libraries should be
loaded from. See [deno.json](deno.json). All example projects will load the SDL shared libraries from the `.lib`
directory if it exists.

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
