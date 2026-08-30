const fs = require('fs');
const path = require('path');

// We have the raw competitor data fetched or search-web grounded
const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, 'competitor_seo_data.json'), 'utf8'));

// Slugs of existing GenByGhost pages
const existingPages = {
  homepage: 'https://www.genbyghost.com/',
  pricing: 'https://www.genbyghost.com/pricing',
  howItWorks: 'https://www.genbyghost.com/how-it-works',
  examples: 'https://www.genbyghost.com/examples',
  blog: 'https://www.genbyghost.com/blog',
  // Use cases
  'faceless-history-video-generator': 'https://www.genbyghost.com/use-cases/faceless-history-video-generator',
  'automated-book-summary-videos': 'https://www.genbyghost.com/use-cases/automated-book-summary-videos',
  'best-ai-tool-for-long-form-youtube-videos': 'https://www.genbyghost.com/use-cases/best-ai-tool-for-long-form-youtube-videos',
  'how-to-create-a-faceless-history-channel': 'https://www.genbyghost.com/use-cases/how-to-create-a-faceless-history-channel',
  'generate-automated-documentaries-with-ai': 'https://www.genbyghost.com/use-cases/generate-automated-documentaries-with-ai',
  'automated-faceless-channel-ideas': 'https://www.genbyghost.com/use-cases/automated-faceless-channel-ideas',
  'scary-stories-video-generator': 'https://www.genbyghost.com/use-cases/scary-stories-video-generator',
  'luxury-lifestyle-shorts-generator': 'https://www.genbyghost.com/use-cases/luxury-lifestyle-shorts-generator',
  'automated-news-video-creator': 'https://www.genbyghost.com/use-cases/automated-news-video-creator',
  'youtube-automation-script-writer': 'https://www.genbyghost.com/use-cases/youtube-automation-script-writer',
  // Blog posts
  'how-to-grow-faceless-youtube-channel': 'https://www.genbyghost.com/blog/how-to-grow-faceless-youtube-channel',
  'best-youtube-niches-ai-video': 'https://www.genbyghost.com/blog/best-youtube-niches-ai-video',
  'long-form-content-youtube-algorithm': 'https://www.genbyghost.com/blog/long-form-content-youtube-algorithm',
  'ai-voice-vs-real-voice-youtube': 'https://www.genbyghost.com/blog/ai-voice-vs-real-voice-youtube',
  'genbyghost-vs-invideo-ai': 'https://www.genbyghost.com/blog/genbyghost-vs-invideo-ai',
  'genbyghost-vs-pictory': 'https://www.genbyghost.com/blog/genbyghost-vs-pictory',
  'genbyghost-vs-fliki': 'https://www.genbyghost.com/blog/genbyghost-vs-fliki',
  'genbyghost-vs-synthesia': 'https://www.genbyghost.com/blog/genbyghost-vs-synthesia',
  'genbyghost-vs-heygen': 'https://www.genbyghost.com/blog/genbyghost-vs-heygen',
  'genbyghost-vs-descript': 'https://www.genbyghost.com/blog/genbyghost-vs-descript',
  'genbyghost-vs-runway': 'https://www.genbyghost.com/blog/genbyghost-vs-runway',
  'genbyghost-vs-capcut': 'https://www.genbyghost.com/blog/genbyghost-vs-capcut',
  'genbyghost-vs-veed': 'https://www.genbyghost.com/blog/genbyghost-vs-veed',
  'genbyghost-vs-autoshorts-ai': 'https://www.genbyghost.com/blog/genbyghost-vs-autoshorts-ai'
};

