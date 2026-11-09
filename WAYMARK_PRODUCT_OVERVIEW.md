# Waymark Overseas — Product Overview

**Code-reviewed snapshot: 5 November 2026.** Waymark is an independent study-abroad planning product. This document describes what the repository actually contains, not a promise that every feature is deployed or connected to a live service.

> **Read the status labels carefully.** **Develop** means present in the inspected clean `origin/develop` checkout (`68d4535`), not a verified hosted release. **Local implementation** means present in the dirty, uncommitted `/Users/cvs001/waymark` working tree (`feature/accounts-admin`, HEAD `c9ddcbd`); it is not part of that develop release. **Blocked/planned** means an incomplete code path or an external prerequisite, not a working product capability. The locally cached `origin/main` was `2093d50`; this review did not verify a live site, a fresh remote ref, hosted CI, a Supabase project, or production deployment.

## 1. Product vision and the problem

**Vision:** turn “I want to study abroad” into an actionable, dated route: one place to choose a destination and intake, see what should happen next, understand prerequisites, and track progress. The value proposition is *planning and decision support*, not simply displaying countries or collecting enquiries.

The problem Waymark addresses is that a student must coordinate programme research, tests, documents, applications, funding, offers, immigration, housing and departure. These activities have different lead times and dependencies; a generic destination page or undated checklist does not tell the student **when** to start, **why** a step matters now, or **what blocks it**. Waymark counts planning dates backwards from the selected intake and exposes the source and confidence behind its assumptions. Those dates are **planning targets**, not guaranteed university or government deadlines.

**Product boundary:** this is not a university application portal, admissions decision engine, paid counselling service, visa filing system or AI university-matching service. No such transactional workflows were found in the inspected application routes. The country catalog is built around taught-postgraduate study and includes some programme-specific examples; it is not an exhaustive directory of courses or universities.

## 2. Target users and their needs

| User | Need | Current product response |
| --- | --- | --- |
| Prospective postgraduate student, still exploring | Understand the shape of the process before committing to an intake | Public sample plan, seven destinations, stage/country/intake picker and unsaved plan preview (**develop**). |
| Student with a country and intake in mind | Translate an intake start into sequenced work, see near-term action and late items | Dated planner, dependency-aware next step, phase checklist and route graph (**develop**). |
| Student working through requirements | Know what each task involves, which source to check and how to prepare | A dossier for each of 104 milestones, source/confidence labels, tasks and context-specific resources (**develop**). |
| Returning student | Retain separate progress for different intakes and resume on another device | Browser-local storage in **develop**; account-backed, per-intake workspace is **local implementation only** and requires a configured provider and database. |
| Content/operations administrator | Maintain guidance, oversee account access and communicate important updates | Protected admin UI, draft revisions, user controls, in-app announcements and audit views are **local implementation only**; guide/deadline publication is blocked **through the application**. |

Waymark does **not** infer a student's admission eligibility, acceptance probability or financial suitability. The chosen stage is recorded and shown in the target preview, but the current planning engine does not change the milestone catalog or dates by stage.

## 3. Implemented features and modules

### Public experience — in `develop`

