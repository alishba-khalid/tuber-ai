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

import { useParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function VideoDetailPage() {
  const { id } = useParams() as { id: string };
  const { projects, updateProjectProgress } = useAuth();
  const [copied, setCopied] = useState(false);

  const currentProject = projects.find(p => p.id === id);

  // Determine stage and progress values
  const currentStage = currentProject ? (currentProject.status === 'completed' ? stages.length : (currentProject.status === 'queued' ? 0 : (currentProject.stageIndex ?? 0))) : 0;
  const progress = currentProject ? (currentProject.status === 'completed' ? 100 : (currentProject.status === 'queued' ? 0 : (currentProject.progress ?? 0))) : 0;
  const isCompleted = currentProject ? currentProject.status === 'completed' : false;

  // Real-time generator simulation
  useEffect(() => {
    if (!currentProject || currentProject.status === 'completed' || currentProject.status === 'failed') {
      return;
    }

    const interval = setInterval(() => {
      let nextStatus = currentProject.status;
      let nextStageIndex = currentProject.stageIndex ?? 0;
      let nextProgress = (currentProject.progress ?? 0) + Math.floor(Math.random() * 8) + 4;

      if (nextStatus === 'queued') {
        nextStatus = 'generating';
        nextStageIndex = 0;
        nextProgress = 0;
      } else if (nextProgress >= 100) {
        nextProgress = 0;
        if (nextStageIndex < stages.length - 1) {
          nextStageIndex += 1;
        } else {
          nextStatus = 'completed';
          nextProgress = 100;
        }
      }

      updateProjectProgress(currentProject.id, nextStatus, nextStageIndex, nextProgress);
    }, 1500);

    return () => clearInterval(interval);
  }, [currentProject?.id, currentProject?.status, currentProject?.stageIndex, currentProject?.progress]);

  const getStageStatus = (index: number) => {
    if (!currentProject) return 'pending';
    if (currentProject.status === 'completed') return 'completed';
    if (currentProject.status === 'queued') return index === 0 ? 'active' : 'pending';
    
    const stageIndex = currentProject.stageIndex ?? 0;
    if (index < stageIndex) return 'completed';
    if (index === stageIndex) return 'active';
    return 'pending';
  };

  const handleCopyTitle = () => {
    if (!currentProject) return;
    navigator.clipboard.writeText(currentProject.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Open image or mock download
    window.open('/roman_forum_doc.jpg', '_blank');
  };

  if (!currentProject) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-8 h-8 rounded-full border-4 border-[#C5B49F]/30 border-t-[#C5B49F] animate-spin mb-3" />
        <p className="text-sm text-[#8FAAA6] font-mono-label">LOADING PROJECT DETAILS...</p>
      </div>
    );
  }

  const overallPercent = isCompleted ? 100 : (
    ((currentStage / stages.length) * 100) + (progress / stages.length)
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-10 rounded-lg bg-[#C5B49F]/10 border border-[#C5B49F]/20 flex items-center justify-center flex-shrink-0">
            <Play className="w-5 h-5 text-[#C5B49F] fill-current" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-white mb-1">{currentProject.title}</h1>
            <div className="flex items-center gap-3 text-xs text-[#8FAAA6] flex-wrap">
              <span>{currentProject.format}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#C5B49F]" /> {currentProject.duration}</span>
              <span>·</span>
              <span>Voice: {currentProject.voice}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#C5B49F]" /> {currentProject.credits} credits</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
            isCompleted 
              ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400' 
              : 'bg-[#C5B49F]/10 border-[#C5B49F]/20 text-[#C5B49F]'
          }`}>
            {!isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-[#C5B49F] animate-pulse" />}
            {isCompleted ? '✓ Completed' : currentProject.status === 'queued' ? 'Queued' : 'Generating'}
          </div>
        </div>
      </div>

      {/* Completed Video Player Card */}
      {isCompleted && (
        <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-[#ECFDF5] mb-2 font-serif-heading">🎬 Generated Video Preview</h2>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-[#122823] border border-[#122823] group">
            <img
              src="/roman_forum_doc.jpg"
              alt="Generated Video Preview"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B0A]/95 via-[#050B0A]/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#C5B49F] text-[#030706] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-[#ECFDF5] text-sm font-medium">
              Ready to Publish — {currentProject.duration}
            </div>
          </div>
          <div className="bg-[#122823]/30 p-4 rounded-xl border border-[#122823] space-y-2">
            <div className="text-[10px] font-mono-label text-[#C5B49F] font-bold">GENERATED NARRATION SCRIPT EXCERPT</div>
            <p className="text-xs text-[#8FAAA6] italic leading-relaxed">
              "In this comprehensive deep-dive into {currentProject.topic || 'the topic'}, we explore the foundational concepts, the key turning points, and the lasting legacy that shapes our modern understanding..."
            </p>
          </div>
        </div>
      )}

      {/* Stage pipeline */}
      <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-5 font-serif-heading">Generation Pipeline</h2>
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const status = getStageStatus(index);
            const colors = {
              completed: { bg: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400', text: 'text-emerald-400', border: 'border-emerald-500/30' },
              active: { bg: 'bg-[#C5B49F]/10 border-[#C5B49F]/30 text-[#C5B49F]', text: 'text-[#C5B49F]', border: 'border-[#C5B49F]/50' },
              pending: { bg: 'bg-[#0A1412]', text: 'text-[#527E72]', border: 'border-[#122823]' },
            }[status];

            const isActiveStage = status === 'active';

            return (
              <div key={stage.id} className="flex items-start gap-4">
                {/* Stage number/icon */}
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.border} border`}>
                    {status === 'completed' 
                      ? <Check className="w-4 h-4 text-emerald-400" />
                      : <Icon className="w-4 h-4" />
                    }
                  </div>
                  {index < stages.length - 1 && (
                    <div className={`w-px flex-1 mt-1 h-6 ${status === 'completed' ? 'bg-emerald-500/30' : 'bg-[#122823]'}`} />
                  )}
                </div>

                {/* Stage info */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${status === 'pending' ? 'text-[#527E72]' : 'text-white'}`}>
                      {stage.label}
                    </span>
                    {status === 'completed' && <span className="text-xs text-emerald-400">✓ Done</span>}
                    {isActiveStage && <span className="text-xs text-[#C5B49F] font-mono-label">{progress}%</span>}
                  </div>
                  
                  <p className={`text-xs mb-2 ${status === 'pending' ? 'text-[#527E72]/60' : 'text-[#8FAAA6]'}`}>
                    {status === 'completed' ? `Completed in ~${stage.duration}s` : 
                     isActiveStage ? stage.desc :
                     'Waiting...'}
                  </p>

                  {isActiveStage && (
                    <div className="w-full bg-[#122823] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#C5B49F] h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall progress */}
        <div className="mt-4 pt-4 border-t border-[#122823]">
          <div className="flex justify-between text-xs text-[#8FAAA6] mb-2">
            <span>Overall progress</span>
            <span>{isCompleted ? 'Finished' : `Stage ${currentStage + 1} of ${stages.length}`}</span>
          </div>
          <div className="w-full bg-[#122823] h-2 rounded-full overflow-hidden">
            <div className="bg-[#C5B49F] h-full rounded-full transition-all duration-300" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Estimated completion */}
      {!isCompleted && (
        <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-4 flex items-center gap-4">
          <RefreshCw className="w-5 h-5 text-[#C5B49F] animate-spin" style={{ animationDuration: '3s' }} />
          <div>
            <div className="text-sm font-medium text-white">Generating your long-form video package</div>
            <div className="text-xs text-[#8FAAA6]">This tab will update automatically. Renders run in the background.</div>
          </div>
        </div>
      )}

      {/* Completed state actions */}
      <div className={`bg-[#0A1412] border border-[#122823] rounded-2xl p-6 transition-all duration-500 ${!isCompleted ? 'opacity-40' : ''}`}>
        <h2 className="text-base font-bold text-white mb-4 font-serif-heading">📦 Your Video Package {!isCompleted && '(available when complete)'}</h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            disabled={!isCompleted}
            onClick={handleDownload}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              isCompleted 
                ? 'bg-[#C5B49F] text-[#030706] hover:bg-[#D5C4AF] cursor-pointer shadow-md' 
                : 'bg-[#122823] text-[#527E72] cursor-not-allowed opacity-50'
            }`}
          >
            <Download className="w-4 h-4" />
            Download Video
          </button>
          
          <button 
            disabled={!isCompleted}
            onClick={handleCopyTitle}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              isCompleted 
                ? 'bg-[#0A1412] border border-[#C5B49F]/30 text-[#C5B49F] hover:bg-[#122823] cursor-pointer' 
                : 'bg-[#122823] text-[#527E72] cursor-not-allowed opacity-50'
            }`}
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy YouTube Title'}
          </button>

          <button 
            disabled={!isCompleted}
            onClick={handleDownload}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              isCompleted 
                ? 'bg-[#0A1412] border border-[#122823] text-[#8FAAA6] hover:bg-[#122823] cursor-pointer' 
                : 'bg-[#122823] text-[#527E72] cursor-not-allowed opacity-50'
            }`}
          >
            <Image className="w-4 h-4" />
            View Thumbnail
          </button>

          <button 
            disabled={!isCompleted}
            onClick={() => window.open('https://youtube.com', '_blank')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              isCompleted 
                ? 'bg-[#0A1412] border border-[#122823] text-[#8FAAA6] hover:bg-[#122823] cursor-pointer' 
                : 'bg-[#122823] text-[#527E72] cursor-not-allowed opacity-50'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Open on YouTube
          </button>
        </div>
      </div>
    </div>
  );
}

