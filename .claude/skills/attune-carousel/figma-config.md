# Attune Carousel — Figma Config

## Figma File

**File name:** Attune Carousel Templates
**File URL:** https://www.figma.com/design/ajJJQqdVpttio1vgO2U6Mf
**File key:** ajJJQqdVpttio1vgO2U6Mf

## Pages

| Page name | Carousel type | Slide count |
|---|---|---|
| EXPLAINER | Concept deep-dive | 8 slides |
| REFRAME | Provocative challenge | 9 slides |
| FRAMEWORK | Actionable steps | 10 slides |

## Layer Naming Convention

Every text layer in every slide frame follows this strict naming pattern.
The skill targets layers by these exact names — any deviation breaks injection.

**Standard layers (all slides):**
| Layer name pattern | Content | Font |
|---|---|---|
| `slide-N-headline` | Large editorial heading (Cormorant Garamond Italic) | Cormorant Garamond Italic, cream |
| `slide-N-headline-accent` | ONE key word in headline set in gold impact style | DM Sans Bold, `#C8A96E` |
| `slide-N-body` | Body/explanation text | DM Sans Regular, cream |
| `slide-N-label` | Small top label (concept category or "THE PROBLEM" etc.) | Geist Mono, all caps, gold |
| `slide-N-accent` | Pull quote or emphasis line | Cormorant Garamond Italic, gold |

**Left-border accent list layers (FRAMEWORK principle slides):**
| Layer name pattern | Content |
|---|---|
| `slide-N-list-1-title` | First list item title (Geist Mono, all caps, cream bold) |
| `slide-N-list-1-body` | First list item description (DM Sans, cream 70% opacity) |
| `slide-N-list-2-title` | Second list item title |
| `slide-N-list-2-body` | Second list item description |
| `slide-N-list-3-title` | Third list item title |
| `slide-N-list-3-body` | Third list item description |

**2-column comparison grid layers (REFRAME wrong/right slides):**
| Layer name pattern | Content |
|---|---|
| `slide-N-col-left-header` | Left column header (Geist Mono, all caps, gold) |
| `slide-N-col-right-header` | Right column header (Geist Mono, all caps, cream) |
| `slide-N-col-left-body` | Left column content |
| `slide-N-col-right-body` | Right column content |

Where N = slide number (1, 2, 3... up to 8, 9, or 10 depending on type).

Example for EXPLAINER slide 1 (hook):
- `slide-1-headline` → "Attractor States"
- `slide-1-headline-accent` → "Attractor" (this word rendered in gold DM Sans Bold)
- `slide-1-label` → "ATTUNE"

## Frame Naming Convention

Each slide frame in the Figma file must be named exactly:
- `slide-1`, `slide-2`, ... `slide-8` (EXPLAINER page)
- `slide-1`, `slide-2`, ... `slide-9` (REFRAME page)
- `slide-1`, `slide-2`, ... `slide-10` (FRAMEWORK page)

## Visual System (do not deviate)

Blended from two references: zerotoui's rounded tablet/card frame + BJJMM's bold headline structure.

| Element | Value |
|---|---|
| Frame size | 1080 × 1350px (portrait, better Instagram feed presence) |
| Outer background | `#080806` (void, full bleed) |
| Inner card | Rounded rectangle ~960 × 1260px, `#C10907` (Cosmic Crimson Red), corner radius 48px |
| Card notches | Semicircle cutouts top center + bottom center, ~40px radius, `#080806` fill |
| Primary text | `#F2EDD7` (warm cream) |
| Accent / highlight | `#C8A96E` (gold — pairs heraldically with crimson) |
| CTA gold | `#D4AF37` |
| Divider rule | 60px wide, 3px tall, `#F2EDD7` cream (legible on crimson card) |
| Heading font (editorial) | Cormorant Garamond Italic — concept names, philosophical statements |
| Heading font (impact word) | DM Sans Bold — ONE key word per headline, `#C8A96E` gold |
| Body font | DM Sans Regular, `#F2EDD7`, 28-32px |
| Label / mono font | Geist Mono, `#F2EDD7` cream, 14-16px, all caps, tracked |
| Brand mark | "ATTUNE" in Geist Mono tracked caps, `#F2EDD7` cream, top left of inner card |
| Slide number | Top right of inner card, Geist Mono, `#F2EDD7` cream, single digit (e.g. `2`) |

**Sampled from:** `nanobanana-output/8bit_pixel_art_style_newsletter_.png` — dominant crimson pixel: R:193 G:9 B:7

---

## Usage Log

Track which Galaxy notes have been used as carousel seeds.
Add one entry per carousel generated. Format: `YYYY-MM-DD | [note filename] | [type]`

### Used Notes
<!-- entries added automatically by the skill after each run -->
