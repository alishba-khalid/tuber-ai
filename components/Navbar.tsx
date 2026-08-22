'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu, X, Sparkles, ChevronDown,
  FileText, Mic, Image, Film, Youtube,
  BarChart2, Wand2, VideoIcon, ArrowRight
} from 'lucide-react';

const tools = [
  {
    icon: FileText,
    label: 'Script',
    desc: 'Generate chaptered, voice-ready scripts',
    href: '/dashboard/create',
  },
  {
    icon: Mic,
    label: 'Voiceover',
    desc: 'High-fidelity, realistic narration for long videos',
    href: '/dashboard/create',
  },
  {
    icon: Wand2,
    label: 'Voice clone',
    desc: 'Clone your voice for YouTube video narration',
    href: '/dashboard/create',
  },
  {
    icon: Image,
    label: 'Visuals',
    desc: 'Generate thousands of consistent scene images',
    href: '/dashboard/create',
  },
  {
    icon: Film,
    label: 'Animation',
    desc: 'Animate static images into realistic cinematic clips',
    href: '/dashboard/create',
  },
  {
    icon: VideoIcon,
    label: 'Long-form video',
    desc: 'Generate finished 1–10 hour faceless YouTube videos',
    href: '/dashboard/create',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    desc: 'Auto upload and publish finished videos to your channel',
    href: '/dashboard/create',
  },
  {
    icon: BarChart2,
    label: 'SEO pack',
    desc: 'Generate optimised video titles, descriptions & tags',
    href: '/dashboard/create',
  },
];

const navLinks = [
  { label: 'Showcase', href: '#showcase' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050B0A]/90 backdrop-blur-md border-b border-[#122823] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#C5B49F] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-[#050B0A]" />
            </div>
            <span className="text-xl font-bold font-serif-heading tracking-tight text-[#ECFDF5]">
              Tuber<span className="text-[#C5B49F]">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0A1412]/80 border border-[#122823] px-4 py-2 rounded-full shadow-2xs">
            
            {/* Product Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                onMouseEnter={() => setToolsOpen(true)}
                className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-[#8FAAA6] hover:text-[#ECFDF5] rounded-full hover:bg-[#122823] transition-colors cursor-pointer focus:outline-none"
              >
                Product
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Panel */}
              {toolsOpen && (
                <div
                  onMouseLeave={() => setToolsOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[540px] bg-[#0A1412] border border-[#122823] rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in"
                >
                  <div className="grid grid-cols-2 gap-px bg-[#122823] p-px">
                    {tools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.label}
                          href={tool.href}
                          onClick={() => setToolsOpen(false)}
                          className="flex items-start gap-3 p-4 bg-[#0A1412] hover:bg-[#122823] transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#C5B49F]/10 border border-[#C5B49F]/20 flex items-center justify-center text-[#C5B49F] flex-shrink-0 mt-0.5 group-hover:bg-[#C5B49F] group-hover:text-[#030706] transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#ECFDF5] group-hover:text-[#C5B49F] transition-colors">
                              {tool.label}
                            </div>
                            <div className="text-xs text-[#527E72] leading-snug mt-0.5">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer row */}
                  <div className="px-4 py-3 bg-transparent border-t border-[#122823]">
                    <a
                      href="#product-capabilities"
                      onClick={() => setToolsOpen(false)}
                      className="text-xs font-semibold text-[#C5B49F] flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      See capabilities outline <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Regular Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-[#8FAAA6] hover:text-[#ECFDF5] rounded-full hover:bg-[#122823] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-[#8FAAA6] hover:text-[#ECFDF5] transition-colors px-2"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="btn-indigo-pill text-xs px-4 py-2"
            >
              Get started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#ECFDF5] p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden py-4 px-4 bg-[#0A1412] border-t border-[#122823] rounded-b-2xl shadow-lg">
            <div className="flex flex-col gap-1">
              
              {/* Mobile Tools Submenu */}
              <div className="text-xs font-mono-label font-bold text-[#527E72] uppercase px-3 pt-2 pb-1">
                Product Tools
              </div>
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.label}
                    href={tool.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#ECFDF5] rounded-xl hover:bg-[#122823]"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Icon className="w-4 h-4 text-[#C5B49F]" />
                    {tool.label}
                  </Link>
                );
              })}

              <div className="h-px bg-[#122823] my-2" />

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2.5 text-sm font-medium text-[#ECFDF5] rounded-xl hover:bg-[#122823]"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-[#122823] flex flex-col gap-2 mt-1">
                <Link
                  href="/auth/login"
                  className="btn-outline-pill w-full text-center text-sm py-2.5"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-indigo-pill w-full text-center text-sm py-2.5"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
