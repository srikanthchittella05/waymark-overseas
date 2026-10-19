# Waymark

**Every step, marked.**

Waymark turns "I want to study abroad" into a dated plan. Pick a destination and an
intake, and every deadline is counted back from departure so you always know what is
next, why it matters now, and what is standing in the way.

Nothing is stored on a server. There is no account. Your answers and your ticks live
in this browser only.

## The four screens

| Route | The one job it does |
| --- | --- |
| `/today` | The single next step, why it is due now, and what is blocking it. |
| `/route` | Every deadline counted back from departure, on one ladder. |
| `/steps` | The milestone checklist, grouped by phase, with a confidence flag and a source on every row. |
| `/path` | Four questions. Your choice redraws the whole plan before you commit to it. |

## How it works

The engine in `src/lib/engine/` is the product. It does not fetch anything at runtime.

- **`country-cycles.ts`** — 104 researched milestones across the US, UK, Canada, Australia,
  Germany, France and Singapore. Every milestone carries a confidence flag and a source URL:
  - `verified` — an official source states the rule, the figure or the date quoted.
  - `typical` — a real pattern, but not one specific institution's published deadline.
  - `estimate` — we inferred it. No published deadline exists.

  Confidence is deliberately **not** a claim that a date is officially published. Dates are
  computed as offsets backwards from the intake start, so treat every one as a target to
  check against its source rather than a fact.

- **`plan.ts`** — derives all dates from the intake start and assigns each milestone a status
  of `done`, `now`, `next`, `later` or `risk`. Status is *earned* from what you have ticked
  and what is still blocking each step; nothing is hardcoded.

- **`profile.ts`** — a small localStorage store. No account, no sync, no server. Clearing
  this browser's data erases it.

The domain knowledge the engine encodes: the US, Canada and Australia are **rolling**;
the UK, Singapore, Germany and France are **fixed**. Alongside that sit the gotchas that
actually trip people up — UK ATAS before CAS, the US F-1 interview backlog, a blocked
German account, Campus France EEF, and Singapore's seven-day eForm-16 payment window after
which ICA withdraws the application.

Housing is marked `estimate`. No central source publishes a housing deadline anywhere.

## Running it

```bash
npm install
npm run dev      # http://localhost:3200
```

Requires Node 22+. The dev server binds `0.0.0.0`, so it is reachable on the LAN.

```bash
npm run build    # production build
npm run lint     # eslint
npx tsc --noEmit --incremental false
```

`/today`, `/steps` and `/route` are intentionally dynamic — they read the real date on
every request so a plan is never served as a dateless skeleton. `/path` is also dynamic:
it validates optional country/intake URL choices as an **unsaved** draft, selecting an
upcoming intake when none is supplied. Only the landing is static.

## Layout

```
src/
  app/
    layout.tsx        MotionProvider → GsapProvider → SmoothScroll, one <main>
    page.tsx          the landing
    today|steps|route|path/    one directory per screen
                            page.tsx        server shell (exports metadata)
                            *-screen.tsx    client view
                            *.css           per-screen stylesheet
  components/
    landing/           SiteNavigation, LandingExperience, JourneySculpture
    providers/         MotionProvider, GsapProvider, SmoothScroll
    ui/                CustomCursor, native React PageTransition
  lib/
    engine/            country-cycles, plan, profile, destinations
```

Each screen owns its stylesheet on purpose, so two screens can never collide on
`globals.css`.

## A note on motion

Standard viewing has the full motion experience. `prefers-reduced-motion` is the only
quieter mode, including live preference changes. There is no in-page pause button.

- **Entry:** a forest aperture opens around the actual satin-ribbon infinity as it
  turns into the hero position. Approximately 2.5 seconds of overlapping choreography;
  the material gets at most a 1-second readiness window. A 4.5-second watchdog and any
  input release it. Deep links, browser-back, repeats and reduced motion bypass it.
- **One visual thread:** on larger screens the same mesh travels from hero to manifesto,
  opens into an orbit, then contracts as an evidence-backed dated route takes over.
  Touch layouts keep unfolding and masked typography with native, non-pinned scrolling.
- **Product:** the real sample plan, four linked product views, destination parallax,
  masked closing, and finite interaction feedback all share a motion vocabulary.
- **Navigation:** React ViewTransition provides a 720ms forest/oval handoff while the
  header stays fixed. Its iris follows the captured viewport, without shrinking a long page.
  Ordinary navigation remains intact in browsers without the API.
- **Fallback:** `public/journey-infinity.webp` is a 22KB transparent render of our own
  mesh, camera and studio, so reduced-motion/no-WebGL/no-JS retain the same artwork.
  Every section remains visible without JavaScript.

The landing demonstrates an explicitly dated sample from the real planning engine;
previewing it does not save a profile or progress. Its selected country/intake and the
destination cards carry into `/path` as a draft; nothing is stored until confirmation.