| Module | What the code does |
| --- | --- |
| Landing page `/` | Introduces the proposition, shows an engine-derived sample journey, links the four planner views and presents all seven supported countries. Destination cards deep-link to `/path` as **draft** choices; they do not save a profile. Includes the infinity artwork and motion fallbacks. |
| Your Path `/path` | Four-part flow: current stage, destination, intake and confirmation. Changing inputs recalculates a draft with intake date, first deadline, milestone/risk counts, country caveat and change summary before the user confirms. URL country/intake links are previews, not writes. In `develop`, the browser-wide completion map can carry ticks into a different intake's draft; the local account variant clears those ticks when previewing a different target. |
| Destination gallery | Two distinct, locally served, credited country photographs per supported country (14 WebP views), with previous/next controls and visible attribution. This gallery and its palette are in `develop`; landing destination images separately reference Unsplash URLs. |
| Today `/today` | Shows one next action, its rationale and tasks, blockers, overdue work, progress and links into the checklist/route. When all actionable dates are past, the engine can surface an unfinished catch-up step rather than an empty focus area. |
| The Steps `/steps` | Checklist grouped by the plan's phases; status filters, progress counts, tasks, due dates, prerequisites, source and confidence labels, and links to the relevant guide. A **milestone** is the unit of completion; its listed tasks are guidance, not individually checkable items. |
| The Route `/route` | Date-ordered, selectable graph of milestones and dependencies with a detail panel; keyboard navigation and a narrower-screen presentation without misleading connection lines. |
| Planning engine | Seven country cycles (US, UK, Canada, Australia, Germany, France, Singapore), **28 cataloged intakes**, **104 milestones** across **12 phases**. `buildPlan` calculates each due date from the intake start and a planning offset, resolves blockers, and derives urgency, `done`/`now`/`next`/`later`/`risk` states and an immediate next step. Some countries are categorized as rolling and others fixed, with explicit country-specific caveats. |
| Guide library | All 104 milestone IDs map to written, on-demand dossiers. Thirteen guide archetypes define named sections. Depending on the checkpoint, content can include official links, test options, score/timing notes, preparation stages, document steps, warnings and explained resources. The milestone's own tasks and source remain visible even when a guide cannot load. |
| Browser-only progress | `develop` stores the target and completion ticks under `waymark.profile.v1` and `waymark.done.v1` in the browser's `localStorage`; it has no account/server persistence. A storage event updates other tabs using the same browser storage. Clearing that storage loses the saved plan. |

The public catalog is **curated and static in source**. Sources are recorded per milestone, and each item is labelled `verified`, `typical` or `estimate`. `verified` can refer to an officially documented **rule or figure**, not necessarily the computed date. The country-cycle research is marked October 2026; individual programme deadlines, visa rules, provider fees and future intake dates require ongoing re-checking. The first cataloged intake is in January 2027 and the last in January 2029. There is no live university-deadline feed.

### Additional modules in the uncommitted local working tree — not in `develop`

| Module | What is implemented locally | Qualification |
| --- | --- | --- |
| Account entry/recovery | Email/password signup and login, confirmation and password-recovery routes; optional Google and Apple OAuth starts; logout; server-side session and account checks. | Signup/login are disabled when Supabase configuration is absent. Email delivery, OAuth callback setup and real-provider operation have **not** been verified. The signup form does not offer social signup buttons, although login has social sign-in buttons. |
| Guest versus saved workspace | Guests use a temporary per-mounted in-memory workspace; signed-in users are intended to save a plan per user/country/intake, with separate progress for each intake. The account page lists plans and in-app updates. | This changes the `develop` browser-persistence contract: local guest changes disappear on reload and are **not silently uploaded**. Cross-device saving remains an intended behavior until a dedicated provider is connected and tested. |
| Progress and checkpoints | Start a checkpoint, add an evidence **title** with optional HTTPS link, mark complete, or skip with a reason; view a suggested week-by-week task distribution. The visible form does not offer a free-text evidence-note field, although the data contract permits a note. Evidence is capped at 50 entries and rolling status history at 100 events **per milestone**; history is not permanent. Visible on Today, Steps and Route. | Completion is gated by unfinished prerequisites in UI/store/SQL; skipping does not satisfy dependencies. Evidence is student-recorded, **not verified by Waymark**. Pacing divides catalog tasks across remaining weeks; it is not an individualized workload or admissions prediction. |
| Legacy import | Account page can inspect the old browser-local profile/ticks, show the candidate data for review and submit a validated, idempotent import without auto-importing. | Requires working account persistence; invalid data is excluded or rejected, and originals are not silently removed. |
| Published-content runtime | `/api/guides/[milestoneId]` returns bundled dossiers when the provider is unconfigured; with Supabase configured it fetches a validated **published** guide revision. Authenticated workspaces can read published deadline overrides, including intake-specific precedence. | A configured provider without seeded/published guides returns an explicit unavailable response instead of silently serving bundled content. Editing and publication are different capabilities. |
| Administration | Invite-only admin access, TOTP step-up, overview counts, user search/status and Waymark-session revocation, guide/deadline draft editors and previews, revision history/restore-as-new-draft, in-app announcement publish/archive, and audit-log views. | These routes and migrations are local/uncommitted. Publishing a guide or deadline is **disabled in the UI and rejected by the Next server action** because the privacy-safe affected-plan impact function always returns unavailable. The separately callable SQL publication RPC does **not** enforce that impact gate; it requires an authenticated AAL2 administrator. Announcements are in-app, not email campaigns. |
| Motion and shared shell refinements | The local landing adds an infinity-to-aircraft scroll sequence, destination presentation refinements, common navigation/footer and an experimental `/showcase` motion page. | The exact local flight/checkpoint/account experience is **not** in the clean `develop` preview. `/showcase` has a hard-coded “Lighthouse Perf 99” demo counter; it is not a measured performance result. |

