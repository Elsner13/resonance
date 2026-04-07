# Attune Carousel Skill

Invoke this skill to generate a fully written, Figma-ready Instagram carousel post for Attune.

**Invocation:** `/attune-carousel [optional: seed topic or concept]`

**Output:** All slide copy written in Sam's voice + Figma template populated via MCP + post brief with caption, hashtags, and CTA.

---

## Pipeline Overview

```
Stage 1: DETECT  →  Stage 2: WRITE  →  Stage 3: DESIGN  →  Stage 4: BRIEF  →  Stage 5: LOG
```

Follow each stage in order. Do not skip stages. Do not combine stages.

---

## Stage 1: DETECT

### If a seed topic was provided:

Classify the seed into one of three types:

| Type | Use when | Signal |
|---|---|---|
| EXPLAINER | The seed is a named concept that needs unpacking | It's a noun: "attractor states", "affordance", "soft assembly" |
| REFRAME | The seed challenges an assumption or common mistake | It implies "you're doing X but actually doing Y" |
| FRAMEWORK | The seed is actionable — steps, questions, or principles | It implies a numbered list or decision tool |

If classification is ambiguous, default to EXPLAINER.

Present the classification to Sam:
> "Classified as **[TYPE]**. Concept: [seed]. Proceeding in 5 seconds — or say a different type to override."

Wait 5 seconds for override. If none, proceed to Stage 2.

### If no seed was provided:

1. Use the Glob tool to list all `.md` files in `/Users/samelsner/LIFE OS/05 - GALAXY/`
2. Use the Read tool to scan the first 20 lines of each file — look for both `#permanentnote` AND `#complete` tags
3. Build a candidate list of files that contain both tags
4. Read the usage log in `~/.claude/skills/attune-carousel/figma-config.md` (the `### Used Notes` section) — exclude any Galaxy files already listed there
5. Score each remaining candidate:
   - +2 if file contains any of: attractor, affordance, constraint, ecological, emergence, coupling, perception-action, self-organization
   - +2 if file contains a cross-domain connection (two or more distinct domains mentioned)
   - +2 if the title or first paragraph contains a provocative or counter-intuitive claim
   - +1 if the file is under 500 words (distillable into 8-10 slides)