// Check if a keyword is already targeted by GenByGhost page
function getGenByGhostPage(keyword) {
  const kw = keyword.toLowerCase();
  
  if (kw.includes('invideo')) return { yes: true, url: existingPages['genbyghost-vs-invideo-ai'] };
  if (kw.includes('pictory')) return { yes: true, url: existingPages['genbyghost-vs-pictory'] };
  if (kw.includes('fliki')) return { yes: true, url: existingPages['genbyghost-vs-fliki'] };
  if (kw.includes('synthesia')) return { yes: true, url: existingPages['genbyghost-vs-synthesia'] };
  if (kw.includes('heygen')) return { yes: true, url: existingPages['genbyghost-vs-heygen'] };
  if (kw.includes('descript')) return { yes: true, url: existingPages['genbyghost-vs-descript'] };
  if (kw.includes('runway')) return { yes: true, url: existingPages['genbyghost-vs-runway'] };
  if (kw.includes('capcut')) return { yes: true, url: existingPages['genbyghost-vs-capcut'] };
  if (kw.includes('veed')) return { yes: true, url: existingPages['genbyghost-vs-veed'] };
  if (kw.includes('autoshorts')) return { yes: true, url: existingPages['genbyghost-vs-autoshorts-ai'] };

  if (kw.includes('history') && kw.includes('generator')) return { yes: true, url: existingPages['faceless-history-video-generator'] };
  if (kw.includes('book') && kw.includes('summary')) return { yes: true, url: existingPages['automated-book-summary-videos'] };
  if (kw.includes('long-form') && kw.includes('youtube')) return { yes: true, url: existingPages['best-ai-tool-for-long-form-youtube-videos'] };
  if (kw.includes('documentary') && kw.includes('generator')) return { yes: true, url: existingPages['generate-automated-documentaries-with-ai'] };
  if (kw.includes('scary') || kw.includes('horror')) return { yes: true, url: existingPages['scary-stories-video-generator'] };
  if (kw.includes('luxury') || kw.includes('shorts')) return { yes: true, url: existingPages['luxury-lifestyle-shorts-generator'] };
  if (kw.includes('news') && kw.includes('creator')) return { yes: true, url: existingPages['automated-news-video-creator'] };
  if (kw.includes('script') && kw.includes('writer')) return { yes: true, url: existingPages['youtube-automation-script-writer'] };
  if (kw.includes('grow') && kw.includes('faceless')) return { yes: true, url: existingPages['how-to-grow-faceless-youtube-channel'] };

  return { yes: false, url: '' };
}

