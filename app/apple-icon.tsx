import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          background: 'linear-gradient(to bottom, #122823, #050B0A)',
        }}
      >
        <svg
          width="112"
          height="112"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C5B49F"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Ghost hood */}
          <path d="M6 12C6 7.5 8.5 4 12 4s6 3.5 6 8" />
          <path d="M6 12c-0.5 3 0.5 6 2.5 7.5" />
          <path d="M18 12c0.5 3-0.5 6-2.5 7.5" />
          {/* Wavy bottom border */}
          <path d="M8.5 19.5c1.5 1 4.5 1 6 0" strokeWidth={1} strokeDasharray="2 2" opacity={0.6} />
          {/* Play button */}
          <path d="M10.5 9.5l4 2.5-4 2.5v-5z" fill="#C5B49F" />
          {/* Sparkle */}
          <path
            d="M17.5 2.5l0.6 1 1 0.6-1 0.6-0.6 1-0.6-1-1-0.6 1-0.6z"
            fill="#C5B49F"
            stroke="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
