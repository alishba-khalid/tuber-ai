'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Bell, Shield, CreditCard, Mic, Save, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'voice', label: 'Voice Clone', icon: Mic },
];

export default function SettingsPage() {
  const { user, logout, credits } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [channelName, setChannelName] = useState('');
  const [language, setLanguage] = useState('English (US)');
  const [savedMessage, setSavedMessage] = useState('');
  const [notifications, setNotifications] = useState({
    videoComplete: true,
    creditLow: true,
    newFeatures: false,
    marketing: false,
  });

  // Sync profile details with AuthProvider user
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      
      const storedName = localStorage.getItem(`tuber_profile_name_${user.uid}`);
      if (storedName) {
        setName(storedName);
      } else {
        const defaultName = user.email ? user.email.split('@')[0] : 'Creator';
        setName(defaultName.charAt(0).toUpperCase() + defaultName.slice(1));
      }

      const storedChannel = localStorage.getItem(`tuber_profile_channel_${user.uid}`);
      if (storedChannel) {
        setChannelName(storedChannel);
      }

      const storedLang = localStorage.getItem(`tuber_profile_lang_${user.uid}`);
      if (storedLang) {
        setLanguage(storedLang);
      }
      
      const storedNotifications = localStorage.getItem(`tuber_notifications_${user.uid}`);
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    }
  }, [user]);

  const handleSaveProfile = () => {
    if (!user) return;
    localStorage.setItem(`tuber_profile_name_${user.uid}`, name);
    localStorage.setItem(`tuber_profile_channel_${user.uid}`, channelName);
    localStorage.setItem(`tuber_profile_lang_${user.uid}`, language);
    setSavedMessage('Profile settings saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleToggleNotification = (key: string) => {
    if (!user) return;
    const updated = { ...notifications, [key]: !notifications[key as keyof typeof notifications] };
    setNotifications(updated);
    localStorage.setItem(`tuber_notifications_${user.uid}`, JSON.stringify(updated));
  };

  const userInitials = name ? name.slice(0, 2).toUpperCase() : 'US';

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-serif-heading">Settings</h1>
        <p className="text-[#8FAAA6] text-sm mt-0.5 font-mono-label">Manage your account preferences</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="sm:w-48 flex-shrink-0">
          <div className="bg-[#0A1412] border border-[#122823] rounded-xl p-2 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`sidebar-link w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                  activeTab === id 
                    ? 'bg-[#C5B49F]/10 text-[#C5B49F] font-semibold border-l-2 border-[#C5B49F]'
                    : 'text-[#8FAAA6] hover:text-[#ECFDF5] hover:bg-[#122823]/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
            <div className="pt-2 border-t border-[#122823] mt-2">
              <button 
                onClick={logout}
                className="sidebar-link w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#0A1412] border border-[#122823] rounded-xl p-6">
          {savedMessage && (
            <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-400 rounded-xl text-xs text-center font-medium">
              {savedMessage}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white font-serif-heading">Profile Information</h2>
              
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#C5B49F]/15 border border-[#C5B49F]/30 flex items-center justify-center text-xl font-bold text-[#C5B49F]">
                  {userInitials}
                </div>
                <button className="btn-outline-pill text-xs px-4 py-2">Change Photo</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-label font-bold text-[#8FAAA6] mb-1.5">FULL NAME</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#527E72]" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#0A1412] border border-[#122823] rounded-xl pl-10 pr-4 py-2 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none focus:border-[#225146]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-label font-bold text-[#8FAAA6] mb-1.5">EMAIL ADDRESS</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#527E72]" />
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full bg-[#0A1412]/50 border border-[#122823] rounded-xl pl-10 pr-4 py-2 text-sm text-[#527E72] cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-label font-bold text-[#8FAAA6] mb-1.5">YOUTUBE CHANNEL NAME</label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={e => setChannelName(e.target.value)}
                    placeholder="Your YouTube channel name"
                    className="w-full bg-[#0A1412] border border-[#122823] rounded-xl px-4 py-2 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none focus:border-[#225146]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-label font-bold text-[#8FAAA6] mb-1.5">DEFAULT NARRATION LANGUAGE</label>
                  <select 
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="w-full bg-[#0A1412] border border-[#122823] rounded-xl px-4 py-2 text-sm text-[#ECFDF5] focus:outline-none focus:border-[#225146] cursor-pointer"
                  >
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleSaveProfile}
                className="btn-indigo-pill text-xs px-6 py-2.5 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white font-serif-heading">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { key: 'videoComplete', label: 'Video completed', desc: 'Get notified when your video finishes generating' },
                  { key: 'creditLow', label: 'Low credits warning', desc: 'Alert when your credit balance drops below 100' },
                  { key: 'newFeatures', label: 'New features & updates', desc: 'Learn about new TuberAI features' },
                  { key: 'marketing', label: 'Marketing & promotions', desc: 'Receive special offers and promotional emails' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-[#122823] last:border-0">
                    <div>
                      <div className="text-sm font-medium text-white">{label}</div>
                      <div className="text-xs text-[#8FAAA6]">{desc}</div>
                    </div>
                    <button
                      onClick={() => handleToggleNotification(key)}
                      className={`w-10 h-5 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                        notifications[key as keyof typeof notifications] ? 'bg-[#C5B49F]' : 'bg-[#122823]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-all m-0.5 ${
                        notifications[key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white font-serif-heading">Security</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-label font-bold text-[#8FAAA6] mb-1.5">CURRENT PASSWORD</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#0A1412] border border-[#122823] rounded-xl px-4 py-2 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono-label font-bold text-[#8FAAA6] mb-1.5">NEW PASSWORD</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#0A1412] border border-[#122823] rounded-xl px-4 py-2 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono-label font-bold text-[#8FAAA6] mb-1.5">CONFIRM NEW PASSWORD</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#0A1412] border border-[#122823] rounded-xl px-4 py-2 text-sm text-[#ECFDF5] placeholder-[#527E72] focus:outline-none" />
                </div>
                <button className="btn-indigo-pill text-xs px-6 py-2.5 cursor-pointer">Update Password</button>
                
                <div className="pt-6 border-t border-[#122823]">
                  <h3 className="text-sm font-bold text-white mb-3 font-serif-heading">Danger Zone</h3>
                  <button className="px-6 py-2.5 text-xs rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white font-serif-heading">Billing & Plan</h2>
              <div className="bg-[#122823]/30 p-4 border border-[#122823] rounded-xl">
                <div className="flex justify-between mb-1">
                  <span className="text-white font-medium">Founding Membership</span>
                  <span className="text-[#C5B49F] font-bold">Active Balance: {credits} credits</span>
                </div>
                <div className="text-xs text-[#8FAAA6]">Founding Access tier — dynamic reload enabled</div>
              </div>
              <button onClick={() => setActiveTab('billing')} className="btn-outline-pill text-xs px-6 py-2.5 cursor-not-allowed opacity-50">Cancel Membership</button>
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white font-serif-heading">Voice Cloning</h2>
              <div className="bg-[#0A1412]/50 border border-dashed border-[#122823] p-6 text-center rounded-xl">
                <Mic className="w-10 h-10 text-[#527E72] mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2 font-serif-heading">Upload Voice Sample</h3>
                <p className="text-[#8FAAA6] text-xs mb-4">Upload 5-10 minutes of clean audio to clone your voice</p>
                <button className="btn-indigo-pill text-xs px-6 py-2.5 cursor-pointer">Upload Audio File</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
