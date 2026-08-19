import { FileText, Mic, Image, Film, Upload } from 'lucide-react';

const stages = [
  {
    num: '01',
    title: 'Stage 1: Script',
    desc: 'You give TuberAI a topic and a target runtime. It writes a chaptered narration script paced to actually fill that length — ten minutes or ten hours — in the tone you choose.',
    icon: FileText,
    colorStyle: {
      cardBg: 'bg-[#EFF6FF]',
      border: 'border-[#BFDBFE] hover:border-[#1D4ED8]',
      headerText: 'text-[#1D4ED8]',
      iconBg: 'bg-[#1D4ED8]/10',
      iconBorder: 'border-[#1D4ED8]/20',
      iconColor: 'text-[#1D4ED8]',
      badgeBg: 'bg-[#1D4ED8]/10',
      badgeBorder: 'border-[#1D4ED8]/20',
      badgeText: 'text-[#1D4ED8]',
    }
  },
  {
    num: '02',
    title: 'Stage 2: Voice',
    desc: 'The script is narrated in a natural preset voice or your own cloned voice. The delivery stays consistent across the whole runtime — no drift between the first chapter and the last.',
    icon: Mic,
    colorStyle: {
      cardBg: 'bg-[#ECFDF5]',
      border: 'border-[#A7F3D0] hover:border-[#047857]',
      headerText: 'text-[#047857]',
      iconBg: 'bg-[#047857]/10',
      iconBorder: 'border-[#047857]/20',
      iconColor: 'text-[#047857]',
      badgeBg: 'bg-[#047857]/10',
      badgeBorder: 'border-[#047857]/20',
      badgeText: 'text-[#047857]',
    }
  },
  {
    num: '03',
    title: 'Stage 3: Visuals',
    desc: 'TuberAI generates scene visuals that match the narration, in the style and aspect ratio you need — widescreen for YouTube, vertical for Shorts.',
    icon: Image,
    colorStyle: {
      cardBg: 'bg-[#FFFBEB]',
      border: 'border-[#FDE68A] hover:border-[#B45309]',
      headerText: 'text-[#B45309]',
      iconBg: 'bg-[#B45309]/10',
      iconBorder: 'border-[#B45309]/20',
      iconColor: 'text-[#B45309]',
      badgeBg: 'bg-[#B45309]/10',
      badgeBorder: 'border-[#B45309]/20',
      badgeText: 'text-[#B45309]',
    }
  },
  {
    num: '04',
    title: 'Stage 4: Render',
    desc: 'Audio and visuals are assembled and encoded into a single finished file, checked all the way to the final second so there are no black frames or silent gaps at the tail.',
    icon: Film,
    colorStyle: {
      cardBg: 'bg-[#FAF5FF]',
      border: 'border-[#E9D5FF] hover:border-[#7C3AED]',
      headerText: 'text-[#7C3AED]',
      iconBg: 'bg-[#7C3AED]/10',
      iconBorder: 'border-[#7C3AED]/20',
      iconColor: 'text-[#7C3AED]',
      badgeBg: 'bg-[#7C3AED]/10',
      badgeBorder: 'border-[#7C3AED]/20',
      badgeText: 'text-[#7C3AED]',
    }
  },
  {
    num: '05',
    title: 'Stage 5: Publish',
    desc: 'Download the finished video with a ready-to-paste title, description, chapter timestamps, tags, and a thumbnail — then upload on your terms.',
    icon: Upload,
    colorStyle: {
      cardBg: 'bg-[#F0FDFA]',
      border: 'border-[#CCFBF1] hover:border-[#0F766E]',
      headerText: 'text-[#0F766E]',
      iconBg: 'bg-[#0F766E]/10',
      iconBorder: 'border-[#0F766E]/20',
      iconColor: 'text-[#0F766E]',
      badgeBg: 'bg-[#0F766E]/10',
      badgeBorder: 'border-[#0F766E]/20',
      badgeText: 'text-[#0F766E]',
    }
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-transparent border-t border-[#9CB4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>THE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-heading text-[#06151A] mb-4">
            How it works
          </h2>
          <p className="text-lg font-semibold text-[#06151A] mb-2">
            One topic in. A finished video out.
          </p>
          <p className="text-sm sm:text-base text-[#425E67]">
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
                className={`p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start rounded-2xl border transition-all shadow-2xs hover:shadow-xs ${style.cardBg} ${style.border}`}
              >
                {/* Number / Icon Badge */}
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-mono-label font-bold text-base flex-shrink-0 ${style.iconBg} ${style.iconBorder} ${style.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Stage Detail */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold font-serif-heading ${style.headerText}`}>
                      {stage.title}
                    </h3>
                    <span className={`text-[10px] font-mono-label font-bold px-2.5 py-1 rounded-full border ${style.badgeBg} ${style.badgeBorder} ${style.badgeText}`}>
                      AUTOMATED
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#425E67] leading-relaxed">
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
