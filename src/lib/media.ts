export function parseYouTubeId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname === "youtu.be") return u.pathname.slice(1, 12) || null;
    if (u.hostname.endsWith("youtube.com") || u.hostname.endsWith("youtube-nocookie.com")) {
      const v = u.searchParams.get("v");
      if (v) return v.slice(0, 11);
      const m = u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{11})/);
      if (m) return m[1];
    }
  } catch {
    /* pas une URL */
  }
  return null;
}

export function isPortraitVideo(url: string, orientation?: "landscape" | "portrait"): boolean {
  return orientation ? orientation === "portrait" : /\/shorts\//.test(url);
}

export function youtubeEmbedUrl(id: string, opts: { start?: number; autoplay?: boolean } = {}): string {
  const p = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1" });
  if (opts.autoplay) p.set("autoplay", "1");
  if (opts.start) p.set("start", String(Math.floor(opts.start)));
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`;
}

export function youtubeThumb(id: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault"): string {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
}
