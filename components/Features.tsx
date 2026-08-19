import Link from 'next/link';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>BEYOND VIDEO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-heading text-[#18181B] mb-4">
            An AI story generator, not just an AI video generator
          </h2>
          <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
            The same topic prompt that renders your video can also become an AI-written story. TuberAI's engine plans a chaptered outline, drafts the prose, and typesets it into a print-ready illustrated book.
          </p>
        </div>

        {/* Highlight Banner Card */}
        <div className="bg-[#FFFFFF] border border-[#E5E2D8] rounded-3xl p-8 sm:p-12 shadow-2xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#1E1B4B] text-xs font-mono-label font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                PRINT-READY E-BOOK & NOVEL PUBLISHING
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#18181B]">
                Publish Illustrated E-books & PDFs Alongside Your Videos
              </h3>

              <p className="text-[#52525B] leading-relaxed text-sm sm:text-base">
                Monetize your YouTube channel further by turning every long-form video script into an e-book for Amazon KDP or Gumroad. TuberAI automatically typesets chapter headers, inserts scene art, and exports a print-ready PDF in one click.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Automated chapter outlines matched to video narrative',
                  'High-resolution illustration placement per chapter',
                  'Print-ready PDF & EPUB export format',
                  'Dual revenue stream: YouTube ad revenue + E-book sales',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#18181B]">
                    <CheckCircle2 className="w-4 h-4 text-[#1E1B4B] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/dashboard/create" className="btn-indigo-pill text-sm inline-flex items-center gap-2">
                  Explore Book Generator
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Book Preview Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="bg-transparent border border-[#E5E2D8] rounded-2xl p-6 shadow-inner relative">
                
                {/* Book Mockup Cover */}
                <div className="bg-[#18181B] text-white p-6 rounded-xl shadow-md border border-[#27272A] aspect-[3/4] flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono-label text-[#D97706] mb-2 uppercase tracking-widest">
                      HISTORICAL DOCUMENTARY SERIES
                    </div>
                    <h4 className="text-xl font-bold font-serif-heading text-white leading-tight">
                      The Fall of Rome
                    </h4>
                    <p className="text-xs text-[#A1A1AA] mt-1 italic">
                      A Complete 10-Hour Written & Visual Chronicle
                    </p>
                  </div>

                  <div className="border-t border-[#3F3F46] pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono-label text-[#A1A1AA]">TUBERAI PUBLISHING</span>
                    <span className="text-[10px] font-mono-label text-[#1E1B4B] bg-[#EEF2FF] px-2 py-0.5 rounded font-bold border border-[#C7D2FE]">
                      PDF READY
                    </span>
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
