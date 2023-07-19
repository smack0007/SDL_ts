import { Event } from "./SDL/events.ts";
import { GetError, WaitEvent } from "./SDL/functions.ts";
export class Events {
  /**
   * Get a lazy stream of @see SDL.Event using SDL_WaitEvent.
   * @returns A lazy stream of @see SDL.Event
   * @example
   * ```ts
   * for await (const event of Events.asyncIterator()) {
   *   console.log(event.type);
   * }
   * ```
   */
  public static asyncIterator(_event?: Event): AsyncIterable<Event> {
    const event = _event ?? new Event();
    return {
      [Symbol.asyncIterator](): AsyncIterator<Event> {
        return {
          next(): Promise<IteratorResult<Event, never>> {
            return new Promise<IteratorResult<Event, never>>((resolve, reject) => {
              const result = WaitEvent(event);
              if (result === 0) {
                reject(GetError());
              } else {
                resolve({
                  done: false,
                  value: event,
                });
              }
            });
          }
        };
      },
    };
  }
}
