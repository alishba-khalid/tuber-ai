'use client';

import { useState } from 'react';
import {
  Video, FileText, Mic, Image as ImageIcon, Film, Upload
} from 'lucide-react';

const capabilities = [
  {
    id: 'long-form',
    icon: Video,
    label: 'LONG-FORM GENERATION',
    title: 'Generate Long-Form YouTube Videos With AI',
    desc: "While other AI video tools limit you to 2-minute shorts, GenByGhost's rendering pipeline compiles seamless documentary-style videos ranging from 10 minutes up to 10 hours in length.",
    mockupType: 'render'
  },
  {
    id: 'scripting',
    icon: FileText,
    label: 'AI SCRIPTING',
    title: 'AI Script Generator for Long-Form YouTube',
    desc: 'Our semantic outliner drafts a highly researched, chapter-by-chapter narration script designed to maximize viewer retention and engagement.',
    mockupType: 'script'
  },
  {
    id: 'narration',
    icon: Mic,
    label: 'AI NARRATION',
    title: 'AI Voice Narration for Long YouTube Videos',
    desc: 'Generate voice narration in your own cloned voice or select from premium voice profiles, maintaining absolute tonal stability over multi-hour runs.',
    mockupType: 'voice'
  },
  {
    id: 'visuals',
    icon: ImageIcon,
    label: 'SCENE-MATCHED VISUALS',
    title: 'AI-Generated Visuals for Every Scene',
    desc: 'GenByGhost generates high-resolution widescreen illustrations corresponding scene-by-scene to the narration script. Every paragraph is visualised.',
    mockupType: 'visuals'
  },
  {
    id: 'editing',
    icon: Film,
    label: 'AUTOMATIC EDITING',
    title: 'Automatic YouTube Video Editing',
    desc: 'Audio tracks, visual frames, dynamic subtitles, and background soundtracks are merged and encoded on cloud GPUs, verifying every frame for errors.',
    mockupType: 'timeline'
  },
  {
    id: 'publishing',
    icon: Upload,
    label: 'YOUTUBE PUBLISHING',
    title: 'Automatically Publish Videos to YouTube',
    desc: 'Get your completed video packed with auto-generated chapters, SEO tags, descriptions, and titles ready for direct upload.',
    mockupType: 'youtube'
  }
];

