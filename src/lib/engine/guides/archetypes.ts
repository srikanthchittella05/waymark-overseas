/*
 * The archetype registry.
 *
 * An archetype is a KIND of checkpoint. Every milestone belongs to one, and the
 * archetype declares the sections its dossier will have — including the label
 * shown on the milestone row.
 *
 * The labels are the point of this file. A milestone row exposes named links,
 * and each label must name the value the student gets: "Which test, and which
 * score", "When to book it", "Your 12-week roadmap". Never "View more", never a
 * count, never "Details". A student should be able to read the row and know
 * what clicking will give them.
 *
 * Because the labels live here and not in the content, the row and the sheet
 * can never disagree about what a section is called, and the content can be
 * loaded lazily without the row waiting for it.
 */

import type { GuideArchetype, GuideSectionSpec } from "./types";

/**
 * The canonical sections of every archetype, in order. The first section is
 * where the sheet lands when a student opens a milestone without naming one.
 */
export const ARCHETYPE_SECTIONS: Record<GuideArchetype, GuideSectionSpec[]> = {
  "language-test": [
    { id: "exams", navLabel: "Which test, and which score", title: "Which test, and which score", eyebrow: "01 / THE TEST" },
    { id: "timing", navLabel: "When to book it", title: "When to book it", eyebrow: "02 / WHEN TO BOOK" },
    { id: "inside", navLabel: "What's inside the test", title: "What's inside the test", eyebrow: "03 / INSIDE THE TEST" },
    { id: "roadmap", navLabel: "Your study roadmap", title: "Your study roadmap", eyebrow: "04 / THE ROADMAP" },
    { id: "resources", navLabel: "Books, videos and practice tests", title: "Books, videos and practice tests", eyebrow: "05 / THE MATERIALS" },
  ],
  "standardised-test": [
    { id: "choose", navLabel: "Which test, and when to take it", title: "Which test, and when to take it", eyebrow: "01 / THE DECISION" },
    { id: "format", navLabel: "How it's scored", title: "How it's scored", eyebrow: "02 / THE FORMAT" },
    { id: "roadmap", navLabel: "Your prep timeline", title: "Your prep timeline", eyebrow: "03 / THE TIMELINE" },
    { id: "resources", navLabel: "Books and practice tests", title: "Books and practice tests", eyebrow: "04 / THE MATERIALS" },
  ],
  "university-shortlist": [
    { id: "method", navLabel: "How to build a shortlist that survives", title: "How to build a shortlist that survives", eyebrow: "01 / THE METHOD" },
    { id: "criteria", navLabel: "What admissions actually weigh", title: "What admissions actually weigh", eyebrow: "02 / THE CRITERIA" },
    { id: "traps", navLabel: "Where students lose offers", title: "Where students lose offers", eyebrow: "03 / THE TRAPS" },
    { id: "tools", navLabel: "Official directories and tools", title: "Official directories and tools", eyebrow: "04 / THE TOOLS" },
  ],
  "application": [
    { id: "routes", navLabel: "Which route, and what it asks for", title: "Which route, and what it asks for", eyebrow: "01 / THE ROUTE" },
    { id: "timeline", navLabel: "Your submission timeline", title: "Your submission timeline", eyebrow: "02 / THE TIMELINE" },
    { id: "checklist", navLabel: "Every document, in order", title: "Every document, in order", eyebrow: "03 / THE CHECKLIST" },
    { id: "essays", navLabel: "What the essays are really asking", title: "What the essays are really asking", eyebrow: "04 / THE ESSAYS" },
    { id: "traps", navLabel: "Where applications get rejected", title: "Where applications get rejected", eyebrow: "05 / THE TRAPS" },
    { id: "resources", navLabel: "Official portals and guides", title: "Official portals and guides", eyebrow: "06 / THE MATERIALS" },
  ],
  "personal-statement": [
    { id: "brief", navLabel: "What they actually want to read", title: "What they actually want to read", eyebrow: "01 / THE BRIEF" },
    { id: "structure", navLabel: "How to structure it", title: "How to structure it", eyebrow: "02 / THE STRUCTURE" },
    { id: "pitfalls", navLabel: "The mistakes that cost offers", title: "The mistakes that cost offers", eyebrow: "03 / THE MISTAKES" },
    { id: "examples", navLabel: "What strong openings look like", title: "What strong openings look like", eyebrow: "04 / THE EXAMPLES" },
  ],
  "references": [
    { id: "who", navLabel: "Who to ask, and when", title: "Who to ask, and when", eyebrow: "01 / WHO TO ASK" },
    { id: "brief", navLabel: "How to ask well", title: "How to ask well", eyebrow: "02 / HOW TO ASK" },
    { id: "dossier", navLabel: "What to give them", title: "What to give them", eyebrow: "03 / THE PACK" },
    { id: "traps", navLabel: "What referees get wrong", title: "What referees get wrong", eyebrow: "04 / THE TRAPS" },
  ],
  "documents-profile": [
    { id: "inventory", navLabel: "Every document, and where to get it", title: "Every document, and where to get it", eyebrow: "01 / THE INVENTORY" },
    { id: "formats", navLabel: "What 'official' means", title: "What 'official' means", eyebrow: "02 / THE FORMATS" },
    { id: "translation", navLabel: "Certified translations", title: "Certified translations", eyebrow: "03 / TRANSLATIONS" },
    { id: "expiry", navLabel: "Expiry and validity traps", title: "Expiry and validity traps", eyebrow: "04 / THE EXPIRY TRAPS" },
  ],
  "scholarship-funding": [
    { id: "schemes", navLabel: "Which schemes you can get", title: "Which schemes you can get", eyebrow: "01 / THE SCHEMES" },
    { id: "amounts", navLabel: "What each one is worth", title: "What each one is worth", eyebrow: "02 / THE AMOUNTS" },
    { id: "windows", navLabel: "Application windows", title: "Application windows", eyebrow: "03 / THE WINDOWS" },
    { id: "strategy", navLabel: "How to make a strong case", title: "How to make a strong case", eyebrow: "04 / THE STRATEGY" },
    { id: "resources", navLabel: "Where to find every scheme", title: "Where to find every scheme", eyebrow: "05 / THE DIRECTORY" },
  ],
  "offer-enrolment": [
    { id: "offer", navLabel: "Reading the offer", title: "Reading the offer", eyebrow: "01 / THE OFFER" },
    { id: "conditions", navLabel: "Clearing the conditions", title: "Clearing the conditions", eyebrow: "02 / THE CONDITIONS" },
    { id: "money", navLabel: "What it costs, and when you pay", title: "What it costs, and when you pay", eyebrow: "03 / THE MONEY" },
    { id: "decide", navLabel: "If you are not sure", title: "If you are not sure", eyebrow: "04 / THE DECISION" },
    { id: "checklist", navLabel: "Your enrolment checklist", title: "Your enrolment checklist", eyebrow: "05 / THE CHECKLIST" },
  ],
  "visa": [
    { id: "route", navLabel: "Which visa, and which route", title: "Which visa, and which route", eyebrow: "01 / THE ROUTE" },
    { id: "documents", navLabel: "Every document, in order", title: "Every document, in order", eyebrow: "02 / THE DOCUMENTS" },
    { id: "appointments", navLabel: "Biometrics, interviews and appointments", title: "Biometrics, interviews and appointments", eyebrow: "03 / THE APPOINTMENTS" },
    { id: "money", navLabel: "Proving money", title: "Proving money", eyebrow: "04 / THE MONEY" },
    { id: "rules", navLabel: "The rules that catch people out", title: "The rules that catch people out", eyebrow: "05 / THE RULES" },
    { id: "timing", navLabel: "How long it takes", title: "How long it takes", eyebrow: "06 / THE TIMING" },
    { id: "resources", navLabel: "Official checklists and trackers", title: "Official checklists and trackers", eyebrow: "07 / THE MATERIALS" },
  ],
  "housing": [
    { id: "options", navLabel: "Halls or private?", title: "Halls or private?", eyebrow: "01 / THE OPTIONS" },
    { id: "timing", navLabel: "When applications open", title: "When applications open", eyebrow: "02 / THE TIMING" },
    { id: "money", navLabel: "Deposit, contract and cost", title: "Deposit, contract and cost", eyebrow: "03 / THE MONEY" },
    { id: "viewing", navLabel: "What to look at in a viewing", title: "What to look at in a viewing", eyebrow: "04 / THE VIEWING" },
    { id: "resources", navLabel: "Cost data and city guides", title: "Cost data and city guides", eyebrow: "05 / THE DATA" },
  ],
  "pre-departure": [
    { id: "checklist", navLabel: "Your departure checklist", title: "Your departure checklist", eyebrow: "01 / THE CHECKLIST" },
    { id: "health", navLabel: "Health and insurance", title: "Health and insurance", eyebrow: "02 / HEALTH" },
    { id: "travel", navLabel: "Flights and arrival", title: "Flights and arrival", eyebrow: "03 / TRAVEL" },
    { id: "firstweek", navLabel: "The first week", title: "The first week", eyebrow: "04 / THE FIRST WEEK" },
    { id: "resources", navLabel: "Official arrival guides", title: "Official arrival guides", eyebrow: "05 / THE MATERIALS" },
  ],
  "research-contact": [
    { id: "find", navLabel: "How to find a supervisor", title: "How to find a supervisor", eyebrow: "01 / FINDING" },
    { id: "approach", navLabel: "How to approach them", title: "How to approach them", eyebrow: "02 / THE EMAIL" },
    { id: "dossier", navLabel: "What to put in your first message", title: "What to put in your first message", eyebrow: "03 / THE FIRST MESSAGE" },
    { id: "timing", navLabel: "When to start, and how long it takes", title: "When to start, and how long it takes", eyebrow: "04 / THE TIMING" },
  ],
};

