import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Volume2, Lightbulb } from 'lucide-react';
import { getUseCase } from '@/lib/use-cases';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Fallback for any slug not in lib/use-cases.ts
function formatSlugTitle(slug: string) {
  return slug
    .split('-')
    .map(word => {
      if (word === 'ai') return 'AI';
      if (word === 'youtube') return 'YouTube';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function getNicheName(formattedTitle: string) {
  return formattedTitle
    .replace(' Video Generator', '')
    .replace(' Generator', '')
    .replace(' How To Make ', '')
    .replace(' How To ', '')
    .replace(' With AI', '');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);

  const title = useCase ? `${useCase.title} — GenByGhost` : `${formatSlugTitle(slug)} — GenByGhost`;
  const description = useCase
    ? useCase.metaDescription
    : `Create scripted, narrated videos for the ${getNicheName(formatSlugTitle(slug))} niche with GenByGhost's AI video pipeline.`;

  return {
    title,
    description,
    alternates: { canonical: `/use-cases/${slug}` },
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = getUseCase(slug);

  const formattedTitle = useCase?.title ?? formatSlugTitle(slug);
  const nicheName = useCase?.nicheName ?? getNicheName(formattedTitle);
  const intro = useCase?.intro ?? `Create professional-grade, high-retention videos for the ${nicheName} niche in seconds using advanced artificial intelligence.`;
  const valueProps = useCase?.valueProps ?? [
    { title: 'Automated Scripting', body: `GenByGhost writes context-rich, engaging scripts optimized specifically for YouTube retention rates in the ${nicheName} niche.` },
    { title: 'AI Narration', body: `Pair your ${nicheName} videos with natural-sounding AI voice narration built for long-form storytelling.` },
    { title: 'Autopilot Scheduling', body: 'Generate a batch of videos and sync them directly to upload to your channel on a recurring automated calendar schedule.' },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
      { '@type': 'ListItem', position: 2, name: 'Use Cases', item: 'https://www.genbyghost.com/use-cases' },
      { '@type': 'ListItem', position: 3, name: formattedTitle, item: `https://www.genbyghost.com/use-cases/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#050B0A] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-mono-label text-[#527E72] hover:text-[#ECFDF5] transition-colors">
            &larr; Back to GenByGhost Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#225146]/20 border border-[#225146]/50 text-[#C5B49F] mb-4">
            <Zap className="w-3.5 h-3.5" /> Automated Video Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading text-[#ECFDF5] tracking-tight leading-tight max-w-3xl mx-auto">
            {formattedTitle}
          </h1>
          <p className="mt-4 text-lg text-[#8FAAA6] max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        </div>

        {/* Why it works */}
        {useCase && (
          <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 mb-12">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#C5B49F] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#8FAAA6] leading-relaxed">
                <span className="text-[#ECFDF5] font-semibold">Why this niche works: </span>
                {useCase.whyItWorks}
              </p>
            </div>
          </div>
        )}

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {valueProps.map((vp) => (
            <div key={vp.title} className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6">
              <Volume2 className="w-8 h-8 text-[#C5B49F] mb-4" />
              <h3 className="text-base font-bold text-[#ECFDF5] mb-2">{vp.title}</h3>
              <p className="text-sm text-[#8FAAA6] leading-relaxed">{vp.body}</p>
            </div>
          ))}
        </div>

        {/* Example topics */}
        {useCase && (
          <div className="mb-16">
            <h2 className="text-xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
              {nicheName} video ideas to get started
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {useCase.exampleTopics.map((topic) => (
                <div key={topic} className="bg-[#0A1412] border border-[#122823] rounded-xl p-4 text-sm text-[#8FAAA6]">
                  {topic}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step Production Guide */}
        <div className="bg-[#0A1412] border border-[#122823] rounded-3xl p-8 sm:p-10 mb-16">
          <h2 className="text-2xl font-bold font-serif-heading text-[#ECFDF5] mb-8 text-center">
            How to Make {nicheName} Videos in 4 Simple Steps
          </h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-[#225146]/30 border border-[#225146] text-[#C5B49F] flex items-center justify-center font-bold font-mono-label text-sm">
                1
              </div>
              <div>
                <h3 className="text-base font-bold text-[#ECFDF5] mb-1">Enter Your Video Concept</h3>
                <p className="text-sm text-[#8FAAA6] leading-relaxed">
                  Provide a simple text prompt describing the video topic you want to make{useCase ? ', for example:' : ' (e.g.,'} <i>&ldquo;{useCase?.examplePrompt.replace(/^"|"$/g, '') ?? 'The fall of Constantinople from the perspective of a soldier'}&rdquo;</i>{useCase ? '' : ')'}.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-[#225146]/30 border border-[#225146] text-[#C5B49F] flex items-center justify-center font-bold font-mono-label text-sm">
                2
              </div>
              <div>
                <h3 className="text-base font-bold text-[#ECFDF5] mb-1">Generate Script & Narration</h3>
                <p className="text-sm text-[#8FAAA6] leading-relaxed">
                  GenByGhost generates a formatted chapter script and creates voiceover narration using natural-sounding AI voice models.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-[#225146]/30 border border-[#225146] text-[#C5B49F] flex items-center justify-center font-bold font-mono-label text-sm">
                3
              </div>
              <div>
                <h3 className="text-base font-bold text-[#ECFDF5] mb-1">Verify Visual Assets</h3>
                <p className="text-sm text-[#8FAAA6] leading-relaxed">
                  Review the automatically matched images, cinematic overlays, and word-by-word subtitles. Use our interactive editor to swap clips or adjust timing.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-[#225146]/30 border border-[#225146] text-[#C5B49F] flex items-center justify-center font-bold font-mono-label text-sm">
                4
              </div>
              <div>
                <h3 className="text-base font-bold text-[#ECFDF5] mb-1">Render & Auto-Publish</h3>
                <p className="text-sm text-[#8FAAA6] leading-relaxed">
                  Export the finished video in full HD or toggle our <strong>Channel Autopilot</strong> option to upload the video directly to YouTube.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="text-center bg-radial from-[#122823] to-[#0A1412] border border-[#225146] rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
              Start building your channel today
            </h2>
            <p className="text-[#8FAAA6] text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Create an account on GenByGhost and buy credits to start generating {nicheName.toLowerCase()} videos in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="btn-indigo-pill px-8 py-3 text-sm flex items-center gap-2 w-full sm:w-auto justify-center font-bold">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="text-sm font-semibold text-[#C5B49F] hover:text-[#ECFDF5] transition-colors px-6 py-2.5">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
