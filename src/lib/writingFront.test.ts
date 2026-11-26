/// <reference types="node" />
import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { existsSync } from "node:fs";
import { writingFront, newestWriting, writingPhotos } from "./writingFront";
import { writingSamples } from "@/data/writing";

describe("Writing section order", () => {
  it("shows the three newest pieces on Home without the curated lead override", () => {
    assert.deepEqual(newestWriting().map((sample) => sample.slug), [
      "cta-union-safety", "ryan-field-pat-ryan", "bud-billiken-97",
    ]);
  });
  it("keeps the exclusive Ryan Field interview as the lead", () => {
    assert.equal(writingFront().lead?.slug, "ryan-field-pat-ryan");
  });
  it("places the next two newest pieces in the rail", () => {
    assert.deepEqual(writingFront().rail.map((sample) => sample.slug), ["cta-union-safety", "bud-billiken-97"]);
  });
  it("orders the remaining pieces newest first", () => {
    assert.deepEqual(writingFront().remaining.map((sample) => sample.slug), [
      "hamlin-park-dog-park", "markham-storm-relief", "save-a-lot-closures",
      "illinoiscom-medical-school", "haitian-tps-chicago", "illinois-ai-safety-law",
      "cps-two-weeks", "ford-city-mall-closes",
    ]);
  });
  it("carries the Save A Lot closing day photo with its supplied caption", () => {
    const sample = writingSamples.find((item) => item.slug === "save-a-lot-closures");
    assert.equal(sample?.frame, "/writing/frames/SAVEALOT.jpg");
    assert.equal(
      writingPhotos["save-a-lot-closures"]?.caption,
      "The Save A Lot store as the lot emptied on closing day, July 25, 2026. WGN-TV broadcast still.",
    );
  });
  it("keeps every section-front photo and its 2x rendition on disk", () => {
    for (const [slug, photo] of Object.entries(writingPhotos)) {
      assert.ok(existsSync(`public${photo.src}`), `${slug} photo file`);
      assert.ok(existsSync(`public${photo.src.replace(/\.jpg$/, "-1600.webp")}`), `${slug} 2x rendition`);
    }
  });
});