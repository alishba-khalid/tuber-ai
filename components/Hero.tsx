'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Sparkles, ArrowRight, Clock, Volume2 } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Content (Left Aligned) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex">
              <span className="badge-indigo">
                <Sparkles className="w-3.5 h-3.5" />
                AI LONG-FORM YOUTUBE GENERATOR
              </span>
            </div>

            {/* Main Sans Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-whitexl font-bold font-serif-heading text-[#F3F4F6] leading-[1.12] tracking-tight">
              The ten-hour AI video generator. <span className="text-[#F97316] block mt-1">Published straight to YouTube.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-[#9CA3AF] max-w-2xl font-normal leading-relaxed">
              Most AI long video generators cap out at a minute or two — some stretch to 50 minutes. TuberAI doesn't. One topic in, and it writes the script, narrates it in a natural or cloned voice, generates scene-matched visuals, and renders a finished long-form video up to 10 hours — with no per-video cap on how many you make, auto-published straight to YouTube.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/dashboard/create"
                className="btn-indigo-pill text-sm px-6 py-3.5 flex items-center justify-center gap-2 group font-mono-label"
              >
                Get Started &gt;&gt;&gt;
              </Link>
              <Link
                href="/how-it-works"
                className="btn-outline-pill text-sm px-6 py-3.5 text-center"
              >
                See how it works
              </Link>
            </div>

            {/* Sub-hero Chips */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {subHeroChips.map((chip) => (
                <span
                  key={chip}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#9CA3AF] bg-[#17181F] border border-[#2A2C35]"
                >
                  ✓ {chip}
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Video Preview Widget */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#17181F] border border-[#2A2C35] rounded-2xl shadow-sm overflow-hidden">
              
              {/* Widget Header Bar */}
              <div className="bg-[#0D0E12] border-b border-[#2A2C35] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                  <span className="text-[10px] font-mono-label font-bold text-[#F3F4F6] uppercase">
                    PROJECT: ROME_FULL_HISTORY.MP4
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono-label text-[#64748B]">
                  <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>10:00:00 MAX</span>
                </div>
              </div>

              {/* Chapter Tabs Row */}
              <div className="flex border-b border-[#2A2C35] bg-[#17181F] overflow-x-auto">
                {chapterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 text-[10px] font-mono-label font-semibold border-b-2 transition-all flex items-center gap-1.5 flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'border-[#8FE1F4] text-[#F97316] bg-[#17181F]/60'
                        : 'border-transparent text-[#64748B] hover:text-[#F3F4F6] hover:bg-[#0D0E12]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active Chapter Body Preview */}
              <div className="p-4 bg-[#17181F] space-y-4">
                
                {/* Visual Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0D0E12] border border-[#2A2C35] group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 z-20 flex items-center justify-center group-hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F97316] text-[#0D0E12] flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 z-20 text-[#F3F4F6] text-xs font-medium">
                    <span className="bg-[#F97316]/20 border border-[#8FE1F4]/40 text-[#F97316] text-[9px] px-1.5 py-0.5 rounded-full mr-1.5 font-mono-label">SCENE 14</span>
                    Roman Forum Rendering
                  </div>
                </div>

                {/* Script & Narration Detail */}
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] font-mono-label text-[#F97316] font-semibold mb-0.5">
                      ACTIVE NARRATION SCRIPT
                    </div>
                    <h3 className="text-sm font-bold text-[#F3F4F6]">
                      {selectedChapter.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#9CA3AF] leading-relaxed italic border-l-2 border-[#8FE1F4] pl-3 py-0.5">
                    "By the 1st century BCE, Rome had grown beyond a city-state into a Mediterranean empire. But with vast conquest came internal strife, civil wars, and the rise of ambitious generals..."
                  </p>

                  {/* Audio Waveform */}
                  <div className="bg-[#0D0E12] p-3 rounded-xl border border-[#2A2C35] space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-[#64748B] font-mono-label">
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
                              backgroundColor: i < 16 ? '#8FE1F4' : '#2A2C35',
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
