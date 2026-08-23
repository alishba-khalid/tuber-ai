import { Cpu, Film, Target, Sparkles } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Film,
      title: "Built for True Long-Form Content",
      desc: "While other AI video tools limit you to 2-minute shorts, Gen by Ghost's rendering pipeline compiles seamless documentary-style videos ranging from 10 minutes up to 10 hours in length.",
    },
    {
      icon: Cpu,
      title: "Autonomous Multi-Stage Pipeline",
      desc: "Our engine executes research, scriptwriting, voice narration, scene visual generation, subtitle rendering, and thumbnail packaging as a single unified automation job.",
    },
    {
      icon: Target,
      title: "Niche-Specific Automation",
      desc: "Tailored algorithms optimize flow, voice tones, and visual composition for highly popular niches like historical documentaries, horror anthologies, sleep stories, and deep-dive essays.",
    },
  ];

  return (
    <section className="py-24 bg-transparent border-t border-[#122823] relative">
      {/* Background accent glow */}
      <div className="absolute top-1/2 left-10 w-[280px] h-[280px] bg-[#C5B49F]/3 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description & pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex">
                <span className="badge-indigo">
                  <Sparkles className="w-3.5 h-3.5" />
                  WHAT IS GENBYGHOST?
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display-title text-[#ECFDF5] leading-tight">
                Automating the next generation of deep-dive YouTube content.
              </h2>
              
              <p className="text-[#8FAAA6] leading-relaxed text-sm sm:text-base">
                Gen by Ghost is the world's first autonomous long-form video engine. We don't just crop clips or generate generic loops. Gen by Ghost researches, outlines, scripts, narrates, edits, and compiles complex multi-hour documentaries and series from a single topic prompt, publishing them straight to your channel while you sleep.
              </p>
            </div>

            {/* Pillars */}
            <div className="space-y-6 pt-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl border border-[#C5B49F]/20 bg-[#C5B49F]/10 flex items-center justify-center text-[#C5B49F] group-hover:bg-[#C5B49F] group-hover:text-[#030706] transition-colors flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif-heading text-lg text-[#ECFDF5] group-hover:text-[#C5B49F] transition-colors mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8FAAA6] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Engine spec dashboard widget */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A1412] border border-[#122823] rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#C5B49F]/3 rounded-full blur-[50px] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-[#122823] pb-4 mb-6">
                <div>
                  <h4 className="text-xs font-mono-label font-bold text-[#ECFDF5]">SYSTEM ARCHITECTURE</h4>
                  <p className="text-[10px] text-[#527E72] mt-0.5 font-mono-label">VERSION 2.4.0-GOLD</p>
                </div>
                <span className="text-[9px] font-mono-label text-[#030706] bg-[#C5B49F] px-2 py-0.5 rounded font-bold border border-white/10 shadow-xs">
                  ACTIVE ENGINE
                </span>
              </div>

              {/* Specs items */}
              <div className="space-y-4">
                {[
                  { name: "Topic Analyzer & Outliner", speed: "1.2s", status: "Optimal", color: "text-emerald-400" },
                  { name: "Semantic Scriptwriter Engine", speed: "4.8s", status: "Compiling", color: "text-[#C5B49F]" },
                  { name: "Continuous Voice Narrator TTS", speed: "3.1s", status: "Active", color: "text-emerald-400" },
                  { name: "HD Visual Sourcing & Generation", speed: "8.5s", status: "Processing", color: "text-[#C5B49F]" },
                  { name: "Automated Rendering Compiler", speed: "12.0s", status: "Idle", color: "text-[#527E72]" },
                ].map((spec) => (
                  <div key={spec.name} className="p-3.5 bg-[#050B0A] border border-[#122823] rounded-xl flex items-center justify-between text-xs">
                    <div className="min-w-0 flex-1 pr-3">
                      <span className="font-semibold text-[#ECFDF5] block truncate">{spec.name}</span>
                      <span className="text-[10px] text-[#527E72] font-mono-label">Latency: {spec.speed}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`font-mono-label font-bold uppercase text-[9px] ${spec.color}`}>
                        {spec.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footnote */}
              <div className="mt-6 border-t border-[#122823] pt-4 text-center">
                <span className="text-[10px] text-[#527E72] font-mono-label leading-relaxed block">
                  CLOUD GPU COMPILING · DUAL CAPTION RENDER
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
