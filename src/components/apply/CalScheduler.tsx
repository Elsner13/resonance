"use client";

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export interface BookingPayload {
  startTime?: string;
  displayTime?: string;
  email?: string;
  name?: string;
}

const STORAGE_KEY = "resonance-booking";

function readStoredBooking(): BookingPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Only trust bookings from the last 30 minutes
    const ts = parsed?._ts as number | undefined;
    if (!ts || Date.now() - ts > 30 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    const { _ts, ...payload } = parsed;
    return payload as BookingPayload;
  } catch {
    return null;
  }
}

function storeBooking(payload: BookingPayload) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...payload, _ts: Date.now() }));
  } catch {
    // ignore quota errors
  }
}

export function clearStoredBooking() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Cal.com inline scheduler with multiple fallback mechanisms:
 * 1. Cal API bookingSuccessful callback
 * 2. Direct postMessage listener from Cal.com iframe
 * 3. localStorage persistence so a refresh recovers state
 * 4. Manual "Continue" button as last resort
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
  const containerRef = useRef<HTMLDivElement>(null);
  const onBookedRef = useRef(onBooked);
  onBookedRef.current = onBooked;
  const [booked, setBooked] = useState(false);
  const [stored, setStored] = useState<BookingPayload | null>(null);

  // On mount: check if we already have a stored booking
  useEffect(() => {
    const existing = readStoredBooking();
    if (existing) {
      setStored(existing);
    }
  }, []);

  // Mobile: auto-scroll when Cal expands
  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = containerRef.current;
    if (!target) return;

    let prevHeight = 0;
    let cooldown = false;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (
          isMobile &&
          prevHeight > 0 &&
          newHeight > prevHeight + 100 &&
          !cooldown
        ) {
          cooldown = true;
          window.setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "end" });
            window.setTimeout(() => {
              cooldown = false;
            }, 700);
          }, 80);
        }
        prevHeight = newHeight;
      }
    });
    ro.observe(target);
    return () => ro.disconnect();
  }, []);

  // Primary: Cal API callback
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
          const payload = extractPayload(event);
          storeBooking(payload);
          setBooked(true);
          onBookedRef.current(payload);
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fallback: listen for Cal.com postMessage events directly
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || typeof data !== "object") return;
      // Cal.com sends various message types; look for booking confirmation
      const type = (data as Record<string, unknown>).type as string | undefined;
      const event = (data as Record<string, unknown>).event as string | undefined;
      const msgData = (data as Record<string, unknown>).data as Record<string, unknown> | undefined;

      if (
        type === "CAL:BOOKING_SUCCESSFUL" ||
        type === "bookingSuccessful" ||
        event === "bookingSuccessful" ||
        event === "booking_successful"
      ) {
        const payload = extractPayload(msgData ?? data);
        storeBooking(payload);
        setBooked(true);
        onBookedRef.current(payload);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function handleManualContinue(payload: BookingPayload) {
    storeBooking(payload);
    onBookedRef.current(payload);
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <div
        className="w-full overflow-hidden bg-bone border border-rule rounded-lg"
        style={{ minHeight: "640px" }}
      >
        <Cal
          namespace="apply-scheduler"
          calLink={`${username}/${eventSlug}`}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "light" }}
        />
      </div>

      {/* Fallback UI */}
      {(booked || stored) && (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-signal bg-signal/5 p-4">
          <p className="font-sans text-sm text-ink">
            {stored?.displayTime
              ? `Booking detected for ${stored.displayTime}`
              : "Booking detected"}
          </p>
          <button
            type="button"
            onClick={() => handleManualContinue(stored ?? {})}
            className="btn btn-primary shrink-0"
          >
            Continue to application
          </button>
        </div>
      )}

      {!booked && !stored && (
        <p className="text-center font-sans text-sm text-muted">
          Already booked a call?{" "}
          <button
            type="button"
            onClick={() => {
              const existing = readStoredBooking();
              if (existing) {
                handleManualContinue(existing);
              }
            }}
            className="text-link"
          >
            Continue to application →
          </button>
        </p>
      )}
    </div>
  );
}

function extractPayload(event: unknown): BookingPayload {
  const detail = (event as { detail?: unknown })?.detail;
  const data = (detail as { data?: unknown })?.data ??
    (event as { data?: unknown })?.data ??
    event;

  if (!data || typeof data !== "object") {
    return {};
  }

  const dataObj = data as Record<string, unknown>;
  const booking = (dataObj.booking ?? {}) as Record<string, unknown>;
  const startTime =
    typeof booking.startTime === "string"
      ? booking.startTime
      : typeof dataObj.date === "string"
      ? dataObj.date
      : typeof dataObj.startTime === "string"
      ? dataObj.startTime
      : undefined;

  const attendees = booking.attendees as
    | Array<{ email?: string; name?: string }>
    | undefined;
  const attendee = attendees?.[0];

  return {
    startTime,
    displayTime: startTime ? formatDisplayTime(startTime) : undefined,
    email: attendee?.email,
    name: attendee?.name,
  };
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
