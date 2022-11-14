export type CodeGenEnums = Record<string, CodeGenEnum>;

export interface CodeGenEnum {
  // If true the enum values should not be grouped together into an enum.
  doNotGroup?: boolean;

  // Use to specify a name to use as the group instead of guessing.
  overrideGroupName?: string;

  values: Record<string, string>;
}

export type CodeGenEvents = Record<string, CodeGenEventType>;

export interface CodeGenEventType extends CodeGenStruct {
  // The name struct has in the event union in cases
  // where the name can simply not be infered (i.e. KeyboardEvent).
  unionName?: string;
}

export type CodeGenFunctions = Record<string, CodeGenFunction>;

export type CodeGenFunctionImplementations = Record<string, string>;

export interface CodeGenFunction {
  // Some functions are (i.e. SDL_BlitSurface) are just
  // macros that proxy to another name.
  symbolName?: string;

  parameters: Record<string, CodeGenFunctionParam>;

  result: {
    // SDL type
    type: string;

    // If set this type will be used as the script type.
    overrideType?: string;
  };
}

export interface CodeGenFunctionParam {
  // SDL type.
  type: string;

  // Can the parameter be null.
  nullable?: boolean;

  // If set this type will be used as the script type.
  overrideType?: string;
}

export type CodeGenStructs = Record<string, CodeGenStruct>;

export type CodeGenOpaqueStructs = string[];

export interface CodeGenStruct {
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

  // Used when including structs from different libraries.
  doNotImport?: boolean;
}

export interface CodeGenStructMember {
  // SDL type.
  type: string;

  // Offset of the member in bytes.
  offset: number;
}
