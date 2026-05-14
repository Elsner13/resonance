import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import {
  COHORT_PREP_NOTE,
  COHORT_PREP_READING,
  COHORT_TAGLINE,
} from "@/lib/cohort-prep";

interface ApplicantConfirmationProps {
  firstName: string;
  bookedTimeDisplay?: string;
}

/**
 * Email sent to applicants after they book + submit the form.
 * Warm, on-voice, one prep instruction. Not a marketing email.
 */
export function ApplicantConfirmationEmail({
  firstName,
  bookedTimeDisplay,
}: ApplicantConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>{`See you on the call${
        bookedTimeDisplay ? `, ${bookedTimeDisplay}` : ""
      }.`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>I got it.</Heading>

          <Text style={paragraph}>
            {firstName}, your application is in. The slot is held.
            {bookedTimeDisplay && (
              <>
                {" "}
                I&apos;ll see you on <strong>{bookedTimeDisplay}</strong>.
              </>
            )}
          </Text>

          <Text style={paragraph}>{COHORT_TAGLINE}</Text>

          <Hr style={accentHr} />

          <Heading style={h2}>Before the call</Heading>

          <Text style={paragraph}>{COHORT_PREP_NOTE}</Text>

          {COHORT_PREP_READING && (
            <Text style={paragraph}>
              If you want something to read first:{" "}
              <Link href={COHORT_PREP_READING.url} style={link}>
                {COHORT_PREP_READING.label}
              </Link>
              .
            </Text>
          )}

          <Hr style={hr} />

          <Text style={paragraph}>
            A calendar invite is in your inbox. If anything changes, just
            reply to this email. I read every reply personally.
          </Text>

          <Text style={signoff}>
            Yours in rebellion,
            <br />
            Sam
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#faf9f5",
  fontFamily: "Georgia, 'Times New Roman', serif",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "40px 24px",
  maxWidth: "560px",
};

const h1: React.CSSProperties = {
  fontFamily:
    "Georgia, 'Times New Roman', serif",
  fontStyle: "italic",
  fontSize: "32px",
  fontWeight: 600,
  color: "#141413",
  margin: "0 0 20px",
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
};

const h2: React.CSSProperties = {
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "#B22222",
  margin: "0 0 12px",
};

const paragraph: React.CSSProperties = {
  fontSize: "17px",
  color: "#141413",
  margin: "0 0 18px",
  lineHeight: 1.6,
};

const signoff: React.CSSProperties = {
  fontSize: "17px",
  color: "#141413",
  margin: "32px 0 0",
  lineHeight: 1.5,
};

const hr: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "28px 0",
};

const accentHr: React.CSSProperties = {
  borderColor: "#B22222",
  borderTopWidth: "1px",
  width: "60px",
  margin: "32px 0 24px",
};

const link: React.CSSProperties = {
  color: "#B22222",
  textDecoration: "underline",
};
