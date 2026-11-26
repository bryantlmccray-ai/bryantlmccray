/// <reference types="node" />
import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { existsSync, readdirSync } from "node:fs";
import { stillSrcSet } from "./stills";

describe("HD still candidates", () => {
  it("advertises every available 2400px rendition without missing files", () => {
    const files = readdirSync("public/stills");
    const hdFiles = files.filter(file => file.endsWith("-2400.webp"));
    assert.equal(hdFiles.length, 20);
    for (const file of files.filter(file => file.endsWith(".jpg"))) {
      const candidates = stillSrcSet(`/stills/${file}`);
      assert.ok(candidates);
      assert.equal(candidates.includes("2400w"), files.includes(file.replace(/\.jpg$/, "-2400.webp")));
      for (const candidate of candidates.split(", ")) {
        assert.ok(existsSync(`public${candidate.split(" ")[0]}`), candidate);
      }
    }
  });
  it("caps the rain portrait at 1600px", () => {
    assert.equal(stillSrcSet("/stills/bryant-rain-portrait.jpg"), "/stills/bryant-rain-portrait-800.webp 800w, /stills/bryant-rain-portrait-1600.webp 1600w");
  });
  it("leaves external images outside still processing", () => {
    assert.equal(stillSrcSet("https://img.youtube.com/vi/z13ABz3426A/hqdefault.jpg"), undefined);
  });
});