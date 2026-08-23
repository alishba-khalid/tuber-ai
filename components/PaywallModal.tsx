'use client';

import Link from 'next/link';
import { X, Zap, Check } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { plans } from '@/lib/plans';

export default function PaywallModal() {
  const { paywallOpen, paywallReason, closePaywall } = useAuth();

  if (!paywallOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={closePaywall}
    >
      <div
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-[#EADFC9] rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 pb-6 border-b border-[#EADFC9]/70 bg-gradient-to-b from-[#EAF3EE]/60 to-transparent">
          <button
            onClick={closePaywall}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#82796D] hover:text-[#2C2621] hover:bg-white/60 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-11 h-11 rounded-2xl bg-[#124D3E] flex items-center justify-center text-white shadow-xs mb-4">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-heading text-[#2C2621]">
            You&apos;re out of credits
          </h2>
          <p className="text-sm text-[#6E6259] mt-1.5 max-w-md leading-relaxed">
            {paywallReason
              ? `Buy credits to ${paywallReason} — every plan renews your balance instantly.`
              : 'Buy credits to keep creating — every plan renews your balance instantly.'}
          </p>
        </div>

        {/* Plans */}
        <div className="p-6 sm:p-8 pt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {plans.map((plan) => (
            <Link
              key={plan.id}
              href={`/dashboard/credits?planId=${plan.id}`}
              onClick={closePaywall}
              className={`relative p-3.5 rounded-xl border text-center transition-all cursor-pointer group ${
                plan.popular
                  ? 'border-2 border-[#A88E75] bg-[#A88E75]/10 shadow-xs'
                  : 'border-[#EADFC9] bg-white hover:border-[#C5B49F]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#A88E75] text-white text-[8px] font-mono-label font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Best value
                </div>
              )}
              <div className="text-xs font-bold text-[#2C2621]">{plan.name}</div>
              <div className="text-base font-extrabold text-[#124D3E] mt-1">${plan.price}</div>
              <div className="text-[9px] text-[#82796D] mt-1.5 font-mono-label font-semibold">
                {plan.credits.toLocaleString()} credits
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-[#82796D]">
            <Check className="w-3.5 h-3.5 text-[#124D3E] flex-shrink-0" />
            <span>Credits are only charged after successful generation.</span>
          </div>
          <Link
            href="/dashboard/credits"
            onClick={closePaywall}
            className="bg-[#124D3E] text-white hover:bg-[#0e3c31] text-sm px-6 py-2.5 rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer flex-shrink-0"
          >
            View all plans
          </Link>
        </div>
      </div>
    </div>
  );
}
