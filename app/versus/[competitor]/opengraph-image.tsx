import { ImageResponse } from 'next/og';
import { getCompetitor } from '@/lib/competitors';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor } = await params;
  const comp = getCompetitor(competitor);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050B0A 0%, #0A1412 60%, #122823 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            color: '#C5B49F',
            marginBottom: 24,
          }}
        >
          DIRECT PRODUCT COMPARISON
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 64,
            fontWeight: 700,
            color: '#ECFDF5',
            textAlign: 'center',
          }}
        >
          <span>GenBy</span>
          <span style={{ color: '#C5B49F' }}>Ghost</span>
          <span style={{ margin: '0 24px', color: '#527E72', fontWeight: 400 }}>vs</span>
          <span>{comp.name}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
