import type { Guide, GuideContent } from "../types";
import { ARCHETYPE_SECTIONS } from "../archetypes";

/*
 * Per-file lazy loading.
 *
 * `FILE_OF` is a small static map (milestone id -> content file key).
 * `LOADERS` is a small map (file key -> dynamic import). Neither pulls
 * any dossier text into the initial bundle: a file is fetched only the
 * first time a student opens one of its milestones, and then cached.
 */

const LOADERS: Record<string, () => Promise<Record<string, GuideContent>>> = {
  "application": () => import("./application").then((m) => m.APPLICATION),
  "documents-profile": () => import("./documents-profile").then((m) => m.DOCUMENTS_PROFILE),
  "housing": () => import("./housing").then((m) => m.HOUSING),
  "language-test": () => import("./language-test").then((m) => m.LANGUAGE_TEST),
  "offer-enrolment": () => import("./offer-enrolment").then((m) => m.OFFER_ENROLMENT),
  "personal-statement": () => import("./personal-statement").then((m) => m.PERSONAL_STATEMENT),
  "pre-departure": () => import("./pre-departure").then((m) => m.PRE_DEPARTURE),
  "references": () => import("./references").then((m) => m.REFERENCES),
  "research-contact": () => import("./research-contact").then((m) => m.RESEARCH_CONTACT),
  "scholarship-funding": () => import("./scholarship-funding").then((m) => m.SCHOLARSHIP_FUNDING),
  "standardised-test": () => import("./standardised-test").then((m) => m.STANDARDISED_TEST),
  "university-shortlist": () => import("./university-shortlist").then((m) => m.UNIVERSITY_SHORTLIST),
  "visa-au": () => import("./visa-au").then((m) => m.VISA_AU),
  "visa-ca": () => import("./visa-ca").then((m) => m.VISA_CA),
  "visa-de": () => import("./visa-de").then((m) => m.VISA_DE),
  "visa-fr": () => import("./visa-fr").then((m) => m.VISA_FR),
  "visa-gb": () => import("./visa-gb").then((m) => m.VISA_GB),
  "visa-sg": () => import("./visa-sg").then((m) => m.VISA_SG),
  "visa-us": () => import("./visa-us").then((m) => m.VISA_US),
};

