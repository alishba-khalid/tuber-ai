import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';

const title = 'Blog — GenByGhost';
const description = 'Tips, tutorials, and insights for AI YouTube content creators.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blog' },
  openGraph: { title, description, type: 'website', url: '/blog' },
  twitter: { card: 'summary_large_image', title, description },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genbyghost.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.genbyghost.com/blog' },
  ],
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center py-16">
            <div className="badge-indigo inline-flex mb-4">
              <span>INSIGHTS</span>
            </div>
            <h1 className="text-4xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
              The <span className="text-[#C5B49F]">GenByGhost</span> Blog
            </h1>
            <p className="text-[#8FAAA6] text-lg max-w-xl mx-auto">
              Tips, tutorials, and insights for AI YouTube content creators.
            </p>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="bg-[#0A1412] border border-[#122823] hover:border-[#225146] rounded-2xl p-6 flex flex-col sm:flex-row gap-6 transition-all shadow-2xs">
                  {/* Accent block */}
                  <div className="w-full sm:w-32 h-24 sm:h-auto rounded-xl bg-[#122823] border border-[#225146]/40 flex-shrink-0" />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge-indigo text-[10px]">{post.category}</span>
                    </div>
                    <h2 className="text-lg font-bold font-serif-heading text-[#ECFDF5] mb-2 hover:text-[#C5B49F] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[#8FAAA6] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-[#527E72]">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-[#527E72] flex-shrink-0 self-center hidden sm:block" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
