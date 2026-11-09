"use client";

import { useState } from "react";
import Image from "next/image";
import { COUNTRY_SCENES } from "@/lib/engine/country-scenes";

export default function CountryGallery({ code, name }: { code: string; name: string }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
  const available = (COUNTRY_SCENES[code] ?? []).filter((scene) => !failed.has(scene.image));
  if (available.length === 0) return null;

  const position = Math.min(index, available.length - 1);
  const scene = available[position];
  const multiple = available.length > 1;

  return (
    <section className="pa-gallery" aria-labelledby="pa-gallery-title">
      <div className="pa-gallery-intro">
        <div>
          <p className="eyebrow">A wider view</p>
          <h3 id="pa-gallery-title">{name}, in focus.</h3>
        </div>
        <p>Places to picture, not a promise of a campus or a particular intake.</p>
      </div>
      <figure className="pa-gallery-figure">
        <div className="pa-gallery-frame">
          <Image
            key={scene.image}
            src={scene.image}
            alt={scene.alt}
            fill
            unoptimized
            sizes="(min-width: 900px) 48vw, (min-width: 600px) 88vw, 90vw"
            onError={() => setFailed((previous) => new Set(previous).add(scene.image))}
          />
        </div>
        <figcaption className="pa-gallery-caption">
          <span className="pa-gallery-place" aria-live="polite">{scene.location}</span>
          <span className="pa-gallery-credit">
            <a href={scene.source} target="_blank" rel="noopener noreferrer">Photo: {scene.author}</a>
            {" · "}
            <a href={scene.licenseUrl} target="_blank" rel="noopener noreferrer">{scene.license}</a>
            {" · converted to WebP"}
          </span>
        </figcaption>
      </figure>
      {multiple ? (
        <nav className="pa-gallery-controls" aria-label={`Views of ${name}`}>
          <button type="button" aria-label={`Previous view of ${name}`}
            onClick={() => setIndex((position - 1 + available.length) % available.length)}>
            <span aria-hidden="true">←</span> Previous
          </button>
          <p className="pa-gallery-count" role="status" aria-live="polite">
            {position + 1} / {available.length}
          </p>
          <button type="button" aria-label={`Next view of ${name}`}
            onClick={() => setIndex((position + 1) % available.length)}>
            Next <span aria-hidden="true">→</span>
          </button>
        </nav>
      ) : null}
    </section>
  );
}
