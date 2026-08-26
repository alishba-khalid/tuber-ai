import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import LogoIcon from './LogoIcon';

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-[#122823] py-16 text-[#8FAAA6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <LogoIcon className="w-7 h-7" iconClassName="w-4 h-4" />
              <span className="text-lg font-bold font-serif-heading text-[#ECFDF5]">
                GenBy<span className="text-[#C5B49F]">Ghost</span>
              </span>
            </Link>

            <p className="text-xs text-[#527E72] max-w-sm leading-relaxed">
              GenByGhost is an automated long-form AI video generator that scripts, voices, renders, and packages 10-minute to 10-hour YouTube content from a single prompt.
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
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/versus/invideo" className="hover:text-[#C5B49F] transition-colors">vs. InVideo AI</Link></li>
              <li><Link href="/versus/pictory" className="hover:text-[#C5B49F] transition-colors">vs. Pictory</Link></li>
              <li><Link href="/versus/fliki" className="hover:text-[#C5B49F] transition-colors">vs. Fliki</Link></li>
              <li><Link href="/versus/autoshorts" className="hover:text-[#C5B49F] transition-colors">vs. AutoShorts.ai</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-mono-label font-bold text-[#ECFDF5] uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/terms" className="hover:text-[#C5B49F] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#C5B49F] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/privacy#cookies" className="hover:text-[#C5B49F] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-[#122823] flex flex-col sm:flex-row items-center justify-between text-xs text-[#527E72] gap-4">
          <p>© {new Date().getFullYear()} GenByGhost Inc. All rights reserved.</p>
          <p className="font-mono-label text-[11px] text-[#C5B49F]">THE GHOST CHANNEL AUTOMATOR</p>
        </div>

      </div>
    </footer>
  );
}
