@echo off
pushd %~dp0src
deno compile --unstable --allow-ffi --output ..\bin\hello.exe .\main.ts
popd