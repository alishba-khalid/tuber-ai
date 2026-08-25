export interface CompetitorInfo {
  name: string;
  tagline: string;
  price: string;
  pros: string[];
  cons: string[];
  genByGhostDiff: string;
}

export const competitorData: Record<string, CompetitorInfo> = {
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

export const competitorSlugs = Object.keys(competitorData);

export function getCompetitor(competitor: string): CompetitorInfo {
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
