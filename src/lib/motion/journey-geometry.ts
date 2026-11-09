import { BufferAttribute, BufferGeometry, Color, MathUtils, Vector3 } from "three";

const ALONG = 256;
const AROUND = 32;
const OUTER_RINGS = 192;
const NOSE = 2.2;
const TAIL = -2.12;

/** Ring, longitudinal X, half-span Y. The nose points along local +X. */
const AIRCRAFT_STATIONS = [
  [0, NOSE, 0.006],
  [13, 1.9, 0.085],
  [31, 1.45, 0.155],
  [58, 0.7, 0.2],
  [109, -0.52, 1.68],
  [121, -0.78, 1.62],
  [142, -1.05, 0.165],
  [150, -1.22, 0.155],
  [168, -1.78, 0.62],
  [176, -1.96, 0.6],
  [185, -2.02, 0.09],
  [OUTER_RINGS - 1, TAIL, 0.006],
] as const;

function aircraftStation(ring: number) {
  for (let i = 1; i < AIRCRAFT_STATIONS.length; i++) {
    const previous = AIRCRAFT_STATIONS[i - 1];
    const next = AIRCRAFT_STATIONS[i];
    if (ring <= next[0]) {
      const u = (ring - previous[0]) / (next[0] - previous[0]);
      return { x: MathUtils.lerp(previous[1], next[1], u), halfSpan: MathUtils.lerp(previous[2], next[2], u) };
    }
  }
  return { x: TAIL, halfSpan: 0.006 };
}

/**
 * A closed loft, not an outline: broad swept wings, a raised fuselage, two
 * smaller tailplanes and a dorsal fin. The return rings run INSIDE the fuselage
 * as a 0.0024-unit axial bore, preserving the ribbon's toroidal index topology
 * without a hole through the visible wing/body silhouette. No mesh is swapped.
 */
function createAircraftPositions() {
  const positions = new Float32Array(ALONG * AROUND * 3);
  for (let i = 0; i < ALONG; i++) {
    // Keep the infinity's right lobe at the nose rather than reversing its ends.
    const ring = (i + ALONG - 64) % ALONG;
    const interior = ring >= OUTER_RINGS;
    const { x, halfSpan } = interior
      ? { x: MathUtils.lerp(TAIL, NOSE, (ring - OUTER_RINGS) / (ALONG - OUTER_RINGS - 1)), halfSpan: 0.0012 }
      : aircraftStation(ring);
    const envelope = Math.sin(Math.PI * MathUtils.clamp((x - TAIL) / (NOSE - TAIL), 0, 1));
    const bodyWidth = 0.006 + 0.14 * envelope ** 0.5;
    const bodyHeight = 0.006 + 0.14 * envelope ** 0.65;
    const foilHeight = 0.022 * envelope ** 0.35;
    const finHeight = 0.58 * MathUtils.smoothstep(x, -2.04, -1.8) * (1 - MathUtils.smoothstep(x, -1.8, -1.08));

    for (let j = 0; j < AROUND; j++) {
      const angle = (j / AROUND) * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      // Cluster face samples near the narrow fuselage, not just the wing tips.
      const y = halfSpan * (interior ? cosine : Math.sign(cosine) * Math.abs(cosine) ** 2.4);
      const body = bodyHeight * Math.exp(-1.7 * (y / bodyWidth) ** 2);
      const fin = sine > 0 ? finHeight * Math.exp(-((y / 0.042) ** 2)) : 0;
      const z = interior ? halfSpan * sine : Math.sign(sine) * Math.abs(sine) ** 0.65 * (foilHeight + body + fin);
      const vertex = (i * AROUND + j) * 3;
      positions[vertex] = x;
      positions[vertex + 1] = y;
      positions[vertex + 2] = z;
    }
  }
  return positions;
}

/** Clockwise rounded rectangle: eight spans per crowned face, three per bevel. */
function ribbonSection(index: number, halfWidth: number) {
  const halfDepth = 0.032;
  const bevel = 0.024;
  const shoulder = halfWidth - bevel;
  const crown = 0.012;
  let wide: number;
  let deep: number;

  if (index <= 8 || (index >= 16 && index <= 24)) {
    const face = index <= 8 ? 1 : -1;
    const u = index <= 8 ? index / 8 : (index - 16) / 8;
    wide = face * shoulder * (2 * u - 1);
    deep = face * (halfDepth + crown * Math.sin(Math.PI * u) ** 2);
  } else if (index === 12 || index === 28) {
    wide = index === 12 ? halfWidth : -halfWidth;
    deep = 0;
  } else {
    const corner = index < 12 ? 0 : index < 16 ? 1 : index < 28 ? 2 : 3;
    const start = [8, 13, 24, 29][corner];
    const angle = Math.PI / 2 - corner * Math.PI / 2 - ((index - start) / 3) * Math.PI / 2;
    wide = (corner < 2 ? shoulder : -shoulder) + bevel * Math.cos(angle);
    deep = (corner === 0 || corner === 3 ? halfDepth - bevel : -halfDepth + bevel) + bevel * Math.sin(angle);
  }

  return { wide, deep };
}