export default function Features() {
  const [activeTab, setActiveTab] = useState('long-form');
  const activeCap = capabilities.find(c => c.id === activeTab) || capabilities[0];

  return (
    <section id="product-capabilities" className="py-24 bg-transparent border-t border-[#122823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="badge-indigo mb-4">
            <span>CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
            What GenByGhost Handles
          </h2>
          <p className="text-sm sm:text-base text-[#8FAAA6] leading-relaxed">
            From research to export, GenByGhost replaces the entire production crew. Here is a look at what the engine manages under the hood.
          </p>
        </div>

        {/* Interactive Staggered Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Column: Vertical tabs of capabilities */}
          <div className="lg:col-span-5 space-y-4">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              const isActive = activeTab === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveTab(cap.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex gap-4 items-start cursor-pointer focus:outline-none ${
                    isActive 
                      ? 'bg-[#122823]/30 border-[#C5B49F]/30 text-white shadow-xs' 
                      : 'bg-[#0A1412] border-[#122823] text-[#8FAAA6] hover:border-[#C5B49F]/10 hover:text-[#ECFDF5]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isActive ? 'bg-[#C5B49F] border-transparent text-[#030706]' : 'bg-[#122823] border-[#122823] text-[#C5B49F]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-xs font-mono-label font-bold tracking-wider mb-1 ${isActive ? 'text-[#C5B49F]' : 'text-[#527E72]'}`}>
                      {cap.label}
                    </h3>
                    <p className="text-sm font-semibold mb-1 font-serif-heading text-white">{cap.title}</p>
                    <p className="text-xs text-[#8FAAA6] leading-relaxed font-sans">{cap.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Mockup Showcase */}
          <div className="lg:col-span-7">
            <div className="bg-[#0A1412] border border-[#122823] rounded-3xl p-6 shadow-xl relative min-h-[400px] flex flex-col justify-between font-mono text-xs overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#C5B49F]/3 rounded-full blur-[60px] pointer-events-none" />
              
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-[#122823] pb-4 mb-6">
                <div>
                  <h4 className="text-xs font-mono-label font-bold text-[#ECFDF5]">GENBYGHOST ENGINE PREVIEW</h4>
                  <p className="text-[10px] text-[#527E72] mt-0.5 font-mono-label">Active view: {activeCap.label}</p>
                </div>
                <span className="text-[9px] font-mono-label text-[#030706] bg-[#C5B49F] px-2.5 py-1 rounded font-bold">
                  LIVE INTERFACE
                </span>
              </div>

              {/* Dynamic Interface Panels */}
              <div className="flex-1 flex flex-col justify-center">

                {/* Mockup 1: Render panel (Long-form) */}
                {activeCap.mockupType === 'render' && (
                  <div className="bg-[#050B0A] border border-[#122823] p-5 rounded-xl space-y-4">
                    <div className="text-[10px] text-[#C5B49F] font-bold">LONG-FORM COMPILE STATUS</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] text-[#8FAAA6]">
                        <span>Target Duration:</span>
                        <span className="text-emerald-400">10:00:00 (10 Hours Max)</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-[#8FAAA6]">
                        <span>Audio Resolution:</span>
                        <span>48.0 kHz WAV Stereo</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-[#8FAAA6]">
                        <span>Visual Framework:</span>
                        <span>Scene-Matched AI Art (Widescreen 16:9)</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-[#527E72]">
                        <span>Total Job Progress</span>
                        <span>67% Complete</span>
                      </div>
                      <div className="w-full bg-[#122823] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#C5B49F] h-full rounded-full" style={{ width: '67%' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mockup 2: Scriptwriting Editor */}
                {activeCap.mockupType === 'script' && (
                  <div className="bg-[#050B0A] border border-[#122823] p-5 rounded-xl space-y-3">
                    <div className="text-[10px] text-[#C5B49F] font-bold">SCRIPT COMPILER OUTLINE</div>
                    <div className="bg-[#0A1412] p-4 border border-[#122823] rounded-lg space-y-2">
                      <div className="text-[9px] text-[#527E72] font-mono-label">CHAPTER I: THE EARLY KINGS</div>
                      <p className="text-[11px] text-[#8FAAA6] italic font-sans leading-relaxed">
                        "The mud-slicked banks of the Tiber River hosted the birth of Rome. What started as small herdsmen settlements quickly consolidated under Romulus, drafting the first laws..."
                      </p>
                    </div>
                    <div className="text-[9px] text-[#527E72] font-mono-label text-right">Words generated: 14,350</div>
                  </div>
                )}

                {/* Mockup 3: Voice / Cloner */}
                {activeCap.mockupType === 'voice' && (
                  <div className="bg-[#050B0A] border border-[#122823] p-5 rounded-xl space-y-4">
                    <div className="text-[10px] text-[#C5B49F] font-bold">NARRATION & VOICE CLONE PROFILE</div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-[#0A1412] p-2 border border-[#122823] rounded-lg">
                        <span className="text-[#ECFDF5]">Voice Profile:</span>
                        <span className="font-bold text-emerald-400">Marcus (Documentary)</span>
                      </div>
                      <div className="flex justify-between items-center bg-[#0A1412] p-2 border border-[#122823] rounded-lg">
                        <span className="text-[#ECFDF5]">Custom Clone:</span>
                        <span className="text-[#C5B49F] font-semibold">UserVoice_Cloned_v2.wav</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mockup 4: Visuals grid */}
                {activeCap.mockupType === 'visuals' && (
                  <div className="space-y-3">
                    <div className="text-[10px] text-[#C5B49F] font-bold">SCENE-MATCHED ILLUSTRATIONS</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-[#050B0A] border border-[#122823] rounded-lg overflow-hidden aspect-video flex flex-col justify-between p-2 relative group">
                          <img 
                            src="/roman_forum_doc.jpg" 
                            alt="Mock visual" 
                            className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" 
                          />
                          <div className="relative z-10 text-[8px] font-mono-label bg-black/60 px-1 py-0.5 rounded border border-[#122823] text-[#C5B49F]">
                            Scene {n * 12}
                          </div>
                          <span className="relative z-10 text-[8px] text-[#527E72] font-mono-label">Generated 4K</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mockup 5: Timeline tracks */}
                {activeCap.mockupType === 'timeline' && (
                  <div className="bg-[#050B0A] border border-[#122823] p-4 rounded-xl space-y-3">
                    <div className="text-[10px] text-[#C5B49F] font-bold">GPU MULTI-TRACK ENCODING</div>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <span className="text-[8px] text-[#527E72] font-mono-label">VIDEO TRACK (16:9)</span>
                        <div className="grid grid-cols-12 gap-1 h-5">
                          <div className="col-span-5 bg-[#C5B49F]/20 border border-[#C5B49F]/45 rounded flex items-center justify-center text-[8px] text-[#C5B49F]">Intro Scene</div>
                          <div className="col-span-7 bg-[#C5B49F]/40 border border-[#C5B49F] rounded flex items-center justify-center text-[8px] text-[#030706] font-bold">Chapter I Scene</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] text-[#527E72] font-mono-label">AUDIO NARRATION</span>
                        <div className="bg-[#122823]/30 border border-[#122823] rounded h-4" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mockup 6: YouTube metadata */}
                {activeCap.mockupType === 'youtube' && (
                  <div className="bg-[#050B0A] border border-[#122823] p-4 rounded-xl space-y-3">
                    <div className="text-[10px] text-[#C5B49F] font-bold">YOUTUBE METADATA COMPILED</div>
                    <div className="space-y-2">
                      <div className="bg-[#0A1412] p-2 border border-[#122823] rounded text-[10px] text-[#8FAAA6] truncate">
                        Title: The Complete History of Rome (10-Hour Documentary)
                      </div>
                      <div className="bg-[#0A1412] p-2 border border-[#122823] rounded text-[10px] text-[#8FAAA6] truncate">
                        Chapters: 00:00 Founding · 14:20 Republic · 48:10 Caesars Empire
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Mockup Footnote */}
              <div className="mt-6 border-t border-[#122823] pt-4 text-center">
                <span className="text-[10px] text-[#527E72] font-mono-label uppercase">
                  AUTO-UPDATED ENGINE CONSOLE VIEW
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
