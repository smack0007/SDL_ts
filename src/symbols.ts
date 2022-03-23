// This file is auto generated.
export interface Symbols extends Deno.ForeignLibraryInterface {
	SDL_CreateWindow: Deno.ForeignFunction;
	SDL_Delay: Deno.ForeignFunction;
	SDL_DestroyWindow: Deno.ForeignFunction;
	SDL_Init: Deno.ForeignFunction;
	SDL_PollEvent: Deno.ForeignFunction;
	SDL_Quit: Deno.ForeignFunction;
}

export const symbols: Symbols = {
	SDL_CreateWindow: {
		parameters: ["pointer", "i32", "i32", "i32", "i32", "u32"],
		result: "pointer"
	},
	SDL_Delay: {
		parameters: ["u32"],
		result: "void"
	},
	SDL_DestroyWindow: {
		parameters: ["pointer"],
		result: "void"
	},
	SDL_Init: {
		parameters: ["u32"],
		result: "i32"
	},
	SDL_PollEvent: {
		parameters: ["pointer"],
		result: "u32"
	},
	SDL_Quit: {
		parameters: [],
		result: "void"
	},
};
