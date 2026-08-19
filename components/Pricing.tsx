import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 29,
    savings: '',
    credits: 300,
    videos: '1 full 1-hour video',
    rates: '60 min video, 120 min voiceover, 1,000 images, 20 scripts',
    buttonText: 'Get Starter',
    popular: false,
  },
  {
    name: 'Plus',
    price: 49,
    savings: 'Save 11%',
    credits: 660,
    videos: '2 full 1-hour videos',
    rates: '132 min video, 264 min voiceover, 2,200 images, 44 scripts',
    buttonText: 'Get Plus',
    popular: false,
  },
  {
    name: 'Creator',
    price: 89,
    savings: 'Save 21%',
    credits: 1500,
    videos: '5 full 1-hour videos',
    rates: '300 min video, 600 min voiceover, 5,000 images, 100 scripts',
    buttonText: 'Get Creator',
    popular: true,
  },
  {
    name: 'Studio',
    price: 139,
    savings: 'Save 28%',
    credits: 2700,
    videos: '9 full 1-hour videos',
    rates: '540 min video, 1,080 min voiceover, 9,000 images, 180 scripts',
    buttonText: 'Get Studio',
    popular: false,
  },
  {
    name: 'Pro',
    price: 259,
    savings: 'Save 38%',
    credits: 6000,
    videos: '20 full 1-hour videos',
    rates: '1,200 min video, 2,400 min voiceover, 20,000 images, 400 scripts',
    buttonText: 'Get Pro',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-transparent border-t border-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="badge-indigo mb-4">
            <span>PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-[#E28C38]xl md:text-5xl font-bold font-serif-heading text-[#F9F9F8] mb-4">
            Founding pricing — locked in while we're in beta
          </h2>
          <p className="text-[#E28C38]ase sm:text-lg text-[#A19E95] leading-relaxed mb-6">
            A full video every month, from $29/mo. One finished 1-hour video — voice and visuals included. Or pour the same $29/mo into 1,000 images, or 120 minutes of voiceover, or 20 full scripts.
          </p>

          <div className="bg-[#1E1D1A] border border-[#2D2A26] p-4 rounded-xl text-xs sm:text-sm text-[#A19E95] inline-block shadow-2xs">
            <span className="font-semibold text-[#F9F9F8]">The old way:</span> $300–$1,000 per video with a freelance team. TuberAI does the whole thing for a few dollars — while you sleep.
          </div>
        </div>

        {/* 5 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-[#1E1D1A] border-2 border-[#0F6F8A] shadow-md'
                  : 'bg-[#1E1D1A] border border-[#2D2A26] shadow-2xs hover:border-[#423E37]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E28C38] text-white text-[10px] font-mono-label font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  BEST VALUE
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2 mt-1">
                  <h3 className="text-lg font-bold font-serif-heading text-[#F9F9F8]">
                    {plan.name}
                  </h3>
                  {plan.savings && (
                    <span className="text-[10px] font-mono-label font-semibold text-[#E28C38] bg-[#E28C38]/10 px-2 py-0.5 rounded border border-[#E28C38]/20">
                      {plan.savings}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold font-serif-heading text-[#F9F9F8]">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-[#6E6B65]"> / month</span>
                </div>

                <div className="space-y-3 text-xs text-[#A19E95] border-t border-[#2D2A26] pt-4 mb-6">
                  <div className="flex items-center gap-2 font-semibold text-[#F9F9F8]">
                    <Check className="w-3.5 h-3.5 text-[#E28C38]" />
                    <span>{plan.credits.toLocaleString()} monthly credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E28C38]" />
                    <span>{plan.videos}</span>
                  </div>
                  <div className="text-[11px] text-[#6E6B65] leading-relaxed pt-1">
                    Equivalent: {plan.rates}
                  </div>
                </div>
              </div>

              <Link
                href="/auth/signup"
                className={`w-full text-center text-xs py-3 rounded-full font-semibold transition-all ${
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
