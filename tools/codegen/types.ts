export type CodeGenTypedefs = Record<string, string>;

export type CodeGenCallbacks = Record<string, CodeGenCallback>;

export interface CodeGenCallback {
  // If set the callback is not yet supported and shouldn't be output.
  todo?: string;

  parameters: Record<string, CodeGenFunctionParam>;

  result: CodeGenFunctionResult;
}

export type CodeGenEnums = Record<string, CodeGenEnum>;

export interface CodeGenEnum {
  // Use to specify a name to use as the prefix to strip if it's not the same
  // as the enum name to uppercase.
  prefixToStrip?: string;

  values: Record<string, string>;
}

export type CodeGenEvents = Record<string, CodeGenEventType>;

export interface CodeGenEventType extends CodeGenStruct {
  // The name the struct has in the event union in cases
  // where the name can simply not be infered (i.e. KeyboardEvent).
  unionName?: string;
}

export type CodeGenFunctions = Record<string, CodeGenFunction>;

export interface CodeGenFunctionParam {
  // SDL type.
  type: string;

  // Can the parameter be null.
  isNullable?: boolean;

  // If set this type will be used as the script type.
  overrideType?: string;

  isOutput?: boolean;
}

export interface CodeGenFunctionResult {
  // SDL type
  type: string;

  // Can the result be null.
  nullable?: boolean;

  // If set this type will be used as the script type.
  overrideType?: string;

  // If any parameter is marked as an output parameter than the return value
  // will generally be discarded. This flag specifies that the return value
  // should not be discarded when there are output parameters.
  isOutput?: boolean;
}

export interface CodeGenFunction {
  // If set the function is not yet supported and shouldn't be output.
  todo?: string;

  // Some functions are (i.e. SDL_BlitSurface) are just
  // macros that proxy to another name.
  symbolName?: string;

  parameters: Record<string, CodeGenFunctionParam>;

  result: CodeGenFunctionResult;

  overloads?: ReadonlyArray<{
    parameters?: Record<string, Partial<CodeGenFunctionParam>>;
    result?: Partial<CodeGenFunctionResult>;
  }>;

  // If true the CodeGen will generate code to check for an error
  // and throw an exception if needed. This can probably be determined
  // from the return type in the future but while developing the feature
  // just set this manually.
  checkForError?: boolean;

  // If set the function is implemented by hand only the symbol definition will be generated.
  implementation?: string;
}

export type CodeGenStructs = Record<string, CodeGenStruct>;

export type CodeGenOpaqueStructs = string[];

export interface CodeGenStruct {
  // Indicates whether the struct can be allocated in
  // in script. If false it will only be allocated by SDL.
  allocatable?: boolean;

  // Indicates whether the struct can be written to in
  // in script. If false it will only be written to by SDL.
  mutable?: boolean;

  // Size of the struct in bytes.
  size: number;

  // Struct members.
  members: Record<string, CodeGenStructMember>;

  // Used when including structs from different libraries.
  doNotImport?: boolean;
}

export interface CodeGenStructMember {
  // If true the member is internal to SDL and shouldn't be output.
  internal?: boolean;

  // If set the member is not yet supported and shouldn't be output.
  todo?: string;

  // SDL type.
  type: string;

  // A type override to use.
  overrideType?: string;

  // Offset of the member in bytes.
  offset: number;
}
