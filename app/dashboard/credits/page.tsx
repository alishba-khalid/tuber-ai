'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Zap, History } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { plans } from '@/lib/plans';

export default function CreditsPage() {
  const { user, credits, isMock } = useAuth();
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);

  // Load transaction history
  useEffect(() => {
    if (!user) return;

    if (!isMock && db) {
      const q = query(
        collection(db, 'users', user.uid, 'transactions'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const txs: any[] = [];
        snapshot.forEach((doc) => {
          txs.push({ id: doc.id, ...doc.data() });
        });
        setTransactions(txs);
      }, (err) => {
        console.error("Failed to load transactions from Firestore:", err);
      });

      return () => unsubscribe();
    } else {
      // LocalStorage mock transactions
      const loadLocalTransactions = () => {
        const stored = localStorage.getItem(`genbyghost_transactions_${user.uid}`);
        setTransactions(stored ? JSON.parse(stored) : []);
      };

      loadLocalTransactions();

      window.addEventListener('storage', loadLocalTransactions);
      return () => window.removeEventListener('storage', loadLocalTransactions);
    }
  }, [user, isMock]);

  const handleCheckout = async (planId: string) => {
    if (!user) return;
    setProcessingPlanId(planId);
    setError('');

    try {
      const res = await fetch('/api/checkout/polar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          userId: user.uid,
          email: user.email,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url); // Redirect to Polar checkout
      } else {
        setError(data.error || 'Failed to initialize checkout.');
        setProcessingPlanId(null);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl text-slate-100">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif-heading text-[#ECFDF5]">Credits & Billing</h1>
        <p className="text-[#8FAAA6] text-sm mt-0.5">Manage your video generation credits and top up your account balance</p>
      </div>

      {/* Balance Card */}
      <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#8FAAA6] text-xs font-mono-label mb-1">
              <Zap className="w-4 h-4 text-[#C5B49F]" />
              CURRENT BALANCE
            </div>
            <div className="text-3xl font-bold font-serif-heading text-[#ECFDF5]">{credits}</div>
            <div className="text-xs text-[#527E72] mt-2">
              {credits > 0 ? 'Active balance — ready to generate' : 'No credits yet — buy a plan to get started'}
            </div>
          </div>
          <div className="sm:text-right">
            <div className="text-[10px] font-mono-label text-[#527E72] uppercase">Billing model</div>
            <div className="text-lg font-bold font-serif-heading text-[#ECFDF5]">Pay as you go</div>
            <div className="text-xs text-[#C5B49F] font-semibold mt-0.5">No subscription, no free trial</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-400 rounded-lg text-xs font-medium">
          {error}
        </div>
      )}

      {/* Upgrade / Top-up Option */}
      <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-lg font-bold font-serif-heading text-[#ECFDF5] mb-1">Choose a Plan to Upgrade</h2>
        <p className="text-xs text-[#527E72] mb-4">Click a plan to check out securely via Polar.</p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {plans.map((plan) => {
            const isProcessing = processingPlanId === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => handleCheckout(plan.id)}
                disabled={processingPlanId !== null}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer disabled:cursor-not-allowed ${
                  isProcessing
                    ? 'border-2 border-[#C5B49F] bg-[#C5B49F]/10'
                    : 'border-[#122823] hover:border-[#225146] bg-[#0A1412] disabled:opacity-50'
                }`}
              >
                <div className="text-sm font-bold text-[#ECFDF5]">{plan.name}</div>
                <div className="text-base font-extrabold text-[#C5B49F] mt-1">${plan.price}</div>
                <div className="text-[10px] text-[#527E72] mt-2 font-mono-label font-semibold">
                  {plan.credits.toLocaleString()} Credits
                </div>
                <div className="text-[9px] text-[#527E72] mt-0.5 italic">
                  {isProcessing ? 'Redirecting…' : plan.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-[#C5B49F]" />
          Credit History
        </h2>
        {transactions.length === 0 ? (
          <p className="text-xs text-[#527E72]">No transactions yet — buy a plan above to get started.</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-[#122823] last:border-0">
                <div>
                  <div className="text-sm font-medium text-[#ECFDF5]">{tx.desc}</div>
                  <div className="text-xs text-[#527E72]">{tx.date}</div>
                </div>
                <span className="text-sm font-bold text-emerald-400">
                  +{tx.credits}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
