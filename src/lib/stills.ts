// Only stills with a generated 2400px sibling advertise that candidate.
// Portraits and older stills retain their 1600px maximum; JPGs stay the fallback.
const hdLandscapes = new Set([
  "ai-safety-law", "amtrak-rail-yard", "bears-stadium-fight", "bryant-field-nwi",
  "bryant-skyline-lakefront", "career-wkyc-anchor", "election-night-2026",
  "englewood-fire", "nwi-storm-series", "reporter-reel-2026", "writing-ai-law",
  "writing-bud-billiken", "writing-hamlin-park", "writing-markham",
  "writing-medical-school", "writing-ryan-field", "career-wkyc-field-v2",
  "career-cbs58-live-v2", "career-cbs58-field-v2", "career-wfrv-snow-v2",
]);

export const stillSrcSet = (src?: string) =>
  src && src.startsWith("/stills/") && src.endsWith(".jpg")
    ? `${src.replace(/\.jpg$/, "-800.webp")} 800w, ${src.replace(/\.jpg$/, "-1600.webp")} 1600w${hdLandscapes.has(src.slice("/stills/".length, -4)) ? `, ${src.replace(/\.jpg$/, "-2400.webp")} 2400w` : ""}`
    : undefined;

export const REEL_ID = "3xhS6QEm7A0";
export const REEL_TITLE = "Bryant McCray | TV Reporter Reel 2026 | Chicago";
export const REEL_LINK = `https://youtu.be/${REEL_ID}`;
export const REEL_POSTER = "/stills/reporter-reel-2026.jpg";
export const REEL_ALT = "Bryant McCray reporting live for WGN-TV in West Englewood";
