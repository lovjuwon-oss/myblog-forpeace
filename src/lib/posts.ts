import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** 파일명: YYYY-MM-DD-제목슬러그.md */
const ARTICLE_FILENAME =
  /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;

export type Post = {
  topic: string;
  slug: string;
  title: string;
  date: string;
  description?: string;
  content: string;
};

function ensureContentDir(): void {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

function parseFilename(
  basename: string
): { date: string; slugBase: string } | null {
  const m = basename.match(ARTICLE_FILENAME);
  if (!m) return null;
  return { date: m[1], slugBase: m[2] };
}

function readPostFile(topic: string, file: string, fullPath: string): Post | null {
  const parsedName = parseFilename(file);
  if (!parsedName) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const slug = `${parsedName.date}-${parsedName.slugBase}`;
  const title =
    typeof data.title === "string" && data.title.trim()
      ? data.title.trim()
      : humanizeSlug(parsedName.slugBase);
  const date =
    typeof data.date === "string" && data.date.trim()
      ? data.date.trim()
      : parsedName.date;
  const description =
    typeof data.description === "string" ? data.description : undefined;

  return {
    topic,
    slug,
    title,
    date,
    description,
    content,
  };
}

function humanizeSlug(slugBase: string): string {
  return slugBase
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** 주제 폴더 아래의 마크다운만 글로 인식합니다. 파일명은 YYYY-MM-DD-제목.md 형식이어야 합니다. */
export function getAllPosts(): Post[] {
  ensureContentDir();
  const posts: Post[] = [];

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const topic = entry.name;
    const topicPath = path.join(CONTENT_DIR, topic);
    const files = fs.readdirSync(topicPath);
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const fullPath = path.join(topicPath, file);
      const stat = fs.statSync(fullPath);
      if (!stat.isFile()) continue;
      const post = readPostFile(topic, file, fullPath);
      if (post) posts.push(post);
    }
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export function getTopics(): string[] {
  ensureContentDir();
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

export function getPostsByTopic(topic: string): Post[] {
  return getAllPosts().filter((p) => p.topic === topic);
}

export function getPost(topic: string, slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.topic === topic && p.slug === slug) ?? null;
}

export function getAllSlugs(): { topic: string; slug: string }[] {
  return getAllPosts().map((p) => ({ topic: p.topic, slug: p.slug }));
}
