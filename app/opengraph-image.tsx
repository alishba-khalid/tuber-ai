import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
            width: 140,
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 32,
            background: 'linear-gradient(to bottom, #122823, #050B0A)',
            border: '1px solid #225146',
            marginBottom: 40,
          }}
        >
          <svg
            width="86"
            height="86"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C5B49F"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 12C6 7.5 8.5 4 12 4s6 3.5 6 8" />
            <path d="M6 12c-0.5 3 0.5 6 2.5 7.5" />
            <path d="M18 12c0.5 3-0.5 6-2.5 7.5" />
            <path d="M10.5 9.5l4 2.5-4 2.5v-5z" fill="#C5B49F" />
            <path
              d="M17.5 2.5l0.6 1 1 0.6-1 0.6-0.6 1-0.6-1-1-0.6 1-0.6z"
              fill="#C5B49F"
              stroke="none"
            />
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 700,
            color: '#ECFDF5',
          }}
        >
          <span>GenBy</span>
          <span style={{ color: '#C5B49F' }}>Ghost</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#8FAAA6',
            marginTop: 20,
          }}
        >
          AI Documentary & Faceless Channel Generator
        </div>
      </div>
    ),
    { ...size }
  );
}
