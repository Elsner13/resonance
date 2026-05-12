"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SubstackPost } from "@/lib/substack";
import { formatPostDate } from "@/lib/substack";

/**
 * Infinite horizontal marquee of the latest Substack posts as cards.
 * Duplicates the source set so the loop reads continuously; pauses on hover.
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

  // Duplicate the set 3x so even with 3 source posts the loop never reveals an edge.
  const loop = [...posts, ...posts, ...posts];
  const durationSec = (posts.length * 320) / speed;

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
      <motion.div
        className="flex shrink-0 items-stretch gap-6 will-change-transform group-hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          ease: "linear",
          duration: durationSec,
          repeat: Infinity,
        }}
      >
        {loop.map((post, i) => (
          <PostCard key={`${post.link}-${i}`} post={post} />
        ))}
      </motion.div>
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
      className="group/card block w-[300px] sm:w-[340px] shrink-0"
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
          <h4 className="mt-3 font-sans text-lg font-semibold leading-snug tracking-tight text-ink line-clamp-2 group-hover/card:text-signal transition-colors">
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
