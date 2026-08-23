import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          background: 'linear-gradient(to bottom, #122823, #050B0A)',
        }}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C5B49F"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Ghost hood */}
          <path d="M6 12C6 7.5 8.5 4 12 4s6 3.5 6 8" />
          <path d="M6 12c-0.5 3 0.5 6 2.5 7.5" />
          <path d="M18 12c0.5 3-0.5 6-2.5 7.5" />
          {/* Play button */}
          <path d="M10.5 9.5l4 2.5-4 2.5v-5z" fill="#C5B49F" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