6. Select the highest-scoring candidate
7. Read the full file
8. Classify it (EXPLAINER / REFRAME / FRAMEWORK) using the rules above
9. Present to Sam:
   > "Seed selected: **[Galaxy note filename]**
   > Concept: [one-line summary of the note's core idea]
   > Type: **[EXPLAINER / REFRAME / FRAMEWORK]**
   > Proceeding in 5 seconds — or name a different concept to override."

Wait for confirmation or 5 seconds before proceeding to Stage 2.

---

## Stage 2: WRITE

1. Read the matching template file:
   - EXPLAINER → `~/.claude/skills/attune-carousel/templates/explainer.md`
   - REFRAME → `~/.claude/skills/attune-carousel/templates/reframe.md`
   - FRAMEWORK → `~/.claude/skills/attune-carousel/templates/framework.md`

2. Generate copy for every slide following the template's slide arc exactly. For each slide, produce:
   - `slide-N-headline` content
   - `slide-N-headline-accent` content (the ONE word or phrase set in gold — identify which word in the headline gets the accent treatment)
   - `slide-N-body` content (if applicable)
   - `slide-N-label` content (if applicable)
   - `slide-N-accent` content (if applicable)
   - Any list or grid layers specified in the template for that slide

3. Apply the voice rules BEFORE presenting copy:
   - First person (I), never third person
   - No em dashes — use colon or period instead
   - No banned words: delve, realm, harness, unlock, tapestry, leverage, synergy, seamless, optimize
   - No AI transitions: "Furthermore", "In conclusion", "It's worth noting", "Let's dive in", "Without further ado"
   - Start inside the idea — no thesis statements on slide 1
   - Build concrete → abstract
   - Cross at least two domains per carousel
   - Close the final slide with invitation, never summary
   - Core vocabulary to draw from: affordance, attunement, coupling, emergence, self-organization, constraints, attractor, perception-action, representative, dimensional, signal, noise, sovereign, forged

4. Output the full slide copy in this format:

```
═══════════════════════════════════════════════
ATTUNE CAROUSEL COPY — [TYPE]
Concept: [concept name]
═══════════════════════════════════════════════

SLIDE 1
headline: [text]
headline-accent: [the word(s) that get gold treatment]
body: [text or EMPTY]
label: ATTUNE

SLIDE 2
headline: [text]
body: [text]

[... continue for all slides, showing every layer with content ...]
```

5. Ask: "Copy looks good? Say **yes** to push to Figma, or give me edits."

Wait for Sam's confirmation before proceeding to Stage 3.

---

## Stage 3: DESIGN

1. Invoke the `figma:figma-use` skill.

2. Read `~/.claude/skills/attune-carousel/figma-config.md` to get:
   - The Figma file URL
   - The correct page name for this carousel type (EXPLAINER / REFRAME / FRAMEWORK)
   - The layer naming convention

3. If the Figma file URL is still the placeholder `[PASTE YOUR FIGMA FILE URL HERE...]`, stop and prompt:
   > "Please paste your Figma file URL into `~/.claude/skills/attune-carousel/figma-config.md` and re-run."

4. Use the Figma MCP tools to open the file and navigate to the correct page.

5. For each slide, push the copy into the named text layers:
   - Use `mcp__plugin_figma_figma__getNodeXml` to locate each slide frame by name (`slide-1`, `slide-2`, etc.)
   - Use `mcp__plugin_figma_figma__updateXmlForNode` to push text content into each named text layer
   - Update: `slide-N-headline`, `slide-N-headline-accent`, `slide-N-body`, `slide-N-label`, `slide-N-accent`
   - For FRAMEWORK in-practice slides: update `slide-N-list-1-title`, `slide-N-list-1-body`, etc.
   - For REFRAME comparison slide: update `slide-N-col-left-header`, `slide-N-col-right-header`, `slide-N-col-left-body`, `slide-N-col-right-body`

6. After all layers are updated, call `mcp__plugin_figma_figma__zoomIntoView` on `slide-1` so Sam can see the populated carousel immediately.

7. Confirm:
   > "Figma updated. All [N] slides populated on the [TYPE] page. Open your Figma file to review — the carousel is ready to export."

---

## Stage 4: BRIEF

Output the complete post brief in this exact format:

```
─────────────────────────────────────────────
ATTUNE CAROUSEL BRIEF
─────────────────────────────────────────────
Type: [EXPLAINER / REFRAME / FRAMEWORK]
Source note: [Galaxy filename or "manual seed: [topic]"]
Concept: [concept name]

CAPTION:
[150-200 words in Sam's voice. Rules:
- Start inside the idea, not with a thesis
- Build concrete → abstract
- Cross two domains
- End with a question or invitation
- No em dashes — colon or period
- No banned words
- No AI transitions
- Close with the newsletter sign-off:
  "Yours in rebellion,
  Sam ~~
  Signal/Noise"]

HASHTAGS:
[5-8 hashtags — mix niche + broad reach:
Niche examples: #ecologicaldynamics #skillacquisition #constraintsled #affordance #attractorstate
Broad examples: #coaching #athletedevelopment #contentcreator #personaldevelopment #learningdesign]

SAVE HOOK:
[One sentence: the specific reason someone saves this post.
Example: "Save this for the next time someone tells you to just drill more reps."]

CTA:
[Choose one: Follow @attunemastery / Signal/Noise link in bio / Foundations free intro]
─────────────────────────────────────────────
```

---

## Stage 5: LOG

Update the usage log in `~/.claude/skills/attune-carousel/figma-config.md`.

1. Read the current content of `~/.claude/skills/attune-carousel/figma-config.md`
2. Find the `### Used Notes` section
3. Use the Edit tool to append one line immediately after the `<!-- entries added automatically... -->` comment:

```
[YYYY-MM-DD] | [Galaxy note filename or "manual: [topic]"] | [TYPE]
```

Use today's actual date in YYYY-MM-DD format.

---

## Export Instructions (Manual — You Do This in Figma)

After reviewing the populated carousel in Figma:

1. Select all slide frames on the page (Cmd+A)
2. Right panel → Export → PNG @ 2x
3. Export all → saves as `slide-1.png` through `slide-N.png`
4. Upload to Instagram as a carousel post
5. Paste the caption from the brief
6. Add hashtags in the first comment (not the caption) for a cleaner look

---

## Error Handling

**Figma MCP layer not found:**
> "Layer [slide-N-headline] not found on the [TYPE] page. Check that your Figma template file has text layers named exactly per the convention in figma-config.md. Layer names are case-sensitive."

**No Galaxy notes qualify as seeds:**
> "All eligible Galaxy notes have been used as carousel seeds. Options: (1) provide a topic manually, (2) say 'reset log' to clear the usage log and start over, or (3) say 'use literature notes' to pull from #literaturenote tagged files instead."

**Figma file URL not set:**
> "The Figma file URL has not been configured. Open `~/.claude/skills/attune-carousel/figma-config.md` and replace the placeholder with your actual Figma file URL, then re-run."

**Classification ambiguous:**
If a seed could reasonably be EXPLAINER or REFRAME, default to EXPLAINER and note:
> "Classified as EXPLAINER (defaulted — could also be REFRAME). Say 'reframe' to switch."
