import Link from "next/link";
import { Container } from "./Container";

const FOOTER_NAV = [
  { href: "/cohort", label: "Cohort" },
  { href: "/attune", label: "Attune" },
  { href: "https://cal.com/samelsner/discovery", label: "Discovery Call", external: true },
];

const SOCIAL = [
  {
    href: "https://samelsner.substack.com/",
    label: "Substack",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
      </svg>
    ),
  },
  {
    href: "https://x.com/samelsner_",
    label: "X / Twitter",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <Container className="py-12 md:py-16">
        <div className="flex flex-col items-start gap-10 md:flex-row md:justify-between md:items-center">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-sans text-base font-semibold tracking-tight text-ink transition-colors hover:text-signal"
            >
              Sam Elsner
            </Link>
            <p className="mt-1.5 font-serif text-sm text-muted">
              Cut the noise. Find your frequency.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center gap-6">
            {FOOTER_NAV.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-sans text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-sans text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {SOCIAL.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={item.label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-ink"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-rule pt-6 md:flex-row md:items-center">
          <p className="font-sans text-xs text-muted">
            © {new Date().getFullYear()} Sam Elsner
          </p>
          <Link
            href="/privacy"
            className="font-sans text-xs text-muted transition-colors hover:text-ink"
          >
            Privacy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
