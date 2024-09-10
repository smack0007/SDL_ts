export const GET_KEYBOARD_STATE = `export function GetKeyboardState(): Uint8Array {
  const numkeys = new Box<int>(Int);
  const _result = Platform.fromPlatformPointer(
    _library.symbols.SDL_GetKeyboardState(
      Platform.toPlatformPointer(Pointer.of(numkeys))
    ) as PlatformPointer<u8>
  )!;
  const dataView = new Platform.DataView(_result);
  return new Uint8Array(dataView.getArrayBuffer(numkeys.value, 0));
}`;

export const LOADWAV_RW = `export function LoadWAV_RW(
  src: PointerLike<RWops>,
  freesrc: i32,
  spec: PointerLike<AudioSpec>,
): [AudioSpec, Uint8Array] {
  const audio_buf = new Box<Pointer<u8>>(Pointer);
  const audio_len = new Box<u32>(U32);
  const _result = AudioSpec.of(Platform.fromPlatformPointer(_library.symbols.SDL_LoadWAV_RW(
    Platform.toPlatformPointer(Pointer.of(src)),
    freesrc,
    Platform.toPlatformPointer(Pointer.of(spec)),
    Platform.toPlatformPointer(Pointer.of(audio_buf)),
    Platform.toPlatformPointer(Pointer.of(audio_len)),
  ) as PlatformPointer<AudioSpec>));
  if (_result === null) {
    throw new SDLError(GetError());
  }
  const dataView = new Platform.DataView(audio_buf.value);
  return [_result, new Uint8Array(dataView.getArrayBuffer(audio_len.value, 0))];
}`;