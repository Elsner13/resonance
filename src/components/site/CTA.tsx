import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "signal" | "ghost";

interface CTAProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  signal: "btn btn-signal",
  ghost: "btn btn-ghost",
};

export function CTA({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: CTAProps) {
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(variantClass[variant], className)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(variantClass[variant], className)}>
      {children}
    </Link>
  );
}