const FILE_OF: Record<string, string> = {
  "au-app-submit": "application",
  "au-english": "language-test",
  "au-financial-capacity": "visa-au",
  "au-gs-requirement": "visa-au",
  "au-housing": "housing",
  "au-offer-accept": "offer-enrolment",
  "au-oshc": "pre-departure",
  "au-pre-departure": "pre-departure",
  "au-profile-cv": "documents-profile",
  "au-references": "references",
  "au-scholarships": "scholarship-funding",
  "au-shortlist": "university-shortlist",
  "au-sop": "personal-statement",
  "au-visa-decision": "visa-au",
  "au-visa-lodge": "visa-au",
  "ca-app-submit": "application",
  "ca-english": "language-test",
  "ca-funding-apps": "scholarship-funding",
  "ca-housing": "housing",
  "ca-offer-accept": "offer-enrolment",
  "ca-pal-check": "visa-ca",
  "ca-permit-decision": "visa-ca",
  "ca-pre-departure": "pre-departure",
  "ca-profile-cv": "documents-profile",
  "ca-proof-funds": "visa-ca",
  "ca-references": "references",
  "ca-shortlist": "university-shortlist",
  "ca-sop": "personal-statement",
  "ca-study-permit": "visa-ca",
  "ca-supervisor": "research-contact",
  "de-admission": "offer-enrolment",
  "de-anabin": "documents-profile",
  "de-app-submit": "application",
  "de-aps": "documents-profile",
  "de-arrival-registration": "pre-departure",
  "de-blocked-account": "visa-de",
  "de-english": "language-test",
  "de-housing": "housing",
  "de-profile-cv": "documents-profile",
  "de-references": "references",
  "de-shortlist": "university-shortlist",
  "de-sop": "personal-statement",
  "de-visa-appointment": "visa-de",
  "de-visa-decision": "visa-de",
  "fr-admission": "offer-enrolment",
  "fr-app-submit": "application",
  "fr-eef": "visa-fr",
  "fr-english": "language-test",
  "fr-housing": "housing",
  "fr-pre-departure": "pre-departure",
  "fr-profile-cv": "documents-profile",
  "fr-proof-finances": "visa-fr",
  "fr-references": "references",
  "fr-shortlist": "university-shortlist",
  "fr-sop": "personal-statement",
  "fr-visa-appointment": "visa-fr",
  "fr-visa-processing": "visa-fr",
  "fr-vls-validation": "pre-departure",
  "gb-app-submit": "application",
  "gb-atas": "visa-gb",
  "gb-cas": "visa-gb",
  "gb-english": "language-test",
  "gb-housing": "housing",
  "gb-ihs": "visa-gb",
  "gb-money": "visa-gb",
  "gb-offer-accept": "offer-enrolment",
  "gb-pre-departure": "pre-departure",
  "gb-profile-cv": "documents-profile",
  "gb-references": "references",
  "gb-shortlist": "university-shortlist",
  "gb-sop": "personal-statement",
  "gb-visa-apply": "visa-gb",
  "gb-visa-decision": "visa-gb",
  "sg-app-submit": "application",
  "sg-degree-verification": "offer-enrolment",
  "sg-english": "language-test",
  "sg-housing": "housing",
  "sg-ica-stp": "visa-sg",
  "sg-ipa-visa": "visa-sg",
  "sg-medical": "pre-departure",
  "sg-offer-accept": "offer-enrolment",
  "sg-ose": "visa-sg",
  "sg-pre-departure": "pre-departure",
  "sg-profile-cv": "documents-profile",
  "sg-references": "references",
  "sg-scholarship": "scholarship-funding",
  "sg-shortlist": "university-shortlist",
  "sg-sop": "personal-statement",
  "us-app-submit": "application",
  "us-arrival": "pre-departure",
  "us-documents-upload": "documents-profile",
  "us-ds160": "visa-us",
  "us-english": "language-test",
  "us-funding": "scholarship-funding",
  "us-gre": "standardised-test",
  "us-housing": "housing",
  "us-i20": "visa-us",
  "us-offer-accept": "offer-enrolment",
  "us-profile-cv": "documents-profile",
  "us-recommendations": "references",
  "us-sevis-orientation": "pre-departure",
  "us-shortlist": "university-shortlist",
  "us-sop": "personal-statement",
  "us-visa-interview": "visa-us",
};

const fileCache = new Map<string, Promise<Record<string, GuideContent>>>();

function loadFile(fileKey: string): Promise<Record<string, GuideContent>> {
  let pending = fileCache.get(fileKey);
  if (!pending) {
    const loader = LOADERS[fileKey];
    pending = loader ? loader() : Promise.resolve({});
    fileCache.set(fileKey, pending);
  }
  return pending;
}

/** Every milestone that has a dossier. */
export function milestonesWithGuides(): string[] {
  return Object.keys(FILE_OF);
}

/**
 * The dossier for a milestone, assembled from the archetype's canonical
 * sections and the milestone's own body.
 *
 * A section with no body is dropped, and so is its label — the row and the
 * sheet can never offer a link that opens nothing.
 */
export async function guideFor(milestoneId: string): Promise<Guide | null> {
  const fileKey = FILE_OF[milestoneId];
  if (!fileKey) return null;
  const content = (await loadFile(fileKey))[milestoneId];
  if (!content) return null;
  const specs = ARCHETYPE_SECTIONS[content.archetype] ?? [];
  const sections = specs
    .map((spec) => {
      const body = content.sections[spec.id];
      if (!body || !hasContent(body)) return null;
      return { ...spec, content: body };
    })
    .filter((section): section is NonNullable<typeof section> => section !== null);
  if (sections.length === 0) return null;
  return { archetype: content.archetype, intro: content.intro, sections };
}

/** Whether a section actually says anything. */
function hasContent(body: Record<string, unknown>): boolean {
  return Object.values(body).some(
    (value) =>
      (typeof value === "string" && value.trim().length > 0) ||
      (Array.isArray(value) && value.length > 0),
  );
}

