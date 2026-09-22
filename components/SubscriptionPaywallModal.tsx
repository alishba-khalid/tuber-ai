'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Check, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { tiers } from '@/lib/plans';
import { track } from '@/lib/analytics';
import { showToast } from '@/lib/toast';
import { hasLegacyCreditsClient } from '@/lib/flags';
import { useApiErrorHandler } from '@/lib/handleApiError';
import Modal from '@/components/Modal';

// "You've never subscribed" vs "your plan is out of room this period" —
// purely which headline/copy this modal shows. app/dashboard/credits/page.tsx
// derives it from account state, not from an API error code (a 402 redirects
// there with ?reason= instead of opening this modal directly — see
// lib/handleApiError.ts).
export type PaywallMode = 'subscribe' | 'upgrade';

interface SubscriptionPaywallModalProps {
  mode: PaywallMode;
  topic: string;
  onClose: () => void;
}

function truncate(text: string, max: number) {
  const trimmed = text.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max).trimEnd()}…` : trimmed;
}

export default function SubscriptionPaywallModal({ mode, topic, onClose }: SubscriptionPaywallModalProps) {
  const { user, isMock, credits, subscription, quota } = useAuth();
  const router = useRouter();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const titleId = useId();
  // No onPaywall here — this *is* the paywall. A 402 from checkout would just
  // land the user on the plans page; 401 still bounces to login with ?next=.
  const { handleApiError } = useApiErrorHandler();

  // "Remaining credits" means different things depending on which billing
  // model the account is on, so show whichever one actually applies.
  const isLegacy = hasLegacyCreditsClient(credits);
  const videosLeft = Math.max(0, quota.videosLimit - quota.videosUsedThisPeriod);
  const balanceLabel = isLegacy
    ? `${credits.toLocaleString()} credits left`
    : subscription.status === 'active'
      ? `${videosLeft} of ${quota.videosLimit} videos left this period`
      : '0 credits · no active plan';

  const handlePlanClick = async (planId: string) => {
    if (!user || processingId) return;
    setProcessingId(planId);
    track('plan_selected', { planId });
    track('checkout_started', { planId });

    // Mock mode has no real Firebase ID token / Polar session to exchange —
    // go straight to the same success redirect the mock checkout route
    // would have returned, matching how the rest of the app's mock mode
    // (AuthProvider, credit checkout) never touches a real backend either.
    if (isMock) {
      router.push(`/dashboard/create?checkout=success&mock_plan=${planId}`);
      return;
    }

    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) {
        await handleApiError(res);
        setProcessingId(null);
        return;
      }

      const data = await res.json();
      if (!data.url) {
        // A 200 with no URL used to leave the button stuck on "Redirecting…"
        // with no explanation — never fail silently here.
        console.error('Checkout returned no URL', data);
        showToast('Checkout could not be opened. Please try again.');
        setProcessingId(null);
        return;
      }
      window.location.assign(data.url);
    } catch (err) {
      await handleApiError(err);
      setProcessingId(null);
    }
  };

  const handleClose = () => {
    track('checkout_cancelled', { via: 'modal_close' });
    onClose();
  };

  const headline =
    mode === 'upgrade'
      ? "You've used this month's quota"
      : 'Start generating your documentary';
  const sub =
    mode === 'upgrade'
      ? 'Upgrade to a higher tier to keep generating this month, or wait for your quota to renew.'
      : 'Subscriptions cover research, scripting, narration, visuals and final render.';

  return (
    <Modal onClose={handleClose} labelledBy={titleId} className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-xl border border-[#EADFC9] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-6 sm:p-8 pb-6 border-b border-[#EADFC9]/70 bg-gradient-to-b from-[#EADFC9]/50 to-transparent">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#82796D] hover:text-[#2C2621] hover:bg-white/60 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {topic.trim() && (
            <p className="text-xs font-mono-label font-semibold text-[#8C6D4F] mb-3">
              Ready to generate: &quot;{truncate(topic, 60)}&quot;
            </p>
          )}

          <div className="w-11 h-11 rounded-2xl bg-[#A88E75] flex items-center justify-center text-[#fff] shadow-xs mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 id={titleId} className="text-xl sm:text-2xl font-bold font-serif-heading text-[#2C2621]">
            {headline}
          </h2>
          <p className="text-sm text-[#6E6259] mt-1.5 max-w-md leading-relaxed">{sub}</p>

          {/* What the account has right now, so the plan choice has context */}
          {user && (
            <div className="mt-3 inline-flex items-center gap-2 bg-white border border-[#EADFC9] rounded-full px-3 py-1.5">
              <Zap className="w-3.5 h-3.5 text-[#A88E75] fill-current" />
              <span className="text-[11px] font-mono-label font-bold text-[#8C6D4F] uppercase tracking-wider">
                Your balance
              </span>
              <span className="text-xs font-bold text-[#2C2621] tabular-nums">{balanceLabel}</span>
            </div>
          )}
        </div>

        {/* Plan cards — Studio (popular) rendered first in DOM order for
            mobile stacking, restored to its normal left-to-right slot on
            desktop via sm:order so tab order still matches columns there. */}
        <div className="p-6 sm:p-8 pt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...tiers].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)).map((tier) => {
            const isProcessing = processingId === tier.id;
            const desktopOrder = tiers.findIndex((t) => t.id === tier.id) + 1;
            return (
              <div
                key={tier.id}
                style={{ '--desktop-order': desktopOrder } as React.CSSProperties}
                className={`relative rounded-2xl border p-5 flex flex-col sm:order-[var(--desktop-order)] ${
                  tier.popular
                    ? 'border-2 border-[#A88E75] bg-[#A88E75]/5 shadow-[0_0_0_4px_rgba(168,142,117,0.12)]'
                    : 'border-[#EADFC9] bg-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A88E75] text-[#fff] text-[9px] font-mono-label font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    Most popular
                  </div>
                )}

                <div className="text-sm font-bold text-[#2C2621]">{tier.name}</div>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-[#8C6D4F]">${tier.monthlyPrice}</span>
                  <span className="text-xs text-[#82796D]">/mo</span>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-[#6E6259] flex-1">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8C6D4F] flex-shrink-0 mt-0.5" />
                    {tier.monthlyCredits.toLocaleString()} credits/mo
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8C6D4F] flex-shrink-0 mt-0.5" />
                    {tier.videosPerMonth} full-length documentaries a month
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#8C6D4F] flex-shrink-0 mt-0.5" />
                    Split credits across shorter videos too
                  </li>
                </ul>

                <button
                  onClick={() => handlePlanClick(tier.id)}
                  disabled={processingId !== null}
                  className={`mt-5 w-full py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                    tier.popular
                      ? 'bg-[#A88E75] text-[#fff] hover:bg-[#8C7761]'
                      : 'bg-[#2C2621] text-[#fff] hover:bg-[#443A30]'
                  }`}
                >
                  {isProcessing ? 'Redirecting…' : `Start with ${tier.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Reassurance row */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-1 text-center">
          <p className="text-[11px] text-[#82796D]">
            Cancel anytime · Your draft is saved · Secure checkout by Polar
          </p>
        </div>
      </div>
    </Modal>
  );
}
