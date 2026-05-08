# Attune Homepage Redesign — Tight Funnel

**Date:** 2026-04-12
**Direction:** Funnel-first. Every pixel moves someone toward the quiz. No portfolio, no journal list, no works grid.

---

## Design Tokens (unchanged)

```
Background:     #0a0a0a
Surface:        #111111
Border:         #161616
Text Primary:   #f0f0f0
Text Mid:       #999999
Text Dim:       #666666
Text Ghost:     #555555
Accent:         #cc1133 (crimson — sole accent)
Accent Hover:   #ff3355
Muted:          #444444

Fonts:
  Display:      Playfair Display, serif (400 italic, 700–900)
  Body:         Inter, sans-serif (300–500)
  Labels/Nav:   JetBrains Mono, monospace (7.5–9px, 0.18–0.38em tracking, uppercase)

Easing:         [0.16, 1, 0.3, 1]
Spacing:        8px base, all multiples
```

---

## Animated Background — Flow Field

Full-page canvas, `position: fixed; inset: 0; z-index: 0`. All page content sits above at `z-index: 1`.

**Implementation:**
- Canvas element behind everything, sized to viewport
- ~300 line particles driven by Perlin noise field
- Each line: short segment drawn from previous position to current, creating flowing trails
- Noise field: `noise(x * 0.003, y * 0.003, time)` → angle, speed ~0.6px/frame
- Trail effect: fill `rgba(10,10,10,0.04)` each frame (slow fade, not clear)
- Lines wrap at edges (no bounce)
- Life cycle: each line lives 50–250 frames, fades in over 30 frames, fades out over 30 frames, respawns at random position
- ~6% of lines are crimson (`rgba(204,17,51, alpha * 0.25)`, lineWidth 1), rest are white (`rgba(255,255,255, alpha * 0.06)`, lineWidth 0.5)
- Time offset shifts with `scrollY` for subtle parallax: `t += 0.002 + scrollY * 0.00001`
- Canvas uses `devicePixelRatio` for retina
- `prefers-reduced-motion`: stop animation, show static faint noise texture instead

---

## Loading Screen

Kept from current implementation. Centered ATTUNE ghost text (`#1e1e1e`) + 120px crimson progress bar. ~1.5s duration. Exits with `opacity: 0` over 700ms.

---

## Navbar

Fixed top. `z-index: 50`.

- **Left:** ATTUNE wordmark. JetBrains Mono, 9px, 0.38em tracking, uppercase, `#555` → `#d0d0d0` on hover
- **Right:** Ghost pill CTA. "Take the Quiz →". JetBrains Mono, 8px, 0.2em tracking. `border: 1px solid #2a2a2a`, `color: #555`. On hover: `border-color: #cc1133`, `color: #cc1133`
- **Scroll behavior:** `background: rgba(10,10,10,0.92)`, `backdrop-filter: blur(20px)`, `border-bottom: 1px solid #141414` when scrolled past 50px
- **No InteractiveMenu.** No portfolio navigation. One CTA only.

---

## Section 01 — Hero (Split Tension)

Full viewport height (`min-height: 100vh`). Two-column grid: `1fr 1fr`.

### Left Column
- `border-right: 1px solid #161616`
- Padding: `4rem clamp(1.5rem, 5vw, 6rem)`
- Vertically centered content (flexbox)

Content (top to bottom):
1. **Eyebrow:** "Sam Elsner · Ecological Psychologist · 2× NCAA Champion" — JetBrains Mono 8px, 0.35em tracking, `#555`
2. **Headline:** "The gap between knowing and *doing*" — Playfair Display `clamp(2.8rem, 5vw, 4.5rem)`, weight 900, line-height 0.92, `#f0f0f0`, "doing" in `#cc1133`
3. **Subtext:** "Most learning advice was built for someone else. Attune uses ecological dynamics to find the framework your archetype actually needs." — Inter 15px, `#777`, line-height 1.75, max-width 420px
4. **CTA:** "Take the Diagnostic →" — crimson pill. JetBrains Mono 9px, 0.22em tracking, `padding: 14px 34px`, `background: #cc1133`, `border-radius: 100px`, `color: #f0f0f0`, weight 600. `BorderBeam` with `colorFrom="#ff6680" colorTo="#ffffff" background={crimson}`

