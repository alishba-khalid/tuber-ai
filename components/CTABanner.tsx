import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-transparent border-t border-[#122823]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#0A1412] border border-[#122823] text-slate-100 rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#C5B49F]/5 rounded-full blur-[80px] pointer-events-none -z-10" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5B49F]/15 text-[#C5B49F] border border-[#C5B49F]/30 text-xs font-mono-label">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START GENERATING TODAY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] leading-tight">
              See it run for yourself
            </h2>

            <p className="text-sm sm:text-base text-[#8FAAA6] font-light">
              Start free — your first full-length AI video is only minutes away. No credit card required.
            </p>

            <div className="pt-4">
              <Link
                href="/auth/signup"
                className="btn-indigo-pill text-sm px-8 py-4 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(197, 180, 159,0.2)] cursor-pointer"
              >
                Create your first video {'->'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