// Map keywords manually to ensure exact extracted metadata matches
const keywordsByCompetitor = {
  "invideo.io": [
    { kw: "create videos without limits", url: "https://invideo.io", loc: "title", intent: "transactional" },
    { kw: "AI video platform for serious creatives", url: "https://invideo.io", loc: "H1", intent: "commercial" },
    { kw: "create & edit AI videos", url: "https://invideo.io", loc: "meta", intent: "commercial" },
    { kw: "ai video generator", url: "https://invideo.io/make/ai-video-generator/", loc: "slug", intent: "commercial" },
    { kw: "create videos with Agent Two", url: "https://invideo.io", loc: "meta", intent: "commercial" }
  ],
  "pictory.ai": [
    { kw: "Text to Video AI", url: "https://pictory.ai", loc: "title", intent: "commercial" },
    { kw: "Generate Videos in Minutes", url: "https://pictory.ai", loc: "H1", intent: "commercial" },
    { kw: "Pictory’s AI video generator", url: "https://pictory.ai", loc: "meta", intent: "commercial" },
    { kw: "convert text prompts URLs to branded videos", url: "https://pictory.ai", loc: "meta", intent: "commercial" },
    { kw: "idea to video", url: "https://pictory.ai/idea-to-video", loc: "slug", intent: "commercial" },
    { kw: "url to video", url: "https://pictory.ai/url-to-video", loc: "slug", intent: "commercial" },
    { kw: "image to video", url: "https://pictory.ai/image-to-video", loc: "slug", intent: "commercial" },
    { kw: "script to video", url: "https://pictory.ai/pictory-features/script-to-video", loc: "slug", intent: "commercial" },
    { kw: "doc to video", url: "https://pictory.ai/doc-to-video", loc: "slug", intent: "commercial" }
  ],
  "fliki.ai": [
    { kw: "AI Video Generator", url: "https://fliki.ai", loc: "title", intent: "commercial" },
    { kw: "Text to Video with AI Voices", url: "https://fliki.ai", loc: "title", intent: "commercial" },
    { kw: "Turn text into videos", url: "https://fliki.ai", loc: "H1", intent: "commercial" },
    { kw: "Turn text scripts into videos", url: "https://fliki.ai", loc: "meta", intent: "commercial" },
    { kw: "text to video", url: "https://fliki.ai/features/text-to-video", loc: "slug", intent: "commercial" },
    { kw: "idea to video", url: "https://fliki.ai/features/idea-to-video", loc: "slug", intent: "commercial" },
    { kw: "voiceovers", url: "https://fliki.ai/features/voiceovers", loc: "slug", intent: "commercial" }
  ],
  "synthesia.io": [
    { kw: "AI Video Platform for Business", url: "https://synthesia.io", loc: "title", intent: "commercial" },
    { kw: "All-in-one AI Video platform", url: "https://synthesia.io", loc: "H1", intent: "commercial" },
    { kw: "roleplay sessions", url: "https://synthesia.io/features/roleplay-sessions", loc: "slug", intent: "commercial" },
    { kw: "avatars", url: "https://synthesia.io/features/avatars", loc: "slug", intent: "commercial" },
    { kw: "ai voice generator", url: "https://synthesia.io/features/ai-voice-generator", loc: "slug", intent: "commercial" },
    { kw: "ai screen recorder", url: "https://synthesia.io/features/ai-screen-recorder", loc: "slug", intent: "commercial" },
    { kw: "ai motion graphics", url: "https://synthesia.io/tools/ai-motion-graphics", loc: "slug", intent: "commercial" }
  ],
  "heygen.com": [
    { kw: "Générateur de vidéos IA gratuit", url: "https://heygen.com/fr-fr", loc: "title", intent: "commercial" },
    { kw: "créez des vidéos époustouflantes avec l’IA", url: "https://heygen.com/fr-fr", loc: "title", intent: "commercial" },
    { kw: "des vidéos IA avec vous en vedette", url: "https://heygen.com/fr-fr", loc: "H1", intent: "commercial" },
    { kw: "créez des vidéos IA à partir de vos idées", url: "https://heygen.com/fr-fr", loc: "meta", intent: "commercial" }
  ],
  "descript.com": [
    { kw: "AI Video & Audio Text-based Editor", url: "https://descript.com", loc: "title", intent: "commercial" },
    { kw: "AI Video Editor", url: "https://descript.com", loc: "H1", intent: "commercial" },
    { kw: "editing as easy as editing text", url: "https://descript.com", loc: "meta", intent: "informational" },
    { kw: "record transcribe edit publish in one tool", url: "https://descript.com", loc: "meta", intent: "commercial" }
  ],
  "runwayml.com": [
    { kw: "generative video", url: "https://runwayml.com", loc: "meta", intent: "informational" },
    { kw: "AI video generation", url: "https://runwayml.com", loc: "meta", intent: "commercial" },
    { kw: "text to video", url: "https://runwayml.com", loc: "meta", intent: "commercial" },
    { kw: "creative workflows", url: "https://runwayml.com", loc: "meta", intent: "informational" },
    { kw: "AI models Gen-3", url: "https://runwayml.com", loc: "meta", intent: "commercial" }
  ],
  "capcut.com": [
    { kw: "CapCut AI Video Editor", url: "https://capcut.com", loc: "title", intent: "transactional" },
    { kw: "smart online video editing", url: "https://capcut.com", loc: "title", intent: "commercial" },
    { kw: "advanced AI tools", url: "https://capcut.com", loc: "title", intent: "commercial" },
    { kw: "AI-powered photo & video editor", url: "https://capcut.com", loc: "H1", intent: "commercial" },
    { kw: "edit YouTube and Instagram videos", url: "https://capcut.com", loc: "meta", intent: "commercial" }
  ],
  "veed.io": [
    { kw: "AI Video Creation Platform", url: "https://veed.io", loc: "title", intent: "commercial" },
    { kw: "idea to video workflow", url: "https://veed.io", loc: "title", intent: "commercial" },
    { kw: "create pro level videos", url: "https://veed.io", loc: "H1", intent: "commercial" },
    { kw: "create talking heads", url: "https://veed.io", loc: "meta", intent: "commercial" },
    { kw: "edit with AI", url: "https://veed.io", loc: "meta", intent: "commercial" },
    { kw: "dub videos", url: "https://veed.io", loc: "meta", intent: "commercial" },
    { kw: "add subtitles", url: "https://veed.io", loc: "meta", intent: "commercial" },
    { kw: "text to video", url: "https://veed.io/tools/ai-video/text-to-video", loc: "slug", intent: "commercial" }
  ],
  "autoshorts.ai": [
    { kw: "Faceless Video Generator for TikTok & YouTube", url: "https://autoshorts.ai", loc: "title", intent: "commercial" },
    { kw: "create and automate faceless videos", url: "https://autoshorts.ai", loc: "meta", intent: "commercial" },
    { kw: "generates and posts fresh content daily", url: "https://autoshorts.ai", loc: "meta", intent: "commercial" },
    { kw: "grow your TikTok and YouTube channels", url: "https://autoshorts.ai", loc: "meta", intent: "informational" }
  ],
  "higgsfield.ai": [
    { kw: "AI-native creative suite", url: "https://higgsfield.ai", loc: "title", intent: "commercial" },
    { kw: "create content from text prompts", url: "https://higgsfield.ai", loc: "meta", intent: "commercial" },
    { kw: "edit and upscale media", url: "https://higgsfield.ai", loc: "meta", intent: "commercial" },
    { kw: "automate creative workflows", url: "https://higgsfield.ai", loc: "meta", intent: "commercial" }
  ],
  "mootion.com": [
    { kw: "Turn your ideas into visual stories", url: "https://mootion.com", loc: "title", intent: "commercial" },
    { kw: "AI video generator", url: "https://mootion.com", loc: "meta", intent: "commercial" },
    { kw: "cinematic-quality videos with synced motion", url: "https://mootion.com", loc: "meta", intent: "commercial" },
    { kw: "AI 3D animation", url: "https://mootion.com", loc: "meta", intent: "commercial" }
  ],
  "videollama.co": [
    { kw: "Create Long-Form Videos In Minutes with AI", url: "https://videollama.co", loc: "title", intent: "commercial" },
    { kw: "Transform any script to video with AI", url: "https://videollama.co", loc: "meta", intent: "commercial" },
    { kw: "intelligent script video maker", url: "https://videollama.co", loc: "meta", intent: "commercial" },
    { kw: "turns text into professional videos", url: "https://videollama.co", loc: "meta", intent: "commercial" },
    { kw: "ai youtube video maker", url: "https://videollama.co/ai-youtube-video-maker", loc: "slug", intent: "commercial" },
    { kw: "history video maker", url: "https://videollama.co/history", loc: "slug", intent: "commercial" },
    { kw: "true-crime video maker", url: "https://videollama.co/true-crime", loc: "slug", intent: "commercial" },
    { kw: "horror video maker", url: "https://videollama.co/horror", loc: "slug", intent: "commercial" },
    { kw: "biography video maker", url: "https://videollama.co/biography", loc: "slug", intent: "commercial" }
  ],
  "storyshort.ai": [
    { kw: "AI Faceless Video Generator for TikTok & YouTube Shorts", url: "https://storyshort.ai", loc: "title", intent: "commercial" },
    { kw: "Create viral faceless videos on Auto-Pilot", url: "https://storyshort.ai", loc: "H1", intent: "commercial" },
    { kw: "ai long form video generator", url: "https://storyshort.ai/ai-long-form-video-generator", loc: "slug", intent: "commercial" },
    { kw: "ai asmr video generator", url: "https://storyshort.ai/tools/ai-asmr-video-generator", loc: "slug", intent: "commercial" }
  ],
  "magiclight.ai": [
    { kw: "Best AI Long-Form Video Generator", url: "https://magiclight.ai", loc: "title", intent: "commercial" },
    { kw: "Best AI Video Generator For Long-Form Video Content Creation", url: "https://magiclight.ai", loc: "H1", intent: "commercial" },
    { kw: "Create AI videos up to 50 minutes", url: "https://magiclight.ai", loc: "meta", intent: "commercial" },
    { kw: "Create AI videos from ideas scripts or stories", url: "https://magiclight.ai", loc: "meta", intent: "commercial" }
  ]
};

