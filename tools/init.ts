import { REPO_URL } from "../shared/constants.ts";
import { downloadFile } from "../shared/http.ts";
import { ensureDir } from "std/fs/mod.ts";
import { join } from "std/path/mod.ts";

type ProjectFileData = {
  readonly destination: readonly string[];
  readonly overwrite: boolean;
};

const PROJECT_FILES: Record<string, ProjectFileData> = {
  "/ext/SDL/windows/x64/SDL2.dll": {
    destination: ["windows", "x64", "SDL2.dll"],
    overwrite: true,
  },

  "/ext/SDL/README-SDL_image.txt": {
    destination: ["README-SDL_image.txt"],
    overwrite: true,
  },

  "/ext/SDL/README-SDL.txt": {
    destination: ["README-SDL.txt"],
    overwrite: true,
  },

  "/tools/init/deno.json": {
    destination: ["deno.json"],
    overwrite: false,
  },

  "/tools/init/imports.deno.json": {
    destination: ["imports.deno.json"],
    overwrite: false,
  },

  "/tools/init/main.ts": {
    destination: ["main.ts"],
    overwrite: false,
  },
} as const;

export async function main(args: string[]): Promise<number> {
  const destination = args[0] ?? Deno.cwd();

  for (const [fileURL, fileData] of Object.entries(PROJECT_FILES)) {
    if (fileData.destination.length > 1) {
      await ensureDir(
        join(destination, ...fileData.destination.slice(0, fileData.destination.length - 1)),
      );
    }

    const fileDestination = join(destination, ...fileData.destination);
    await downloadFile(REPO_URL + fileURL, fileDestination, fileData.overwrite);
  }

  return 0;
}
