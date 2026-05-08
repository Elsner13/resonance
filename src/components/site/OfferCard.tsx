import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Editorial offer card for the homepage hub grid.
 * Two layouts: "feature" (large hero card) and "default" (grid item).
 */
export function OfferCard({
  eyebrow,
  title,
  description,
  href,
  cta,
  status,
  layout = "default",
  meta,
  signalAccent,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  href: string;
  cta: string;
  status?: string;
  layout?: "feature" | "default";
  meta?: string;
  signalAccent?: boolean;
  children?: ReactNode;
}) {
  const isExternal = /^https?:\/\//.test(href);
  const Wrapper = (props: { children: ReactNode; className?: string }) =>
    isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={props.className}
      >
        {props.children}
      </a>
    ) : (
      <Link href={href} className={props.className}>
        {props.children}
      </Link>
    );

  if (layout === "feature") {
    return (
      <Wrapper className="group block">
        <article className="card card-hover relative grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:gap-12 md:p-12">
          <div>
            {eyebrow && (
              <div
                className={cn(
                  "eyebrow mb-5",
                  signalAccent && "eyebrow-signal",
                )}
              >
                {eyebrow}
                {status && <span className="ml-3 text-muted">— {status}</span>}
              </div>
            )}
            <h3 className="text-3xl font-semibold leading-[1.1] tracking-tightest md:text-4xl balance">
              {title}
            </h3>
            <div className="copy mt-5 max-w-xl pretty text-ink/85">
              {description}
            </div>
            {meta && (
              <p className="mt-6 font-sans text-sm text-muted">{meta}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-6 md:items-end md:text-right">
            {children}
            <span className="btn btn-primary group-hover:bg-signal group-hover:border-signal">
              {cta}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 7h8m0 0L7 3m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </article>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="group block h-full">
      <article className="card card-hover relative flex h-full flex-col p-7 md:p-8">
        {eyebrow && (
          <div
            className={cn("eyebrow mb-4", signalAccent && "eyebrow-signal")}
          >
            {eyebrow}
            {status && <span className="ml-2 text-muted">— {status}</span>}
          </div>
        )}
        <h3 className="font-sans text-xl font-semibold leading-[1.15] tracking-tightest text-ink md:text-2xl balance">
          {title}
        </h3>
        <div className="copy mt-4 grow pretty text-ink/85">{description}</div>
        {meta && (
          <p className="mt-5 font-sans text-sm text-muted">{meta}</p>
        )}
        <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink transition-colors group-hover:text-signal">
          {cta}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 7h8m0 0L7 3m4 4l-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </article>
    </Wrapper>
  );
}
