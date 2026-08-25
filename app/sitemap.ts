import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';
import { useCases } from '@/lib/use-cases';
import { competitorSlugs } from '@/lib/competitors';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.genbyghost.com';

  const coreRoutes = [
    '', '/pricing', '/how-it-works', '/examples', '/blog',
    '/terms', '/privacy',
  ];

  const versusRoutes = competitorSlugs.map(c => `/versus/${c}`);
  const useCaseRoutes = useCases.map(u => `/use-cases/${u.slug}`);
  const blogRoutes = blogPosts.map(p => `/blog/${p.slug}`);

  const allRoutes = [...coreRoutes, ...versusRoutes, ...useCaseRoutes, ...blogRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : route.startsWith('/versus') ? 0.9 : 0.8,
  }));
}
