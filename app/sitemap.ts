import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://genbyghost.com';

  const competitors = [
    'dreamtuber', 'autoshorts', 'invideo', 'pictory', 'fliki', 
    'designs', 'veed', 'capcut', 'descript', 'kapwing', 
    'simplified', 'heygen', 'synthesia', 'elai', 'colossyan', 
    'deepbrain', 'runway'
  ];

  const useCases = [
    'faceless-history-video-generator',
    'automated-book-summary-videos',
    'best-ai-tool-for-long-form-youtube-videos',
    'how-to-create-a-faceless-history-channel',
    'generate-automated-documentaries-with-ai',
    'automated-faceless-channel-ideas',
    'scary-stories-video-generator',
    'luxury-lifestyle-shorts-generator',
    'automated-news-video-creator',
    'youtube-automation-script-writer'
  ];

  const coreRoutes = [
    '', '/pricing', '/how-it-works', '/examples', '/blog',
    '/terms', '/privacy', '/auth/login', '/auth/signup',
  ];

  const versusRoutes = competitors.map(c => `/versus/${c}`);
  const useCaseRoutes = useCases.map(u => `/use-cases/${u}`);
  const blogRoutes = blogPosts.map(p => `/blog/${p.slug}`);

  const allRoutes = [...coreRoutes, ...versusRoutes, ...useCaseRoutes, ...blogRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : route.startsWith('/versus') ? 0.9 : 0.8,
  }));
}
