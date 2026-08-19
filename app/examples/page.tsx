import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';
import { Play, Clock, Zap, Eye } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Examples — TuberAI',
  description: 'Browse AI-generated YouTube videos created with TuberAI. See real results across documentaries, sleep stories, explainers, and more.',
};

const examples = [
  { id: 1, title: 'The Complete History of Ancient Rome', format: 'Documentary', duration: '2h 15m', views: '142K', thumbnail_color: 'from-amber-900 to-amber-700', description: 'A sweeping narrative covering the founding myths, the Republic, Julius Caesar, the Empire, and the eventual fall.' },
  { id: 2, title: 'A Quiet Night in the Japanese Forest', format: 'Sleep Story', duration: '8h 00m', views: '891K', thumbnail_color: 'from-emerald-900 to-emerald-700', description: 'Ambient sleep storytelling set in a peaceful bamboo forest. Perfect for relaxation and sleep.' },
  { id: 3, title: 'Atomic Habits — Complete Book Summary', format: 'Book Summary', duration: '1h 15m', views: '234K', thumbnail_color: 'from-blue-900 to-blue-700', description: 'A comprehensive breakdown of James Clear\'s bestselling habit formation framework.' },
  { id: 4, title: 'True Crime: The Zodiac Killer Decoded', format: 'True Crime', duration: '1h 45m', views: '512K', thumbnail_color: 'from-red-900 to-red-700', description: 'A deep investigation into one of America\'s most notorious unsolved crime cases.' },
  { id: 5, title: 'How Black Holes Actually Work', format: 'Explainer', duration: '42m', views: '89K', thumbnail_color: 'from-purple-900 to-purple-700', description: 'A clear, detailed explanation of black holes, from formation to the information paradox.' },
  { id: 6, title: 'The Psychology of Money — Full Analysis', format: 'Book Summary', duration: '1h 30m', views: '178K', thumbnail_color: 'from-green-900 to-green-700', description: 'Morgan Housel\'s timeless lessons about wealth, greed, and happiness explained in depth.' },
  { id: 7, title: 'Ancient Egypt: Secrets of the Pharaohs', format: 'Documentary', duration: '3h 00m', views: '312K', thumbnail_color: 'from-yellow-900 to-yellow-700', description: 'From the Great Pyramids to Cleopatra — the full story of ancient Egyptian civilization.' },
  { id: 8, title: 'The Complete Guide to Index Investing', format: 'Finance', duration: '55m', views: '67K', thumbnail_color: 'from-teal-900 to-teal-700', description: 'Everything you need to know about passive investing, ETFs, and long-term wealth building.' },
  { id: 9, title: 'Ocean Depths: 8 Hours of Calm Waves', format: 'Sleep Story', duration: '8h 00m', views: '1.2M', thumbnail_color: 'from-cyan-900 to-cyan-700', description: 'Deep, calming ocean soundscape with gentle narration for sleep and relaxation.' },
];

export default function ExamplesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="text-center py-16 max-w-3xl mx-auto px-4">
          <div className="badge badge-cyan inline-flex mb-4">
            <Eye className="w-3 h-3" />
            <span>Real AI-Generated Videos</span>
          </div>
          <h1 className="text-[#060B08]xl sm:text-[#060B08]xl font-black text-[#060B08] mb-4">
            See what <span className="gradient-text">TuberAI creates</span>
          </h1>
          <p className="text-[#92A89C] text-lg">
            Every video below was created from a single prompt — no scripting, no editing, no filming.
          </p>
        </div>

        {/* Examples grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((ex) => (
              <div key={ex.id} className="glass-card glass-card-hover overflow-hidden group cursor-pointer">
                {/* Thumbnail */}
                <div className={`h-44 bg-gradient-to-br ${ex.thumbnail_color} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[#0D1410]/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-[#060B08] fill-white ml-0.5" />
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-[#060B08] text-xs font-medium px-2 py-1 rounded-md">
                    {ex.duration}
                  </div>
                  {/* Format badge */}
                  <div className="absolute top-3 left-3 bg-[#6C3DFF]/80 text-[#060B08] text-xs font-medium px-2 py-1 rounded-md">
                    {ex.format}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#060B08] mb-2 line-clamp-2">{ex.title}</h3>
                  <p className="text-xs text-[#5F7368] leading-relaxed mb-3 line-clamp-2">{ex.description}</p>
                  <div className="flex items-center gap-3 text-xs text-[#5F7368]">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {ex.views} views</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> AI Generated</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/signup" className="btn-primary px-8 py-4 text-[#D4AF37]ase inline-flex items-center gap-2">
              Start Creating Your Videos →
            </Link>
            <p className="text-[#5F7368] text-sm mt-3">No credit card required. Free to get started.</p>
          </div>
        </div>

        <div className="mt-16">
          <CTABanner />
          <Footer />
        </div>
      </div>
    </main>
  );
}
