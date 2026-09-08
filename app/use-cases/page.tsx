import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Sparkles, Film } from 'lucide-react';
import { useCases } from '@/lib/use-cases';

const title = 'AI Video Use Cases & Niches — GenByGhost';
const description = 'Explore proven YouTube niches and use cases for automated, faceless long-form video creation with GenByGhost.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/use-cases' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/use-cases',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image.png'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
    { '@type': 'ListItem', position: 2, name: 'Use Cases', item: 'https://www.genbyghost.com/use-cases' },
  ],
};

export default function UseCasesIndexPage() {
  return (
    <main className="min-h-screen bg-[#050B0A] text-slate-100 relative overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5B49F]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center py-12 max-w-3xl mx-auto">
            <div className="badge-indigo inline-flex mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Niches & Applications</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading text-[#ECFDF5] mb-4 tracking-tight">
              YouTube Automation <span className="text-[#C5B49F]">Use Cases</span>
            </h1>
            <p className="text-[#8FAAA6] text-lg leading-relaxed">
              Explore high-retention formats and proven faceless niches engineered for long-form watch time, consistent publishing, and autopilot channel growth.
            </p>
          </div>

          {/* Grid of 10 Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {useCases.map((useCase) => (
              <Link
                key={useCase.slug}
                href={`/use-cases/${useCase.slug}`}
                className="group bg-[#0A1412] border border-[#122823] hover:border-[#225146] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,180,159,0.05)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#225146]/20 border border-[#225146]/50 text-[#C5B49F]">
                      <Film className="w-3 h-3" />
                      {useCase.nicheName}
                    </span>
                    <span className="text-xs font-mono-label text-[#527E72] group-hover:text-[#C5B49F] transition-colors">
                      Explore guide &rarr;
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-serif-heading text-[#ECFDF5] mb-2 group-hover:text-[#C5B49F] transition-colors leading-snug">
                    {useCase.title}
                  </h2>
                  <p className="text-sm text-[#8FAAA6] leading-relaxed mb-6">
                    {useCase.metaDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#122823] flex items-center justify-between">
                  <span className="text-xs text-[#527E72] font-mono-label">
                    Full AI Pipeline Supported
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#C5B49F] group-hover:translate-x-0.5 transition-transform">
                    View Use Case <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-16 text-center bg-radial from-[#122823] to-[#0A1412] border border-[#225146] rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5] mb-3">
                Have a unique niche in mind?
              </h2>
              <p className="text-[#8FAAA6] text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                GenByGhost generates context-aware scripts, cinematic narration, and visuals for any topic or duration.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup" className="btn-indigo-pill px-8 py-3 text-sm flex items-center gap-2 font-bold">
                  Start Creating Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="text-sm font-semibold text-[#C5B49F] hover:text-[#ECFDF5] transition-colors px-6 py-2.5">
                  View Pricing Plans
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
