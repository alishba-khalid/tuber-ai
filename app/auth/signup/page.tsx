'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { useAuth } from '@/components/AuthProvider';
import { Sparkles } from 'lucide-react';
import LogoIcon from '@/components/LogoIcon';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signupMockUser } = useAuth();
  const router = useRouter();

  // Mock Google Account selector states
  const [showMockGoogle, setShowMockGoogle] = useState(false);
  const [customMockEmail, setCustomMockEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signupMockUser(email);
      }
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    if (isFirebaseConfigured) {
      setLoading(true);
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        router.push('/dashboard');
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Google sign-up failed.');
      } finally {
        setLoading(false);
      }
    } else {
      setShowMockGoogle(true);
    }
  };

  const handleMockGoogleSubmit = async (selectedEmail: string) => {
    if (!selectedEmail) return;
    setLoading(true);
    setShowMockGoogle(false);
    try {
      await signupMockUser(selectedEmail);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google sign-up failed.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 sm:px-6">
      <div className="max-w-md w-full bg-[#0A1412] border border-[#122823] rounded-2xl p-8 shadow-xl shadow-emerald-950/20">
        
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <LogoIcon />
            <span className="text-xl font-bold font-serif-heading text-[#ECFDF5]">
              GenBy<span className="text-[#C5B49F]">Ghost</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold font-serif-heading text-[#ECFDF5]">
            Create your account
          </h2>
          <p className="text-xs text-[#8FAAA6] mt-1">
            Buy credits and start generating in minutes
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800 text-red-400 rounded-lg text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Email & Password Signup Form */}
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label className="text-xs font-mono-label font-bold text-[#8FAAA6] block mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#0A1412] border border-[#122823] rounded-xl px-4 py-2.5 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none focus:border-[#225146]"
            />
          </div>

          <div>
            <label className="text-xs font-mono-label font-bold text-[#8FAAA6] block mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0A1412] border border-[#122823] rounded-xl px-4 py-2.5 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none focus:border-[#225146]"
            />
          </div>

          <div>
            <label className="text-xs font-mono-label font-bold text-[#8FAAA6] block mb-1">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0A1412] border border-[#122823] rounded-xl px-4 py-2.5 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none focus:border-[#225146]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-indigo-pill justify-center text-sm py-2.5 rounded-xl font-bold mt-2 cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#122823]"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0A1412] px-3 text-[#527E72] font-medium">Or sign up with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#0A1412] border border-[#122823] hover:border-[#225146] hover:bg-[#122823]/50 rounded-xl py-2.5 text-sm font-semibold text-[#ECFDF5] transition-all cursor-pointer"
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
        <div className="text-center mt-6 text-xs text-[#8FAAA6]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#C5B49F] font-semibold hover:underline">
            Log in
          </Link>
        </div>

      </div>

      {/* Mock Google Account Selector Overlay Modal */}
      {showMockGoogle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white text-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-6 transform scale-98 transition-all">
            
            {/* Google Logo & Title */}
            <div className="flex flex-col items-center text-center">
              <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <h2 className="text-lg font-bold text-slate-800">Choose an account</h2>
              <p className="text-xs text-slate-500 mt-1">to continue to <span className="font-semibold text-emerald-800">GenByGhost (Mock Mode)</span></p>
            </div>

            {/* List of mock profiles */}
            <div className="space-y-2">
              {[
                { name: 'John Doe', email: 'john.doe@gmail.com', avatar: 'JD' },
                { name: 'Jane Smith', email: 'jane.smith@gmail.com', avatar: 'JS' },
                { name: 'Alex Rivers', email: 'alex.rivers@gmail.com', avatar: 'AR' },
              ].map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleMockGoogleSubmit(acc.email)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 text-left transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 group-hover:bg-slate-200">
                    {acc.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800">{acc.name}</div>
                    <div className="text-xs text-slate-500 truncate">{acc.email}</div>
                  </div>
                </button>
              ))}

              {/* Custom textbox input option */}
              {!showCustomInput ? (
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="w-full text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 py-2 cursor-pointer"
                >
                  + Use another account
                </button>
              ) : (
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={customMockEmail}
                    onChange={(e) => setCustomMockEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-800"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCustomInput(false)}
                      className="flex-1 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleMockGoogleSubmit(customMockEmail)}
                      disabled={!customMockEmail.includes('@')}
                      className="flex-1 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl cursor-pointer"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cancel selector */}
            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setShowMockGoogle(false);
                  setShowCustomInput(false);
                }}
                className="text-xs text-slate-400 hover:text-slate-500 cursor-pointer"
              >
                Cancel Sign-In
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

