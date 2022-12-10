import { REPO_URL } from "@shared/constants.ts";
import * as fs from "@shared/fs.ts";
import * as http from "@shared/http.ts";
import * as path from "@shared/path.ts";

export async function main(args: string[]): Promise<number> {
  const destination = args[0] ?? Deno.cwd();

  fs.ensureDirectory(path.join(destination));
  fs.ensureDirectory(path.join(destination, "windows", "x64"));

  await http.downloadFile(
    REPO_URL + "/tools/init/deno.json?raw=true",
    path.join(destination, "deno.json"),
  );

  await http.downloadFile(
    REPO_URL + "/tools/init/imports.deno.json?raw=true",
    path.join(destination, "imports.deno.json"),
  );

  await http.downloadFile(
    REPO_URL + "/tools/init/main.ts?raw=true",
    path.join(destination, "main.ts"),
  );

  await http.downloadFile(
    REPO_URL + "/ext/SDL/windows/x64/SDL2.dll?raw=true",
    path.join(destination, "windows", "x64", "SDL2.dll"),
  );

  return 0;
}
