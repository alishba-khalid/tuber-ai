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
  completed: { label: 'Completed', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  generating: { label: 'Generating', color: 'text-[#9FE8FA]', bg: 'bg-[#9FE8FA]/10 border-[#9FE8FA]/20' },
  queued: { label: 'Queued', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  failed: { label: 'Failed', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.email ? user.email.split('@')[0] : 'Creator';

  const stats = [
    { label: 'Videos Created', value: '2', icon: Video, change: '+2 this month', color: '#1E1B4B' },
    { label: 'Hours Generated', value: '3h', icon: Clock, change: '+3h this month', color: '#1E1B4B' },
    { label: 'Avg Watch Time', value: '68%', icon: TrendingUp, change: 'Optimal performance', color: '#1E1B4B' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif-heading text-[#E2F8FC]">Dashboard</h1>
          <p className="text-[#678B94] text-sm mt-0.5 capitalize">Welcome back, {displayName}. Ready to create?</p>
        </div>
        <Link href="/dashboard/create" className="btn-indigo-pill text-xs px-4 py-2 flex items-center gap-1.5">
          <PlusCircle className="w-3.5 h-3.5" />
          New Video
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#0B1E24] border border-[#133038] p-4 rounded-xl shadow-2xs">
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#9FE8FA]/10 border border-[#9FE8FA]/20 flex items-center justify-center text-[#9FE8FA]">
                  <Icon className="w-4 h-4" />
                </div>
                <BarChart3 className="w-3.5 h-3.5 text-[#4B656B]" />
              </div>
              <div className="text-2xl font-bold font-serif-heading text-[#E2F8FC] mb-0.5">{stat.value}</div>
              <div className="text-xs text-[#678B94]">{stat.label}</div>
              <div className="text-[10px] font-mono-label font-bold text-[#9FE8FA] mt-1">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Create Banner */}
      <div className="relative rounded-2xl bg-[#0B1E24] border border-[#133038] p-6 shadow-2xs overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-serif-heading text-[#E2F8FC] mb-1">Start a new project</h3>
            <p className="text-[#678B94] text-sm">Enter a topic and generate a full-length YouTube video in minutes.</p>
          </div>
          <Link href="/dashboard/create" className="btn-indigo-pill text-xs px-5 py-2.5 flex items-center gap-2 flex-shrink-0">
            Create Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-serif-heading text-[#E2F8FC]">Recent Projects</h2>
          <Link href="/dashboard/projects" className="text-xs text-[#9FE8FA] font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentProjects.map((project) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            return (
              <div key={project.id} className="bg-[#0B1E24] border border-[#133038] hover:border-[#1C4955] rounded-xl p-4 transition-all shadow-2xs">
                <div className="flex items-center gap-4">
                  
                  {/* Thumbnail placeholder */}
                  <div className="w-12 h-8 rounded bg-[#0B1E24] border border-[#133038] flex items-center justify-center flex-shrink-0">
                    <Play className="w-3.5 h-3.5 text-[#9FE8FA] fill-current" />
                  </div>

                  {/* Title & info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#E2F8FC] truncate mb-0.5">{project.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#4B656B]">
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
                        <div className="flex justify-between text-[10px] text-[#4B656B] mb-1">
                          <span>Stage: {project.stage}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-[#133038] h-1 rounded-full overflow-hidden">
                          <div className="bg-[#9FE8FA] h-full rounded-full" style={{ width: `${project.progress}%` }} />
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
