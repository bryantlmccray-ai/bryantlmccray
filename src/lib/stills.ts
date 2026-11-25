// Responsive WebP renditions pre-generated next to each JPG in public/stills
// (name-800.webp, name-1600.webp). The JPG stays the fallback src.
export const stillSrcSet = (src?: string) =>
  src && src.startsWith("/stills/") && src.endsWith(".jpg")
    ? `${src.replace(/\.jpg$/, "-800.webp")} 800w, ${src.replace(/\.jpg$/, "-1600.webp")} 1600w`
    : undefined;

export const REEL_ID = "3xhS6QEm7A0";
export const REEL_TITLE = "Bryant McCray | TV Reporter Reel 2026 | Chicago";
export const REEL_LINK = `https://youtu.be/${REEL_ID}`;
export const REEL_POSTER = "/stills/reporter-reel-2026.jpg";
export const REEL_ALT = "Bryant McCray reporting live for WGN-TV in West Englewood";
