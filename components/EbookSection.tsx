import Link from 'next/link';
import { ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';

export default function EbookSection() {
  return (
    <section className="py-20 bg-transparent border-t border-[#122823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A1412] border border-[#122823] rounded-3xl p-8 sm:p-12 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C5B49F]/3 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5B49F]/15 border border-[#C5B49F]/35 text-[#C5B49F] text-xs font-mono-label font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                PRINT-READY E-BOOK & NOVEL PUBLISHING
              </div>

              <h2 className="text-xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5] leading-tight">
                Publish Illustrated E-books & PDFs Alongside Your Videos
              </h2>

              <p className="text-[#8FAAA6] leading-relaxed text-sm sm:text-base">
                Monetize your YouTube channel further by turning every long-form video script into an e-book for Amazon KDP or Gumroad. GenByGhost automatically typesets chapter headers, inserts scene art, and exports a print-ready PDF in one click.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Automated chapter outlines matched to video narrative',
                  'High-resolution illustration placement per chapter',
                  'Print-ready PDF & EPUB export format',
                  'Dual revenue stream: YouTube ad revenue + E-book sales',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#ECFDF5]">
                    <CheckCircle2 className="w-4 h-4 text-[#C5B49F] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href="/dashboard/create" className="btn-indigo-pill text-sm inline-flex items-center gap-2">
                  Explore Book Generator
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/ai-book-generator" className="text-xs sm:text-sm font-semibold text-[#C5B49F] hover:text-[#ECFDF5] underline decoration-[#C5B49F]/30 hover:decoration-[#ECFDF5] underline-offset-4 transition-colors">
                  Learn more about the AI Book Generator &rarr;
                </Link>
              </div>
            </div>

            {/* Book Preview Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#122823]/40 border border-[#122823] rounded-2xl p-6 shadow-inner relative">

                {/* Book Mockup Cover */}
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#122823] aspect-[3/4] group">
                  <img
                    src="/fall_of_rome_cover.jpg"
                    alt="The Fall of Rome Illustrated Book Cover"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B0A]/95 via-[#050B0A]/30 to-[#050B0A]/10 z-10" />

                  <div className="relative h-full flex flex-col justify-between p-6 z-20">
                    <div>
                      <div className="text-[9px] font-mono-label text-[#C5B49F] mb-1.5 uppercase tracking-widest font-bold bg-[#C5B49F]/15 px-2 py-0.5 rounded-full inline-block border border-[#C5B49F]/30">
                        HISTORICAL DOCUMENTARY SERIES
                      </div>
                      <h3 className="text-lg font-bold font-serif-heading text-white leading-tight uppercase">
                        The Fall of Rome
                      </h3>
                      <p className="text-[11px] text-zinc-300 mt-1 italic leading-snug">
                        A Complete 10-Hour Written & Visual Chronicle
                      </p>
                    </div>

                    <div className="border-t border-white/20 pt-3 flex items-center justify-between">
                      <span className="text-[9px] font-mono-label text-zinc-400">GENBYGHOST PUBLISHING</span>
                      <span className="text-[9px] font-mono-label text-[#030706] bg-[#C5B49F] px-2 py-0.5 rounded font-bold border border-white/10 shadow-xs">
                        PDF READY
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