## 4. Student journey and workflows

1. **Discover.** Visit the landing page, browse seven country cards or inspect the sample journey, then select **Build my route** or a destination link. No account is required to inspect the public planner.
2. **Choose a target.** On `/path`, specify a stage, destination and one of its listed intakes. The form shows an unsaved consequence preview: dates, counts, confidence mix, country-specific admissions caveat and first steps. A linked destination remains a draft until confirmed.
3. **Confirm and orient.** Confirm the target (or, in the local working tree, explicitly choose a temporary guest preview versus an account save). Go to Today for the next action. A sample/default plan may be shown before any personal target is chosen; it should not be mistaken for an already saved plan.
4. **Plan and act.** Use Today for focus and blockers, Steps for the phased checklist, and Route for the overall date/dependency picture. Open a milestone guide for instructions, source links and preparation resources. Mark a **milestone**, not each subtask, done; the engine recomputes status and the next step from the selected intake, today's date, dependencies and recorded completions.
5. **Track more detail (local implementation).** Open a checkpoint, start it, add evidence, follow suggested weekly tasks, complete it after prerequisites or skip it with a reason. The skip is recorded but does not unblock subsequent tasks. Guest evidence is temporary; signed-in writes require a verified account and a successful server response.
6. **Revisit or change direction.** Return to `/path` to compare a different target without writing until confirmation. In the account-backed local design, selecting a previously saved intake restores its own checklist; in `develop`, there is only browser-wide profile/tick storage, not cloud-separated intake plans. An optional, reviewed legacy import supports transition from that older storage model.
7. **Reset with caution.** Both versions have a progress-clear affordance; `develop` also offers a separate **Erase everything** action for browser target and ticks. The local implementation currently has an unresolved **destructive reset mismatch**: UI copy says only ticks are cleared while account SQL deletes every progress row for that plan (including checkpoint evidence/history), and guest reset also clears checkpoints. Do not treat this workflow as product-complete until copy or behavior is corrected and tested.

**Administrator workflow (local implementation only):** an operator provisions admin membership; an authenticated administrator completes TOTP step-up, then reviews user access, prepares guide/deadline drafts, inspects revision history and audit entries, and can send targeted in-app announcements. Draft publication cannot currently be completed **through the UI/server action** because affected-plan impact preview is missing; the SQL RPC still allows an authorized AAL2 admin to publish without that preview.

## 5. Frontend, backend, database and integrations

### Frontend

- **Stack:** Next.js 16.4.2 App Router, React 19.3, TypeScript, CSS/Tailwind 4, Next Image and Geist fonts. Route-level styles and shared shell components separate public pages from planning views.
- **Rendering/state:** `/today`, `/steps`, `/route` and `/path` use request-time server shells; initial dated sample HTML is hydrated into the client workspace view. The engine is a pure TypeScript calculation and does not need a database or API to derive dates. The local account variant initializes a mounted client store and refreshes verified workspace data through `/api/workspace`.
- **Motion/accessibility:** Three.js/React Three Fiber, GSAP/ScrollTrigger, Lenis and React View Transitions support the cinematic entry and navigation. Reduced-motion and unavailable-WebGL fallbacks exist; touch scrolling is not forced through desktop pinning. The planner includes semantic controls, focus handling and keyboard-operable navigation, but this is **not** a full accessibility certification.

### Colour palette — verified against the CSS

