'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060B08] px-4 sm:px-6">
      <div className="max-w-md w-full bg-[#0D1410] border border-[#1A241F] rounded-2xl p-8 shadow-xs">
        
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center text-[#060B08]">
              <Sparkles className="w-4 h-4 text-[#060B08]" />
            </div>
            <span className="text-xl font-bold font-serif-heading text-[#EBF5F0]">
              Tuber<span className="text-[#D4AF37]">AI</span>
            </span>
          </Link>
          <h2 className="text-[#060B08]xl font-bold font-serif-heading text-[#EBF5F0]">
            Welcome back
          </h2>
          <p className="text-xs text-[#92A89C] mt-1">
            Log in to manage and generate long-form AI videos
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="text-xs font-mono-label font-bold text-[#92A89C] block mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#0D1410] border border-[#1A241F] rounded-xl px-4 py-2.5 text-sm text-[#EBF5F0] placeholder-[#A1A1AA] focus:outline-none focus:border-[#283830]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono-label font-bold text-[#92A89C]">
                PASSWORD
              </label>
              <Link href="#" className="text-[11px] text-[#D4AF37] font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0D1410] border border-[#1A241F] rounded-xl px-4 py-2.5 text-sm text-[#EBF5F0] placeholder-[#A1A1AA] focus:outline-none focus:border-[#283830]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-indigo-pill justify-center text-sm py-2.5 rounded-xl font-bold mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1A241F]"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0D1410] px-3 text-[#5F7368] font-medium">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#0D1410] border border-[#1A241F] hover:border-[#283830] rounded-xl py-2.5 text-sm font-semibold text-[#EBF5F0] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.466 0-6.277-2.85-6.277-6.36 0-3.51 2.811-6.358 6.277-6.358 1.584 0 3.018.59 4.114 1.564l3.078-3.078C18.91 1.94 15.823 1 12.24 1 5.923 1 1 5.92 1 12s4.923 11 11.24 11c6.592 0 11.24-4.577 11.24-11 0-.668-.073-1.31-.205-1.922H12.24z"
            />
          </svg>
          Google
        </button>

        {/* Footer Link */}
        <div className="text-center mt-6 text-xs text-[#92A89C]">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-[#D4AF37] font-semibold hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}
