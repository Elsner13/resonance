"use client";

import { cn } from "@/lib/utils";
import type { SubstackPost } from "@/lib/substack";
import { formatPostDate } from "@/lib/substack";

/**
 * Infinite horizontal marquee of the latest Substack posts as cards.
 * Duplicates the source set so the loop reads continuously; pauses on hover.
 * Uses CSS animation for better performance and reliable hover-pause.
 */
export function LatestPostsMarquee({
  posts,
  speed = 50,
  className,
}: {
  posts: SubstackPost[];
  speed?: number;
  className?: string;
}) {
  if (posts.length === 0) return null;

  // Duplicate the set 4x so the loop never reveals an edge.
  const loop = [...posts, ...posts, ...posts, ...posts];
  const durationSec = (posts.length * 380) / speed;

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        className,
      )}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className="flex w-max items-stretch gap-6 will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${durationSec}s linear infinite`,
        }}
      >
        {loop.map((post, i) => (
          <PostCard key={`${post.link}-${i}`} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: SubstackPost }) {
  const date = formatPostDate(post.pubDate);
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noreferrer noopener"
      className="group/card block w-[300px] shrink-0 sm:w-[340px]"
    >
      <article className="flex h-full flex-col overflow-hidden border border-rule bg-bone transition-colors duration-200 group-hover/card:border-ink">
        {post.image ? (
          // Use plain <img> — Substack CDN URLs include characters that break next/image's URL parser.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt=""
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="aspect-[16/9] w-full bg-ink" />
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="font-sans text-xs uppercase tracking-[0.16em] text-muted">
            {date}
          </div>
          <h4 className="mt-3 font-sans text-lg font-semibold leading-snug tracking-tight text-ink line-clamp-2 transition-colors group-hover/card:text-signal">
            {post.title}
          </h4>
          {post.description && (
            <p className="copy mt-2 text-sm text-ink/75 line-clamp-2 pretty">
              {post.description}
            </p>
          )}
        </div>
      </article>
    </a>
  );
}
