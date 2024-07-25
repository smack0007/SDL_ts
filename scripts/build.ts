import { EXAMPLES_PATH, TOOLS_PATH } from "../shared/constants.ts";
import { green } from "@std/colors";
import { join } from "@std/path";

async function main(): Promise<number> {
  let failure = false;

  if (!(await typeCheck(join(TOOLS_PATH, "codegen.ts")))) {
    failure = true;
  }

  if (!(await typeCheck(join(TOOLS_PATH, "codegen-scraper.ts")))) {
    failure = true;
  }

  for await (const entry of Deno.readDir(EXAMPLES_PATH)) {
    if (entry.isDirectory) {
      if (!(await typeCheck(join(EXAMPLES_PATH, entry.name, "main.ts")))) {
        failure = true;
      }
    }
  }

  if (!(await runTests())) {
    failure = true;
  }

  return failure ? 1 : 0;
}

async function typeCheck(filePath: string): Promise<boolean> {
  console.info(`${green("Type checking:")} ${filePath}`);
  return (
    (
      await Deno.run({
        cmd: ["deno", "task", "-q", "check", filePath],
      }).status()
    ).code === 0
  );
}

async function runTests(): Promise<boolean> {
  console.info(`${green("Running tests...")}`);
  return (
    (
      await Deno.run({
        cmd: ["deno", "task", "-q", "test"],
      }).status()
    ).code === 0
  );
}

Deno.exit(await main());
