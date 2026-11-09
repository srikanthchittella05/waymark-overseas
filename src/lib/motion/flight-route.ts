export type FlightPoint = { x: number; y: number; angle: number };

export function unitProgress(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
}

export function smoothProgress(value: number) {
  const p = unitProgress(value);
  return p * p * (3 - 2 * p);
}

/** The displayed SVG and the aircraft share this one route, in CSS pixels. */
export function flightPath(width: number, height: number, messageBottom: number, labelBottom: number, narrow: boolean) {
  if (![width, height, messageBottom, labelBottom].every(Number.isFinite) || width <= 0 || height <= 0) {
    throw new RangeError("Flight layout must have finite, positive dimensions.");
  }
  const rail = narrow ? 28 : 52;
  const startX = narrow ? width - 32 : width * 0.78;
  const startY = narrow ? labelBottom + 44 : Math.max(labelBottom + 72, height * 0.23);
  const bendX = narrow ? startX : width * 0.96;
  const cruiseY = Math.max(startY + 120, Math.min(height - 190, Math.max(messageBottom + 64, height * 0.7)));
  return `M${startX} ${startY}C${bendX} ${startY + 140} ${bendX} ${cruiseY} ${width * 0.58} ${cruiseY}S${rail} ${cruiseY} ${rail} ${cruiseY + 72}V${height + 4}`;
}

/** Samples are cached at refresh time; scroll frames do not read layout. */
export function sampleFlightPath(points: readonly FlightPoint[], progress: number): FlightPoint {
  if (points.length < 2) throw new RangeError("A flight path needs at least two samples.");
  const position = unitProgress(progress) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(position));
  const fraction = position - index;
  const from = points[index];
  const to = points[index + 1];
  return { x: from.x + (to.x - from.x) * fraction, y: from.y + (to.y - from.y) * fraction,
    angle: from.angle + (to.angle - from.angle) * fraction };
}

/** Unwrap tangents before interpolation so a bend never spins through 360°. */
export function continuousHeading(previous: number, next: number) {
  return previous + ((next - previous + 540) % 360 + 360) % 360 - 180;
}
