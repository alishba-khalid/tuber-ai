'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles, FileText, Mic, Image, Film, Upload,
  Clock, BookOpen, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

const formats = [
  { id: 'documentary', label: 'Documentary', icon: Film, desc: 'Cinematic narrated documentary' },
  { id: 'explainer', label: 'Explainer', icon: Sparkles, desc: 'Clear educational breakdown' },
  { id: 'sleep-story', label: 'Sleep Story', icon: Clock, desc: 'Calm ambient storytelling' },
  { id: 'true-crime', label: 'True Crime', icon: FileText, desc: 'Gripping crime narrative' },
  { id: 'book-summary', label: 'Book Summary', icon: BookOpen, desc: 'Comprehensive book analysis' },
  { id: 'podcast', label: 'Podcast Style', icon: Mic, desc: 'Conversational deep dive' },
];

const durations = ['10 min', '20 min', '30 min', '45 min', '1 hr', '1.5 hrs', '2 hrs', '3 hrs', '4 hrs', '6 hrs', '8 hrs', '10 hrs'];

const voices = [
  { id: 'marcus', name: 'Marcus', style: 'Deep & authoritative', gender: 'Male' },
  { id: 'aria', name: 'Aria', style: 'Warm & engaging', gender: 'Female' },
  { id: 'james', name: 'James', style: 'Clear & professional', gender: 'Male' },
  { id: 'luna', name: 'Luna', style: 'Soft & calming', gender: 'Female' },
  { id: 'ethan', name: 'Ethan', style: 'Energetic & dynamic', gender: 'Male' },
  { id: 'nova', name: 'Nova', style: 'Crisp & articulate', gender: 'Female' },
];

const aspects = [
  { id: '16:9', label: 'YouTube (16:9)', desc: 'Standard widescreen' },
  { id: '9:16', label: 'Shorts (9:16)', desc: 'Vertical mobile format' },
];

const stages = [
  { icon: FileText, label: 'Script' },
  { icon: Mic, label: 'Voice' },
  { icon: Image, label: 'Visuals' },
  { icon: Film, label: 'Render' },
  { icon: Upload, label: 'Publish' },
];

