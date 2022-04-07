# deno-sdl2-ffi

[SDL2](https://www.libsdl.org/) bindings for Deno via FFI (Foreign Function Interface).

## Goals

* Resembling the C API as much as possible. If someone reads a SDL tutorial (for example 
[LazyFoo](https://lazyfoo.net/tutorials/SDL/)) then they should be able to easily
translate the tutorial to the equivalent in this library.


## Non Goals

* Creating a higher level API or Game Framework. This library's only purpose is
to expose the SDL API to deno.
