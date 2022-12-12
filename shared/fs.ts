export async function ensureDirectory(path: string): Promise<void> {
  try {
    await Deno.mkdir(path, { recursive: true });
  } catch {
    // Ignore
  }
}

export async function exists(filename: string): Promise<boolean> {
  try {
    await Deno.stat(filename);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
}
