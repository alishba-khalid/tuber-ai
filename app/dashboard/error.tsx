'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';

// Scoped to everything under /dashboard/layout.tsx — a render crash in a
// dashboard page (GeneratorForm, DashboardShell's children, etc.) is caught
// here instead of escalating to app/global-error.tsx, which replaces the
// ENTIRE page including the sidebar/topbar. Before this existed, that was
// the only boundary above the dashboard, so any such crash looked like the
// whole app going down rather than one page failing.
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard content crashed:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-6">
      <div className="w-12 h-12 rounded-2xl bg-[#EADFC9] flex items-center justify-center text-[#8C6D4F] mb-4">
        <RefreshCw className="w-5 h-5" />
      </div>
      <h1 className="text-lg font-bold font-serif-heading text-[#2C2621] mb-1">
        This page hit a snag
      </h1>
      <p className="text-sm text-[#82796D] max-w-sm mb-5 leading-relaxed">
        Nothing you had filled in was lost. Try again, or head back to your dashboard.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-[#A88E75] text-[#fff] hover:bg-[#8C7761] text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-xs cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="border border-[#EADFC9] text-[#2C2621] hover:bg-[#EADFC9]/25 text-sm font-bold px-5 py-2.5 rounded-full transition-all"
        >
          Back to dashboard
        </Link>
      </div>
      {error.digest && (
        <p className="text-[11px] text-[#9C8F84] mt-4">Reference: {error.digest}</p>
      )}
    </div>
  );
}
