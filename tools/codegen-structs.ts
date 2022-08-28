import { NativeType } from "./codegen-types.ts";

export interface CodeGenStructMember {
  // SDL type.
  nativeType: string;

  // FFI type.
  type: NativeType;

  // Offset of the member in bytes.
  offset: number;
}

export interface CodeGenStructType {
  // Indicates whether the struct can be allocated in
  // in script. If false it will only be allocated by SDL.
  allocatable?: boolean;

  // Indicates whether the struct can be written to in
  // in script. If false it will only be written to by SDL.
  writable?: boolean;

  // Size of the struct in bytes.
  size: number;

  // Struct members.
  members: Record<string, CodeGenStructMember>;
}

export const opaqueStructs: string[] = [
  // TODO: Figure out how to implement SDL_RWops in deno.
  "SDL_BlitMap",
  "SDL_PixelFormat", // TODO: Implement PixelFormat struct.
  "SDL_Renderer",
  "SDL_RWops",
  "SDL_Texture",
  "SDL_Window",
];

export const structs: Record<string, CodeGenStructType> = {
  SDL_Keysym: {
    size: 16,
    members: {
      scancode: {
        nativeType: "SDL_Scancode",
        type: "u32",
        offset: 0,
      },
      sym: {
        nativeType: "SDL_Keycode",
        type: "u32",
        offset: 4,
      },
      mod: {
        nativeType: "Uint16",
        type: "u16",
        offset: 8,
      },
      unused: {
        nativeType: "Uint32",
        type: "u32",
        offset: 12,
      },
    },
  },

  SDL_Point: {
    allocatable: true,
    writable: true,
    size: 8,
    members: {
      x: {
        nativeType: "int",
        type: "i32",
        offset: 0,
      },
      y: {
        nativeType: "int",
        type: "i32",
        offset: 4,
      },
    },
  },

  SDL_Rect: {
    allocatable: true,
    writable: true,
    size: 16,
    members: {
      x: {
        nativeType: "int",
        type: "i32",
        offset: 0,
      },
      y: {
        nativeType: "int",
        type: "i32",
        offset: 4,
      },
      w: {
        nativeType: "int",
        type: "i32",
        offset: 8,
      },
      h: {
        nativeType: "int",
        type: "i32",
        offset: 12,
      },
    },
  },

  SDL_RendererInfo: {
    allocatable: true,
    writable: false,
    size: 88,
    members: {
      name: {
        nativeType: "char*",
        type: "pointer",
        offset: 0,
      },
      flags: {
        nativeType: "Uint32",
        type: "u32",
        offset: 8,
      },
      num_texture_formats: {
        nativeType: "Uint32",
        type: "u32",
        offset: 12,
      },
      // TODO: Add support for arrays in structs.
      // texture_formats: {
      //   nativeType: "Uint32",
      //   type: "u32",
      //   offset: 16,
      // },
      max_texture_width: {
        nativeType: "int",
        type: "i32",
        offset: 80,
      },
      max_texture_height: {
        nativeType: "int",
        type: "i32",
        offset: 84,
      },
    },
  },

  SDL_Surface: {
    size: 96,
    members: {
      flags: {
        nativeType: "Uint32",
        type: "u32",
        offset: 0,
      },
      format: {
        nativeType: "SDL_PixelFormat*",
        type: "pointer",
        offset: 8,
      },
      w: {
        nativeType: "int",
        type: "i32",
        offset: 16,
      },
      h: {
        nativeType: "int",
        type: "i32",
        offset: 20,
      },
      pitch: {
        nativeType: "int",
        type: "i32",
        offset: 24,
      },
      pixels: {
        nativeType: "void*",
        type: "pointer",
        offset: 32,
      },
      userdata: {
        nativeType: "void*",
        type: "pointer",
        offset: 40,
      },
      locked: {
        nativeType: "int",
        type: "i32",
        offset: 48,
      },
      list_blitmap: {
        nativeType: "void*",
        type: "pointer",
        offset: 56,
      },
      clip_rect: {
        nativeType: "SDL_Rect",
        type: "struct",
        offset: 64,
      },
      map: {
        nativeType: "SDL_BlitMap*",
        type: "pointer",
        offset: 80,
      },
      refcount: {
        nativeType: "int",
        type: "i32",
        offset: 88,
      },
    },
  },
} as const;
