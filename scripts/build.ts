import { ROOT_DIRECTORY } from "./config.ts";
import { path } from "./deps.ts";

for await (const entry of Deno.readDir(path.join(ROOT_DIRECTORY, "examples"))) {
  if (entry.isDirectory) {
    const mainFilePath = path.join(ROOT_DIRECTORY, "examples", entry.name, "main.ts");
    console.info(`Type checking: ${mainFilePath}`);

    await Deno.run({
      cmd: ["deno", "task", "-q", "check", mainFilePath],
    }).status();
  }
}
