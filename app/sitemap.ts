import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';
import { useCases } from '@/lib/use-cases';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.genbyghost.com';

  const coreRoutes = [
    '',
    '/pricing',
    '/how-it-works',
    '/examples',
    '/blog',
    '/comparisons',
    '/ai-book-generator',
    '/terms',
    '/privacy',
  ];

  const useCaseRoutes = useCases.map((u) => `/use-cases/${u.slug}`);
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);

  // Combine core routes, use cases, and blog posts
  const allRoutes = [...coreRoutes, ...useCaseRoutes, ...blogRoutes];

  // Return sitemap entries excluding any anchor tags (#) or auth/dashboard subpages
  return allRoutes
    .filter((route) => !route.includes('#') && !route.startsWith('/dashboard') && !route.startsWith('/auth'))
    .map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: route === '' ? 1.0 : 0.8,
    }));
}
