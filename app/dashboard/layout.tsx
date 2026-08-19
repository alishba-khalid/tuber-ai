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
      <div className="min-h-screen flex items-center justify-center bg-[#0D0E12]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-[#0F6F8A]/30 border-t-[#0F6F8A] animate-spin" />
          <span className="text-xs font-mono-label font-bold text-[#9CA3AF]">LOADING SESSION...</span>
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
    <div className="flex h-screen bg-[#0D0E12] overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-60 border-r border-[#2A2C35] flex flex-col bg-[#17181F]">
        
        {/* Logo */}
        <div className="p-4 border-b border-[#2A2C35]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 text-[#0D0E12]" />
            </div>
            <span className="text-lg font-bold font-serif-heading text-[#F3F4F6]">
              Tuber<span className="text-[#F97316]">AI</span>
            </span>
          </Link>
        </div>

        {/* Credits Widget */}
        <div className="p-4 border-b border-[#2A2C35] bg-[#17181F]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[#F97316]">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold font-mono-label">CREDITS</span>
            </div>
            <Link href="/dashboard/credits" className="text-xs text-[#F97316] font-semibold hover:underline">
              Top up
            </Link>
          </div>
          <div className="text-whitexl font-bold font-serif-heading text-[#F3F4F6] mb-1">
            {credits}
          </div>
          <div className="text-[10px] text-[#6B7280] mb-2 font-mono-label">
            FOUNDING ACCESS
          </div>
          <div className="w-full bg-[#2A2C35] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#F97316] h-full rounded-full transition-all duration-300" 
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
                    ? 'bg-[#F97316]/10 text-[#F97316] font-semibold border-l-2 border-[#0F6F8A]'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#17181F]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#F97316]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Actions & Logout */}
        <div className="p-3 border-t border-[#2A2C35]">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#17181F] group transition-all">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-xs font-bold text-[#F97316]">
                {userInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#F3F4F6] truncate capitalize">
                  {displayName}
                </div>
                <div className="text-[10px] text-[#6B7280] truncate font-mono-label">
                  FREE PLAN
                </div>
              </div>
            </div>
            <button 
              onClick={logout}
              title="Logout" 
              className="p-1 text-[#6B7280] hover:text-[#991B1B] transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-14 border-b border-[#2A2C35] flex items-center px-6 gap-4 bg-[#17181F]">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              placeholder="Search projects..."
              className="w-full bg-[#17181F] border border-[#2A2C35] rounded-xl pl-9 pr-4 py-1.5 text-sm text-[#F3F4F6] placeholder-[#A1A1AA] focus:outline-none focus:border-[#3E414F]"
            />
          </div>
          
          {/* Right side icons */}
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-[#17181F] text-[#6B7280] hover:text-[#F3F4F6] transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            </button>
            
            <Link 
              href="/dashboard/create" 
              className="btn-indigo-pill text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              New Video
            </Link>
          </div>

        </header>

        {/* Page Content View */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
