# ldj portfolio · Design System v1.2

> Minimal typography-first portfolio. Dark base + neon green accent.  
> Inspired by SLATE minimalism and Tikkle's neon green moment.  
> Prepared for Warp / Claude Code · ldj@workscombine · 2025.04

---

## How to use this document

1. Place `DESIGN_SYSTEM.md` at your project root (e.g. `~/dev/ldj-portfolio/`).
2. Place `tokens.css` in your styles folder and import it into `globals.css`.
3. When prompting Claude Code, add:  
   > "Follow tokens and layout rules in `DESIGN_SYSTEM.md`. Never invent new page skeletons — adapt one of Pattern A / B / C."

Optional: add a reference in your `CLAUDE.md` so Claude Code auto-loads the context:
```
For all portfolio design work, refer to DESIGN_SYSTEM.md at the project root.
Use tokens.css variables — never hardcode hex values.
```

---

## 1. Foundations

### Philosophy

1. **Dark minimal base** — `#0A0A0A` background, near-black but slightly warm. Never pure `#000000`.
2. **One accent, sparingly used** — Muted green `#00CC6D` on less than 10% of any view. Reserved for hover/active states, numbered badges, key highlights, and punctuation accents (the period after display titles).
3. **Extreme typography scale** — Display (72-96px) + body (14-15px). No mid-sized headings. Hierarchy through scale contrast, not weight.
4. **Sentence-level restraint** — English UPPERCASE for section labels only. Korean body stays regular case.
5. **Whitespace first** — Sections separated by 120-200px vertical space. Never cramp.

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0A0A0A` | Primary background |
| `--surface` | `#141414` | Cards, containers |
| `--surface-elevated` | `#1F1F1F` | Pill tags, elevated blocks |
| `--border` | `#262626` | Dividers, subtle borders |
| `--text-primary` | `#FFFFFF` | Headings, emphasis |
| `--text-secondary` | `#A1A1A1` | Body, meta |
| `--text-tertiary` | `#666666` | Labels, captions |
| `--accent` | `#00CC6D` | Muted green accent |
| `--accent-glow` | `rgba(0,204,109,0.25)` | Subtle glow (use rarely) |

### Typography

**Fonts**
- Korean: `Pretendard Variable`
- English: `Space Grotesk` (preferred) or `Inter`

**Scale**

| Role | Size | Weight | Case | Tracking |
|------|------|--------|------|----------|
| Display | 72-96px | 700 | as-is | -0.04em |
| Section label (H1) | 14px | 500 | UPPERCASE | +0.15em |
| Body large | 18-20px | 400 | as-is | 0 |
| Body | 15px | 400 | as-is | 0 |
| Caption | 12-13px | 500 | context-dependent | 0 or +0.1em |

**Rules**
- English labels always UPPERCASE with wide tracking (`letter-spacing: +0.15em` minimum)
- Korean never ALL CAPS (no proper support)
- Display type: one per page max, hero area only
- Never use mid-sized headings (16-40px range)

### Spacing Scale

- Component internal: `8, 12, 16, 24px`
- Section vertical rhythm: `120, 160, 200px`

### Grid

- Max content width: `1200-1440px`
- Page side margin: `80-120px` desktop, `40-60px` mobile
- Column gutter: `20-24px`

---

## 2. Components

### Pill Tag (hashtag chip)
```css
.pill {
  display: inline-flex;
  padding: 8px 20px;
  border-radius: 100px;
  background: var(--surface-elevated);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
}
```
Used with `#` prefix: `# 고립된 창작`

### Number Badge
```css
.number-badge {
  width: 24px;
  height: 24px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  color: var(--accent);
  font-size: 11px;
  display: grid;
  place-items: center;
}
.number-badge[data-state="active"] {
  background: var(--accent);
  border: none;
  color: var(--bg);
  font-weight: 500;
}
```
Rest state: outline only. Active/current: filled with `--bg` text.

### Caption (3-tier)
```html
<figcaption class="caption">
  <span class="caption-category">01 — WEB</span>
  <h3 class="caption-title">작가의 정원</h3>
  <p class="caption-meta">2024 · Solo · 기획·디자인·개발</p>
</figcaption>
```
```css
.caption-category { font-size: 11px; letter-spacing: 2px; color: var(--text-tertiary); text-transform: uppercase; }
.caption-title { font-size: 17px; font-weight: 500; color: var(--text-primary); }
.caption-meta { font-size: 12px; color: var(--text-secondary); }
```

### Divider with Marker
A short vertical tick + small neon dot in the middle of a horizontal rule. Marks major transitions (between hero and body, between sections).

```html
<div class="divider-marker">
  <span class="line"></span>
  <span class="tick"></span>
  <span class="dot"></span>
  <span class="line"></span>
</div>
```

### Action Link
```css
.action-link {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
}
.action-link::after { content: "  →"; }
```

---

## 3. Layout Patterns

### Pattern A — Portfolio Index (3-column grid)
**Use for**: main landing / work list

- Top nav: brand left, nav links right
- Hero text: small caps label + display title + subtitle (2-column: title left, sub right)
- 3-column card grid with `gap: 24px`
  - Each card: image (4:5 ratio) + 3-tier caption
- Hover on card: `1px solid var(--accent)` border + number and title flip to accent + `→` arrow appears
- Footer: "View all N projects →"

