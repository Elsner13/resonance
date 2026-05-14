"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export interface BookingPayload {
  /** ISO datetime if Cal provided it */
  startTime?: string;
  /** Human-readable display string */
  displayTime?: string;
  /** Email if Cal provided it */
  email?: string;
  /** Full name if Cal provided it */
  name?: string;
}

/**
 * Cal.com inline scheduler. Light theme with site signal red as the
 * brand accent, sits inside a bone container with a rule border to match
 * the rest of the site.
 *
 * Fires onBooked with whatever payload Cal exposes — email + time if
 * available, so the form below can prefill.
 */
export function CalScheduler({
  username,
  eventSlug,
  onBooked,
}: {
  username: string;
  eventSlug: string;
  onBooked: (payload: BookingPayload) => void;
}) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi();
      if (cancelled) return;

      const lightVars = {
        "cal-brand": "#FD363B",
        "cal-bg": "#faf9f5",
        "cal-bg-emphasis": "#f0efe9",
        "cal-border": "#e5e7eb",
        "cal-border-emphasis": "#d4d4cf",
        "cal-text": "#141413",
        "cal-text-emphasis": "#141413",
        "cal-text-muted": "#6b6b65",
      };

      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: lightVars, dark: lightVars },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: (event: unknown) => {
          const detail = (event as { detail?: unknown })?.detail;
          const data = (detail as { data?: unknown })?.data;
          if (!data || typeof data !== "object") {
            onBooked({});
            return;
          }
          const dataObj = data as Record<string, unknown>;
          const booking = (dataObj.booking ?? {}) as Record<string, unknown>;
          const startTime =
            typeof booking.startTime === "string"
              ? booking.startTime
              : typeof dataObj.date === "string"
              ? dataObj.date
              : undefined;
          const attendees = booking.attendees as
            | Array<{ email?: string; name?: string }>
            | undefined;
          const attendee = attendees?.[0];
          onBooked({
            startTime,
            displayTime: startTime ? formatDisplayTime(startTime) : undefined,
            email: attendee?.email,
            name: attendee?.name,
          });
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [onBooked]);

  return (
    <div
      className="w-full overflow-hidden bg-bone border border-rule rounded-lg"
      style={{ minHeight: "640px" }}
    >
      <Cal
        namespace="cohort-apply"
        calLink={`${username}/${eventSlug}`}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}

function formatDisplayTime(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}
