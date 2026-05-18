"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "./Container";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/cohort", label: "Cohort" },
  { href: "/attune", label: "Attune" },
  { href: "https://cal.com/samelsner/discovery-call", label: "Discovery Call", external: true },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        mobileRef.current &&
        !mobileRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-bone/90 backdrop-blur-md border-b border-rule">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Sam Elsner — home"
          className="inline-flex items-center gap-2.5 text-ink transition-colors hover:text-signal"
        >
          <LogoMark size={28} />
          <span className="font-sans text-base font-semibold tracking-tight">
            Sam Elsner
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const linkClasses = cn(
              "relative py-1 font-sans text-[0.9375rem] font-medium transition-colors",
              active
                ? "text-ink"
                : "text-ink/60 hover:text-ink",
            );
            return item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className={linkClasses}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={linkClasses}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-signal" />
                )}
              </Link>
            );
          })}
          <ThemeToggle className="ml-1" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/5"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            >
              {open ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M3 7h18" />
                  <path d="M3 17h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        ref={mobileRef}
        id="mobile-menu"
        className={cn(
          "md:hidden overflow-hidden border-t border-rule bg-bone transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV.map((item, i) => {
            const active = pathname === item.href;
            const linkClasses = cn(
              "py-3 text-base font-sans font-medium transition-all duration-200",
              active
                ? "text-signal translate-x-1"
                : "text-ink/70 hover:text-ink hover:translate-x-1",
            );
            return item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className={linkClasses}
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={linkClasses}
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </Container>
      </div>
    </header>
  );
}
