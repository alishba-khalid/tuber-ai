import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';
import { Play, Zap, Eye } from 'lucide-react';
import Link from 'next/link';

const title = 'Examples — GenByGhost';
const description = 'Browse example video formats built with GenByGhost, across documentaries, sleep stories, explainers, and true crime.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/examples' },
  openGraph: { title, description, type: 'website', url: '/examples' },
  twitter: { card: 'summary_large_image', title, description },
};

const examples = [
  { id: 1, title: 'The Complete History of Ancient Rome', format: 'Documentary', duration: '2h 15m', thumbnail_color: 'from-amber-900 to-amber-700', description: 'A sweeping narrative covering the founding myths, the Republic, Julius Caesar, the Empire, and the eventual fall.' },
  { id: 2, title: 'A Quiet Night in the Japanese Forest', format: 'Sleep Story', duration: '8h 00m', thumbnail_color: 'from-emerald-900 to-emerald-700', description: 'Ambient sleep storytelling set in a peaceful bamboo forest. Perfect for relaxation and sleep.' },
  { id: 3, title: 'Atomic Habits — Complete Book Summary', format: 'Book Summary', duration: '1h 15m', thumbnail_color: 'from-blue-900 to-blue-700', description: 'A comprehensive breakdown of James Clear\'s bestselling habit formation framework.' },
  { id: 4, title: 'True Crime: The Zodiac Killer Decoded', format: 'True Crime', duration: '1h 45m', thumbnail_color: 'from-red-900 to-red-700', description: 'A deep investigation into one of America\'s most notorious unsolved crime cases.' },
  { id: 5, title: 'How Black Holes Actually Work', format: 'Explainer', duration: '42m', thumbnail_color: 'from-purple-900 to-purple-700', description: 'A clear, detailed explanation of black holes, from formation to the information paradox.' },
  { id: 6, title: 'The Psychology of Money — Full Analysis', format: 'Book Summary', duration: '1h 30m', thumbnail_color: 'from-green-900 to-green-700', description: 'Morgan Housel\'s timeless lessons about wealth, greed, and happiness explained in depth.' },
  { id: 7, title: 'Ancient Egypt: Secrets of the Pharaohs', format: 'Documentary', duration: '3h 00m', thumbnail_color: 'from-yellow-900 to-yellow-700', description: 'From the Great Pyramids to Cleopatra — the full story of ancient Egyptian civilization.' },
  { id: 8, title: 'The Complete Guide to Index Investing', format: 'Finance', duration: '55m', thumbnail_color: 'from-teal-900 to-teal-700', description: 'Everything you need to know about passive investing, ETFs, and long-term wealth building.' },
  { id: 9, title: 'Ocean Depths: 8 Hours of Calm Waves', format: 'Sleep Story', duration: '8h 00m', thumbnail_color: 'from-cyan-900 to-cyan-700', description: 'Deep, calming ocean soundscape with gentle narration for sleep and relaxation.' },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
    { '@type': 'ListItem', position: 2, name: 'Examples', item: 'https://www.genbyghost.com/examples' },
  ],
};

export default function ExamplesPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="text-center py-16 max-w-3xl mx-auto px-4">
          <div className="badge-indigo inline-flex mb-4">
            <Eye className="w-3 h-3" />
            <span>Real AI-Generated Videos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
            See what <span className="text-[#C5B49F]">GenByGhost creates</span>
          </h1>
          <p className="text-[#8FAAA6] text-lg">
            Every video below was created from a single prompt — no scripting, no editing, no filming.
          </p>
        </div>

        {/* Examples grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((ex) => (
              <div key={ex.id} className="bg-[#0A1412] border border-[#122823] hover:border-[#225146] rounded-2xl overflow-hidden transition-all group cursor-pointer shadow-2xs">
                {/* Thumbnail */}
                <div className={`h-44 bg-gradient-to-br ${ex.thumbnail_color} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-[#ECFDF5] fill-white ml-0.5" />
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-[#ECFDF5] text-xs font-medium px-2 py-1 rounded-md">
                    {ex.duration}
                  </div>
                  {/* Format badge */}
                  <div className="absolute top-3 left-3 bg-[#C5B49F] text-[#030706] text-xs font-semibold px-2 py-1 rounded-md">
                    {ex.format}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#ECFDF5] mb-2 line-clamp-2">{ex.title}</h3>
                  <p className="text-xs text-[#8FAAA6] leading-relaxed mb-3 line-clamp-2">{ex.description}</p>
                  <div className="flex items-center gap-3 text-xs text-[#527E72]">
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> AI Generated</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/signup" className="btn-indigo-pill px-8 py-4 text-sm inline-flex items-center gap-2">
              Start Creating Your Videos →
            </Link>
            <p className="text-[#527E72] text-sm mt-3">Buy credits and start generating in minutes.</p>
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
