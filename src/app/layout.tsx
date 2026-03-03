import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "武汉生活 - 夜市美食与跑山路线",
  description: "探索武汉夜市美食，发现周边精彩跑山路线",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
