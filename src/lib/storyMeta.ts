import type { Story } from "@/data/stories";

const parts = (story: Story) => story.kicker.split("·").map((p) => p.trim());

// "WGN NEWS · ..." -> "WGN-TV"; other stations keep their call letters.
export const storyStation = (story: Story) => {
  const s = parts(story)[0] ?? "";
  return s.startsWith("WGN") ? "WGN-TV" : s;
};

// "NOVEMBER 2026" -> "November 2026"
export const storyDate = (story: Story) =>
  (parts(story)[1] ?? "").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

// Caption built only from story data: what it is, station and date, then the credit.
export const stillCaption = (story: Story) => {
  const station = storyStation(story);
  return `${story.headline}. ${station}, ${storyDate(story)}. ${station} broadcast still.`;
};
