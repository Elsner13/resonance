import type { Metadata } from "next";
import { APPLY_CONFIG, isApplyType } from "@/lib/apply-config";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  if (!isApplyType(type)) {
    return { title: "Apply" };
  }
  const cfg = APPLY_CONFIG[type];
  return {
    title: cfg.pageTitle,
    description: cfg.pageDescription,
  };
}

export default async function ApplyTypeLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
