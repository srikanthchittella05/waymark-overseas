# CSS module processing boundary

## Observed failure and installed behavior

The UI review found empty auth/admin/account CSS-module exports in both existing
and fresh development caches, with empty DOM class names and content behind the
header. See `logs/ui-review-2026-10-26-0AvjXi/css-module-exports.json` and
`probe-fresh-cache.json` in the same directory.

Installed Next.js is **16.4.2**; `@tailwindcss/turbopack` is **4.3.3**. Its actual
`dist/index.js` loader returns CSS unchanged when no Tailwind-related directives
are present. Directly executing that installed loader against all three affected
source modules confirmed byte-for-byte unchanged output. The loader itself does
not generate CSS-module class exports.

The previous `"*.css"` rule matched module filenames too and applied `as: "*.css"`.
Installed Next.js types document `as` as an output-extension rename; the installed
Turbopack guide distinguishes native `.module.css` processing from global CSS.
This output override is the leading suspect for the missing module mappings;
clearing the dev cache already failed to resolve them. End-to-end confirmation
still requires the parent runtime check.

## Narrow configuration change

`next.config.ts` applies the existing Tailwind loader/output rule only to the
non-foreign `globals.css` entry. A source inventory proves that this basename is
unique. All other source CSS, including modules, uses native processing.

The first candidate used `src/app/globals.css`, following the installed guide's
project-relative path description. The parent's actual dev check rejected it:
module layout classes returned, but `@theme` went unprocessed and the page lost its
theme variables. The basename selector avoids that root-relative matching mismatch;
both theme expansion and module styling must be checked together. The failed
candidate and server warning are retained in the UI-refinement evidence.

An inventory of all source CSS and its imports found only `globals.css` requires
Tailwind processing. It imports both Tailwind and Lenis and defines the shared
theme. The route/component styles and three modules contain ordinary CSS. A
direct installed-loader smoke check expanded the actual global stylesheet and
retained its theme variables, Lenis rules, site-header rules, and a `flex` utility.
This is loader-level evidence, not a browser or production-build verification.

`WAYMARK_BUILD_DIR`, cache settings, and allowed development origins are unchanged.
No dependencies or security exceptions were added.

## Regression scope and remaining runtime checks

Run `./node_modules/.bin/tsx --test tests/platform/css-config.test.ts`.
The tests guard the exact loader boundary, inventory Tailwind entrypoints, retain
the root global import, and check the existing output-directory flag. They do not
compile CSS modules or prove runtime class exports.

The parent must verify nonempty generated exports and DOM classes for auth,
account, and admin; header clearance on `/login`, `/account`, and `/admin`; planner
save-status notice styling; and intact shared theme/global/Tailwind styles. No
server was launched or explicitly restarted and no build was run for this change.

Installed references: `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`,
`01-app/03-api-reference/08-turbopack.md`, and
`01-app/03-api-reference/05-config/01-next-config-js/turbopack.md` under that docs root.
