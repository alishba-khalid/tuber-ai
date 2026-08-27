import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/blog-posts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? 'GenByGhost Blog';
  const category = post?.category ?? 'INSIGHTS';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #050B0A 0%, #0A1412 60%, #122823 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 4,
            color: '#C5B49F',
          }}
        >
          {category.toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#ECFDF5',
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontWeight: 700,
            color: '#ECFDF5',
          }}
        >
          <span>GenBy</span>
          <span style={{ color: '#C5B49F' }}>Ghost</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
