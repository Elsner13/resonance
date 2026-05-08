# Welcome Page Clerk Form Styling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Clerk `<SignUp>` appearance prop on the welcome page so all internal form elements match the Attune design system.

**Architecture:** Single `appearance` prop change in `src/app/welcome/page.tsx`. Add a `variables` block for global overrides (font, primary color, danger color, border radius) and extend `elements` with five targeted element styles. No new files, no new dependencies.

**Tech Stack:** Next.js 16, Clerk v7 (`@clerk/nextjs`), Montserrat Alternates (Google Fonts, already loaded via `src/lib/fonts.ts`)

---

### Task 1: Update Clerk appearance prop

**Files:**
- Modify: `src/app/welcome/page.tsx`

- [ ] **Step 1: Open the file and locate the `<SignUp>` appearance prop**

The `<SignUp>` component is at line ~145. The `appearance` prop currently has only an `elements` key. You will add a `variables` key and extend `elements`.

- [ ] **Step 2: Replace the `appearance` prop with the following**

```tsx
appearance={{
  variables: {
    colorPrimary: '#000000',
    colorDanger: '#CC1133',
    fontFamily: 'var(--font-montserrat-alternates)',
    borderRadius: '2px',
  },
  elements: {
    rootBox: { fontFamily: 'var(--font-montserrat-alternates)', width: '100%' },
    card: {
      boxShadow: 'none',
      border: '1px solid rgba(0,0,0,0.12)',
      borderRadius: '4px',
      background: '#ffffff',
      width: '100%',
    },
    headerTitle: { display: 'none' },
    headerSubtitle: { display: 'none' },
    formFieldLabel: {
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#555555',
    },
    formFieldInput: {
      borderRadius: '2px',
      border: '1px solid rgba(0,0,0,0.2)',
    },
    socialButtonsBlockButton: {
      border: '1px solid rgba(0,0,0,0.15)',
      borderRadius: '2px',
      color: '#000000',
    },
    socialButtonsBlockButtonText: {
      fontSize: '11px',
      letterSpacing: '0.04em',
    },
    dividerLine: {
      borderColor: 'rgba(0,0,0,0.10)',
    },
    dividerText: {
      fontSize: '9px',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#bbbbbb',
    },
    formButtonPrimary: {
      background: '#000000',
      borderRadius: '2px',
      fontFamily: 'var(--font-montserrat-alternates)',
      fontSize: '12px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    footerActionText: {
      fontSize: '11px',
      color: '#999999',
    },
    footerActionLink: { color: '#000000' },
  },
}}
```

- [ ] **Step 3: Verify the dev server runs without TypeScript errors**

```bash
npm run dev
```

Expected: No TypeScript or compilation errors in the terminal. Server starts on the configured port.

- [ ] **Step 4: Open the welcome page and visually verify**

Navigate to `http://localhost:3000/welcome` (or whichever port is running).

Check each of these against the design:

| Element | Expected |
|---|---|
| Input labels | Uppercase, 10px, tracked, `#555` — NOT Inter gray |
| Focus ring (click an input) | Black ring, NOT purple/blue |
| Divider line | Very thin, light gray — NOT bold gray |
| Divider "or" text | Uppercase, tiny, `#bbb` |
| Google button text | Montserrat Alternates, 11px |
| Error state (submit empty) | `#CC1133` error text, NOT default red |
| Footer text | 11px, `#999` — NOT Inter gray |
| CTA button | Black, uppercase, tracked |

- [ ] **Step 5: Commit**

```bash
git add src/app/welcome/page.tsx
git commit -m "Style Clerk SignUp form to match Attune design system"
```

- [ ] **Step 6: Push**

```bash
git push
```

Vercel will auto-deploy. Verify on production at `/welcome`.
