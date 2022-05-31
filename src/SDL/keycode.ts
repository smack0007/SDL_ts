export const SDLK_SCANCODE_MASK = (1 << 30);

export function SCANCODE_TO_KEYCODE(X: number): number {
  return (X | SDLK_SCANCODE_MASK);
}
