# UI-SPEC.md — Attune Website Design Contract

> Single source of truth. Code follows the spec. The spec does not follow the code.

---

## Design References

| Reference | DNA Inherited |
|-----------|--------------|
| leo.im | Homepage restraint, bottom nav, typographic quote marks, nerve to leave things out |
| worldquantfoundry.com | Inner page architecture, numbered systems, WQF pillar structure, declarative copy rhythm |
| transcendenceuniverse.org / Jack Moses | Cosmic gradient, the feeling of the universe breathing behind the content |

---

## Gradient System

The background is not flat black. It is a cosmic radial gradient. The crimson influence at center is barely perceptible. Felt, not seen. Like something alive deep inside the void.

**Homepage + global background:**
```css
radial-gradient(
  ellipse at 50% 45%,
  #0d0003 0%,
  #080001 30%,
  #030000 60%,
  #000000 100%
)
```

**Inner page alternate sections (Foundations, Coaching, About):**
```css
radial-gradient(
  ellipse at 50% 50%,
  #0a0002 0%,
  #050001 50%,
  #000000 100%
)
```

**Rule:** The gradient never looks designed. It looks discovered. Applied via a fixed full-viewport `CosmicBackground` component behind all content at `z-index: -1`.

---

## Color Tokens

```css
--color-void:               #000000;  /* true black */
--color-void-gradient-center: #0d0003; /* barely-crimson center */
--color-crimson:            #CC1133;  /* primary accent — use sparingly */
--color-crimson-hover:      #FF1A3E;  /* CTA border on hover */
--color-crimson-press:      #AA0F28;  /* submit button on hover */
--color-headline:           #F0F0F0;  /* primary text */
--color-body:               #888888;  /* secondary text */
--color-muted:              #555555;  /* tertiary text, eyebrows */
--color-ghost:              #333333;  /* below-input hints */
--color-divider:            #1a1a1a;  /* horizontal rules, nav borders */
--color-surface:            #080001;  /* lifted section background */
--color-lift:               #0a0002;  /* alternate section background */
```

---

## Crimson Budget

Crimson is a finite resource. Count uses before shipping each page.

| Page | Allowed Uses | What Gets It |
|------|-------------|--------------|
| Homepage | 3 max | Eyebrow text, email submit button, active nav link |
| Foundations | 4 max | Eyebrow, module numbers, CTA arrow, submit |
| Coaching | 3 max | Eyebrow numbers, CTA arrow |
| About | 1 max | One accent element only |

**Never exceed these counts.**

---

## Typography Scale

### Fonts
- **Serif:** Playfair Display — `next/font/google`
- **Sans:** Inter — `next/font/google`

### Scale

| Role | Family | Size | Weight | Tracking | Notes |
|------|--------|------|--------|----------|-------|
| Hero headline | Playfair Display | `clamp(40px, 7vw, 88px)` | 300 | `-0.02em` | Wrapped in typographic `"` `"` |
| Section pull quotes | Playfair Display | `clamp(28px, 4vw, 48px)` | 300 | `-0.01em` | |
| Ethos fragments | Playfair Display | `clamp(24px, 3.5vw, 40px)` | 300 | — | Large centered declarations |
| Nav links | Inter | `11px` | 400 | `0.15em` | Uppercase |
| Section eyebrows | Inter | `10px` | 400 | `0.2em` | Uppercase |
| Body | Inter | `15px` | 400 | — | `line-height: 1.85`, `max-width: 560px` |
| Small | Inter | `12px` | 400 | — | `line-height: 1.7` |
| Numeric indicators | Inter (mono) | `11px` | 400 | `0.05em` | Color: `#CC1133` |

---

## Spacing System

```
Section vertical padding:  clamp(80px, 12vw, 160px)
Content max-width:         1100px
Text block max-width:      560px
Narrow text max-width:     420px
Homepage content max-width: 480px
```

---

## Animation

**One animation exists on this site:**

Homepage headline — opacity fade on mount:
```css
opacity: 0 → 1
duration: 1.4s
delay: 0.3s
easing: ease-out
```

Everything else: static. No scroll animations. No parallax. No entrance effects on scroll. The stillness is not minimalism. It is earned.

---

## Interaction States

```
Nav links:     color → #F0F0F0 on hover, 150ms, no underline
Active nav:    #CC1133 always
CTA button:    border → #FF1A3E on hover, 150ms, nothing else moves
Email submit:  #CC1133 → #AA0F28 on hover, 150ms
```

No other hover states exist on this site.

---

## Components

### CosmicBackground

Fixed full-viewport element. Renders behind all page content.

