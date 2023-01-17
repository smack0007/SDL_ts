import { EXAMPLES_PATH, ROOT_PATH, TOOLS_PATH } from "../shared/constants.ts";
import { colors, path } from "../deps.ts";

async function main(): Promise<number> {
  let failure = false;

  if (!await typeCheck(path.join(ROOT_PATH, "init.ts"))) {
    failure = true;
  }

  if (!await typeCheck(path.join(TOOLS_PATH, "codegen.ts"))) {
    failure = true;
  }

  if (!await typeCheck(path.join(TOOLS_PATH, "codegen-scraper.ts"))) {
    failure = true;
  }

  for await (const entry of Deno.readDir(EXAMPLES_PATH)) {
    if (entry.isDirectory) {
      if (!await typeCheck(path.join(EXAMPLES_PATH, entry.name, "main.ts"))) {
        failure = true;
      }
    }
  }

  return failure ? 1 : 0;
}

async function typeCheck(filePath: string): Promise<boolean> {
  console.info(`${colors.green("Type checking:")} ${filePath}`);
  return (await Deno.run({
    cmd: ["deno", "task", "-q", "check", filePath],
  }).status()).code === 0;
}

Deno.exit(await main());
