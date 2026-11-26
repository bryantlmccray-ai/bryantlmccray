import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { reporterNotes, stories } from "./stories";

describe("Optional reporter notes", () => {
  it("omits the section when all fields are unset", () => {
    assert.deepEqual(reporterNotes({}), []);
    assert.ok(stories.every(story => reporterNotes(story).length === 0));
  });
  for (const key of ["why", "found", "next"] as const) {
    it(`includes only the populated ${key} field`, () => {
      const notes = reporterNotes({ [key]: "Supplied reporting context" });
      assert.equal(notes.length, 1);
      assert.equal(notes[0]?.key, key);
      assert.equal(notes[0]?.text, "Supplied reporting context");
    });
  }
  it("keeps populated notes in reporting order and ignores empty strings", () => {
    assert.deepEqual(reporterNotes({ next: "Follow-up", why: "Reason", found: "Finding" }).map(note => note.key), ["why", "found", "next"]);
    assert.deepEqual(reporterNotes({ why: "", found: "Finding", next: "" }).map(note => note.key), ["found"]);
  });
});