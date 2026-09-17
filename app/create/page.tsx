import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PublicCreateGate from '@/components/generator/PublicCreateGate';
import { Sparkles } from 'lucide-react';

const title = 'AI Long-Form Video Generator — Create a Documentary Free | GenByGhost';
const description = 'Generate long-form AI documentaries, explainers, and true crime videos from a single topic. Script, narration, visuals, and render — all in one AI video generator.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/create' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/create',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image.png'],
  },
};

export default function PublicCreatePage() {
  return (
    <main className="min-h-screen bg-[#050B0A] text-slate-100 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5B49F]/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <Navbar />

      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <div className="badge-indigo inline-flex mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Video Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4 leading-tight">
          Generate a Long-Form AI Video From One Topic
        </h1>
        <p className="text-[#8FAAA6] text-base leading-relaxed">
          Type a topic (or paste your own script), and GenByGhost researches, scripts, narrates, and renders a full-length documentary, explainer, or true crime video — no editing required.
        </p>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6F0] rounded-3xl p-4 sm:p-8 max-w-3xl mx-auto shadow-2xl">
          <PublicCreateGate />
        </div>
      </section>

      <Footer />
    </main>
  );
}
