/// <reference types="node" />
import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { writingFront, newestWriting } from "./writingFront";

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
});