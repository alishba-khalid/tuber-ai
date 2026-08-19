'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Zap, TrendingUp, History, CreditCard } from 'lucide-react';

const transactions = [
  { id: 1, desc: 'Setup founding user credits', credits: +300, date: 'Aug 19, 2026', type: 'renewal' },
];

const plans = [
  { id: 'starter', name: 'Starter', price: 29, credits: 300, desc: '1 hour video' },
  { id: 'plus', name: 'Plus', price: 49, credits: 660, desc: '2 hours video' },
  { id: 'creator', name: 'Creator', price: 89, credits: 1500, desc: '5 hours video' },
  { id: 'studio', name: 'Studio', price: 139, credits: 2700, desc: '9 hours video' },
  { id: 'pro', name: 'Pro', price: 259, credits: 6000, desc: '20 hours video' },
];

export default function CreditsPage() {
  const { user, credits } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('creator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          userId: user.uid,
          email: user.email,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        setError(data.error || 'Failed to initialize checkout.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif-heading text-[#E6F3F7]">Credits & Billing</h1>
        <p className="text-[#7FA0AB] text-sm mt-0.5">Manage your video generation credits and top up your account balance</p>
      </div>

      {/* Balance Card */}
      <div className="bg-[#0E1B20] border border-[#172B33] rounded-2xl p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#7FA0AB] text-xs font-mono-label mb-1">
              <Zap className="w-4 h-4 text-[#8FE1F4]" />
              CURRENT BALANCE
            </div>
            <div className="text-5xl font-bold font-serif-heading text-[#E6F3F7]">{credits}</div>
            <div className="text-xs text-[#4E6872] mt-2">
              Founding member tier — active balance
            </div>
          </div>
          <div className="sm:text-right">
            <div className="text-[10px] font-mono-label text-[#4E6872] uppercase">Active Plan</div>
            <div className="text-lg font-bold font-serif-heading text-[#E6F3F7]">Free Tier</div>
            <div className="text-xs text-[#8FE1F4] font-semibold mt-0.5">300 free setup credits</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium">
          {error}
        </div>
      )}

      {/* Upgrade / Top-up Option */}
      <div className="bg-[#0E1B20] border border-[#172B33] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-lg font-bold font-serif-heading text-[#E6F3F7] mb-4">Choose a Plan to Upgrade</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                selectedPlan === plan.id
                  ? 'border-2 border-[#1E1B4B] bg-[#8FE1F4]/10'
                  : 'border-[#172B33] hover:border-[#233E4A] bg-[#0E1B20]'
              }`}
            >
              <div className="text-sm font-bold text-[#E6F3F7]">{plan.name}</div>
              <div className="text-[#8FE1F4]ase font-extrabold text-[#8FE1F4] mt-1">${plan.price}</div>
              <div className="text-[10px] text-[#4E6872] mt-2 font-mono-label font-semibold">
                {plan.credits.toLocaleString()} Credits
              </div>
              <div className="text-[9px] text-[#4E6872] mt-0.5 italic">
                {plan.desc}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-indigo-pill text-sm px-6 py-3 flex items-center gap-2 justify-center w-full sm:w-auto"
        >
          <CreditCard className="w-4 h-4" />
          {loading ? 'Redirecting to Stripe...' : `Upgrade to ${plans.find(p => p.id === selectedPlan)?.name} Plan`}
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-[#0E1B20] border border-[#172B33] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-[#8FE1F4]ase font-bold font-serif-heading text-[#E6F3F7] mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-[#8FE1F4]" />
          Credit History
        </h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-2 border-b border-[#0E1B20] last:border-0">
              <div>
                <div className="text-sm font-medium text-[#E6F3F7]">{tx.desc}</div>
                <div className="text-xs text-[#4E6872]">{tx.date}</div>
              </div>
              <span className={`text-sm font-bold text-green-600`}>
                +{tx.credits}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
