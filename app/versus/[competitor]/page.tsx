import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, Zap, CreditCard, ArrowRight, Video, Shield, Award } from 'lucide-react';

interface PageProps {
  params: Promise<{ competitor: string }>;
}

const competitorData: Record<string, {
  name: string;
  tagline: string;
  price: string;
  pros: string[];
  cons: string[];
  genByGhostDiff: string;
}> = {
  dreamtuber: {
    name: "DreamTuber",
    tagline: "automated kids stories & long-form videos",
    price: "$29/mo",
    pros: ["Automated kids book creator", "Supports long rendering"],
    cons: ["Limited voice narration choices", "Stock footage repetition", "No interactive video timeline editor"],
    genByGhostDiff: "GenByGhost provides professional-grade voice narration (ElevenLabs integrations), an interactive timeline editor to customize visuals before rendering, and a much wider selection of high-definition templates."
  },
  autoshorts: {
    name: "AutoShorts.ai",
    tagline: "autopilot faceless shorts poster",
    price: "$19/mo",
    pros: ["Autopilot uploading to TikTok", "Fast rendering for shorts"],
    cons: ["Only supports vertical short videos", "No editing capabilities", "Repetitive AI visuals"],
    genByGhostDiff: "GenByGhost is built for both long-form YouTube documentaries/explainers and vertical shorts, giving you full-featured video editing suites and advanced text script customizations."
  },
  invideo: {
    name: "InVideo AI",
    tagline: "text-to-video assembler tool",
    price: "$25/mo",
    pros: ["Good stock library integrations", "User-friendly editor interface"],
    cons: ["No autopilot auto-posting options", "Expensive high-tier plans", "Watermarks on free exports"],
    genByGhostDiff: "GenByGhost has built-in auto-publishing and scheduling options to push videos directly to your YouTube channel on autopilot, with cheaper starting tiers and no export watermarks."
  },
  pictory: {
    name: "Pictory",
    tagline: "article/blog post to video converter",
    price: "$23/mo",
    pros: ["Converts articles to slides", "Auto subtitle generation"],
    cons: ["Aesthetics look like slide presentations", "Robot-like standard voiceovers", "No advanced visual generator"],
    genByGhostDiff: "GenByGhost uses cutting-edge generative models to build fluid cinematic visuals matching the script context, combined with ultra-realistic human-like voice synthesis."
  },
  fliki: {
    name: "Fliki",
    tagline: "text-to-speech stock video builder",
    price: "$28/mo",
    pros: ["Wide voice library", "Supports podcasting options"],
    cons: ["Limited custom layout customization", "High pricing for export limits", "Basic video transitions"],
    genByGhostDiff: "GenByGhost focuses specifically on maximizing YouTube engagement with cinematic storytelling structures, interactive visual edits, and channel sync."
  },
  designs: {
    name: "Designs.ai",
    tagline: "all-in-one AI design suite with a video maker",
    price: "Freemium, paid from ~$19/mo",
    pros: ["Bundled with logo, voiceover, and design tools", "Large template library"],
    cons: ["Video maker is one tool among many, not a specialty", "Template-driven rather than custom-generated", "Not built for long-form runtimes"],
    genByGhostDiff: "GenByGhost is a dedicated long-form video pipeline, not a general design suite with a video feature bolted on — every part of it is built around sustaining a full-length YouTube video."
  },
  veed: {
    name: "VEED.io",
    tagline: "browser-based video editor with auto-captions",
    price: "Freemium, paid from ~$18/mo",
    pros: ["Fast, accurate auto-captioning", "Clean, easy-to-use editor"],
    cons: ["Requires footage you already have", "No script or topic-to-video generation", "Manual editing for anything beyond captions"],
    genByGhostDiff: "VEED edits video you upload. GenByGhost generates the video — script, voice, and visuals — from a topic prompt, with nothing to film or upload first."
  },
  capcut: {
    name: "CapCut",
    tagline: "free mobile-first short-form video editor",
    price: "Free, with paid Pro tier",
    pros: ["Free and extremely popular for short-form", "Trending templates and effects"],
    cons: ["Fully manual editing, no AI generation from a topic", "Built for short vertical clips, not long-form", "No autopilot publishing pipeline"],
    genByGhostDiff: "CapCut is a hands-on editor for short clips. GenByGhost automates the entire long-form production process end to end, with no manual timeline editing required."
  },
  descript: {
    name: "Descript",
    tagline: "transcript-based video and podcast editor",
    price: "Freemium, paid from ~$24/mo",
    pros: ["Edit video by editing the transcript text", "Strong for repurposing podcasts and recordings"],
    cons: ["Needs existing audio or video to work with", "Not a from-scratch topic-to-video generator", "Long-form assembly still requires manual editing"],
    genByGhostDiff: "Descript is built to edit recordings you already have. GenByGhost has nothing to edit at the start — it generates the entire video from a single topic idea."
  },
  kapwing: {
    name: "Kapwing",
    tagline: "online collaborative video editor",
    price: "Freemium, paid from ~$16/mo",
    pros: ["Good collaborative/team editing features", "Wide format and export support"],
    cons: ["Manual, timeline-based editing", "No automated scriptwriting or narration", "Not optimized for multi-hour runtimes"],
    genByGhostDiff: "Kapwing is a capable manual editor for teams. GenByGhost removes the editing step entirely by generating the finished long-form video automatically."
  },
  simplified: {
    name: "Simplified",
    tagline: "all-in-one AI content, design, and social suite",
    price: "Freemium, paid from ~$18/mo",
    pros: ["Bundles copywriting, design, and video in one app", "Useful for social media content batches"],
    cons: ["Video generation is shallow compared to dedicated tools", "Not built for narrated, long-form storytelling", "Spreads focus across many content types"],
    genByGhostDiff: "GenByGhost specializes in exactly one thing — long-form narrated YouTube video — rather than spreading a general content suite thin across many formats."
  },
  heygen: {
    name: "HeyGen",
    tagline: "AI avatar generator with multilingual dubbing",
    price: "Freemium, paid from ~$29/mo",
    pros: ["Strong lip-synced AI avatars", "Excellent multilingual dubbing"],
    cons: ["Priced and built around short avatar clips, not hours-long video", "Requires an on-screen presenter format", "Not suited to faceless, scene-driven storytelling"],
    genByGhostDiff: "HeyGen puts a digital presenter on screen. GenByGhost is built for the faceless format — voice over cinematic visuals — that actually performs on history, true crime, and explainer channels."
  },
  synthesia: {
    name: "Synthesia",
    tagline: "AI avatar videos for corporate training",
    price: "Custom/enterprise pricing",
    pros: ["Photorealistic AI presenter avatars", "Strong for internal training and e-learning"],
    cons: ["Built for short training clips, not hours-long content", "Avatar-led format doesn't fit faceless YouTube channels", "Pricing scales with avatar minutes generated"],
    genByGhostDiff: "Synthesia solves corporate training videos. GenByGhost solves long-form, faceless YouTube content — a completely different format and audience."
  },
  elai: {
    name: "Elai.io",
    tagline: "AI avatar video generator for e-learning",
    price: "Freemium, paid from ~$29/mo",
    pros: ["Slide-based AI avatar video creation", "Good for corporate/training content"],
    cons: ["Presenter-avatar format, not narrative visuals", "Not designed for multi-hour runtimes", "Training-slide aesthetic, not cinematic storytelling"],
    genByGhostDiff: "GenByGhost generates cinematic scene visuals matched to a narrated script, not slide-based avatar presentations — the format long-form YouTube audiences actually watch."
  },
  colossyan: {
    name: "Colossyan",
    tagline: "AI avatar video creator for corporate training",
    price: "Freemium, paid from ~$27/mo",
    pros: ["Multilingual AI avatar presenters", "Purpose-built for training content"],
    cons: ["Same avatar-led limitation for long-form YouTube", "Not built for documentary or narrative pacing", "Runtime and pricing built around short training modules"],
    genByGhostDiff: "Colossyan is an e-learning tool wearing a video generator's clothes. GenByGhost is built specifically for long-form public YouTube content from day one."
  },
  deepbrain: {
    name: "DeepBrain AI",
    tagline: "AI virtual human / news-anchor style video generator",
    price: "Custom/enterprise pricing",
    pros: ["Realistic virtual human presenters", "Strong for news-style and corporate use cases"],
    cons: ["Avatar/anchor format, not faceless storytelling", "Enterprise pricing not built for solo creators", "Not optimized for hours-long runtimes"],
    genByGhostDiff: "GenByGhost is priced and built for individual creators making long-form faceless content, not enterprise teams producing short anchor-style clips."
  },
  runway: {
    name: "Runway",
    tagline: "generative AI video clips for filmmakers",
    price: "Freemium, paid from ~$15/mo",
    pros: ["Cutting-edge generative visual quality", "Strong for short, stylized cinematic clips"],
    cons: ["Generates seconds-long clips, not full videos", "No scriptwriting or narration built in", "Assembling a full video requires heavy manual editing"],
    genByGhostDiff: "Runway generates short clips you'd need to script, narrate, and assemble yourself. GenByGhost handles that entire chain automatically for the full runtime of the video."
  }
};

