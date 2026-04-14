import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getPostsByTopic, getTopics } from "@/lib/posts";

type Props = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  return getTopics().map((topic) => ({ topic }));
}

export default async function TopicPage({ params }: Props) {
  const { topic: rawTopic } = await params;
  const topic = decodeURIComponent(rawTopic);
  const topics = getTopics();
  if (!topics.includes(topic)) notFound();

  const posts = getPostsByTopic(topic);

  return (
    <div>
      <nav className="text-sm text-silver">
        <Link href="/" className="transition-colors hover:text-neon-volt">
          홈
        </Link>
        <span className="mx-2 text-charcoal">/</span>
        <span className="text-white">{topic}</span>
      </nav>
      <h1 className="mt-6 text-4xl font-black leading-none text-white md:text-5xl lg:text-6xl">
        {topic}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-silver">
        이 주제의 글 {posts.length}개
      </p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
