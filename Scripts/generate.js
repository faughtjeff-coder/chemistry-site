const https = require('https');
const fs = require('fs');
const path = require('path');

const topics = [
  "mitosis and meiosis",
  "ionic and covalent bonds",
  "the periodic table",
  "acids and bases",
  "photosynthesis",
  "atomic structure",
  "chemical reactions",
  "the mole concept"
];

const topic = topics[Math.floor(Math.random() * topics.length)];

const prompt = `Write a clear, engaging chemistry article for high school students about: ${topic}.
Format it as a complete Astro page using this exact structure:

---
title: "Article Title Here"
---
<html>
  <head><title>Article Title Here</title></head>
  <body>
    <h1>Article Title Here</h1>
    <p>Introduction paragraph here.</p>
    <h2>Section 1</h2>
    <p>Content here.</p>
    <h2>Section 2</h2>
    <p>Content here.</p>
  </body>
</html>

Return only the Astro page content, nothing else.`;

const data = JSON.stringify({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1000,
  messages: [{ role: "user", content: prompt }]
});

const options = {
  hostname: 'api.anthropic.com',
  path: '/v1/messages',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const response = JSON.parse(body);
    const content = response.content[0].text;
    const filename = topic.replace(/\s+/g, '-').toLowerCase() + '.astro';
    const filepath = path.join('src', 'pages', 'articles', filename);
    fs.writeFileSync(filepath, content);
    console.log(`Created: ${filepath}`);
  });
});

req.on('error', (e) => console.error('Error:', e));
req.write(data);
req.end();