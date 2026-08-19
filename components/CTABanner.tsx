import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-transparent border-t border-[#E5E2D8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#1E1B4B] text-white rounded-3xl p-10 sm:p-16 shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono-label">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START GENERATING TODAY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white leading-tight">
              See it run for yourself
            </h2>

            <p className="text-base sm:text-lg text-[#E0E7FF] font-light">
              Start free — your first full-length AI video is only minutes away. No credit card required.
            </p>

            <div className="pt-4">
              <Link
                href="/auth/signup"
                className="bg-[#FFFFFF] text-[#1E1B4B] hover:bg-transparent rounded-full font-bold px-8 py-4 text-base inline-flex items-center gap-2 shadow-md transition-all hover:scale-105"
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
