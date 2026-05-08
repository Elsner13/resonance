# Foundations Dashboard Design

**Date:** 2026-03-29
**Status:** Approved
**File:** `src/app/dashboard/page.tsx`

## Goal

Replace the current bare-bones dashboard with a polished, centered page that matches the Attune design system — white background, Montserrat Alternates, minimal black/white aesthetic.

## Design System Reference

| Token | Value |
|---|---|
| Background | `#ffffff` (white page, dotted surface canvas from `layout.tsx` behind) |
| Primary text | `#000000` |
| Muted text | `#999999` / `#aaaaaa` |
| Border | `1px solid rgba(0,0,0,0.10)` |
| Border radius | `4px` (list container) |
| Font | Montserrat Alternates (`var(--font-montserrat-alternates)`) |

## Layout

Single-column centered layout. Matches the welcome page pattern exactly:

- Outer: `position: fixed; inset: 0; display: flex; flex-direction: column; overflow-y: auto`
- Inner: `margin: auto; display: flex; flex-direction: column; align-items: center; max-width: 480px; padding: 48px 24px`

## Components

### UserButton (top-right)
- Clerk `<UserButton>` component
- `position: absolute; top: 20px; right: 24px`

### Logo
- `<Image src="/attune-logo.png">`, 52×52px
- Same usage as welcome page and homepage

### Heading block
- Eyebrow: `"FOUNDATIONS"` — Montserrat Alternates, 10px, uppercase, `letterSpacing: 0.12em`, `color: #999`
- Title: `"Eight modules. One shift."` — Montserrat Alternates, 22px, weight 600, `color: #000`
- Progress line: `"X of 8 complete"` — 12px, `color: #aaa`
  - `X` = count of completed modules from Clerk `publicMetadata.completedModules`

### Module list
- Bordered container: `border: 1px solid rgba(0,0,0,0.10)`, `borderRadius: 4px`, `width: 100%`, `maxWidth: 480px`
- 8 rows, each: `padding: 14px 20px`, `borderBottom: 1px solid rgba(0,0,0,0.07)` (last row no border)
- Row contents (left to right):
  1. **Number** — `"01"–"08"`, 10px, `color: #ccc`, `minWidth: 18px`
  2. **Check indicator** — 15×15px circle:
     - Completed: filled black circle + white CSS checkmark
     - Incomplete: empty circle, `border: 1.5px solid rgba(0,0,0,0.18)`
  3. **Title** — Montserrat Alternates, 12px, uppercase, `letterSpacing: 0.06em`, `color: #000`
- Completed rows: `opacity: 0.42`
- No click behavior (display only for now)

## Data

- Read `currentUser()` from Clerk (server component)
- `completedModules`: `(currentUser?.publicMetadata?.completedModules as string[]) ?? []`
- A module is complete if its slug is in `completedModules`
- Module slugs: `module-1` through `module-8` (matching existing convention)
- Progress count: `completedModules.length` of 8

## Module List

```ts
const modules = [
  { num: '01', slug: 'module-1', title: 'The Wrong Problem' },
  { num: '02', slug: 'module-2', title: 'How Skill Actually Happens' },
  { num: '03', slug: 'module-3', title: 'What Your Environment Is Doing to You' },
  { num: '04', slug: 'module-4', title: 'The Constraints That Are Running You' },
  { num: '05', slug: 'module-5', title: 'Repetition Without Repetition' },
  { num: '06', slug: 'module-6', title: 'Designing the Bowl' },
  { num: '07', slug: 'module-7', title: 'Representative Practice' },
  { num: '08', slug: 'module-8', title: 'The Perceptual Shift' },
]
```

## Implementation

Single file change: `src/app/dashboard/page.tsx`

- Server component (uses `currentUser()`)
- No new dependencies
- No new files
