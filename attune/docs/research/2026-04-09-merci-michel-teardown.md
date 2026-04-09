# Site Teardown: Merci-Michel

**URL:** https://www.merci-michel.com  
**Built by:** Merci-Michel (in-house)  
**Platform:** Custom vanilla JS SPA — no React/Vue/Next. Client-side routing, Twig.js templates, Three.js WebGL renderer.  
**Date analyzed:** 2026-04-09

---

## Tech Stack (Confirmed from Source)

| Technology | Evidence | Purpose |
|---|---|---|
| Three.js | `app.context.scene`, `THREE.ShaderMaterial`, mesh/camera/renderer references | WebGL rendering of project cover images and interactive experiments (balloons, fruits, etc.) |
| GSAP (TweenMax) | `TweenMax.to/from/set/fromTo/killTweensOf`, `Expo.easeInOut`, ticker | All DOM and 3D object animation |
| CANNON.js | `SceneUtils.sync(mesh, body)`, physics body copy | Physics simulation for balloon/cherry/fruit experiments in About section |
| Twig.js (0.8.9) | Found in vendors.js | Client-side HTML templating (renders sections from JSON data) |
| Custom Scroll Manager | `Scroll.getInstance()`, WheelIndicator, Lethargy | Scroll velocity/direction detection, replaces Lenis/Locomotive |
| Lethargy | `this.lethargy.check(event)` | Distinguishes trackpad momentum from mouse wheel scroll |
| Sprite Sheet Renderer | `SpriteMovieClip`, `SpriteFlashCCMovieClip` | Preloader animation (40 frames) + logo animation (30 frames) |
| Custom rAF Manager | `rAFManager.add(callback, fps, delay, once)` | Throttled requestAnimationFrame ticker |
| Custom Router | `app.router.lastRoute` | SPA client-side routing without a framework |
| Custom Signal System | `signal.add()`, `signal.addOnce()`, `signal.dispatch()` | Observer/event pattern (like miniSignals) |
| Browser/Device Detection | vendors.js, `device-desktop/tablet/phone` body classes | Applies CSS classes + conditional behavior |

---

## Design System

### Colors
| Name / Usage | Value |
|---|---|
| Primary background | `#212121` (dark charcoal — NOT pure black) |
| Text / UI | `#ffffff` |
| Yellow accent | `#f5dd52` |
| Muted gray text | `#6d6d6d` |
| Overlay (transparent) | `rgba(0,0,0,0.3)` |
| Subtle white overlay | `rgba(255,255,255,0.2)` |
| Ghost white | `rgba(255,255,255,0.1)` |
| Progress bar track | `rgba(255,255,255,0.2)` |

> **Attune note:** Swap `#212121` → `#000000`, `#f5dd52` → `#C10907` (Cosmic Crimson Red).

### Typography
| Role | Font | Weight | Key Sizes | Usage |
|---|---|---|---|---|
| UI / mono | `"Mnm"` (custom) | Regular | 10–14px | Header nav, footer, filter buttons, slide text labels |
| Heading | `"Bodoni Book"` (custom serif) | Book | 28–70px | Project titles |
| Heading italic | `"Bodoni Book Italic"` | Italic | 28–74px | Project subtitles, button text |

**Font files** (self-hosted, no Google Fonts):
```
fonts/BodoniSevITC-Book.woff
fonts/BodoniSevITC-BookItal.woff
fonts/Mnm.woff
```

**Attune equivalents:**
- `"Mnm"` → Your `Clash Grotesk` (same utility role)
- `"Bodoni Book"` → Your `Instrument Serif`
- `"Bodoni Book Italic"` → `Instrument Serif` italic

### Spacing System
- Border frame: **15px** white edges (top/right/bottom/left, fixed)
- Header: `top: 20px; left/right: 30px; height: 60px`
- Footer: `bottom/right/left: 30px`
- Internal padding: multiples of 10px (10, 20, 50)
- Stagger delay pattern: `0.02s × n` per character, `0.01 × index` per item

### Easing Functions
```css
/* Primary — smooth ease-out (used everywhere) */
cubic-bezier(0.19, 1, 0.22, 1)

/* Sharp ease-out (UI elements) */
cubic-bezier(0.55, 0, 0.1, 1)

/* Ease-in (exits) */
cubic-bezier(0.55, 0.055, 0.675, 0.19)

/* GSAP equivalent */
Expo.easeInOut
```

### Keyframes
```css
@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
/* Used by loader__spinner */

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

### Z-Index Stack
```
1001 → .border (white frame edges)
1000 → .preloader
 999 → header
 100 → .loader (page transition overlay)
   2 → footer, .projects__filters
   1 → #main-container
   0 → WebGL canvas
