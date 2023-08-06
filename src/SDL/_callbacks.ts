import Platform from "../_platform.ts";
import { PlatformPointer } from "../_types.ts";
import { EventFilter } from "./callbacks.ts";
import { Event } from "./events.ts";

export const callbacks = {
  SDL_EventFilter: {
    parameters: [
      "pointer",
      "pointer",
    ],
    result: "i32",
    wrap: (callback: EventFilter) => {
      return (userdata: PlatformPointer<unknown>, event: PlatformPointer<Event>) => {
        const view = new Deno.UnsafePointerView(event as any);
        const type = view.getUint32(0);
        return callback(
          Platform.fromPlatformPointer(userdata),
          Platform.fromPlatformStruct<Event>(event, Event) as Event,
        );
      };
    },
  },
} as const;
