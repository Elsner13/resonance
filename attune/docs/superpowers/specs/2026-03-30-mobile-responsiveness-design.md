# Mobile Responsiveness Design
**Date:** 2026-03-30
**Status:** Approved

## Goal
Make all pages on attunemastery.com look and feel correct on mobile devices (≥320px). No content should overflow, no text should be illegible, and the nav should adapt gracefully to small screens.

---

## Breakpoint Strategy
Single breakpoint: `640px`.
- `< 640px` = mobile styles
- `≥ 640px` = desktop styles (existing behavior unchanged)

Since the codebase uses inline React styles (no Tailwind classes), responsive styles are applied via a `useIsMobile()` hook (or CSS `@media` in `globals.css` for the nav) rather than className breakpoints.

---

## 1. TubelightNav — Mobile Full-Width Bar

### Desktop (≥640px) — unchanged
- Existing pill nav, centered, floating, tubelight spring animation intact.

### Mobile (<640px)
- Full-width strip pinned to the bottom edge of the viewport.
- `position: fixed; bottom: 0; left: 0; right: 0`
- `background: rgba(255,255,255,0.96); backdrop-filter: blur(12px)`
- `border-top: 1px solid rgba(0,0,0,0.09)`
- `padding: 10px 0 max(14px, env(safe-area-inset-bottom))` — respects iOS home bar
- Items: `display: flex; justify-content: space-around; align-items: center`
- Each item: `font-size: 11px; padding: 4px 8px; letter-spacing: 0.08em`
- Active indicator: underline bar (`width: 20px; height: 2px; background: #000`) centered below active label. Replaces the absolute-positioned tubelight (which relies on measured pixel offsets that don't apply in the full-width layout).
- Tubelight motion div hidden on mobile.

**Implementation:** Add a `useIsMobile()` hook (`window.innerWidth < 640`, with resize listener) inside `TubelightNav.tsx`. Conditionally render the pill container vs the full-width strip based on `isMobile`. Both branches use the same `navItems` array and active-index logic.

---

## 2. Font Size Floors — All Pages

The pattern `clamp(Xpx, Nvw, Ypx)` bottoms out at its minimum on mobile. Current minimums are too small:

| Location | Current min | Fixed min |
|---|---|---|
| Homepage / Foundations / About — body text | 10px | 15px |
| Homepage / Foundations / About — headline | 12px | 16px |
| Homepage / Foundations / About — CTA button | 10px | 12px |
| Apply — pre-form qualifier | 10px | 14px |
| Apply — headline | 12px | 16px |
| Coaching — headline | 14px | 16px |
| Sign-in link (homepage) | 9px | 11px |

Fix: update the first argument of each `clamp()` to the values above. The middle `vw` value and max remain unchanged — this only improves the mobile floor, not desktop.

---

## 3. Logo Sizing — Coaching + Apply Pages

`min(140px, 14vw)` = 52px on a 375px phone. Too small.

Fix: change to `min(140px, max(80px, 14vw))` — guarantees a minimum of 80px on any device, up to 140px on desktop.

Pages affected: `coaching/page.tsx`, `apply/page.tsx`.

---

## 4. Homepage / Foundations / About — Vertical Scroll Safety

These pages use `position: fixed; inset: 0` with `display: flex; justifyContent: center; alignItems: center`. Content is vertically centered. On very small screens (iPhone SE: 375×667) with the nav taking ~60px at the bottom, the available height is ~607px.

Current content height estimate (homepage): logo ~120px + gap + headline ~20px + body ~80px + button ~40px + sign-in link ~20px = ~300px. Fits comfortably.

No layout change needed. However, add `paddingBottom: 80px` to the centered-flex container to ensure content never slides under the fixed nav on any screen size.

---

## 5. Module Pages — Bottom Clearance

`/dashboard/[slug]` has `paddingBottom: 96px` in the scroll container — sufficient. No nav is shown on module pages, so no change needed.

---

## 6. CompleteButton — Full-width on Mobile

Currently `padding: '10px 28px'` inline, centered. On mobile, make it full-width for a better tap target.

Fix: add `width: '100%'` and `boxSizing: 'border-box'` to the button in `CompleteButton.tsx` on mobile. Use the same `useIsMobile()` hook.

---

## Files to Change

| File | Change |
|---|---|
| `src/components/TubelightNav.tsx` | Add `useIsMobile()`, render full-width bar on mobile |
| `src/app/page.tsx` | Fix font size floors, add paddingBottom to container |
| `src/app/foundations/page.tsx` | Fix font size floors, add paddingBottom to container |
| `src/app/about/page.tsx` | Fix font size floors, add paddingBottom to container |
| `src/app/coaching/page.tsx` | Fix logo min-size, fix headline font floor |
| `src/app/apply/page.tsx` | Fix logo min-size, fix font floors |
| `src/app/dashboard/[slug]/CompleteButton.tsx` | Full-width button on mobile |

---

## Out of Scope
- Sign-in / Welcome pages — Clerk's `<SignIn>` and `<SignUp>` components are self-responsive.
- Module hero / inline animations — SVG-based, already use viewBox and scale naturally.
- ApplyForm inputs — Clerk-style inputs already full-width.
- Dark theme / color changes — no visual redesign, only layout fixes.
