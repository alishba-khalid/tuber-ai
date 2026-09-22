'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { tiers } from '@/lib/plans';
import { PLANS_ROUTE, SIGNUP_ROUTE, withNext } from '@/lib/routes';

// Marketing-only copy (savings badge, the two descriptive lines) keyed by
// the same tier id lib/plans.ts uses. name/price/credits/popular come from
// there — this is the only place that duplicated them before, which is what
// let the checkout route 400 on 'plus'/'pro' (ids that existed here but not
// in lib/plans.ts).
const marketingCopy: Record<string, { savings: string; videos: string; rates: string }> = {
  archive: {
    savings: '',
    videos: 'One full-length documentary a month',
    rates: 'or split the credits across three 20-minute deep dives',
  },
  series: {
    savings: 'Save 11%',
    videos: 'Two full-length documentaries a month',
    rates: 'or split the credits across six 20-minute deep dives',
  },
  studio: {
    savings: 'Save 21%',
    videos: 'Five full-length documentaries a month',
    rates: 'or split the credits across fifteen 20-minute deep dives',
  },
  network: {
    savings: 'Save 28%',
    videos: 'Nine full-length documentaries a month',
    rates: 'or split the credits across twenty-seven 20-minute deep dives',
  },
  syndicate: {
    savings: 'Save 38%',
    videos: 'Twenty full-length documentaries a month',
    rates: 'or split the credits across sixty 20-minute deep dives',
  },
};

const plans = tiers.map((tier) => ({
  ...tier,
  ...marketingCopy[tier.id],
  buttonText: `Get ${tier.name}`,
}));

export default function Pricing() {
  const { user } = useAuth();

  // Every button here has to end at a real checkout. Signed in, that's the
  // plans page opened straight onto the plan picker (?plan= opens it). Signed
  // out, it's signup with that same destination carried in ?next=, so the
  // choice survives account creation instead of being dropped on /dashboard.
  const planHref = (planId: string) => {
    const target = `${PLANS_ROUTE}?plan=${encodeURIComponent(planId)}`;
    return user ? target : withNext(SIGNUP_ROUTE, target);
  };

  return (
    <section id="pricing" className="py-20 bg-transparent border-t border-[#122823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge-indigo mb-4">
            <span>PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
            Credits you spend on the work that matters
          </h2>
          <p className="text-sm sm:text-base text-[#8FAAA6] leading-relaxed mb-6">
            Every plan is one credit pool. Spend it on a single full-length video, split it across shorter deep dives, or put it all into narration or visuals — your call, month to month.
          </p>

          <div className="bg-[#0A1412] border border-[#122823] p-4 rounded-xl text-xs sm:text-sm text-[#8FAAA6] inline-block shadow-2xs">
            A freelance team charges <span className="font-semibold text-[#C5B49F]">$300–$1,000</span> for one hour-long video. GenByGhost renders the same thing overnight for a fraction of that.
          </div>
        </div>

        {/* 5 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-[#0A1412] border-2 border-[#C5B49F] shadow-lg shadow-emerald-950/20'
                  : 'bg-[#0A1412] border border-[#122823] shadow-2xs hover:border-[#225146]'
              }`}
            >
              {plan.popular && (
                <div className="pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5B49F] text-[#030706] text-[10px] font-mono-label font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  BEST VALUE
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2 mt-1">
                  <h3 className="text-lg font-bold font-serif-heading text-[#ECFDF5]">
                    {plan.name}
                  </h3>
                  {plan.savings && (
                    <span className="text-[10px] font-mono-label font-semibold text-[#C5B49F] bg-[#C5B49F]/15 px-2 py-0.5 rounded border border-[#C5B49F]/30">
                      {plan.savings}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-extrabold font-serif-heading text-[#ECFDF5]">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-xs text-[#527E72]"> / month</span>
                </div>

                <div className="space-y-3 text-xs text-[#8FAAA6] border-t border-[#122823] pt-4 mb-6">
                  <div className="flex items-center gap-2 font-semibold text-[#ECFDF5]">
                    <Check className="w-3.5 h-3.5 text-[#C5B49F]" />
                    <span>{plan.monthlyCredits.toLocaleString()} monthly credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5B49F]" />
                    <span>{plan.videos}</span>
                  </div>
                  <div className="text-[11px] text-[#527E72] leading-relaxed pt-1">
                    {plan.rates}
                  </div>
                </div>
              </div>

              <Link
                href={planHref(plan.id)}
                className={`relative z-10 w-full text-center text-xs py-3 rounded-full font-semibold transition-all cursor-pointer ${
                  plan.popular
                    ? 'btn-indigo-pill'
                    : 'btn-outline-pill'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
