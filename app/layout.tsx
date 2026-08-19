import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "TuberAI — AI YouTube Video Generator",
  description: "Turn any idea into a full-length YouTube video automatically. AI-powered script, voice, visuals, and publishing — all in one platform.",
  keywords: "AI video generator, YouTube automation, AI content creation, long-form video AI, faceless YouTube channel",
  openGraph: {
    title: "TuberAI — AI YouTube Video Generator",
    description: "Turn any idea into a full-length YouTube video automatically.",
    type: "website",
    siteName: "TuberAI",
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
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-[#FAFAFA] selection:bg-[#FFFFFF] selection:text-[#09090B]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
