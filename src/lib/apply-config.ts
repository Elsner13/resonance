/**
 * Apply-flow configuration.
 *
 * The /apply/[type] page is parameterized on this object. Each entry
 * defines everything type-specific: Cal.com event slug, Kit form ID,
 * page copy, email copy, prep paragraph.
 *
 * To change a slug or a prep note, edit this file — no other surface
 * needs to know.
 */

export type ApplyType = "cohort" | "mentorship";

export const APPLY_TYPES: ApplyType[] = ["cohort", "mentorship"];

export function isApplyType(value: unknown): value is ApplyType {
  return APPLY_TYPES.includes(value as ApplyType);
}

export interface ApplyConfig {
  /** Cal.com event slug under cal.com/samelsner/{slug} */
  calEventSlug: string;

  /** Numeric Kit form ID (look up via /v4/forms) */
  kitFormId: number;

  /** Page hero */
  eyebrow: string;
  headline: string;
  /** The accent word inside the headline that gets the SignalUnderline */
  headlineAccent: string;
  /** Trailing punctuation after the headline (rendered after the accent) */
  headlineTrail: string;
  subhead: string;

  /** Scheduler step copy */
  step1Eyebrow: string;
  step1Headline: string;
  step1Lede: string;

  /** Form step copy */
  step2Eyebrow: string;
  step2Headline: string;
  step2Lede: string;

  /** Success state copy */
  successHeadline: string;

  /** Email subjects */
  operatorEmailSubject: (fullName: string) => string;
  applicantEmailSubject: string;

  /** One-paragraph prep note in the applicant confirmation email */
  prepNote: string;
  /** Optional further-reading link below the prep note */
  prepReading: { label: string; url: string } | null;
  /** One-liner tagline used in both emails */
  tagline: string;

  /** Browser tab title */
  pageTitle: string;
  /** OG description */
  pageDescription: string;
}

const SHARED_PREP_READING = {
  label: "the note the grind cannot hear (Resonance #001)",
  url: "https://samelsner.substack.com/p/the-note-the-grind-cannot-hear",
};

export const APPLY_CONFIG: Record<ApplyType, ApplyConfig> = {
  cohort: {
    calEventSlug: "cohort-call",
    kitFormId: 9434061,

    eyebrow: "The Resonance Cohort · Apply",
    headline: "Book the call. Then we",
    headlineAccent: "begin",
    headlineTrail: ".",
    subhead:
      "The Resonance Cohort is a 12-week container for creators ready to trade the funnel for a frequency.",

    step1Eyebrow: "Step 1 — Pick a time",
    step1Headline: "Choose your slot. The form opens once it's held.",
    step1Lede:
      "15 minutes. Just enough to see if the frequency fits.",

    step2Eyebrow: "Step 2 — Send it",
    step2Headline: "Tell me what you're bringing.",
    step2Lede:
      "Five questions. Honest answers. The three reflection prompts need at least 100 characters of real thought each.",

    successHeadline: "See you on the call.",

    operatorEmailSubject: (n) => `Cohort application — ${n}`,
    applicantEmailSubject: "I got it.",

    prepNote:
      "Before our call, sit with one question: what frequency have you been broadcasting from for the last 90 days, and what frequency do you actually want to be broadcasting from? Don't write the answer down. Just notice the gap. That gap is the work. We'll meet there.",
    prepReading: SHARED_PREP_READING,
    tagline:
      "The Resonance Cohort. 12 weeks. A small container. Real constraints.",

    pageTitle: "Apply — The Resonance Cohort",
    pageDescription:
      "Book the call. Then we begin. Apply to The Resonance Cohort.",
  },

  mentorship: {
    calEventSlug: "mentorship-call",
    kitFormId: 9434079,

    eyebrow: "Attune · 1-on-1 Mentorship · Apply",
    headline: "Book the call. Then we",
    headlineAccent: "begin",
    headlineTrail: ".",
    subhead:
      "Attune is ongoing 1-on-1 mentorship for creators ready to become antifragile by design, not by accident.",

    step1Eyebrow: "Step 1 — Pick a time",
    step1Headline: "Choose your slot. The form opens once it's held.",
    step1Lede:
      "15 minutes. Just enough to feel whether the work is for you.",

    step2Eyebrow: "Step 2 — Send it",
    step2Headline: "Tell me what you're bringing.",
    step2Lede:
      "Five questions. Honest answers. The three reflection prompts need at least 100 characters of real thought each.",

    successHeadline: "See you on the call.",

    operatorEmailSubject: (n) => `Attune application — ${n}`,
    applicantEmailSubject: "I got it.",

    prepNote:
      "Before our call, sit with the fracture you named on the form. Most applicants name a strategic problem and call it a fracture. The real fracture is usually one layer below that. If something more honest surfaces between now and the call, hold onto it.",
    prepReading: SHARED_PREP_READING,
    tagline:
      "Attune. Ongoing 1-on-1 mentorship. A container, not a course.",

    pageTitle: "Apply — Attune Mentorship",
    pageDescription:
      "Book the call. Then we begin. Apply for ongoing 1-on-1 mentorship with Sam Elsner.",
  },
};
