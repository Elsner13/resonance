/**
 * Fetch the latest posts from Sam's Substack RSS feed.
 * Server-side only — runs at build time and is revalidated via ISR.
 */

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

const FEED_URL = "https://samelsner.substack.com/feed";

function unescapeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8212;/g, "—")
    .replace(/&#8211;/g, "–")
    .replace(/&#183;/g, "·")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function extractField(item: string, tag: string): string | null {
  const cdataPattern = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
  const cdata = item.match(cdataPattern);
  if (cdata) return cdata[1];
  const plainPattern = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
  const plain = item.match(plainPattern);
  if (plain) return unescapeXml(plain[1]);
  return null;
}

export async function getLatestPosts(limit = 3): Promise<SubstackPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      // Revalidate once an hour. Substack updates aren't time-critical.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    return itemBlocks.slice(0, limit).map((block): SubstackPost => {
      const inner = block.slice("<item>".length, -"</item>".length);
      const title = extractField(inner, "title") ?? "";
      const link = extractField(inner, "link") ?? "";
      const pubDate = extractField(inner, "pubDate") ?? "";
      const description = extractField(inner, "description") ?? "";
      const enclosureMatch = inner.match(/<enclosure\s+url="([^"]+)"/);
      const image = enclosureMatch ? enclosureMatch[1] : undefined;
      return { title, link, pubDate, description, image };
    });
  } catch {
    return [];
  }
}

export function formatPostDate(pubDate: string): string {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
