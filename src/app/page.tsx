import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, getTopics } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const topics = getTopics();
  const latest = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="border-b border-[rgba(65,65,65,0.8)] pb-12 md:pb-16">
        <p className="text-sm font-semibold uppercase tracking-[1.4px] text-silver">
          마크다운 · 주제별 폴더 · 정적 생성
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          포피스의
          <span className="text-neon-volt"> 공방</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver md:text-xl">
          `content/주제폴더/YYYY-MM-DD-제목.md` 형식으로 글을 두면 빌드 시 페이지로
          올라옵니다. GitHub에 푸시하고 Vercel에 연결해 배포할 수 있습니다.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="#topics"
            className="inline-flex items-center justify-center rounded border border-neon-volt bg-neon-volt px-4 py-2 text-base font-semibold text-[#151515] transition-colors hover:bg-[rgb(29,29,29)] hover:text-neon-volt active:text-pale-yellow"
          >
            주제 보기
          </Link>
          {latest ? (
            <Link
              href={`/posts/${encodeURIComponent(latest.topic)}/${encodeURIComponent(latest.slug)}`}
              className="inline-flex items-center justify-center rounded border border-border-olive bg-transparent px-8 py-2 text-base font-semibold text-white transition-colors hover:bg-hover-gray active:text-pale-yellow"
            >
              최신 글
            </Link>
          ) : null}
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="rounded-lg border border-[rgba(65,65,65,0.8)] bg-near-black/20 p-10 text-center">
          <p className="text-lg text-silver">
            아직 글이 없습니다.{" "}
            <code className="rounded border border-[rgba(65,65,65,0.8)] bg-pure-black px-2 py-1 font-mono text-sm text-neon-volt">
              content/주제/2026-04-14-제목.md
            </code>{" "}
            파일을 추가해 보세요.
          </p>
        </section>
      ) : (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[1.4px] text-silver">
            최신
          </h2>
          <div className="mt-6">
            <PostCard post={latest} featured />
          </div>
          {rest.length > 0 ? (
            <>
              <h3 className="mt-14 text-sm font-semibold uppercase tracking-[1.4px] text-silver">
                이전 글
              </h3>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={`${post.topic}/${post.slug}`}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      )}

      <section id="topics" className="scroll-mt-24">
        <h2 className="text-sm font-semibold uppercase tracking-[1.4px] text-silver">
          주제
        </h2>
        {topics.length === 0 ? (
          <p className="mt-4 text-silver">
            `content` 아래에 주제 폴더를 만들고 그 안에 마크다운을 넣으세요.
          </p>
        ) : (
          <ul className="mt-6 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <li key={topic}>
                <Link
                  href={`/posts/${encodeURIComponent(topic)}`}
                  className="inline-flex rounded-lg border border-[rgba(65,65,65,0.8)] bg-near-black/40 px-5 py-3 text-base font-semibold text-white transition-colors hover:border-neon-volt hover:text-neon-volt"
                >
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
