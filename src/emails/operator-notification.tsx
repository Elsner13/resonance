import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OperatorNotificationProps {
  fullName: string;
  email: string;
  phone?: string;
  workingOn: string;
  constraint: string;
  successIn90Days: string;
  anythingElse?: string;
  bookedTimeIso?: string;
  bookedTimeDisplay?: string;
}

/**
 * Email sent to Sam when a new cohort application lands.
 * Clean plain-text-leaning layout — this is operator mail, not marketing.
 */
export function OperatorNotificationEmail({
  fullName,
  email,
  phone,
  workingOn,
  constraint,
  successIn90Days,
  anythingElse,
  bookedTimeDisplay,
}: OperatorNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New cohort application from ${fullName}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>New Cohort Application</Heading>
          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Name</Text>
            <Text style={value}>{fullName}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            {phone && (
              <>
                <Text style={label}>Phone</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            {bookedTimeDisplay && (
              <>
                <Text style={label}>Call booked for</Text>
                <Text style={value}>{bookedTimeDisplay}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>What are you working on right now?</Text>
            <Text style={paragraph}>{workingOn}</Text>

            <Text style={label}>What&apos;s the constraint you can&apos;t get past?</Text>
            <Text style={paragraph}>{constraint}</Text>

            <Text style={label}>What would success in 90 days look like?</Text>
            <Text style={paragraph}>{successIn90Days}</Text>

            {anythingElse && (
              <>
                <Text style={label}>Anything else?</Text>
                <Text style={paragraph}>{anythingElse}</Text>
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Sent from thesamelsner.com /apply
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#faf9f5",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "32px 24px",
  maxWidth: "640px",
};

const h1: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 600,
  color: "#141413",
  margin: "0 0 16px",
  letterSpacing: "-0.01em",
};

const hr: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
};

const section: React.CSSProperties = {
  margin: "0 0 8px",
};

const label: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#6b6b65",
  margin: "16px 0 4px",
};

const value: React.CSSProperties = {
  fontSize: "16px",
  color: "#141413",
  margin: "0",
  lineHeight: 1.5,
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  color: "#141413",
  margin: "0",
  lineHeight: 1.55,
  whiteSpace: "pre-wrap",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#6b6b65",
  margin: "16px 0 0",
};