```
position: fixed
inset: 0
z-index: -1
background: radial-gradient(ellipse at 50% 45%, #0d0003 0%, #080001 30%, #030000 60%, #000000 100%)
pointer-events: none
```

Wraps all pages. Content sits above it. Never changes regardless of scroll position.

---

### BottomNav (homepage only)

Pinned to viewport bottom. Appears on homepage only — not inner pages.

```
position: fixed
bottom: 0
width: 100%
background: #000000  ← true black, NOT the gradient
border-top: 1px solid #1a1a1a
padding: 16px 0
z-index: 100
```

Four links: `FOUNDATIONS · COACHING · ABOUT · SIGNAL/NOISE`

Link styles:
```
font: Inter 10px, uppercase, letter-spacing: 0.12em
color: #555555
hover: #F0F0F0, 150ms
active: #CC1133
spacing: evenly distributed or gap-based flex row
```

---

### TopNav (inner pages)

Sticky top. Appears on Foundations, Coaching, About, Apply — not homepage.

```
position: sticky
top: 0
width: 100%
border-bottom: 1px solid #1a1a1a
background: #000000 (or slight transparency with backdrop-blur)
z-index: 50
padding: 16px 24px
```

Left: `ATTUNE` wordmark — Inter, 11px, uppercase, letter-spacing 0.15em, color #F0F0F0
Right: nav links — Inter, 11px, uppercase, letter-spacing 0.15em, color #555555, hover #F0F0F0

---

### CTA Button

Transparent background, crimson border, zero border-radius.

```
background: transparent
border: 1px solid #CC1133
border-radius: 0
padding: 12px 24px
color: #F0F0F0
font: Inter 11px uppercase letter-spacing 0.1em
cursor: pointer
transition: border-color 150ms

:hover {
  border-color: #FF1A3E
}
```

Nothing else moves on hover.

---

### SectionLabel / Eyebrow

Uppercase label above section headlines.

```
font: Inter 10px uppercase letter-spacing 0.2em
color: #CC1133  ← counts toward crimson budget
display: block
margin-bottom: 16px
```

---

### PillarCard (WQF numbered system)

Used in Foundations module list and Coaching numbered sections.

```
background: #080001  ← lifted surface
border: none
padding: 24px
```

Structure:
```
[crimson numeric]  01/08          ← Inter mono 11px #CC1133
[title]            MODULE TITLE   ← Inter 11px uppercase #F0F0F0
[body]             one sentence   ← Inter 15px #888888 line-height 1.85
```

Two-column grid desktop, single column mobile.

---

### EmailCapture

Input and button flush — no gap between them.

```
display: flex
width: 100%
max-width: 420px

input {
  flex: 1
  background: #111111
  border: 0.5px solid #2a2a2a
  border-right: none
  border-radius: 0
  padding: 12px 16px
  color: #F0F0F0
  font: Inter 14px
  placeholder-color: #666666
}

button {
  background: #CC1133
  border: none
  border-radius: 0
  padding: 12px 20px
  color: #000000
  font: Inter 11px uppercase letter-spacing 0.1em
  white-space: nowrap
  cursor: pointer
  transition: background 150ms

  :hover {
    background: #AA0F28
  }
}
```

Below the input, in #333333, 10px: `"Weekly signal. No noise."`

---

### Footer

Single line. Inner pages only.

```
border-top: 1px solid #1a1a1a
padding: 24px
text-align: center
font: Inter 11px
color: #333333
```

Content: `© {year} Attune` or equivalent minimal line.

---

## Page Specs

### Homepage (leo.im DNA)

Full viewport height. Everything centered vertically and horizontally.
Content max-width: 480px.
No top navigation. No competing elements.

**Structure top to bottom:**

1. Eyebrow
   - `SAM ELSNER` — Inter 10px, uppercase, letter-spacing 0.2em, #555555

2. Headline (large Playfair Display, weight 300, fluid)
   - Approved copy: `"You were never behind. You were in the wrong environment."`
   - Wrapped in typographic quote marks exactly like leo.im
   - Color: #F0F0F0
   - Animation: opacity 0 → 1, 1.4s, delay 0.3s

3. Subline
   - `Attune is a practice. Not a program.`
   - Inter 15px, #888888, max-width 420px

4. EmailCapture component (Kit-connected, stubbed)

5. BottomNav (pinned bottom)

---

### Foundations Page (WQF DNA)

Sticky TopNav. Cosmic gradient throughout.