```

### Responsive Breakpoints
| Breakpoint | Key changes |
|---|---|
| `max-width: 1440px` | Project description max-width 80% |
| `max-width: 1200px` | Title/subtitle font → 45px, `.footer__side` hidden |
| `max-width: 1000px` | Role/award lists hidden, footer year/buttons hidden |
| `max-height: 880px` | Video narrower (63% width), caption hidden |
| `max-height: 680px` | Filter bar hidden, project title 24px |

---

## Effects Breakdown

| Effect | Implementation | Complexity | Cloneable? |
|---|---|---|---|
| White border frame | 4 fixed `div.border` elements (15px each), scale-in on page enter | Low | Yes |
| Preloader sprite animation | 400×90px spritesheet (40 frames, 4 col), `background-position` steps | Medium | Yes |
| Header logo sprite | 120×120px spritesheet (30 frames, 6 col), same technique | Medium | Yes |
| Nav letter hover | Each letter wrapped in `<span>`, base slides down / top slides in via CSS | Medium | Yes |
| Full-screen chapter navigation | Scroll/keyboard/button triggers chapter switch, GSAP animates in/out | High | Partially |
| Project WebGL thumbnails | Three.js plane meshes with image textures in horizontal 3D grid | High | Hard |
| Filter animation | CSS `opacity` + `translateY(15px)` stagger per filter item | Low | Yes |
| Footer progress bar | Width driven by current chapter index / total chapters ratio | Low | Yes |
| Physics experiments (About) | CANNON.js + Three.js — balloons, fruits, cherry bounce | Very High | Hard |
| Page transition loader | Fixed overlay + `scaleX/scaleY` wipe (mobile) or opacity fade (desktop) | Medium | Yes |
| Project slide transitions | Class-based: `animation-in-next/prev`, `animation-out-next/prev` on parent | Medium | Yes |
| Blur between slides | Custom `Blur` object, `progress` 0→1 on `THREE.ShaderMaterial` | High | Hard |
| Video player | Custom `<video>` element with play/pause, progress bar, border hover | Medium | Yes |

---

## Implementation Details

### 1. White Border Frame (The Signature Effect)
```html
<div class="borders">
  <div class="border border--top"></div>
  <div class="border border--right"></div>
  <div class="border border--bottom"></div>
  <div class="border border--left"></div>
</div>
```

```css
.border {
  position: fixed;
  z-index: 1001;
  background: #fff;
}
.border--top, .border--bottom { left: 0; width: 100%; height: 15px; }
.border--left, .border--right { top: 0; width: 15px; height: 100%; }
.border--top { top: 0; transform-origin: top; }
.border--bottom { bottom: 0; transform-origin: bottom; }
.border--left { left: 0; transform-origin: left; }
.border--right { right: 0; transform-origin: right; }

/* On page load, start scaled to 0 */
.page-enter-animation .border--top,
.page-enter-animation .border--bottom { transform: scaleY(0); }
.page-enter-animation .border--left,
.page-enter-animation .border--right { transform: scaleX(0); }
/* Then JS removes .page-enter-animation → CSS transitions animate them in */
```

**The key insight:** The borders are always there, just `scaleX(0)` / `scaleY(0)`. Removing the `.page-enter-animation` class triggers the CSS transition. Extremely simple.

---

### 2. Spritesheet Animation (Preloader + Logo)
```html
<!-- Preloader: 40 frames, 4 columns, 400x90px per frame -->
<span class="preloader__sprite" 
  data-frames="40" 
  data-columns="4" 
  data-width="400" 
  data-height="90" 
  data-scale="1">
</span>

<!-- Logo: 30 frames, 6 columns -->
<a class="header__logo spritesheet" 
  data-frames="30" 
  data-columns="6" 
  data-width="120" 
  data-height="120" 
  data-scale=".5">
</a>
```

```javascript
// Core render loop (simplified):
function renderFrame(currentFrame) {
  const colIndex = currentFrame % nbCols;
  const rowIndex = Math.floor(currentFrame / nbCols);
  const x = colIndex * frameWidth;
  const y = rowIndex * frameHeight;
  element.style.backgroundPosition = `-${x * scale}px -${y * scale}px`;
}
```

**The key insight:** One PNG contains all frames in a grid. JS steps through `background-position` at the target fps. No video, no canvas — just a CSS background.

For Attune: you can create a sprite sheet of your logo animating from a wordmark into a symbol, or just use CSS/SVG animation instead.

---

### 3. Header Navigation Letter Animation
Each nav word is split into individual `<span>` elements, with a `.base` (visible) and `.top` (hover state) layer stacked:

```html
<a class="header__item">
  <span class="top"><span class="letter">P</span><span class="letter">r</span>...</span>
  <span class="base"><span class="letter">P</span><span class="letter">r</span>...</span>
