import { NavBar } from "@/components/site/NavBar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { StickyCTA } from "@/components/site/StickyCTA";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bone text-ink scroll-smooth animate-page-enter">
        <ScrollProgress />
        <NavBar />
        <main>{children}</main>
        <Footer />
        <StickyCTA />
      </div>
    </SmoothScroll>
  );
}
