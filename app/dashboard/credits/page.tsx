'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Zap, TrendingUp, History, CreditCard } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const plans = [
  { id: 'starter', name: 'Starter', price: 29, credits: 300, desc: '1 hour video' },
  { id: 'plus', name: 'Plus', price: 49, credits: 660, desc: '2 hours video' },
  { id: 'creator', name: 'Creator', price: 89, credits: 1500, desc: '5 hours video' },
  { id: 'studio', name: 'Studio', price: 139, credits: 2700, desc: '9 hours video' },
  { id: 'pro', name: 'Pro', price: 259, credits: 6000, desc: '20 hours video' },
];

export default function CreditsPage() {
  const { user, credits, isMock } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('creator');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'polar'>('polar');
  const [loading, setLoading] = useState(false);
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
        
        if (txs.length === 0) {
          setTransactions([
            { id: '1', desc: 'Setup founding user credits', credits: 300, date: 'Aug 19, 2026', type: 'renewal', amount: 0 }
          ]);
        } else {
          setTransactions(txs);
        }
      }, (err) => {
        console.error("Failed to load transactions from Firestore:", err);
      });

      return () => unsubscribe();
    } else {
      // LocalStorage mock transactions
      const loadLocalTransactions = () => {
        const stored = localStorage.getItem(`genbyghost_transactions_${user.uid}`);
        if (stored) {
          setTransactions(JSON.parse(stored));
        } else {
          const defaultTx = [
            { id: '1', desc: 'Setup founding user credits', credits: 300, date: 'Aug 19, 2026', type: 'renewal', amount: 0 }
          ];
          localStorage.setItem(`genbyghost_transactions_${user.uid}`, JSON.stringify(defaultTx));
          setTransactions(defaultTx);
        }
      };

      loadLocalTransactions();
      
      window.addEventListener('storage', loadLocalTransactions);
      return () => window.removeEventListener('storage', loadLocalTransactions);
    }
  }, [user, isMock]);

  // Handle mock checkout success callback
  useEffect(() => {
    if (!user) return;

    const urlParams = new URLSearchParams(window.location.search);
    const stripeMockSuccess = urlParams.get('mock-success');
    const polarMockSuccess = urlParams.get('polar-mock-success');
    const planId = urlParams.get('planId');

    if ((stripeMockSuccess === 'true' || polarMockSuccess === 'true') && planId) {
      // Clean up URL parameters immediately to prevent duplicate runs
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);

      const plan = plans.find(p => p.id === planId);
      if (!plan) return;

      const processMockPayment = async () => {
        const addedCredits = plan.credits;
        const newCredits = credits + addedCredits;
        const providerName = stripeMockSuccess === 'true' ? 'Stripe' : 'Polar';

        const newTx = {
          id: 'mock-tx-' + Date.now(),
          desc: `Upgrade to ${plan.name} Plan (Mock ${providerName})`,
          credits: addedCredits,
          amount: plan.price,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          createdAt: new Date().toISOString(),
          type: 'purchase'
        };

        if (!isMock && db) {
          try {
            // Write directly to Firestore
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
              credits: newCredits,
              updatedAt: new Date().toISOString()
            });

            const txRef = doc(collection(db, 'users', user.uid, 'transactions'), newTx.id);
            await setDoc(txRef, newTx);
          } catch (err) {
            console.error("Failed to update Firestore for mock success:", err);
          }
        } else {
          // Write to LocalStorage
          localStorage.setItem(`genbyghost_credits_${user.uid}`, newCredits.toString());
          const stored = localStorage.getItem(`genbyghost_transactions_${user.uid}`);
          const currentTxs = stored ? JSON.parse(stored) : [];
          const updatedTxs = [newTx, ...currentTxs];
          localStorage.setItem(`genbyghost_transactions_${user.uid}`, JSON.stringify(updatedTxs));
          
          // Trigger storage event to sync state
          window.dispatchEvent(new Event('storage'));
        }
      };

      processMockPayment();
    }
  }, [user, credits, isMock]);

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    const endpoint = paymentMethod === 'stripe' ? '/api/checkout' : '/api/checkout/polar';

    try {
      const res = await fetch(endpoint, {
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
        window.location.href = data.url; // Redirect to checkout
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
              Founding member tier — active balance
            </div>
          </div>
          <div className="sm:text-right">
            <div className="text-[10px] font-mono-label text-[#527E72] uppercase">Active Plan</div>
            <div className="text-lg font-bold font-serif-heading text-[#ECFDF5]">Free Tier</div>
            <div className="text-xs text-[#C5B49F] font-semibold mt-0.5">300 free setup credits</div>
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
        <h2 className="text-lg font-bold font-serif-heading text-[#ECFDF5] mb-4">Choose a Plan to Upgrade</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                selectedPlan === plan.id
                  ? 'border-2 border-[#C5B49F] bg-[#C5B49F]/10'
                  : 'border-[#122823] hover:border-[#225146] bg-[#0A1412]'
              }`}
            >
              <div className="text-sm font-bold text-[#ECFDF5]">{plan.name}</div>
              <div className="text-base font-extrabold text-[#C5B49F] mt-1">${plan.price}</div>
              <div className="text-[10px] text-[#527E72] mt-2 font-mono-label font-semibold">
                {plan.credits.toLocaleString()} Credits
              </div>
              <div className="text-[9px] text-[#527E72] mt-0.5 italic">
                {plan.desc}
              </div>
            </button>
          ))}
        </div>


        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-indigo-pill text-sm px-6 py-3 flex items-center gap-2 justify-center w-full sm:w-auto cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          {loading ? 'Redirecting...' : `Upgrade to ${plans.find(p => p.id === selectedPlan)?.name} Plan`}
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-[#0A1412] border border-[#122823] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-[#C5B49F]" />
          Credit History
        </h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-2 border-b border-[#122823] last:border-0">
              <div>
                <div className="text-sm font-medium text-[#ECFDF5]">{tx.desc}</div>
                <div className="text-xs text-[#527E72]">{tx.date}</div>
              </div>
              <span className={`text-sm font-bold text-emerald-400`}>
                +{tx.credits}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
