const SDL_INIT_VIDEO = 0x00000020;
const SDL_QUIT = 0x100;
const SDL_WINDOW_SHOWN = 0x00000004;
const SDL_WINDOW_RESIZABLE = 0x00000020;
const SDL_WINDOWPOS_UNDEFINED = 0x1fff0000;

function encode(v: string): Uint8Array {
  return new TextEncoder().encode(v + "\0");
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v);
}

const sdl2Library = Deno.dlopen("../ext/SDL/SDL2.dll", {
  SDL_CreateWindow: {
    parameters: ["pointer", "i32", "i32", "i32", "i32", "u32"],
    result: "u32",
  },
  SDL_Delay: { parameters: ["u32"], result: "void" },
  SDL_DestroyWindow: { parameters: ["u32"], result: "void" },
  SDL_Init: { parameters: ["u32"], result: "i32" },
  SDL_PollEvent: { parameters: ["pointer"], result: "u32" },
  SDL_Quit: { parameters: [], result: "void" },
});

const sdl2 = sdl2Library.symbols;

if ((sdl2.SDL_Init(SDL_INIT_VIDEO) as number) < 0) {
  console.error("Initialization failed.");
  Deno.exit(1);
}

console.info("SDL Initialized.");

const windowHandle = sdl2.SDL_CreateWindow(
  encode("Hello World!"),
  SDL_WINDOWPOS_UNDEFINED,
  SDL_WINDOWPOS_UNDEFINED,
  1024,
  768,
  SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE
);

if (windowHandle === 0) {
  console.error("Failed to create window.");
  Deno.exit(1);
}

const event = new Uint8Array(64);
const eventDataView = new DataView(event.buffer);

let done = false;
while (!done) {
  while (sdl2.SDL_PollEvent(Deno.UnsafePointer.of(event)) != 0) {
    const eventType = eventDataView.getUint32(0, true);
    console.info(eventType);
    if (eventType === SDL_QUIT) {
      done = true;
    }
  }
}

sdl2.SDL_DestroyWindow(windowHandle);
sdl2.SDL_Quit();
