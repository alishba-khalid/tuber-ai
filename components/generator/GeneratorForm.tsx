'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Sparkles, FileText, Mic, Image, Film, Upload,
  Clock, BookOpen, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Draft, DRAFT_STORAGE_KEY, estimatedCreditCost } from '@/lib/generate-gate';
import { track } from '@/lib/analytics';
import { showToast } from '@/lib/toast';
import { activateMockSubscription, runMockGenerateGate } from '@/lib/mock-generate';
import { hasLegacyCreditsClient } from '@/lib/flags';
import { useApiErrorHandler, type PaywallMode } from '@/lib/handleApiError';
import AuthModal from '@/components/AuthModal';
import SubscriptionPaywallModal from '@/components/SubscriptionPaywallModal';

const formats = [
  { id: 'documentary', label: 'Documentary', icon: Film, desc: 'Cinematic narrated documentary' },
  { id: 'explainer', label: 'Explainer', icon: Sparkles, desc: 'Clear educational breakdown' },
  { id: 'sleep-story', label: 'Sleep Story', icon: Clock, desc: 'Calm ambient storytelling' },
  { id: 'true-crime', label: 'True Crime', icon: FileText, desc: 'Gripping crime narrative' },
  { id: 'book-summary', label: 'Book Summary', icon: BookOpen, desc: 'Comprehensive book analysis' },
  { id: 'podcast', label: 'Podcast Style', icon: Mic, desc: 'Conversational deep dive' },
];

const durations = ['10 min', '20 min', '30 min', '45 min', '1 hr', '1.5 hrs', '2 hrs', '3 hrs', '4 hrs', '6 hrs', '8 hrs', '10 hrs'];

const voices = [
  { id: 'marcus', name: 'Marcus', style: 'Deep & authoritative', gender: 'Male' },
  { id: 'aria', name: 'Aria', style: 'Warm & engaging', gender: 'Female' },
  { id: 'james', name: 'James', style: 'Clear & professional', gender: 'Male' },
  { id: 'luna', name: 'Luna', style: 'Soft & calming', gender: 'Female' },
  { id: 'ethan', name: 'Ethan', style: 'Energetic & dynamic', gender: 'Male' },
  { id: 'nova', name: 'Nova', style: 'Crisp & articulate', gender: 'Female' },
];

const aspects = [
  { id: '16:9', label: 'YouTube (16:9)', desc: 'Standard widescreen' },
  { id: '9:16', label: 'Shorts (9:16)', desc: 'Vertical mobile format' },
];

const stages = [
  { icon: FileText, label: 'Script' },
  { icon: Mic, label: 'Voice' },
  { icon: Image, label: 'Visuals' },
  { icon: Film, label: 'Render' },
  { icon: Upload, label: 'Publish' },
];

