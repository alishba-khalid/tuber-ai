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
    <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="badge-indigo">
            <Sparkles className="w-3.5 h-3.5" />
            AI LONG-FORM YOUTUBE GENERATOR
          </span>
        </div>

        {/* Main Serif Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-heading text-[#E2F8FC] leading-[1.15] tracking-tight mb-6 max-w-3xl mx-auto">
          The <span className="text-[#9FE8FA]">Ten-</span><span className="text-[#D97706]">Hour</span> AI Video Generator.
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-[#9FE8FA]ase md:text-lg text-[#678B94] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          TuberAI writes, voices, and renders hours of chaptered YouTube content in a single job. No camera, no voice drift — just your topic, automatically packaged to publish.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            href="/dashboard/create"
            className="btn-indigo-pill text-sm px-6 py-3 flex items-center gap-2 group w-full sm:w-auto"
          >
            Create your first video
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/how-it-works"
            className="btn-outline-pill text-sm px-6 py-3 w-full sm:w-auto"
          >
            See how it works
          </Link>
        </div>

        {/* Sub-hero Chips */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {subHeroChips.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1 rounded-full text-xs font-medium text-[#678B94] bg-[#0B1E24] border border-[#133038]"
            >
              ✓ {chip}
            </span>
          ))}
        </div>

        {/* Interactive Video Preview Widget */}
        <div className="max-w-4xl mx-auto text-left">
          <div className="bg-[#0B1E24] border border-[#133038] rounded-2xl shadow-sm overflow-hidden">
            
            {/* Widget Header Bar */}
            <div className="bg-transparent border-b border-[#133038] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#9FE8FA]" />
                <span className="text-xs font-mono-label font-bold text-[#E2F8FC]">
                  PROJECT: ROME_FULL_HISTORY.MP4
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-label text-[#4B656B]">
                <Clock className="w-3.5 h-3.5 text-[#9FE8FA]" />
                <span>10:00:00 MAX</span>
                <span className="text-[#9FE8FA] font-bold ml-2">100% RENDERED</span>
              </div>
            </div>

            {/* Chapter Tabs Row */}
            <div className="flex border-b border-[#133038] bg-[#0B1E24] overflow-x-auto">
              {chapterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-xs font-mono-label font-semibold border-b-2 transition-all flex items-center gap-2 flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-[#1E1B4B] text-[#9FE8FA] bg-[#9FE8FA]/10/60'
                      : 'border-transparent text-[#4B656B] hover:text-[#E2F8FC] hover:bg-transparent'
                  }`}
                >
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-transparent border border-[#133038]">
                    {tab.time}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Chapter Body Preview */}
            <div className="p-5 sm:p-6 bg-[#0B1E24]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Visual Thumbnail */}
                <div className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-[#E2F8FC] border border-[#133038] group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 z-20 flex items-center justify-center group-hover:scale-105 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#9FE8FA] text-white flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 z-20 text-white text-xs font-medium">
                    <span className="bg-[#9FE8FA] text-white text-[10px] px-2 py-0.5 rounded-full mr-1.5 font-mono-label">SCENE 14</span>
                    Ancient Roman Forum Rendering
                  </div>
                </div>

                {/* Script & Narration Detail */}
                <div className="md:col-span-7 space-y-3">
                  <div>
                    <div className="text-[11px] font-mono-label text-[#9FE8FA] font-semibold mb-0.5">
                      ACTIVE NARRATION SCRIPT
                    </div>
                    <h3 className="text-[#9FE8FA]ase sm:text-lg font-bold font-serif-heading text-[#E2F8FC]">
                      {selectedChapter.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#678B94] leading-relaxed italic border-l-2 border-[#1E1B4B] pl-3 py-0.5">
                    "By the 1st century BCE, Rome had grown beyond a city-state into a Mediterranean empire. But with vast conquest came internal strife, civil wars, and the rise of ambitious generals..."
                  </p>

                  {/* Audio Waveform */}
                  <div className="bg-transparent p-3 rounded-xl border border-[#133038] space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#4B656B]">
                      <span className="flex items-center gap-1 font-mono-label text-[11px]">
                        <Volume2 className="w-3.5 h-3.5 text-[#9FE8FA]" /> Voice: Marcus (Deep Authoritative)
                      </span>
                      <span className="font-mono-label text-[11px]">00:00:00 / 10:00:00</span>
                    </div>
                    <div className="flex items-center gap-0.5 h-5">
                      {[40,65,30,85,50,95,70,45,80,60,90,40,75,55,85,60,40,95,70,50,80,65,90,45,70,85,60,40,75,90,55,70,85,50,60,90,40,75,60,85].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-full transition-all duration-300"
                          style={{
                            height: `${h}%`,
                            backgroundColor: i < 16 ? '#1E1B4B' : '#133038'
                          }}
                        />
                      ))}
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
