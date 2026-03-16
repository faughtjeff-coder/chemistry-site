const https = require('https');
const fs = require('fs');
const path = require('path');

const reactions = [
  "the thermite reaction",
  "the iodine clock reaction",
  "chemiluminescence in glow sticks",
  "the Belousov-Zhabotinsky oscillating reaction",
  "copper electroplating",
  "the silver mirror reaction",
  "burning magnesium in air",
  "the reaction between sodium and water",
  "making nylon in a beaker",
  "the blue bottle reaction",
  "combustion of iron wool",
  "the briggs-rauscher reaction",
  "acid rain formation",
  "the rusting of iron",
  "catalytic decomposition of hydrogen peroxide"
];

const reaction = reactions[Math.floor(Math.random() * reactions.length)];
const slug = reaction.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').toLowerCase();

const prompt = `Write a chemistry article for high school students about this reaction: ${reaction}

Return ONLY a complete Astro page with this exact structure, no other text:

---
import Layout from '../../../layouts/Layout.astro';
---
<Layout title="REACTION_TITLE" description="BRIEF_DESCRIPTION">
  <style>
    .article-header { background: #3C3489; border-radius: 12px; padding: 2rem; margin-bottom: 2rem; }
    .tags { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
    .tag { font-size: 11px; padding: 3px 10px; border-radius: 999px; font-weight: 500; }
    .article-title { font-size: 28px; font-weight: 600; color: #EEEDFE; line-height: 1.3; margin-bottom: 10px; }
    .article-desc { font-size: 15px; color: #AFA9EC; line-height: 1.6; margin-bottom: 12px; }
    .meta { font-size: 13px; color: #7F77DD; }
    .video-wrapper { background: #1a1a2e; border-radius: 12px; aspect-ratio: 16/9; margin-bottom: 2rem; overflow: hidden; }
    .video-wrapper iframe { width: 100%; height: 100%; border: none; }
    .equation-box { background: #26215C; border-radius: 12px; padding: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 2rem; flex-wrap: wrap; }
    .eq-part { font-size: 18px; font-weight: 500; }
    .eq-arrow { font-size: 14px; color: #7F77DD; }
    .body-text { font-size: 16px; line-height: 1.8; color: #1a1a2e; margin-bottom: 1.5rem; }
    .callout { background: #f5f5f5; border-left: 3px solid #FAC775; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; }
    .callout-title { font-size: 14px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
    .callout-text { font-size: 14px; color: #555; line-height: 1.6; }
    .section-label { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .research-links { display: flex; flex-direction: column; gap: 8px; margin-bottom: 2rem; }
    .research-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 0.5px solid #e0e0e0; border-radius: 8px; text-decoration: none; color: inherit; }
    .research-link:hover { border-color: #AFA9EC; background: #f9f9ff; }
    .research-icon { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; }
    .research-title { font-size: 13px; font-weight: 500; color: #1a1a2e; }
    .research-source { font-size: 11px; color: #888; margin-top: 2px; }
    .research-arrow { margin-left: auto; color: #AFA9EC; font-size: 14px; }
    .topic-tags { display: flex; gap: 8px; flex-wrap: wrap; }
    .topic-tag { font-size: 12px; padding: 5px 12px; border-radius: 999px; }
  </style>

  <div class="article-header">
    <div class="tags">
      <span class="tag" style="background:#FAC775;color:#412402;">Reaction of the week</span>
      <span class="tag" style="background:#E1F5EE;color:#085041;">REACTION_TYPE</span>
      <span class="tag" style="background:#EEEDFE;color:#26215C;">LEVEL</span>
    </div>
    <h1 class="article-title">ENGAGING_TITLE</h1>
    <p class="article-desc">ENGAGING_DESCRIPTION</p>
    <div class="meta">8 min read · Includes video · 3 research links</div>
  </div>

  <div class="video-wrapper">
    <iframe src="YOUTUBE_EMBED_URL" title="VIDEO_TITLE" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>

  <div class="section-label">The reaction</div>
  <div class="equation-box">
    <span class="eq-part" style="color:#AFA9EC;">REACTANTS</span>
    <span class="eq-arrow">→</span>
    <span class="eq-part" style="color:#9FE1CB;">PRODUCTS</span>
  </div>

  <p class="body-text">PARAGRAPH_1</p>
  <p class="body-text">PARAGRAPH_2</p>

  <div class="callout">
    <div class="callout-title">KEY_CONCEPT_TITLE</div>
    <div class="callout-text">KEY_CONCEPT_EXPLANATION</div>
  </div>

  <p class="body-text">PARAGRAPH_3</p>

  <div class="section-label" style="margin-top:2rem;">Go deeper</div>
  <div class="research-links">
    <a href="REAL_URL_1" target="_blank" class="research-link">
      <div class="research-icon" style="background:#E6F1FB;">📄</div>
      <div>
        <div class="research-title">RESOURCE_TITLE_1</div>
        <div class="research-source">SOURCE_1</div>
      </div>
      <span class="research-arrow">→</span>
    </a>
    <a href="REAL_URL_2" target="_blank" class="research-link">
      <div class="research-icon" style="background:#E1F5EE;">📄</div>
      <div>
        <div class="research-title">RESOURCE_TITLE_2</div>
        <div class="research-source">SOURCE_2</div>
      </div>
      <span class="research-arrow">→</span>
    </a>
    <a href="REAL_URL_3" target="_blank" class="research-link">
      <div class="research-icon" style="background:#EEEDFE;">📄</div>
      <div>
        <div class="research-title">RESOURCE_TITLE_3</div>
        <div class="research-source">SOURCE_3</div>
      </div>
      <span class="research-arrow">→</span>
    </a>
  </div>

  <div class="section-label">Topics</div>
  <div class="topic-tags">
    <span class="topic-tag" style="background:#EEEDFE;color:#534AB7;">TOPIC_1</span>
    <span class="topic-tag" style="background:#E1F5EE;color:#085041;">TOPIC_2</span>
    <span class="topic-tag" style="background:#FAEEDA;color:#633806;">TOPIC_3</span>
  </div>
</Layout>

Fill in all placeholders with real content about ${reaction}. Use a real YouTube video URL from NileRed, Periodic Videos, or the Royal Institution. Use real research links from khanacademy.org, chem.libretexts.org, or pubs.acs.org.`;

const data = JSON.stringify({
  model: "claude-sonnet-4-20250514",
  max_tokens: 2000,
  messages: [{ role: "user", content: prompt }]
});

const options = {
  hostname: 'api.anthropic.com',
  path: '/v1/messages',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'Content-Length': Buffer.byteLength(data)
  }
};

const outputDir = path.join('src', 'pages', 'reactions', slug);
fs.mkdirSync(outputDir, { recursive: true });

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      console.log('API response status:', response.type);
      if (!response.content) {
        console.error('Error from API:', JSON.stringify(response, null, 2));
        process.exit(1);
      }
      let content = response.content[0].text;
      content = content.replace(/^```astro\n?/, '').replace(/```$/, '').trim();
      const filepath = path.join(outputDir, 'index.astro');
      fs.writeFileSync(filepath, content);
      console.log('Created:', filepath);
    } catch(e) {
      console.error('Parse error:', e);
      process.exit(1);
    }
  });
});

req.on('error', (e) => console.error('Request error:', e));
req.write(data);
req.end();
```