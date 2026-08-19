'use client';

import { useState, useEffect } from 'react';
import { FileText, Mic, Image as ImageIcon, Film, Upload, Sparkles, Play, CheckCircle2 } from 'lucide-react';

const stages = [
  {
    num: '01',
    title: 'Script Generation',
    desc: 'Input your topic and target duration. Our semantic outliner drafts a highly researched, chapter-by-chapter narration script designed to keep viewers engaged.',
    shell: 'script_compiler.sh',
  },
  {
    num: '02',
    title: 'Voice Narration',
    desc: 'The script compiles into natural narrations using stable voice models or your own cloned voice. Tonal consistency is maintained perfectly across the entire runtime.',
    shell: 'voice_synthesizer.sh',
  },
  {
    num: '03',
    title: 'Visual Mapping',
    desc: 'TuberAI generates high-resolution widescreen illustrations corresponding scene-by-scene to the narration script. Every paragraph is visualised.',
    shell: 'visual_generator.sh',
  },
  {
    num: '04',
    title: 'Cloud Compiling',
    desc: 'Audio tracks, visual frames, dynamic subtitles, and background soundtracks are merged and encoded on cloud GPUs, verifying every frame for errors.',
    shell: 'render_encoder.sh',
  },
  {
    num: '05',
    title: 'Metadata Packaging',
    desc: 'Get your completed video packed with auto-generated chapters, SEO tags, descriptions, titles, and print-ready e-book outputs ready for direct upload.',
    shell: 'publisher_metadata.sh',
  },
];

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle through steps
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="how-it-works" className="py-24 bg-transparent border-t border-[#122823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="badge-indigo mb-4">
            <span>THE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
            How it works
          </h2>
          <p className="text-lg font-semibold text-[#C5B49F] mb-2">
            One topic in. A finished video out.
          </p>
          <p className="text-sm sm:text-base text-[#8FAAA6] leading-relaxed">
            Five stages run as a single automated job. You bring the idea — TuberAI handles the script, the voice, the visuals, and the render.
          </p>
        </div>

        {/* Dynamic Timeline Split Layout (No Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Timeline List (No Card Frames) */}
          <div className="lg:col-span-6 space-y-8 relative">
            {/* The vertical connection line */}
            <div className="absolute left-6 top-3 bottom-3 w-px bg-[#122823]" />
            
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.num}
                  onClick={() => {
                    setActiveStage(idx);
                    setIsAutoPlaying(false);
                  }}
                  className="w-full text-left flex items-start gap-6 relative group cursor-pointer focus:outline-none"
                >
                  {/* Step Indicator Node */}
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono-label font-bold text-xs transition-all duration-300 z-10 ${
                    isActive
                      ? 'border-[#C5B49F] bg-[#050B0A] text-[#C5B49F] shadow-[0_0_15px_rgba(197,180,159,0.3)] scale-110'
                      : 'border-[#122823] bg-[#050B0A] text-[#527E72] group-hover:border-[#225146] group-hover:text-[#8FAAA6]'
                  }`}>
                    {stage.num}
                  </div>
                  
                  {/* Step Text Info */}
                  <div className="flex-1 pt-1">
                    <h3 className={`font-serif-heading text-xl transition-colors duration-300 ${
                      isActive ? 'text-[#C5B49F]' : 'text-[#8FAAA6] group-hover:text-[#ECFDF5]'
                    }`}>
                      {stage.title}
                    </h3>
                    <p className={`text-xs sm:text-sm mt-1 transition-colors duration-300 leading-relaxed ${
                      isActive ? 'text-[#ECFDF5]' : 'text-[#527E72] group-hover:text-[#8FAAA6]'
                    }`}>
                      {stage.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Console & High-Fidelity Visual Simulator (No Card Frame) */}
          <div className="lg:col-span-6">
            <div className="bg-[#050B0A]/95 border border-[#122823] rounded-2xl p-6 shadow-2xl relative min-h-[460px] flex flex-col justify-between font-mono text-xs overflow-hidden">
              
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-[#122823] pb-3 text-[#527E72] text-[10px] tracking-wider mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500/40" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/40" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/40" />
                  <span className="ml-1 font-mono-label font-bold text-[#8FAAA6]">{stages[activeStage].shell}</span>
                </span>
                <span className="font-mono-label font-bold text-[#C5B49F] animate-pulse">● COMPILING</span>
              </div>

              {/* Dynamic Screen Panel (Displays custom visual simulations based on activeStage) */}
              <div className="flex-1 flex flex-col justify-center">

                {/* Stage 1 Visuals: Document Outline Builder */}
                {activeStage === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      {/* Left: Outliner */}
                      <div className="sm:col-span-5 space-y-2 border-r border-[#122823] pr-4">
                        <div className="text-[10px] text-[#527E72] font-mono-label">CHAPTER INDEX</div>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`flex items-center gap-2 p-1.5 rounded text-[10px] ${i === 3 ? 'bg-[#C5B49F]/10 border border-[#C5B49F]/30 text-[#C5B49F]' : 'text-stone-500'}`}>
                            <span className="font-mono-label">CH {i}</span>
                            <span className="truncate">{i === 1 ? 'Rise' : i === 2 ? 'Empire' : i === 3 ? 'Crisis' : 'Fall'}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right: Active Document Writing */}
                      <div className="sm:col-span-7 bg-[#0A1412] border border-[#122823] rounded-xl p-4 min-h-[160px] flex flex-col justify-between relative">
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C5B49F] animate-ping" />
                        <div>
                          <div className="text-[9px] text-[#527E72] mb-1 font-mono-label">CHAPTER 3: THE SEVERAN CRISIS</div>
                          <p className="text-[11px] text-[#8FAAA6] leading-relaxed font-sans italic">
                            "By the late second century, the cracks in the Roman imperial facade began to widen. Inflation ravaged the currency, while military commanders contested the throne, initiating a dark age..."
                          </p>
                        </div>
                        <div className="text-[9px] text-[#C5B49F] font-mono-label mt-2">Writing token: 1,845 / 45,000 words</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 2 Visuals: Audio Waveform Equalizer */}
                {activeStage === 1 && (
                  <div className="space-y-6">
                    {/* Live Waveform Visualizer */}
                    <div className="h-28 bg-[#0A1412] border border-[#122823] rounded-xl flex items-end gap-1.5 p-4 justify-between relative overflow-hidden">
                      {/* Grid background lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,40,35,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,40,35,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
                      
                      {[25, 45, 60, 30, 85, 95, 75, 40, 60, 85, 95, 50, 65, 80, 45, 30, 50, 75, 90, 60, 30, 45, 20].map((h, i) => (
                        <div 
                          key={i} 
                          className="w-full bg-[#C5B49F] rounded-full animate-equalizer-bar relative z-10" 
                          style={{ 
                            height: `${h}%`,
                            animationDelay: `${i * 0.07}s` 
                          }} 
                        />
                      ))}
                    </div>
                    {/* Voice Model Info */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#8FAAA6] font-mono-label">
                      <div className="p-2 bg-[#0A1412] border border-[#122823] rounded-lg">
                        <span className="text-[#527E72] block mb-0.5">VOICE PROFILE</span>
                        <span className="font-bold text-[#C5B49F]">Cloned Marcus</span>
                      </div>
                      <div className="p-2 bg-[#0A1412] border border-[#122823] rounded-lg">
                        <span className="text-[#527E72] block mb-0.5">STABILITY</span>
                        <span className="font-bold text-emerald-400">99.4% LOCKED</span>
                      </div>
                      <div className="p-2 bg-[#0A1412] border border-[#122823] rounded-lg">
                        <span className="text-[#527E72] block mb-0.5">SAMPLE RATE</span>
                        <span className="font-bold text-[#C5B49F]">48.0 kHz</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 3 Visuals: Image Generation Viewport */}
                {activeStage === 2 && (
                  <div className="space-y-4">
                    {/* Aspect Ratio Viewport Simulation */}
                    <div className="relative aspect-video rounded-xl bg-[#0A1412] border border-[#122823] overflow-hidden flex flex-col justify-between p-4 group">
                      
                      {/* Grid background scanning lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,180,159,0.03)_1px,transparent_1px)] bg-[size:100%_8px] animate-pulse" />
                      
                      {/* Scanning vertical line animation */}
                      <div className="absolute inset-x-0 h-0.5 bg-[#C5B49F]/30 top-0 animate-[bounce_4s_infinite] shadow-[0_0_8px_#C5B49F]" />

                      {/* Mock Roman Dome Graphic using Vector SVGs */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-40 z-0 p-6">
                        <svg className="w-full h-full text-[#C5B49F]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.5">
                          {/* Dome */}
                          <path d="M20 40 C 20 15, 80 15, 80 40 Z" />
                          <line x1="50" y1="5" x2="50" y2="40" />
                          <line x1="35" y1="13" x2="35" y2="40" />
                          <line x1="65" y1="13" x2="65" y2="40" />
                          {/* Pillars */}
                          <rect x="15" y="40" width="6" height="10" />
                          <rect x="79" y="40" width="6" height="10" />
                          <rect x="47" y="40" width="6" height="10" />
                          {/* Ground */}
                          <line x1="5" y1="50" x2="95" y2="50" strokeWidth="1" />
                        </svg>
                      </div>

                      {/* Overlay labels */}
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="text-[9px] font-mono-label bg-black/60 px-2 py-0.5 rounded border border-[#122823] text-[#8FAAA6]">
                          PROMPT MATCH: SCENE 104
                        </span>
                        <span className="text-[9px] font-mono-label bg-[#C5B49F] text-[#030706] px-2 py-0.5 rounded font-bold">
                          RENDERING 85%
                        </span>
                      </div>

                      <div className="relative z-10 text-[9px] font-mono-label text-[#527E72] bg-black/60 p-2 rounded border border-[#122823]">
                        Prompt: "Historical Roman temple forum, columns, sunset golden hour ambient light, oil canvas style, 4k"
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 4 Visuals: Multi-Track Timeline Editor */}
                {activeStage === 3 && (
                  <div className="space-y-4">
                    {/* Premiere-style Timeline Simulation */}
                    <div className="bg-[#0A1412] border border-[#122823] rounded-xl p-4 space-y-3 relative overflow-hidden">
                      
                      {/* Time indicators */}
                      <div className="flex justify-between text-[8px] text-[#527E72] font-mono-label border-b border-[#122823] pb-1">
                        <span>00:00:00</span>
                        <span>02:30:00</span>
                        <span>05:00:00</span>
                        <span>07:30:00</span>
                        <span>10:00:00</span>
                      </div>

                      {/* Video Track */}
                      <div className="space-y-1">
                        <span className="text-[8px] text-[#527E72] font-mono-label">VIDEO TRACK (16:9)</span>
                        <div className="grid grid-cols-12 gap-1 h-6">
                          <div className="col-span-3 bg-[#C5B49F]/20 border border-[#C5B49F]/45 rounded flex items-center justify-center text-[8px] text-[#C5B49F] font-bold">Scene 01</div>
                          <div className="col-span-4 bg-[#C5B49F]/40 border border-[#C5B49F] rounded flex items-center justify-center text-[8px] text-[#030706] font-bold relative">
                            Scene 02
                            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#C5B49F] animate-pulse" />
                          </div>
                          <div className="col-span-5 bg-[#122823]/50 border border-[#122823] rounded flex items-center justify-center text-[8px] text-stone-600">Scene 03 [Pending]</div>
                        </div>
                      </div>

                      {/* Captions Track */}
                      <div className="space-y-1">
                        <span className="text-[8px] text-[#527E72] font-mono-label">CAPTIONS (DYNAMIC)</span>
                        <div className="grid grid-cols-12 gap-1 h-4">
                          <div className="col-span-2 bg-[#8FAAA6]/10 border border-[#122823] rounded" />
                          <div className="col-span-1 bg-[#8FAAA6]/10 border border-[#122823] rounded" />
                          <div className="col-span-5 bg-[#C5B49F]/25 border border-[#C5B49F]/40 rounded flex items-center justify-center text-[8px] text-[#ECFDF5] truncate px-1">"...cracks in the Roman facade..."</div>
                          <div className="col-span-4 bg-transparent" />
                        </div>
                      </div>

                      {/* Audio Narration Track */}
                      <div className="space-y-1">
                        <span className="text-[8px] text-[#527E72] font-mono-label">AUDIO NARRATION</span>
                        <div className="bg-[#122823]/30 border border-[#122823] rounded h-5 flex items-center px-2">
                          <div className="w-full h-2 flex items-center gap-0.5">
                            {[1,4,2,6,3,7,2,5,3,6,2,4,1,5,3,7,2,6,3,8,2,5,3,6,1,4,2,5].map((h, i) => (
                              <div key={i} className="w-1 bg-[#C5B49F]/60 rounded-full" style={{ height: `${h * 10}%` }} />
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* Stage 5 Visuals: YouTube Mock Publisher */}
                {activeStage === 4 && (
                  <div className="space-y-4">
                    {/* YouTube Video Details Layout */}
                    <div className="bg-[#0A1412] border border-[#122823] rounded-xl p-4 space-y-4">
                      
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        {/* Video Thumbnail Preview */}
                        <div className="relative w-32 aspect-video bg-black rounded-lg border border-[#122823] overflow-hidden flex items-center justify-center flex-shrink-0">
                          {/* Mini Roman temple dome outline vector */}
                          <svg className="w-12 h-12 text-[#C5B49F]/40" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M20 40 C 20 15, 80 15, 80 40 Z" />
                            <line x1="50" y1="5" x2="50" y2="40" />
                          </svg>
                          <Play className="w-6 h-6 text-[#C5B49F] absolute fill-current" />
                        </div>

                        {/* Title & Metadata fields */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="text-[10px] text-[#527E72] font-mono-label">EXPORTED METADATA</div>
                          <div className="text-xs font-bold text-[#ECFDF5] truncate">The Fall of Rome (10-Hour Special)</div>
                          <div className="flex items-center gap-2 text-[10px] text-[#8FAAA6]">
                            <span className="bg-[#C5B49F]/15 text-[#C5B49F] border border-[#C5B49F]/25 px-1.5 py-0.5 rounded font-mono-label">10:00:00</span>
                            <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.5 rounded font-mono-label">UPLOADER READY</span>
                          </div>
                        </div>
                      </div>

                      {/* Checklist */}
                      <div className="grid grid-cols-2 gap-2 border-t border-[#122823] pt-3 text-[10px] text-[#8FAAA6]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5B49F]" />
                          <span>Dynamic Subtitles Synthesized</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5B49F]" />
                          <span>SEO Description & Tags Drafted</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5B49F]" />
                          <span>Amazon E-Book Outline Ready</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5B49F]" />
                          <span>4K Render Complete</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Shell Footer */}
              <div className="border-t border-[#122823] pt-4 mt-6 text-[9px] text-[#527E72] flex items-center justify-between font-mono-label">
                <span>STAGE {stages[activeStage].num} / 05</span>
                <span>JOB ID: {3189 + activeStage}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
