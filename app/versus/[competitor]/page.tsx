import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, Zap, ArrowRight, Award } from 'lucide-react';
import { getCompetitor } from '@/lib/competitors';

interface PageProps {
  params: Promise<{ competitor: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { competitor } = await params;
  const comp = getCompetitor(competitor);
  const title = `GenByGhost vs ${comp.name} — Which AI Video Tool Wins?`;
  const description = `GenByGhost vs ${comp.name}: compare pricing, voice quality, and auto-publishing for long-form YouTube video generation.`;

  return {
    title,
    description,
    alternates: { canonical: `/versus/${competitor.toLowerCase()}` },
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function VersusPage({ params }: PageProps) {
  const { competitor } = await params;
  const comp = getCompetitor(competitor);
  const compKey = competitor.toLowerCase();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
      { '@type': 'ListItem', position: 2, name: `GenByGhost vs ${comp.name}`, item: `https://www.genbyghost.com/versus/${compKey}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#050B0A] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Top Bar */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-mono-label text-[#527E72] hover:text-[#ECFDF5] transition-colors">
            &larr; Back to GenByGhost
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#225146]/20 border border-[#225146]/50 text-[#C5B49F] mb-4">
            <Zap className="w-3.5 h-3.5" /> Direct Product Comparison
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading text-[#ECFDF5] tracking-tight leading-tight">
            GenByGhost <span className="text-[#C5B49F] font-light">vs</span> {comp.name}
          </h1>
          <p className="mt-4 text-lg text-[#8FAAA6] max-w-2xl mx-auto">
            Comparing features, capabilities, and pricing to help you choose the best AI video automation tool for your business.
          </p>
        </div>

        {/* Dynamic Highlight Card */}
        <div className="bg-[#0A1412] border border-[#225146]/30 rounded-3xl p-8 mb-12 shadow-xl">
          <h2 className="text-xl font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C5B49F]" /> Why Creators Choose GenByGhost over {comp.name}
          </h2>
          <p className="text-[#8FAAA6] text-sm leading-relaxed">
            {comp.genByGhostDiff}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border border-[#122823] bg-[#0A1412]/80 rounded-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-3 border-b border-[#122823] bg-[#0A1412] p-4 text-sm font-mono-label font-bold text-[#ECFDF5]">
            <div>Feature</div>
            <div className="text-center text-[#C5B49F]">GenByGhost</div>
            <div className="text-center text-slate-400">{comp.name}</div>
          </div>
          
          <div className="divide-y divide-[#122823]">
            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Autopilot Video Posting</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center"><X className="text-rose-400 w-5 h-5" /></div>
            </div>
            
            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Long-Form Video Support</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center">
                {compKey === "autoshorts" ? <X className="text-rose-400 w-5 h-5" /> : <Check className="text-emerald-400 w-5 h-5" />}
              </div>
            </div>

            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Interactive Visual Timeline</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center">
                {["invideo", "veed", "capcut"].includes(compKey) ? <Check className="text-emerald-400 w-5 h-5" /> : <X className="text-rose-400 w-5 h-5" />}
              </div>
            </div>

            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Voice Synthesis (ElevenLabs)</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center">
                {["fliki", "heygen", "synthesia"].includes(compKey) ? <Check className="text-emerald-400 w-5 h-5" /> : <X className="text-rose-400 w-5 h-5" />}
              </div>
            </div>

            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Pay-As-You-Go, No Subscription</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center"><X className="text-rose-400 w-5 h-5" /></div>
            </div>

            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Starting Price</div>
              <div className="text-center font-bold text-emerald-400">$29/mo (300 credits)</div>
              <div className="text-center text-slate-400">{comp.price}</div>
            </div>
          </div>
        </div>

        {/* Pros & Cons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#0A1412]/50 border border-[#122823] rounded-2xl p-6">
            <h3 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-1.5">
              <Check className="text-emerald-400 w-5 h-5" /> What {comp.name} does well
            </h3>
            <ul className="space-y-2 text-sm text-[#8FAAA6]">
              {comp.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">&bull;</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0A1412]/50 border border-[#122823] rounded-2xl p-6">
            <h3 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-1.5">
              <X className="text-rose-400 w-5 h-5" /> Drawbacks of {comp.name}
            </h3>
            <ul className="space-y-2 text-sm text-[#8FAAA6]">
              {comp.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final CTA Card */}
        <div className="text-center bg-radial from-[#122823] to-[#0A1412] border border-[#225146] rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
              Ready to automate your YouTube channel?
            </h2>
            <p className="text-[#8FAAA6] text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Create your GenByGhost account today. Buy credits and generate your first video in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="btn-indigo-pill px-8 py-3 text-sm flex items-center gap-2 w-full sm:w-auto justify-center font-bold">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="text-sm font-semibold text-[#C5B49F] hover:text-[#ECFDF5] transition-colors px-6 py-2.5">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
