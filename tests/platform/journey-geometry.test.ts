import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, Raycaster, Vector3 } from "three";
import { createJourneyGeometry } from "../../src/lib/motion/journey-geometry";

function digest(attribute: BufferAttribute) {
  const array = attribute.array;
  return createHash("sha256").update(Buffer.from(array.buffer, array.byteOffset, array.byteLength)).digest("hex");
}

function baseAttribute(geometry: BufferGeometry, name: string) {
  const attribute = geometry.getAttribute(name);
  assert.ok(attribute instanceof BufferAttribute);
  return attribute;
}

function targetAttribute(geometry: BufferGeometry, name: "position" | "normal") {
  const attribute = geometry.morphAttributes[name]?.[0];
  assert.ok(attribute instanceof BufferAttribute);
  return attribute;
}

function bounds(attribute: BufferAttribute) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < attribute.count; i++) {
    for (let axis = 0; axis < 3; axis++) {
      const value = attribute.array[i * 3 + axis];
      min[axis] = Math.min(min[axis], value);
      max[axis] = Math.max(max[axis], value);
    }
  }
  return { min, max };
}

test("the infinity position, normals, alloy tint and index topology remain byte-identical", () => {
  const geometry = createJourneyGeometry();
  try {
    // Captured from the actual pre-change JourneySculpture factory, not a new snapshot.
    assert.equal(digest(baseAttribute(geometry, "position")), "9b1e457e47a04863144f824f9bb1febeecebe218a76c9183ca991162a00b3d3f");
    assert.equal(digest(baseAttribute(geometry, "normal")), "9319e1894747d9386b63c6bea6ff04fe38dd7b02598d6de0fd1276fbcebf9ae7");
    assert.equal(digest(baseAttribute(geometry, "color")), "3bb5dece0f942a775c135bb5785200ba49b937b4fd8195a2d4a3ea216daf2937");
    assert.ok(geometry.index);
    assert.equal(digest(geometry.index), "cb129b35707b1893c45c3a9f2af68f0272af93467c012d126f54c1b5b85788dc");
  } finally {
    geometry.dispose();
  }
});

test("one absolute position/normal target has finite unit normals on the same closed grid", () => {
  const geometry = createJourneyGeometry();
  try {
    assert.equal(geometry.morphTargetsRelative, false);
    assert.ok(geometry.morphAttributes.position);
    assert.ok(geometry.morphAttributes.normal);
    assert.equal(geometry.morphAttributes.position.length, 1);
    assert.equal(geometry.morphAttributes.normal.length, 1);
    const positions = baseAttribute(geometry, "position");
    assert.equal(positions.count, 8192);
    assert.ok(geometry.index);
    assert.ok(geometry.index.array instanceof Uint16Array);
    assert.equal(geometry.index.count, 49152);
    const edges = new Map<string, number>();
    for (let i = 0; i < geometry.index.count; i += 3) {
      const triangle: number[] = [geometry.index.getX(i), geometry.index.getX(i + 1), geometry.index.getX(i + 2)];
      assert.equal(new Set(triangle).size, 3);
      for (let j = 0; j < 3; j++) {
        const a = triangle[j];
        const b = triangle[(j + 1) % 3];
        assert.ok(a >= 0 && a < positions.count);
        const key = `${Math.min(a, b)}:${Math.max(a, b)}`;
        edges.set(key, (edges.get(key) ?? 0) + 1);
      }
    }
    for (const count of edges.values()) assert.equal(count, 2, "no open index boundary");
    assert.equal(positions.count - edges.size + geometry.index.count / 3, 0, "original toroidal topology");

    for (const name of ["position", "normal"] as const) {
      const target = targetAttribute(geometry, name);
      assert.equal(target.count, positions.count);
      assert.equal(target.itemSize, 3);
      for (const value of target.array) assert.ok(Number.isFinite(value));
      if (name === "normal") {
        for (let i = 0; i < target.count; i++) {
          const length = Math.hypot(target.getX(i), target.getY(i), target.getZ(i));
          assert.ok(Math.abs(length - 1) < 1e-6, `target normal ${i}: ${length}`);
        }
      }
    }
  } finally {
    geometry.dispose();
  }
});

test("the aircraft has a long +X fuselage, paired swept wings, separate tailplanes and a raised fin", () => {
  const geometry = createJourneyGeometry();
  try {
    const aircraft = targetAttribute(geometry, "position");
    const { min, max } = bounds(aircraft);
    assert.ok(Math.abs(min[0] + 2.12) < 1e-6);
    assert.ok(Math.abs(max[0] - 2.2) < 1e-6);
    assert.ok(Math.abs(min[1] + 1.68) < 1e-6 && Math.abs(max[1] - 1.68) < 1e-6);
    assert.ok(min[2] < -0.15 && min[2] > -0.18);
    assert.ok(max[2] > 0.6 && max[2] < 0.7);
    let wingTips = 0;
    let tailTips = 0;
    let finVertices = 0;
    for (let i = 0; i < aircraft.count; i++) {
      const x = aircraft.getX(i);
      const y = aircraft.getY(i);
      const z = aircraft.getZ(i);
      if (Math.abs(y) > 1.6) {
        assert.ok(x >= -0.79 && x <= -0.45, "main wing tips sweep aft of the leading root");
        wingTips++;
      }
      if (x < -1.7 && Math.abs(y) > 0.58) tailTips++;
      if (z > 0.45) {
        assert.ok(x < -1.3 && x > -2.05 && Math.abs(y) < 0.08, "raised dorsal tail, not a third wing");
        finVertices++;
      }
    }
    assert.ok(wingTips >= 20 && tailTips >= 20 && finVertices >= 10);
  } finally {
    geometry.dispose();
  }
});