The following are the **named base colour tokens**, not an exhaustive list of every component-level colour. I checked the `@theme` values in both the clean `develop` checkout and the uncommitted working tree: all twelve token declarations match (eleven distinct hex values, because ink repeats forest). Their **usage can differ** between those checkouts. Source: [`src/app/globals.css`](src/app/globals.css) (`@theme` and `:root`); examples: [`src/app/path/path.css`](src/app/path/path.css), [`src/app/steps/steps.css`](src/app/steps/steps.css) and [`src/app/today/today.css`](src/app/today/today.css).

| Role | CSS token | Hex | Code-backed use or constraint |
| --- | --- | --- | --- |
| Page field | `--color-porcelain` | `#E8F2F5` | Pale cloud-blue canvas; `--paper` aliases it. |
| Secondary surface | `--color-parchment` | `#C3DEEC` | Pale sky; used behind `/path` gallery images. |
| Raised surface | `--color-halfwhite` | `#F6FBFD` | Near-white cards and lighter content surfaces. |
| Primary ink / dark field | `--color-forest` and same-value `--color-ink` | `#09241C` | Main dark-green ink; `--field` references forest for dark sections and controls. |
| Deep ink | `--color-forest-deep` | `#05140F` | Darkest body text and some controls/hover states. |
| Softer ink | `--color-ink-soft` | `#3F736C` | Teal supporting copy and guide details. |
| Action accent | `--color-acid` | `#B1BE6A` | Field-lime highlights, arrows and visible focus on dark sections; the local-only navigation also uses it as a primary pill background. |
| Secondary accent | `--color-acid-dim` | `#C5C374` | Sunlit-khaki detail, including the landing status spark in `develop`. |
| Information accent | `--color-sky` | `#5BA9D1` | Sky-blue source for information/verified styling and the gallery wash; readable text uses a darker derived mix, not raw blue on the light page. |
| Decorative neutral | `--color-sage` | `#798D74` | Declared as decorative-only but not currently referenced by a component; not for body text. |
| Risk / caution | `--color-signal` | `#B22E2D` | Suit-red overdue/deadline and destructive-warning treatments, not the normal call-to-action colour. |

**Semantic mixtures:** `--color-sky-wash` mixes 12% sky into porcelain; `--color-sky-ink` mixes 55% forest with sky; `--color-sky-on-forest` mixes 58% sky with porcelain for dark fields; `--color-signal-wash` mixes 8% red into halfwhite. These are CSS `color-mix()` expressions, **not fixed hex tokens**. In `develop`, the gallery sits on sky wash, verified status is a blue-wash/dark-ink pairing, and overdue work uses a red-tinted wash. The local working tree keeps the same base tokens but changes some applications, such as a lime/forest navigation pill and a full-width overdue-row layout in place of the `develop` risk grid.

**Contrast qualification:** independently calculated from the base hex values, forest on porcelain is **14.41:1**, lime on forest **8.15:1**, and soft ink on porcelain **4.76:1**. Raw sky on porcelain is only **2.29:1** and sage on porcelain **3.14:1**; do not treat either as ordinary small-text colour on that canvas. Those calculations are for these specific opaque pairs, **not** a blanket WCAG certification of every component, transparency, state or device. The CSS comments describe an artwork-derived palette; this review verified the code and token usage, not a new resampling of the artwork.

### Backend and data (local implementation only)

