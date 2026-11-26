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

export const writingFront = (samples: WritingSample[] = writingSamples) => {
  const ordered = [...samples].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const lead = ordered.find((sample) => sample.slug === "ryan-field-pat-ryan");
  const rest = ordered.filter((sample) => sample !== lead);
  return { lead, rail: rest.slice(0, 2), remaining: rest.slice(2) };
};