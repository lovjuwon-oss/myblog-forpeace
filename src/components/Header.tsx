import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(65,65,65,0.8)] bg-pure-black">
      <div className="mx-auto flex max-w-[2200px] items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-10 lg:px-16">
        <Link
          href="/"
          className="min-w-0 font-black tracking-tight text-[1.125rem] leading-tight text-white transition-colors hover:text-neon-volt sm:text-[1.5rem] md:text-[1.85rem] lg:text-[2.25rem]"
        >
          포피스의 공방
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[1.4px] text-silver transition-colors hover:text-neon-volt"
          >
            홈
          </Link>
          <Link
            href="/#topics"
            className="text-sm font-semibold uppercase tracking-[1.4px] text-silver transition-colors hover:text-neon-volt"
          >
            주제
          </Link>
        </nav>
      </div>
    </header>
  );
}
