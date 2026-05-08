# Foundations Module Animations — Design Spec
**Date:** 2026-03-30
**Status:** Approved for implementation

---

## Overview

Add narrative canvas animations to all 8 Foundations course modules to reinforce the key concepts visually and help the material stick. Each module gets:
- **One hero canvas animation** — full-width, above the reading content, plays on load and loops
- **1–2 inline SVG animations** — embedded at the highest-leverage conceptual moments mid-reading

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Placement | Hero + inline | Both establish the concept (hero) and lock it in at the moment it's introduced (inline) |
| Style | Narrative canvas animations | Scroll/load-driven, particle-based, ambient motion — immersive without being distracting |
| Color | Dark background, unique identity color per module | Each module has its own visual world; dark canvas against white reading page creates clear separation |
| Hero tech | Canvas 2D API with requestAnimationFrame | Full creative control, no new dependencies, lightweight for inline use |
| Inline tech | Animated SVG with CSS keyframes | Sharp, semantic, accessible; diagrams can reinforce specific concepts precisely |

---

## Architecture

### File Structure

```
src/components/modules/
  ModuleHero.tsx              — wrapper: picks the right hero by slug
  ModuleInline.tsx            — wrapper: picks the right inline by slug + id
  heroes/
    Hero01WrongProblem.tsx
    Hero02SkillHappens.tsx
    Hero03Environment.tsx
    Hero04Constraints.tsx
    Hero05Repetition.tsx
    Hero06Bowl.tsx
    Hero07Representative.tsx
    Hero08PerceptualShift.tsx
  inline/
    Inline01SymptomRoot.tsx
    Inline02Differentiation.tsx
    Inline03Affordance.tsx
    Inline04ConstraintFlow.tsx
    Inline05PracticeVariability.tsx
    Inline06FourVariables.tsx
    Inline07PerceptionAction.tsx
    Inline08BeforeAfter.tsx
```

### Integration Points

**Hero:** Inserted in `src/app/dashboard/[slug]/page.tsx` immediately after the module title/subtitle block, before the divider and first section.

**Inline:** Inserted within specific sections in `page.tsx` — after the paragraph that introduces the concept the SVG diagram illustrates. Each inline component is keyed by module slug + a position ID.

### Canvas Hero Component Pattern

Each hero is a `"use client"` React component:
- Renders a `<canvas>` element, full-width, fixed height (`clamp(200px, 28vw, 320px)`)
- Uses `useEffect` to initialize the Canvas 2D context and start the animation loop
- Cleans up with `cancelAnimationFrame` on unmount
- Respects `prefers-reduced-motion` — falls back to a static frame if reduced motion is set
- No external dependencies — plain Canvas API only

### SVG Inline Component Pattern

Each inline is a `"use client"` React component:
- Uses Intersection Observer to trigger the animation when scrolled into view
- Renders an `<svg>` with CSS `@keyframes` animations
- Animated via `animationPlayState` toggled by the intersection observer
- Contained width (`max-width: 520px`), centered, with a subtle label above

---

## Module Specifications

### Module 01 — The Wrong Problem
**Color identity:** Red `#ef4444` · Background `#0d0505`

**Hero — "Reorientation"**
Particles stream toward a dim wrong target on the left. After ~2s, motion slows, then all particles pivot and reorganize toward a brighter correct target on the right. The pivot is the emotional hook — disorientation, then clarity.

**Inline — Symptom vs. Root Cause**
Two-column SVG: left column shows arrows pointing up to "symptom" labels, right column shows arrows pointing down to a "root" node. Animated: left arrows draw first (familiar pattern), then fade; right arrows draw to reveal the actual source.

---

### Module 02 — How Skill Actually Happens
**Color identity:** Cyan `#22d3ee` · Background `#020d10`

**Hero — "The Click"**
Canvas fills with scattered cyan particles in random motion (noise). Over ~4s, an invisible attractor gently pulls them. At ~5s: sudden snap — particles lock into a clean, recognizable grid/constellation (signal). The "click" is visual and visceral.

**Inline — Differentiation Arc**
Single SVG showing a particle cloud at three stages: large+diffuse (rough) → medium+tighter (refined) → small+precise (automatic). Animated: each stage assembles from the previous in sequence on scroll.

---

### Module 03 — What Your Environment Is Doing to You
**Color identity:** Green `#22c55e` · Background `#030d05`

**Hero — "The Loop"**
Two nodes (labeled "You" and "Environment") pulse gently on opposite sides of the canvas. A stream of green particles flows continuously from Environment → You → Environment. If either node is clicked/hovered, the loop breaks and both dim — restoring on release. Demonstrates the interdependence directly.

