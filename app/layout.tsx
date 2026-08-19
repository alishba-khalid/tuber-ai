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
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-[#0C1D24] selection:bg-[#0F6F8A] selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
