'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Github, User, Check } from 'lucide-react';

const passwordRequirements = [
  { label: 'At least 8 characters', check: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', check: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', check: (p: string) => /[0-9]/.test(p) },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
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
        <h1 className="text-2xl font-bold text-white">Create your account</h1>
        <p className="text-[#94A3B8] text-sm mt-1">Start generating videos in minutes</p>

        {/* Free plan badge */}
        <div className="inline-flex items-center gap-2 badge badge-purple mt-3">
          <Check className="w-3 h-3" />
          <span>Free to start — no credit card required</span>
        </div>
      </div>

      {/* Social login */}
      <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] text-white text-sm font-medium transition-all mb-6">
        <Github className="w-4 h-4" />
        Continue with GitHub
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
        <span className="text-xs text-[#64748B]">or sign up with email</span>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
              className="input-field pl-10"
              required
            />
          </div>
        </div>

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
          <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Create a strong password"
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

          {/* Password requirements */}
          {password && (
            <div className="mt-2 space-y-1">
              {passwordRequirements.map(req => (
                <div key={req.label} className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${req.check(password) ? 'bg-green-500' : 'bg-[rgba(255,255,255,0.1)]'}`}>
                    {req.check(password) && <Check className="w-2 h-2 text-white" />}
                  </div>
                  <span className={`text-xs ${req.check(password) ? 'text-green-400' : 'text-[#64748B]'}`}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => setAgreed(!agreed)}
            className={`w-4 h-4 rounded border mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${
              agreed ? 'bg-[#6C3DFF] border-[#6C3DFF]' : 'border-[rgba(255,255,255,0.2)] bg-transparent'
            }`}
          >
            {agreed && <Check className="w-2.5 h-2.5 text-white" />}
          </button>
          <label className="text-xs text-[#64748B] leading-relaxed cursor-pointer" onClick={() => setAgreed(!agreed)}>
            I agree to TuberAI's{' '}
            <Link href="/terms" className="text-[#A855F7] hover:text-[#6C3DFF]">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-[#A855F7] hover:text-[#6C3DFF]">Privacy Policy</Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || !agreed}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-[#64748B] mt-6">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-[#A855F7] hover:text-[#6C3DFF] font-medium transition-colors">
          Sign in →
        </Link>
      </p>
    </div>
  );
}
