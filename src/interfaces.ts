// This file is auto generated.
export type SDL_CreateWindowFunc = (title: string, x: number, y: number, width: number, height: number, flags: number) => Deno.UnsafePointer;

export type SDL_DelayFunc = (time: number) => void;

export type SDL_DestroyWindowFunc = (window: Deno.UnsafePointer) => void;

export type SDL_InitFunc = (flags: number) => number;

export type SDL_PollEventFunc = (event: Deno.UnsafePointer) => number;

export type SDL_QuitFunc = () => void;
