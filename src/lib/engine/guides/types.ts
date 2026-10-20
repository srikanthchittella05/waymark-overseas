/*
 * The dossier schema.
 *
 * A milestone in the plan is a dated, sourced checkpoint. A milestone in the
 * PLAN is also an information surface: the student needs to know which test to
 * book, when the score has to be delivered, what is inside the exam, how to
 * prepare, and what to read. That detail lives here, apart from the plan's
 * dates, so the plan stays a plan and the depth stays available on demand.
 *
 * Two rules hold everywhere in this file:
 *
 *   1. A resource always says WHY. A bare link is an index; the reason is the
 *      value. `why` is required, never optional.
 *   2. A number is never a bare number. Anything that can change carries the
 *      date it was last checked against the official source, so the interface
 *      can say how old it is instead of pretending it is eternal.
 */

export type GuideArchetype =
  | "language-test"
  | "standardised-test"
  | "university-shortlist"
  | "application"
  | "personal-statement"
  | "references"
  | "documents-profile"
  | "scholarship-funding"
  | "offer-enrolment"
  | "visa"
  | "housing"
  | "pre-departure"
  | "research-contact";

/** What kind of thing a resource is, so the sheet can group them. */
export type ResourceKind =
  | "official"
  | "book"
  | "video"
  | "channel"
  | "practice"
  | "site"
  | "app"
  | "tool"
  | "cost";

export type Resource = {
  title: string;
  kind: ResourceKind;
  /** Where it lives. A printed book or an office may have no URL. */
  url?: string;
  /** One line on why this one, in the student's words. Never empty. */
  why: string;
  /** True when using it costs nothing. */
  free?: boolean;
  /** What it costs, when it is not free. */
  cost?: string;
  /** ISO date this link and its facts were last checked. */
  verifiedOn: string;
};

/** One test the student could take, and what this country makes of it. */
export type ExamOption = {
  name: string;
  /** Whether the destination and its programme will accept it. */
  accepted: boolean;
  /** The minimum, written the way a programme writes it. */
  requiredScore?: string;
  /** Why it is not accepted, or the catch that comes with it. */
  note?: string;
  /** How long a result stays valid. */
  validity?: string;
  /** How to book it, and when. */
  howToBook?: string;
  /** How long before you need the score that you must sit it. */
  leadTime?: string;
  /** The fee. */
  cost?: string;
  /** The official page. */
  url?: string;
  verifiedOn: string;
};

/** A part of a test or a document, broken down far enough to be useful. */
export type GuideSubsection = {
  title: string;
  /** What it tests, in one line. */
  what?: string;
  /** Shape of it: length, question count, time. */
  format?: string;
  /** How it is scored. */
  score?: string;
  /** The granular topics inside it. */
  topics?: string[];
  /** One line on how to do well. */
  tip?: string;
  resources?: Resource[];
};

/** One stage of a preparation plan. */
export type RoadmapStage = {
  /** e.g. "Weeks 1–3". */
  label: string;
  /** A short name for the stage. */
  title: string;
  /** What you are trying to achieve by the end of it. */
  goal: string;
  /** Suggested effort. */
  hours?: string;
  /** What to work on. */
  focus: string[];
  /** How you know you are ready for the next stage. */
  checkpoint?: string;
  resources?: Resource[];
};

/** The body of one section of a dossier. */
export type SectionContent = {
  /** The prose. One or two short paragraphs, in plain language. */
  body?: string;
  /** Bullet lines under the prose. */
  points?: string[];
  /** Test options, shown as cards rather than a table. */
  exams?: ExamOption[];
  /** Sub-sections, shown as accordions. */
  subsections?: GuideSubsection[];
  /** A preparation plan, shown as a vertical timeline. */
  roadmap?: RoadmapStage[];
  /** Materials, shown grouped by kind. */
  resources?: Resource[];
  /** A single highlighted warning or reassurance. */
  callout?: { tone: "watch" | "good"; title: string; body: string };
};

/** A canonical section of a dossier, as declared by the archetype. */
export type GuideSectionSpec = {
  /** Stable id, used in the deep link. */
  id: string;
  /** The label shown on the milestone row. It must name the value. */
  navLabel: string;
  /** The heading inside the sheet. */
  title: string;
  /** The numbered eyebrow, e.g. "02 / WHEN TO BOOK". */
  eyebrow: string;
};

/** Everything a milestone can say, for one archetype. */
export type GuideContent = {
  archetype: GuideArchetype;
  /** One or two sentences: what this checkpoint actually is. */
  intro: string;
  /** The body of each section, keyed by section id. */
  sections: Record<string, SectionContent>;
};

/** A dossier, assembled from the archetype's sections and the milestone's body. */
export type Guide = {
  archetype: GuideArchetype;
  intro: string;
  sections: Array<GuideSectionSpec & { content: SectionContent }>;
};
