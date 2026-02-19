# Portfolio Refresh PRD — Ashtone Onyango
**Version:** 2.0 (Surgical Revision)
**Scope:** Color palette · Typography · Content rewrites · Micro-improvements
**NOT in scope:** Site structure, navigation, section order, chatbot, layout

---

## What We're Fixing (and Only This)

The existing site structure is good — the sections, the navigation, the chatbot, the scroll behavior, the layout — all stay exactly as they are. The problems are:

1. **Colors** look AI-generated (purple-to-pink gradients everywhere)
2. **Content** reads as generic and unspecific — could belong to any AI engineer
3. **Typography** lacks hierarchy and personality

Everything else stays. This is a reskin and content refresh, not a rebuild.

---

## 1. Color System — Replace Gradients, Keep the Dark Theme

The site's dark base is actually an asset. Keep it. What goes is the purple/pink gradient family applied to backgrounds, stats bars, card headers, and buttons.

### 1.1 New CSS Variables (replace existing color tokens)

```css
:root {
  /* Core backgrounds — keep the dark feel, remove purple tint */
  --color-bg:           #0D0F14;   /* Slightly blue-tinted near-black — feels technical */
  --color-surface:      #141720;   /* Cards, nav, sections */
  --color-surface-2:    #1C2030;   /* Elevated cards, hover states */
  --color-border:       #252A3A;   /* Subtle borders */
  --color-border-light: #303650;   /* Visible borders on hover */

  /* Text — keep the white text, warm it slightly */
  --color-text:         #E8EAF0;   /* Primary — warm white, not harsh */
  --color-text-muted:   #7A8299;   /* Secondary labels */
  --color-text-dim:     #4A5268;   /* Placeholder, disabled */

  /* Accent — replace ALL purple/pink with this single teal-cyan */
  --color-accent:       #00C9A7;   /* Bright teal — the ONLY accent color */
  --color-accent-dim:   rgba(0, 201, 167, 0.1);  /* Tint backgrounds */
  --color-accent-glow:  rgba(0, 201, 167, 0.25); /* Shadows, glows */

  /* Stat/metric highlight */
  --color-stat:         #00C9A7;   /* Same as accent — consistent */

  /* Remove entirely: all purple (#7c3aed, #6d28d9, #8b5cf6, #a78bfa),
     all pink (#ec4899, #db2777, #c026d3), all gradient combinations thereof */
}
```

### 1.2 Gradient Replacements

**Kill every instance of these gradient patterns:**
```css
/* DELETE all of these */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: linear-gradient(to right, #7c3aed, #db2777);
background: linear-gradient(90deg, purple, pink);
/* ...and any variation in the purple/violet/pink family */
```

**Replace stat/metrics banner** (currently a purple-to-pink gradient strip) **with:**
```css
.stats-banner {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  /* No gradient. Clean dark surface. Numbers pop with accent color. */
}
.stats-banner .stat-number {
  color: var(--color-accent);
}
```

**Replace active nav pill** (currently a purple filled pill) **with:**
```css
.nav-item.active {
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent);
  border-radius: 6px;
  color: var(--color-accent);
}
```

**Replace primary buttons** (currently purple gradient) **with:**
```css
.btn-primary {
  background: var(--color-accent);
  color: #0D0F14;  /* Dark text on teal background */
  border: none;
  font-weight: 600;
}
.btn-primary:hover {
  background: #00E5BF;  /* Slightly lighter teal on hover */
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-border-light);
  color: var(--color-text);
}
.btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

**Replace client/project cards** (currently green, purple, blue random gradient backgrounds) **with:**
```css
.client-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color 0.2s, transform 0.2s;
}
.client-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}
/* Left accent bar on hover — replaces the colored gradient headers */
.client-card:hover {
  box-shadow: inset 3px 0 0 var(--color-accent);
}
```

**Replace philosophy/expertise cards** (currently white cards on light bg) **with:**
```css
.expertise-card, .philosophy-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}
.expertise-card:hover {
  border-color: var(--color-accent-glow);
  background: var(--color-surface-2);
}
/* Icon backgrounds — replace colored icon backgrounds with neutral */
.card-icon-bg {
  background: var(--color-accent-dim);
  border-radius: 10px;
}
.card-icon {
  color: var(--color-accent);
}
```

**Section backgrounds** — alternate cleanly between dark levels:
```css
/* Even sections */
.section-alt {
  background: var(--color-surface);
}
/* Odd sections */
.section-base {
  background: var(--color-bg);
}
/* No gradient backgrounds on sections at all */
```

**Hero section** — keep the dark bg, add a very subtle depth glow:
```css
.hero {
  background: var(--color-bg);
  /* Single subtle radial — barely visible, just adds depth */
  background-image: radial-gradient(
    ellipse 800px 600px at 70% 50%,
    rgba(0, 201, 167, 0.04) 0%,
    transparent 70%
  );
}
```

### 1.3 Color Audit Checklist for Developer

Search and replace the following in all CSS/SCSS/styled-components files:

| Find | Replace with |
|---|---|
| `#7c3aed` | `var(--color-accent)` |
| `#6d28d9` | `var(--color-accent)` |
| `#8b5cf6` | `var(--color-accent)` |
| `#a78bfa` | `var(--color-accent-dim)` |
| `#ec4899` | `var(--color-accent)` |
| `#db2777` | `var(--color-accent)` |
| `purple` | `var(--color-accent)` |
| `#e1effe` (light blue section bg) | `var(--color-surface)` |
| `#f0f4ff` (light lavender bg) | `var(--color-surface)` |
| Any `linear-gradient` with purple/pink | See replacements above |

