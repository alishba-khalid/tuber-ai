'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  PlusCircle, FileText, Mic, Image as ImageIcon, Zap,
  ArrowRight, Play, Youtube
} from 'lucide-react';

const statusConfig = {
  completed: { label: 'Completed', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  generating: { label: 'Generating', color: 'text-[#A88E75]', bg: 'bg-[#FAF6F0] border-[#EADFC9]' },
  queued: { label: 'Queued', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  failed: { label: 'Failed', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
};

const stageNames = ['Script', 'Voice', 'Visuals', 'Render', 'Publish'];

const pipelineSteps = [
  {
    icon: FileText,
    label: 'Scripts',
    status: 'LIVE',
    desc: 'Turn one topic into a chaptered, narration-ready script.',
    step: 'script',
  },
  {
    icon: Mic,
    label: 'Voiceover',
    status: 'LIVE',
    desc: 'Narrate any script in a natural, expressive voice.',
    step: 'voice',
  },
  {
    icon: ImageIcon,
    label: 'Image / B-roll',
    status: 'LIVE',
    desc: 'Generate a scene image or clip for every moment of the story.',
    step: 'visuals',
  },
  {
    icon: Youtube,
    label: 'YouTube Publishing',
    status: 'LIVE',
    desc: 'Auto-upload the finished video straight to your channel.',
    step: 'publish',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, projects, requireCredits } = useAuth();
  const rawName = user?.email ? user.email.split('@')[0] : 'Alishba';
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const goToPipelineStep = (step: string, label: string) => {
    if (!requireCredits(1, `use ${label}`)) return;
    if (step === 'publish') {
      router.push('/dashboard/projects');
    } else {
      router.push(`/dashboard/create?step=${step}`);
    }
  };

  const handleGatedNav = (e: React.MouseEvent, reason: string) => {
    if (!requireCredits(1, reason)) {
      e.preventDefault();
    }
  };

  // Dynamic stats calculation
  const inProgressCount = projects.filter(p => p.status === 'generating' || p.status === 'queued').length;
  const readyToUseCount = projects.filter(p => p.status === 'completed').length;
  const finishedCount = projects.filter(p => p.status === 'completed').length;
  const totalProjectsCount = projects.length;

  const recent = projects.slice(0, 4);

  return (
    <div className="space-y-8 max-w-5xl text-[#2C2621]">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#2C2621]">
            Welcome, {displayName}!
          </h1>
          <p className="text-[#6E6259] text-sm mt-1 font-sans">
            Let&apos;s make your first video — it starts with a single topic.
          </p>
        </div>
        <Link
          href="/dashboard/create"
          onClick={(e) => handleGatedNav(e, 'write a new script')}
          className="border border-[#EADFC9] text-[#2C2621] hover:bg-[#EADFC9]/25 text-xs px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-2xs bg-white/70 backdrop-blur-sm"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New script</span>
        </Link>
      </div>

      {/* Autopilot Hero Banner Card */}
      <div className="bg-[#EADFC9]/50 backdrop-blur-md border border-[#EADFC9] rounded-3xl p-6 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#A88E75] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
            <Zap className="w-6 h-6 fill-current text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2C2621] font-serif-heading">
              Make a whole video with Autopilot
            </h3>
            <p className="text-[#6E6259] text-sm mt-0.5 max-w-lg leading-relaxed">
              One topic → script, voice, images, render, and publish — hands-free.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="text-[10px] font-mono-label font-bold text-[#8C6D4F] bg-[#EADFC9] px-2.5 py-1 rounded border border-[#8C6D4F]/20 uppercase tracking-wider">
            1-CLICK
          </span>
          <Link
            href="/dashboard/create"
            onClick={(e) => handleGatedNav(e, 'use Autopilot')}
            className="bg-[#A88E75] text-white hover:bg-[#8C7761] text-sm px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Start</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'In progress', value: inProgressCount },
          { label: 'Ready to use', value: readyToUseCount },
          { label: 'Finished videos', value: finishedCount },
          { label: 'Total projects', value: totalProjectsCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] p-5 rounded-2xl shadow-2xs flex flex-col justify-between min-h-[110px]"
          >
            <div className="text-xs text-[#82796D] font-medium tracking-wide">
              {stat.label}
            </div>
            <div className="text-4xl font-extrabold text-[#2C2621] mt-2 font-serif-heading">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Your Production Line Section */}
      <div>
        <div className="flex items-center justify-between border-b border-[#EADFC9] pb-3 mb-6">
          <h2 className="text-xl font-bold font-serif-heading text-[#2C2621]">
            Your production line
          </h2>
          <span className="text-[10px] font-mono-label font-bold text-[#82796D] tracking-widest uppercase">
            One Topic → Finished Film
          </span>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Connecting step line (desktop) */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#EADFC9] via-[#C5B49F] to-[#EADFC9]" />

          {pipelineSteps.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={s.label}
                onClick={() => goToPipelineStep(s.step, s.label)}
                className="text-left bg-white/70 backdrop-blur-sm border border-[#EADFC9] hover:border-[#C5B49F] p-6 rounded-2xl shadow-2xs hover:shadow-md relative flex flex-col justify-between min-h-[170px] transition-all cursor-pointer group"
              >
                <div className="absolute top-4 right-4 text-xs font-mono-label text-[#EADFC9] font-bold group-hover:text-[#C5B49F] transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EADFC9]/60 flex items-center justify-center text-[#8C6D4F] flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-[#2C2621]">{s.label}</h3>
                  </div>
                  <span className="text-[8px] font-mono-label font-bold text-[#8C6D4F] bg-[#EADFC9] px-1.5 py-0.5 rounded uppercase">
                    {s.status}
                  </span>
                  <p className="text-xs text-[#6E6259] leading-relaxed mt-3">
                    {s.desc}
                  </p>
                </div>
                <div className="text-xs font-bold text-[#8C6D4F] group-hover:underline inline-flex items-center gap-1.5 mt-4">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}

        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4 mt-4">
          <h2 className="text-xl font-bold font-serif-heading text-[#2C2621]">
            Recent Projects
          </h2>
          <Link 
            href="/dashboard/projects" 
            className="text-xs text-[#A88E75] font-semibold hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {recent.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] border-dashed rounded-2xl p-8 text-center text-[#9C8F84]">
              No projects yet. Click &quot;New script&quot; above or start Autopilot to launch your first generation.
            </div>
          ) : (
            recent.map((project) => {
              const status = statusConfig[project.status as keyof typeof statusConfig] || statusConfig.queued;
              const currentStageName = stageNames[project.stageIndex ?? 0] || 'Processing';
              const progressVal = project.progress ?? 0;

              return (
                <Link
                  href={`/dashboard/video/${project.id}`}
                  key={project.id}
                  className="block bg-white/70 backdrop-blur-sm border border-[#EADFC9] hover:border-[#C5B49F] rounded-2xl p-4 transition-all shadow-2xs group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    
                    {/* Thumbnail icon */}
                    <div className="w-12 h-8 rounded bg-[#F3F0E9] border border-[#EADFC9] flex items-center justify-center flex-shrink-0">
                      <Play className="w-3.5 h-3.5 text-[#A88E75] fill-current" />
                    </div>

                    {/* Title & info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#2C2621] truncate mb-0.5 group-hover:text-[#A88E75] transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-[#82796D]">
                        <span>{project.format}</span>
                        <span>·</span>
                        <span>{project.duration}</span>
                        <span>·</span>
                        <span>{project.credits} credits</span>
                        <span>·</span>
                        <span>{project.date}</span>
                      </div>
                      
                      {/* Progress bar */}
                      {project.status === 'generating' && (
                        <div className="mt-2 max-w-md">
                          <div className="flex justify-between text-[10px] text-[#82796D] mb-1">
                            <span>Stage: {currentStageName}</span>
                            <span>{progressVal}%</span>
                          </div>
                          <div className="w-full bg-[#FAF6F0] h-1 rounded-full overflow-hidden border border-[#EADFC9]/50">
                            <div 
                              className="bg-[#A88E75] h-full rounded-full transition-all duration-300" 
                              style={{ width: `${progressVal}%` }} 
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-3 self-start sm:self-center">
                      <span className={`text-[10px] font-mono-label font-bold px-2 py-0.5 rounded border ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
