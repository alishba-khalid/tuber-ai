'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { 
  Sparkles, LayoutDashboard, FolderOpen, PlusCircle, 
  CreditCard, Settings, LogOut, ChevronRight, Bell, Search,
  Zap
} from 'lucide-react';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderOpen, label: 'My Projects', href: '/dashboard/projects' },
  { icon: PlusCircle, label: 'Create Video', href: '/dashboard/create' },
  { icon: CreditCard, label: 'Credits', href: '/dashboard/credits' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, credits } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050B0A]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-[#C5B49F]/30 border-t-[#C5B49F] animate-spin" />
          <span className="text-xs font-mono-label font-bold text-[#8FAAA6]">LOADING SESSION...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Get user initials for avatar
  const userInitials = user.email ? user.email.slice(0, 2).toUpperCase() : 'US';
  const displayName = user.email ? user.email.split('@')[0] : 'Creator';

  return (
    <div className="flex h-screen bg-[#050B0A] overflow-hidden text-slate-100">
      
      {/* Sidebar */}
      <aside className="w-60 border-r border-[#122823] flex flex-col bg-[#0A1412]">
        
        {/* Logo */}
        <div className="p-4 border-b border-[#122823]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5B49F] flex items-center justify-center text-[#030706]">
              <Sparkles className="w-4 h-4 text-[#030706]" />
            </div>
            <span className="text-lg font-bold font-serif-heading text-[#ECFDF5]">
              GenBy<span className="text-[#C5B49F]">Ghost</span>
            </span>
          </Link>
        </div>

        {/* Credits Widget */}
        <div className="p-4 border-b border-[#122823] bg-[#0A1412]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[#C5B49F]">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold font-mono-label">CREDITS</span>
            </div>
            <Link href="/dashboard/credits" className="text-xs text-[#C5B49F] font-semibold hover:underline">
              Top up
            </Link>
          </div>
          <div className="text-3xl font-bold font-serif-heading text-[#ECFDF5] mb-1">
            {credits}
          </div>
          <div className="text-[10px] text-[#527E72] mb-2 font-mono-label">
            FOUNDING ACCESS
          </div>
          <div className="w-full bg-[#122823] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#C5B49F] h-full rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(100, (credits / 300) * 100)}%` }} 
            />
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                  isActive 
                    ? 'bg-[#C5B49F]/10 text-[#C5B49F] font-semibold border-l-2 border-[#C5B49F]'
                    : 'text-[#8FAAA6] hover:text-[#ECFDF5] hover:bg-[#122823]/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#C5B49F]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Actions & Logout */}
        <div className="p-3 border-t border-[#122823]">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#122823]/40 group transition-all">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C5B49F]/10 border border-[#C5B49F]/25 flex items-center justify-center text-xs font-bold text-[#C5B49F]">
                {userInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#ECFDF5] truncate capitalize">
                  {displayName}
                </div>
                <div className="text-[10px] text-[#527E72] truncate font-mono-label">
                  FREE PLAN
                </div>
              </div>
            </div>
            <button 
              onClick={logout}
              title="Logout" 
              className="p-1 text-[#527E72] hover:text-red-400 transition-colors rounded-lg hover:bg-red-950/20 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-14 border-b border-[#122823] flex items-center px-6 gap-4 bg-[#0A1412]">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#527E72]" />
            <input
              placeholder="Search projects..."
              className="w-full bg-[#0A1412] border border-[#122823] rounded-xl pl-9 pr-4 py-1.5 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none focus:border-[#225146]"
            />
          </div>
          
          {/* Right side icons */}
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-[#122823]/50 text-[#527E72] hover:text-[#ECFDF5] transition-all cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#C5B49F]" />
            </button>
            
            <Link 
              href="/dashboard/create" 
              className="btn-indigo-pill text-xs px-4 py-2 flex items-center gap-1.5 shadow-[0_0_10px_rgba(197, 180, 159,0.15)]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              New Video
            </Link>
          </div>

        </header>

        {/* Page Content View */}
        <main className="flex-1 overflow-auto p-6 bg-[#050B0A]">
          {children}
        </main>

      </div>
    </div>
  );
}