### Pattern B — Case Study Detail (2-column asymmetric)
**Use for**: individual project pages

- Hero centered: small ellipse label (WEB, MOTION, EDITORIAL) + display project name + subtitle
- 2-column body:
  - Left (~20% width): UPPERCASE section label (OVERVIEW, UX STRATEGY, etc.)
  - Right (~60%): content with sub-headers, body text, pills, numbered lists
- Sections separated by `1px solid var(--border)` horizontal rules

#### Narrative structure (fixed)

All case studies follow these five sections **in order**. Section labels appear at the top of each 2-column block exactly as written in the "EN label" column — no translations, no variants.

| # | KR | EN label | 답하는 질문 | 담을 content |
|---|----|----------|-----------|-------------|
| 01 | 문제 | `PROBLEM` | 무엇이 막혀 있었나? | 배경 · 페인 포인트 · 현재 상황 |
| 02 | 가설 | `HYPOTHESIS` | 어떻게 풀 수 있을까? | 접근 방향 · 핵심 가정 · 전략 |
| 03 | 솔루션 | `SOLUTION` | 실제로 무엇을 만들었나? | 실행 과정 · UI · 구조 결정 |
| 04 | 성과 | `RESULTS` | 무엇이 바뀌었나? | 수치 · 피드백 · 결과물 |
| 05 | 배운 점 | `LEARNINGS` | 다음엔 무엇을 다르게? | 통찰 · 회고 · 다음 스텝 |

**Tone per section**
- `SOLUTION` is the longest section (often 40-50% of total length). Lean on images/screenshots, numbered lists, and pills.
- `RESULTS` is number-forward. Use display-scale figures with short meta (e.g. `+42% / 검색 CTR`, `3주 → 4일 / 제작 시간`).
- `LEARNINGS` is reflective prose. No pills, no numbered lists — just 2-3 short body paragraphs.
- `PROBLEM` and `HYPOTHESIS` stay tight (2-4 short paragraphs each) to keep narrative momentum.

**Rule**: Use these five labels exactly. Do not invent alternatives like `INSIGHT`, `PROCESS`, `APPROACH`, or `CONCLUSION`. Consistency across projects is what makes the portfolio read as one body of work.

### Pattern C — Category Entry (full-width hero)
**Use for**: category landing pages (Web, Editorial, Motion, Writing)

- Breadcrumb meta: `ldj / CATEGORY — 02 / EDITORIAL` left + year range right
- Full-width hero image (2:1 or 16:9) with overlay captions at top-left and bottom-right
- Centered marker divider (white tick + neon green dot)
- Left display title (with accent period: `Editorial.` with green `.`) + right single-column body
- Bottom nav: circular `× BACK TO INDEX` left + `READ/EXPLORE →` right

---

## 4. Image Rules

- **Border-radius**: `2-4px` always. Never >8px (avoid bento bubble)
- **Border**: none by default. `1px solid var(--border)` only when image has dark areas that blend with bg
- **Aspect ratio**: pick one per page — `4:5` (portrait), `16:9` (wide), `1:1` (square). Don't mix within one page
- **Caption**: always 3-tier below image
- **Overlay caption**: hero images may include corner captions at 11px `--text-tertiary`
- **Grid gap**: `20-24px` between images

---

## 5. States

- **Hover (link/card)**: white → accent color; `→` arrow slides in; cards get accent border
- **Active/current**: filled accent background, `--bg` text. For selected nav items or "current step" in numbered lists
- **Ghosted/disabled**: `opacity: 0.4-0.5`; stays in tertiary gray

---

## 6. Don'ts

- ✗ Multiple accent colors — stick to one neon green
- ✗ Mid-sized headings (16-40px) — hierarchy is big or small
- ✗ Large rounded corners (>8px) — no bento-card bubbles
- ✗ Heavy borders (>1px except 2px on active state)
- ✗ Accent on body/paragraph text — only states and punctuation
- ✗ Decorative shadows, glows, gradients — everything flat
- ✗ Center-aligned body text — left-align or split into named columns
- ✗ Mixed aspect ratios within one page

---

## 7. Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#141414',
        'surface-elevated': '#1F1F1F',
        border: '#262626',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1A1',
        'text-tertiary': '#666666',
        accent: '#00CC6D',
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.15em',
        display: '-0.04em',
        wide2: '0.2em',
      },
      fontSize: {
        display: ['72px', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '700' }],
      },
    },
  },
}
```

---

## 8. Font Imports (Next.js)

```tsx
// app/layout.tsx
import localFont from 'next/font/local'
import { Space_Grotesk } from 'next/font/google'

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
})
```

Or via CDN if you don't want to self-host:
```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css');
```

---

## 9. Project Directory Scaffold (suggested)

```
ldj-portfolio/
├── DESIGN_SYSTEM.md           ← this file
├── CLAUDE.md                  ← references DESIGN_SYSTEM.md
├── src/
│   └── styles/
│       ├── globals.css        ← imports tokens.css
│       └── tokens.css
├── public/
│   └── fonts/
│       └── PretendardVariable.woff2
└── app/
    ├── page.tsx               ← Pattern A (index)
    ├── [category]/
    │   └── page.tsx           ← Pattern C (hero)
    └── [category]/[slug]/
        └── page.tsx           ← Pattern B (case study)
```

---

*v1.2 · 2025.04 · ldj@workscombine*
