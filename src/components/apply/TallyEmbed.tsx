"use client";

import { useMemo } from "react";
import type { BookingPayload } from "./CalScheduler";
import type { ApplyType } from "@/lib/apply-config";

interface Props {
  type: ApplyType;
  booking: BookingPayload;
  onSubmitted: () => void;
}

// Tally field IDs for prefill (fetched from Tally API)
const FORM_IDS: Record<ApplyType, string> = {
  cohort: "BzAgvK",
  mentorship: "ODdylp",
};

const PREFILL_FIELDS: Record<ApplyType, Record<string, string>> = {
  cohort: {
    // Identity & Coordinates (name)
    "802105d6-bc69-4de7-9edf-18e9673c16b4": "fullName",
    // Email
    "75c81085-ca71-4be4-b223-8c9d53b7f298": "email",
    // Birth time & Location (repurposed for booked time display)
    "b02800b3-8683-4a28-a3ee-7565add4eb1a": "bookedTimeDisplay",
  },
  mentorship: {
    // Identity & Coordinates (name)
    "eb5f581e-0d2f-46d0-803f-5ad9c6637eb5": "fullName",
    // Email
    "534ed21e-1775-48ba-a6ce-5350b19e36a7": "email",
    // Birth time & Location (repurposed for booked time display)
    "b8f806ef-2c5c-46db-ae69-0c112e1272b1": "bookedTimeDisplay",
  },
};

export function TallyEmbed({ type, booking, onSubmitted }: Props) {
  const embedUrl = useMemo(() => {
    const formId = FORM_IDS[type];
    const fieldMap = PREFILL_FIELDS[type];
    const params = new URLSearchParams();

    for (const [fieldId, bookingKey] of Object.entries(fieldMap)) {
      const value = booking[bookingKey as keyof BookingPayload];
      if (value) {
        params.append(fieldId, String(value));
      }
    }

    const query = params.toString();
    return `https://tally.so/r/${formId}${query ? `?${query}` : ""}`;
  }, [type, booking]);

  return (
    <div className="space-y-8">
      <div className="w-full overflow-hidden rounded-lg border border-bone/15">
        <iframe
          src={embedUrl}
          title="Application form"
          className="w-full"
          style={{ minHeight: "900px", border: 0 }}
          allow="fullscreen"
        />
      </div>

      <div className="text-center">
        <p className="font-sans text-sm text-bone/60 mb-4">
          Once you&apos;ve submitted the form above, confirm below.
        </p>
        <button
          type="button"
          onClick={onSubmitted}
          className="btn btn-primary"
        >
          I&apos;ve submitted my application
        </button>
      </div>
    </div>
  );
}