---

## 2. Typography — Targeted Upgrades Only

Keep the existing font stack if it's working for body text. These are targeted upgrades, not a full replacement.

### 2.1 Hero Heading
The hero heading is the most visible typography element. Make it land harder:

```css
.hero-name, .hero-heading {
  font-weight: 800;
  letter-spacing: -0.02em;  /* Tighten tracking on large display text */
  line-height: 1.05;
  /* If currently using a generic sans, upgrade to: */
  font-family: 'Plus Jakarta Sans', sans-serif; /* Add via Google Fonts */
}
```

### 2.2 Section Labels & Stats
```css
/* Stats numbers — make them pop */
.stat-number {
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--color-accent);
}

/* Section labels — add letter-spacing for precision feel */
.section-label {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--color-text-muted);
}
```

### 2.3 Card Titles
```css
.card-title {
  font-weight: 700;
  letter-spacing: -0.01em;
}
```

---

## 3. Content Rewrites — Section by Section

These are drop-in copy replacements. Structure stays identical.

### 3.1 Hero Section

**Current tagline (replace):**
> "With half a decade of experience building production AI systems, I have helped transform business outcomes for over 11 clients across healthcare, real estate, and fintech. My AI solutions have improved customer relationships by 85% and reduced administrative backlog by 70%, while generating over $2M in cost savings through intelligent automation."

**Replace with:**
> "I architect and deploy production-grade AI — LLM pipelines, agentic systems, and data infrastructure — for clients across healthcare, fintech, and enterprise. Five years. 20+ systems. Real outcomes."

**Current CTA line (remove entirely):**
> "Let me bring AI intelligence to your applications!"

**Replace the hero badge label:**
- Current: `✦ Senior AI Software Engineer`
- New: `Senior AI Engineer · Nairobi, Kenya`

### 3.2 Expertise Section — Header Copy

**Current:**
> "Senior AI Software Engineer with 5+ years of hands-on experience architecting and deploying production AI systems that drive measurable business outcomes. I specialize in building sophisticated AI agents and custom LLM solutions with a track record of reducing operational costs by 60-70% while improving customer satisfaction scores by 85%."

**Replace with:**
> "I don't build AI demos — I build systems that survive production. Five years of shipping LLM pipelines, agentic workflows, and data infrastructure for clients in healthcare, fintech, and enterprise. The metric I care about: does it work when real users hit it?"

**Stats bar labels — no change to numbers, rewrite labels for specificity:**
- `5+ Years AI Development` → `5+ Yrs Production AI`
- `11+ AI Client Projects` → `20+ Systems Deployed`
- `$2M+ Cost Savings Generated` → `KES 2M+ Savings Generated`
- `99.9% AI System Uptime` → `99.9% Uptime Maintained`

### 3.3 Expertise Cards — Rewrite Descriptions

**Generative AI & LLM Systems:**
- Current: `OpenAI GPT-4/o1, Claude, LangChain, HuggingFace`
- New title: `LLMs & Generative AI`
- New description: `GPT-4o, Claude, Gemini — fine-tuned, RAG-augmented, and deployed to production with eval frameworks and prompt optimization pipelines.`

**Agentic AI Systems:**
- New description: `Multi-agent orchestration using CrewAI and OpenAI Agents SDK. Context management, tool-calling, and long-running workflows that handle real enterprise load.`

