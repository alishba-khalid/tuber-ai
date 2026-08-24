'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { Play, Sparkles, Clock, Volume2, FileText, Mic, Image as ImageIcon, Film, Upload, Video, Loader2 } from 'lucide-react';

const chapterTabs = [
  { 
    id: 'cold-open', 
    label: 'COLD OPEN', 
    time: '00:00', 
    title: 'The Founding of Rome & First Kings',
    script: 'Rome was not built in a day. Its story begins in the 8th century BCE, amidst the muddy banks of the Tiber River, where local tribes coalesced into a unified settlement destined for greatness...',
    scene: 'SCENE 01: The Tiber Valley',
    state: 'Analyzing Topic & Structuring Chapters...',
    progress: 15,
    storyboard: [
      { id: 's1', num: 'SCENE 01', title: 'Tiber Valley', status: 'WIP', progress: 15, img: '/roman_forum_doc.jpg' },
      { id: 's2', num: 'SCENE 02', title: 'First King', status: 'QUEUED', progress: 0, img: '/fall_of_rome_cover.jpg' },
      { id: 's3', num: 'SCENE 03', title: 'Legionnaires', status: 'QUEUED', progress: 0, img: '/roman_forum_doc.jpg' },
      { id: 's4', num: 'SCENE 04', title: 'Colosseum Out', status: 'QUEUED', progress: 0, img: '/fall_of_rome_cover.jpg' }
    ]
  },
  { 
    id: 'chapter-1', 
    label: 'CHAPTER I', 
    time: '14:20', 
    title: 'Rise of the Republic & Punic Wars',
    script: 'By the 1st century BCE, Rome had grown beyond a city-state into a Mediterranean empire. But with vast conquest came internal strife, civil wars, and the rise of ambitious generals...',
    scene: 'SCENE 14: Roman Senate Chamber',
    state: 'Rendering High-Resolution Visuals...',
    progress: 48,
    storyboard: [
      { id: 's1', num: 'SCENE 12', title: 'Punic Wars', status: 'COMPLETE', progress: 100, img: '/fall_of_rome_cover.jpg' },
      { id: 's2', num: 'SCENE 13', title: 'Roman Senate', status: 'COMPLETE', progress: 100, img: '/roman_forum_doc.jpg' },
      { id: 's3', num: 'SCENE 14', title: 'Roman Fleet', status: 'WIP', progress: 48, img: '/roman_forum_doc.jpg' },
      { id: 's4', num: 'SCENE 15', title: 'Carthage Fall', status: 'QUEUED', progress: 0, img: '/fall_of_rome_cover.jpg' }
    ]
  },
  { 
    id: 'chapter-2', 
    label: 'CHAPTER II', 
    time: '48:10', 
    title: 'Julius Caesar & Pax Romana',
    script: 'Julius Caesars crossing of the Rubicon marked the end of the Republic. Under Augustus, a new era of Roman peace was established, cementing the golden era of the Empire...',
    scene: 'SCENE 28: Crossing the Rubicon',
    state: 'Generating Narration Voiceover...',
    progress: 72,
    storyboard: [
      { id: 's1', num: 'SCENE 26', title: 'Senate Conflict', status: 'COMPLETE', progress: 100, img: '/roman_forum_doc.jpg' },
      { id: 's2', num: 'SCENE 27', title: 'Caesar Return', status: 'COMPLETE', progress: 100, img: '/fall_of_rome_cover.jpg' },
      { id: 's3', num: 'SCENE 28', title: 'Crossing Rubicon', status: 'WIP', progress: 72, img: '/roman_forum_doc.jpg' },
      { id: 's4', num: 'SCENE 29', title: 'Pax Romana', status: 'QUEUED', progress: 0, img: '/fall_of_rome_cover.jpg' }
    ]
  },
  { 
    id: 'chapter-3', 
    label: 'CHAPTER III', 
    time: '01:32:00', 
    title: 'Crisis of the Third Century & Decline',
    script: 'No empire lasts forever. Barbarian incursions, economic collapse, and internal corruption eventually shattered the Pax Romana, leading to the split of the empire...',
    scene: 'SCENE 45: Sack of the Imperial Capital',
    state: 'Compiling Timeline & Adding Captions...',
    progress: 92,
    storyboard: [
      { id: 's1', num: 'SCENE 43', title: 'Barbarian Rise', status: 'COMPLETE', progress: 100, img: '/fall_of_rome_cover.jpg' },
      { id: 's2', num: 'SCENE 44', title: 'Split Empire', status: 'COMPLETE', progress: 100, img: '/roman_forum_doc.jpg' },
      { id: 's3', num: 'SCENE 45', title: 'Sack of Rome', status: 'WIP', progress: 92, img: '/fall_of_rome_cover.jpg' },
      { id: 's4', num: 'SCENE 46', title: 'Decline Final', status: 'QUEUED', progress: 0, img: '/roman_forum_doc.jpg' }
    ]
  },
];

