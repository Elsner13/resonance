"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export interface BookingPayload {
  /** ISO datetime if Cal provided it */
  startTime?: string;
  /** Human-readable display string (e.g. "Tue, May 27 · 10:00 AM CT") */
  displayTime?: string;
  /** Email if Cal provided it */
  email?: string;
  /** Full name if Cal provided it */
  name?: string;
}

/**
 * Cal.com inline scheduler. Listens for the `bookingSuccessful` event
 * and calls onBooked with whatever payload Cal exposes — email + time
 * if available, so the form below can prefill.
 *
 * Theme is `dark` so it blends with the Void surface.
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
      // UI defaults — dark theme, brand color, hide event details.
      const darkVars = {
        "cal-brand": "#B22222",
        "cal-bg": "#080806",
        "cal-bg-emphasis": "#1A1A18",
        "cal-border": "#2C2C2A",
        "cal-border-emphasis": "#3A3A38",
        "cal-text": "#EDEBE0",
        "cal-text-emphasis": "#EDEBE0",
        "cal-text-muted": "#6B6B65",
      };
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: darkVars, light: darkVars },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: (event: unknown) => {
          // Cal.com fires { detail: { data: { booking, eventType, ... } } }
          // Shape varies — pull what we can defensively.
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
          const email = attendee?.email;
          const name = attendee?.name;
          onBooked({
            startTime,
            displayTime: startTime ? formatDisplayTime(startTime) : undefined,
            email,
            name,
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
      className="w-full overflow-hidden"
      style={{
        background: "var(--onyx, #1A1A18)",
        border: "1px solid var(--slate, #2C2C2A)",
        minHeight: "640px",
      }}
    >
      <Cal
        namespace="cohort-apply"
        calLink={`${username}/${eventSlug}`}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark" }}
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
