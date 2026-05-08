import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bone text-ink">
      <ScrollProgress />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
