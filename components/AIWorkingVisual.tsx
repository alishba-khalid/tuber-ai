'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Terminal, CheckCircle2, Loader2, Play } from 'lucide-react';

const steps = [
  { id: 'research', label: 'Researching & outlining topic structure...' },
  { id: 'script', label: 'Compiling 12,000-word narration script...' },
  { id: 'voice', label: 'Synthesizing voice narration (Marcus voice model)...' },
  { id: 'scenes', label: 'Generating scene-matched visual canvases...' },
  { id: 'editing', label: 'Synchronizing dynamic captions & chapters...' },
  { id: 'render', label: 'GPU-encoding timeline into final 4K package...' }
];

export default function AIWorkingVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDone) {
        // Reset simulation to loop continuously
        setIsDone(false);
        setActiveStep(0);
        setCompletedSteps([]);
        setProgress(0);
        return;
      }

      setCompletedSteps((prev) => {
        const step = steps[activeStep];
        if (!step) return prev;
        const currentStepId = step.id;
        if (!prev.includes(currentStepId)) {
          return [...prev, currentStepId];
        }
        return prev;
      });

      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
        setProgress((prev) => prev + 16);
      } else {
        setProgress(100);
        setIsDone(true);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [activeStep, isDone]);

  return (
    <section className="py-24 bg-transparent border-t border-[#122823] relative">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C5B49F]/3 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-TIME ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
            Watch the Production Engine Work
          </h2>
          <p className="text-sm sm:text-base text-[#8FAAA6] leading-relaxed">
            Gen by Ghost runs an autonomous multi-stage timeline render. See how a single topic is parsed into a fully compiled video.
          </p>
        </div>

        {/* Visual Terminal Layout */}
        <div className="bg-[#0A1412] border border-[#122823] rounded-3xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="bg-[#122823] border-b border-[#122823] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#C5B49F]" />
              <span className="text-xs font-mono-label font-bold text-[#ECFDF5] tracking-wider">
                GENBYGHOST // PRODUCTION_MONITOR.LOG
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono-label text-[#8FAAA6] uppercase">Active Job #8410</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6 font-mono text-xs">
            
            {/* Input Prompt Section */}
            <div className="p-4 bg-[#050B0A] border border-[#122823] rounded-xl space-y-1.5">
              <div className="text-[10px] text-[#527E72] font-mono-label uppercase">INPUT PROMPT</div>
              <div className="text-sm text-[#ECFDF5] font-semibold flex items-center gap-2">
                <span className="text-[#C5B49F]">&gt;</span> "The Complete History of Ancient Rome"
              </div>
            </div>

            {/* Simulated Timeline Steps */}
            <div className="space-y-3.5">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isActive = activeStep === index && !isDone;
                const isPending = !isCompleted && !isActive;

                return (
                  <div 
                    key={step.id} 
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#122823]/30 border-[#C5B49F]/30 text-[#C5B49F]' 
                        : isCompleted 
                        ? 'bg-[#050B0A]/40 border-[#122823]/60 text-emerald-400/80' 
                        : 'bg-[#050B0A]/10 border-transparent text-[#527E72]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : isActive ? (
                        <Loader2 className="w-4 h-4 text-[#C5B49F] animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#122823] flex-shrink-0" />
                      )}
                      <span className="font-sans text-xs">{step.label}</span>
                    </div>
                    <span className="text-[10px] font-mono-label">
                      {isCompleted ? '✓ DONE' : isActive ? 'RUNNING' : 'PENDING'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[10px] text-[#527E72] font-mono-label">
                <span>TOTAL COMPILATION PROGRESS</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-[#050B0A] border border-[#122823] h-2.5 rounded-full overflow-hidden p-0.5">
                <div 
                  className="bg-[#C5B49F] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>

            {/* Success State */}
            <div className={`transition-all duration-500 overflow-hidden ${
              isDone ? 'max-h-[160px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}>
              <div className="bg-[#122823]/30 border border-[#C5B49F]/40 p-5 rounded-2xl text-center space-y-3 relative">
                <div className="text-base sm:text-lg font-serif-heading font-bold text-[#ECFDF5] flex items-center justify-center gap-2">
                  <span>📦</span> VIDEO READY — <span className="text-[#C5B49F]">45:12 RUNTIME</span>
                </div>
                <p className="text-xs text-[#8FAAA6] font-sans">
                  The rendering job successfully compiled all scene visuals, subtitles, voice narration, and transition cuts.
                </p>
                <div className="flex justify-center gap-3">
                  <span className="text-[10px] font-mono-label bg-[#C5B49F] text-[#030706] px-2.5 py-1 rounded font-bold border border-white/10 shadow-xs flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" /> PREVIEW VIDEO
                  </span>
                  <span className="text-[10px] font-mono-label bg-[#0A1412] text-[#8FAAA6] border border-[#122823] px-2.5 py-1 rounded font-semibold">
                    DOWNLOAD PACKAGE
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
