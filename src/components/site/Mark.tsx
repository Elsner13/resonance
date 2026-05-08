import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

/**
 * Resonance wordmark + sigil.
 * The sigil is the parent logo (black wedges + signal-red middle line).
 * Following Dan Toruno's brand direction: red on one element only —
 * the middle line of the mark — black/white everywhere else.
 */
export function Mark({
  className,
  size = "md",
  as = "link",
  showWordmark = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  as?: "link" | "span";
  showWordmark?: boolean;
}) {
  const dimensions =
    size === "lg"
      ? { px: 40, text: "text-2xl" }
      : size === "sm"
        ? { px: 22, text: "text-sm" }
        : { px: 28, text: "text-lg" };

  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        className,
      )}
    >
      <Image
        src="/resonance-mark.svg"
        alt=""
        width={dimensions.px}
        height={dimensions.px}
        priority
        className="block"
      />
      {showWordmark && (
        <span
          className={cn(
            "font-sans font-semibold tracking-tightest text-ink",
            dimensions.text,
          )}
        >
          Resonance
        </span>
      )}
    </span>
  );

  if (as === "span") return inner;

  return (
    <Link
      href="/"
      aria-label="Resonance — home"
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
