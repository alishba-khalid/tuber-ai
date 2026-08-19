'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Sparkles, ArrowRight, Clock, Volume2, Fingerprint } from 'lucide-react';

const chapterTabs = [
  { id: 'cold-open', label: 'COLD OPEN', time: '00:00', title: 'The Founding of Rome & First Kings' },
  { id: 'chapter-1', label: 'CHAPTER I', time: '14:20', title: 'Rise of the Republic & Punic Wars' },
  { id: 'chapter-2', label: 'CHAPTER II', time: '48:10', title: 'Julius Caesar & Pax Romana' },
  { id: 'chapter-3', label: 'CHAPTER III', time: '01:32:00', title: 'Crisis of the Third Century & Decline' },
];

const subHeroChips = [
  'Sleep stories',
  'Documentaries',
  'Deep-dives & lore',
  'Faceless YouTube automation',
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState('chapter-1');
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedChapter = chapterTabs.find(c => c.id === activeTab) || chapterTabs[1];

  return (
    <section className="relative pt-24 sm:pt-32 pb-20 overflow-hidden bg-transparent">
      {/* Background Spotlight / Radial Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5B49F]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-[#C5B49F]/3 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Content (Left Aligned) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex">
              <span className="badge-indigo">
                <Sparkles className="w-3.5 h-3.5" />
                AI LONG-FORM YOUTUBE GENERATOR
              </span>
            </div>

            {/* Premium HackerRank-style Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display-title text-slate-100 leading-[1.12] tracking-tight uppercase">
                The ten-hour AI video generator. <br className="hidden sm:inline" />
                <span className="text-[#C5B49F] block mt-1.5 uppercase text-3xl sm:text-4xl lg:text-5xl tracking-normal font-display-title">Published straight to YouTube.</span>
                
                <span className="relative inline-flex items-center gap-3 mt-4 flex-wrap">
                  {/* Subtle horizontal grid lines behind the text */}
                  <span className="absolute inset-x-0 h-px bg-[#122823] top-1/2 -translate-y-1/2 -z-10" />
                  <span className="absolute inset-x-0 h-px bg-[#225146]/20 top-1/4 -translate-y-1/2 -z-10" />
                  <span className="absolute inset-x-0 h-px bg-[#225146]/20 top-3/4 -translate-y-1/2 -z-10" />
                  
                  <span className="text-slate-100 font-medium normal-case font-serif-heading text-2xl sm:text-3xl lg:text-4xl">Is</span>
                  
                  {/* Human Pill */}
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5B49F]/10 border border-[#C5B49F]/25 text-[#C5B49F] font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide shadow-[0_0_15px_rgba(197, 180, 159,0.08)] normal-case">
                    <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6" />
                    human
                  </span>
                  
                  <span className="text-[#8FAAA6] font-light font-serif-heading text-2xl sm:text-3xl lg:text-4xl">+</span>
                  
                  {/* AI Pill */}
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5B49F]/10 border border-[#C5B49F]/25 text-[#C5B49F] font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide shadow-[0_0_15px_rgba(197, 180, 159,0.08)] normal-case">
                    AI
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-[#C5B49F]" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-[#8FAAA6] max-w-2xl font-normal leading-relaxed">
              Most AI long video generators cap out at a minute or two — some stretch to 50 minutes. TuberAI doesn't. One topic in, and it writes the script, narrates it in a natural or cloned voice, generates scene-matched visuals, and renders a finished long-form video up to 10 hours — with no per-video cap on how many you make, auto-published straight to YouTube.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/dashboard/create"
                className="btn-indigo-pill text-sm px-6 py-4 flex items-center justify-center gap-2 group font-mono-label shadow-[0_0_15px_rgba(197, 180, 159,0.25)] hover:shadow-[0_0_25px_rgba(197, 180, 159,0.45)]"
              >
                Get Started &gt;&gt;&gt;
              </Link>
              <Link
                href="/how-it-works"
                className="btn-outline-pill text-sm px-6 py-4 text-center"
              >
                See how it works
              </Link>
            </div>

            {/* Sub-hero Chips */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {subHeroChips.map((chip) => (
                <span
                  key={chip}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#8FAAA6] bg-[#0A1412] border border-[#122823] hover:border-[#225146] transition-colors"
                >
                  ✓ {chip}
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Video Preview Widget */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#0A1412] border border-[#122823] rounded-2xl shadow-xl overflow-hidden shadow-emerald-950/10">
              
              {/* Widget Header Bar */}
              <div className="bg-[#122823] border-b border-[#122823] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C5B49F] animate-pulse" />
                  <span className="text-[10px] font-mono-label font-bold text-[#ECFDF5] uppercase tracking-wider">
                    PROJECT: ROME_FULL_HISTORY.MP4
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono-label text-[#8FAAA6]">
                  <Clock className="w-3.5 h-3.5 text-[#C5B49F]" />
                  <span>10:00:00 MAX</span>
                </div>
              </div>

              {/* Chapter Tabs Row */}
              <div className="flex border-b border-[#122823] bg-[#0A1412] overflow-x-auto">
                {chapterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2.5 text-[10px] font-mono-label font-semibold border-b-2 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-[#C5B49F] text-[#C5B49F] bg-[#122823]/30'
                        : 'border-transparent text-[#527E72] hover:text-[#ECFDF5] hover:bg-[#122823]/20'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active Chapter Body Preview */}
              <div className="p-4 bg-[#0A1412] space-y-4">
                
                {/* Visual Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#122823] border border-[#122823] group">
                  <img
                    src="/roman_forum_doc.jpg"
                    alt="Roman Forum Documentary Scene Preview"
                    className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B0A]/90 via-[#050B0A]/40 to-transparent z-10" />
                  
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 z-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C5B49F] text-[#030706] flex items-center justify-center shadow-lg shadow-emerald-950/50 hover:bg-[#D5C4AF] transition-colors">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 z-20 text-[#ECFDF5] text-xs font-medium">
                    <span className="bg-[#C5B49F]/25 border border-[#C5B49F]/40 text-[#C5B49F] text-[9px] px-1.5 py-0.5 rounded-full mr-1.5 font-mono-label">SCENE 14</span>
                    Roman Forum Rendering
                  </div>
                </div>

                {/* Script & Narration Detail */}
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] font-mono-label text-[#C5B49F] font-semibold mb-0.5">
                      ACTIVE NARRATION SCRIPT
                    </div>
                    <h3 className="text-sm font-bold text-[#ECFDF5]">
                      {selectedChapter.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#8FAAA6] leading-relaxed italic border-l-2 border-[#C5B49F] pl-3 py-0.5 bg-[#122823]/20">
                    "By the 1st century BCE, Rome had grown beyond a city-state into a Mediterranean empire. But with vast conquest came internal strife, civil wars, and the rise of ambitious generals..."
                  </p>

                  {/* Audio Waveform */}
                  <div className="bg-[#122823]/50 p-3 rounded-xl border border-[#122823] space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-[#527E72] font-mono-label">
                      <span>Voice: Marcus (Deep Voice)</span>
                      <span>00:00:00 / 10:00:00</span>
                    </div>
                    <div className="flex items-center gap-0.5 h-4">
                      {[40,65,30,85,50,95,70,45,80,60,90,40,75,55,85,60,40,95,70,50,80,65,90,45,70,85,60,40,75,90,55,70,85,50,60,90,40,75,60,85].map((h, i) => {
                        const delay = (i % 7) * 0.12;
                        const duration = 0.5 + (i % 5) * 0.15;
                        return (
                          <div
                            key={i}
                            className={`flex-1 rounded-full transition-all ${
                              isPlaying ? 'animate-equalizer-bar' : ''
                            }`}
                            style={{
                              height: `${h}%`,
                              backgroundColor: i < 16 ? '#C5B49F' : '#122823',
                              animationDelay: isPlaying ? `${delay}s` : undefined,
                              animationDuration: isPlaying ? `${duration}s` : undefined,
                            }}
                          />
                        );
                      })}
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
