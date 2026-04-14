import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllSlugs, getPost } from "@/lib/posts";

type Props = { params: Promise<{ topic: string; slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map(({ topic, slug }) => ({
    topic,
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: rawTopic, slug: rawSlug } = await params;
  const topic = decodeURIComponent(rawTopic);
  const slug = decodeURIComponent(rawSlug);
  const post = getPost(topic, slug);
  if (!post) return { title: "글 없음" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { topic: rawTopic, slug: rawSlug } = await params;
  const topic = decodeURIComponent(rawTopic);
  const slug = decodeURIComponent(rawSlug);
  const post = getPost(topic, slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <nav className="text-sm text-silver">
        <Link href="/" className="transition-colors hover:text-neon-volt">
          홈
        </Link>
        <span className="mx-2 text-charcoal">/</span>
        <Link
          href={`/posts/${encodeURIComponent(topic)}`}
          className="transition-colors hover:text-neon-volt"
        >
          {topic}
        </Link>
        <span className="mx-2 text-charcoal">/</span>
        <span className="text-white">{post.title}</span>
      </nav>
      <header className="mt-8 border-b border-[rgba(65,65,65,0.8)] pb-10">
        <p className="text-sm font-semibold uppercase tracking-[1.4px] text-silver">
          {post.topic}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <time
          dateTime={post.date}
          className="mt-4 block text-base text-silver"
        >
          {post.date}
        </time>
        {post.description ? (
          <p className="mt-4 text-lg text-silver">{post.description}</p>
        ) : null}
      </header>
      <div className="prose-article mt-10">
        <MarkdownBody content={post.content} />
      </div>
    </article>
  );
}
