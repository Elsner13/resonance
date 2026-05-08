"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, isSwitching, toggleTheme } = useTheme();
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
      disabled={isSwitching}
      className={cn(
        "group relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-rule bg-bone/90 text-ink shadow-sm backdrop-blur-md transition-[border-color,background-color,color,box-shadow,transform] duration-500 ease-out hover:-translate-y-px hover:border-ink hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bone disabled:pointer-events-none disabled:opacity-80",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full bg-signal/0 transition-colors duration-500 ease-out group-hover:bg-signal/8",
        )}
      />
      <span className="relative block h-4 w-4">
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 flex items-center justify-center font-mono text-[15px] leading-none transition-all duration-500 ease-out will-change-transform",
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
            "absolute inset-0 flex items-center justify-center font-mono text-[14px] leading-none transition-all duration-500 ease-out will-change-transform",
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
