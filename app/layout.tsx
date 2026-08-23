import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/components/AuthProvider";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://genbyghost.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "GenByGhost — AI YouTube Video Generator",
  description: "Turn any idea into a full-length YouTube video automatically. AI-powered script, voice, visuals, and publishing — all in one platform.",
  keywords: "AI video generator, YouTube automation, AI content creation, long-form video AI, faceless YouTube channel",
  openGraph: {
    title: "GenByGhost — AI YouTube Video Generator",
    description: "Turn any idea into a full-length YouTube video automatically.",
    type: "website",
    siteName: "GenByGhost",
    url: baseUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenByGhost — AI YouTube Video Generator",
    description: "Turn any idea into a full-length YouTube video automatically.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-slate-100 selection:bg-[#C5B49F]/30 selection:text-[#ECFDF5]">
        <div className="animated-bg" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
