'use client';

// Catches errors thrown from inside the root layout itself (app/layout.tsx)
// — a regular app/error.tsx boundary can't, since it renders *inside* the
// layout it would need to replace. This is what fires if
// assertAuthModeSafe() trips: production is misconfigured and refusing to
// silently serve the mock app. It defines its own <html>/<body> because it
// fully replaces the root layout while active.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050B0A',
          color: '#ECFDF5',
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Site temporarily unavailable
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#8FAAA6', lineHeight: 1.6 }}>
            Something in the deployment configuration needs attention before this site can
            serve real visitors safely. This has already been logged — no action needed here.
          </p>
          {error.digest && (
            <p style={{ fontSize: '0.75rem', color: '#527E72', marginTop: '1rem' }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
