import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer>
      <Container className="py-10">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="font-sans text-sm text-muted">
            © {new Date().getFullYear()} Sam Elsner
          </p>
          <Link
            href="/privacy"
            className="font-sans text-xs text-muted hover:text-signal transition-colors"
          >
            Privacy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
