import Link from 'next/link';
import { Check, X } from 'lucide-react';

const versusLinks = [
  { slug: 'invideo', name: 'InVideo AI' },
  { slug: 'pictory', name: 'Pictory' },
  { slug: 'fliki', name: 'Fliki' },
  { slug: 'autoshorts', name: 'AutoShorts.ai' },
];

const comparisons = [
  {
    feature: 'Past the 50-minute mark',
    tuber: 'Renders to ten hours in one job',
    others: 'Hard cap, or splits into segments',
  },
  {
    feature: 'The voice at hour three',
    tuber: 'Same pitch and pace as minute one',
    others: 'Audible drift after ~30 minutes',
  },
  {
    feature: 'Visual variety over 400 scenes',
    tuber: 'A generated scene per script beat',
    others: 'Looping stock or repeated B-roll',
  },
  {
    feature: 'Illustrated Book Export',
    tuber: 'Print-ready illustrated PDF & EPUB novel export',
    others: 'Not supported',
  },
  {
    feature: 'Getting it onto YouTube',
    tuber: 'Chapters, description, and tags generated',
    others: 'Export the file and do it yourself',
  },
  {
    feature: 'What you keep',
    tuber: 'The finished file, yours to use',
    others: 'Often locked to the platform',
  },
];

export default function Comparison() {
  return (
    <section className="py-20 bg-transparent border-t border-[#122823]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-indigo mb-4">
            <span>SIDE BY SIDE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
            Where AI Video Tools Break at Length
          </h2>
          <p className="text-sm sm:text-base text-[#8FAAA6] leading-relaxed">
            Almost any tool can produce two minutes. The interesting question is what happens at minute fifty-one, and at hour three. Here is where the seams usually show.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#0A1412] border border-[#122823] rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-transparent border-b border-[#122823]">
                  <th className="py-4 px-6 text-xs font-mono-label font-bold text-[#527E72] uppercase">
                    Capability
                  </th>
                  <th className="py-4 px-6 text-sm font-bold font-serif-heading text-[#C5B49F] bg-[#C5B49F]/10 w-1/3 border-x border-[#122823]">
                    GenByGhost
                  </th>
                  <th className="py-4 px-6 text-xs font-mono-label font-bold text-[#527E72] uppercase w-1/3">
                    Other AI Video Tools
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#122823]">
                {comparisons.map((item) => (
                  <tr key={item.feature} className="hover:bg-[#122823]/20 transition-colors">
                    <td className="py-5 px-6 font-semibold text-sm text-[#ECFDF5]">
                      {item.feature}
                    </td>
                    <td className="py-5 px-6 text-sm font-medium text-[#C5B49F] bg-[#C5B49F]/5 border-x border-[#122823]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C5B49F] flex-shrink-0" />
                        <span>{item.tuber}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm text-[#8FAAA6]">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-500/80 flex-shrink-0" />
                        <span>{item.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed comparison links */}
        <div className="mt-8 text-center text-sm text-[#8FAAA6]">
          Read the full breakdown:{' '}
          {versusLinks.map((v, i) => (
            <span key={v.slug}>
              <Link href={`/versus/${v.slug}`} className="font-semibold text-[#C5B49F] hover:text-[#ECFDF5] transition-colors">
                GenByGhost vs {v.name}
              </Link>
              {i < versusLinks.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