**Inline — Affordance Diagram**
SVG shows the Environment node emitting radial "handles" (short lines with circles at ends). The Person node reaches toward some (connecting, glowing) and misses others (fading). Animated sequentially on scroll.

---

### Module 04 — The Constraints That Are Running You
**Color identity:** Orange `#f97316` · Background `#0d0700`

**Hero — "The Bottleneck"**
Particles flow left-to-right through a wide pipe that narrows at one bright orange pinch point. Particles back up, then slow. When the animation cycles (~6s), the pinch opens — flow accelerates everywhere downstream immediately. The systemic nature of constraints is made visible.

**Inline — Before/After Flow**
Two-state SVG (toggle on scroll): "Before" shows the pinch with backup; "After" shows open flow. A thin label "constraint removed" appears at the transition point.

---

### Module 05 — Repetition Without Repetition
**Color identity:** Purple `#a855f7` · Background `#07040d`

**Hero — "Variable Paths"**
A single origin point on the left, a single destination on the right. Multiple purple particle trails launch from origin — each takes a visibly different arc but all arrive at destination. A second layer shows one rigid locked path (thin, brittle-looking). The contrast between the cloud of paths and the single locked path is the concept.

**Inline — Rigid vs. Variable Practice**
Side-by-side SVG: left shows a tight, identical repeated trajectory (rigid); right shows a varied, adaptive bundle of trajectories. Animated to draw simultaneously so the contrast lands.

---

### Module 06 — Designing the Bowl
**Color identity:** Indigo `#6366f1` · Background `#02050d`

**Hero — "The Attractor"**
Particles start scattered randomly across the canvas. An invisible bowl attractor slowly activates — particles begin to feel it, curving toward the basin. Over ~5s, the bowl's shape becomes visible purely from the particle trails. The bowl is never drawn directly — it's revealed by behavior. Click to scatter and watch it reform.

**Inline — 4 Design Variables Compass**
SVG compass with 4 axes: Challenge, Feedback, Constraint, Recovery. Each axis lights up and a brief label appears in sequence as the user scrolls past the section that introduces it.

---

### Module 07 — Representative Practice
**Color identity:** Gold `#eab308` · Background `#0d0b00`

**Hero — "The Transfer Gap"**
Canvas split into two fields: "Practice" (left) and "Performance" (right). Gold particles launch from left and arc toward right. When practice conditions "match" (default state), they land cleanly. Every ~4s, the right field shifts — particles now scatter on landing. Shift back — clean landing returns. The gap between practice and performance conditions is the entire concept.

**Inline — Perception-Action Loop**
SVG shows an environment node emitting a signal, a person node detecting it, and a response arc returning to the environment. Animated: signal appears → detection lights up → response draws → environment updates. The loop runs once on scroll entry.

---

### Module 08 — The Perceptual Shift
**Color identity:** Magenta `#ec4899` · Background `#0d0209`

**Hero — "Phase Transition"**
Slow-building tension: particles drift with increasing speed, clustering and colliding. At ~5s: a single flash — the entire system snaps into a completely different, stable configuration. The before-state and after-state are recognizably different systems. The transition is instantaneous and irreversible within the loop. This is enskilment made visible.

**Inline — Before/After Perception**
Split SVG: same abstract scene, two views. Left ("before"): fragmented, unconnected elements. Right ("after"): the same elements now connected, structured, meaningful. The transformation from noise to pattern mirrors the perceptual shift described in the text.

---

## Animation Principles

1. **Concept-first** — every animation directly models the concept. No decorative motion that doesn't earn its place.
2. **Reduced motion respect** — all canvas heroes check `prefers-reduced-motion` and render a static frame instead.
3. **Loop gracefully** — heroes loop with a natural reset, not an abrupt cut.
4. **Performance** — canvas contexts are cleaned up on unmount. No memory leaks. Animations pause when the tab is hidden (`document.visibilityState`).
5. **Dark canvas on white page** — the dark background creates a deliberate separation between the immersive animation world and the reading world.
6. **Inline animations trigger once** — Intersection Observer fires the SVG animation once when it enters the viewport. No looping distractions while reading.

---

## Integration in page.tsx

Hero insertion point (after subtitle, before divider):
```tsx
import ModuleHero from '@/components/modules/ModuleHero'

// After module title/subtitle block:
<ModuleHero slug={module.slug} />
<div style={dividerStyle} />
```

Inline insertion — after specific section paragraphs:
```tsx
import ModuleInline from '@/components/modules/ModuleInline'

// Inside the section rendering loop, after target paragraph:
{section.heading === 'The Constraint' && (
  <ModuleInline slug={module.slug} id="constraint-flow" />
)}
```

---

## Out of Scope

- Mobile-specific animation variants (responsive sizing handles this via canvas resize)
- Audio
- User-controlled playback
- Animation data persistence
