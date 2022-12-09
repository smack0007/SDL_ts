export async function downloadFile(
  fromUrl: string | URL,
  toPath: string | URL,
): Promise<void> {
  const response = await fetch(fromUrl);
  const file = await Deno.open(toPath, { create: true, write: true });

  await response.body?.pipeTo(file.writable);
}
