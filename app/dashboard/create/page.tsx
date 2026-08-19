'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, ChevronRight, FileText, Mic, Image, Film, Upload,
  Clock, Layers, Globe, BookOpen, Settings, ArrowRight, Info
} from 'lucide-react';

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
  { id: '16:9', label: 'YouTube (16:9)', icon: '▬', desc: 'Standard widescreen' },
  { id: '9:16', label: 'Shorts (9:16)', icon: '▬', desc: 'Vertical mobile format' },
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
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState('documentary');
  const [duration, setDuration] = useState('1 hr');
  const [voice, setVoice] = useState('marcus');
  const [aspect, setAspect] = useState('16:9');
  const [includeEbook, setIncludeEbook] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const estimatedCredits = Math.round(
    (duration.includes('hr') ? parseInt(duration) * 60 : parseInt(duration)) * 5
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    router.push('/dashboard/video/new-1');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Video</h1>
        <p className="text-[#94A3B8] text-sm mt-0.5">Configure your AI video generation settings below</p>
      </div>

      {/* Pipeline stages indicator */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="step-circle pending text-[10px] w-7 h-7">
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="text-[9px] text-[#64748B] mt-1 hidden sm:block">{s.label}</span>
                </div>
                {i < stages.length - 1 && <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />}
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-[#64748B] mt-2">These stages run automatically after you hit Generate</p>
      </div>

      {/* Topic input */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-1">1. Your Topic</h2>
        <p className="text-[#64748B] text-xs mb-4">Be specific for best results. Include key themes, angle, or audience.</p>
        <textarea
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder='e.g. "The complete story of the Roman Empire, from its founding to its fall — focusing on the key emperors, battles, and the reasons for collapse. Audience: history enthusiasts."'
          rows={4}
          className="input-field resize-none text-sm"
        />
        <div className="flex justify-between mt-2 text-xs text-[#64748B]">
          <span>💡 More detail = better output</span>
          <span>{topic.length} chars</span>
        </div>
      </div>

      {/* Format */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-1">2. Format</h2>
        <p className="text-[#64748B] text-xs mb-4">Choose the narrative style for your video</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {formats.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  format === f.id
                    ? 'border-[#6C3DFF] bg-[#6C3DFF]/15 text-white'
                    : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-[#94A3B8] hover:border-[#6C3DFF]/40'
                }`}
              >
                <Icon className={`w-4 h-4 mb-2 ${format === f.id ? 'text-[#A855F7]' : 'text-[#64748B]'}`} />
                <div className="text-sm font-medium">{f.label}</div>
                <div className="text-[10px] text-[#64748B] mt-0.5">{f.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-1">3. Duration</h2>
        <p className="text-[#64748B] text-xs mb-4">Select the total runtime for your video</p>
        <div className="flex flex-wrap gap-2">
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                duration === d
                  ? 'border-[#6C3DFF] bg-[#6C3DFF]/15 text-white font-medium'
                  : 'border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:border-[#6C3DFF]/40'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Voice */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-1">4. Voice</h2>
        <p className="text-[#64748B] text-xs mb-4">Select your narrator's voice</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {voices.map((v) => (
            <button
              key={v.id}
              onClick={() => setVoice(v.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                voice === v.id
                  ? 'border-[#6C3DFF] bg-[#6C3DFF]/15'
                  : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[#6C3DFF]/40'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C3DFF] to-[#A855F7] flex items-center justify-center text-xs font-bold text-white mb-2">
                {v.name[0]}
              </div>
              <div className={`text-sm font-medium ${voice === v.id ? 'text-white' : 'text-[#94A3B8]'}`}>{v.name}</div>
              <div className="text-[10px] text-[#64748B]">{v.style}</div>
              <div className="text-[10px] text-[#64748B]">{v.gender}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Aspect ratio */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-1">5. Format & Aspect Ratio</h2>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {aspects.map((a) => (
            <button
              key={a.id}
              onClick={() => setAspect(a.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                aspect === a.id
                  ? 'border-[#6C3DFF] bg-[#6C3DFF]/15 text-white'
                  : 'border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:border-[#6C3DFF]/40'
              }`}
            >
              <div className="text-lg mb-1">{a.id === '16:9' ? '🖥️' : '📱'}</div>
              <div className="text-sm font-medium">{a.label}</div>
              <div className="text-[10px] text-[#64748B]">{a.desc}</div>
            </button>
          ))}
        </div>

        {/* E-book option */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl border border-[rgba(255,255,255,0.08)] hover:border-[#6C3DFF]/30 transition-all cursor-pointer" onClick={() => setIncludeEbook(!includeEbook)}>
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-[#64748B]" />
            <div>
              <div className="text-sm font-medium text-white">Include E-book PDF</div>
              <div className="text-xs text-[#64748B]">Generate a print-ready e-book from your script (+20–60 credits)</div>
            </div>
          </div>
          <div className={`w-10 h-5 rounded-full transition-all ${includeEbook ? 'bg-[#6C3DFF]' : 'bg-[rgba(255,255,255,0.1)]'}`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-all mt-0.5 ${includeEbook ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
        </div>
      </div>

      {/* Credit estimate + Generate */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-[#64748B]">Estimated credit cost</div>
            <div className="text-2xl font-black text-white">~{estimatedCredits} <span className="text-sm font-normal text-[#64748B]">credits</span></div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#64748B]">Your balance</div>
            <div className="text-lg font-bold text-[#A855F7]">840 credits</div>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <p className="text-center text-xs text-[#64748B] mt-3">
          Credits are only charged after successful completion. Failed renders are refunded automatically.
        </p>
      </div>
    </div>
  );
}