- **HTTP/server actions:** Next route handlers expose `/api/workspace` (read), target selection, tick writes, checkpoint actions, reset and reviewed legacy import, plus guide reads. Authentication, recovery, MFA and administration use server routes/actions rather than a separate backend service.
- **Provider:** Supabase SSR/Auth and PostgreSQL are intended for identity, published content and workspace persistence. Google/Apple are optional OAuth providers behind explicit environment flags; Supabase Auth handles account verification and password-reset email when configured. No provider-issued credentials are supplied or verified by this repository.
- **Schema/migrations:** two local SQL migrations define profiles/admin membership; country, intake and milestone catalog; per-user plans and progress; legacy-import records; guide/deadline revisions; announcements and read receipts; and append-only administrative audit events. The checkpoint migration extends progress with evidence, status and recent history. A catalog exporter and **SQL-generation** seed script exist; generating SQL is not the same as applying migrations/seeds to hosted Supabase.
- **Security boundary in source:** Row-level security, owner-scoped reads, database-owned admin membership, TOTP/AAL2 checks, narrow security-definer mutation RPCs, same-origin write checks, input schemas, non-public workspace responses and plan-version conflict checks. The code does not grant a browser-submitted owner ID or signup metadata administrator authority. **Exception to the intended publication workflow:** the SQL `admin_publish_revision` RPC lacks the application's affected-plan-preview gate and is executable by an authenticated AAL2 administrator. These safeguards have local tests; they are **not proof of live provider configuration or hosted isolation**.
- **Assets/third parties:** `/path` country views are local licensed WebP files with visible credits; landing cards reference Unsplash image URLs. Guide resources link out to relevant external official/learning pages. There is no implemented payment provider, messaging campaign, automatic university submission or document-upload service in the inspected routes.

## 6. Key technical and architectural decisions

1. **Backward scheduling instead of static advice.** Each milestone carries an offset, dependencies, tasks, source and confidence; `buildPlan` derives the due date and status from the chosen intake and current progress. Changing the target recalculates the plan. The engine is deterministic for an explicit date and can accept published deadline overrides in the local account variant.
2. **A single next step, with dependency semantics.** Actionable, unblocked steps take the `now`/`next` slots; late steps are marked risk. The fallback identifies an unfinished catch-up step if no on-time action remains. The same plan feeds Today, Steps and Route.
3. **Honest source labeling.** Research is dated, links are attached to milestones and `verified` is carefully distinguished from a verified *derived date*. Even a source-backed requirement may use an estimated planning offset. Students must confirm their own institution's current deadline.
4. **Preview before persistence.** Landing links and Path edits are unsaved drafts; a separate confirmation selects a target. The local account design isolates each saved intake and makes legacy browser-data migration explicit rather than silently copying data between users or intakes.
5. **Client computation, controlled persistence.** Public planning can operate from bundled data; account-backed writes are behind verified sessions, scoped SQL functions and optimistic version checks. Published guide content is separated from draft editorial content; missing publication fails explicitly once the service is configured.
6. **Time and hydration discipline.** Date-bearing pages render per request with a server-supplied clock. A fixed English short-month formatter avoids Node/WebKit locale differences; the first server/client view uses the same sample calculation. Long-open screens still require care around the date snapshot.
7. **Motion is supplementary.** Cinematic storytelling supports discovery, with reduced-motion, static-artwork and native-scroll paths; it is not needed for the planner's core calculations. This is a design choice, **not** an independently measured performance or WCAG claim.

## 7. How it differs from a conventional overseas-education website

| Conventional brochure or lead form | Waymark's code-backed approach |
| --- | --- |
| Destination and service pages as the main output | A dated, recalculated route for a chosen country and intake. |
| Broad “apply early” advice | Milestone-by-milestone planning offsets, urgency and prerequisites. |
| One undifferentiated checklist | Complementary focus (Today), progress (Steps), overview (Route) and target-comparison (Path) surfaces. |
| Unqualified facts and generic links | Explicit confidence labels, research caveats, named guide sections and source-linked resources. |
| Account wall before any value is shown | Public working planner and sample route without sign-in; the account layer is optional and not yet released. |

This differentiator is **workflow clarity and research transparency**, not proprietary admissions data, live deadline feeds or guaranteed outcomes. The country-level model is a starting point and must be checked against each programme and authority.

## 8. Implementation status, limitations and next release gates

