export class Surface {
  public _pointerView: Deno.UnsafePointerView;

  constructor(pointer: Deno.UnsafePointer) {
    this._pointerView = new Deno.UnsafePointerView(pointer);
  }

  public get flags(): number {
    return this._pointerView.getUint32(0);
  }

  public get format(): Deno.UnsafePointer {
    // TODO: Don't understand why this is 8 and not 4?
    return new Deno.UnsafePointer(this._pointerView.getBigUint64(8));
  }

  public get w(): number {
    return this._pointerView.getInt32(16);
  }

  public get h(): number {
    return this._pointerView.getInt32(20);
  }
  //  Uint32 flags;               /**< Read-only */
  //  SDL_PixelFormat *format;    /**< Read-only */
  //  int w, h;                   /**< Read-only */
  //  int pitch;                  /**< Read-only */
  //  void *pixels;               /**< Read-write */

  //  /** Application data associated with the surface */
  //  void *userdata;             /**< Read-write */

  //  /** information needed for surfaces requiring locks */
  //  int locked;                 /**< Read-only */

  //  /** list of BlitMap that hold a reference to this surface */
  //  void *list_blitmap;         /**< Private */

  //  /** clipping information */
  //  SDL_Rect clip_rect;         /**< Read-only */

  //  /** info for fast blit mapping to other surfaces */
  //  struct SDL_BlitMap *map;    /**< Private */

  //  /** Reference count -- used when freeing surface */
  //  int refcount;               /**< Read-mostly */
}

export type Window = Deno.UnsafePointer;
