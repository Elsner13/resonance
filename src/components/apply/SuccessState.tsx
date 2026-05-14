"use client";

import { useEffect, useRef } from "react";

export function SuccessState({
  bookedTimeDisplay,
}: {
  bookedTimeDisplay?: string;
}) {
  const liveRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = bookedTimeDisplay
        ? `Application sent. Your call is locked for ${bookedTimeDisplay}.`
        : "Application sent. Your call is locked.";
    }
  }, [bookedTimeDisplay]);

  return (
    <section className="text-center" aria-labelledby="success-heading">
      <p ref={liveRef} aria-live="polite" className="sr-only"></p>

      <div
        aria-hidden="true"
        className="mx-auto mb-10 h-px"
        style={{ width: "60px", background: "var(--crimson, #B22222)" }}
      />

      <h2 id="success-heading" className="apply-h1">
        See you on the call.
      </h2>

      {bookedTimeDisplay && (
        <p className="apply-lede mt-4">
          Locked for{" "}
          <strong style={{ color: "var(--bone, #EDEBE0)" }}>
            {bookedTimeDisplay}
          </strong>
          .
        </p>
      )}

      <ul className="mt-12 mx-auto max-w-md text-left grid gap-5">
        <SuccessBullet>The calendar invite is in your inbox.</SuccessBullet>
        <SuccessBullet>
          Confirmation email with prep notes sent.
        </SuccessBullet>
        <SuccessBullet>
          Reply to that email if anything changes.
        </SuccessBullet>
      </ul>
    </section>
  );
}

function SuccessBullet({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="flex gap-4 items-start"
      style={{ color: "var(--bone, #EDEBE0)" }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "16px",
          height: "1px",
          background: "var(--crimson, #B22222)",
          marginTop: "0.7em",
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: "16px", lineHeight: 1.55 }}>{children}</span>
    </li>
  );
}
