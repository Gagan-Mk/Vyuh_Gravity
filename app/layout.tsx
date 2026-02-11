import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VYUH GRAVITY - Strategic PR & Digital Influence | Make Your Brand Impossible to Ignore",
  description: "We craft narratives that resonate and campaigns that convert. From startups to established brands, we deliver strategic PR, performance marketing, and brand positioning that drives real results.",
  keywords: ["PR agency", "digital marketing", "brand positioning", "performance marketing", "strategic PR", "content strategy", "brand creation", "digital influence"],
  authors: [{ name: "Vyuh Gravity" }],
  openGraph: {
    title: "VYUH GRAVITY - Strategic PR & Digital Influence",
    description: "We don't just tell your story. We make it impossible to ignore. Strategic PR and digital influence that drives results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
