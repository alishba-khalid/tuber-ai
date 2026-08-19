import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — TuberAI',
  description: 'Tips, tutorials, and insights for AI YouTube content creators.',
};

const posts = [
  {
    slug: 'how-to-grow-faceless-youtube-channel',
    title: 'How to Grow a Faceless YouTube Channel to 100K in 6 Months',
    excerpt: 'A practical guide to building a profitable faceless YouTube channel using AI tools — covering niche selection, consistency, and monetization strategies.',
    category: 'Strategy',
    readTime: '8 min read',
    date: 'Aug 15, 2026',
    author: 'TuberAI Team',
    color: 'from-[#6C3DFF]/30 to-[#A855F7]/20',
  },
  {
    slug: 'best-youtube-niches-ai-video',
    title: 'The 7 Most Profitable YouTube Niches for AI Video Creators',
    excerpt: 'Not all niches are created equal. We analyzed CPM rates, viewer retention, and growth potential to identify the best opportunities for AI content creators.',
    category: 'Niches',
    readTime: '6 min read',
    date: 'Aug 10, 2026',
    author: 'TuberAI Team',
    color: 'from-[#00D4FF]/20 to-[#6C3DFF]/20',
  },
  {
    slug: 'long-form-content-youtube-algorithm',
    title: 'Why Long-Form Content Wins the YouTube Algorithm in 2026',
    excerpt: 'YouTube is rewarding watch time more than ever. Here\'s why 1-hour+ videos are outperforming short clips and how to take advantage of this trend.',
    category: 'Algorithm',
    readTime: '10 min read',
    date: 'Aug 5, 2026',
    author: 'TuberAI Team',
    color: 'from-[#EC4899]/20 to-[#A855F7]/20',
  },
  {
    slug: 'ai-voice-vs-real-voice-youtube',
    title: 'AI Voice vs. Human Narration: What Viewers Actually Prefer',
    excerpt: 'We ran a 90-day experiment comparing AI-narrated content versus human-voiced videos on the same channel. The results surprised us.',
    category: 'Research',
    readTime: '5 min read',
    date: 'Jul 28, 2026',
    author: 'TuberAI Team',
    color: 'from-[#10B981]/20 to-[#6C3DFF]/20',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center py-16">
            <h1 className="text-4xl font-black text-[#E6F2F5] mb-4">
              The <span className="gradient-text">TuberAI</span> Blog
            </h1>
            <p className="text-[#486E78] text-lg max-w-xl mx-auto">
              Tips, tutorials, and insights for AI YouTube content creators.
            </p>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="glass-card glass-card-hover p-6 flex flex-col sm:flex-row gap-6">
                  {/* Color bar */}
                  <div className={`w-full sm:w-32 h-24 sm:h-auto rounded-xl bg-gradient-to-br ${post.color} flex-shrink-0`} />
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge badge-purple text-[10px]">{post.category}</span>
                    </div>
                    <h2 className="text-lg font-bold text-[#E6F2F5] mb-2 hover:text-[#A855F7] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[#486E78] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-[#74969E]">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-[#74969E] flex-shrink-0 self-center hidden sm:block" />
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
