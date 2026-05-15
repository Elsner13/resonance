/**
 * Tally API integration — pushes application submissions directly into Tally.
 * Auth: Authorization: Bearer {api_key}
 */

export interface TallySubmissionPayload {
  fullName: string;
  email: string;
  phone?: string;
  workingOn: string;
  constraint: string;
  successIn90Days: string;
  anythingElse?: string;
  bookedTimeDisplay?: string;
  program?: string;
}

const TALLY_BASE = "https://api.tally.so";

// Field IDs fetched live from the Tally API for both forms.
// Cohort form: https://tally.so/r/BzAgvK
const COHORT_FIELDS = {
  name: "802105d6-bc69-4de7-9edf-18e9673c16b4",
  email: "75c81085-ca71-4be4-b223-8c9d53b7f298",
  social: "c7ab813f-8627-4cf4-8a3c-b0e728f3271f",
  birthDate: "9b69be6d-b7d2-4205-bade-146a3591fc00",
  birthTimeLocation: "b02800b3-8683-4a28-a3ee-7565add4eb1a",
  organism: "81db2987-76c6-41a0-b0f6-eae943f618ed",
  gap: "ef648d6d-929f-45b4-b008-03a7a8de968b",
  sacral: "3f08496b-1135-47e7-9c10-7ab11f921ce8",
  signature: "a8a4a43f-5c08-4a95-afef-43ff0547a4fc",
};

// Mentorship form: https://tally.so/r/ODdylp
const MENTORSHIP_FIELDS = {
  name: "eb5f581e-0d2f-46d0-803f-5ad9c6637eb5",
  email: "534ed21e-1775-48ba-a6ce-5350b19e36a7",
  social: "31e7c019-b049-485c-9ef6-5739f03f9e2b",
  birthDate: "d00eca8f-8cd5-44f2-bf90-9f7d497a55ef",
  birthTimeLocation: "b8f806ef-2c5c-46db-ae69-0c112e1272b1",
  fracture: "2b2a3445-a20f-4602-8a25-1201c75bf51c",
  building: "bf2e2094-95a8-4349-b3d4-d768949728ca",
  monthlyYearly: "fe625d5b-0fc5-456b-9648-b6fb9eb7c3b7",
  financial: "2107611b-7e49-44c8-a26b-953679612f82",
  whyNow: "62994d48-7b54-4e3f-aad8-fa94b73d58f3",
  signature: "eaa440ed-a108-43d8-b68f-bf44b962bf42",
};

function getHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

/**
 * Build Tally answers from the application payload.
 * Maps aligned fields and appends extra data into the long-form fields.
 */
function buildCohortAnswers(p: TallySubmissionPayload): Record<string, unknown> {
  const answers: Record<string, unknown> = {};

  answers[COHORT_FIELDS.name] = { value: p.fullName };
  answers[COHORT_FIELDS.email] = { value: p.email };

  // Append extras (phone, 90-day goal, anything else, booked time) to The Organism
  const organismExtras = [
    p.phone && `Phone: ${p.phone}`,
    p.successIn90Days && `Success in 90 days: ${p.successIn90Days}`,
    p.anythingElse && `Anything else: ${p.anythingElse}`,
    p.bookedTimeDisplay && `Booked call: ${p.bookedTimeDisplay}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  answers[COHORT_FIELDS.organism] = {
    value: organismExtras
      ? `${p.workingOn}\n\n---\n${organismExtras}`
      : p.workingOn,
  };

  answers[COHORT_FIELDS.gap] = { value: p.constraint };

  return answers;
}

function buildMentorshipAnswers(p: TallySubmissionPayload): Record<string, unknown> {
  const answers: Record<string, unknown> = {};

  answers[MENTORSHIP_FIELDS.name] = { value: p.fullName };
  answers[MENTORSHIP_FIELDS.email] = { value: p.email };

  // Append extras to What You're Building
  const buildingExtras = [
    p.phone && `Phone: ${p.phone}`,
    p.successIn90Days && `Success in 90 days: ${p.successIn90Days}`,
    p.anythingElse && `Anything else: ${p.anythingElse}`,
    p.bookedTimeDisplay && `Booked call: ${p.bookedTimeDisplay}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  answers[MENTORSHIP_FIELDS.building] = {
    value: buildingExtras
      ? `${p.workingOn}\n\n---\n${buildingExtras}`
      : p.workingOn,
  };

  answers[MENTORSHIP_FIELDS.fracture] = { value: p.constraint };

  return answers;
}

export async function pushToTally(
  formId: string,
  apiKey: string,
  payload: TallySubmissionPayload,
): Promise<boolean> {
  const isCohort = formId === "BzAgvK";
  const answers = isCohort
    ? buildCohortAnswers(payload)
    : buildMentorshipAnswers(payload);

  try {
    const res = await fetch(`${TALLY_BASE}/forms/${formId}/submissions`, {
      method: "POST",
      headers: getHeaders(apiKey),
      body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[tally] submission failed:", res.status, text);
      return false;
    }

    const data = (await res.json()) as { id?: string };
    console.info("[tally] submission created:", data.id ?? "unknown");
    return true;
  } catch (err) {
    console.error("[tally] submission threw:", err);
    return false;
  }
}
