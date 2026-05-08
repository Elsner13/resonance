# Welcome Page — Clerk Form Styling

**Date:** 2026-03-28
**Status:** Approved
**File:** `src/app/welcome/page.tsx`

## Problem

The Clerk `<SignUp>` component on the welcome page renders several internal elements with Clerk's default styling (Inter font, purple focus rings, gray labels, generic divider, default error red). These elements are visually inconsistent with the Attune design system.

## Design System Reference

| Token | Value |
|---|---|
| Background | `#ffffff` |
| Primary text | `#000000` |
| Muted text | `#555555` / `#999999` |
| Accent / danger | `#CC1133` |
| Border | `1px solid rgba(0,0,0,0.10–0.20)` |
| Border radius | `2px` (inputs/buttons), `4px` (card) |
| Font | Montserrat Alternates (`var(--font-montserrat-alternates)`) |
| Label style | uppercase, 0.1em tracking, 10px, weight 600 |

## Solution: Option A — Bordered card, fully aligned

Keep the existing card border treatment. Update all internal Clerk appearance elements to match the design system.

### Approach

Use Clerk's `appearance.variables` for global overrides (font, primary color, danger color) and `appearance.elements` for targeted element-level overrides.

### `appearance.variables`

| Variable | Value | Effect |
|---|---|---|
| `colorPrimary` | `#000000` | Focus rings, active borders, primary links |
| `colorDanger` | `#CC1133` | Error text, error input borders |
| `fontFamily` | `var(--font-montserrat-alternates)` | All Clerk text nodes globally |
| `borderRadius` | `2px` | All inputs, buttons globally |

### `appearance.elements` changes

| Element | Change |
|---|---|
| `formFieldLabel` | `fontSize: 10px`, `fontWeight: 600`, `textTransform: uppercase`, `letterSpacing: 0.1em`, `color: #555555` |
| `dividerLine` | `borderColor: rgba(0,0,0,0.10)` |
| `dividerText` | `fontSize: 9px`, `textTransform: uppercase`, `letterSpacing: 0.12em`, `color: #bbbbbb` |
| `socialButtonsBlockButtonText` | `fontSize: 11px`, `letterSpacing: 0.04em` |
| `footerActionText` | `fontSize: 11px`, `color: #999999` |

### Elements already correct (no change)

| Element | Current value |
|---|---|
| `card` | `boxShadow: none`, `border: 1px solid rgba(0,0,0,0.12)`, `borderRadius: 4px`, `background: #ffffff` |
| `headerTitle` / `headerSubtitle` | `display: none` |
| `formButtonPrimary` | `background: #000`, `borderRadius: 2px`, `fontSize: 12px`, uppercase, tracked |
| `footerActionLink` | `color: #000000` |
| `formFieldInput` | `border: 1px solid rgba(0,0,0,0.2)`, `borderRadius: 2px` |

## Implementation

Single file change: `src/app/welcome/page.tsx`

1. Add `variables` block to the `appearance` prop with `colorPrimary`, `colorDanger`, `fontFamily`, `borderRadius`
2. Add `formFieldLabel`, `dividerLine`, `dividerText`, `socialButtonsBlockButtonText`, `footerActionText` to `appearance.elements`

No new files, no new dependencies.
