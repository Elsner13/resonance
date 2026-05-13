import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { CTA } from "@/components/site/CTA";
import { Reveal } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { SignalUnderline } from "@/components/motion/SignalUnderline";
import { ShineButton } from "@/components/motion/ShineButton";
import { SubstackEmbed } from "@/components/site/SubstackEmbed";
import { LatestPostsMarquee } from "@/components/site/LatestPostsMarquee";
import { getLatestPosts } from "@/lib/substack";

export const metadata: Metadata = {
  title: "Resonance · The Newsletter",
  description:
    "Resonance. The broadcast. One post per week. Whatever frequency Sam Elsner is holding.",
};

// Revalidate this page hourly so latest posts stay fresh.
export const revalidate = 3600;

export default async function ResonancePage() {
  const posts = await getLatestPosts(3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="flex min-h-[60vh] items-center border-b border-rule">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="eyebrow eyebrow-signal mb-6">
                The broadcast · Weekly · Free
              </div>
            </Reveal>
            <HeroHeadline className="balance">
              <SignalUnderline delay={0.75}>Resonance</SignalUnderline>.
            </HeroHeadline>
            <Reveal
              as="p"
              delay={0.5}
              className="copy-lg mt-8 pretty mx-auto max-w-2xl text-ink/85"
            >
              One post per week. No publishing calendar. No content
              strategy. Whatever frequency I&apos;m holding when I sit
              down to write. What&apos;s real. What&apos;s aligned. What
              will cut through your own noise.
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Latest issues (marquee) ── */}
      {posts.length > 0 && (
        <section className="section">
          <Container>
            <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
              <Reveal>
                <div className="eyebrow eyebrow-signal mb-5">
                  Latest signals
                </div>
                <h2 className="balance">The most recent broadcasts.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <a
                  href="https://samelsner.substack.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-link font-sans text-base"
                >
                  Read the full archive →
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-12">
              <LatestPostsMarquee posts={posts} speed={45} />
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── Subscribe (dark destination) ── */}
      <section
        className="section dark-locked border-t border-signal"
        style={{ background: "#0c1117" }}
      >
        <Container>
          <div className="mx-auto max-w-[720px]">
            <Reveal className="text-center">
              <div className="eyebrow eyebrow-signal mb-5">Subscribe</div>
              <h2 className="text-bone balance">
                Get the next signal in your inbox.
              </h2>
              <p className="copy-lg mt-6 text-bone/75 pretty">
                Free. One email a week. No sequences. No upsells. No
                tricks. When the frequency stops being yours, you
                unsubscribe.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <div className="mx-auto max-w-md">
                <SubstackEmbed publication="samelsner" />
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex justify-center">
                <ShineButton>
                  <CTA
                    href="https://samelsner.substack.com/"
                    variant="primary"
                  >
                    Read on Substack
                  </CTA>
                </ShineButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