**AI Data Pipelines:**
- New description: `Apache Spark, Kafka, Airbyte, and BigQuery pipelines processing millions of records daily. Built for scale, not just for demos.`

**Cloud AI Infrastructure:**
- New description: `Production deployments on AWS SageMaker, Azure OpenAI, and GCP Vertex AI — with CI/CD, Docker, Kubernetes, and monitoring baked in from day one.`

**Full-Stack AI Development:**
- New description: `End-to-end from model to interface. Python backends, React frontends, GraphQL APIs — everything needed to ship a working AI product, not just a model.`

**Backend AI Systems:**
- New description: `FastAPI, Express.js, and GraphQL (Graphene/Apollo) backends handling high-throughput AI inference with vector database integration and caching.`

**MLOps & Model Management:**
- New description: `Model versioning, A/B testing, deployment pipelines, and monitoring. Cut deployment time from 4 hours to 15 minutes using Docker and Kubernetes CI/CD.`

**AI Model Optimization:**
- New description: `Latency reduction through quantization, caching strategies, and model distillation. 70% latency reduction while maintaining 99.9% accuracy on production systems.`

### 3.4 Philosophy Section — Header & Cards

**Current header:**
> "My approach to AI engineering combines cutting-edge technology with practical business solutions, ensuring every system I build delivers measurable value and scales efficiently."

**Replace with:**
> "I think about AI the way an engineer thinks about infrastructure: reliability first, then scale. Every system I build is designed to be maintained, measured, and improved — not admired and abandoned."

**Philosophy cards — rewrite content:**

**AI-First Architecture Design:**
> I design AI applications as microservices from the start — model versioning, A/B testing, and distributed scaling built into the architecture, not bolted on after the fact.

**Agentic AI System Design:**
> Multi-agent systems using CrewAI with tool-calling, context management, and failure recovery baked in. Designed for long-running enterprise workflows, not toy demos.

**LLM Integration Strategy:**
> Custom fine-tuning workflows, systematic prompt optimization, and RAG pipelines. I treat LLM integration as an engineering problem, not a magic trick.

**Production AI Optimization:**
> Advanced caching, model quantization, and inference optimization. 70% latency reduction on production systems while maintaining accuracy — because "fast enough" is an engineering spec.

### 3.5 Previous Clients Section — Header & Cards

**Current header:**
> "Trusted by innovative companies to deliver AI solutions that transform their business operations"

**Replace with:**
> "Companies that shipped AI products with me — not just bought a consulting deck."

**Rightsify Hydra card:**
- Current description: `AI music generation platform for commercial applications, providing copyright-cleared instrumental music.`
- New: `Built the AI core of a global music licensing platform. Transformer models generating copyright-cleared content for 3M+ daily users across 180+ countries — with distributed GCP training pipelines that cut model training time by 60%.`

**ClassifyMe card:**
- Current description: `AI platform helping students discover perfect course matches tailored to their passions and strengths.`
- New: `AI matching system that analyzes student aptitude and passions to surface personalized course recommendations — reducing course selection confusion at scale with vector-based semantic matching.`

**MarketReady.ai card:**
- Current description: `Comprehensive AI-powered SaaS platform for real estate professionals with dynamic tool loading, multi-tenant architecture, and subscription management.`
- New: `Multi-tenant SaaS platform for real estate professionals — dynamic AI tool loading, workflow automation, and subscription management. Built to handle multiple brokerages with isolated data and independent feature sets.`

**Davis & Shirtliff — Waba AI card:**
- Current description: `AI-driven reverse osmosis design and proposal generation platform that automates water treatment laboratory report analysis, system sizing, and technical proposal creation for engineering teams.`
- New: `Multi-agent AI system that automates water treatment proposal generation end-to-end. Engineers now produce lab reports, system sizing calculations, and technical proposals in minutes. 50,000+ proposals generated. 4.9/5 engineer rating.`

### 3.6 Services Section — Header & Stats

**Current header:**
> "Comprehensive AI solutions that transform your business operations with measurable results"

**Replace with:**
> "What I build, and what it delivers."

**Services descriptions:**

**Custom LLM Development:**
> End-to-end LLM system development — from dataset curation and fine-tuning to RLHF implementation and production deployment with evaluation frameworks.

**Agentic AI Systems:**
> Multi-agent orchestration with CrewAI — intelligent workflow automation that handles complex, multi-step tasks without falling over under real enterprise load.

**RAG System Implementation:**
> Retrieval-augmented generation with vector databases (Pinecone, FAISS) and semantic search. Production systems processing 10,000+ documents daily at 94% extraction accuracy.