// Compile all keywords
const allKeywords = [];
for (const comp in keywordsByCompetitor) {
  for (const item of keywordsByCompetitor[comp]) {
    const pageCheck = getGenByGhostPage(item.kw);
    allKeywords.push({
      competitor: comp,
      keyword: item.kw,
      url: item.url,
      loc: item.loc,
      intent: item.intent,
      hasPage: pageCheck.yes ? `Yes (${pageCheck.url})` : 'No'
    });
  }
}

// FILTERING AND SCORING (Step 3)
const scoredKeywords = [];

function getCompetitorCount(keyword) {
  let count = 0;
  const kwLower = keyword.toLowerCase();
  for (const comp in keywordsByCompetitor) {
    const match = keywordsByCompetitor[comp].some(item => item.kw.toLowerCase() === kwLower || kwLower.includes(item.kw.toLowerCase()) || item.kw.toLowerCase().includes(kwLower));
    if (match) count++;
  }
  return count;
}

for (const item of allKeywords) {
  const kw = item.keyword;
  const kwLower = kw.toLowerCase();
  const wordCount = kw.split(/\s+/).length;
  
  let isRelevant = true;
  if (kwLower.includes('avatar') || kwLower.includes('dubbing') || kwLower.includes('edit') || kwLower.includes('recording') || kwLower.includes('screen') || kwLower.includes('short') || kwLower.includes('tiktok') || kwLower.includes('roleplay') || kwLower.includes('reels') || kwLower.includes('photo')) {
    isRelevant = false;
  }
  
  if (kwLower.includes('long-form') || kwLower.includes('faceless') || kwLower.includes('documentary') || kwLower.includes('history') || kwLower.includes('true-crime') || kwLower.includes('horror') || kwLower.includes('biography') || kwLower.includes('script') || kwLower.includes('book')) {
    isRelevant = true;
  }
  
  let isNotHeadTerm = true;
  if (kwLower === 'ai video generator' || kwLower === 'text to video' || kwLower === 'video editor' || kwLower === 'ai video editor' || kwLower === 'generative video') {
    isNotHeadTerm = false;
  }
  
  const compCount = getCompetitorCount(kw);
  const isCrowded = compCount >= 8;

  if (isRelevant && isNotHeadTerm && !isCrowded) {
    let score = 0;
    
    if (kwLower.includes('long-form') || kwLower.includes('documentary') || kwLower.includes('history') || kwLower.includes('true-crime') || kwLower.includes('book')) score += 5;
    if (kwLower.includes('faceless')) score += 4;
    if (kwLower.includes('script') || kwLower.includes('text to')) score += 3;
    
    score += Math.min(wordCount, 6);
    score += (15 - compCount);
    
    const hasPage = item.hasPage.startsWith('Yes');
    if (!hasPage) score += 10;
    
    scoredKeywords.push({
      keyword: kw,
      competitor: item.competitor,
      competitorCount: compCount,
      wordCount: wordCount,
      hasPage: item.hasPage,
      score: score,
      intent: item.intent,
      url: item.url,
      loc: item.loc
    });
  }
}

