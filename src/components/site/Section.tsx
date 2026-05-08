import { cn } from "@/lib/utils";
import { Container } from "./Container";
import type { ReactNode } from "react";

/**
 * Editorial section wrapper. Optionally tightens vertical rhythm,
 * inverts to dark surface, or adds a hairline divider above.
 */
export function Section({
  children,
  className,
  containerClassName,
  tight,
  inverted,
  divider,
  id,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tight?: boolean;
  inverted?: boolean;
  divider?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        tight ? "section-tight" : "section",
        inverted && "bg-ink text-bone",
        divider && "border-t border-rule",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/**
 * Editorial section header — eyebrow + headline + (optional) lede.
 * Two layouts: "stacked" (default) and "split" (heading left, lede right).
 */
export function SectionHeader({
  eyebrow,
  eyebrowSignal,
  title,
  lede,
  layout = "stacked",
  className,
  inverted,
}: {
  eyebrow?: string;
  eyebrowSignal?: boolean;
  title: ReactNode;
  lede?: ReactNode;
  layout?: "stacked" | "split";
  className?: string;
  inverted?: boolean;
}) {
  if (layout === "split") {
    return (
      <div
        className={cn(
          "grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16",
          className,
        )}
      >
        <div>
          {eyebrow && (
            <div
              className={cn(
                "eyebrow mb-5",
                eyebrowSignal && "eyebrow-signal",
                inverted && !eyebrowSignal && "text-bone/60",
              )}
            >
              {eyebrow}
            </div>
          )}
          <h2 className={cn("balance", inverted && "text-bone")}>{title}</h2>
        </div>
        {lede && (
          <div
            className={cn(
              "copy-lg pretty self-end",
              inverted ? "text-bone/85" : "text-ink/85",
            )}
          >
            {lede}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <div
          className={cn(
            "eyebrow mb-5",
            eyebrowSignal && "eyebrow-signal",
            inverted && !eyebrowSignal && "text-bone/60",
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2 className={cn("balance", inverted && "text-bone")}>{title}</h2>
      {lede && (
        <p
          className={cn(
            "copy-lg mt-6 pretty",
            inverted ? "text-bone/85" : "text-ink/85",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
