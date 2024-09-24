import { join } from "@std/path";
import { SRC_PATH } from "../../shared/constants.ts";
import {
  writeCallbacks,
  writeCallbacksSymbols,
  writeEnums,
  writeEvents,
  writeFunctions,
  writeStructs,
  writeSymbols,
} from "./generators.ts";
import { callbacks } from "./SDL/callbacks.ts";
import { enums } from "./SDL/enums.ts";
import { events } from "./SDL/events.ts";
import { functions } from "./SDL/functions.ts";
import { opaqueStructs, structs } from "./SDL/structs.ts";
import { typedefs } from "./SDL/typedefs.ts";
import { CodeGenContext } from "./types.ts";

const SDL_SRC_PATH = join(SRC_PATH, "SDL");

export async function codegenSDL(): Promise<void> {
  const context: CodeGenContext = {
    libraryName: "SDL2",
    events,
    functions,
    callbacks,
    enums,
    structs,
    opaqueStructs,
    typedefs,
  };

  await writeEnums(context, `${SDL_SRC_PATH}/enums.ts`, []);
  await writeEvents(
    `${SDL_SRC_PATH}/events.ts`,
    context,
  );
  await writeStructs(
    context,
    `${SDL_SRC_PATH}/structs.ts`,
    [
      `import { AudioFormat } from "./audio.ts"`,
    ],
  );
  await writeSymbols(
    context,
    `${SDL_SRC_PATH}/_symbols.ts`,
  );
  await writeCallbacksSymbols(
    context,
    `${SDL_SRC_PATH}/_callbacks.ts`,
    [],
  );
  await writeCallbacks(
    context,
    `${SDL_SRC_PATH}/callbacks.ts`,
    [],
  );
  await writeFunctions(
    context,
    `${SDL_SRC_PATH}/functions.ts`,
    [
      `import { AudioDeviceID } from "./audio.ts"`,
      `import { Event } from "./events.ts";`,
      `import { RWMode } from "./rw.ts";`,
    ],
  );
}
