import { COUNTRY_CYCLES } from "./country-cycles";

/*
 * The landing gallery is derived from the same country list the engine
 * supports, so the destinations we advertise and the destinations we can
 * actually build a dated plan for can never drift apart.
 *
 * The order here is the editorial order on the landing page, not the
 * alphabetical order of the engine.
 */

export type Destination = {
  /** Must match a CountryCycle.code. */
  code: string;
  city: string;
  /** Shown on the card, e.g. "40.71° N". */
  coords: string;
  /** One short line. Never a promise about admissions. */
  line: string;
  image: string;
  alt: string;
};

const IMG = "https://images.unsplash.com/photo-";

export const DESTINATIONS: Destination[] = [
  {
    code: "US",
    city: "Chicago",
    coords: "41.88° N",
    line: "Room to think bigger.",
    image: `${IMG}1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85`,
    alt: "Chicago Board of Trade Building at the end of LaSalle Street at dusk",
  },
  {
    code: "GB",
    city: "London",
    coords: "51.50° N",
    line: "A different point of view.",
    image: `${IMG}1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85`,
    alt: "Westminster and the River Thames in London",
  },
  {
    code: "CA",
    city: "Toronto",
    coords: "43.65° N",
    line: "A new kind of familiar.",
    image: `${IMG}1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=85`,
    alt: "Toronto skyline with the CN Tower",
  },
  {
    code: "AU",
    city: "Sydney",
    coords: "33.86° S",
    line: "Let your horizons stretch.",
    image: `${IMG}1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85`,
    alt: "Sydney Harbour and the Opera House",
  },
  {
    code: "DE",
    city: "Berlin",
    coords: "52.52° N",
    line: "Built for the long haul.",
    image: `${IMG}1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=85`,
    alt: "The Brandenburg Gate in Berlin",
  },
  {
    code: "FR",
    city: "Paris",
    coords: "48.86° N",
    line: "Closer to the life you want.",
    image: `${IMG}1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85`,
    alt: "The Eiffel Tower and the Seine in Paris",
  },
  {
    code: "SG",
    city: "Singapore",
    coords: "1.35° N",
    line: "Where the distance disappears.",
    image: `${IMG}1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85`,
    alt: "Marina Bay Sands and the ArtScience Museum in Singapore",
  },
];

/** Country names in engine order, for the "we cover N countries" line. */
export const SUPPORTED_COUNTRIES = COUNTRY_CYCLES.map((c) => ({
  code: c.code,
  name: c.name,
  admission: c.admission,
}));

/**
 * Development guard: every card must point at a country the engine can
 * actually build a plan for, and every supported country must be shown.
 * Run in CI or a test — a mismatch means the landing is over- or
 * under-promising, which is the exact failure mode we are avoiding.
 */
export function assertDestinationsMatchEngine(): string[] {
  const engine = new Set(COUNTRY_CYCLES.map((c) => c.code));
  const shown = new Set(DESTINATIONS.map((d) => d.code));
  const problems: string[] = [];
  for (const d of DESTINATIONS) {
    if (!engine.has(d.code)) problems.push(`card "${d.city}" (${d.code}) has no engine cycle`);
  }
  for (const code of engine) {
    if (!shown.has(code)) problems.push(`engine country ${code} is missing from the gallery`);
  }
  return problems;
}
