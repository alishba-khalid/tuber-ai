'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Video, FileText, Mic, Image as ImageIcon, Film, Upload, CheckCircle2, BookOpen
} from 'lucide-react';

const capabilities = [
  {
    id: 'long-form',
    icon: Video,
    label: 'LONG-FORM GENERATION',
    title: 'Generate Videos Far Beyond Typical Limits',
    desc: "While other AI video tools limit you to 2-minute shorts, Gen by Ghost's rendering pipeline compiles seamless documentary-style videos ranging from 10 minutes up to 10 hours in length.",
    mockupType: 'render'
  },
  {
    id: 'scripting',
    icon: FileText,
    label: 'AI SCRIPTING',
    title: 'Turn Any Topic Into a Structured Script',
    desc: 'Our semantic outliner drafts a highly researched, chapter-by-chapter narration script designed to maximize viewer retention and engagement.',
    mockupType: 'script'
  },
  {
    id: 'narration',
    icon: Mic,
    label: 'AI NARRATION',
    title: 'Natural voice narrations without drift',
    desc: 'Generate voice narration in your own cloned voice or select from premium voice profiles, maintaining absolute tonal stability over multi-hour runs.',
    mockupType: 'voice'
  },
  {
    id: 'visuals',
    icon: ImageIcon,
    label: 'SCENE-MATCHED VISUALS',
    title: 'Automatic illustration mapping per scene',
    desc: 'Gen by Ghost generates high-resolution widescreen illustrations corresponding scene-by-scene to the narration script. Every paragraph is visualised.',
    mockupType: 'visuals'
  },
  {
    id: 'editing',
    icon: Film,
    label: 'AUTOMATIC EDITING',
    title: 'Synchronize narration, visuals and chapters',
    desc: 'Audio tracks, visual frames, dynamic subtitles, and background soundtracks are merged and encoded on cloud GPUs, verifying every frame for errors.',
    mockupType: 'timeline'
  },
  {
    id: 'publishing',
    icon: Upload,
    label: 'YOUTUBE PUBLISHING',
    title: 'Prepare and publish the finished video',
    desc: 'Get your completed video packed with auto-generated chapters, SEO tags, descriptions, titles, and print-ready e-book outputs ready for direct upload.',
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
            What Gen by Ghost Handles
          </h2>
          <p className="text-sm sm:text-base text-[#8FAAA6] leading-relaxed">
            From research to export, Gen by Ghost replaces the entire production crew. Here is a look at what the engine manages under the hood.
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

        {/* Print-ready book capability (preserved) */}
        <div className="bg-[#0A1412] border border-[#122823] rounded-3xl p-8 sm:p-12 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C5B49F]/3 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5B49F]/15 border border-[#C5B49F]/35 text-[#C5B49F] text-xs font-mono-label font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                PRINT-READY E-BOOK & NOVEL PUBLISHING
              </div>

              <h3 className="text-xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5] leading-tight">
                Publish Illustrated E-books & PDFs Alongside Your Videos
              </h3>

              <p className="text-[#8FAAA6] leading-relaxed text-sm sm:text-base">
                Monetize your YouTube channel further by turning every long-form video script into an e-book for Amazon KDP or Gumroad. Gen by Ghost automatically typesets chapter headers, inserts scene art, and exports a print-ready PDF in one click.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Automated chapter outlines matched to video narrative',
                  'High-resolution illustration placement per chapter',
                  'Print-ready PDF & EPUB export format',
                  'Dual revenue stream: YouTube ad revenue + E-book sales',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#ECFDF5]">
                    <CheckCircle2 className="w-4 h-4 text-[#C5B49F] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/dashboard/create" className="btn-indigo-pill text-sm inline-flex items-center gap-2">
                  Explore Book Generator
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Book Preview Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#122823]/40 border border-[#122823] rounded-2xl p-6 shadow-inner relative">
                
                {/* Book Mockup Cover */}
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#122823] aspect-[3/4] group">
                  <img
                    src="/fall_of_rome_cover.jpg"
                    alt="The Fall of Rome Illustrated Book Cover"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B0A]/95 via-[#050B0A]/30 to-[#050B0A]/10 z-10" />
                  
                  <div className="relative h-full flex flex-col justify-between p-6 z-20">
                    <div>
                      <div className="text-[9px] font-mono-label text-[#C5B49F] mb-1.5 uppercase tracking-widest font-bold bg-[#C5B49F]/15 px-2 py-0.5 rounded-full inline-block border border-[#C5B49F]/30">
                        HISTORICAL DOCUMENTARY SERIES
                      </div>
                      <h4 className="text-lg font-bold font-serif-heading text-white leading-tight uppercase">
                        The Fall of Rome
                      </h4>
                      <p className="text-[11px] text-zinc-300 mt-1 italic leading-snug">
                        A Complete 10-Hour Written & Visual Chronicle
                      </p>
                    </div>

                    <div className="border-t border-white/20 pt-3 flex items-center justify-between">
                      <span className="text-[9px] font-mono-label text-zinc-400">GENBYGHOST PUBLISHING</span>
                      <span className="text-[9px] font-mono-label text-[#030706] bg-[#C5B49F] px-2 py-0.5 rounded font-bold border border-white/10 shadow-xs">
                        PDF READY
                      </span>
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
