import { Film, Radio, Moon, BookOpen, Mic, GraduationCap } from 'lucide-react';

const niches = [
  {
    title: 'Documentary channels',
    desc: 'History, science, and true-crime deep-dives that run for a full hour — or ten.',
    icon: Film,
  },
  {
    title: 'Faceless YouTube automation',
    desc: 'Ship narration-led videos on a schedule and bank watch-time, no camera required.',
    icon: Radio,
  },
  {
    title: 'Sleep & ambient',
    desc: 'Long, calming narration tuned for the multi-hour sessions this audience loves.',
    icon: Moon,
  },
  {
    title: 'Lore & history channels',
    desc: 'Rich, chaptered storytelling that keeps viewers watching for hours.',
    icon: BookOpen,
  },
  {
    title: 'Audiobooks & podcasts',
    desc: 'Turn a full-length script into consistent narration in your own cloned voice.',
    icon: Mic,
  },
  {
    title: 'Educators & courses',
    desc: 'Explainers and lessons with a scene image for every point you make.',
    icon: GraduationCap,
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
            Built for long-form, faceless channels
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#8FAAA6]">
            The niches where hours of watch time turn into real revenue — the ones short-video tools can't serve.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map((niche) => {
            const Icon = niche.icon;
            return (
              <div
                key={niche.title}
                className="p-7 flex flex-col justify-between rounded-2xl border border-[#122823] hover:border-[#C5B49F] bg-[#0A1412] hover:shadow-[0_0_20px_rgba(197, 180, 159,0.05)] transition-all duration-300 group"
              >
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
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