export default function CreateVideoPage() {
  const router = useRouter();
  const { credits, saveProject, deductCredits, requireCredits } = useAuth();
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState('documentary');
  const [duration, setDuration] = useState('1 hr');
  const [voice, setVoice] = useState('marcus');
  const [aspect, setAspect] = useState('16:9');
  const [includeEbook, setIncludeEbook] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Deep-link into the relevant section when arriving via a sidebar/dashboard tool
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const deepLinkStep = params.get('step');
    if (deepLinkStep) {
      const el = document.getElementById(`step-${deepLinkStep}`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, []);

  const estimatedCredits = Math.round(
    (duration.includes('hr') ? parseInt(duration) * 60 : parseInt(duration)) * 5
  );

  const handleGenerate = async () => {
    setError('');
    if (!requireCredits(estimatedCredits, 'generate this video')) {
      setError('Insufficient credits. Please buy more to continue.');
      return;
    }

    setIsGenerating(true);

    try {
      const success = await deductCredits(estimatedCredits);
      if (!success) {
        setError('Failed to deduct credits. Please try again.');
        setIsGenerating(false);
        return;
      }

      const projectId = 'proj_' + Math.random().toString(36).substr(2, 9);
      const cleanTitle = topic.trim().split(/[.!?\n]/)[0].slice(0, 60) || 'Untitled Video';
      const formattedTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

      const newProject = {
        id: projectId,
        title: formattedTitle,
        topic: topic,
        format: formats.find(f => f.id === format)?.label || format,
        duration: duration,
        voice: voice.charAt(0).toUpperCase() + voice.slice(1),
        aspect: aspect,
        credits: estimatedCredits,
        status: 'queued',
        currentStage: 0,
        stageProgress: 0,
        includeEbook: includeEbook,
        views: '0',
      };

      await saveProject(newProject);
      router.push(`/dashboard/video/${projectId}`);
    } catch (e) {
      console.error(e);
      setError('An error occurred during project initialization.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif-heading text-[#2C2621]">Create New Video</h1>
        <p className="text-[#82796D] text-sm mt-0.5">Configure your AI video generation settings below</p>
      </div>

      {/* Pipeline stages indicator */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center gap-2">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 rounded-full border-2 border-[#EADFC9] bg-white flex items-center justify-center text-[#9C8F84]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] text-[#82796D] mt-1 hidden sm:block font-medium">{s.label}</span>
                </div>
                {i < stages.length - 1 && <div className="h-px flex-1 bg-[#EADFC9]" />}
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-[#82796D] mt-2">These stages run automatically after you hit Generate</p>
      </div>

      {/* Topic input */}
      <div id="step-script" className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs scroll-mt-6">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">1. Your Topic</h2>
        <p className="text-[#82796D] text-xs mb-4">Be specific for best results. Include key themes, angle, or audience.</p>
        <textarea
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder='e.g. "The complete story of the Roman Empire, from its founding to its fall — focusing on the key emperors, battles, and the reasons for collapse. Audience: history enthusiasts."'
          rows={4}
          className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2C2621] placeholder-[#9C8F84] focus:outline-none focus:border-[#A88E75] resize-none"
        />
        <div className="flex justify-between mt-2 text-xs text-[#82796D]">
          <span>💡 More detail = better output</span>
          <span>{topic.length} chars</span>
        </div>
      </div>

      {/* Format */}
      <div id="step-visuals" className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs scroll-mt-6">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">2. Format</h2>
        <p className="text-[#82796D] text-xs mb-4">Choose the narrative style for your video</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {formats.map((f) => {
            const Icon = f.icon;
            const active = format === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'border-[#A88E75] bg-[#A88E75]/10'
                    : 'border-[#EADFC9] bg-white hover:border-[#C5B49F]'
                }`}
              >
                <Icon className={`w-4 h-4 mb-2 ${active ? 'text-[#A88E75]' : 'text-[#9C8F84]'}`} />
                <div className={`text-sm font-medium ${active ? 'text-[#2C2621]' : 'text-[#6E6259]'}`}>{f.label}</div>
                <div className="text-[10px] text-[#9C8F84] mt-0.5">{f.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">3. Duration</h2>
        <p className="text-[#82796D] text-xs mb-4">Select the total runtime for your video</p>
        <div className="flex flex-wrap gap-2">
          {durations.map((d) => {
            const active = duration === d;
            return (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-xl text-sm border transition-all cursor-pointer ${
                  active
                    ? 'border-[#A88E75] bg-[#A88E75]/10 text-[#2C2621] font-semibold'
                    : 'border-[#EADFC9] text-[#6E6259] bg-white hover:border-[#C5B49F]'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice */}
      <div id="step-voice" className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs scroll-mt-6">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">4. Voice</h2>
        <p className="text-[#82796D] text-xs mb-4">Select your narrator&apos;s voice</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {voices.map((v) => {
            const active = voice === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setVoice(v.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'border-[#A88E75] bg-[#A88E75]/10'
                    : 'border-[#EADFC9] bg-white hover:border-[#C5B49F]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#A88E75] flex items-center justify-center text-xs font-bold text-white mb-2">
                  {v.name[0]}
                </div>
                <div className={`text-sm font-medium ${active ? 'text-[#2C2621]' : 'text-[#6E6259]'}`}>{v.name}</div>
                <div className="text-[10px] text-[#9C8F84]">{v.style}</div>
                <div className="text-[10px] text-[#9C8F84]">{v.gender}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Aspect ratio */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">5. Format & Aspect Ratio</h2>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {aspects.map((a) => {
            const active = aspect === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setAspect(a.id)}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  active
                    ? 'border-[#A88E75] bg-[#A88E75]/10'
                    : 'border-[#EADFC9] text-[#6E6259] bg-white hover:border-[#C5B49F]'
                }`}
              >
                <div className="text-lg mb-1">{a.id === '16:9' ? '🖥️' : '📱'}</div>
                <div className={`text-sm font-medium ${active ? 'text-[#2C2621]' : 'text-[#6E6259]'}`}>{a.label}</div>
                <div className="text-[10px] text-[#9C8F84]">{a.desc}</div>
              </button>
            );
          })}
        </div>

        {/* E-book option */}
        <div
          className="mt-4 flex items-center justify-between p-3 rounded-xl border border-[#EADFC9] hover:border-[#C5B49F] bg-white transition-all cursor-pointer"
          onClick={() => setIncludeEbook(!includeEbook)}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-[#9C8F84]" />
            <div>
              <div className="text-sm font-medium text-[#2C2621]">Include E-book PDF</div>
              <div className="text-xs text-[#82796D]">Generate a print-ready e-book from your script (+20–60 credits)</div>
            </div>
          </div>
          <div className={`w-10 h-5 rounded-full transition-all flex-shrink-0 ${includeEbook ? 'bg-[#A88E75]' : 'bg-[#EADFC9]'}`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-all mt-0.5 ${includeEbook ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
        </div>
      </div>

      {/* Credit estimate + Generate */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium text-center">
            {error}
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-[#82796D]">Estimated credit cost</div>
            <div className="text-2xl font-black text-[#2C2621]">~{estimatedCredits} <span className="text-sm font-normal text-[#82796D]">credits</span></div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#82796D]">Your balance</div>
            <div className="text-lg font-bold text-[#8C6D4F]">{credits} credits</div>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="w-full bg-[#A88E75] text-white hover:bg-[#8C7761] py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Launching generation...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Video
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-[#82796D] mt-3">
          Credits are only charged after successful completion. Failed renders are refunded automatically.
        </p>
      </div>
    </div>
  );
}