/**
 * Which archetype every milestone belongs to. Keyed by milestone id.
 *
 * The default is the milestone's phase; the exceptions are milestones whose
 * real subject differs from the phase they were filed under.
 */
export const MILESTONE_ARCHETYPE: Record<string, GuideArchetype> = {
  "us-profile-cv": "documents-profile",
  "us-shortlist": "university-shortlist",
  "us-english": "language-test",
  "us-gre": "standardised-test",
  "us-sop": "personal-statement",
  "us-recommendations": "references",
  "us-documents-upload": "documents-profile",
  "us-app-submit": "application",
  "us-funding": "scholarship-funding",
  "us-offer-accept": "offer-enrolment",
  "us-i20": "visa",
  "us-ds160": "visa",
  "us-visa-interview": "visa",
  "us-housing": "housing",
  "us-arrival": "pre-departure",
  "us-sevis-orientation": "pre-departure",
  "gb-profile-cv": "documents-profile",
  "gb-shortlist": "university-shortlist",
  "gb-english": "language-test",
  "gb-references": "references",
  "gb-sop": "personal-statement",
  "gb-app-submit": "application",
  "gb-offer-accept": "offer-enrolment",
  "gb-atas": "visa",
  "gb-cas": "visa",
  "gb-money": "visa",
  "gb-ihs": "visa",
  "gb-visa-apply": "visa",
  "gb-visa-decision": "visa",
  "gb-housing": "housing",
  "gb-pre-departure": "pre-departure",
  "ca-profile-cv": "documents-profile",
  "ca-shortlist": "university-shortlist",
  "ca-english": "language-test",
  "ca-supervisor": "research-contact",
  "ca-sop": "personal-statement",
  "ca-references": "references",
  "ca-funding-apps": "scholarship-funding",
  "ca-app-submit": "application",
  "ca-offer-accept": "offer-enrolment",
  "ca-pal-check": "visa",
  "ca-proof-funds": "visa",
  "ca-study-permit": "visa",
  "ca-permit-decision": "visa",
  "ca-housing": "housing",
  "ca-pre-departure": "pre-departure",
  "au-profile-cv": "documents-profile",
  "au-english": "language-test",
  "au-shortlist": "university-shortlist",
  "au-sop": "personal-statement",
  "au-references": "references",
  "au-app-submit": "application",
  "au-scholarships": "scholarship-funding",
  "au-offer-accept": "offer-enrolment",
  "au-oshc": "pre-departure",
  "au-financial-capacity": "visa",
  "au-gs-requirement": "visa",
  "au-visa-lodge": "visa",
  "au-visa-decision": "visa",
  "au-housing": "housing",
  "au-pre-departure": "pre-departure",
  "de-anabin": "documents-profile",
  "de-aps": "documents-profile",
  "de-profile-cv": "documents-profile",
  "de-english": "language-test",
  "de-shortlist": "university-shortlist",
  "de-references": "references",
  "de-sop": "personal-statement",
  "de-app-submit": "application",
  "de-admission": "offer-enrolment",
  "de-housing": "housing",
  "de-blocked-account": "visa",
  "de-visa-appointment": "visa",
  "de-visa-decision": "visa",
  "de-arrival-registration": "pre-departure",
  "fr-profile-cv": "documents-profile",
  "fr-shortlist": "university-shortlist",
  "fr-english": "language-test",
  "fr-references": "references",
  "fr-sop": "personal-statement",
  "fr-app-submit": "application",
  "fr-admission": "offer-enrolment",
  "fr-housing": "housing",
  "fr-eef": "visa",
  "fr-visa-appointment": "visa",
  "fr-proof-finances": "visa",
  "fr-visa-processing": "visa",
  "fr-pre-departure": "pre-departure",
  "fr-vls-validation": "pre-departure",
  "sg-profile-cv": "documents-profile",
  "sg-shortlist": "university-shortlist",
  "sg-english": "language-test",
  "sg-references": "references",
  "sg-sop": "personal-statement",
  "sg-app-submit": "application",
  "sg-scholarship": "scholarship-funding",
  "sg-offer-accept": "offer-enrolment",
  "sg-degree-verification": "offer-enrolment",
  "sg-medical": "pre-departure",
  "sg-ica-stp": "visa",
  "sg-ipa-visa": "visa",
  "sg-ose": "visa",
  "sg-housing": "housing",
  "sg-pre-departure": "pre-departure",
};

/** The archetype a milestone belongs to, or null if it has none. */
export function archetypeFor(milestoneId: string): GuideArchetype | null {
  return MILESTONE_ARCHETYPE[milestoneId] ?? null;
}

/** The named links a milestone row should show. */
export function navLabelsFor(milestoneId: string): GuideSectionSpec[] {
  const archetype = archetypeFor(milestoneId);
  if (!archetype) return [];
  return ARCHETYPE_SECTIONS[archetype];
}
