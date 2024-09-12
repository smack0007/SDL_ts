import { BoxArray, int, Pointer, SDL, TTF } from "SDL_ts";

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
  fontSize: number
): FontAtlas {
  const fg = new SDL.Color(255, 255, 255, 255);
  const bg = new SDL.Color(0, 0, 0, 0);

  const font = TTF.OpenFont(fontPath, fontSize);

  if (font === null) {
    throw new Error(
      `Failed to open font in ${createFontAtlas.name}: ${SDL.GetError()}`
    );
  }

  const surface = SDL.CreateRGBSurfaceWithFormat(
    0,
    FONT_TEXTURE_SIZE,
    FONT_TEXTURE_SIZE,
    32,
    SDL.PIXELFORMAT_RGBA8888
  );

  if (surface === null) {
    throw new Error(
      `Failed to create font surface in ${
        createFontAtlas.name
      }: ${SDL.GetError()}`
    );
  }

  SDL.FillRect(
    surface,
    null,
    SDL.MapRGBA(surface.format, bg.r, bg.g, bg.b, bg.a)
  );

  const glyphs: GlyphData[] = [];
  let maxGlyphHeight = 0;

  for (let i = " ".charCodeAt(0); i <= "z".charCodeAt(0); i += 1) {
    const character = String.fromCharCode(i);

    const glyphSurface = TTF.RenderUTF8_Blended(font, character, fg);

    if (glyphSurface === null) {
      throw new Error(
        `Failed to create glyph surface in ${
          createFontAtlas.name
        }: ${SDL.GetError()}`
      );
    }

    // TODO(idea): Can we allow structs to return pointers to their members?
    const glyphSizeBox = new BoxArray<int>(int, 2);
    TTF.SizeUTF8(
      font,
      character,
      glyphSizeBox.pointersAt(0),
      glyphSizeBox.pointersAt(1)
    );

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
        throw new Error(
          `Ran out of glyph space in font atlas in ${createFontAtlas.name}`
        );
      }
    }

    SDL.SetSurfaceBlendMode(glyph.surface, SDL.BlendMode.NONE);
    SDL.BlitSurface(glyph.surface, null, surface, destination);

    SDL.FreeSurface(glyph.surface);

    // TODO(idea): dest.clone()
    glyphDestinations[glyph.character] = new SDL.Rect(destination);

    destination.x += destination.w;
  }

  const texture = SDL.CreateTextureFromSurface(renderer, surface);

  if (texture === null) {
    throw new Error(
      `Failed to create font texture in ${
        createFontAtlas.name
      }: ${SDL.GetError()}`
    );
  }

  SDL.SetTextureBlendMode(texture, SDL.BlendMode.BLEND);
  SDL.SetTextureAlphaMod(texture, 255);

  SDL.FreeSurface(surface);
  TTF.CloseFont(font);

  return {
    texture,
    glyphs: glyphDestinations,
  };
}

export function drawString(
  renderer: Pointer<SDL.Renderer>,
  font: FontAtlas,
  destination: SDL.Point,
  text: string
): void {
  const destRect = new SDL.Rect(destination.x, destination.y, 0, 0);

  SDL.SetRenderDrawBlendMode(renderer, SDL.BlendMode.BLEND);

  for (let i = 0; i < text.length; i += 1) {
    const glyphRect = font.glyphs[text[i]];

    destRect.x = destination.x;
    destRect.y = destination.y;
    destRect.w = glyphRect.w;
    destRect.h = glyphRect.h;

    SDL.RenderCopy(renderer, font.texture, font.glyphs[text[i]], destRect);

    destination.x += glyphRect.w;
  }
}

export function measureString(
  font: FontAtlas,
  text: string
): { width: number; height: number } {
  let width = 0;
  let height = 0;

  let lineWidth = 0;
  let lineHeight = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "\r") {
      continue;
    }

    if (text[i] !== "\n") {
      const glyphRect = font.glyphs[text[i]];

      lineWidth += glyphRect.w;
      if (glyphRect.h > lineHeight) {
        lineHeight = glyphRect.h;
      }
    } else {
      if (lineWidth > width) {
        width = lineWidth;
      }

      if (lineHeight > height) {
        height = lineHeight;
      }

      lineWidth = 0;
      lineHeight = 0;
    }
  }

  if (lineWidth > width) {
    width = lineWidth;
  }

  if (lineHeight > height) {
    height = lineHeight;
  }

  return { width, height };
}