/** Deterministic geometry only: no renderer, browser state or shared cache. */
export function createJourneyGeometry() {
  const positions = new Float32Array(ALONG * AROUND * 3);
  const aircraftPositions = createAircraftPositions();
  const colors = new Float32Array(positions.length);
  const indices = new Uint16Array(ALONG * AROUND * 6);
  const center = new Vector3();
  const tangent = new Vector3();
  const lateral = new Vector3();
  const normal = new Vector3();
  const widthAxis = new Vector3();
  const depthAxis = new Vector3();
  const up = new Vector3(0, 0, 1);
  const pearl = new Color("#f0f3ec");
  const sage = new Color("#c5d5ca");
  const warmEdge = new Color("#e4d7b6");
  const acidEdge = new Color("#dce7b3");
  const color = new Color();
  const edge = new Color();

  for (let i = 0; i < ALONG; i++) {
    const t = (i / ALONG) * Math.PI * 2;
    // Preserve the original infinity, including the 0.88-unit crossing depth.
    center.set(2.1 * Math.sin(t), 0.79 * Math.sin(2 * t), 0.44 * Math.cos(t) + 0.08 * Math.sin(2 * t));
    tangent.set(2.1 * Math.cos(t), 1.58 * Math.cos(2 * t), -0.44 * Math.sin(t) + 0.16 * Math.cos(2 * t)).normalize();
    lateral.crossVectors(tangent, up).normalize();
    normal.crossVectors(tangent, lateral).normalize();

    const twist = 0.58 * Math.sin(2 * t) + 0.22 * Math.cos(t) - 0.12;
    widthAxis.copy(lateral).multiplyScalar(Math.cos(twist)).addScaledVector(normal, Math.sin(twist));
    depthAxis.copy(normal).multiplyScalar(Math.cos(twist)).addScaledVector(lateral, -Math.sin(twist));
    const halfWidth = 0.285 + 0.045 * Math.cos(2 * t - 0.45);
    edge.copy(warmEdge).lerp(acidEdge, 0.5 + 0.5 * Math.sin(t - 0.5));

    for (let j = 0; j < AROUND; j++) {
      const { wide, deep } = ribbonSection(j, halfWidth);
      const vertex = (i * AROUND + j) * 3;
      positions[vertex] = center.x + widthAxis.x * wide + depthAxis.x * deep;
      positions[vertex + 1] = center.y + widthAxis.y * wide + depthAxis.y * deep;
      positions[vertex + 2] = center.z + widthAxis.z * wide + depthAxis.z * deep;
      // Very light alloy tint; the pine contrast comes from reflections, not paint.
      color.copy(sage).lerp(pearl, MathUtils.smoothstep(-deep, -0.025, 0.025));
      color.lerp(edge, MathUtils.smoothstep(Math.abs(wide) / halfWidth, 0.94, 1) * 0.32);
      color.toArray(colors, vertex);

      const a = i * AROUND + j;
      const b = ((i + 1) % ALONG) * AROUND + j;
      const c = ((i + 1) % ALONG) * AROUND + ((j + 1) % AROUND);
      const d = i * AROUND + ((j + 1) % AROUND);
      indices.set([a, b, d, b, c, d], (i * AROUND + j) * 6);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setIndex(new BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  geometry.morphTargetsRelative = false;
  const aircraftGeometry = new BufferGeometry();
  try {
    aircraftGeometry.setAttribute("position", new BufferAttribute(aircraftPositions, 3));
    aircraftGeometry.setIndex(geometry.getIndex());
    aircraftGeometry.computeVertexNormals();
    geometry.morphAttributes.position = [aircraftGeometry.getAttribute("position")];
    geometry.morphAttributes.normal = [aircraftGeometry.getAttribute("normal").clone()];
  } finally {
    aircraftGeometry.dispose();
  }
  // Three includes both absolute endpoints; their linear blends stay in bounds.
  geometry.computeBoundingSphere();
  return geometry;
}