**Entrance animation:** eyebrow fades in (delay 0.3s), headline slides up from y:56 (delay 0.38s, 1.2s duration), sub fades in (delay 0.9s), CTA slides up from y:12 (delay 1.1s). All use house easing.

### Right Column
- Centered content (flex)
- Subtle radial glow: `radial-gradient(circle at 50% 50%, rgba(204,17,51,0.025) 0%, transparent 60%)`

Content:
- 2×2 grid of archetype names, `gap: 2.5rem`
- Each item centered: Greek text in Playfair Display italic `2.5rem`, `color: #181818`. English name below in JetBrains Mono 7.5px, 0.28em tracking, `#333`
- On hover: Greek fades to `rgba(204,17,51,0.3)`, English to `#666`. Transition 0.5s
- Entrance: staggered fade-in, 0.15s delay between each

### Scroll Indicator
- Absolute positioned, bottom 40px, centered
- 1px wide, 48px tall line with `scaleY` breathing animation (2.8s infinite)
- `linear-gradient(to bottom, transparent, #2a2a2a)`

---

## Section 02 — The Wound

`padding: clamp(8rem, 16vw, 16rem) clamp(1.5rem, 5vw, 6rem)`. `border-top: 1px solid #161616`.

Three lines, each Playfair Display italic, `letter-spacing: -0.03em`, `line-height: 1.05`:
1. "You practiced." — `clamp(2.5rem, 6vw, 6rem)`, `color: #444`
2. "You studied." — `clamp(2.5rem, 6vw, 6rem)`, `color: #888`
3. "The problem was never *effort.*" — `clamp(1.8rem, 4vw, 3.5rem)`, `color: #d8d8d8`, "effort" in `#cc1133`. `margin-top: 0.3em`

**Entrance:** each line slides in from `x: -32`, staggered by 0.12s. `whileInView`, `viewport: { once: true }`.

---

## Section 03 — The Framework (4 Archetypes)

`padding: clamp(7rem, 12vw, 12rem) clamp(1.5rem, 5vw, 6rem)`. `border-top: 1px solid #161616`.

### Header
- Eyebrow: "The Framework" — standard eyebrow style
- Title: "Four Archetypes" — Playfair Display `clamp(2.5rem, 5vw, 4.5rem)`, weight 700, `#f0f0f0`
- `border-bottom: 1px solid #161616`, `margin-bottom: 4rem`, `padding-bottom: 2rem`

### Grid
- `display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #161616; border: 1px solid #161616`
- 4 cards total, 2×2

### Each Card (SpotlightCard)
- `background: #0a0a0a`, `padding: clamp(2.5rem, 4vw, 4rem)`, `min-height: 240px`
- Hover: `background: #0d0d0d`. SpotlightCard crimson radial gradient tracks cursor
- Content:
  1. Top row: Greek text (Playfair italic 13px, `#444`) left, number (JetBrains Mono 9px, `#1e1e1e`) right
  2. English name: Playfair Display `clamp(1.5rem, 3vw, 2.5rem)`, weight 700, `#e8e8e8`
  3. Role label: JetBrains Mono 7.5px, 0.2em tracking, `#cc1133`
  4. Tagline: Playfair italic 14px, `#666`, `margin-top: auto`
- **Entrance:** GSAP stagger, `opacity: 0, y: 24`, 0.07s stagger, `scrollTrigger: start 'top 80%'`

### Archetype Data
```
Episteme  | ἐπιστήμη  | The Theorist     | "You understand deeply. The doing resists."
Techne    | τέχνη     | The Craftsman    | "You outwork everyone. The ceiling feels arbitrary."
Phronesis | φρόνησις  | The Practitioner | "You're sharp in context. Something shifts when it changes."
Nous      | νοῦς      | The Intuitive    | "You feel it deeply. Building on it deliberately is the gap."
```

---

## Section 04 — Credential Bar

`border-top: 1px solid #161616; border-bottom: 1px solid #161616`.

4-column grid. Each cell: `text-align: center`, `padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 3vw, 3rem)`, `border-right: 1px solid #161616` (except last).

