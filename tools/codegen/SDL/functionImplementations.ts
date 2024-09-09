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
