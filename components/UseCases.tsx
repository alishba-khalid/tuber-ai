import Link from 'next/link';
import { Film, Landmark, Moon, GraduationCap, BookAudio, Ghost, ArrowRight } from 'lucide-react';

interface NicheItem {
  title: string;
  desc: string;
  icon: typeof Film;
  href?: string;
}

const niches: NicheItem[] = [
  {
    title: 'Documentary & true crime',
    desc: 'A researched, chaptered narrative that holds together for sixty minutes or six hours. Structure first, then narration, then the visuals to match.',
    icon: Film,
    href: '/use-cases/generate-automated-documentaries-with-ai',
  },
  {
    title: 'History & mythology',
    desc: 'Empires, forgotten wars, folklore. Dense subjects that need a script which actually keeps the timeline straight across twelve chapters.',
    icon: Landmark,
    href: '/use-cases/faceless-history-video-generator',
  },
  {
    title: 'Sleep & ambient',
    desc: 'Unhurried pacing and steady narration for the eight-hour uploads this audience leaves playing overnight.',
    icon: Moon,
  },
  {
    title: 'Explainers & education',
    desc: 'A generated scene for every idea, so a forty-minute lesson never sits on one static slide while the narrator keeps talking.',
    icon: GraduationCap,
    href: '/use-cases/best-ai-tool-for-long-form-youtube-videos',
  },
  {
    title: 'Audiobook & narration channels',
    desc: 'Hand it a manuscript or an outline and get narration that sounds like the same reader in chapter one and chapter thirty.',
    icon: BookAudio,
    href: '/use-cases/automated-book-summary-videos',
  },
  {
    title: 'Faceless channel operators',
    desc: 'No camera, no microphone, no editor, no upload day. Set the topic and the schedule.',
    icon: Ghost,
    href: '/use-cases/automated-faceless-channel-ideas',
  },
];

export default function UseCases() {
  return (
    <section className="py-20 bg-transparent border-y border-[#122823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>WHO IT'S FOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
            AI YouTube Automation for Faceless Channels
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#8FAAA6]">
            Long-form is where YouTube actually pays. These are the formats where one upload can hold an audience for an hour or more — and the ones GenByGhost was built around.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map((niche) => {
            const Icon = niche.icon;
            const CardContent = (
              <>
                <div>
                  <div className="w-10 h-10 rounded-xl border border-[#C5B49F]/20 bg-[#C5B49F]/15 text-[#C5B49F] flex items-center justify-center mb-5 group-hover:bg-[#C5B49F] group-hover:text-[#030706] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-serif-heading mb-2 text-[#ECFDF5] group-hover:text-[#C5B49F] transition-colors">
                    {niche.title}
                  </h3>
                  <p className="text-sm text-[#8FAAA6] leading-relaxed">
                    {niche.desc}
                  </p>
                </div>
                {niche.href && (
                  <div className="pt-4 mt-6 border-t border-[#122823] flex items-center justify-between text-xs text-[#527E72] group-hover:text-[#C5B49F] transition-colors">
                    <span className="font-mono-label">Explore use case</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </>
            );

            if (niche.href) {
              return (
                <Link
                  key={niche.title}
                  href={niche.href}
                  className="p-7 flex flex-col justify-between rounded-2xl border border-[#122823] hover:border-[#C5B49F] bg-[#0A1412] hover:shadow-[0_0_20px_rgba(197,180,159,0.05)] transition-all duration-300 group cursor-pointer block"
                >
                  {CardContent}
                </Link>
              );
            }

            return (
              <div
                key={niche.title}
                className="p-7 flex flex-col justify-between rounded-2xl border border-[#122823] bg-[#0A1412] transition-all duration-300 group"
              >
                {CardContent}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

