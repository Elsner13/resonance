# Attune Homepage Redesign — Design Spec

**Date:** 2026-04-09  
**Status:** Approved for implementation  
**Reference:** Merci-Michel teardown at `docs/research/2026-04-09-merci-michel-teardown.md`

---

## Decision Log

| Decision | Choice | Rationale |
|---|---|---|
| Navigation model | Homepage chapters only | Inner pages (dashboard, coaching, foundations course) stay vertical scroll |
| Chapter count | 6 chapters | Aristotelian arc — earn the conclusion before selling |
| Header | MM-style top header on homepage | TubelightNav stays on inner pages |
| Border frame | White, 15px | Restraint over crimson — felt, not seen |
| Animation stack | GSAP + Lenis added | Right tool for scroll-gated chapter transitions |

---

## What We Are Building

A full replacement of `src/app/page.tsx` and its child components. The homepage becomes a **chapter-based full-screen experience** inspired by Merci-Michel — 6 scenes navigated by scroll, keyboard arrows, or footer prev/next buttons. Inner pages are untouched.

The existing `HeroSection`, `ProblemSection`, `FoundationsSection`, `CoachingSection`, `SignalSection`, and `SiteFooter` components are **replaced** by the chapter system. They can be archived or deleted.

---

## Chapter Architecture

### Chapter 1 — Hero
- Full-screen, vertically centered
- Headline: `"You're not behind. You're in the wrong environment."`
- Subtext: 1–2 lines, `color: #888888`
- Single CTA: "Explore Foundations" → `/foundations` (crimson border button)
- Background: existing `CosmicBackground` component (radial gradient, fixed)
- Scroll indicator: vertical line + "scroll" label, pulses subtly
- Footer shows: title "Attune", no subtitle, no prev button

### Chapter 2 — The Drift
- The problem chapter. One idea, no product mention.
- Large serif heading: `"The Drift"`
- 3–4 short paragraphs on why effort alone fails — environment, not ability
- No CTA. The chapter's only job is to name what the reader already feels.
- Footer shows: title "The Drift"

### Chapter 3 — The OS
- The framework chapter. The 4-principle grid.
- Heading: `"The Operating System"`
- 4 principles displayed as a 2×2 grid (or stacked list): Environment / Signal / Reps / Identity
- One sentence per principle. No fluff.
- Footer shows: title "The OS"

### Chapter 4 — Foundations
- The product chapter. Price, what's inside, buy.
- Heading: `"Foundations"`
- Module list (condensed — 8 modules, one line each)
- Price: `$XXX` — displayed clearly
- CTA: "Buy Foundations" → Stripe link (existing `buy.stripe.com` link)
- Footer shows: title "Foundations", subtitle "The Course"

### Chapter 5 — Signal
- The newsletter chapter.
- Heading: `"Signal / Noise"`
- 2-sentence description of the weekly dispatch
- Email input + subscribe button → Kit form (existing integration)
- Footer shows: title "Signal / Noise", subtitle "Weekly dispatch"

### Chapter 6 — Contact
- The close.
- Heading: `"Let's Connect"`
- Social links: match whatever links exist in current `SiteFooter.tsx` (implementer pulls from there)
- One line: coaching inquiry email or link
- Footer shows: title "Contact", no next button

---

## Component Architecture

```
src/
  app/
    page.tsx                    ← Replace entirely with ChapterPage
  components/
    chapter/
      ChapterPage.tsx           ← Root: manages chapter state, keyboard/scroll
      ChapterEngine.tsx         ← Lenis scroll + GSAP transitions
      ChapterFooter.tsx         ← Persistent footer: prev/next, progress bar, title
      ChapterHeader.tsx         ← Fixed top header: logo left, nav links right
      BorderFrame.tsx           ← 4 fixed white 15px edges, animate in on mount
      chapters/
        HeroChapter.tsx
        DriftChapter.tsx
        OSChapter.tsx
        FoundationsChapter.tsx
        SignalChapter.tsx
        ContactChapter.tsx
```

---

## Header (Homepage Only)

Replaces TubelightNav on the homepage. TubelightNav remains on all other pages.

```
[ATTUNE logo — left]          [Signal  Foundations  About  Contact — right]
```

- `position: fixed; top: 20px; left: 30px; right: 30px; z-index: 999`
- Font: Clash Grotesk, 11px, uppercase, letter-spacing: 1px
- Color: white, opacity fades subtly on Chapter 1 enter
- Logo: wordmark or SVG mark, links to `/`
- Nav links: hover state uses letter-split animation (base slides down, top slides in)

---

## Border Frame

Four `div` elements, `position: fixed`, `z-index: 1001`, `background: #ffffff`, 15px thick.

```
top:    { top: 0; left: 0; width: 100%; height: 15px; transform-origin: top }
bottom: { bottom: 0; left: 0; width: 100%; height: 15px; transform-origin: bottom }
left:   { top: 0; left: 0; width: 15px; height: 100%; transform-origin: left }
right:  { top: 0; right: 0; width: 15px; height: 100%; transform-origin: right }
```

On mount: start `scaleX(0)` / `scaleY(0)`. GSAP animates to `scale(1)` with stagger after preloader clears. Duration: 1s, ease: `power3.out`.

