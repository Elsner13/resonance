/**
 * Cohort prep paragraph included in the applicant confirmation email.
 *
 * Sam — edit this freely. It lands in every "thanks for applying" email
 * the system sends out. One paragraph, your voice, what to read or sit
 * with before the call.
 */
export const COHORT_PREP_NOTE = `Before our call, sit with one question: what frequency have you been broadcasting from for the last 90 days, and what frequency do you actually want to be broadcasting from? Don't write the answer down. Just notice the gap. That gap is the work. We'll meet there.`;

/**
 * Optional: a short reading suggestion appended after the prep note.
 * Set to null to omit. Leave the URL on its own line so plain-text
 * email clients render it as a link.
 */
export const COHORT_PREP_READING: {
  label: string;
  url: string;
} | null = {
  label: "the note the grind cannot hear (Resonance #001)",
  url: "https://samelsner.substack.com/p/the-note-the-grind-cannot-hear",
};

/**
 * What the cohort is. One line, used in both emails so the applicant
 * remembers what they applied to.
 */
export const COHORT_TAGLINE =
  "The Resonance Cohort. 12 weeks. A small container. Real constraints.";
