'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, PlusCircle, Play, ArrowRight, Clock, Zap } from 'lucide-react';

const allProjects = [
  { id: '1', title: 'The Complete History of Ancient Rome', status: 'completed', duration: '2h 15m', format: 'Documentary', credits: 405, date: '2026-08-18', views: '12.4K' },
  { id: '2', title: 'How Black Holes Actually Work', status: 'generating', duration: '45 min', format: 'Explainer', credits: 225, date: '2026-08-18', stage: 'Visuals', progress: 67 },
  { id: '3', title: 'A Quiet Night in the Amazon Rainforest', status: 'completed', duration: '8h 00m', format: 'Sleep Story', credits: 2400, date: '2026-08-17', views: '8.2K' },
  { id: '4', title: 'The Rise and Fall of Wall Street', status: 'completed', duration: '1h 30m', format: 'Documentary', credits: 450, date: '2026-08-17', views: '5.1K' },
  { id: '5', title: 'Atomic Habits — Complete Book Summary', status: 'completed', duration: '1h 00m', format: 'Book Summary', credits: 300, date: '2026-08-16', views: '22.3K' },
  { id: '6', title: 'True Crime: The Zodiac Killer', status: 'completed', duration: '1h 45m', format: 'True Crime', credits: 525, date: '2026-08-15', views: '45.1K' },
  { id: '7', title: 'The Psychology of Money', status: 'queued', duration: '2h 00m', format: 'Book Summary', credits: 600, date: '2026-08-18' },
  { id: '8', title: 'Ancient Egypt: Secrets Revealed', status: 'completed', duration: '3h 00m', format: 'Documentary', credits: 900, date: '2026-08-14', views: '18.7K' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  completed: { label: 'Completed', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  generating: { label: 'Generating', color: 'text-[#A855F7]', bg: 'bg-[#A855F7]/10 border-[#A855F7]/20' },
  queued: { label: 'Queued', color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10 border-[#F59E0B]/20' },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
};

const formats = ['All', 'Documentary', 'Explainer', 'Sleep Story', 'True Crime', 'Book Summary'];

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [filterFormat, setFilterFormat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = allProjects.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFormat = filterFormat === 'All' || p.format === filterFormat;
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchSearch && matchFormat && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Projects</h1>
          <p className="text-[#94A3B8] text-sm mt-0.5">{allProjects.length} total videos</p>
        </div>
        <Link href="/dashboard/create" className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          New Video
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterFormat}
            onChange={e => setFilterFormat(e.target.value)}
            className="input-field py-2 text-sm pr-8 cursor-pointer"
            style={{ width: 'auto' }}
          >
            {formats.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="input-field py-2 text-sm pr-8 cursor-pointer"
            style={{ width: 'auto' }}
          >
            {['All', 'Completed', 'Generating', 'Queued', 'Failed'].map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Projects list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Play className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No projects found</h3>
            <p className="text-[#64748B] text-sm">Try adjusting your filters or create a new video.</p>
            <Link href="/dashboard/create" className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-2 mt-4">
              <PlusCircle className="w-4 h-4" /> Create Video
            </Link>
          </div>
        ) : (
          filtered.map((project) => {
            const status = statusConfig[project.status];
            return (
              <div key={project.id} className="glass-card glass-card-hover p-4">
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-12 rounded-lg bg-gradient-to-br from-[#6C3DFF]/30 to-[#A855F7]/20 flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 text-[#A855F7]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate mb-1">{project.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#64748B] flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {project.duration}
                      </span>
                      <span>·</span>
                      <span>{project.format}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {project.credits} credits
                      </span>
                      {project.views && (
                        <>
                          <span>·</span>
                          <span>👁 {project.views} views</span>
                        </>
                      )}
                    </div>
                    {'progress' in project && project.status === 'generating' && (
                      <div className="mt-2">
                        <div className="progress-bar h-1">
                          <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status + action */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border hidden sm:block ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                    <Link href={`/dashboard/video/${project.id}`} className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
