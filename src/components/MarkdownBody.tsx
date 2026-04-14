import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownBodyProps = {
  content: string;
};

export function MarkdownBody({ content }: MarkdownBodyProps) {
  return (
    <article className="prose prose-lg prose-invert prose-blog max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