| Status | Scope and evidence |
| --- | --- |
| **In merged `develop` source** | Public landing, four planner screens, 7 countries/28 intakes/104 milestones, written guides, browser-local target/ticks, credited 14-view country gallery and palette. The gallery/palette entered `develop` via PR #9 (`68d4535`). Presence in Git is **not** evidence of a hosted deployment. |
| **Built locally, not merged** | New guest/account persistence model, Supabase/auth endpoints, checkpoint evidence/history and pacing, legacy import, administrative UI and SQL contracts, some landing/guide/shell/motion changes, local CI workflow and extra tests. The working tree remains dirty; local migrations have not been shown applied to a hosted Waymark provider. |
| **Partially implemented / blocked** | Guide/deadline draft editing exists, but publication is blocked **in the app** pending a privacy-safe affected-plan count; the SQL RPC does not enforce that gate for AAL2 admins. Account/OAuth/email/MFA and cross-device save need a dedicated configured Supabase project, migrations/seed and real-provider tests. The reset warning conflicts with its destructive behavior; signup `display_name` metadata does not match the profile trigger's `full_name` field; an unchanged default guest target cannot be explicitly confirmed. |
| **Not provided by this codebase** | Course/university matching or eligibility scoring, direct applications, visa filing, payment/booking, counsellor workflow, bulk email, uploaded application documents, mobile apps, automated deadline ingestion, full internationalization or proven production operations. English-only (`lang="en"`) is implemented; multilingual support is a future possibility, not a shipped feature. |

**Verification on this snapshot:** on the dirty local checkout, `npm test` passed **122/122** unit tests, `npm run typecheck` passed and `npm run lint` passed. A read-only catalog count confirmed 7 countries, 28 intakes, 104 milestone IDs, 12 phases and 104 matching guide mappings. This document did **not** run the PostgreSQL integration suite, Playwright suite, build, hosted login or provider migrations. Historical checkpoint evidence records isolated PostgreSQL tests with **emulated Auth**, mocked/browser checks and a separate scoped `develop` gallery release test run; those are useful development evidence, not live service proof.

**Highest-priority gates before presenting the local account/admin work as a released capability:** choose and implement honest reset semantics; correct the signup/profile metadata mapping and default-target confirmation; implement a privacy-safe publication impact preview **and enforce its gate at the database boundary or withhold direct SQL RPC execution** before enabling guide/deadline publication; provision a dedicated Waymark Supabase project, apply/verify migrations and catalog seed, configure email/OAuth/MFA, and run real-provider negative-path and cross-device tests. Re-check source facts and intake dates before use in a live student journey.

### Source map for reviewers

- Product/catalog/engine: [`src/lib/engine/country-cycles.ts`](src/lib/engine/country-cycles.ts), [`src/lib/engine/plan.ts`](src/lib/engine/plan.ts), [`src/lib/engine/guides/content/index.ts`](src/lib/engine/guides/content/index.ts), [`src/lib/engine/guides/types.ts`](src/lib/engine/guides/types.ts).
- Student screens: [`src/app/path/path-form.tsx`](src/app/path/path-form.tsx), [`src/app/today/today-screen.tsx`](src/app/today/today-screen.tsx), [`src/app/steps/steps-screen.tsx`](src/app/steps/steps-screen.tsx), [`src/app/route/route-graph.tsx`](src/app/route/route-graph.tsx), [`src/components/checkpoint/CheckpointPanel.tsx`](src/components/checkpoint/CheckpointPanel.tsx).
- Identity and workspace (local only): [`src/lib/auth/actions.ts`](src/lib/auth/actions.ts), [`src/lib/auth/session-core.ts`](src/lib/auth/session-core.ts), [`src/lib/workspace/store.ts`](src/lib/workspace/store.ts), [`src/lib/workspace/server.ts`](src/lib/workspace/server.ts), [`src/app/api/workspace/`](src/app/api/workspace/), [`src/app/account/page.tsx`](src/app/account/page.tsx).
- Admin/database (local only): [`src/lib/admin/actions.ts`](src/lib/admin/actions.ts), [`src/lib/admin/impact.ts`](src/lib/admin/impact.ts), [`supabase/migrations/`](supabase/migrations/), [`scripts/db/seed.ts`](scripts/db/seed.ts), [`src/app/admin/`](src/app/admin/).
- Release and historical test boundaries: [`CHECKPOINT.md`](CHECKPOINT.md), [`README.md`](README.md), [`package.json`](package.json), [`docs/accounts-admin-plan.md`](docs/accounts-admin-plan.md). The feature status in this overview is based on source inspection, not on an unchecked planning document.
