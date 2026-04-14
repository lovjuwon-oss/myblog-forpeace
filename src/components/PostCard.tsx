import Link from "next/link";
import type { Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

export function PostCard({ post, featured }: PostCardProps) {
  const href = `/posts/${encodeURIComponent(post.topic)}/${encodeURIComponent(post.slug)}`;
  const borderClass = featured
    ? "border-neon-volt shadow-[inset_0_4px_25px_rgba(0,0,0,0.14)]"
    : "border-[rgba(65,65,65,0.8)]";

  return (
    <Link
      href={href}
      className={`group block rounded-lg border bg-near-black/30 p-6 transition-colors hover:bg-hover-gray/40 ${borderClass}`}
    >
      <p className="text-sm font-semibold uppercase tracking-[1.4px] text-silver">
        {post.topic}
      </p>
      <h2 className="mt-2 text-xl font-bold leading-snug text-white transition-colors group-hover:text-neon-volt md:text-2xl">
        {post.title}
      </h2>
      <time
        dateTime={post.date}
        className="mt-3 block text-sm text-silver"
      >
        {post.date}
      </time>
      {post.description ? (
        <p className="mt-3 text-base leading-relaxed text-silver">
          {post.description}
        </p>
      ) : null}
    </Link>
  );
}
