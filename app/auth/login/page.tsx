'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Github } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Supabase auth integration
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    window.location.href = '/dashboard';
  };

  return (
    <div className="glass-card p-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C3DFF] to-[#A855F7] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Tuber<span className="gradient-text">AI</span></span>
        </Link>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-[#94A3B8] text-sm mt-1">Sign in to your account to continue</p>
      </div>

      {/* Social login */}
      <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] text-white text-sm font-medium transition-all mb-6">
        <Github className="w-4 h-4" />
        Continue with GitHub
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        <span className="text-xs text-[#64748B]">or continue with email</span>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-[#94A3B8]">Password</label>
            <Link href="/auth/forgot-password" className="text-xs text-[#A855F7] hover:text-[#6C3DFF] transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#94A3B8]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Sign up link */}
      <p className="text-center text-sm text-[#64748B] mt-6">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-[#A855F7] hover:text-[#6C3DFF] font-medium transition-colors">
          Sign up free →
        </Link>
      </p>
    </div>
  );
}