test("CPU rays hit filled fuselage, wings and tail while missing the silhouette notches", () => {
  const geometry = createJourneyGeometry();
  const aircraft = new BufferGeometry();
  const material = new MeshBasicMaterial();
  try {
    aircraft.setAttribute("position", targetAttribute(geometry, "position"));
    aircraft.setIndex(geometry.index);
    const mesh = new Mesh(aircraft, material);
    const ray = new Raycaster();
    const hit = (x: number, y: number) => {
      ray.set(new Vector3(x, y, 3), new Vector3(0, 0, -1));
      return ray.intersectObject(mesh).length > 0;
    };
    for (const [x, y] of [[0, 0], [1.3, 0], [2.05, 0], [-1.3, 0], [-0.6, 1.2], [-0.6, -1.2], [-1.8, 0.4], [-1.8, -0.4]]) {
      assert.equal(hit(x, y), true, `filled aircraft at ${x},${y}`);
    }
    for (const [x, y] of [[1.1, 0.6], [1.1, -0.6], [-1.25, 0.55], [-1.25, -0.55], [-2.05, 0.4], [0, 1.7], [2.3, 0]]) {
      assert.equal(hit(x, y), false, `outside aircraft at ${x},${y}`);
    }
  } finally {
    aircraft.dispose();
    material.dispose();
    geometry.dispose();
  }
});

test("endpoint triangles are non-degenerate and target normals follow the indexed surface", () => {
  const geometry = createJourneyGeometry();
  try {
    assert.ok(geometry.index);
    for (const positions of [baseAttribute(geometry, "position"), targetAttribute(geometry, "position")]) {
      const a = new Vector3();
      const b = new Vector3();
      const c = new Vector3();
      for (let i = 0; i < geometry.index.count; i += 3) {
        a.fromBufferAttribute(positions, geometry.index.getX(i));
        b.fromBufferAttribute(positions, geometry.index.getX(i + 1));
        c.fromBufferAttribute(positions, geometry.index.getX(i + 2));
        const areaSquared = b.sub(a).cross(c.sub(a)).lengthSq();
        assert.ok(areaSquared > 1e-18, `non-degenerate triangle ${i / 3}: ${areaSquared}`);
      }
    }
    const target = new BufferGeometry();
    try {
      target.setAttribute("position", targetAttribute(geometry, "position"));
      target.setIndex(geometry.index);
      target.computeVertexNormals();
      assert.equal(digest(baseAttribute(target, "normal")), digest(targetAttribute(geometry, "normal")));
    } finally {
      target.dispose();
    }
  } finally {
    geometry.dispose();
  }
});

test("both endpoints are distinct, deterministic, independently allocated and continuously bounded", () => {
  const geometry = createJourneyGeometry();
  const other = createJourneyGeometry();
  try {
    const base = baseAttribute(geometry, "position");
    const target = targetAttribute(geometry, "position");
    const normals = baseAttribute(geometry, "normal");
    const targetNormals = targetAttribute(geometry, "normal");
    assert.equal(digest(target), digest(targetAttribute(other, "position")));
    assert.equal(digest(targetNormals), digest(targetAttribute(other, "normal")));
    assert.notEqual(base.array, target.array);
    assert.notEqual(target.array, targetAttribute(other, "position").array);
    assert.notEqual(digest(base), digest(target));
    let distanceSquared = 0;
    for (let i = 0; i < base.array.length; i++) distanceSquared += (base.array[i] - target.array[i]) ** 2;
    assert.ok(Math.sqrt(distanceSquared / base.count) > 1, "substantial deformation, not the same ring");
    const sphere = geometry.boundingSphere;
    assert.ok(sphere && Number.isFinite(sphere.radius) && sphere.radius < 3);
    const point = new Vector3();
    // This mirrors Three's absolute morph position/normal interpolation, not a GPU render.
    for (let step = 0; step <= 100; step++) {
      const progress = step / 100;
      for (let i = 0; i < base.count; i++) {
        point.set(
          base.getX(i) * (1 - progress) + target.getX(i) * progress,
          base.getY(i) * (1 - progress) + target.getY(i) * progress,
          base.getZ(i) * (1 - progress) + target.getZ(i) * progress,
        );
        assert.ok(Number.isFinite(point.lengthSq()) && point.distanceTo(sphere.center) <= sphere.radius + 1e-6);
        const normalLength = Math.hypot(
          normals.getX(i) * (1 - progress) + targetNormals.getX(i) * progress,
          normals.getY(i) * (1 - progress) + targetNormals.getY(i) * progress,
          normals.getZ(i) * (1 - progress) + targetNormals.getZ(i) * progress,
        );
        assert.ok(Number.isFinite(normalLength) && normalLength > 1e-5, `normal does not collapse at ${progress}/${i}`);
      }
    }
  } finally {
    other.dispose();
    geometry.dispose();
  }
});
