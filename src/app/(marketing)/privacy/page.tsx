import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for thesamelsner.com.",
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-prose">
          <Reveal>
            <h1 className="balance">Privacy Policy</h1>
          </Reveal>

          <Reveal delay={0.1} className="copy mt-10 space-y-6 text-ink/90">
            <p>
              This privacy policy explains how personal information is collected,
              used, and protected when you visit thesamelsner.com.
            </p>

            <h2 className="font-sans text-xl font-semibold tracking-tight text-ink">
              Information collected
            </h2>
            <p>
              When you apply for the Cohort or Attune mentorship, I collect the
              information you provide in the application form — your name, email,
              phone number, and written responses. This is stored securely and used
              solely to evaluate your application and communicate with you about it.
            </p>

            <h2 className="font-sans text-xl font-semibold tracking-tight text-ink">
              Cal.com scheduling
            </h2>
            <p>
              Booking a call uses Cal.com&apos;s embedded scheduler. Cal.com may
              collect your name, email, and selected time slot according to their
              privacy policy. I only receive the information necessary to confirm
              your appointment.
            </p>

            <h2 className="font-sans text-xl font-semibold tracking-tight text-ink">
              Email communication
            </h2>
            <p>
              Application confirmations and prep notes are sent via Resend. Your
              email address is used only for correspondence related to your
              application and is never sold or shared with third parties for
              marketing purposes.
            </p>

            <h2 className="font-sans text-xl font-semibold tracking-tight text-ink">
              Analytics
            </h2>
            <p>
              This site does not use third-party analytics cookies or tracking
              pixels. I respect your attention and do not participate in
              surveillance-based marketing.
            </p>

            <h2 className="font-sans text-xl font-semibold tracking-tight text-ink">
              Data retention
            </h2>
            <p>
              Application data is retained for as long as necessary to evaluate your
              fit and maintain records of the working relationship. If you wish to
              have your data deleted, email sam@thesamelsner.com and I will remove
              it within 30 days.
            </p>

            <h2 className="font-sans text-xl font-semibold tracking-tight text-ink">
              Contact
            </h2>
            <p>
              Questions about this policy? Email{" "}
              <a
                href="mailto:sam@thesamelsner.com"
                className="text-link"
              >
                sam@thesamelsner.com
              </a>
              .
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
