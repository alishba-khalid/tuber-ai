import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BarChart2, CheckCircle2 } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';

const title = 'Competitor Comparisons — GenByGhost';
const description = 'Compare GenByGhost side-by-side with other AI video tools. See how we stack up on long-form rendering, narration drift, and autopilot publishing.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/comparisons' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/comparisons',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
    { '@type': 'ListItem', position: 2, name: 'Comparisons', item: 'https://www.genbyghost.com/comparisons' },
  ],
};

export default function ComparisonsPage() {
  // Filter for comparison posts
  const comparisonPosts = blogPosts.filter((post) => post.category === 'Comparisons');

  return (
    <main className="min-h-screen bg-[#050B0A] text-slate-100 relative overflow-hidden">
      {/* Background Spotlight / Radial Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5B49F]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center py-12 max-w-3xl mx-auto">
            <div className="badge-indigo inline-flex mb-4">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Side-By-Side Breakdown</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
              GenByGhost vs. The Competitors
            </h1>
            <p className="text-[#8FAAA6] text-lg">
              We analyze how GenByGhost compares to other AI video tools on the capabilities that matter for long-form, faceless YouTube channel owners.
            </p>
          </div>

          {/* Grid of Comparisons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {comparisonPosts.map((post) => {
              // Extract competitor name from title e.g. "GenByGhost vs InVideo AI"
              const compNameMatch = post.title.match(/GenByGhost\s+vs\s+([^:]+)/i);
              const competitorName = compNameMatch ? compNameMatch[1] : 'Competitor';

              return (
                <div
                  key={post.slug}
                  className="bg-[#0A1412] border border-[#122823] hover:border-[#225146] rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge-indigo text-[10px]">Comparison</span>
                      <span className="text-[11px] font-mono-label text-[#527E72]">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold font-serif-heading text-[#ECFDF5] mb-2 group-hover:text-[#C5B49F] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#8FAAA6] leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#122823] flex items-center justify-between">
                    <span className="text-xs text-[#527E72] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#C5B49F]" /> GenByGhost vs {competitorName}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#C5B49F] hover:text-[#ECFDF5] transition-colors"
                    >
                      Read Analysis <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
