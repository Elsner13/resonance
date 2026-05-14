import { redirect } from "next/navigation";

/**
 * /apply (no type) defaults to the cohort apply flow.
 * Keeps the bare /apply URL working for anyone who has it bookmarked
 * or sees it shared without the explicit type segment.
 */
export default function ApplyIndex() {
  redirect("/apply/cohort");
}
