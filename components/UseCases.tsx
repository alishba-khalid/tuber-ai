import { Film, Radio, Moon, BookOpen, Mic, GraduationCap } from 'lucide-react';

const niches = [
  {
    title: 'Documentary channels',
    desc: 'History, science, and true-crime deep-dives that run for a full hour — or ten.',
    icon: Film,
    colorStyle: {
      cardBg: 'bg-[#EFF6FF]',
      border: 'border-[#BFDBFE] hover:border-[#1D4ED8]',
      headerText: 'text-[#1D4ED8]',
      iconBg: 'bg-[#1D4ED8]/10',
      iconBorder: 'border-[#1D4ED8]/20',
      iconColor: 'text-[#1D4ED8]',
    }
  },
  {
    title: 'Faceless YouTube automation',
    desc: 'Ship narration-led videos on a schedule and bank watch-time, no camera required.',
    icon: Radio,
    colorStyle: {
      cardBg: 'bg-[#ECFDF5]',
      border: 'border-[#A7F3D0] hover:border-[#047857]',
      headerText: 'text-[#047857]',
      iconBg: 'bg-[#047857]/10',
      iconBorder: 'border-[#047857]/20',
      iconColor: 'text-[#047857]',
    }
  },
  {
    title: 'Sleep & ambient',
    desc: 'Long, calming narration tuned for the multi-hour sessions this audience loves.',
    icon: Moon,
    colorStyle: {
      cardBg: 'bg-[#FFFBEB]',
      border: 'border-[#FDE68A] hover:border-[#B45309]',
      headerText: 'text-[#B45309]',
      iconBg: 'bg-[#B45309]/10',
      iconBorder: 'border-[#B45309]/20',
      iconColor: 'text-[#B45309]',
    }
  },
  {
    title: 'Lore & history channels',
    desc: 'Rich, chaptered storytelling that keeps viewers watching for hours.',
    icon: BookOpen,
    colorStyle: {
      cardBg: 'bg-[#FAF5FF]',
      border: 'border-[#E9D5FF] hover:border-[#7C3AED]',
      headerText: 'text-[#7C3AED]',
      iconBg: 'bg-[#7C3AED]/10',
      iconBorder: 'border-[#7C3AED]/20',
      iconColor: 'text-[#7C3AED]',
    }
  },
  {
    title: 'Audiobooks & podcasts',
    desc: 'Turn a full-length script into consistent narration in your own cloned voice.',
    icon: Mic,
    colorStyle: {
      cardBg: 'bg-[#FFF1F2]',
      border: 'border-[#FECDD3] hover:border-[#BE123C]',
      headerText: 'text-[#BE123C]',
      iconBg: 'bg-[#BE123C]/10',
      iconBorder: 'border-[#BE123C]/20',
      iconColor: 'text-[#BE123C]',
    }
  },
  {
    title: 'Educators & courses',
    desc: 'Explainers and lessons with a scene image for every point you make.',
    icon: GraduationCap,
    colorStyle: {
      cardBg: 'bg-[#F0FDFA]',
      border: 'border-[#CCFBF1] hover:border-[#0F766E]',
      headerText: 'text-[#0F766E]',
      iconBg: 'bg-[#0F766E]/10',
      iconBorder: 'border-[#0F766E]/20',
      iconColor: 'text-[#0F766E]',
    }
  },
];

export default function UseCases() {
  return (
    <section className="py-20 bg-transparent border-y border-[#9CB4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>WHO IT'S FOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-heading text-[#06151A] mb-4">
            Built for long-form, faceless channels
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#425E67]">
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
                className={`p-7 flex flex-col justify-between rounded-2xl border transition-all shadow-2xs hover:shadow-xs ${style.cardBg} ${style.border}`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 transition-colors ${style.iconBg} ${style.iconBorder} ${style.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-xl font-bold font-serif-heading mb-2 ${style.headerText}`}>
                    {niche.title}
                  </h3>
                  <p className="text-sm text-[#425E67] leading-relaxed">
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
