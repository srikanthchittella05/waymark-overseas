import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DESTINATIONS, assertDestinationsMatchEngine } from "../../src/lib/engine/destinations";
import { COUNTRY_SCENES } from "../../src/lib/engine/country-scenes";

test("each landing destination corresponds to a supported target", () => {
  assert.deepEqual(assertDestinationsMatchEngine(), []);
  assert.equal(DESTINATIONS.find(({ code }) => code === "US")?.city, "Chicago");
  assert.equal(DESTINATIONS.find(({ code }) => code === "US")?.coords, "41.88° N");
  assert.match(DESTINATIONS.find(({ code }) => code === "US")?.alt ?? "", /LaSalle Street/);
});

test("each supported country offers two distinct locally served views with visible credits", () => {
  assert.deepEqual(Object.keys(COUNTRY_SCENES).sort(), DESTINATIONS.map(({ code }) => code).sort());
  for (const destination of DESTINATIONS) {
    const scenes = COUNTRY_SCENES[destination.code];
    assert.equal(scenes.length, 2, destination.code);
    assert.equal(new Set(scenes.map(({ location }) => location)).size, 2, `${destination.code}: distinct places`);
    assert.equal(new Set(scenes.map(({ image }) => image)).size, 2, `${destination.code}: distinct photos`);
    for (const scene of scenes) {
      assert.match(scene.image, new RegExp(`^/destinations/views/${destination.code.toLowerCase()}-[\\w-]+\\.webp$`));
      assert.ok(scene.alt.length > 22 && scene.location.length > 3 && scene.author.length > 2);
      assert.match(scene.source, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      assert.match(scene.licenseUrl, /^https:\/\/(?:creativecommons\.org|commons\.wikimedia\.org)\//);
      const bytes = readFileSync(new URL(`../../public${scene.image}`, import.meta.url));
      assert.equal(bytes.toString("ascii", 0, 4), "RIFF", scene.image);
      assert.equal(bytes.toString("ascii", 8, 12), "WEBP", scene.image);
      assert.ok(bytes.length > 10_000 && bytes.length < 500_000, `${scene.image}: usable but optimized`);
    }
  }
});
