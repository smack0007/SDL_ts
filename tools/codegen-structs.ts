export type CodeGenStructMember = {
  // SDL type.
  nativeType: string;

  // FFI type.
  type: Deno.NativeType | "struct";

  // Offset of the member in bytes.
  offset: number;
};

export type CodeGenStructType = {
  // Indicates whether the struct can be allocated in
  // deno. If false it will only be allocated by SDL.
  allocatable?: boolean;

  // Size of the struct in bytes.
  size: number;

  // Struct members.
  members: Record<string, CodeGenStructMember>;
};

export const opaqueStructs: string[] = [
  // TODO: Figure out how to implement SDL_RWops in deno.
  "SDL_RWops",
  "SDL_Window",
];

export const structs: Record<string, CodeGenStructType> = {
  SDL_Point: {
    allocatable: true,
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
