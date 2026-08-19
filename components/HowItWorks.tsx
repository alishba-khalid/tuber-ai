import { FileText, Mic, Image, Film, Upload } from 'lucide-react';

const stages = [
  {
    num: '01',
    title: 'Stage 1: Script',
    desc: 'You give TuberAI a topic and a target runtime. It writes a chaptered narration script paced to actually fill that length — ten minutes or ten hours — in the tone you choose.',
    icon: FileText,
    colorStyle: {
      cardBg: 'bg-white',
      border: 'border-[#CADCE0] hover:border-blue-500',
      headerText: 'text-[#0A1C20] group-hover:text-[#E6F2F5]lue-400',
      iconBg: 'bg-blue-500/10',
      iconBorder: 'border-blue-500/20',
      iconColor: 'text-[#E6F2F5]lue-400',
      badgeBg: 'bg-blue-500/10',
      badgeBorder: 'border-blue-500/20',
      badgeText: 'text-[#E6F2F5]lue-400',
    }
  },
  {
    num: '02',
    title: 'Stage 2: Voice',
    desc: 'The script is narrated in a natural preset voice or your own cloned voice. The delivery stays consistent across the whole runtime — no drift between the first chapter and the last.',
    icon: Mic,
    colorStyle: {
      cardBg: 'bg-white',
      border: 'border-[#CADCE0] hover:border-emerald-500',
      headerText: 'text-[#0A1C20] group-hover:text-[#E6F2F5]merald-400',
      iconBg: 'bg-emerald-500/10',
      iconBorder: 'border-emerald-500/20',
      iconColor: 'text-[#E6F2F5]merald-400',
      badgeBg: 'bg-emerald-500/10',
      badgeBorder: 'border-emerald-500/20',
      badgeText: 'text-[#E6F2F5]merald-400',
    }
  },
  {
    num: '03',
    title: 'Stage 3: Visuals',
    desc: 'TuberAI generates scene visuals that match the narration, in the style and aspect ratio you need — widescreen for YouTube, vertical for Shorts.',
    icon: Image,
    colorStyle: {
      cardBg: 'bg-white',
      border: 'border-[#CADCE0] hover:border-amber-500',
      headerText: 'text-[#0A1C20] group-hover:text-amber-400',
      iconBg: 'bg-amber-500/10',
      iconBorder: 'border-amber-500/20',
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10',
      badgeBorder: 'border-amber-500/20',
      badgeText: 'text-amber-400',
    }
  },
  {
    num: '04',
    title: 'Stage 4: Render',
    desc: 'Audio and visuals are assembled and encoded into a single finished file, checked all the way to the final second so there are no black frames or silent gaps at the tail.',
    icon: Film,
    colorStyle: {
      cardBg: 'bg-white',
      border: 'border-[#CADCE0] hover:border-purple-500',
      headerText: 'text-[#0A1C20] group-hover:text-purple-400',
      iconBg: 'bg-purple-500/10',
      iconBorder: 'border-purple-500/20',
      iconColor: 'text-purple-400',
      badgeBg: 'bg-purple-500/10',
      badgeBorder: 'border-purple-500/20',
      badgeText: 'text-purple-400',
    }
  },
  {
    num: '05',
    title: 'Stage 5: Publish',
    desc: 'Download the finished video with a ready-to-paste title, description, chapter timestamps, tags, and a thumbnail — then upload on your terms.',
    icon: Upload,
    colorStyle: {
      cardBg: 'bg-white',
      border: 'border-[#CADCE0] hover:border-teal-500',
      headerText: 'text-[#0A1C20] group-hover:text-teal-400',
      iconBg: 'bg-teal-500/10',
      iconBorder: 'border-teal-500/20',
      iconColor: 'text-teal-400',
      badgeBg: 'bg-teal-500/10',
      badgeBorder: 'border-teal-500/20',
      badgeText: 'text-teal-400',
    }
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-transparent border-t border-[#CADCE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>THE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-whitexl font-bold font-serif-heading text-[#0A1C20] mb-4">
            How it works
          </h2>
          <p className="text-lg font-semibold text-[#0A1C20] mb-2">
            One topic in. A finished video out.
          </p>
          <p className="text-sm sm:text-[#E6F2F5]ase text-[#486E78]">
            Five stages run as a single automated job. You bring the idea — TuberAI handles the script, the voice, the visuals, and the render.
          </p>
        </div>

        {/* 5 Stages Grid / Timeline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const style = stage.colorStyle;
            return (
              <div
                key={stage.num}
                className={`p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start rounded-2xl border transition-all shadow-2xs hover:shadow-xs group ${style.cardBg} ${style.border}`}
              >
                {/* Number / Icon Badge */}
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-mono-label font-bold text-[#E6F2F5]ase flex-shrink-0 ${style.iconBg} ${style.iconBorder} ${style.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Stage Detail */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold font-serif-heading transition-colors ${style.headerText}`}>
                      {stage.title}
                    </h3>
                    <span className={`text-[10px] font-mono-label font-bold px-2.5 py-1 rounded-full border ${style.badgeBg} ${style.badgeBorder} ${style.badgeText}`}>
                      AUTOMATED
                    </span>
                  </div>
                  <p className="text-sm sm:text-[#E6F2F5]ase text-[#486E78] leading-relaxed">
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
