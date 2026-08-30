import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Post not found — GenByGhost' };
  }

  return {
    title: `${post.title} — GenByGhost Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const months: Record<string, string> = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  };
  const dateMatch = post.date.match(/^(\w{3})\s+(\d{1,2}),\s+(\d{4})$/);
  const isoDate = dateMatch
    ? `${dateMatch[3]}-${months[dateMatch[1]]}-${dateMatch[2].padStart(2, '0')}`
    : post.date;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [
      `https://www.genbyghost.com/blog/${slug}/opengraph-image`
    ],
    datePublished: isoDate,
    dateModified: '2026-08-30T15:00:00+05:00', // Date of the SEO fix pass
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'GenByGhost',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.genbyghost.com/icon'
      }
    },
    mainEntityOfPage: `https://www.genbyghost.com/blog/${slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.genbyghost.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.genbyghost.com/blog/${slug}` },
    ],
  };

  // Find related articles (same category prioritized, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (a.category !== post.category && b.category === post.category) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-mono-label text-[#527E72] hover:text-[#ECFDF5] transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>

          <span className="badge-indigo text-[10px] mb-4 inline-flex">{post.category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-[#527E72] mb-12">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
          </div>

          <div className="space-y-8">
            {post.content.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-bold text-[#ECFDF5] mb-2">{section.heading}</h2>
                <p className="text-sm text-[#8FAAA6] leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>

          {/* Related Articles Section */}
          <div className="mt-20 pt-10 border-t border-[#122823]">
            <h3 className="text-lg font-bold font-serif-heading text-[#ECFDF5] mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  className="bg-[#0A1412] border border-[#122823] hover:border-[#225146] rounded-xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <span className="text-[10px] font-mono-label font-bold text-[#C5B49F] uppercase tracking-wider block mb-2">
                      {rPost.category}
                    </span>
                    <h4 className="text-sm font-bold font-serif-heading text-[#ECFDF5] line-clamp-2 mb-2">
                      {rPost.title}
                    </h4>
                    <p className="text-xs text-[#8FAAA6] line-clamp-3 mb-4 leading-relaxed">
                      {rPost.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="text-xs font-semibold text-[#C5B49F] hover:text-[#ECFDF5] transition-colors inline-flex items-center gap-1 mt-4"
                  >
                    Read article: {rPost.title.split(':')[0]} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#122823] flex justify-center">
            <Link href="/auth/signup" className="btn-indigo-pill text-sm px-6 py-3">
              Try GenByGhost
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
