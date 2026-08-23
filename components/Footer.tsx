import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-[#122823] py-16 text-[#8FAAA6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C5B49F] flex items-center justify-center text-[#030706]">
                <Sparkles className="w-3.5 h-3.5 text-[#030706]" />
              </div>
              <span className="text-lg font-bold font-serif-heading text-[#ECFDF5]">
                GenBy<span className="text-[#C5B49F]">Ghost</span>
              </span>
            </Link>

            <p className="text-xs text-[#527E72] max-w-sm leading-relaxed">
              Gen by Ghost is an automated long-form AI video generator that scripts, voices, renders, and packages 10-minute to 10-hour YouTube content from a single prompt.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-mono-label font-bold text-[#ECFDF5] uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/how-it-works" className="hover:text-[#C5B49F] transition-colors">How it works</Link></li>
              <li><Link href="/examples" className="hover:text-[#C5B49F] transition-colors">Examples</Link></li>
              <li><Link href="/pricing" className="hover:text-[#C5B49F] transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-[#C5B49F] transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Comparisons */}
          <div>
            <h4 className="text-xs font-mono-label font-bold text-[#ECFDF5] uppercase tracking-wider mb-4">
              Comparisons
            </h4>
            <ul className="space-y-2.5 text-xs text-[#527E72]">
              <li><span>vs. StoryShort</span></li>
              <li><span>vs. Mootion</span></li>
              <li><span>vs. MagicLight</span></li>
              <li><span>vs. InVideo AI</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-mono-label font-bold text-[#ECFDF5] uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-[#527E72]">
              <li><span>Terms of Service</span></li>
              <li><span>Privacy Policy</span></li>
              <li><span>Cookie Policy</span></li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-[#122823] flex flex-col sm:flex-row items-center justify-between text-xs text-[#527E72] gap-4">
          <p>© {new Date().getFullYear()} Gen by Ghost Inc. All rights reserved.</p>
          <p className="font-mono-label text-[11px] text-[#C5B49F]">THE GHOST CHANNEL AUTOMATOR</p>
        </div>

      </div>
    </footer>
  );
}