**Business Process Automation:**
> AI-driven automation that eliminates manual bottlenecks. Real results: 60% reduction in manual tasks, 40% productivity increase, measurable cost savings.

**MLOps & AI Infrastructure:**
> CI/CD pipelines, model monitoring, A/B testing, and deployment infrastructure. Because a model that doesn't ship — or that breaks in prod — isn't a model.

**Generative AI Applications:**
> Full-stack generative AI products — from LLM backend to user interface. Built for real users, not demos.

---

## 4. Micro-Improvements (Quick Wins)

### 4.1 Hero Social Links
The three circular icon buttons (LinkedIn, Email, Phone) are fine structurally. Just restyle:
```css
.social-btn {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition: border-color 0.2s, color 0.2s;
}
.social-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
/* Remove any purple/gradient background on these */
```

### 4.2 Floating Animation Cards (Hero Background)
The dashed-line connected floating cards in the hero background are a nice interaction. Keep them but restyle:
- Remove any colored backgrounds from the floating cards
- Set them to: `background: var(--color-surface); border: 1px solid var(--color-border);`
- Change the dashed connector lines from purple to `var(--color-border)`
- Change the dots on the connectors to `var(--color-accent)`

### 4.3 Chatbot Widget
**Keep it exactly as is — do not touch the functionality.** Only restyle the trigger button to match the new palette:
```css
.chatbot-trigger {
  background: var(--color-accent);
  /* Remove purple gradient background */
}
```

### 4.4 Page Scroll Indicator (right-side dots)
Keep the scroll indicator dots. Restyle active dot:
```css
.scroll-dot.active {
  background: var(--color-accent);
  /* Remove purple */
}
.scroll-dot {
  background: var(--color-border);
}
```

### 4.5 Dark/Light Mode Toggle
Keep the toggle. Ensure light mode also uses teal accent, not purple. For light mode:
```css
[data-theme="light"] {
  --color-bg:      #F8F9FC;
  --color-surface: #FFFFFF;
  --color-accent:  #00A88C;  /* Slightly darker teal for readability on white */
  --color-text:    #1A1D2E;
  --color-border:  #E2E5EF;
}
```

### 4.6 Add Huawei Award to the About/Expertise section
The Huawei Global Innovator Award (2022, Johannesburg) is mentioned in the CV but absent from the site. Add a single recognition row somewhere visible — below the stats bar or above the expertise cards works well:

```html
<!-- Add this block — minimal, not a whole new section -->
<div class="recognition-strip">
  <span class="recognition-icon">🏆</span>
  <div>
    <strong>Huawei Global Innovator Award</strong>
    <span>Johannesburg, South Africa · April 2022</span>
    <span>IoT + Neural Network pneumonia detection · 80% accuracy</span>
  </div>
</div>
```

```css
.recognition-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--color-accent-dim);
  border: 1px solid rgba(0, 201, 167, 0.2);
  border-radius: 8px;
  margin: 24px 0;
}
```

---

## 5. What NOT to Change

To be explicit — these items must remain untouched:

- Site structure and section order
- Navigation items and their labels
- The chatbot widget (functionality and position)
- Right-side scroll dot navigation
- Hero layout (two-column with illustration/animation on the right)
- Card grid layouts in Expertise and Services
- Dark/light mode toggle (just fix the accent color)
- Section scroll behavior and animations
- Footer structure
- All external links

---

## 6. Implementation Order (Quickest to Biggest Impact)

1. **Replace CSS color variables** — single file change, cascades everywhere. (~30 min)
2. **Remove gradient backgrounds** — find/replace all `linear-gradient` calls with purple/pink. (~1 hr)
3. **Restyle stat banner** — flat dark surface, teal numbers. (~15 min)
4. **Restyle buttons** — primary to teal fill, secondary to bordered. (~20 min)
5. **Restyle client/project cards** — uniform dark surface, remove colored headers. (~45 min)
6. **Rewrite hero copy** — direct text swap. (~15 min)
7. **Rewrite section descriptions** — copy-paste from this doc. (~1 hr)
8. **Restyle social buttons + chatbot trigger** — minor CSS. (~15 min)
9. **Add Huawei award block** — one new HTML element + CSS. (~20 min)
10. **Restyle floating hero cards + connector lines** — CSS only. (~20 min)

**Estimated total: 4–5 hours of implementation.**

---

*The goal: same site, dramatically less generic. A visitor should feel like this was made by a craftsman with taste — not assembled from a Framer template.*