const subHeroChips = [
  'Sleep stories',
  'Documentaries',
  'Deep-dives & lore',
  'Faceless YouTube automation',
];

const pipelineSteps = [
  {
    num: '01',
    label: 'IDEA',
    subtitle: 'User enters:',
    desc: '"The Complete History of Ancient Rome"',
    color: 'border-[#C5B49F] text-[#C5B49F]'
  },
  {
    num: '02',
    label: 'SCRIPT',
    subtitle: 'GenByGhost creates:',
    desc: 'The long-form chaptered narration script.',
    color: 'border-[#122823] text-[#8FAAA6]'
  },
  {
    num: '03',
    label: 'VOICE',
    subtitle: 'AI generates:',
    desc: 'High-fidelity natural narration tracks.',
    color: 'border-[#122823] text-[#8FAAA6]'
  },
  {
    num: '04',
    label: 'SCENES',
    subtitle: 'GenByGhost creates:',
    desc: 'Scene-matched widescreen visuals.',
    color: 'border-[#122823] text-[#8FAAA6]'
  },
  {
    num: '05',
    label: 'VIDEO',
    subtitle: 'GenByGhost compiles:',
    desc: 'Everything is auto-edited and timed.',
    color: 'border-[#122823] text-[#8FAAA6]'
  },
  {
    num: '06',
    label: 'YOUTUBE',
    subtitle: 'Video is ready:',
    desc: 'Finished video is published to your channel.',
    color: 'border-[#122823] text-[#8FAAA6]'
  }
];

