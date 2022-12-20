import { EXAMPLES_PATH, ROOT_PATH } from "../shared/constants.ts";
import { green } from "std/fmt/colors.ts";
import { join } from "std/path/mod.ts";

async function main(): Promise<number> {
  let failure = false;

  if (!await typeCheck(join(ROOT_PATH, "init.ts"))) {
    failure = true;
  }

  for await (const entry of Deno.readDir(EXAMPLES_PATH)) {
    if (entry.isDirectory) {
      if (!await typeCheck(join(EXAMPLES_PATH, entry.name, "main.ts"))) {
        failure = true;
      }
    }
  }

  return failure ? 1 : 0;
}

async function typeCheck(filePath: string): Promise<boolean> {
  console.info(`${green("Type checking:")} ${filePath}`);
  return (await Deno.run({
    cmd: ["deno", "task", "-q", "check", filePath],
  }).status()).code === 0;
}

Deno.exit(await main());