export default function GeneratorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isMock, credits, subscription, quota, saveProject, registerProject, refreshBillingState } = useAuth();
  const isLegacy = hasLegacyCreditsClient(credits);

  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [format, setFormat] = useState('documentary');
  const [duration, setDuration] = useState('1 hr');
  const [voice, setVoice] = useState('marcus');
  const [aspect, setAspect] = useState('16:9');
  const [includeEbook, setIncludeEbook] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [paywallMode, setPaywallMode] = useState<PaywallMode | null>(null);
  // Every failed API call in this form goes through the shared handler:
  // 401 -> /auth/login?next=..., 402 -> this paywall, anything else -> toast.
  const { handleApiError } = useApiErrorHandler({ onPaywall: setPaywallMode });
  const pendingAutoContinue = useRef(false);
  const generateBtnRef = useRef<HTMLButtonElement>(null);
  const hydratedRef = useRef(false);

  // Deep-link into the relevant section when arriving via a sidebar/dashboard tool
  useEffect(() => {
    const deepLinkStep = searchParams.get('step');
    if (deepLinkStep) {
      const el = document.getElementById(`step-${deepLinkStep}`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = () => ({ format, duration, voice, aspect, includeEbook });

  const applyDraft = (draft: Draft) => {
    setTopic(draft.topic || '');
    setScript(draft.script || '');
    if (draft.settings) {
      setFormat(draft.settings.format ?? 'documentary');
      setDuration(draft.settings.duration ?? '1 hr');
      setVoice(draft.settings.voice ?? 'marcus');
      setAspect(draft.settings.aspect ?? '16:9');
      setIncludeEbook(!!draft.settings.includeEbook);
    }
  };

  const readDraft = async (): Promise<Draft | null> => {
    if (user) {
      if (isMock) {
        const raw = localStorage.getItem(`genbyghost_draft_${user.uid}`);
        return raw ? JSON.parse(raw) : null;
      }
      if (db) {
        const snap = await getDoc(doc(db, 'users', user.uid));
        return snap.exists() ? (snap.data().draft as Draft) ?? null : null;
      }
      return null;
    }
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  };

  const persistDraft = async () => {
    const draft: Draft = { topic, script, settings: settings(), savedAt: new Date().toISOString() };
    if (user) {
      if (isMock) {
        localStorage.setItem(`genbyghost_draft_${user.uid}`, JSON.stringify(draft));
      } else if (isFirebaseConfigured && db) {
        try {
          await setDoc(doc(db, 'users', user.uid), { draft }, { merge: true });
        } catch (e) {
          console.error('Failed to persist draft:', e);
        }
      }
    } else {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }
  };

  // Rehydrate an existing draft once, on first mount, if the form is empty.
  useEffect(() => {
    if (hydratedRef.current) return;
    if (topic || script) return;
    hydratedRef.current = true;
    readDraft().then((draft) => {
      if (draft && (draft.topic || draft.script)) {
        applyDraft(draft);
        showToast('Your draft is back. Pick up where you left off.');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Handle return from checkout.
  useEffect(() => {
    const checkout = searchParams.get('checkout');
    if (!checkout) return;

    const cleanUrl = () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('checkout');
      params.delete('mock_plan');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    };

    if (checkout === 'success') {
      (async () => {
        // Mock mode has no real webhook — activate the plan here instead.
        if (isMock && user) {
          const mockPlan = searchParams.get('mock_plan');
          if (mockPlan) {
            activateMockSubscription(user.uid, mockPlan);
            refreshBillingState();
          }
        }
        track('checkout_completed');
        const draft = await readDraft();
        if (draft) applyDraft(draft);
        showToast('Your draft is back. Pick up where you left off.');
        setTimeout(() => {
          generateBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          generateBtnRef.current?.focus();
        }, 150);
        cleanUrl();
      })();
    } else if (checkout === 'cancelled') {
      track('checkout_cancelled', { via: 'redirect' });
      showToast('Checkout cancelled — your draft is still here.');
      cleanUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // "Upgrade" entry points elsewhere in the dashboard chrome (topbar,
  // sidebar) can't open this component's modal directly — they navigate
  // here with ?upgrade=1 instead, and this opens it on arrival.
  useEffect(() => {
    if (!searchParams.get('upgrade')) return;
    queueMicrotask(() => {
      track('paywall_shown', { reason: 'manual' });
      setPaywallMode('subscribe');
      const params = new URLSearchParams(searchParams.toString());
      params.delete('upgrade');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const estimatedCredits = estimatedCreditCost(duration);

  // A brand-new account has no credits and no subscription. Rather than
  // letting that user fill in the whole form and only discover the paywall
  // on submit (or, worse, see the Generate button sit there disabled with no
  // explanation), say so up front. Anonymous visitors are deliberately not
  // included — they get the auth modal first and their draft is preserved.
  const needsPlan = !!user && !isLegacy && subscription.status !== 'active';
  const outOfQuota =
    !!user &&
    !isLegacy &&
    subscription.status === 'active' &&
    quota.videosUsedThisPeriod >= quota.videosLimit;

  // Gate order (server /api/generate mirrors this exactly): a legacy credit
  // balance > 0 always wins and never touches a modal; everyone else goes
  // through subscription+quota, and any rejection is a modal — never an
  // inline error. Inline errors are reserved for genuine failures (network,
  // 500s), which surface as a toast, not a red box in the form.
  const runServerGate = async () => {
    if (!user) return;
    setIsGenerating(true);

    try {
      if (isMock) {
        const result = runMockGenerateGate(user.uid, estimatedCredits);
        if (!result.ok) {
          const mode: PaywallMode = result.code === 'INSUFFICIENT_CREDITS' ? 'upgrade' : 'subscribe';
          track('paywall_shown', { reason: mode });
          setPaywallMode(mode);
          return;
        }
        const cleanTitle = topic.trim().split(/[.!?\n]/)[0].slice(0, 60) || 'Untitled Video';
        const formattedTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
        await saveProject({
          id: result.projectId,
          title: formattedTitle,
          topic,
          script,
          format: formats.find((f) => f.id === format)?.label || format,
          duration,
          voice: voice.charAt(0).toUpperCase() + voice.slice(1),
          aspect,
          credits: result.mode === 'credits' ? Math.min(credits, estimatedCredits) : 0,
          status: 'queued',
          currentStage: 0,
          stageProgress: 0,
          includeEbook,
          views: '0',
        });
        if (result.mode === 'credits') refreshBillingState();
        track('generation_started');
        router.push(`/dashboard/video/${result.projectId}`);
        return;
      }

      const token = await user.getIdToken();
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ topic, script, settings: settings() }),
      });

      if (!res.ok) {
        await handleApiError(res);
        return;
      }

      const data = await res.json();
      if (data.project) registerProject(data.project);
      track('generation_started');
      router.push(`/dashboard/video/${data.projectId}`);
    } catch (e) {
      await handleApiError(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // After a successful auth-modal login/signup, migrate the anonymous draft
  // and automatically resume the generate flow — no second click needed.
  useEffect(() => {
    if (!user || !pendingAutoContinue.current) return;
    pendingAutoContinue.current = false;

    (async () => {
      const local = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (local) {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
      await persistDraft();
      await runServerGate();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleGenerate = async () => {
    track('generate_clicked');

    if (!user) {
      await persistDraft();
      pendingAutoContinue.current = true;
      setAuthModalOpen(true);
      return;
    }

    await persistDraft();
    await runServerGate();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif-heading text-[#2C2621]">Create New Video</h1>
        <p className="text-[#82796D] text-sm mt-0.5">Configure your AI video generation settings below</p>
      </div>

      {/* Pipeline stages indicator */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center gap-2">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 rounded-full border-2 border-[#EADFC9] bg-white flex items-center justify-center text-[#9C8F84]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] text-[#82796D] mt-1 hidden sm:block font-medium">{s.label}</span>
                </div>
                {i < stages.length - 1 && <div className="h-px flex-1 bg-[#EADFC9]" />}
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-[#82796D] mt-2">These stages run automatically after you hit Generate</p>
      </div>

      {/* Topic input */}
      <div id="step-script" className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs scroll-mt-6">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">1. Your Topic</h2>
        <p className="text-[#82796D] text-xs mb-4">Be specific for best results. Include key themes, angle, or audience.</p>
        <textarea
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder='e.g. "The complete story of the Roman Empire, from its founding to its fall — focusing on the key emperors, battles, and the reasons for collapse. Audience: history enthusiasts."'
          rows={4}
          className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2C2621] placeholder-[#9C8F84] focus:outline-none focus:border-[#A88E75] resize-none"
        />
        <div className="flex justify-between mt-2 text-xs text-[#82796D]">
          <span>💡 More detail = better output</span>
          <span>{topic.length} chars</span>
        </div>
      </div>

      {/* Script input (optional) */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">2. Your Script <span className="font-normal text-[#9C8F84]">(optional)</span></h2>
        <p className="text-[#82796D] text-xs mb-4">Already have a script? Paste it here and we&apos;ll narrate and visualize it as-is.</p>
        <textarea
          value={script}
          onChange={e => setScript(e.target.value)}
          placeholder="Paste an existing script, or leave blank to have one generated from your topic."
          rows={4}
          className="w-full bg-white border border-[#EADFC9] rounded-xl px-4 py-3 text-sm text-[#2C2621] placeholder-[#9C8F84] focus:outline-none focus:border-[#A88E75] resize-none"
        />
      </div>

      {/* Format */}
      <div id="step-visuals" className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs scroll-mt-6">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">3. Format</h2>
        <p className="text-[#82796D] text-xs mb-4">Choose the narrative style for your video</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {formats.map((f) => {
            const Icon = f.icon;
            const active = format === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'border-[#A88E75] bg-[#A88E75]/10'
                    : 'border-[#EADFC9] bg-white hover:border-[#C5B49F]'
                }`}
              >
                <Icon className={`w-4 h-4 mb-2 ${active ? 'text-[#A88E75]' : 'text-[#9C8F84]'}`} />
                <div className={`text-sm font-medium ${active ? 'text-[#2C2621]' : 'text-[#6E6259]'}`}>{f.label}</div>
                <div className="text-[10px] text-[#9C8F84] mt-0.5">{f.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">4. Duration</h2>
        <p className="text-[#82796D] text-xs mb-4">Select the total runtime for your video</p>
        <div className="flex flex-wrap gap-2">
          {durations.map((d) => {
            const active = duration === d;
            return (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-xl text-sm border transition-all cursor-pointer ${
                  active
                    ? 'border-[#A88E75] bg-[#A88E75]/10 text-[#2C2621] font-semibold'
                    : 'border-[#EADFC9] text-[#6E6259] bg-white hover:border-[#C5B49F]'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice */}
      <div id="step-voice" className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs scroll-mt-6">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">5. Voice</h2>
        <p className="text-[#82796D] text-xs mb-4">Select your narrator&apos;s voice</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {voices.map((v) => {
            const active = voice === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setVoice(v.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'border-[#A88E75] bg-[#A88E75]/10'
                    : 'border-[#EADFC9] bg-white hover:border-[#C5B49F]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#A88E75] flex items-center justify-center text-xs font-bold text-white mb-2">
                  {v.name[0]}
                </div>
                <div className={`text-sm font-medium ${active ? 'text-[#2C2621]' : 'text-[#6E6259]'}`}>{v.name}</div>
                <div className="text-[10px] text-[#9C8F84]">{v.style}</div>
                <div className="text-[10px] text-[#9C8F84]">{v.gender}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Aspect ratio */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs">
        <h2 className="text-base font-bold text-[#2C2621] mb-1">6. Format & Aspect Ratio</h2>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {aspects.map((a) => {
            const active = aspect === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setAspect(a.id)}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  active
                    ? 'border-[#A88E75] bg-[#A88E75]/10'
                    : 'border-[#EADFC9] text-[#6E6259] bg-white hover:border-[#C5B49F]'
                }`}
              >
                <div className="text-lg mb-1">{a.id === '16:9' ? '🖥️' : '📱'}</div>
                <div className={`text-sm font-medium ${active ? 'text-[#2C2621]' : 'text-[#6E6259]'}`}>{a.label}</div>
                <div className="text-[10px] text-[#9C8F84]">{a.desc}</div>
              </button>
            );
          })}
        </div>

        {/* E-book option */}
        <div
          className="mt-4 flex items-center justify-between p-3 rounded-xl border border-[#EADFC9] hover:border-[#C5B49F] bg-white transition-all cursor-pointer"
          onClick={() => setIncludeEbook(!includeEbook)}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-[#9C8F84]" />
            <div>
              <div className="text-sm font-medium text-[#2C2621]">Include E-book PDF</div>
              <div className="text-xs text-[#82796D]">
                {isLegacy ? 'Generate a print-ready e-book from your script (+20–60 credits)' : 'Included on Creator and above'}
              </div>
            </div>
          </div>
          <div className={`w-10 h-5 rounded-full transition-all flex-shrink-0 ${includeEbook ? 'bg-[#A88E75]' : 'bg-[#EADFC9]'}`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-all mt-0.5 ${includeEbook ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
        </div>
      </div>

      {/* Generate */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#EADFC9] rounded-2xl p-6 shadow-2xs">
        {(needsPlan || outOfQuota) && (
          <div className="mb-5 rounded-xl border border-[#EADFC9] bg-[#FAF6F0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-[#2C2621]">
                {needsPlan ? 'Choose a plan to start generating' : "You've used this month's videos"}
              </div>
              <p className="text-xs text-[#82796D] mt-0.5 max-w-md leading-relaxed">
                {needsPlan
                  ? 'Your account has no plan and 0 credits yet. Pick a plan and your topic, script and settings below are kept exactly as they are.'
                  : `0 of ${quota.videosLimit} videos left this period. Upgrade to keep generating now, or wait for your quota to renew.`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                track('paywall_shown', { reason: needsPlan ? 'subscribe' : 'upgrade' });
                setPaywallMode(needsPlan ? 'subscribe' : 'upgrade');
              }}
              className="bg-[#A88E75] text-white hover:bg-[#8C7761] text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-xs cursor-pointer flex-shrink-0"
            >
              {needsPlan ? 'See plans' : 'Upgrade'}
            </button>
          </div>
        )}
        {isLegacy ? (
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-[#82796D]">Estimated credit cost</div>
              <div className="text-2xl font-black text-[#2C2621]">~{estimatedCredits} <span className="text-sm font-normal text-[#82796D]">credits</span></div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#82796D]">Your balance</div>
              <div className="text-lg font-bold text-[#8C6D4F]">{credits} credits</div>
            </div>
          </div>
        ) : subscription.status === 'active' ? (
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-[#82796D]">Estimated runtime</div>
              <div className="text-2xl font-black text-[#2C2621]">{duration}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#82796D]">This month</div>
              <div className="text-lg font-bold text-[#8C6D4F]">
                Uses 1 of your {Math.max(0, quota.videosLimit - quota.videosUsedThisPeriod)} videos left
              </div>
            </div>
          </div>
        ) : null}
        <button
          ref={generateBtnRef}
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="w-full bg-[#A88E75] text-white hover:bg-[#8C7761] py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Launching generation...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Video
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-[#82796D] mt-3">
          {isLegacy
            ? 'Credits are only charged after successful completion. Failed renders are refunded automatically.'
            : "Failed renders don't count against your monthly quota."}
        </p>
      </div>

      {authModalOpen && (
        <AuthModal
          onClose={() => { setAuthModalOpen(false); pendingAutoContinue.current = false; }}
          onSuccess={() => setAuthModalOpen(false)}
        />
      )}

      {paywallMode && (
        <SubscriptionPaywallModal
          mode={paywallMode}
          topic={topic}
          onClose={() => setPaywallMode(null)}
        />
      )}
    </div>
  );
}
