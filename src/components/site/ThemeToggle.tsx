"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      className={cn(
        "group relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-rule bg-bone/85 text-ink shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bone",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full bg-signal/0 transition-colors duration-300 group-hover:bg-signal/8",
        )}
      />
      <span className="relative block h-4 w-4">
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 flex items-center justify-center font-mono text-[15px] leading-none transition-all duration-300",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
          )}
        >
          ☼
        </span>
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 flex items-center justify-center font-mono text-[14px] leading-none transition-all duration-300",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        >
          ◐
        </span>
      </span>
    </button>
  );
}
