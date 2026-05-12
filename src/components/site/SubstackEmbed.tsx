/**
 * Substack subscribe iframe embed.
 * Pulled from https://samelsner.substack.com/embed.
 */
export function SubstackEmbed({
  publication = "samelsner",
  className,
}: {
  publication?: string;
  className?: string;
}) {
  return (
    <iframe
      src={`https://${publication}.substack.com/embed`}
      width="100%"
      height="320"
      title="Subscribe to Resonance"
      className={className}
      style={{
        border: "1px solid #e5e7eb",
        background: "#faf9f5",
        display: "block",
      }}
      frameBorder={0}
      scrolling="no"
    />
  );
}
