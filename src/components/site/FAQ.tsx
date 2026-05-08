import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface FAQItem {
  q: string;
  a: ReactNode;
}

export function FAQ({
  items,
  className,
}: {
  items: FAQItem[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-rule border-y border-rule", className)}>
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-sans text-base font-medium text-ink transition-colors hover:text-signal">
            <span className="balance">{item.q}</span>
            <span
              aria-hidden
              className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rule transition-colors group-open:bg-ink group-open:border-ink group-open:text-bone"
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                className="transition-transform duration-200 group-open:rotate-45"
              >
                <path
                  d="M4.5 1v7M1 4.5h7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <div className="copy max-w-3xl pb-6 pretty text-ink/85">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
