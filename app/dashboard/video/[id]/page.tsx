'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, Mic, Image, Film, Upload, Check, 
  Download, Share2, ArrowLeft, Clock, Zap, Play,
  Copy, ExternalLink, RefreshCw
} from 'lucide-react';

const stages = [
  { id: 'script', icon: FileText, label: 'Script', desc: 'Generating chapter structure and narration script...', duration: 45 },
  { id: 'voice', icon: Mic, label: 'Voice', desc: 'Synthesizing narration with selected voice...', duration: 120 },
  { id: 'visuals', icon: Image, label: 'Visuals', desc: 'Generating scene-matched visuals...', duration: 180 },
  { id: 'render', icon: Film, label: 'Render', desc: 'Encoding audio and visuals into final video...', duration: 90 },
  { id: 'publish', icon: Upload, label: 'Publish', desc: 'Generating YouTube metadata and thumbnail...', duration: 30 },
];

// Mock project data
const project = {
  id: '1',
  title: 'The Complete History of Ancient Rome',
  format: 'Documentary',
  duration: '2h 15m',
  voice: 'Marcus',
  aspect: '16:9',
  credits: 405,
  currentStage: 2, // 0-indexed, 2 = visuals
  stageProgress: 67,
};

export default function VideoDetailPage() {
  const [progress, setProgress] = useState(67);
  const currentStage = project.currentStage;
  const isCompleted = currentStage >= stages.length;
  const isMock = false; // set true to show completed state

  // Simulate progress animation for demo
  useEffect(() => {
    if (currentStage < stages.length) {
      const interval = setInterval(() => {
        setProgress(p => Math.min(p + 1, 99));
      }, 800);
      return () => clearInterval(interval);
    }
  }, []);

  const getStageStatus = (index: number) => {
    if (index < currentStage) return 'completed';
    if (index === currentStage) return 'active';
    return 'pending';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-[#6C3DFF]/30 to-[#A855F7]/20 flex items-center justify-center flex-shrink-0">
            <Play className="w-5 h-5 text-[#A855F7]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-white mb-1">{project.title}</h1>
            <div className="flex items-center gap-3 text-xs text-[#64748B] flex-wrap">
              <span>{project.format}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {project.duration}</span>
              <span>·</span>
              <span>Voice: {project.voice}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {project.credits} credits</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-[#A855F7]/10 border-[#A855F7]/20 text-[#A855F7]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Generating
          </div>
        </div>
      </div>

      {/* Stage pipeline */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-5">Generation Pipeline</h2>
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const status = getStageStatus(index);
            const colors = {
              completed: { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500/30' },
              active: { bg: 'bg-gradient-to-br from-[#6C3DFF] to-[#A855F7]', text: 'text-[#A855F7]', border: 'border-[#6C3DFF]/50' },
              pending: { bg: 'bg-[#111827]', text: 'text-[#64748B]', border: 'border-[rgba(255,255,255,0.06)]' },
            }[status];

            return (
              <div key={stage.id} className="flex items-start gap-4">
                {/* Stage number/icon */}
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.border} border`}>
                    {status === 'completed' 
                      ? <Check className="w-4 h-4 text-white" />
                      : <Icon className={`w-4 h-4 ${status === 'active' ? 'text-white' : colors.text}`} />
                    }
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`w-px flex-1 mt-1 h-6 ${status === 'completed' ? 'bg-green-500/30' : 'bg-[rgba(255,255,255,0.06)]'}`} />
                  )}
                </div>

                {/* Stage info */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${status === 'pending' ? 'text-[#64748B]' : 'text-white'}`}>
                      {stage.label}
                    </span>
                    {status === 'completed' && <span className="text-xs text-green-400">✓ Done</span>}
                    {status === 'active' && <span className="text-xs text-[#A855F7]">{progress}%</span>}
                  </div>
                  
                  <p className={`text-xs mb-2 ${status === 'pending' ? 'text-[#64748B]/60' : 'text-[#64748B]'}`}>
                    {status === 'completed' ? `Completed in ~${stage.duration}s` : 
                     status === 'active' ? stage.desc :
                     'Waiting...'}
                  </p>

                  {status === 'active' && (
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall progress */}
        <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex justify-between text-xs text-[#64748B] mb-2">
            <span>Overall progress</span>
            <span>Stage {currentStage + 1} of {stages.length}</span>
          </div>
          <div className="progress-bar h-2">
            <div className="progress-fill" style={{ width: `${((currentStage / stages.length) * 100) + (progress / stages.length)}%` }} />
          </div>
        </div>
      </div>

      {/* Estimated completion */}
      <div className="glass-card p-4 flex items-center gap-4">
        <RefreshCw className="w-5 h-5 text-[#A855F7] animate-spin" style={{ animationDuration: '3s' }} />
        <div>
          <div className="text-sm font-medium text-white">Estimated completion: ~23 minutes</div>
          <div className="text-xs text-[#64748B]">You'll receive an email notification when your video is ready</div>
        </div>
      </div>

      {/* Completed state preview - shown when done */}
      <div className="glass-card p-6 opacity-40">
        <h2 className="text-base font-bold text-white mb-4">📦 Your Video Package (available when complete)</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Download Video', icon: Download, primary: true },
            { label: 'Copy YouTube Title', icon: Copy, primary: false },
            { label: 'View Thumbnail', icon: Image, primary: false },
            { label: 'Open on YouTube', icon: ExternalLink, primary: false },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button 
                key={action.label}
                disabled
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium ${
                  action.primary ? 'btn-primary' : 'btn-secondary'
                } opacity-50 cursor-not-allowed`}
              >
                <Icon className="w-4 h-4" />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