</a>
```

```css
/* On hover, base letters slide down and fade out */
.header__item.hover-animation .base .letter {
  transform: translate3d(0, 12px, 0);
  opacity: 0;
  transition: transform 350ms cubic-bezier(0.55, 0, 0.1, 1);
}
/* Top letters slide in from above */
.header__item.hover-animation .top .letter {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
/* Each letter staggers by 0.02s * index */
```

**The key insight:** Two identical text layers stacked absolutely. On hover, JS adds `.hover-animation` class. CSS handles the stagger with `nth-child` transition delays.

---

### 4. Chapter-Based Full-Screen Navigation

The entire site is structured as "chapters" — fullscreen sections navigated by scroll, keyboard arrows, or footer prev/next buttons:

```javascript
// Scroll → detect direction → switch chapter
this.scroll.onScroll = (event) => {
  if (!this.canSwitchItem) return;
  const direction = event.deltaY > 0 ? 1 : -1;
  this.navigateToIndex(this.currentIndex + direction);
};

// Chapter transitions
chapter.animateIn(direction) {
  // direction: 1 = going forward, -1 = going back
  element.classList.add(direction > 0 ? 'animation-in-next' : 'animation-in-prev');
  setTimeout(() => this.removeTransitionClasses(), 500);
}
```

```css
/* CSS handles the actual motion — JS just toggles classes */
.animation-in-next { animation: slideInFromBottom 0.5s ... }
.animation-out-next { animation: slideOutToTop 0.5s ... }
```

**The key insight:** `canSwitchItem` flag prevents rapid switching. A 300ms `changeDelay` timeout resets it. The animation is CSS — JS only manages state.

---

### 5. Footer Progress Bar
```javascript
// Total chapters: n
// Current chapter: i
// Progress: i / (n - 1)
app.footer.setProgress(currentIndex / (totalChapters - 1));

// CSS transforms the bar's width
.footer__progress-container { width: 30%; left: 35%; }
.footer__progress-bar { transform-origin: left; transform: scaleX(progress); }
```

On hover, the bar thickens (`scaleY(1)` from `scaleY(0.2)`).

---

### 6. Page Transition Loader

**Desktop:** Simple opacity fade of a black overlay.  
**Mobile:** `scaleY(0)` wipe from bottom, then `scaleX(0)` wipe from right.

```css
/* Mobile enter */
.loader__overlay--vertical { transform-origin: bottom; }
.loader__overlay--show-vertical { transform: scaleY(0); transition: none; }
/* Animate out from top */
.loader__overlay--hide-vertical { transform-origin: top; transform: scaleY(0); }
```

The spinner is a simple CSS `rotation` keyframe on a `border-left: solid` circle.

---

### 7. Project Filter Animation
```css
.filter {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
  transition: opacity 0.8s cubic-bezier(0.55, 0, 0.1, 1),
              transform 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}

/* Stagger via nth-child duration (not delay!) */
.projects__filters--show .filter:nth-child(1) { transition-duration: 0.80s; }
.projects__filters--show .filter:nth-child(2) { transition-duration: 0.95s; }
.projects__filters--show .filter:nth-child(3) { transition-duration: 1.10s; }
/* ...continues */
```

**The key insight:** The stagger is achieved by varying `transition-duration` per child — longer duration = appears to start later and animate for longer. Unusual but effective.

---

## Assets Needed to Recreate

1. **Custom fonts** — "Mnm" (monospace-style) + Bodoni serif. For Attune: use Clash Grotesk + Instrument Serif (already in codebase).
2. **Spritesheet PNG for preloader** — A sequence of your logo animating. Alternative: CSS/SVG animation is simpler.
3. **Spritesheet PNG for header logo** — Logo animation loop. Alternative: Lottie or CSS animation.
4. **Project cover images** — High-quality dark-background project shots. For Attune: screenshot each content piece with dark backdrop.
5. **White border frame** — Pure CSS, no asset needed.

---

## Build Plan for Attune

### What to Emulate (High Value, Low Effort)
These Merci-Michel patterns are worth stealing directly:

1. ✅ **White border frame** → swap white for `#C10907` crimson or keep white
2. ✅ **Chapter-based full-screen navigation** → each section = a chapter, scroll/arrow key advances
3. ✅ **Footer with prev/next + progress bar + section info**
4. ✅ **Letter-by-letter hover animation on nav links**
5. ✅ **Filter buttons for content categories** (newsletter issues, essays, etc.)
6. ✅ **Page transition wipe** (overlay scale animation)

### What to Skip
These require Three.js expertise and aren't worth the effort for Attune:

- ❌ WebGL project grid thumbnails (use CSS grid instead)
- ❌ CANNON.js physics experiments (use CSS/SVG animations)
- ❌ Blur shader between slides (use CSS `backdrop-filter: blur`)
- ❌ Spritesheet logo animation (use CSS/SVG/Lottie)

### Recommended Stack for Attune

- **Framework**: Next.js 14 (already in use ✓)
- **Styling**: Tailwind CSS (already in use ✓)
- **Animation**: GSAP + ScrollTrigger (replace TweenMax which is GSAP v2)
- **Smooth scroll**: Lenis (simpler than MM's custom scroll manager)
- **Page transitions**: Framer Motion `AnimatePresence` (already in use ✓)

### NPM Packages
```bash
npm install gsap @studio-freight/lenis
# GSAP handles: border reveal, letter stagger, chapter transitions, footer progress
# Lenis handles: smooth scroll with velocity detection
```

### Section-by-Section Build Order

**1. Shell + Border Frame**
- `div.borders` with 4 fixed divs (top/right/bottom/left), 15px thick
- Start `scaleX(0)` / `scaleY(0)`, animate to 1 on mount using GSAP
- Use `#C10907` or white depending on Attune's color direction

**2. Header Navigation**
- Fixed top, 60px height, 30px padding
- Logo left (spritesheet OR SVG animation)
- Nav links right: Contact / Essays / About
- Letter split + hover animation (use SplitText or custom span-wrap)
- Mnm font → Clash Grotesk

**3. Preloader**
- Full-screen `#000` overlay
- Animated logo in center (CSS animation or Lottie)
- Fade out with `opacity: 0` + pointer-events: none after 1.5s

**4. Home Chapter (Hero)**
- Full-screen, vertically centered text
- "ATTUNE" title (Bodoni → Instrument Serif, 70px)
- Subtitle (italic, same size)
- Background: video loop or WebGL canvas (use `<video>` muted loop)
- Scroll-down indicator: vertical line + "scroll" text

**5. Projects/Work Chapter**
- Grid of content cards (newsletter issues, essays, case studies)
- Filter buttons above: All / Newsletter / Essays / Foundations
- Hover: show description + tags (`.projects__paragraph` pattern)
- Each card: title + subtitle + colored hover thumbnail

**6. About Chapter**
- Interactive experiment OR static content
- MM uses physics balloons — Attune alternative: aurora/particle canvas

**7. Footer (Persistent)**
- Fixed bottom: `right/bottom/left: 30px`
- Left: year range (2023/2026)
- Center: progress bar (thin line, centered, 30% width)
- Right: prev/next arrow buttons + current/total counter
- Bottom: section title/subtitle/description that updates per chapter

**8. Loader (Page Transitions)**
- Fixed overlay, `z-index: 100`
- Desktop: opacity fade
- Mobile: `scaleY` wipe from bottom → `scaleX` from right
- Spinner: CSS `border-left` rotation keyframe

**9. Project Detail Slides**
- Chapter system: Title slide → Description slide → Video slide → Image slides
- Navigate with scroll/keyboard/footer buttons
- Title: large serif, centered, over full-bleed image
- Description: two-column text layout (role list left, credits right)
- Video: bordered player with custom controls

---

## Key Architecture Decisions

**Chapter System Pattern:**
```javascript
// Each "chapter" is a manager object
class Chapter {
  enter(parentEl) { /* mount DOM, bind events */ }
  exit() { /* unbind, destroy */ }
  show() { /* animate in */ }
  hide() { /* animate out */ }
  next() { /* advance to next slide within chapter */ }
  previous() { /* go back */ }
}

// Scheme orchestrates chapters
class Scheme {
  chapters = [];
  currentChapter = null;
  canSwitchItem = false; // debounce flag
  changeDelay = 300;
  
  navigateToIndex(index) {
    if (!this.canSwitchItem) return;
    this.canSwitchItem = false;
    // animate out current, animate in next
    // reset canSwitchItem after changeDelay
  }
}
```

**State Flag Pattern (copy this):**
```javascript
// Always gate animations with flags
this.canChange = true;
this.isAnimating = false;
this.showed = false;
// Check flags before triggering animation
// Set flag false → animate → set flag true in onComplete
```

---

## Notes

- MM uses TweenMax (GSAP v2, legacy). Use modern `gsap` v3 instead — same API, better performance.
- The `cubic-bezier(0.19, 1, 0.22, 1)` easing is gorgeous — use it everywhere in Attune.
- The `#212121` background with white text and `15px` border frame is the entire visual identity. The Three.js is secondary.
- For Attune, the "chapters" map perfectly: Home / Newsletter / Foundations / About / Contact.
- The footer progress bar is extremely effective for long-form navigation — build it early.
- MM doesn't use any CSS framework or design tokens. For Attune with Tailwind, add custom bezier curves to `tailwind.config.ts`.
