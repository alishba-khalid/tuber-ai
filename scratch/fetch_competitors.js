const fs = require('fs');
const path = require('path');

const competitors = [
  'invideo.io', 'pictory.ai', 'fliki.ai', 'synthesia.io', 'heygen.com',
  'descript.com', 'runwayml.com', 'capcut.com', 'veed.io', 'autoshorts.ai',
  'higgsfield.ai', 'mootion.com', 'videollama.co', 'storyshort.ai', 'magiclight.ai'
];

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) return { error: `HTTP status ${res.status}` };
    const html = await res.text();
    return { html, status: res.status };
  } catch (e) {
    return { error: e.message };
  }
}

function parseMetadata(html) {
  const result = {
    title: '',
    description: '',
    h1s: [],
    links: []
  };

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    result.title = titleMatch[1].trim();
  }

  // Meta Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i) ||
                    html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
  if (descMatch) {
    result.description = descMatch[1].trim();
  } else {
    // try og:description
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["']/i);
    if (ogDescMatch) {
      result.description = ogDescMatch[1].trim();
    }
  }

  // H1s
  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  let match;
  while ((match = h1Regex.exec(html)) !== null) {
    // Strip HTML tags inside H1
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    if (text && !result.h1s.includes(text)) {
      result.h1s.push(text);
    }
  }

  // Links
  const linkRegex = /href=["'](https?:\/\/[^"']+|(?:\/[a-zA-Z0-9\-_./]+))["']/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    const link = match[1];
    if (!result.links.includes(link)) {
      result.links.push(link);
    }
  }

  return result;
}

async function main() {
  const results = {};
  for (const comp of competitors) {
    console.log(`Fetching homepage for ${comp}...`);
    const protocol = 'https://';
    const host = comp.startsWith('http') ? comp : protocol + comp;
    
    const homepageRes = await fetchPage(host);
    if (homepageRes.error) {
      console.log(`Failed to fetch ${comp}: ${homepageRes.error}`);
      results[comp] = { error: homepageRes.error };
      continue;
    }

    const meta = parseMetadata(homepageRes.html);
    console.log(`Found Title: "${meta.title}" for ${comp}`);
    console.log(`Found Description: "${meta.description.substring(0, 80)}..."`);
    console.log(`Found H1s: ${meta.h1s.join(' | ')}`);

    results[comp] = {
      homepageUrl: host,
      title: meta.title,
      description: meta.description,
      h1s: meta.h1s,
      topLinks: meta.links.filter(l => {
        // filter internal links and clean them
        if (l.startsWith('/') && l.length > 1 && !l.includes('.') && !l.startsWith('//')) {
          return true;
        }
        if (l.includes(comp) && !l.endsWith(comp) && !l.includes('#')) {
          return true;
        }
        return false;
      }).slice(0, 15) // take top 15 internal links to inspect pages
    };

    // Let's fetch the first 2 relevant links (like pricing, features, about) to find more H1s and keywords
    const subPages = results[comp].topLinks.slice(0, 4);
    results[comp].subPagesData = [];

    for (const link of subPages) {
      let pageUrl = link;
      if (link.startsWith('/')) {
        pageUrl = host + link;
      }
      console.log(`  Fetching sub-page: ${pageUrl}...`);
      const subRes = await fetchPage(pageUrl);
      if (!subRes.error) {
        const subMeta = parseMetadata(subRes.html);
        results[comp].subPagesData.push({
          url: pageUrl,
          title: subMeta.title,
          description: subMeta.description,
          h1s: subMeta.h1s
        });
      }
    }
  }

  const outputPath = path.join(__dirname, 'competitor_seo_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Scraping complete. Results written to ${outputPath}`);
}

main();