scoredKeywords.sort((a, b) => b.score - a.score);

// Manually cluster target themes to avoid competing pages
const clusters = [
  {
    theme: "AI Long-Form Documentary Production",
    targetKeyword: "create long-form videos in minutes with ai",
    supporting: ["best ai video generator for long-form video content creation", "ai video generator for long form content", "create ai videos up to 50 minutes"],
    relevance: "Extremely High (GenByGhost focuses on 10 min to 10 hours videos)",
    competition: "Low (only targeted by magiclight.ai & videollama.co)",
    gap: "Yes (GenByGhost has generic long-form post but no dedicated 'how-to' production guide or landing page for 'minutes with ai')",
    score: 28
  },
  {
    theme: "AI Script to Documentary Video Generation",
    targetKeyword: "transform any script to video with ai",
    supporting: ["turns text into professional videos", "intelligent script video maker", "generate videos from ideas scripts or stories"],
    relevance: "High (GenByGhost automates script writing and visual matching)",
    competition: "Low (only targeted by videollama.co & magiclight.ai)",
    gap: "Yes (no page targeting 'transform script to video')",
    score: 25
  },
  {
    theme: "Niche-Specific True Crime AI Production",
    targetKeyword: "true-crime documentary video generator",
    supporting: ["true-crime video maker", "horror video maker", "biography video maker"],
    relevance: "High (matches core evergreen niches of GenByGhost)",
    competition: "Very Low (only videollama.co targets with slugs)",
    gap: "Yes (only mentioned inside listicles currently, no dedicated landing page)",
    score: 24
  },
  {
    theme: "Article and Blog Post to AI Video Conversion",
    targetKeyword: "convert blog post to video ai",
    supporting: ["article to video ai generator", "turn text scripts blog posts into videos", "doc to video"],
    relevance: "High (useful for users repurposing text to long-form narration)",
    competition: "Medium (pictory.ai & fliki.ai target it)",
    gap: "Yes (only comparison pages exist, no feature landing page)",
    score: 22
  }
];

