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
  "combustion of iron wool",
  "the briggs-rauscher reaction",
  "acid rain formation",
  "the rusting of iron",
  "catalytic decomposition of hydrogen peroxide",
  "the thermite reaction",
  "bioluminescence in fireflies",
  "the maillard reaction in cooking",
  "fermentation of glucose to ethanol"
];

const topics = [
  { topic: "atomic-structure", name: "atomic structure" },
  { topic: "bonding", name: "chemical bonding" },
  { topic: "reactions", name: "chemical reactions" },
  { topic: "acids-and-bases", name: "acids and bases" },
  { topic: "thermodynamics", name: "thermodynamics" },
  { topic: "organic-chemistry", name: "organic chemistry" },
  { topic: "periodic-table", name: "the periodic table" },
  { topic: "electrochemistry", name: "electrochemistry" }
];

const levels = ["Beginner", "General", "AP"];

const reaction = reactions[Math.floor(Math.random() * reactions.length)];
const reactionSlug = reaction.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').toLowerCase();
const topicObj = topics[Math.floor(Math.random() * topics.length)];
const level = levels[Math.floor(Math.random() * levels.length)];

function makeRequest(prompt, outputPath, label) {
  return new Promise((resolve, reject) => {
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

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (!response.content) {
            console.error(`Error from API for ${label}:`, JSON.stringify(response));
            reject(new Error('No content in response'));
            return;
          }
          let content = response.content[0].text;
          content = content.replace(/^```astro\n?/, '').replace(/```$/, '').trim();
          const dir = path.dirname(outputPath);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(outputPath, content);
          console.log(`Created: ${outputPath}`);
          resolve();
        } catch(e) {
          console.error(`Parse error for ${label}:`, e);
          reject(e);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

const reactionPrompt = `Write a chemistry article for high school students about this reaction: ${reaction}

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
    .equation-box { background: #26215C; border-radius: 12px; padding: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 2rem; flex-wrap: wrap; }
    .eq-part { font-size: 18px; font-weight: 500; }
    .eq-arrow { font-size: 14px; color: #7F77DD; }
    .body-text { font-size: 16px; line-height: 1.8; color: #1a1a2e; margin-bottom: 1.5rem; }
    .callout { background: #f5f5f5; border-left: 3px solid #FAC775; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; }
    .callout-title { font-size: 14px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
    .callout-text { font-size: 14px; color: #555; line-height: 1.6; }
    .section-label { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .video-link { display: block; background: #1a1a2e; border-radius: 12px; padding: 2rem; margin-bottom: 2rem; text-decoration: none; text-align: center; }
    .video-icon { font-size: 32px; margin-bottom: 8px; }
    .video-title { font-size: 16px; font-weight: 600; color: #EEEDFE; margin-bottom: 6px; }
    .video-subtitle { font-size: 13px; color: #AFA9EC; }
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
    </div>
    <h1 class="article-title">ENGAGING_TITLE</h1>
    <p class="article-desc">ENGAGING_DESCRIPTION</p>
    <div class="meta">8 min read · Includes video · 3 research links</div>
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

  <a href="YOUTUBE_SEARCH_URL" target="_blank" class="video-link">
    <div class="video-icon">▶</div>
    <div class="video-title">Watch on YouTube</div>
    <div class="video-subtitle">SEARCH_DESCRIPTION</div>
  </a>

  <div class="section-label">Go deeper</div>
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

Fill in all placeholders with real content about ${reaction}. For the YouTube link use a search URL like https://www.youtube.com/results?search_query=SEARCH+TERMS. Use real research links from khanacademy.org, chem.libretexts.org, or pubs.acs.org.`;

const topicPrompt = `Write a chemistry article for high school students about ${topicObj.name} at the ${level} level.

Return ONLY a complete Astro page with this exact structure, no other text:

---
import Layout from '../../../layouts/Layout.astro';
---
<Layout title="ARTICLE_TITLE" description="BRIEF_DESCRIPTION">
  <style>
    .article-header { background: #26215C; border-radius: 12px; padding: 2rem; margin-bottom: 2rem; }
    .tags { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
    .tag { font-size: 11px; padding: 3px 10px; border-radius: 999px; font-weight: 500; }
    .article-title { font-size: 28px; font-weight: 600; color: #EEEDFE; line-height: 1.3; margin-bottom: 10px; }
    .objective { background: #534AB7; border-radius: 8px; padding: 0.75rem 1rem; font-size: 14px; color: #EEEDFE; }
    .objective strong { color: #FAC775; }
    .vocab-box { background: #EEEDFE; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
    .vocab-title { font-size: 13px; font-weight: 600; color: #534AB7; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .vocab-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .vocab-item { background: white; border-radius: 8px; padding: 0.75rem 1rem; }
    .vocab-word { font-size: 14px; font-weight: 600; color: #26215C; margin-bottom: 3px; }
    .vocab-def { font-size: 13px; color: #555; line-height: 1.5; }
    .video-link { display: block; background: #1a1a2e; border-radius: 12px; padding: 2rem; margin-bottom: 2rem; text-decoration: none; text-align: center; }
    .video-icon { font-size: 32px; margin-bottom: 8px; }
    .video-title { font-size: 16px; font-weight: 600; color: #EEEDFE; margin-bottom: 6px; }
    .video-subtitle { font-size: 13px; color: #AFA9EC; }
    .facts-box { background: #f5f5f5; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
    .facts-title { font-size: 13px; font-weight: 600; color: #26215C; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .fact { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
    .fact-dot { width: 8px; height: 8px; border-radius: 50%; background: #534AB7; flex-shrink: 0; margin-top: 6px; }
    .fact-text { font-size: 15px; color: #1a1a2e; line-height: 1.6; }
    .fact-text strong { color: #26215C; }
    .summary-box { background: #534AB7; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
    .summary-title { font-size: 13px; font-weight: 600; color: #FAC775; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
    .summary-text { font-size: 15px; color: #EEEDFE; line-height: 1.7; }
    .topic-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 2rem; }
    .topic-tag { font-size: 12px; padding: 5px 12px; border-radius: 999px; }
  </style>

  <div class="article-header">
    <div class="tags">
      <span class="tag" style="background:#FAEEDA;color:#412402;">${level}</span>
      <span class="tag" style="background:#EEEDFE;color:#26215C;">TOPIC_NAME</span>
    </div>
    <h1 class="article-title">ARTICLE_TITLE</h1>
    <div class="objective"><strong>Learning objective:</strong> CLEAR_LEARNING_OBJECTIVE</div>
  </div>

  <div class="vocab-box">
    <div class="vocab-title">Key vocabulary</div>
    <div class="vocab-grid">
      <div class="vocab-item"><div class="vocab-word">WORD_1</div><div class="vocab-def">DEFINITION_1</div></div>
      <div class="vocab-item"><div class="vocab-word">WORD_2</div><div class="vocab-def">DEFINITION_2</div></div>
      <div class="vocab-item"><div class="vocab-word">WORD_3</div><div class="vocab-def">DEFINITION_3</div></div>
      <div class="vocab-item"><div class="vocab-word">WORD_4</div><div class="vocab-def">DEFINITION_4</div></div>
      <div class="vocab-item"><div class="vocab-word">WORD_5</div><div class="vocab-def">DEFINITION_5</div></div>
      <div class="vocab-item"><div class="vocab-word">WORD_6</div><div class="vocab-def">DEFINITION_6</div></div>
    </div>
  </div>

  <a href="YOUTUBE_SEARCH_URL" target="_blank" class="video-link">
    <div class="video-icon">▶</div>
    <div class="video-title">Watch on YouTube</div>
    <div class="video-subtitle">SEARCH_DESCRIPTION</div>
  </a>

  <div class="facts-box">
    <div class="facts-title">Key facts</div>
    <div class="fact"><div class="fact-dot"></div><div class="fact-text">FACT_1</div></div>
    <div class="fact"><div class="fact-dot"></div><div class="fact-text">FACT_2</div></div>
    <div class="fact"><div class="fact-dot"></div><div class="fact-text">FACT_3</div></div>
    <div class="fact"><div class="fact-dot"></div><div class="fact-text">FACT_4</div></div>
    <div class="fact"><div class="fact-dot"></div><div class="fact-text">FACT_5</div></div>
  </div>

  <div class="summary-box">
    <div class="summary-title">Summary</div>
    <div class="summary-text">SUMMARY_3_SENTENCES</div>
  </div>

  <div class="topic-tags">
    <span class="topic-tag" style="background:#EEEDFE;color:#534AB7;">TOPIC_TAG_1</span>
    <span class="topic-tag" style="background:#FAEEDA;color:#633806;">TOPIC_TAG_2</span>
    <span class="topic-tag" style="background:#E1F5EE;color:#085041;">TOPIC_TAG_3</span>
  </div>
</Layout>

Write a clear, engaging article about ${topicObj.name} at ${level} level. Use simple plain English suitable for EAL students. For the YouTube link use a search URL like https://www.youtube.com/results?search_query=SEARCH+TERMS. Fill in all placeholders with real educational content.`;

const quizPrompt = `Write an interactive chemistry quiz for high school students about ${topicObj.name} at the ${level} level with 5 multiple choice questions.

Return ONLY a complete Astro page with this exact structure, no other text:

---
import Layout from '../../../layouts/Layout.astro';
---
<Layout title="QUIZ_TITLE" description="BRIEF_DESCRIPTION">
  <style>
    .quiz-header { background: #26215C; border-radius: 12px; padding: 2rem; margin-bottom: 2rem; }
    .quiz-title { font-size: 26px; font-weight: 600; color: #EEEDFE; margin-bottom: 8px; }
    .quiz-meta { font-size: 14px; color: #AFA9EC; }
    .question-box { background: white; border-radius: 12px; border: 0.5px solid #e0e0e0; padding: 2rem; margin-bottom: 1.5rem; display: none; }
    .question-box.active { display: block; }
    .question-number { font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
    .question-text { font-size: 18px; font-weight: 500; color: #1a1a2e; margin-bottom: 1.5rem; line-height: 1.5; }
    .options { display: flex; flex-direction: column; gap: 10px; }
    .option { background: #f5f5f5; border: 2px solid transparent; border-radius: 8px; padding: 12px 16px; font-size: 15px; color: #1a1a2e; cursor: pointer; text-align: left; font-family: inherit; }
    .option:hover:not(:disabled) { border-color: #AFA9EC; }
    .option.correct { background: #E1F5EE; border-color: #085041; color: #085041; }
    .option.wrong { background: #FAECE7; border-color: #712B13; color: #712B13; }
    .option.reveal { background: #E1F5EE; border-color: #085041; color: #085041; }
    .feedback { margin-top: 1rem; padding: 0.75rem 1rem; border-radius: 8px; font-size: 14px; display: none; line-height: 1.5; }
    .feedback.show { display: block; }
    .feedback.correct { background: #E1F5EE; color: #085041; }
    .feedback.wrong { background: #FAECE7; color: #712B13; }
    .next-btn { margin-top: 1rem; background: #534AB7; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-size: 15px; cursor: pointer; font-family: inherit; display: none; }
    .next-btn.show { display: block; }
    .progress { background: #f5f5f5; border-radius: 999px; height: 8px; margin-bottom: 2rem; overflow: hidden; }
    .progress-bar { background: #534AB7; height: 100%; border-radius: 999px; transition: width 0.3s; }
    .score-box { background: #26215C; border-radius: 12px; padding: 2rem; text-align: center; display: none; }
    .score-box.show { display: block; }
    .score-title { font-size: 22px; font-weight: 600; color: #EEEDFE; margin-bottom: 8px; }
    .score-value { font-size: 48px; font-weight: 600; color: #FAC775; margin-bottom: 8px; }
    .score-message { font-size: 15px; color: #AFA9EC; margin-bottom: 1.5rem; }
    .retry-btn { background: #534AB7; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-size: 15px; cursor: pointer; font-family: inherit; }
  </style>

  <div class="quiz-header">
    <h1 class="quiz-title">QUIZ_TITLE</h1>
    <div class="quiz-meta">5 questions · Multiple choice · Instant feedback</div>
  </div>

  <div class="progress"><div class="progress-bar" id="progress-bar" style="width:0%"></div></div>
  <div id="quiz-container"></div>
  <div class="score-box" id="score-box">
    <div class="score-title">Quiz complete!</div>
    <div class="score-value" id="score-value"></div>
    <div class="score-message" id="score-message"></div>
    <button class="retry-btn" id="retry-btn">Try again</button>
  </div>

  <script>
    const questions = QUESTIONS_JSON_ARRAY;

    let score = 0;
    let current = 0;
    let answered = false;

    function buildQuestion(index) {
      const q = questions[index];
      const div = document.createElement('div');
      div.className = 'question-box active';
      div.id = 'question-box';
      div.innerHTML = \`
        <div class="question-number">Question \${index + 1} of \${questions.length}</div>
        <div class="question-text">\${q.text}</div>
        <div class="options" id="options-box">
          \${q.options.map((opt, i) => \`<button class="option" data-index="\${i}">\${opt}</button>\`).join('')}
        </div>
        <div class="feedback" id="feedback-box"></div>
        <button class="next-btn" id="next-btn">\${index === questions.length - 1 ? 'See my score →' : 'Next question →'}</button>
      \`;
      return div;
    }

    function showQuestion(index) {
      answered = false;
      const container = document.getElementById('quiz-container');
      container.innerHTML = '';
      const qDiv = buildQuestion(index);
      container.appendChild(qDiv);
      document.getElementById('options-box').querySelectorAll('.option').forEach(btn => {
        btn.addEventListener('click', function() {
          if (answered) return;
          answered = true;
          const chosen = parseInt(this.dataset.index);
          const correct = questions[index].correct;
          const allOptions = document.getElementById('options-box').querySelectorAll('.option');
          allOptions.forEach(b => b.disabled = true);
          const fb = document.getElementById('feedback-box');
          if (chosen === correct) {
            this.classList.add('correct');
            fb.textContent = questions[index].feedback.correct;
            fb.className = 'feedback show correct';
            score++;
          } else {
            this.classList.add('wrong');
            allOptions[correct].classList.add('reveal');
            fb.textContent = questions[index].feedback.wrong;
            fb.className = 'feedback show wrong';
          }
          document.getElementById('next-btn').classList.add('show');
          document.getElementById('progress-bar').style.width = ((index + 1) / questions.length * 100) + '%';
        });
      });
      document.getElementById('next-btn').addEventListener('click', function() {
        if (index === questions.length - 1) { showScore(); } else { current++; showQuestion(current); }
      });
    }

    function showScore() {
      document.getElementById('quiz-container').innerHTML = '';
      const scoreBox = document.getElementById('score-box');
      scoreBox.classList.add('show');
      document.getElementById('score-value').textContent = score + '/' + questions.length;
      const pct = score / questions.length;
      let msg = pct === 1 ? 'Perfect score!' : pct >= 0.8 ? 'Excellent work!' : pct >= 0.6 ? 'Good work! Review a few topics.' : 'Keep practicing! Read the article and try again.';
      document.getElementById('score-message').textContent = msg;
    }

    document.getElementById('retry-btn').addEventListener('click', function() {
      score = 0; current = 0;
      document.getElementById('score-box').classList.remove('show');
      document.getElementById('progress-bar').style.width = '0%';
      showQuestion(0);
    });

    showQuestion(0);
  </script>
</Layout>

Replace QUESTIONS_JSON_ARRAY with a real JavaScript array of 5 question objects. Each object must have: text (string), options (array of 4 strings), correct (index number 0-3), feedback (object with correct and wrong strings). Write questions about ${topicObj.name} at ${level} level. Replace QUIZ_TITLE with a descriptive title. Fill all placeholders with real content.`;

async function run() {
  const reactionDir = path.join('src', 'pages', 'reactions', reactionSlug);
  const reactionPath = path.join(reactionDir, 'index.astro');

  const articleTitle = topicObj.name.replace(/\s+/g, '-').toLowerCase() + '-' + level.toLowerCase() + '-' + Date.now();
  const articleSlug = articleTitle.replace(/[^a-z0-9-]/g, '');
  const topicPath = path.join('src', 'pages', 'topics', topicObj.topic, articleSlug + '.astro');

  const quizSlug = topicObj.topic + '-' + level.toLowerCase() + '-' + Date.now();
  const quizDir = path.join('src', 'pages', 'quizzes', quizSlug);
  const quizPath = path.join(quizDir, 'index.astro');

  console.log(`Generating reaction: ${reaction}`);
  await makeRequest(reactionPrompt, reactionPath, 'reaction');

  console.log(`Generating topic article: ${topicObj.name} (${level})`);
  await makeRequest(topicPrompt, topicPath, 'topic article');

  console.log(`Generating quiz: ${topicObj.name} (${level})`);
  await makeRequest(quizPrompt, quizPath, 'quiz');

  console.log('All content generated successfully!');
}

run().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
