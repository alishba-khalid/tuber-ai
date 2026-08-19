import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — TuberAI',
  description: 'Sign in to your TuberAI account and start generating AI-powered YouTube videos.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#6C3DFF]/15 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#00D4FF]/10 blur-[80px]" />
      
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