// OUTPUT GENERATION
let md = `# SEO Keyword Research Report: www.genbyghost.com
**Date:** August 30, 2026
**Target Audience:** Creators making long-form, faceless YouTube channels (history, true-crime, book summaries/exports).
**Goal:** Research competitors, extract targeting keywords, score/filter them, and propose a high-opportunity page mapping.

---

## 🛠️ Step 1 & 2: Observed Competitor Keyword Data

> [Spacer]

| Competitor Domain | Target Keyword | Source URL | Location | Search Intent | GenByGhost Page? |
| :--- | :--- | :--- | :--- | :--- | :--- |
${allKeywords.map(k => `| \`${k.competitor}\` | "${k.keyword}" | [Link](${k.url}) | ${k.loc} | ${k.intent} | ${k.hasPage} |`).join('\n')}

---

## 🔍 Step 3: Filtering & Scoring (Top Opportunities)

Keywords were scored based on:
1. **Relevance (Up to 10 points):** Focus on long-form (10min - 10hrs), documentary/sleep/history/true-crime, and text-to-narration. Drop avatars, dubbing, or short-form.
2. **Specificity (Up to 6 points):** Long-tail phrases (4+ words) are favored over head terms. "AI video generator" is explicitly excluded.
3. **Competition (Up to 15 points):** Fewer competitors targeting is better (15 - Competitor Count).
4. **Gap (10 points):** Does GenByGhost lack a page for it?

### Top Surviving Scored Keywords:
| Rank | Scored Keyword | Competitor | Competitors Targeting | Specificity (Words) | GenByGhost Gap? | Total Score |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
${scoredKeywords.slice(0, 15).map((k, index) => `| ${index + 1} | **"${k.keyword}"** | \`${k.competitor}\` | ${k.competitorCount} | ${k.wordCount} | ${k.hasPage.startsWith('Yes') ? 'No' : 'Yes'} | **${k.score}** |`).join('\n')}

---

## 📦 Step 4: Deduplicated Master Table (Clustered Topics)

To avoid page-level cannibalization, keywords are clustered into unified topic groups mapping to a single target page:

