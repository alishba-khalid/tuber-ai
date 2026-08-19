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
    <section className="py-20 bg-transparent border-y border-[#1E434F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>WHO IT'S FOR</span>
          </div>
          <h2 className="text-3xl sm:text-[#8FE1F4]xl md:text-5xl font-bold font-serif-heading text-[#E6F3F7] mb-4">
            Built for long-form, faceless channels
          </h2>
          <p className="text-[#8FE1F4]ase sm:text-lg text-[#92B5C0]">
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
                className="card-clean p-7 flex flex-col justify-between group hover:border-[#0F6F8A]"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#8FE1F4]/10 border border-[#8FE1F4]/20 flex items-center justify-center text-[#8FE1F4] mb-5 group-hover:bg-[#8FE1F4] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-serif-heading text-[#E6F3F7] mb-2">
                    {niche.title}
                  </h3>
                  <p className="text-sm text-[#92B5C0] leading-relaxed">
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
