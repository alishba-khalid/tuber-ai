'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, PlusCircle, Play, ArrowRight, Clock, Zap } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  completed: { label: 'Completed', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  generating: { label: 'Generating', color: 'text-[#C5B49F]', bg: 'bg-[#C5B49F]/15 border-[#C5B49F]/30' },
  queued: { label: 'Queued', color: 'text-amber-400', bg: 'bg-amber-950/30 border-amber-800/40' },
  failed: { label: 'Failed', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
};

const formats = ['All', 'Documentary', 'Explainer', 'Sleep Story', 'True Crime', 'Book Summary'];

export default function ProjectsPage() {
  const { projects } = useAuth();
  const [search, setSearch] = useState('');
  const [filterFormat, setFilterFormat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = projects.filter(p => {
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
          <h1 className="text-2xl font-bold text-white font-serif-heading">My Projects</h1>
          <p className="text-[#8FAAA6] text-sm mt-0.5 font-mono-label">{projects.length} total videos</p>
        </div>
        <Link href="/dashboard/create" className="btn-indigo-pill px-5 py-2.5 text-xs flex items-center gap-2">
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
            className="w-full bg-[#0A1412] border border-[#122823] rounded-xl text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none focus:border-[#225146] pl-9 py-2"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterFormat}
            onChange={e => setFilterFormat(e.target.value)}
            className="bg-[#0A1412] border border-[#122823] rounded-xl text-sm text-[#ECFDF5] focus:outline-none focus:border-[#225146] py-2 pr-8 cursor-pointer"
            style={{ width: 'auto' }}
          >
            {formats.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#0A1412] border border-[#122823] rounded-xl text-sm text-[#ECFDF5] focus:outline-none focus:border-[#225146] py-2 pr-8 cursor-pointer"
            style={{ width: 'auto' }}
          >
            {['All', 'Completed', 'Generating', 'Queued', 'Failed'].map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Projects list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-12 text-center">
            <Play className="w-12 h-12 text-[#527E72] mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No projects found</h3>
            <p className="text-[#8FAAA6] text-xs">Try adjusting your filters or create a new video.</p>
            <Link href="/dashboard/create" className="btn-indigo-pill px-6 py-2.5 text-xs inline-flex items-center gap-2 mt-4 cursor-pointer">
              <PlusCircle className="w-4 h-4" /> Create Video
            </Link>
          </div>
        ) : (
          filtered.map((project) => {
            const status = statusConfig[project.status];
            return (
              <div key={project.id} className="bg-[#0A1412] border border-[#122823] hover:border-[#225146] rounded-2xl p-4 transition-all">
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-12 rounded-lg bg-[#122823] flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 text-[#C5B49F] fill-current" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate mb-1">{project.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#8FAAA6] flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C5B49F]" /> {project.duration}
                      </span>
                      <span>·</span>
                      <span>{project.format}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#C5B49F]" /> {project.credits} credits
                      </span>
                      {project.views && project.status === 'completed' && (
                        <>
                          <span>·</span>
                          <span>👁 {project.views} views</span>
                        </>
                      )}
                    </div>
                    {project.status === 'generating' && (
                      <div className="mt-2 max-w-md">
                        <div className="w-full bg-[#122823] h-1 rounded-full overflow-hidden">
                          <div className="bg-[#C5B49F] h-full rounded-full transition-all duration-300" style={{ width: `${project.progress ?? 0}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status + action */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border hidden sm:block ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                    <Link href={`/dashboard/video/${project.id}`} className="btn-outline-pill px-3 py-1.5 text-xs flex items-center gap-1 cursor-pointer">
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