**Section 1 — Hero (80vh)**
- Eyebrow: `FOUNDATIONS` in #CC1133
- Headline (Playfair Display): approved copy from voice work
- Subline: one sentence, #888888
- Price: `$197` — #F0F0F0, plain, not badged, not styled
- CTA: `Enroll in Foundations →` — CTA button component

**Section 2 — Who This Is For**
- Lead sentence in #F0F0F0, bold
- One paragraph in #888888, max-width 560px
- Describes. Does not convince.

**Section 3 — Eight Modules**
- PillarCard × 8, numbered 01/08 through 08/08
- Two-column grid desktop, single column mobile
- Section background: #080001

**Section 4 — What Changes**
- Two-line ethos fragment, large Playfair Display, centered, hard line break:
  ```
  "You will not learn to move better."
  "You will learn to see differently."
  ```
- One short paragraph below in #888888

**Section 5 — CTA Close**
- Repeat price. Repeat CTA button.
- `One-time payment. Lifetime access.` — Inter 12px, #555555

---

### Coaching Page (WQF DNA)

Sticky TopNav. Cosmic gradient throughout.

**Section 1 — Hero (80vh)**
- Eyebrow: `1-ON-1 COACHING` — #888888 (not crimson)
- Headline (Playfair Display): approved copy from voice work
- Subline in #888888
- `Ten spots. That is the limit.` — #F0F0F0, slightly larger
- CTA: `Apply for a spot →` — CTA button component
- Note: `Application only. Next cohort reviewed monthly.` — Inter 11px, #555555

**Section 2 — What This Is**
- One declarative lead sentence
- One paragraph on the working relationship
- No promises. No guarantees. No testimonials.

**Section 3 — Who Belongs**
- 3 PillarCards numbered 01/03 · 02/03 · 03/03
- Each: crimson numeric, one qualifying sentence
- Background: #080001

**Section 4 — The Process**
- 3 steps numbered plainly
- The honest sequence of what happens after applying

**Section 5 — CTA Close**

---

### About Page

Sticky TopNav. No numbered systems. Prose-led.

**Structure:**
1. Tagline: `Just a discus thrower who found ecological dynamics and hasn't shut up about it since.`
   - Playfair Display, large, centered — treat as a pull quote
2. Bio block (Dan Koe style — plain, direct):
   - Short paragraph: who, what, where it started
3. Signal/Noise line:
   - `Join 565+ getting mindf*cked twice a week reading about skill, the environment, and why everything you were taught was wrong.`
4. CTAs: `Start with Foundations →` / `Read Signal/Noise →`

---

### Apply Page

Sticky TopNav. Decision is made. Do not re-sell.

**Structure:**
1. Two-sentence opener. Calm.
2. Embedded form (stubbed iframe or placeholder)
3. One personal note below the form in #888888

---

## Copy Rules (enforced in every word)

**Never use:**
optimize · unlock · elevate · journey · empower · leverage · transform · innovative · game-changing · next-level · cutting-edge · curated · intentional · holistic · resonate · aligned · em dashes

**Copy states. It does not convince.**

**The reader belongs here or they do not. The copy knows this.**

---

## Technical Constraints

- Next.js (App Router), TypeScript, Tailwind CSS
- Custom CSS properties for gradient and tokens in `globals.css`
- `next/font/google` for Playfair Display and Inter
- Mobile responsive throughout
- Stripe: stubbed with placeholder checkout URL
- Kit: form stubbed with placeholder action URL
- No build errors from first commit
- Vercel-ready from first commit

---

## File Structure

```
src/
  app/
    layout.tsx           — base layout, fonts, metadata, no nav
    page.tsx             — homepage
    foundations/page.tsx — sales page
    coaching/page.tsx    — application page
    apply/page.tsx       — form page
    about/page.tsx       — origin story
  components/
    BottomNav.tsx        — homepage only, pinned bottom
    TopNav.tsx           — inner pages, sticky top
    Footer.tsx           — single line, inner pages
    CTA.tsx              — reusable crimson border button
    SectionLabel.tsx     — reusable eyebrow
    PillarCard.tsx       — numbered WQF card
    EmailCapture.tsx     — Kit-connected, stubbed
    CosmicBackground.tsx — gradient wrapper
  lib/
    fonts.ts
  styles/
    globals.css
```

---

## Emotional Register Per Page

| Page | Register |
|------|---------|
| Homepage | A room where someone very still is already waiting. The door is open. |
| Foundations | Finding something you were looking for without knowing you were looking for it. |
| Coaching | Earned access. Ten spots because genuine attention requires a limit. |
| About | The moment a framework clicks. Not inspiration. Recognition. |

---

*Spec version: 1.0 — 2026-03-28*