---

## Footer (Persistent)

`position: fixed; bottom: 30px; left: 30px; right: 30px; z-index: 2`

Left: `2023/2026` year  
Center: thin progress bar (30% width, centered) — `scaleX` maps to chapter index / 5  
Right: prev arrow + `01/06` counter + next arrow  
Below center: chapter title + subtitle (updates per chapter with GSAP crossfade)

Prev button hidden on Chapter 1. Next button hidden on Chapter 6.

---

## Chapter Navigation System

```typescript
// State: current chapter index (0–5)
// Transitions: guarded by canSwitch flag + 400ms debounce

const CHAPTERS = 6;
const CHANGE_DELAY = 400; // ms — prevents rapid switching

function navigateTo(index: number) {
  if (!canSwitch || index < 0 || index >= CHAPTERS) return;
  canSwitch = false;
  // GSAP: animate out current chapter (translateY(-100vh) + opacity 0)
  // GSAP: animate in next chapter (from translateY(100vh) → 0)
  // Update footer progress bar scaleX
  // Update footer title/subtitle
  // Reset canSwitch after CHANGE_DELAY
}
```

**Input sources:**
- Lenis scroll → direction → `navigateTo(current ± 1)` (one chapter per scroll event)
- Keyboard: `ArrowDown` / `ArrowUp`
- Footer prev/next buttons
- Touch: swipe up/down

---

## Animation Spec

### Chapter Transition
- Out: `translateY(-8vh)` + `opacity: 0`, duration `0.5s`, ease `power3.in`
- In: from `translateY(8vh)` + `opacity: 0` → natural, duration `0.6s`, ease `power3.out`
- Direction-aware: going back reverses Y direction

### Border Frame Entrance
- Stagger: top → right → bottom → left, 0.1s between each
- Duration: 1s each, ease `power3.out`
- Fires after 300ms page load delay

### Header Link Hover (Letter Split)
- Each nav word: two stacked layers (`.base`, `.top`), each letter in a `<span>`
- Hover: base letters `translateY(10px) opacity(0)`, top letters `translateY(0) opacity(1)`
- Stagger per letter: `0.02s × index`
- Ease: `power2.out`, duration `0.35s`

### Footer Progress Bar
- `scaleX` from `0` to `currentIndex / (CHAPTERS - 1)`
- Transition: `0.6s`, ease `power3.out`
- Thickens on hover: `scaleY(1)` from `scaleY(0.2)`

### Chapter Content Entrance (per chapter)
- Heading: `translateY(20px) opacity(0)` → natural, 0.8s, delay 0.2s after chapter transition
- Body text: stagger 0.1s after heading
- CTA: stagger 0.1s after body

---

## Design System (Homepage)

Inherits from `UI-SPEC.md`. Additional chapter-specific tokens:

```css
--chapter-padding: 30px;          /* matches border frame width */
--chapter-content-max: 640px;     /* max-width for chapter text blocks */
--transition-out: 0.5s;
--transition-in: 0.6s;
--ease-out: cubic-bezier(0.19, 1, 0.22, 1);  /* stolen from MM */
```

---

## Technical Notes

### Package additions
```bash
npm install gsap @studio-freight/lenis
```

GSAP handles all chapter transitions, border entrance, letter hover. Lenis handles smooth scroll detection (direction + velocity). Framer Motion remains for inner pages — not used on homepage.

### Next.js considerations
- `ChapterPage` must be a Client Component (`"use client"`) — uses scroll listeners, keyboard events, GSAP
- `CosmicBackground` stays as-is behind the chapter system
- TubelightNav: conditionally render based on pathname — hide on `/`, show on all other routes (use `usePathname()` in layout or a wrapper)
- Inner pages (`/foundations`, `/dashboard`, `/coaching`, `/about`) untouched

### Existing components to retire (homepage only)
- `HeroSection.tsx` → replaced by `HeroChapter.tsx`
- `ProblemSection.tsx` → replaced by `DriftChapter.tsx`
- `FoundationsSection.tsx` → replaced by `FoundationsChapter.tsx`
- `CoachingSection.tsx` → dropped. Coaching has its own `/coaching` page; it does not appear in the 6-chapter homepage arc.
- `SignalSection.tsx` → replaced by `SignalChapter.tsx`
- `SiteFooter.tsx` → replaced by `ChapterFooter.tsx`

Do not delete yet — archive by moving to `src/components/marketing/_archive/`.

---

## Out of Scope

- Inner page redesigns (dashboard, coaching, foundations course)
- WebGL / Three.js thumbnails
- Physics experiments
- Spritesheet logo animation
- Mobile-specific layout (handle in a follow-up phase)
- Dark/light mode toggle

---

## Success Criteria

1. Homepage loads with border frame animating in
2. Scrolling, arrow keys, and footer buttons all advance chapters correctly
3. `canSwitch` debounce prevents rapid chapter skipping
4. Footer progress bar tracks chapter position
5. Header nav links have letter-split hover animation
6. All 6 chapters render their content correctly
7. TubelightNav absent on `/`, present on all inner pages
8. Existing inner pages render without regression
9. GSAP and Lenis import without SSR errors (dynamic import or `"use client"` guard)
