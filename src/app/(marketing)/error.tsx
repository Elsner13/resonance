"use client";

import { Container } from "@/components/site/Container";
import { CTA } from "@/components/site/CTA";

export default function MarketingError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] items-center">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="balance">Something went wrong.</h1>
          <p className="copy-lg mt-6 text-ink/75 pretty">
            A signal got lost in transmission. Try again, or return home and
            navigate from there.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={reset}
              className="btn btn-primary"
            >
              Try again
            </button>
            <CTA href="/" variant="secondary">
              Go home
            </CTA>
          </div>
        </div>
      </Container>
    </section>
  );
}
