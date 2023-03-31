import { BoxArray, Int, int, Pointer, SDL, TTF } from "SDL_ts";

const FONT_TEXTURE_SIZE = 256;

type GlyphData = {
  character: string;
  surface: SDL.Surface;
  width: number;
  height: number;
};

export type FontAtlas = {
  texture: SDL.Texture;
  glyphs: Record<string, SDL.Rect>;
};

export function createFontAtlas(
  renderer: Pointer<SDL.Renderer>,
  fontPath: string,
  fontSize: number,
): FontAtlas {
  const white = new SDL.Color(255, 255, 255, 255);

  const font = TTF.OpenFont(fontPath, fontSize);

  if (font === null) {
    throw new Error(`Failed to open font in ${createFontAtlas.name}: ${SDL.GetError()}`);
  }

  const surface = SDL.CreateRGBSurface(0, FONT_TEXTURE_SIZE, FONT_TEXTURE_SIZE, 32, 0, 0, 0, 0xff);

  if (surface === null) {
    throw new Error(`Failed to create font surface in ${createFontAtlas.name}: ${SDL.GetError()}`);
  }

  SDL.SetColorKey(surface, SDL.TRUE, SDL.MapRGBA(surface.format, 0, 0, 0, 0));

  const glyphs: GlyphData[] = [];
  let maxGlyphHeight = 0;

  for (let i = " ".charCodeAt(0); i <= "z".charCodeAt(0); i += 1) {
    const character = String.fromCharCode(i);

    const glyphSurface = TTF.RenderUTF8_Blended(font, character, white);

    if (glyphSurface === null) {
      throw new Error(`Failed to create glyph surface in ${createFontAtlas.name}: ${SDL.GetError()}`);
    }

    // TODO(idea): Can we allow structs to return pointers to their members?
    const glyphSizeBox = new BoxArray<int>(Int, 2);
    TTF.SizeUTF8(font, character, glyphSizeBox.pointers.at(0), glyphSizeBox.pointers.at(1));

    const glyphWidth = glyphSizeBox.at(0);
    const glyphHeight = glyphSizeBox.at(1);

    glyphs.push({
      character,
      surface: glyphSurface,
      width: glyphWidth,
      height: glyphHeight,
    });

    if (glyphHeight > maxGlyphHeight) {
      maxGlyphHeight = glyphHeight;
    }
  }

  const destination = new SDL.Rect(0, 0, 0, 0);
  const glyphDestinations: Record<string, SDL.Rect> = {};

  for (const glyph of glyphs) {
    destination.w = glyph.width;
    destination.h = glyph.height;

    if (destination.x + destination.w >= FONT_TEXTURE_SIZE) {
      destination.x = 0;

      destination.y += maxGlyphHeight + 1;

      if (destination.y + destination.h >= FONT_TEXTURE_SIZE) {
        throw new Error(`Ran out of glyph space in font atlas in ${createFontAtlas.name}`);
      }
    }

    SDL.BlitSurface(glyph.surface, null, surface, destination);

    SDL.FreeSurface(glyph.surface);

    // TODO(idea): dest.clone()
    glyphDestinations[glyph.character] = new SDL.Rect(destination);

    destination.x += destination.w;
  }

  const texture = SDL.CreateTextureFromSurface(renderer, surface);

  if (texture === null) {
    throw new Error(`Failed to create font texture in ${createFontAtlas.name}: ${SDL.GetError()}`);
  }

  SDL.FreeSurface(surface);
  TTF.CloseFont(font);

  return {
    texture,
    glyphs: glyphDestinations,
  };
}
