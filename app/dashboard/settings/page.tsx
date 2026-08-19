'use client';

import { useState } from 'react';
import { User, Mail, Bell, Shield, CreditCard, Mic, Save, ChevronRight, LogOut } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'voice', label: 'Voice Clone', icon: Mic },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [notifications, setNotifications] = useState({
    videoComplete: true,
    creditLow: true,
    newFeatures: false,
    marketing: false,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-[#94A3B8] text-sm mt-0.5">Manage your account preferences</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="sm:w-48 flex-shrink-0">
          <div className="glass-card p-2 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`sidebar-link w-full ${activeTab === id ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
            <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] mt-2">
              <button className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-400/10">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 glass-card p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Profile Information</h2>
              
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6C3DFF] to-[#A855F7] flex items-center justify-center text-xl font-bold text-white">
                  JD
                </div>
                <button className="btn-secondary px-4 py-2 text-sm">Change Photo</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Channel Name (optional)</label>
                  <input
                    type="text"
                    placeholder="Your YouTube channel name"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Default Language</label>
                  <select className="input-field">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'videoComplete', label: 'Video completed', desc: 'Get notified when your video finishes generating' },
                  { key: 'creditLow', label: 'Low credits warning', desc: 'Alert when your credit balance drops below 100' },
                  { key: 'newFeatures', label: 'New features & updates', desc: 'Learn about new TuberAI features' },
                  { key: 'marketing', label: 'Marketing & promotions', desc: 'Receive special offers and promotional emails' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-[rgba(255,255,255,0.06)] last:border-0">
                    <div>
                      <div className="text-sm font-medium text-white">{label}</div>
                      <div className="text-xs text-[#64748B]">{desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                      className={`w-11 h-6 rounded-full transition-all flex-shrink-0 ${notifications[key as keyof typeof notifications] ? 'bg-[#6C3DFF]' : 'bg-[rgba(255,255,255,0.1)]'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all m-0.5 ${notifications[key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Security</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <button className="btn-primary px-6 py-2.5 text-sm">Update Password</button>
                
                <div className="pt-6 border-t border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-sm font-bold text-white mb-3">Danger Zone</h3>
                  <button className="px-6 py-2.5 text-sm rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Billing</h2>
              <div className="glass-card p-4 bg-[#6C3DFF]/10 border-[#6C3DFF]/30">
                <div className="flex justify-between mb-1">
                  <span className="text-white font-medium">Creator Plan</span>
                  <span className="text-[#A855F7] font-bold">$79/month</span>
                </div>
                <div className="text-xs text-[#64748B]">Next billing date: Sep 15, 2026</div>
              </div>
              <button className="btn-secondary px-6 py-2.5 text-sm">Cancel Subscription</button>
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Voice Cloning</h2>
              <div className="glass-card p-6 bg-[rgba(255,255,255,0.02)] border border-dashed border-[rgba(255,255,255,0.1)] text-center">
                <Mic className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Upload Voice Sample</h3>
                <p className="text-[#64748B] text-sm mb-4">Upload 5-10 minutes of clean audio to clone your voice</p>
                <button className="btn-primary px-6 py-2.5 text-sm">Upload Audio File</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
