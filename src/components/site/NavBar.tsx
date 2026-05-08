import Link from "next/link";
import { Container } from "./Container";
import { Mark } from "./Mark";
import { CTA } from "./CTA";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/mentorship", label: "Mentorship" },
  { href: "/cohort", label: "Cohort" },
  { href: "https://samelsner.substack.com/", label: "Newsletter" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-bone/85 backdrop-blur-md border-b border-rule">
      <Container className="flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Mark size="md" />
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => {
            const external = /^https?:\/\//.test(item.href);
            return external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="navlink"
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="navlink">
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <CTA
            href="/mentorship"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            Apply for mentorship
          </CTA>
          <CTA href="/mentorship" variant="primary" className="sm:hidden">
            Apply
          </CTA>
        </div>
      </Container>
    </header>
  );
}
