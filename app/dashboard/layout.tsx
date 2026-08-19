'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, LayoutDashboard, FolderOpen, PlusCircle, 
  CreditCard, Settings, LogOut, ChevronRight, Bell, Search,
  Zap, User
} from 'lucide-react';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderOpen, label: 'My Projects', href: '/dashboard/projects' },
  { icon: PlusCircle, label: 'Create Video', href: '/dashboard/create' },
  { icon: CreditCard, label: 'Credits', href: '/dashboard/credits' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#080B14] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 border-r border-[rgba(255,255,255,0.06)] flex flex-col bg-[#0D1121]">
        {/* Logo */}
        <div className="p-4 border-b border-[rgba(255,255,255,0.06)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C3DFF] to-[#A855F7] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Tuber<span className="gradient-text">AI</span></span>
          </Link>
        </div>

        {/* Credits widget */}
        <div className="p-3">
          <div className="glass-card p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#A855F7]" />
                <span className="text-xs font-semibold text-white">Credits</span>
              </div>
              <Link href="/dashboard/credits" className="text-xs text-[#6C3DFF] hover:text-[#A855F7]">Top up</Link>
            </div>
            <div className="text-2xl font-black text-white mb-1">840</div>
            <div className="text-[10px] text-[#64748B] mb-2">of 1,500 monthly</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '56%' }} />
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: user + logout */}
        <div className="p-3 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[rgba(255,255,255,0.04)] cursor-pointer transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C3DFF] to-[#A855F7] flex items-center justify-center text-xs font-bold text-white">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">John Doe</div>
              <div className="text-[10px] text-[#64748B] truncate">Creator Plan</div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-[#64748B] group-hover:text-red-400 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-[rgba(255,255,255,0.06)] flex items-center px-6 gap-4 bg-[#0D1121]">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              placeholder="Search projects..."
              className="input-field pl-9 py-2 text-sm"
            />
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)] text-[#64748B] hover:text-white transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#6C3DFF]" />
            </button>
            
            {/* Create video button */}
            <Link href="/dashboard/create" className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5">
              <PlusCircle className="w-3.5 h-3.5" />
              New Video
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
