import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-[#CADAE0] py-16 text-[#4B6E7A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0F6F8A] flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#E6EEF0]" />
              </div>
              <span className="text-lg font-bold font-serif-heading text-[#0C1D24]">
                Tuber<span className="text-[#0F6F8A]">AI</span>
              </span>
            </Link>

            <p className="text-xs text-[#7A9CA8] max-w-sm leading-relaxed">
              TuberAI is an automated long-form AI video generator that scripts, voices, renders, and packages 10-minute to 10-hour YouTube content from a single prompt.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-mono-label font-bold text-[#0C1D24] uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/how-it-works" className="hover:text-[#0C1D24] transition-colors">How it works</Link></li>
              <li><Link href="/examples" className="hover:text-[#0C1D24] transition-colors">Examples</Link></li>
              <li><Link href="/pricing" className="hover:text-[#0C1D24] transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-[#0C1D24] transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Comparisons */}
          <div>
            <h4 className="text-xs font-mono-label font-bold text-[#0C1D24] uppercase tracking-wider mb-4">
              Comparisons
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-[#7A9CA8]">vs. StoryShort</span></li>
              <li><span className="text-[#7A9CA8]">vs. Mootion</span></li>
              <li><span className="text-[#7A9CA8]">vs. MagicLight</span></li>
              <li><span className="text-[#7A9CA8]">vs. InVideo AI</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-mono-label font-bold text-[#0C1D24] uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-[#7A9CA8]">Terms of Service</span></li>
              <li><span className="text-[#7A9CA8]">Privacy Policy</span></li>
              <li><span className="text-[#7A9CA8]">Cookie Policy</span></li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-[#CADAE0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9CA8] gap-4">
          <p>© {new Date().getFullYear()} TuberAI Inc. All rights reserved.</p>
          <p className="font-mono-label text-[11px]">THE TEN-HOUR AI VIDEO GENERATOR</p>
        </div>

      </div>
    </footer>
  );
}
