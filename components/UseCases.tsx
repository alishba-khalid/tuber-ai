import { Film, Radio, Moon, BookOpen, Mic, GraduationCap } from 'lucide-react';

const niches = [
  {
    title: 'Documentary channels',
    desc: 'History, science, and true-crime deep-dives that run for a full hour — or ten.',
    icon: Film,
    colorStyle: {
      cardBg: 'bg-[#1E1D1A]',
      border: 'border-[#2D2A26] hover:border-blue-500',
      headerText: 'text-[#F9F9F8] group-hover:text-blue-400',
      iconBg: 'bg-blue-500/10',
      iconBorder: 'border-blue-500/20',
      iconColor: 'text-blue-400',
    }
  },
  {
    title: 'Faceless YouTube automation',
    desc: 'Ship narration-led videos on a schedule and bank watch-time, no camera required.',
    icon: Radio,
    colorStyle: {
      cardBg: 'bg-[#1E1D1A]',
      border: 'border-[#2D2A26] hover:border-emerald-500',
      headerText: 'text-[#F9F9F8] group-hover:text-[#141311]merald-400',
      iconBg: 'bg-emerald-500/10',
      iconBorder: 'border-emerald-500/20',
      iconColor: 'text-[#141311]merald-400',
    }
  },
  {
    title: 'Sleep & ambient',
    desc: 'Long, calming narration tuned for the multi-hour sessions this audience loves.',
    icon: Moon,
    colorStyle: {
      cardBg: 'bg-[#1E1D1A]',
      border: 'border-[#2D2A26] hover:border-amber-500',
      headerText: 'text-[#F9F9F8] group-hover:text-amber-400',
      iconBg: 'bg-amber-500/10',
      iconBorder: 'border-amber-500/20',
      iconColor: 'text-amber-400',
    }
  },
  {
    title: 'Lore & history channels',
    desc: 'Rich, chaptered storytelling that keeps viewers watching for hours.',
    icon: BookOpen,
    colorStyle: {
      cardBg: 'bg-[#1E1D1A]',
      border: 'border-[#2D2A26] hover:border-purple-500',
      headerText: 'text-[#F9F9F8] group-hover:text-purple-400',
      iconBg: 'bg-purple-500/10',
      iconBorder: 'border-purple-500/20',
      iconColor: 'text-purple-400',
    }
  },
  {
    title: 'Audiobooks & podcasts',
    desc: 'Turn a full-length script into consistent narration in your own cloned voice.',
    icon: Mic,
    colorStyle: {
      cardBg: 'bg-[#1E1D1A]',
      border: 'border-[#2D2A26] hover:border-rose-500',
      headerText: 'text-[#F9F9F8] group-hover:text-rose-400',
      iconBg: 'bg-rose-500/10',
      iconBorder: 'border-rose-500/20',
      iconColor: 'text-rose-400',
    }
  },
  {
    title: 'Educators & courses',
    desc: 'Explainers and lessons with a scene image for every point you make.',
    icon: GraduationCap,
    colorStyle: {
      cardBg: 'bg-[#1E1D1A]',
      border: 'border-[#2D2A26] hover:border-teal-500',
      headerText: 'text-[#F9F9F8] group-hover:text-teal-400',
      iconBg: 'bg-teal-500/10',
      iconBorder: 'border-teal-500/20',
      iconColor: 'text-teal-400',
    }
  },
];

export default function UseCases() {
  return (
    <section className="py-20 bg-transparent border-y border-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>WHO IT'S FOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-heading text-[#F9F9F8] mb-4">
            Built for long-form, faceless channels
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#A19E95]">
            The niches where hours of watch time turn into real revenue — the ones short-video tools can't serve.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map((niche) => {
            const Icon = niche.icon;
            const style = niche.colorStyle;
            return (
              <div
                key={niche.title}
                className={`p-7 flex flex-col justify-between rounded-2xl border transition-all shadow-2xs hover:shadow-xs group ${style.cardBg} ${style.border}`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 transition-all ${style.iconBg} ${style.iconBorder} ${style.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-xl font-bold font-serif-heading mb-2 transition-colors ${style.headerText}`}>
                    {niche.title}
                  </h3>
                  <p className="text-sm text-[#A19E95] leading-relaxed">
                    {niche.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
