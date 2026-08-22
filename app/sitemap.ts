import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with custom domain later if changed
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tuber-ai.vercel.app';
  
  const routes = ['', '/pricing', '/auth/login', '/auth/signup'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
