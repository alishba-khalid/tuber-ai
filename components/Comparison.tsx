import { Check, X } from 'lucide-react';

const comparisons = [
  {
    feature: 'Max Video Length',
    tuber: 'Up to 10 hours in a single job',
    others: '10 to 50 minutes maximum',
  },
  {
    feature: 'Visual Sourcing',
    tuber: 'Script-matched scene visuals for every paragraph',
    others: 'Auto-selected visuals or generic stock loops',
  },
  {
    feature: 'Voice Consistency',
    tuber: 'Zero voice drift or pitch shifts across full 10h runtime',
    others: 'Tuned for short clips; drifts over 30 mins',
  },
  {
    feature: 'Illustrated Book Export',
    tuber: 'Print-ready illustrated PDF & EPUB novel export',
    others: 'Not supported',
  },
  {
    feature: 'YouTube Metadata & Thumbnails',
    tuber: 'Auto-generated titles, timestamps, descriptions, & cover art',
    others: 'Video output only',
  },
];

export default function Comparison() {
  return (
    <section className="py-20 bg-transparent border-t border-[#9CB4BD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>COMPARISON</span>
          </div>
          <h2 className="text-3xl sm:text-[#0F6F8A]xl md:text-5xl font-bold font-serif-heading text-[#06151A] mb-4">
            TuberAI vs. Long-Form AI Alternatives
          </h2>
          <p className="text-[#0F6F8A]ase sm:text-lg text-[#425E67]">
            How we compare to other YouTube automation tools. While others stop at under an hour, TuberAI is built for true multi-hour automation.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-[#9CB4BD] rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-transparent border-b border-[#9CB4BD]">
                  <th className="py-4 px-6 text-xs font-mono-label font-bold text-[#68858E] uppercase">
                    Capability
                  </th>
                  <th className="py-4 px-6 text-sm font-bold font-serif-heading text-[#0F6F8A] bg-[#0F6F8A]/10/60 w-1/3 border-x border-[#9CB4BD]">
                    TuberAI
                  </th>
                  <th className="py-4 px-6 text-xs font-mono-label font-bold text-[#68858E] uppercase w-1/3">
                    Other AI Video Tools
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#9CB4BD]">
                {comparisons.map((item) => (
                  <tr key={item.feature} className="hover:bg-transparent/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-sm text-[#06151A]">
                      {item.feature}
                    </td>
                    <td className="py-5 px-6 text-sm font-medium text-[#0F6F8A] bg-[#0F6F8A]/10/20 border-x border-[#9CB4BD]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0F6F8A] flex-shrink-0" />
                        <span>{item.tuber}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm text-[#68858E]">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-[#991B1B] flex-shrink-0" />
                        <span>{item.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