export default function Hero() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('cold-open');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressVal, setProgressVal] = useState(15);
  const [currentWIPProgress, setCurrentWIPProgress] = useState(15);
  const [simulationStep, setSimulationStep] = useState(0);

  const selectedChapter = chapterTabs.find(c => c.id === activeTab) || chapterTabs[0];

  // Auto-simulate GenByGhost engine activities in the right widget
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        const next = (prev + 1) % chapterTabs.length;
        const chapter = chapterTabs[next];
        setActiveTab(chapter.id);
        setProgressVal(chapter.progress);
        setCurrentWIPProgress(chapter.progress);
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Dynamic ticking of the active WIP scene render status
  useEffect(() => {
    if (!isPlaying) return;

    const subInterval = setInterval(() => {
      setCurrentWIPProgress((prev) => {
        if (prev >= 99) return selectedChapter.progress;
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(subInterval);
  }, [isPlaying, selectedChapter]);

  // Find active WIP scene from storyboard array
  const activeWIPScene = selectedChapter.storyboard.find(s => s.status === 'WIP') || selectedChapter.storyboard[0];

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
                AUTOMATED VIDEO PRODUCTION ENGINE
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display-title text-slate-100 leading-[1.15] tracking-tight">
                Create AI documentaries <br className="hidden sm:inline" />
                <span className="text-[#C5B49F] block mt-1.5 tracking-normal">for faceless YouTube channels.</span>
              </h1>
            </div>

            {/* Core Promise Banner (Human + AI replaced) */}
            <div className="border-t border-b border-[#122823] py-4 my-2">
              <span className="text-xs font-mono-label font-bold text-[#527E72] block tracking-widest uppercase mb-1">THE CORE CO-OPERATION</span>
              <div className="text-base sm:text-lg font-serif-heading text-[#ECFDF5] font-semibold">
                You bring the idea. <span className="text-[#C5B49F]">GenByGhost builds the video.</span>
              </div>
            </div>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-[#8FAAA6] max-w-2xl font-normal leading-relaxed">
              With GenByGhost, you can turn a simple idea into a complete YouTube video without doing all the work yourself. Just enter the topic you want to make a video about, and GenByGhost takes care of the rest — from developing the story and writing the script to generating the narration, creating visuals for each part, and putting everything together into a polished long-form video. Whether you want to create a 10-minute video, a full documentary, or hours of content, GenByGhost handles the entire production process for you. Once your video is ready, you can publish it directly to YouTube and keep creating more videos without having to manually edit every single one.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href={user ? "/dashboard" : "/auth/signup"}
                className="btn-indigo-pill text-sm px-6 py-4 flex items-center justify-center gap-2 group font-mono-label shadow-[0_0_15px_rgba(197, 180, 159,0.25)] hover:shadow-[0_0_25px_rgba(197, 180, 159,0.45)]"
              >
                {user ? "Go to Dashboard" : "Create your first video"}
              </Link>
              <Link
                href="/examples"
                className="btn-outline-pill text-sm px-6 py-4 text-center cursor-pointer"
              >
                See examples
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
                    PROJECT: ROME_HISTORY.MP4
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono-label text-[#8FAAA6]">
                  <Clock className="w-3.5 h-3.5 text-[#C5B49F]" />
                  <span>45:12 DURATION</span>
                </div>
              </div>

              {/* Rendering State Alert */}
              <div className="bg-[#122823]/40 border-b border-[#122823] px-4 py-2 flex items-center justify-between text-[10px] font-mono-label">
                <span className="text-[#8FAAA6]">State:</span>
                <span className="text-[#C5B49F] font-bold animate-pulse uppercase">{selectedChapter.state}</span>
              </div>

              {/* Chapter Tabs Row */}
              <div className="flex border-b border-[#122823] bg-[#0A1412] overflow-x-auto">
                {chapterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setProgressVal(tab.progress);
                      setCurrentWIPProgress(tab.progress);
                      setIsPlaying(false); // Stop simulation on user interaction
                    }}
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
                
                {/* Active Viewport Video Container */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#122823] border border-[#122823] group">
                  <img
                    src={activeWIPScene.img}
                    alt="Roman Forum Documentary Scene Preview"
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 opacity-80"
                  />
                  
                  {/* WIP Scanner Grid Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(197,180,159,0.08)_1px,transparent_1px)] bg-[size:100%_8px] animate-pulse" />
                  <div className="absolute top-2.5 left-2.5 z-20 bg-amber-500/15 border border-amber-500/40 text-amber-500 text-[8px] font-mono-label px-2 py-0.5 rounded-full flex items-center gap-1.5 font-bold animate-pulse">
                    <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    WIP: RENDERING CANVAS ({currentWIPProgress}%)
                  </div>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 z-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C5B49F] text-[#030706] flex items-center justify-center shadow-lg shadow-emerald-950/50 hover:bg-[#D5C4AF] transition-colors">
                      {isPlaying ? (
                        <div className="flex gap-1 items-center justify-center">
                          <span className="w-1.5 h-4 bg-[#030706] rounded-xs animate-pulse" />
                          <span className="w-1.5 h-4 bg-[#030706] rounded-xs animate-pulse" style={{ animationDelay: '0.2s' }} />
                        </div>
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </div>
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 z-20 text-[#ECFDF5] text-xs font-medium">
                    <span className="bg-[#C5B49F]/25 border border-[#C5B49F]/40 text-[#C5B49F] text-[9px] px-1.5 py-0.5 rounded-full mr-1.5 font-mono-label">
                      {selectedChapter.scene}
                    </span>
                  </div>
                </div>

                {/* Multiple Storyboard Visuals Strip */}
                <div className="space-y-1.5">
                  <div className="text-[9px] font-mono-label text-[#527E72] uppercase font-bold tracking-wider">
                    Storyboards in progress (Multiple Canvas Tracks)
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedChapter.storyboard.map((sc) => {
                      const isSceneWIP = sc.status === 'WIP';
                      const isComplete = sc.status === 'COMPLETE';
                      const isQueued = sc.status === 'QUEUED';

                      return (
                        <div
                          key={sc.id}
                          className={`relative aspect-video rounded-lg overflow-hidden border bg-stone-950/40 flex flex-col justify-between p-1.5 transition-all duration-300 ${
                            isSceneWIP 
                              ? 'border-amber-500/80 ring-1 ring-amber-500/35' 
                              : isComplete 
                              ? 'border-[#122823]/80' 
                              : 'border-[#122823]/30 opacity-40'
                          }`}
                        >
                          <img
                            src={sc.img}
                            alt={sc.title}
                            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity ${
                              isQueued ? 'opacity-0' : 'opacity-40'
                            }`}
                          />
                          
                          {/* Top labels */}
                          <div className="relative z-10 flex justify-between items-center text-[7px] font-mono-label font-bold text-[#ECFDF5] bg-black/60 px-1 py-0.2 rounded">
                            <span>{sc.num}</span>
                          </div>

                          {/* Bottom status */}
                          <div className="relative z-10 text-[6px] font-mono-label font-bold truncate">
                            {isComplete && <span className="text-emerald-400 font-extrabold">✓ READY</span>}
                            {isSceneWIP && (
                              <span className="text-amber-500 flex items-center gap-0.5 font-extrabold">
                                WIP ({currentWIPProgress}%)
                              </span>
                            )}
                            {isQueued && <span className="text-stone-500">⏳ QUEUED</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-[#527E72] font-mono-label">
                    <span>Rendering Timeline</span>
                    <span>{progressVal}% Complete</span>
                  </div>
                  <div className="w-full bg-[#122823] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#C5B49F] h-full rounded-full transition-all duration-500" style={{ width: `${progressVal}%` }} />
                  </div>
                </div>

                {/* Script & Narration Detail */}
                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] font-mono-label text-[#C5B49F] font-semibold mb-0.5">
                      ACTIVE NARRATION SCRIPT
                    </div>
                    <h3 className="text-sm font-bold text-[#ECFDF5] font-serif-heading">
                      {selectedChapter.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#8FAAA6] leading-relaxed italic border-l-2 border-[#C5B49F] pl-3 py-0.5 bg-[#122823]/20 font-sans min-h-[50px] transition-all duration-300">
                    "{selectedChapter.script}"
                  </p>

                  {/* Audio Waveform */}
                  <div className="bg-[#122823]/50 p-3 rounded-xl border border-[#122823] space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-[#527E72] font-mono-label">
                      <span>Voice: Marcus (Deep Voice)</span>
                      <span>{selectedChapter.time} / 45:12</span>
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
                              backgroundColor: i < (progressVal * 0.4) ? '#C5B49F' : '#122823',
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

        {/* 3. Connected Pipeline Steps Section (ONE IDEA -> COMPLETE VIDEO) */}
        <div className="border-t border-[#122823] mt-24 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-mono-label font-bold text-[#C5B49F] tracking-widest uppercase block mb-2">AUTOMATION PIPELINE</span>
            <h2 className="text-3xl font-bold font-serif-heading text-[#ECFDF5]">One Idea. Complete Video.</h2>
            <p className="text-sm text-[#8FAAA6] mt-2">See how GenByGhost takes your single text idea and builds a cinematic masterwork.</p>
          </div>
          
          <div className="relative">
            {/* Horizontal connected line (Hidden on smaller screens) */}
            <div className="absolute top-[28px] left-0 right-0 h-px bg-[#122823] hidden lg:block z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {pipelineSteps.map((step) => (
                <div 
                  key={step.num}
                  className="bg-[#0A1412] border border-[#122823] hover:border-[#C5B49F]/30 p-6 rounded-2xl transition-all duration-300 group hover:shadow-[0_0_15px_rgba(197,180,159,0.03)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full border border-[#C5B49F]/20 bg-[#C5B49F]/10 text-[#C5B49F] font-mono-label font-bold text-xs flex items-center justify-center group-hover:bg-[#C5B49F] group-hover:text-[#030706] transition-colors">
                      {step.num}
                    </div>
                    <span className="text-[9px] font-mono-label text-[#527E72] uppercase tracking-wider">{step.label}</span>
                  </div>
                  
                  <span className="text-[10px] font-mono-label text-[#527E72] block mb-1">{step.subtitle}</span>
                  <span className="text-sm font-serif-heading text-[#ECFDF5] font-bold block mb-2 group-hover:text-[#C5B49F] transition-colors">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
