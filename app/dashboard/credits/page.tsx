import Link from 'next/link';
import { Zap, TrendingUp, ArrowRight, CreditCard, Plus, History } from 'lucide-react';

const transactions = [
  { id: 1, desc: 'Full Video: Roman Empire Documentary', credits: -405, date: 'Aug 18, 2026', type: 'usage' },
  { id: 2, desc: 'Monthly Renewal — Creator Plan', credits: +1500, date: 'Aug 15, 2026', type: 'renewal' },
  { id: 3, desc: 'Full Video: Amazon Sleep Story (8hrs)', credits: -2400, date: 'Aug 12, 2026', type: 'usage' },
  { id: 4, desc: 'Failed Render Refund', credits: +300, date: 'Aug 10, 2026', type: 'refund' },
  { id: 5, desc: 'Voiceover: Podcast Episode #12', credits: -75, date: 'Aug 8, 2026', type: 'usage' },
  { id: 6, desc: 'Monthly Renewal — Creator Plan', credits: +1500, date: 'Jul 15, 2026', type: 'renewal' },
];

const plans = [
  { name: 'Starter', price: 20, credits: 300 },
  { name: 'Plus', price: 39, credits: 660 },
  { name: 'Creator', price: 79, credits: 1500, current: true },
  { name: 'Studio', price: 129, credits: 2700 },
  { name: 'Pro', price: 249, credits: 6000 },
];

export default function CreditsPage() {
  const balance = 840;
  const monthly = 1500;
  const pct = (balance / monthly) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Credits</h1>
        <p className="text-[#94A3B8] text-sm mt-0.5">Manage your credit balance and subscription plan</p>
      </div>

      {/* Balance card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#6C3DFF]/20 to-[#A855F7]/10 border border-[#6C3DFF]/30 p-6">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#6C3DFF]/10 blur-[60px]" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-[#94A3B8] text-sm mb-1">
                <Zap className="w-4 h-4 text-[#A855F7]" />
                Current Balance
              </div>
              <div className="text-5xl font-black text-white">{balance.toLocaleString()}</div>
              <div className="text-[#94A3B8] text-sm mt-1">of {monthly.toLocaleString()} monthly credits</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#64748B]">Plan</div>
              <div className="text-lg font-bold text-white">Creator</div>
              <div className="text-xs text-[#A855F7]">$79/month</div>
            </div>
          </div>

          {/* Progress */}
          <div className="progress-bar h-3 mb-3">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-[#64748B]">
            <span>{balance} remaining</span>
            <span>{monthly - balance} used this month</span>
          </div>

          {/* Renewal note */}
          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
            <span className="text-xs text-[#64748B]">🔄 Credits renew Sep 15, 2026</span>
            <span className="text-xs text-[#64748B]">Credits don't roll over</span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Used This Month', value: '660', icon: TrendingUp, color: '#6C3DFF' },
          { label: 'Videos Generated', value: '8', icon: Zap, color: '#A855F7' },
          { label: 'Hours of Video', value: '12h', icon: Zap, color: '#00D4FF' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-[#64748B] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Upgrade plan */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-4">Change Plan</h2>
        <div className="grid grid-cols-5 gap-2">
          {plans.map((plan) => (
            <button
              key={plan.name}
              className={`p-3 rounded-xl border text-center transition-all ${
                plan.current
                  ? 'border-[#6C3DFF] bg-[#6C3DFF]/15'
                  : 'border-[rgba(255,255,255,0.08)] hover:border-[#6C3DFF]/40'
              }`}
            >
              {plan.current && (
                <div className="text-[8px] font-bold text-[#A855F7] mb-1">CURRENT</div>
              )}
              <div className={`text-sm font-bold ${plan.current ? 'text-white' : 'text-[#94A3B8]'}`}>{plan.name}</div>
              <div className="text-[10px] text-[#64748B]">${plan.price}/mo</div>
              <div className="text-[10px] text-[#A855F7] font-medium">{plan.credits.toLocaleString()} cr</div>
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upgrade Plan
          </button>
          <button className="btn-secondary px-5 py-2.5 text-sm">
            Manage Billing
          </button>
        </div>
      </div>

      {/* Transaction history */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-[#A855F7]" />
            Credit History
          </h2>
        </div>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0">
              <div>
                <div className="text-sm text-white">{tx.desc}</div>
                <div className="text-xs text-[#64748B]">{tx.date}</div>
              </div>
              <span className={`text-sm font-bold ${tx.credits > 0 ? 'text-green-400' : 'text-[#94A3B8]'}`}>
                {tx.credits > 0 ? '+' : ''}{tx.credits.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
