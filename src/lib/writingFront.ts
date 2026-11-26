import { writingSamples, type WritingSample } from "@/data/writing";

export const writingTopics: Record<string, string> = {
  "ryan-field-pat-ryan": "Sports Business",
  "illinois-ai-safety-law": "Politics",
  "save-a-lot-closures": "Business",
  "cps-two-weeks": "Education",
  "haitian-tps-chicago": "Immigration",
  "cta-union-safety": "Transit",
  "ford-city-mall-closes": "Business",
  "illinoiscom-medical-school": "Health",
  "markham-storm-relief": "Weather",
  "hamlin-park-dog-park": "Neighborhoods",
  "bud-billiken-97": "Community",
};

export const writingPhotos: Record<string, { src: string; alt: string; caption: string }> = {
  "ryan-field-pat-ryan": {
    src: "/stills/writing-ryan-field.jpg",
    alt: "Bryant McCray interviews Pat Ryan Jr. on the field at Ryan Field.",
    caption: "Bryant McCray interviews Pat Ryan Jr. inside Ryan Field. WGN-TV broadcast still.",
  },
  "illinois-ai-safety-law": {
    src: "/stills/writing-ai-law.jpg",
    alt: "Gov. JB Pritzker at a podium for the AI safety law signing.",
    caption: "Gov. JB Pritzker at the bill signing. WGN-TV broadcast still.",
  },
  "markham-storm-relief": {
    src: "/stills/writing-markham.jpg",
    alt: "Aerial view of a storm-damaged building with its roof torn off.",
    caption: "Storm damage seen from the air. WGN-TV broadcast still.",
  },
  "hamlin-park-dog-park": {
    src: "/stills/writing-hamlin-park.jpg",
    alt: "Bryant McCray reporting live at the Hamlin Park dog area.",
    caption: "Reporting from Hamlin Park. WGN-TV broadcast still.",
  },
  "bud-billiken-97": {
    src: "/stills/writing-bud-billiken.jpg",
    alt: "Dancers in pink and white march in the Bud Billiken Parade.",
    caption: "The Bud Billiken Parade on King Drive. WGN-TV broadcast still.",
  },
  "illinoiscom-medical-school": {
    src: "/stills/writing-medical-school.jpg",
    alt: "New students at orientation at the Illinois College of Osteopathic Medicine.",
    caption: "New student orientation. WGN-TV broadcast still.",
  },
  "cta-union-safety": {
    src: "/stills/writing-cta-union.jpg",
    alt: "Penny McCoach of ATU Local 308 speaks to reporters at Damen and Lake, union members standing behind her.",
    caption: "Penny McCoach of ATU Local 308 at Damen and Lake. WGN-TV broadcast still.",
  },
  "save-a-lot-closures": {
    src: "/writing/frames/SAVEALOT.jpg",
    alt: "A Save A Lot store front with a nearly empty parking lot and a lone cart corral on closing day.",
    caption: "The Save A Lot store as the lot emptied on closing day, July 25, 2026. WGN-TV broadcast still.",
  },
};

// Reuse the published copy verbatim; the section front omits the AI opening.
export const writingOpening = (sample: WritingSample) => {
  if (sample.slug === "illinois-ai-safety-law") return undefined;
  const first = sample.body[0];
  if (!first) return undefined;
  const [dateline, text] = first.split(" | ");
  if (!dateline || !text) return undefined;
  const [city, state] = dateline.split(", ");
  return { city, state, paragraphs: [text, ...(sample.slug === "ryan-field-pat-ryan" ? sample.body.slice(1, 2) : [])] };
};

export const writingLeadQuote = "This stadium is defying the traditional way of doing things by making some bold bets to do things very differently.";

export const newestWriting = (count = 3, samples: WritingSample[] = writingSamples) =>
  [...samples].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, count);

export const writingFront = (samples: WritingSample[] = writingSamples) => {
  const ordered = [...samples].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const lead = ordered.find((sample) => sample.slug === "ryan-field-pat-ryan");
  const rest = ordered.filter((sample) => sample !== lead);
  return { lead, rail: rest.slice(0, 2), remaining: rest.slice(2) };
};