# Building SDL

> These are my personal notes and in no way represent the offical documentation for building SDL.

See https://wiki.libsdl.org/SDL2/Installation#linuxunix

## Git clone

```
git@github.com:libsdl-org/SDL.git
git switch --detach release-2.26.2
```

## Fedora

```
sudo dnf install gcc libXext-devel
```

## Building

```
mkdir build
cd build
../configure
make
sudo make install
```

Assemblies are then installed to `/usr/local/lib`