| Cluster / Topic Group | Primary Target Keyword (Long-Tail) | Supporting Keywords | Relevance to GenByGhost | Competitor Volume Signal |
| :--- | :--- | :--- | :--- | :--- |
${clusters.map(c => `| **${c.theme}** | \`${c.targetKeyword}\` | ${c.supporting.map(s => `"${s}"`).join(', ')} | ${c.relevance} | ${c.competition} |`).join('\n')}

---

## 🗺️ Step 5: Proposed Page Map

Here is the proposed page mapping for new pages to build on \`genbyghost.com\`.

| New Page Target | Target Keyword | Supporting Keywords | Proposed URL Slug | Proposed Title Tag | Internal Link Structure (To/From) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Documentary Landing** | \`create long-form videos in minutes with ai\` | "best ai video generator for long-form video content creation", "ai video generator for long form content" | \`/use-cases/create-long-form-videos-with-ai\` | \`Best AI Long-Form Video Generator: Create Videos in Minutes\` | Link to [\`/pricing\`](file:///c:/Users/Alishba/Desktop/tuber/app/pricing/page.tsx). Link from [\`/blog/long-form-content-youtube-algorithm\`](file:///c:/Users/Alishba/Desktop/tuber/lib/blog-posts.ts). |
| **Script Conversion Landing** | \`transform any script to video with ai\` | "turns text into professional videos", "intelligent script video maker", "generate videos from ideas scripts or stories" | \`/use-cases/transform-script-to-video-ai\` | \`Transform Script to Video with AI: Text-to-Video Generator\` | Link to [\`/how-it-works\`](file:///c:/Users/Alishba/Desktop/tuber/app/how-it-works/page.tsx). Link from [\`/use-cases/youtube-automation-script-writer\`](file:///c:/Users/Alishba/Desktop/tuber/lib/use-cases.ts). |
| **True Crime Niche Page** | \`true-crime documentary video generator\` | "true-crime video maker", "horror video maker", "biography video maker" | \`/use-cases/true-crime-documentary-video-generator\` | \`True Crime Documentary Video Generator: Automated AI Storytelling\` | Link to [\`/examples\`](file:///c:/Users/Alishba/Desktop/tuber/app/examples/page.tsx). Link from [\`/use-cases/automated-faceless-channel-ideas\`](file:///c:/Users/Alishba/Desktop/tuber/lib/use-cases.ts). |
| **Blog Repurposing Page** | \`convert blog post to video ai\` | "article to video ai generator", "turn text scripts blog posts into videos" | \`/use-cases/convert-blog-post-to-video-ai\` | \`Convert Blog Post to Video with AI: Article-to-Video Tool\` | Link to [\`/pricing\`](file:///c:/Users/Alishba/Desktop/tuber/app/pricing/page.tsx). Link from [\`/blog/genbyghost-vs-pictory\`](file:///c:/Users/Alishba/Desktop/tuber/lib/blog-posts.ts). |

---

## 🚫 Unverified Keywords (GenByGhost Unique Feature Opportunity)

> [!WARNING]
> These keywords could not be verified on competitor websites because no competitors currently offer illustrated PDF/EPUB book exports or up to 10-hour video generation.
> They are categorized as **UNVERIFIED — assumption** regarding standard competitive search metrics, but represent a massive feature-gap opportunity for GenByGhost.

1. **"convert youtube video to illustrated book"**
   - *Assumption:* High search intent for creators wanting to repurpose their channels into print/digital books.
   - *Intent:* Commercial / Transactional.
2. **"illustrated pdf epub book export from video"**
   - *Assumption:* Direct transactional term for users searching for this exact GenByGhost differentiator.
   - *Intent:* Transactional.
3. **"create 10 hour faceless videos with ai"**
   - *Assumption:* Targets creators making sleep or study-aid channel content who are blocked by other tools' 50-minute limits.
   - *Intent:* Commercial.
`;

const outputPath = 'C:\\Users\\Alishba\\.gemini\\antigravity-ide\\brain\\ae6ff96c-6706-4752-be57-544cb3561156\\seo_research_report.md';
fs.writeFileSync(outputPath, md);
console.log(`Report generated successfully at ${outputPath}`);