function getCompetitor(competitor: string) {
  const compKey = competitor.toLowerCase();
  return (
    competitorData[compKey] || {
      name: competitor.charAt(0).toUpperCase() + competitor.slice(1),
      tagline: 'automated AI video generator',
      price: 'Varies',
      pros: ['Automated creation', 'Templates'],
      cons: ['Generic templates', 'Higher pricing tiers', 'Lacks dynamic customization'],
      genByGhostDiff:
        'GenByGhost offers advanced timeline editing, ultra-realistic voice narration, and direct autopilot publishing to grow your channel hands-free.',
    }
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { competitor } = await params;
  const comp = getCompetitor(competitor);
  const title = `GenByGhost vs ${comp.name} — Which AI Video Tool Wins?`;
  const description = `Compare GenByGhost and ${comp.name} (${comp.tagline}) on pricing, voice quality, editing, and auto-publishing to find the right AI video tool for your channel.`;

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function VersusPage({ params }: PageProps) {
  const { competitor } = await params;
  const comp = getCompetitor(competitor);
  const compKey = competitor.toLowerCase();

  return (
    <div className="min-h-screen bg-[#050B0A] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Top Bar */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-mono-label text-[#527E72] hover:text-[#ECFDF5] transition-colors">
            &larr; Back to GenByGhost
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#225146]/20 border border-[#225146]/50 text-[#C5B49F] mb-4">
            <Zap className="w-3.5 h-3.5" /> Direct Product Comparison
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading text-[#ECFDF5] tracking-tight leading-tight">
            GenByGhost <span className="text-[#C5B49F] font-light">vs</span> {comp.name}
          </h1>
          <p className="mt-4 text-lg text-[#8FAAA6] max-w-2xl mx-auto">
            Comparing features, capabilities, and pricing to help you choose the best AI video automation tool for your business.
          </p>
        </div>

        {/* Dynamic Highlight Card */}
        <div className="bg-[#0A1412] border border-[#225146]/30 rounded-3xl p-8 mb-12 shadow-xl">
          <h2 className="text-xl font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C5B49F]" /> Why Creators Choose GenByGhost over {comp.name}
          </h2>
          <p className="text-[#8FAAA6] text-sm leading-relaxed">
            {comp.genByGhostDiff}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border border-[#122823] bg-[#0A1412]/80 rounded-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-3 border-b border-[#122823] bg-[#0A1412] p-4 text-sm font-mono-label font-bold text-[#ECFDF5]">
            <div>Feature</div>
            <div className="text-center text-[#C5B49F]">GenByGhost</div>
            <div className="text-center text-slate-400">{comp.name}</div>
          </div>
          
          <div className="divide-y divide-[#122823]">
            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Autopilot Video Posting</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center"><X className="text-rose-400 w-5 h-5" /></div>
            </div>
            
            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Long-Form Video Support</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center">
                {compKey === "autoshorts" ? <X className="text-rose-400 w-5 h-5" /> : <Check className="text-emerald-400 w-5 h-5" />}
              </div>
            </div>

            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Interactive Visual Timeline</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center">
                {["invideo", "veed", "capcut"].includes(compKey) ? <Check className="text-emerald-400 w-5 h-5" /> : <X className="text-rose-400 w-5 h-5" />}
              </div>
            </div>

            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Voice Synthesis (ElevenLabs)</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center">
                {["fliki", "heygen", "synthesia"].includes(compKey) ? <Check className="text-emerald-400 w-5 h-5" /> : <X className="text-rose-400 w-5 h-5" />}
              </div>
            </div>

            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Free Setup Credits</div>
              <div className="flex justify-center"><Check className="text-emerald-400 w-5 h-5" /></div>
              <div className="flex justify-center"><X className="text-rose-400 w-5 h-5" /></div>
            </div>

            <div className="grid grid-cols-3 p-4 text-sm">
              <div className="font-semibold text-slate-300">Starting Price</div>
              <div className="text-center font-bold text-emerald-400">$29/mo (300 credits)</div>
              <div className="text-center text-slate-400">{comp.price}</div>
            </div>
          </div>
        </div>

        {/* Pros & Cons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#0A1412]/50 border border-[#122823] rounded-2xl p-6">
            <h3 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-1.5">
              <Check className="text-emerald-400 w-5 h-5" /> What {comp.name} does well
            </h3>
            <ul className="space-y-2 text-sm text-[#8FAAA6]">
              {comp.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">&bull;</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0A1412]/50 border border-[#122823] rounded-2xl p-6">
            <h3 className="text-base font-bold font-serif-heading text-[#ECFDF5] mb-4 flex items-center gap-1.5">
              <X className="text-rose-400 w-5 h-5" /> Drawbacks of {comp.name}
            </h3>
            <ul className="space-y-2 text-sm text-[#8FAAA6]">
              {comp.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final CTA Card */}
        <div className="text-center bg-radial from-[#122823] to-[#0A1412] border border-[#225146] rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#ECFDF5] mb-4">
              Ready to automate your YouTube channel?
            </h2>
            <p className="text-[#8FAAA6] text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Create your GenByGhost account today. Buy credits and generate your first video in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="btn-indigo-pill px-8 py-3 text-sm flex items-center gap-2 w-full sm:w-auto justify-center font-bold">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="text-sm font-semibold text-[#C5B49F] hover:text-[#ECFDF5] transition-colors px-6 py-2.5">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
