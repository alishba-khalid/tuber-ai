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
          <h2 className="text-3xl sm:text-4xl md:text-whitexl font-bold font-serif-heading text-[#0A1C20] mb-4">
            An AI story generator, not just an AI video generator
          </h2>
          <p className="text-sm sm:text-[#E6F2F5]ase text-[#486E78] leading-relaxed">
            The same topic prompt that renders your video can also become an AI-written story. TuberAI's engine plans a chaptered outline, drafts the prose, and typesets it into a print-ready illustrated book.
          </p>
        </div>

        {/* Highlight Banner Card - Premium Dark Obsidian Amber Style */}
        <div className="bg-white border border-[#CADCE0] rounded-3xl p-8 sm:p-12 shadow-2xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F6F8A]/10 border border-[#0F6F8A]/20 text-[#0F6F8A] text-xs font-mono-label font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                PRINT-READY E-BOOK & NOVEL PUBLISHING
              </div>

              <h3 className="text-xl sm:text-3xl font-bold font-serif-heading text-[#0A1C20] leading-tight">
                Publish Illustrated E-books & PDFs Alongside Your Videos
              </h3>

              <p className="text-[#486E78] leading-relaxed text-sm sm:text-[#E6F2F5]ase">
                Monetize your YouTube channel further by turning every long-form video script into an e-book for Amazon KDP or Gumroad. TuberAI automatically typesets chapter headers, inserts scene art, and exports a print-ready PDF in one click.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Automated chapter outlines matched to video narrative',
                  'High-resolution illustration placement per chapter',
                  'Print-ready PDF & EPUB export format',
                  'Dual revenue stream: YouTube ad revenue + E-book sales',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#0A1C20]">
                    <CheckCircle2 className="w-4 h-4 text-[#0F6F8A] flex-shrink-0" />
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
              <div className="bg-white/40 border border-[#CADCE0] rounded-2xl p-6 shadow-inner relative">
                
                {/* Book Mockup Cover */}
                <div className="bg-[#E6F2F5] text-[#E6F2F5] p-6 rounded-xl shadow-md border border-[#CADCE0] aspect-[3/4] flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono-label text-[#0F6F8A] mb-2 uppercase tracking-widest">
                      HISTORICAL DOCUMENTARY SERIES
                    </div>
                    <h4 className="text-xl font-bold font-serif-heading text-[#E6F2F5] leading-tight">
                      The Fall of Rome
                    </h4>
                    <p className="text-xs text-[#486E78] mt-1 italic">
                      A Complete 10-Hour Written & Visual Chronicle
                    </p>
                  </div>

                  <div className="border-t border-[#AEC8CC] pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono-label text-[#486E78]">TUBERAI PUBLISHING</span>
                    <span className="text-[10px] font-mono-label text-[#0F6F8A] bg-[#0F6F8A]/10 px-2 py-0.5 rounded font-bold border border-[#0F6F8A]/20">
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
