@echo off
pushd %~dp0src
deno run --unstable --allow-ffi .\main.ts
popd