| Number | Label |
|---|---|
| 2× | NCAA Champion |
| 79+ | Published Essays |
| 12Q | Diagnostic |
| $197 | Foundations |

- Number: Playfair Display `clamp(3rem, 6vw, 5rem)`, weight 900, `#cc1133`. CountUp animation on viewport enter.
- Label: JetBrains Mono 7.5px, 0.32em tracking, `#555`
- Entrance: staggered `opacity: 0, y: 20`, 0.1s delay per item

---

## Section 05 — Final CTA

`padding: clamp(8rem, 14vw, 14rem) clamp(1.5rem, 5vw, 6rem)`. `text-align: center`. `border-top: 1px solid #161616`.

1. Eyebrow: "Start Here" — standard eyebrow style
2. Headline: "Find your *archetype.*" — Playfair Display `clamp(3.5rem, 9vw, 9rem)`, weight 900, `#f0f0f0`, "archetype" in `#cc1133`
3. CTA: "Take the Quiz — Free →" — same crimson pill as hero, with `BorderBeam`

**Entrance:** eyebrow fades in, headline slides up from y:40 (1s duration), CTA slides up from y:12 (delay 0.2s).

---

## Marquee

`border-top: 1px solid #161616; border-bottom: 1px solid #161616`. `overflow: hidden; padding: 1.5rem 0`.

GSAP-driven horizontal scroll (`x: '-50%'`, duration 34s, linear, infinite repeat). Words in Playfair italic `clamp(1.2rem, 2.5vw, 2.2rem)`. Alternating `#181818` (dim) and `#d0d0d0` (bright). 4× duplicated for seamless loop.

Words: Episteme, Techne, Phronesis, Nous, Ecological Dynamics, Practice Science, Attunement, Deliberate Learning

---

## Footer Base

Flex row, space-between. `padding: 1.5rem clamp(1.5rem, 5vw, 6rem)`.

- Left: "© 2026 Attune Mastery" — JetBrains Mono 8px, `#444`
- Right: two links (attunemastery.com, sam@attunemastery.com) — JetBrains Mono 8px, `#444` → `#d0d0d0` on hover

---

## Z-Index Stack

```
Flow Field canvas:    position: fixed, z-index: 0
Page content:         position: relative, z-index: 1
Navbar:               position: fixed, z-index: 50
Loading screen:       position: fixed, z-index: 100
```

---

## Removed Components

- `WorksGrid` — portfolio section, not funnel
- `StatsBar` — replaced by Credential Bar with different stats (champion, not archetypes)
- `Philosophy` — wound section replaces it
- `Journal` — not funnel, removed entirely
- `InteractiveMenu` / `modern-mobile-menu.tsx` — replaced by single ghost CTA in navbar
- Mux HLS video — Split Tension hero doesn't need atmospheric video; flow field provides atmosphere
- `liquid-glass-button.tsx` — already unused, can delete

## Kept Components (modified)

- `BorderBeam` — on hero CTA and final CTA
- `SpotlightCard` — on archetype grid cards
- `CountUp` — in credential bar
- `ScrambleHover` — available for archetype taglines on hover (optional enhancement)
- GSAP marquee — footer
- `LoadingScreen` — unchanged

---

## Mobile Responsive (breakpoint: 768px)

- Hero: single column stack (left content on top, archetype grid below, smaller)
- Archetype grid: 1 column (stacked cards)
- Credential bar: 2×2 grid
- Navbar: same (already minimal)
- Wound: smaller font sizes via clamp
- Flow field: reduce particle count to ~150 for performance

---

## Files to Modify

- `src/App.tsx` — complete rewrite of sections and layout
- `src/components/ui/flow-field.tsx` — new component (canvas + Perlin noise)
- `src/index.css` — remove `.attune-menu` styles (no longer needed)
- Delete or keep unused: `modern-mobile-menu.tsx`, `liquid-glass-button.tsx`

## Files Unchanged

- `src/components/ui/border-beam.tsx`
- `src/components/ui/scramble-hover.tsx`
- `src/lib/utils.ts`
- `vite.config.ts`
- `tsconfig.app.json`
