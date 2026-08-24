export interface UseCase {
  slug: string;
  title: string;
  nicheName: string;
  intro: string;
  metaDescription: string;
  whyItWorks: string;
  examplePrompt: string;
  exampleTopics: string[];
  valueProps: { title: string; body: string }[];
}

export const useCases: UseCase[] = [
  {
    slug: 'faceless-history-video-generator',
    title: 'Faceless History Video Generator',
    nicheName: 'History',
    intro: 'History is one of the most durable faceless YouTube niches — an effectively infinite supply of source material, an audience that skews older and more valuable to advertisers, and stories that naturally sustain hour-long runtimes without losing viewers.',
    metaDescription: 'Turn any historical topic into a scripted, narrated documentary video with GenByGhost — built for faceless history channels.',
    whyItWorks: 'Unlike trend-driven niches, history content doesn\'t expire. A well-made video about the fall of Rome performs the same in year three as it does in week one, which means every video you generate keeps compounding views instead of fading out.',
    examplePrompt: '"The fall of Constantinople, told from the perspective of a soldier defending the walls — focus on the final 24 hours before the city fell."',
    exampleTopics: [
      'The rise and collapse of the Mongol Empire',
      'How the Black Death reshaped medieval Europe',
      'The last days of the Romanov dynasty',
      'The untold story of the Berlin Airlift',
    ],
    valueProps: [
      { title: 'Automated Scripting', body: 'GenByGhost researches and structures a chaptered, narration-ready script for any historical period or event, with accurate pacing built for long-form retention.' },
      { title: 'Cinematic Narration', body: 'Pair your history videos with natural, expressive AI voice narration suited to documentary-style storytelling.' },
      { title: 'Autopilot Scheduling', body: 'Generate a batch of history videos and sync them to a recurring upload schedule, so your channel publishes consistently without manual work.' },
    ],
  },
  {
    slug: 'automated-book-summary-videos',
    title: 'Automated Book Summary Videos',
    nicheName: 'Book Summaries',
    intro: 'Book summary channels have a built-in, never-ending content calendar — every bestseller list, business book, or self-help release is a new video idea, and the audience is actively searching for exactly this kind of content.',
    metaDescription: 'Turn any book into a scripted, narrated summary video with GenByGhost — built for faceless book-summary YouTube channels.',
    whyItWorks: 'Viewers come to book summary videos to learn, which means they tend to watch longer, engage more in comments, and convert well into newsletter subscribers or product buyers if you build a funnel around the channel.',
    examplePrompt: '"A complete breakdown of Atomic Habits by James Clear — the four laws of behavior change, with practical examples for each."',
    exampleTopics: [
      'Atomic Habits — the complete framework, explained',
      'The Psychology of Money — key lessons on wealth and behavior',
      'Deep Work — how to reclaim focus in a distracted world',
      'The 48 Laws of Power — summarized and explained',
    ],
    valueProps: [
      { title: 'Automated Scripting', body: 'GenByGhost turns a book\'s core ideas into a structured, chaptered script that hits the key takeaways without meandering.' },
      { title: 'Cinematic Narration', body: 'Clear, engaging AI narration keeps dense non-fiction content easy to follow at any length.' },
      { title: 'Autopilot Scheduling', body: 'Queue up an entire reading list and let GenByGhost generate and publish summaries on a set schedule.' },
    ],
  },
  {
    slug: 'best-ai-tool-for-long-form-youtube-videos',
    title: 'Best AI Tool for Long-Form YouTube Videos',
    nicheName: 'Long-Form YouTube',
    intro: 'Most "AI video generator" tools are built for 30-second clips and social ads. Long-form YouTube — the 10-minute to 10-hour range that actually drives watch time and ad revenue — needs a fundamentally different pipeline, one that can sustain pacing, structure, and visual variety across a much longer runtime.',
    metaDescription: 'GenByGhost is built for true long-form YouTube video, from 10 minutes to 10 hours — not 30-second AI clips.',
    whyItWorks: 'YouTube\'s recommendation system rewards total watch time and session duration. A single well-paced long-form video contributes more to both than a dozen short clips, which is why long-form-first tools have a structural advantage on the platform.',
    examplePrompt: '"A 2-hour documentary covering the complete history of the Roman Empire, from founding to collapse, structured in clear chapters."',
    exampleTopics: [
      'What actually separates a long-form AI tool from a short-clip generator',
      'How to structure a 90-minute AI-generated documentary',
      'Why watch time matters more than click-through rate',
      'Choosing the right AI voice for hours-long narration',
    ],
    valueProps: [
      { title: 'Built for Duration', body: 'GenByGhost\'s pipeline researches and outlines a full script before generating a single frame, so pacing holds up whether the video is 10 minutes or 10 hours.' },
      { title: 'Consistent Narration', body: 'AI voice narration engineered to stay natural and engaging across long runtimes, not just short clips.' },
      { title: 'Autopilot Scheduling', body: 'Generate and publish full-length videos on a recurring schedule without touching a timeline editor.' },
    ],
  },
  {
    slug: 'how-to-create-a-faceless-history-channel',
    title: 'How to Create a Faceless History Channel',
    nicheName: 'Faceless History Channel',
    intro: 'Starting a faceless history channel means solving three problems at once: consistent research and scriptwriting, narration that holds attention for an hour or more, and a publishing cadence you can actually sustain — without ever appearing on camera.',
    metaDescription: 'A step-by-step guide to launching a faceless history YouTube channel using GenByGhost\'s research, script, and narration pipeline.',
    whyItWorks: 'History channels succeed on consistency more than virality. A channel that reliably publishes one solid documentary a week builds algorithmic trust faster than one that posts sporadically, even if individual videos perform well.',
    examplePrompt: '"Launch a channel focused on ancient civilizations — first video: the construction and mystery of the Great Pyramid of Giza."',
    exampleTopics: [
      'Pick a sub-niche: ancient civilizations, world wars, or royal history',
      'Plan your first 10 video topics before you publish anything',
      'Settle on one consistent narrator voice for channel identity',
      'Build a weekly (not daily) publishing cadence you can sustain',
    ],
    valueProps: [
      { title: 'Full Channel Pipeline', body: 'GenByGhost handles topic research, scripting, narration, and visuals in one pass, so starting a channel doesn\'t require assembling five different tools.' },
      { title: 'Consistent Identity', body: 'Choose one narrator voice and visual style to keep across every video, building a recognizable channel identity from video one.' },
      { title: 'Autopilot Scheduling', body: 'Set a realistic weekly upload schedule and let GenByGhost keep the channel active without daily manual work.' },
    ],
  },
  {
    slug: 'generate-automated-documentaries-with-ai',
    title: 'Generate Automated Documentaries with AI',
    nicheName: 'Documentaries',
    intro: 'Documentary-style storytelling works across far more niches than just history — true crime, science, nature, business, and biography all follow the same narrative structure: a clear arc, escalating stakes, and a satisfying resolution.',
    metaDescription: 'Generate automated, narrated documentaries on any topic with GenByGhost — research, script, visuals, and publishing included.',
    whyItWorks: 'The documentary format is built for retention by design — a mystery or arc that unfolds over the runtime naturally keeps viewers watching to see how it resolves, which is exactly what YouTube\'s algorithm rewards.',
    examplePrompt: '"A documentary-style investigation into the collapse of a major company, structured as a mystery with a clear timeline of events."',
    exampleTopics: [
      'The unsolved mystery behind a famous cold case',
      'How a major corporation rose and then collapsed',
      'The science behind a natural disaster, explained cinematically',
      'The biography of a historical figure, told as a character arc',
    ],
    valueProps: [
      { title: 'Narrative Structure', body: 'GenByGhost scripts documentaries with a real arc — setup, escalation, resolution — instead of a flat list of facts.' },
      { title: 'Scene-Matched Visuals', body: 'Visuals generated to match each beat of the story, keeping pacing cinematic rather than static.' },
      { title: 'Autopilot Scheduling', body: 'Produce a documentary series and publish new episodes automatically on a set schedule.' },
    ],
  },
  {
    slug: 'automated-faceless-channel-ideas',
    title: 'Automated Faceless Channel Ideas',
    nicheName: 'Faceless Channel Ideas',
    intro: 'The best faceless channel ideas share three traits: a topic with effectively unlimited source material, a format that supports long watch times, and a niche narrow enough to build a recognizable audience without running dry on content within a few months.',
    metaDescription: 'Explore faceless YouTube channel ideas and let GenByGhost script, narrate, and produce the videos for you.',
    whyItWorks: 'Channels that pick niches requiring constant "fresh" input (trending news, viral events) burn out fast. Evergreen niches — history, true crime, book summaries, sleep content, finance — can be batch-produced indefinitely.',
    examplePrompt: '"Give me a full year of video topic ideas for a faceless true crime channel, ranked by likely audience interest."',
    exampleTopics: [
      'History & documentary-style storytelling',
      'True crime and unsolved mysteries',
      'Book and business summaries',
      'Long-form sleep and ambient storytelling',
    ],
    valueProps: [
      { title: 'Topic Research', body: 'GenByGhost helps generate and script video ideas within a chosen niche, not just produce one video at a time.' },
      { title: 'Format Flexibility', body: 'Supports documentary, explainer, true crime, sleep story, and book summary formats out of the box.' },
      { title: 'Autopilot Scheduling', body: 'Batch-produce a channel\'s worth of content and publish it on a predictable, automated schedule.' },
    ],
  },
  {
    slug: 'scary-stories-video-generator',
    title: 'Scary Stories Video Generator',
    nicheName: 'Scary Stories',
    intro: 'Horror and scary-story content is one of the highest-retention formats on YouTube — the tension of "what happens next" keeps viewers locked in for the full runtime, and the format works at both 20 minutes and 3 hours.',
    metaDescription: 'Generate narrated scary story videos with GenByGhost — tension-paced scripts and atmospheric AI narration for horror channels.',
    whyItWorks: 'Scary stories rely on pacing and voice performance more than visuals, which makes them especially well-suited to AI narration — a steady, controlled delivery often builds tension more effectively than an inconsistent human read.',
    examplePrompt: '"A collection of true unsolved disappearances in national parks, narrated in a slow-building, unsettling tone."',
    exampleTopics: [
      'Real unsolved disappearances, told as a slow-burn narrative',
      'Creepy urban legends investigated and debunked',
      'True horror stories from Reddit, narrated cinematically',
      'A multi-hour horror story compilation for late-night viewing',
    ],
    valueProps: [
      { title: 'Tension-Paced Scripting', body: 'GenByGhost structures scary stories with deliberate pacing — slow builds, reveals, and quiet moments — instead of rushing through events.' },
      { title: 'Atmospheric Narration', body: 'Choose a voice and delivery style suited to building tension over a long runtime.' },
      { title: 'Autopilot Scheduling', body: 'Publish a steady stream of horror content without recording a single word yourself.' },
    ],
  },
  {
    slug: 'luxury-lifestyle-shorts-generator',
    title: 'Luxury Lifestyle Shorts Generator',
    nicheName: 'Luxury Lifestyle Shorts',
    intro: 'Luxury lifestyle content — cars, real estate, travel, high-end fashion — performs exceptionally well in short vertical formats, where fast visual payoff matters more than narrative depth, and it attracts some of the highest-value advertisers on the platform.',
    metaDescription: 'Generate short-form luxury lifestyle videos with GenByGhost — vertical, high-energy content ready to publish.',
    whyItWorks: 'Short-form luxury content spreads through the algorithm on sheer visual appeal and aspirational value, making it one of the fastest formats to build initial reach with, even from a brand-new channel.',
    examplePrompt: '"A 45-second vertical video showcasing the world\'s most exclusive supercars, with punchy facts and a driving beat."',
    exampleTopics: [
      'The world\'s most exclusive supercars, ranked',
      'Inside the most expensive penthouses on the market',
      'Luxury watches worth more than most houses',
      'A day-in-the-life concept for an ultra-wealthy lifestyle',
    ],
    valueProps: [
      { title: 'Vertical-First Generation', body: 'GenByGhost supports the 9:16 Shorts format for fast, punchy luxury content built for mobile feeds.' },
      { title: 'High-Energy Narration', body: 'Choose a confident, energetic voice suited to fast-paced lifestyle content.' },
      { title: 'Autopilot Scheduling', body: 'Publish a steady stream of short-form luxury content without any filming or editing.' },
    ],
  },
  {
    slug: 'automated-news-video-creator',
    title: 'Automated News Video Creator',
    nicheName: 'News Recap',
    intro: 'News recap and commentary channels turn public-domain events and published reporting into narrated video summaries — useful for explainer-style breakdowns of ongoing stories, though accuracy and sourcing matter more here than in any other niche.',
    metaDescription: 'Generate narrated news recap videos with GenByGhost — clear, explainer-style scripts sourced from public reporting.',
    whyItWorks: 'Viewers turn to recap-style channels for a fast, digestible summary of a topic they\'ve already heard about elsewhere — which rewards clarity and structure over speed of publishing.',
    examplePrompt: '"An explainer-style breakdown of a major economic policy change and its likely effects, sourced from public reporting."',
    exampleTopics: [
      'Weekly explainer recaps of major public events',
      'Breaking down a policy change and its real-world effects',
      'Context-driven explainers on ongoing global stories',
      'Business and market news, summarized for a general audience',
    ],
    valueProps: [
      { title: 'Explainer Scripting', body: 'GenByGhost structures news recap scripts for clarity — context, key facts, and implications — rather than raw headlines.' },
      { title: 'Clear, Neutral Narration', body: 'A steady, professional voice suited to explainer and recap-style content.' },
      { title: 'Autopilot Scheduling', body: 'Publish recap content on a consistent schedule that matches your topic\'s news cycle.' },
    ],
  },
  {
    slug: 'youtube-automation-script-writer',
    title: 'YouTube Automation Script Writer',
    nicheName: 'Script Writing',
    intro: 'Scriptwriting is the bottleneck most creators hit first — research, structure, and pacing take longer than any other part of production, which is why an AI scriptwriter alone (even before touching voice or visuals) can be the single highest-leverage automation in a YouTube workflow.',
    metaDescription: 'Generate a chaptered, narration-ready YouTube script from one prompt with GenByGhost — use it standalone or in the full pipeline.',
    whyItWorks: 'A well-structured script determines retention more than any other factor in the video — good visuals can\'t save a meandering script, but a tightly paced script can carry even simple visuals.',
    examplePrompt: '"Write a chaptered, narration-ready script for a 30-minute explainer on how the stock market actually works, for a beginner audience."',
    exampleTopics: [
      'Turning a one-line topic idea into a full chaptered script',
      'Structuring a script for maximum retention on YouTube',
      'Writing hooks that stop the scroll in the first 15 seconds',
      'Pacing a script for a 2-hour documentary versus a 10-minute explainer',
    ],
    valueProps: [
      { title: 'Chaptered Scripting', body: 'GenByGhost generates a fully structured, narration-ready script from a single topic prompt — no outlining required.' },
      { title: 'Retention-First Pacing', body: 'Scripts are structured around hooks, pacing, and chapter breaks proven to hold attention on YouTube.' },
      { title: 'Use Scripts Standalone or Full Pipeline', body: 'Generate just a script, or let it flow straight into voice, visuals, and publishing — your choice.' },
    ],
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}
