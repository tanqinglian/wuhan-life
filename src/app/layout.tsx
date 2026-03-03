import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "武汉生活 - 发现武汉夜市与跑山路线",
  description: "一站式探索武汉夜市美食和周边跑山路线，发现最地道的本地生活",
  keywords: "武汉,夜市,跑山,美食,小吃,一日游,本地生活",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">🌃</span>
                <span className="font-bold text-lg text-gray-900">武汉生活</span>
              </a>
              <div className="flex items-center gap-6">
                <a href="/markets" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                  夜市探索
                </a>
                <a href="/routes" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                  跑山路线
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2026 武汉生活 · 发现城市另一面</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
