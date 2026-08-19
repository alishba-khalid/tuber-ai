'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { PlusCircle, TrendingUp, Video, Clock, Zap, BarChart3, ArrowRight, Play } from 'lucide-react';

const recentProjects = [
  {
    id: '1',
    title: 'The Complete History of Ancient Rome',
    status: 'completed',
    duration: '2h 15m',
    format: 'Documentary',
    credits: 405,
    date: '2 hours ago',
    progress: 100,
  },
  {
    id: '2',
    title: 'How Black Holes Actually Work — Full Explainer',
    status: 'generating',
    duration: '45 min',
    format: 'Explainer',
    credits: 225,
    date: '1 hour ago',
    progress: 67,
    stage: 'Visuals',
  },
];

const statusConfig = {
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-950/30 border-emerald-800/40' },
  generating: { label: 'Generating', color: 'text-[#C5B49F]', bg: 'bg-[#C5B49F]/15 border-[#C5B49F]/30' },
  queued: { label: 'Queued', color: 'text-amber-400', bg: 'bg-amber-950/30 border-amber-800/40' },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-950/30 border-red-800/40' },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.email ? user.email.split('@')[0] : 'Creator';

  const stats = [
    { label: 'Videos Created', value: '2', icon: Video, change: '+2 this month' },
    { label: 'Hours Generated', value: '3h', icon: Clock, change: '+3h this month' },
    { label: 'Avg Watch Time', value: '68%', icon: TrendingUp, change: 'Optimal performance' },
  ];

  return (
    <div className="space-y-6 max-w-5xl text-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-serif-heading text-[#ECFDF5]">Dashboard</h1>
          <p className="text-[#8FAAA6] text-sm mt-0.5 capitalize">Welcome back, {displayName}. Ready to create?</p>
        </div>
        <Link href="/dashboard/create" className="btn-indigo-pill text-xs px-4 py-2 flex items-center gap-1.5 cursor-pointer">
          <PlusCircle className="w-3.5 h-3.5" />
          New Video
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#0A1412] border border-[#122823] p-4 rounded-xl shadow-2xs">
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#C5B49F]/10 border border-[#C5B49F]/25 flex items-center justify-center text-[#C5B49F]">
                  <Icon className="w-4 h-4" />
                </div>
                <BarChart3 className="w-3.5 h-3.5 text-[#527E72]" />
              </div>
              <div className="text-3xl font-bold font-serif-heading text-[#ECFDF5] mb-0.5">{stat.value}</div>
              <div className="text-xs text-[#8FAAA6]">{stat.label}</div>
              <div className="text-[10px] font-mono-label font-bold text-[#C5B49F] mt-1">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Create Banner */}
      <div className="relative rounded-2xl bg-[#0A1412] border border-[#122823] p-6 shadow-2xs overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#C5B49F]/3 rounded-full blur-[60px] pointer-events-none -z-10" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-serif-heading text-[#ECFDF5] mb-1">Start a new project</h3>
            <p className="text-[#8FAAA6] text-sm">Enter a topic and generate a full-length YouTube video in minutes.</p>
          </div>
          <Link href="/dashboard/create" className="btn-indigo-pill text-xs px-5 py-2.5 flex items-center gap-2 flex-shrink-0 cursor-pointer">
            Create Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-serif-heading text-[#ECFDF5]">Recent Projects</h2>
          <Link href="/dashboard/projects" className="text-xs text-[#C5B49F] font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentProjects.map((project) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            return (
              <div key={project.id} className="bg-[#0A1412] border border-[#122823] hover:border-[#225146] rounded-xl p-4 transition-all shadow-2xs group">
                <div className="flex items-center gap-4">
                  
                  {/* Thumbnail placeholder */}
                  <div className="w-12 h-8 rounded bg-[#0A1412] border border-[#122823] flex items-center justify-center flex-shrink-0">
                    <Play className="w-3.5 h-3.5 text-[#C5B49F] fill-current" />
                  </div>

                  {/* Title & info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#ECFDF5] truncate mb-0.5 group-hover:text-[#C5B49F] transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#527E72]">
                      <span>{project.format}</span>
                      <span>·</span>
                      <span>{project.duration}</span>
                      <span>·</span>
                      <span>{project.credits} credits</span>
                      <span>·</span>
                      <span>{project.date}</span>
                    </div>
                    {/* Progress bar for generating */}
                    {project.status === 'generating' && (
                      <div className="mt-2 max-w-md">
                        <div className="flex justify-between text-[10px] text-[#527E72] mb-1">
                          <span>Stage: {project.stage}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-[#122823] h-1 rounded-full overflow-hidden">
                          <div className="bg-[#C5B49F] h-full rounded-full" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono-label font-bold px-2 py-0.5 rounded border ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
