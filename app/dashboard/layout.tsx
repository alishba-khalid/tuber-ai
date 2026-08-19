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
      <div className="min-h-screen flex items-center justify-center bg-[#060F12]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-[#1E1B4B]/30 border-t-[#1E1B4B] animate-spin" />
          <span className="text-xs font-mono-label font-bold text-[#7FA0AB]">LOADING SESSION...</span>
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
    <div className="flex h-screen bg-[#060F12] overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-60 border-r border-[#172B33] flex flex-col bg-[#0E1B20]">
        
        {/* Logo */}
        <div className="p-4 border-b border-[#172B33]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8FE1F4] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 text-[#060F12]" />
            </div>
            <span className="text-lg font-bold font-serif-heading text-[#E6F3F7]">
              Tuber<span className="text-[#8FE1F4]">AI</span>
            </span>
          </Link>
        </div>

        {/* Credits Widget */}
        <div className="p-4 border-b border-[#172B33] bg-[#0E1B20]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[#8FE1F4]">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold font-mono-label">CREDITS</span>
            </div>
            <Link href="/dashboard/credits" className="text-xs text-[#8FE1F4] font-semibold hover:underline">
              Top up
            </Link>
          </div>
          <div className="text-2xl font-bold font-serif-heading text-[#E6F3F7] mb-1">
            {credits}
          </div>
          <div className="text-[10px] text-[#4E6872] mb-2 font-mono-label">
            FOUNDING ACCESS
          </div>
          <div className="w-full bg-[#172B33] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#8FE1F4] h-full rounded-full transition-all duration-300" 
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
                    ? 'bg-[#8FE1F4]/10 text-[#8FE1F4] font-semibold border-l-2 border-[#1E1B4B]'
                    : 'text-[#7FA0AB] hover:text-[#E6F3F7] hover:bg-[#0E1B20]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#8FE1F4]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Actions & Logout */}
        <div className="p-3 border-t border-[#172B33]">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#0E1B20] group transition-all">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#8FE1F4]/10 border border-[#8FE1F4]/20 flex items-center justify-center text-xs font-bold text-[#8FE1F4]">
                {userInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#E6F3F7] truncate capitalize">
                  {displayName}
                </div>
                <div className="text-[10px] text-[#4E6872] truncate font-mono-label">
                  FREE PLAN
                </div>
              </div>
            </div>
            <button 
              onClick={logout}
              title="Logout" 
              className="p-1 text-[#4E6872] hover:text-[#991B1B] transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-14 border-b border-[#172B33] flex items-center px-6 gap-4 bg-[#0E1B20]">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4E6872]" />
            <input
              placeholder="Search projects..."
              className="w-full bg-[#0E1B20] border border-[#172B33] rounded-xl pl-9 pr-4 py-1.5 text-sm text-[#E6F3F7] placeholder-[#A1A1AA] focus:outline-none focus:border-[#233E4A]"
            />
          </div>
          
          {/* Right side icons */}
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-[#0E1B20] text-[#4E6872] hover:text-[#E6F3F7] transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#8FE1F4]" />
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
