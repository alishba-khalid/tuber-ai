'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Toast from '@/components/Toast';
import LogoIcon from '@/components/LogoIcon';
import { hasLegacyCreditsClient } from '@/lib/flags';
import { getTier } from '@/lib/plans';
import {
  Sparkles, LayoutDashboard,
  CreditCard, Settings, LogOut, Bell, Search,
  Zap, FileText, Mic, Image, Youtube, Globe, BookOpen, Mail, ArrowUpRight
} from 'lucide-react';

const sidebarTools = [
  { label: 'Scripts', icon: FileText, step: 'script' },
  { label: 'Voice Generation', icon: Mic, step: 'voice' },
  { label: 'Visuals', icon: Image, step: 'visuals' },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, credits, subscription, quota } = useAuth();
  const isLegacy = hasLegacyCreditsClient(credits);
  const hasActivePlan = subscription.status === 'active';
  const pathname = usePathname();
  const router = useRouter();

  const openTool = (step: string) => {
    router.push(`/dashboard/create?step=${step}`);
  };

  const openPublishing = () => {
    router.push('/dashboard/projects');
  };

  useEffect(() => {
    if (loading || user) return;
    // /dashboard/create has a public counterpart anonymous visitors can use
    // directly — send them there instead of forcing a login wall. Every
    // other dashboard route still requires auth.
    if (pathname === '/dashboard/create') {
      router.replace('/create');
    } else {
      router.push('/auth/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-[#A88E75]/30 border-t-[#A88E75] animate-spin" />
          <span className="text-xs font-mono-label font-bold text-[#6E6259]">LOADING SESSION...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Get user initials for avatar
  const userInitials = user.email ? user.email.slice(0, 1).toUpperCase() : 'A';

  return (
    <div className="flex h-screen bg-[#FAF6F0] overflow-hidden text-[#2C2621]">

      {/* Sidebar */}
      <aside className="w-60 border-r border-[#EADFC9] flex flex-col bg-[#F3F0E9]">

        {/* Brand Header */}
        <div className="p-4 border-b border-[#EADFC9]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoIcon />
            <span className="text-lg font-bold font-serif-heading text-[#2C2621]">
              GenBy<span className="text-[#A88E75]">Ghost</span>
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-[#EADFC9]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9C8F84]" />
            <input
              placeholder="Search"
              disabled
              className="w-full bg-[#FAF6F0] border border-[#EADFC9] rounded-xl pl-9 pr-12 py-1.5 text-xs text-[#2C2621] placeholder-[#9C8F84] focus:outline-none"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-[#9C8F84] font-mono border border-[#EADFC9] px-1 py-0.5 rounded bg-[#FAF6F0]">ctrl K</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">

          {/* Main Links */}
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                pathname === '/dashboard'
                  ? 'bg-[#EADFC9] text-[#8C6D4F] font-semibold'
                  : 'text-[#6E6259] hover:text-[#2C2621] hover:bg-[#EADFC9]/20'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/dashboard/create"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                pathname === '/dashboard/create'
                  ? 'bg-[#EADFC9] text-[#8C6D4F] font-semibold'
                  : 'text-[#6E6259] hover:text-[#2C2621] hover:bg-[#EADFC9]/20'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#A88E75]" />
              <span>Autopilot</span>
              <span className="ml-auto text-[9px] font-mono-label font-bold text-[#8C6D4F] bg-[#EADFC9] px-1.5 py-0.5 rounded-sm uppercase">1-CLICK</span>
            </Link>
          </div>

          {/* TOOLS Section */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono-label font-bold text-[#9C8F84] uppercase tracking-wider mb-2">
              Tools
            </div>

            {sidebarTools.map(({ label, icon: Icon, step }) => (
              <button
                key={label}
                onClick={() => openTool(step)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-[#6E6259] hover:text-[#2C2621] hover:bg-[#EADFC9]/20 transition-all cursor-pointer text-left"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* PUBLISH Section */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono-label font-bold text-[#9C8F84] uppercase tracking-wider mb-2">
              Publish
            </div>

            <button
              onClick={openPublishing}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-[#6E6259] hover:text-[#2C2621] hover:bg-[#EADFC9]/20 transition-all cursor-pointer text-left"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube Publishing</span>
            </button>
          </div>

          {/* MONETIZE Section */}
          <div className="space-y-1">
            <div className="px-3 text-[10px] font-mono-label font-bold text-[#9C8F84] uppercase tracking-wider mb-2">
              Monetize
            </div>

            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-[#9C8F84] cursor-not-allowed">
              <BookOpen className="w-4 h-4" />
              <span>E-books</span>
              <span className="ml-auto text-[9px] font-mono-label font-bold text-[#9C8F84] bg-[#EADFC9]/30 px-1.5 py-0.5 rounded-sm">BETA</span>
            </div>
          </div>

        </div>

        {/* Bottom Menu */}
        <div className="p-3 border-t border-[#EADFC9] space-y-1">
          <Link
            href={isLegacy ? '/dashboard/credits' : hasActivePlan ? '/dashboard/credits' : '/dashboard/create?upgrade=1'}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
              pathname === '/dashboard/credits'
                ? 'bg-[#EADFC9] text-[#8C6D4F] font-semibold'
                : 'text-[#6E6259] hover:text-[#2C2621] hover:bg-[#EADFC9]/20'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{isLegacy ? 'Buy credits' : 'Plans'}</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-[#6E6259] hover:text-[#2C2621] hover:bg-[#EADFC9]/20 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Back to site</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
              pathname === '/dashboard/settings'
                ? 'bg-[#EADFC9] text-[#8C6D4F] font-semibold'
                : 'text-[#6E6259] hover:text-[#2C2621] hover:bg-[#EADFC9]/20'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-all cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Header */}
        <header className="h-16 border-b border-[#EADFC9] flex items-center justify-between px-6 bg-white/50 backdrop-blur-md sticky top-0 z-30">

          <div className="text-sm font-bold text-[#2C2621] capitalize font-serif-heading italic">
            {pathname === '/dashboard' ? 'Home' : pathname.split('/').pop()}
          </div>

          <div className="flex items-center gap-4">

            {/* Mail button */}
            <button className="p-2 text-[#6E6259] hover:text-[#2C2621] transition-all cursor-pointer rounded-lg hover:bg-[#EADFC9]/15">
              <Mail className="w-4 h-4" />
            </button>

            {/* Bell button */}
            <button className="relative p-2 text-[#6E6259] hover:text-[#2C2621] transition-all cursor-pointer rounded-lg hover:bg-[#EADFC9]/15">
              <Bell className="w-4 h-4" />
            </button>

            {/* Billing capsule — legacy balance, plan+quota, or a bare Upgrade CTA */}
            {isLegacy ? (
              <Link
                href="/dashboard/credits"
                className="bg-white/60 backdrop-blur-md border border-[#EADFC9] text-[#8C6D4F] text-xs font-bold pl-1 pr-3.5 py-1 rounded-full flex items-center gap-2 hover:bg-white/80 hover:border-[#A88E75]/30 shadow-2xs transition-all"
              >
                <span className="w-6 h-6 rounded-full bg-[#A88E75] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3 h-3 text-white fill-current" />
                </span>
                <span className="tabular-nums">{credits.toLocaleString()}</span>
                <span className="text-[9px] font-mono-label uppercase text-[#8C6D4F]/70 tracking-wider">credits</span>
                <span className="bg-[#A88E75] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-extrabold flex-shrink-0">+</span>
              </Link>
            ) : hasActivePlan ? (
              <Link
                href="/dashboard/credits"
                className="bg-white/60 backdrop-blur-md border border-[#EADFC9] text-[#8C6D4F] text-xs font-bold pl-3 pr-3.5 py-1.5 rounded-full flex items-center gap-2 hover:bg-white/80 hover:border-[#A88E75]/30 shadow-2xs transition-all"
              >
                <span>{getTier(subscription.tier || '')?.name || 'Plan'}</span>
                <span className="text-[9px] font-mono-label uppercase text-[#8C6D4F]/70 tracking-wider">
                  {Math.max(0, quota.videosLimit - quota.videosUsedThisPeriod)} videos left
                </span>
              </Link>
            ) : (
              <Link
                href="/dashboard/create?upgrade=1"
                className="bg-[#A88E75] text-white text-xs font-bold pl-3.5 pr-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#8C7761] shadow-2xs transition-all"
              >
                <span>Upgrade</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* User Avatar */}
            <Link href="/dashboard/settings" className="w-8 h-8 rounded-full bg-[#A88E75] text-white font-bold flex items-center justify-center text-xs shadow-xs hover:opacity-90 transition-all">
              {userInitials}
            </Link>

          </div>

        </header>

        {/* Legacy credit balance banner — shown until the balance drains */}
        {isLegacy && (
          <div className="px-6 py-2 bg-[#EADFC9]/40 border-b border-[#EADFC9] text-center text-xs text-[#6E6259] font-medium">
            You have <span className="font-bold text-[#8C6D4F]">{credits.toLocaleString()}</span> credits left.
            Credits still work — after that, a subscription takes over.
          </div>
        )}

        {/* Children Render */}
        <main className="flex-1 overflow-auto p-6 bg-[#FAF7F2]">
          {children}
        </main>

      </div>

      <Toast />
    </div>
  );
}
