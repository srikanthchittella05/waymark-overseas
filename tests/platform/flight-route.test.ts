import { test } from "node:test";
import assert from "node:assert/strict";
import { continuousHeading, flightPath, sampleFlightPath, smoothProgress, unitProgress } from "../../src/lib/motion/flight-route";

test("flight progress clamps invalid and out-of-range scroll samples", () => {
  for (const value of [NaN, Infinity, -Infinity, -1]) assert.equal(unitProgress(value), 0);
  assert.equal(unitProgress(2), 1);
  assert.equal(smoothProgress(0), 0);
  assert.equal(smoothProgress(1), 1);
  assert.equal(smoothProgress(0.5), 0.5);
  assert.ok(smoothProgress(0.001) < 0.000004);
});

test("cached route interpolation preserves endpoints and reverse-scroll positions", () => {
  const points = [{ x: 0, y: 20, angle: 90 }, { x: 20, y: 40, angle: 120 }, { x: 40, y: 80, angle: 180 }];
  assert.deepEqual(sampleFlightPath(points, -1), points[0]);
  assert.deepEqual(sampleFlightPath(points, 2), points[2]);
  assert.deepEqual(sampleFlightPath(points, 0.25), { x: 10, y: 30, angle: 105 });
  assert.deepEqual(sampleFlightPath(points, 0.75), { x: 30, y: 60, angle: 150 });
  const forward = [0, 0.2, 0.5, 0.9, 1].map((progress) => sampleFlightPath(points, progress));
  const reverse = [1, 0.9, 0.5, 0.2, 0].map((progress) => sampleFlightPath(points, progress)).reverse();
  assert.deepEqual(forward, reverse);
  assert.throws(() => sampleFlightPath([], 0), RangeError);
});

test("headings cross the signed angle boundary without a full spin", () => {
  assert.equal(continuousHeading(179, -179), 181);
  assert.equal(continuousHeading(-179, 179), -181);
  assert.equal(continuousHeading(720, 10), 730);
});

test("desktop and mobile paths enter the next section without reaching its heading", () => {
  const desktop = flightPath(1440, 1040, 620, 110, false);
  const mobile = flightPath(390, 1000, 640, 130, true);
  assert.match(desktop, /^M1123\.2 /);
  assert.match(desktop, /V1044$/);
  assert.match(mobile, /^M358 174C358 /);
  assert.match(mobile, /V1004$/);
  for (const dimensions of [[0, 1000], [390, 0], [NaN, 1000], [390, Infinity]]) {
    assert.throws(() => flightPath(dimensions[0], dimensions[1], 400, 100, true), RangeError);
  }
});
