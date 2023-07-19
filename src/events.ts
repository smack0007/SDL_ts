import * as SDL from "../mod.SDL.ts";

export class Events {
  /**
   * Get a lazy stream of events using SDL_WaitEvent.
   * @returns a lazy stream of events using SDL_WaitEvent
   * @example
   * ```ts
   * for await (const event of Events.asyncIterator()) {
   *   console.log(event.type)
   * }
   * ```
   */
  public static asyncIterator(): AsyncIterator<SDL.Event, never, SDL.Event | undefined> {
    let _event = new SDL.Event();
    return {
      next(event): Promise<IteratorResult<SDL.Event, never>> {
        if (event) {
          _event = event;
        }
        return new Promise<IteratorResult<SDL.Event, never>>((resolve, reject) => {
          const res = SDL.WaitEvent(_event);
          if (res == 0) {
            reject(SDL.GetError());
          } else {
            resolve({
              done: false,
              value: _event,
            });
          }
        });
      },
    };
  }
}
