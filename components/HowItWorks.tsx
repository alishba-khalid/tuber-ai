import { FileText, Mic, Image, Film, Upload } from 'lucide-react';

const stages = [
  {
    num: '01',
    title: 'Stage 1: Script',
    desc: 'You give TuberAI a topic and a target runtime. It writes a chaptered narration script paced to actually fill that length — ten minutes or ten hours — in the tone you choose.',
    icon: FileText,
  },
  {
    num: '02',
    title: 'Stage 2: Voice',
    desc: 'The script is narrated in a natural preset voice or your own cloned voice. The delivery stays consistent across the whole runtime — no drift between the first chapter and the last.',
    icon: Mic,
  },
  {
    num: '03',
    title: 'Stage 3: Visuals',
    desc: 'TuberAI generates scene visuals that match the narration, in the style and aspect ratio you need — widescreen for YouTube, vertical for Shorts.',
    icon: Image,
  },
  {
    num: '04',
    title: 'Stage 4: Render',
    desc: 'Audio and visuals are assembled and encoded into a single finished file, checked all the way to the final second so there are no black frames or silent gaps at the tail.',
    icon: Film,
  },
  {
    num: '05',
    title: 'Stage 5: Publish',
    desc: 'Download the finished video with a ready-to-paste title, description, chapter timestamps, tags, and a thumbnail — then upload on your terms.',
    icon: Upload,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-transparent border-t border-[#222B3C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>THE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-[#818CF8]xl md:text-5xl font-bold font-serif-heading text-[#F8FAFC] mb-4">
            How it works
          </h2>
          <p className="text-lg font-semibold text-[#F8FAFC] mb-2">
            One topic in. A finished video out.
          </p>
          <p className="text-sm sm:text-[#818CF8]ase text-[#94A3B8]">
            Five stages run as a single automated job. You bring the idea — TuberAI handles the script, the voice, the visuals, and the render.
          </p>
        </div>

        {/* 5 Stages Grid / Timeline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.num}
                className="card-clean p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start hover:border-[#1E1B4B] transition-all"
              >
                {/* Number / Icon Badge */}
                <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center text-[#818CF8] font-mono-label font-bold text-[#818CF8]ase flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Stage Detail */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold font-serif-heading text-[#F8FAFC]">
                      {stage.title}
                    </h3>
                    <span className="text-xs font-mono-label font-bold text-[#818CF8] bg-[#6366F1]/10 px-2.5 py-1 rounded-full border border-[#6366F1]/20">
                      AUTOMATED
                    </span>
                  </div>
                  <p className="text-sm sm:text-[#818CF8]ase text-[#94A3B8] leading-relaxed">
                    {stage.desc}
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
