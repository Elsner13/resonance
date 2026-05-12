"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/resonance", label: "Resonance" },
  { href: "/cohort", label: "Cohort" },
  { href: "/attune", label: "Attune" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bone/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6 py-2">
        <Link
          href="/"
          aria-label="Sam Elsner — home"
          className="inline-flex items-center gap-2.5 text-ink"
        >
          <LogoMark size={32} />
          <span className="font-sans text-lg font-bold tracking-tight">
            Sam Elsner
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "navlink",
                  active && "text-signal underline underline-offset-8 decoration-1",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle className="ml-2" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center text-ink"
        >
          <svg
            width="22"
            height="22"
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

      {open && (
        <div className="md:hidden border-t border-rule bg-bone">
          <Container className="flex flex-col gap-1 py-4">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "navlink py-3 text-base",
                    active && "text-signal",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
