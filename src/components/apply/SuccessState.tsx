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
        className="mx-auto mb-10 h-px bg-signal"
        style={{ width: "60px" }}
      />

      <div className="eyebrow eyebrow-signal mb-5">Application sent</div>

      <h2 id="success-heading" className="text-bone balance">
        See you on the call.
      </h2>

      {bookedTimeDisplay && (
        <p className="copy-lg mt-6 text-bone/85 pretty">
          Locked for{" "}
          <strong className="text-bone">{bookedTimeDisplay}</strong>.
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
    <li className="flex gap-4 items-start text-bone">
      <span
        aria-hidden="true"
        className="flex-shrink-0 mt-[0.7em] h-px w-4 bg-signal"
      />
      <span className="font-sans text-base leading-relaxed">{children}</span>
    </li>
  );
}
