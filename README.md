# Attune Universe

The premium digital home for Attune — an ecological approach to high performance and skill acquisition.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** Tailwind CSS v4, shadcn/ui, Radix Primitives
- **Animation:** Framer Motion
- **Fonts:** Geist Sans, Geist Mono, Playfair Display

## Structure

```
src/
├── app/
│   ├── (marketing)/    → Public-facing hub (Hero, landing)
│   ├── attractor/      → The Attractor cohort
│   ├── foundations/     → Foundations course ($97)
│   ├── os/             → Attune OS web app
│   └── signal/         → The Signal (Substack & content)
├── components/
│   ├── marketing/      → Hero, ConstellationCanvas, etc.
│   ├── ui/             → shadcn/ui primitives
│   ├── ai/             → AI-powered components (planned)
│   └── universe/       → Shared universe components (planned)
└── lib/
    └── utils.ts        → cn() helper
```

## Design System

Dark-first theme built on an "Attune Universe" aesthetic:

| Token               | Value     | Usage                  |
|----------------------|-----------|------------------------|
| `attune-void`        | `#030303` | Deep background        |
| `attune-starlight`   | `#EDEDED` | Primary text           |
| `attune-green`       | `#00FF94` | Primary accent / CTAs  |
| `attune-purple`      | `#7C3AED` | Secondary accent       |
| `attune-obsidian`    | `#121212` | Card / surface         |

Utilities: `.glass` (frosted panel), `.noise-overlay` (film grain texture), `animate-pulse-slow` (subtle breathing).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
