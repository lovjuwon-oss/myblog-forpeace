import type { Metadata } from "next";
import { Inconsolata, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "포피스의 공방",
    template: "%s · 포피스의 공방",
  },
  description: "포피스의 공방 — 마크다운으로 정리하는 글",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${inconsolata.variable}`}>
      <body className="min-h-screen bg-pure-black font-sans text-white">
        <Header />
        <main className="mx-auto max-w-[2200px] px-4 pb-16 pt-8 sm:px-6 md:px-10 lg:px-16">
          {children}
        </main>
      </body>
    </html>
  );
}
