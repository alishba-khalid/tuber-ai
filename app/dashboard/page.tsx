import Link from 'next/link';
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
  {
    id: '3',
    title: 'A Quiet Night in the Amazon Rainforest',
    status: 'completed',
    duration: '8h 00m',
    format: 'Sleep Story',
    credits: 2400,
    date: 'Yesterday',
    progress: 100,
  },
  {
    id: '4',
    title: 'The Rise and Fall of the Roman Empire',
    status: 'queued',
    duration: '3h 30m',
    format: 'Documentary',
    credits: 630,
    date: '3 hours ago',
    progress: 0,
  },
];

const stats = [
  { label: 'Videos Created', value: '24', icon: Video, change: '+8 this month', color: '#6C3DFF' },
  { label: 'Hours Generated', value: '47h', icon: Clock, change: '+12h this month', color: '#A855F7' },
  { label: 'Credits Used', value: '660', icon: Zap, change: '840 remaining', color: '#00D4FF' },
  { label: 'Avg Watch Time', value: '68%', icon: TrendingUp, change: '+5% vs last month', color: '#10B981' },
];

const statusConfig = {
  completed: { label: 'Completed', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  generating: { label: 'Generating', color: 'text-[#A855F7]', bg: 'bg-[#A855F7]/10 border-[#A855F7]/20' },
  queued: { label: 'Queued', color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10 border-[#F59E0B]/20' },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-[#94A3B8] text-sm mt-0.5">Welcome back, John. Ready to create?</p>
        </div>
        <Link href="/dashboard/create" className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          New Video
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-4">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}30` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <BarChart3 className="w-3.5 h-3.5 text-[#64748B]" />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-[#64748B]">{stat.label}</div>
              <div className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick create banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#6C3DFF]/20 to-[#A855F7]/10 border border-[#6C3DFF]/30 p-6">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#00D4FF]/5 to-transparent" />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Start a new project</h3>
            <p className="text-[#94A3B8] text-sm">Enter a topic and generate a full-length YouTube video in minutes.</p>
          </div>
          <Link href="/dashboard/create" className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2 flex-shrink-0">
            Create Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Projects</h2>
          <Link href="/dashboard/projects" className="text-sm text-[#A855F7] hover:text-[#6C3DFF] flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentProjects.map((project) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            return (
              <div key={project.id} className="glass-card glass-card-hover p-4">
                <div className="flex items-center gap-4">
                  {/* Thumbnail placeholder */}
                  <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-[#6C3DFF]/30 to-[#A855F7]/20 flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-[#A855F7]" />
                  </div>

                  {/* Title & info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-medium text-white truncate">{project.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#64748B]">
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
                      <div className="mt-2">
                        <div className="flex justify-between text-[10px] text-[#64748B] mb-1">
                          <span>Stage: {project.stage}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="progress-bar h-1">
                          <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status + action */}
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                    <Link
                      href={`/dashboard/video/${project.id}`}
                      className="text-[#64748B] hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
