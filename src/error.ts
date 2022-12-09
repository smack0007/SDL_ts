export class SDLError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause });
  }
}
