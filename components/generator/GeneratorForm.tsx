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
import { useApiErrorHandler } from '@/lib/handleApiError';
import { paywallHref, type PaymentReason } from '@/lib/routes';
import { savePendingGeneration, readPendingGeneration, clearPendingGeneration } from '@/lib/pending-generation';
import AuthModal from '@/components/AuthModal';

// Every tool that gates generation on a plan/credits uses this same key —
// see lib/pending-generation.ts for why there's only one.
const PENDING_GENERATION_TOOL = 'create';

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
  // Every failed API call in this form goes through the shared handler:
  // 401 -> /auth/login?next=..., 402 -> save this form + /dashboard/credits
  // with a reason (never an error toast), anything else -> toast.
  const { handleApiError } = useApiErrorHandler({
    onPaymentRequired: () => savePendingGeneration(PENDING_GENERATION_TOOL, { topic, script, settings: settings() }),
  });
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
        // A purchase made after a 402 redirect (see runServerGate below)
        // takes priority over the generic autosaved draft — it's the exact
        // form that was blocked, and the copy says so specifically.
        const pending = readPendingGeneration(PENDING_GENERATION_TOOL);
        if (pending) {
          applyDraft(pending);
          clearPendingGeneration(PENDING_GENERATION_TOOL);
          showToast('Your plan is active — click Generate to start.');
        } else {
          const draft = await readDraft();
          if (draft) applyDraft(draft);
          showToast('Your draft is back. Pick up where you left off.');
        }
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

  // A stray old-style ?upgrade=1 link on this page (nothing in-app links
  // here with it anymore — every Upgrade entry point goes straight to
  // /dashboard/credits) still lands somewhere sensible instead of doing
  // nothing.
  useEffect(() => {
    if (!searchParams.get('upgrade')) return;
    router.replace('/dashboard/credits?upgrade=1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const estimatedCredits = estimatedCreditCost(duration);

  // Gate order (server /api/generate mirrors this exactly): a legacy credit
  // balance > 0 always wins; everyone else goes through subscription+quota.
  // The form is ALWAYS fully usable regardless of plan/credits — there is no
  // up-front warning. A rejection here only ever happens at the moment
  // Generate is actually clicked, and it's never shown as an error: the
  // filled-in form is saved (see lib/pending-generation.ts) and the user is
  // sent to /dashboard/credits with a reason, not a toast or a blocked page.
  const runServerGate = async () => {
    if (!user) return;
    setIsGenerating(true);

    try {
      if (isMock) {
        const result = runMockGenerateGate(user.uid, estimatedCredits);
        if (!result.ok) {
          const reason: PaymentReason = result.code === 'INSUFFICIENT_CREDITS' ? 'insufficient_credits' : 'no_plan';
          track('paywall_redirect', { reason });
          savePendingGeneration(PENDING_GENERATION_TOOL, { topic, script, settings: settings() });
          router.push(paywallHref(reason));
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
        clearPendingGeneration(PENDING_GENERATION_TOOL);
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
      clearPendingGeneration(PENDING_GENERATION_TOOL);
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
                <div className="w-8 h-8 rounded-full bg-[#A88E75] flex items-center justify-center text-xs font-bold text-[#fff] mb-2">
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
          className="w-full bg-[#A88E75] text-[#fff] hover:bg-[#8C7761] py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
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
    </div>
  );
}
