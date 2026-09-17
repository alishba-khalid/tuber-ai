'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { Zap, History, ArrowRight, Sparkles } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { hasLegacyCreditsClient } from '@/lib/flags';
import { getTier } from '@/lib/plans';

export default function CreditsPage() {
  const { user, credits, subscription, quota, isMock } = useAuth();
  const isLegacy = hasLegacyCreditsClient(credits);
  const hasActivePlan = subscription.status === 'active';
  const tier = hasActivePlan ? getTier(subscription.tier || '') : undefined;
  const [transactions, setTransactions] = useState<any[]>([]);

  // Load transaction history (legacy-only concept — not shown otherwise)
  useEffect(() => {
    if (!user || !isLegacy) return;

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
      const loadLocalTransactions = () => {
        const stored = localStorage.getItem(`genbyghost_transactions_${user.uid}`);
        setTransactions(stored ? JSON.parse(stored) : []);
      };

      loadLocalTransactions();

      window.addEventListener('storage', loadLocalTransactions);
      return () => window.removeEventListener('storage', loadLocalTransactions);
    }
  }, [user, isMock, isLegacy]);

  return (
    <div className="space-y-6 max-w-4xl text-slate-100">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif-heading text-[#ECFDF5]">
          {isLegacy ? 'Credits & Billing' : 'Billing'}
        </h1>
        <p className="text-[#8FAAA6] text-sm mt-0.5">
          {isLegacy ? 'Your remaining credit balance and subscription plan' : 'Your subscription plan'}
        </p>
      </div>

      {/* Legacy balance card */}
      {isLegacy && (
        <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 shadow-2xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[#8FAAA6] text-xs font-mono-label mb-1">
                <Zap className="w-4 h-4 text-[#C5B49F]" />
                LEGACY CREDIT BALANCE
              </div>
              <div className="text-3xl font-bold font-serif-heading text-[#ECFDF5]">{credits}</div>
              <div className="text-xs text-[#527E72] mt-2">
                Credits still work — they spend down first, before your subscription quota.
              </div>
            </div>
            <Link
              href="/dashboard/create?upgrade=1"
              className="bg-[#C5B49F] text-[#0A1412] hover:bg-[#d8c8b3] text-sm px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer flex-shrink-0"
            >
              View subscription plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Plan card — shown whenever there's an active subscription,
          regardless of legacy balance */}
      {hasActivePlan ? (
        <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[#8FAAA6] text-xs font-mono-label mb-1">
                <Sparkles className="w-4 h-4 text-[#C5B49F]" />
                YOUR PLAN
              </div>
              <div className="text-3xl font-bold font-serif-heading text-[#ECFDF5]">{tier?.name || 'Subscribed'}</div>
              <div className="text-xs text-[#527E72] mt-2">
                {Math.max(0, quota.videosLimit - quota.videosUsedThisPeriod)} of {quota.videosLimit} videos left this month
                {subscription.currentPeriodEnd && (
                  <> · renews {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                )}
              </div>
            </div>
            <Link
              href="/dashboard/create?upgrade=1"
              className="border border-[#225146] text-[#ECFDF5] hover:bg-[#122823]/50 text-sm px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer flex-shrink-0"
            >
              Change plan
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : !isLegacy ? (
        <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 shadow-2xs text-center">
          <p className="text-sm text-[#8FAAA6] mb-4">You don&apos;t have an active plan yet.</p>
          <Link
            href="/dashboard/create?upgrade=1"
            className="bg-[#C5B49F] text-[#0A1412] hover:bg-[#d8c8b3] text-sm px-6 py-2.5 rounded-full font-bold transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
          >
            View plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : null}

      {/* Transaction history — legacy concept only */}
      {isLegacy && (
        <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 shadow-2xs">
          <h2 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-2">
            <History className="w-4 h-4 text-[#C5B49F]" />
            Credit History
          </h2>
          {transactions.length === 0 ? (
            <p className="text-xs text-[#527E72]">No transactions yet.</p>
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
      )}

    </div>
  );
}
