import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <p className="text-sm font-semibold uppercase tracking-[1.4px] text-silver">
        404
      </p>
      <h1 className="mt-4 text-3xl font-black text-white md:text-4xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 text-silver">
        주제 폴더 이름이나 글 파일명이 URL과 일치하는지 확인해 보세요.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded border border-neon-volt bg-neon-volt px-4 py-2 text-base font-semibold text-[#151515] transition-colors hover:bg-[rgb(29,29,29)] hover:text-neon-volt"
      >
        홈으로
      </Link>
    </div>
  );
}
