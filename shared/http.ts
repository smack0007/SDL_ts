export async function downloadFile(
  fromUrl: string | URL,
  toPath: string | URL,
  overwrite = false,
): Promise<void> {
  const response = await fetch(fromUrl);

  const fileOptions: Deno.OpenOptions = overwrite
    ? {
      create: true,
      write: true,
      truncate: true,
    }
    : {
      createNew: true,
      write: true,
    };

  try {
    const file = await Deno.open(toPath, fileOptions);
    await response.body?.pipeTo(file.writable);
  } catch (error) {
    if (!(error instanceof Deno.errors.AlreadyExists && !overwrite)) {
      throw error;
    }
  }
}
