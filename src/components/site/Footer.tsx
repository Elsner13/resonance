import Link from "next/link";
import { Container } from "./Container";
import { Mark } from "./Mark";

const COLS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Programs",
    links: [
      { href: "/mentorship", label: "Resonance Mentorship" },
      { href: "/cohort", label: "Resonance Cohort" },
    ],
  },
  {
    heading: "Read",
    links: [
      { href: "https://samelsner.substack.com/", label: "The Resonance newsletter" },
      { href: "/about", label: "About Sam" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "mailto:hello@resonance.coach", label: "Email" },
      { href: "https://x.com/", label: "X / Twitter" },
      { href: "https://instagram.com/", label: "Instagram" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_3fr]">
          <div>
            <Mark size="lg" />
            <p className="copy mt-5 max-w-xs text-muted">
              A school for athletes and coaches who want to perform when it
              counts. Built by Sam Elsner.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.heading}>
                <div className="eyebrow">{col.heading}</div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => {
                    const external = /^(https?:|mailto:)/.test(link.href);
                    return (
                      <li key={link.href}>
                        {external ? (
                          <a
                            href={link.href}
                            target={
                              link.href.startsWith("mailto:")
                                ? undefined
                                : "_blank"
                            }
                            rel="noreferrer noopener"
                            className="navlink"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className="navlink">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule mt-14" />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted font-sans">
            © {new Date().getFullYear()} Resonance · Sam Elsner. All rights
            reserved.
          </p>
          <p className="text-sm text-muted font-sans">
            Savage, Minnesota
          </p>
        </div>
      </Container>
    </footer>
  );
}
