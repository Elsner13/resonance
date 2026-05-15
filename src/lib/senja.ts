/**
 * Senja testimonials API integration.
 * Docs: https://help.senja.io/en/articles/7908296-api
 */

export interface SenjaTestimonial {
  id: string;
  text: string;
  rating: number | null;
  customerName: string;
  customerEmail: string | null;
  customerTagline: string | null;
  customerCompany: string | null;
  date: string;
  approved: boolean;
  publicUrl: string;
}

interface SenjaApiResponse {
  total: number;
  testimonials: Array<{
    id: string;
    text: string;
    rating: number | null;
    customer_name: string | null;
    customer_email: string | null;
    customer_tagline: string | null;
    customer_company: string | null;
    date: string;
    approved: boolean;
    links?: { public?: string };
  }>;
}

export async function getSenjaTestimonials(
  limit = 10,
): Promise<SenjaTestimonial[]> {
  const apiKey = process.env.SENJA_API_KEY;
  if (!apiKey) {
    console.info("[senja] skipped: missing SENJA_API_KEY");
    return [];
  }

  try {
    const res = await fetch(
      `https://api.senja.io/v1/testimonials?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        next: { revalidate: 3600 }, // cache for 1 hour
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[senja] fetch failed:", res.status, text);
      return [];
    }

    const data = (await res.json()) as SenjaApiResponse;

    return data.testimonials
      .filter((t) => t.approved)
      .map((t) => ({
        id: t.id,
        text: cleanText(t.text),
        rating: t.rating,
        customerName: extractName(t.text) || t.customer_name || "Anonymous",
        customerEmail: t.customer_email,
        customerTagline: t.customer_tagline,
        customerCompany: t.customer_company,
        date: t.date,
        approved: t.approved,
        publicUrl: t.links?.public ?? "",
      }));
  } catch (err) {
    console.error("[senja] fetch threw:", err);
    return [];
  }
}

/**
 * Senja text often includes the author's name/title as a signature
 * at the end. Strip that so we can display it separately.
 */
function cleanText(text: string): string {
  // Remove trailing name/title lines that look like signatures
  const lines = text.split("\n");
  while (lines.length > 1) {
    const last = lines[lines.length - 1].trim();
    // If last line is short (name, title, company) remove it
    if (last.length < 60 && /^[A-Z][a-zA-Z\s.,&'-]+$/.test(last)) {
      lines.pop();
      continue;
    }
    // If last two lines are short (name + title), remove both
    if (lines.length >= 2) {
      const lastTwo = lines.slice(-2).join(" ").trim();
      if (lastTwo.length < 80 && /^[A-Z][a-zA-Z\s.,&'-]+$/.test(lastTwo.replace(/\n/g, " "))) {
        lines.pop();
        lines.pop();
        continue;
      }
    }
    break;
  }
  return lines.join("\n").trim();
}

/**
 * Extract the author's name from the signature at the end of the text.
 */
function extractName(text: string): string | null {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;

  // Look at the last 1-3 lines for a name pattern
  const candidates = lines.slice(-3);
  for (const line of candidates) {
    // Name pattern: starts with capital, no punctuation except . & ,
    if (
      line.length > 2 &&
      line.length < 50 &&
      /^[A-Z][a-zA-Z\s.&'-]+$/.test(line) &&
      !/\b(CEO|CTO|Founder|Engineer|Designer|Manager|Director)\b/i.test(line)
    ) {
      return line;
    }
  }
  return null;
}
