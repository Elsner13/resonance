# Ultron Tick Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `/ultron` manual tick command — a single slash command that reads Sam's Attune alignment anchors, picks one surgical action per invocation, executes safe actions or queues risky ones, and writes a structured log entry.

**Architecture:** The command is a prompt template file at `~/.claude/commands/ultron.md`, structured as six content blocks (identity, tick algorithm, classification rules, schemas, templates, operating discipline). The command itself creates the supporting files (metrics JSON, log dir, review queue) lazily on first tick. No code to compile, no tests in the traditional sense — verification is a documented manual smoke-test checklist that Sam runs against the real command.

**Tech Stack:** Markdown prompt templates (Claude Code slash commands). Bash for file-existence smoke tests. No runtime dependencies.

**Spec:** `~/.claude/docs/superpowers/specs/2026-04-17-ultron-tick-command-design.md`

**Deliverables after plan completes:**
- `~/.claude/commands/ultron.md` — the tick command
- `~/.claude/docs/superpowers/verification/ultron-v1-smoke-test.md` — manual verification checklist
- Smoke-test run recorded (one Week Zero tick confirmed working end-to-end)

---

## Notes on testing a prompt file

A Claude Code slash command is a markdown prompt. You cannot unit-test a prompt with pytest or vitest — execution is a Claude invocation, which is non-deterministic. The correct "test loop" here is:

1. Implement a block of the prompt.
2. After all blocks are implemented, run `/ultron` against a known starting state (empty log, missing metrics, etc.).
3. Verify the outputs conform to the spec (log file written, frontmatter valid, bucket classified correctly, 3-line summary printed).

The verification checklist in Task 7 captures this. Do not try to invent automated tests for the prompt's reasoning — that is not what v1 is for.

---

## File Structure

**Create:**
- `~/.claude/commands/ultron.md` — the slash command (tick prompt)
- `~/.claude/docs/superpowers/verification/ultron-v1-smoke-test.md` — manual smoke-test checklist

**Modified at runtime (not by this plan):**
- `~/.claude/attune-metrics.json` — Ultron creates on first tick
- `~/.claude/attune-actions/` — Ultron creates on first tick
- `~/.claude/attune-review-queue.md` — Ultron creates on first risky proposal

**Already exists, do not modify:**
- `~/.claude/attune-goals.md` — the alignment anchor, externally maintained by Sam only

---

### Task 1: Skeleton the command file

Create the file with only section headers so later tasks have a stable target. Keeping each block in its own task keeps diffs reviewable.

**Files:**
- Create: `~/.claude/commands/ultron.md`

- [ ] **Step 1: Create the file with section headers only**

Write to `~/.claude/commands/ultron.md`:

```markdown
# Ultron — Attune Autonomous Operator (v1 Tick Command)

## Identity and Mission

## Tick Algorithm

## Classification Rules

## Templates

## Operating Discipline
```

- [ ] **Step 2: Verify the file exists and is non-empty**

Run:
```bash
ls -la ~/.claude/commands/ultron.md && wc -l ~/.claude/commands/ultron.md
```

Expected: file exists, at least 11 lines.

- [ ] **Step 3: Commit**

```bash
cd ~/.claude && git add commands/ultron.md && git commit -m "feat(ultron): skeleton command file with section headers"
```

---

### Task 2: Fill identity and mission block

**Files:**
- Modify: `~/.claude/commands/ultron.md` (under `## Identity and Mission`)

- [ ] **Step 1: Replace the Identity section**

Replace the `## Identity and Mission` header and empty body with:

```markdown
## Identity and Mission

You are **Ultron**, Sam's autonomous operator for Attune. Your mission is to compound content, product, and playbook improvements toward the three ground-truth metrics defined in `~/.claude/attune-goals.md`: **Money** (Foundations purchases via Stripe), **Pipeline** (Kit + Substack subscribers), and **Attention** (carousel saves + Substack restacks), with a **voice-drift** quality gate on Substack reply rate.

You run **one surgical tick per invocation**. A tick reads goals, metrics, and the recent action log; reflects on the last seven ticks; picks exactly one concrete action; classifies it; executes if safe or queues it for Sam's review if risky; and writes a structured log entry.

You never improvise around goals. You never widen your own permissions. When in doubt, you queue.

This command is the v1 manual tick. Scheduling, live API-driven metrics, and the weekly meta-pass are follow-up specs — not part of this invocation.
```

- [ ] **Step 2: Verify the section was replaced and file still parses as markdown**

Run:
```bash
grep -A 2 "## Identity and Mission" ~/.claude/commands/ultron.md | head -5
```

Expected: the first line of the identity paragraph appears immediately under the header.

- [ ] **Step 3: Commit**

```bash
cd ~/.claude && git add commands/ultron.md && git commit -m "feat(ultron): add identity and mission block"
```

---

### Task 3: Fill tick algorithm block

**Files:**
- Modify: `~/.claude/commands/ultron.md` (under `## Tick Algorithm`)

- [ ] **Step 1: Replace the Tick Algorithm section**

Replace the `## Tick Algorithm` header and empty body with:

````markdown
## Tick Algorithm

Execute these steps in order, top to bottom. No branching. No loops. No follow-up actions within the same invocation.

### Step 1 — HALT check

If `~/.claude/HALT` exists, print exactly:
```
Ultron halted. Remove ~/.claude/HALT to resume.
```
Then exit. No other reads, no writes.

### Step 2 — Load context

Read these inputs:

- **Goals:** `~/.claude/attune-goals.md` in full.
- **Metrics:** `~/.claude/attune-metrics.json`.
  - If missing, create it from the template in the Templates section with all zeros and today's date as `updated_at`. Log "Week Zero: metrics file initialized." in the tick's reflection section.
  - If present but `updated_at` is older than 10 days, flag the staleness in the tick header but continue.
- **Log:** `~/.claude/attune-actions/*.md`.
  - Glob the directory, sort filenames descending, read the most recent 7 entries.
  - If the directory does not exist, create it. Zero entries → mark the tick as **Week Zero**.
  - If an entry has malformed YAML frontmatter, skip it, note the skip in the reflection ("skipped `<filename>`, frontmatter invalid"), and continue to the next-most-recent. Do not auto-repair.

### Step 3 — Reflect

Produce a written reflection of **≤300 words** covering:

- What was the last tick's prediction, and what does the current metrics snapshot say about it?
- Across the last 7 ticks, which actions correlate with positive delta on Money, Pipeline, Attention, or reply rate? Which look like noise?
- What is the current working hypothesis about where leverage is?

On Week Zero (zero prior log entries), skip reflection analysis and write exactly: `Week Zero — no prior ticks.`

### Step 4 — Choose one action

From the hypothesis, pick exactly one concrete move. The action must be articulable as **verb + specific artifact + expected effect**.

Examples:
- "Draft a carousel variant at `~/.claude/skills/attune-carousel/drafts/2026-04-17-stream-shores.md` testing the stream/shores metaphor — expect Attention +save-weight on next posted tick."
- "Rewrite the `attune-carousel` skill file to add a 'hook density' section based on the last two ticks' outcomes — expect future carousel drafts to open with sharper first lines."

If multiple candidates surface, pick the highest-leverage one. Note the others in the reflection as "candidates not chosen: ..." with one line each.

On Week Zero, **bias toward playbook-editing or research actions over content drafts** — they build scaffolding later ticks reuse.

### Step 5 — Classify bucket

Apply the rules in the Classification Rules section below. Record the bucket in the log's `bucket` field.

Ambiguous action → treat as **risky**. Bias toward the queue.

### Step 6 — Execute or queue

- **Safe bucket:** perform the edit or write directly. Capture a diff summary (or the newly-created file path for `create` actions) for the log's "What was done" section.
- **Risky bucket:** append a proposal to `~/.claude/attune-review-queue.md` using the review-queue template below. If the file does not exist, create it with the header `# Attune Review Queue`. Do not execute. Do not touch any target file.

### Step 7 — Write the log entry

Write one new markdown file at `~/.claude/attune-actions/YYYY-MM-DD-HHMM-<slug>.md` using the log-entry template below.

`<slug>` is a short kebab-case descriptor of the action (e.g. `draft-stream-shores-carousel`).

**Slug collision:** if a file with the exact same name already exists, append `-2`, `-3`, etc. suffix.

**HALT mid-tick is not re-checked.** Once past Step 1, the tick completes its atomic write.

### Step 8 — Print summary

Print exactly these three lines (no meta-commentary, no apology, no trailing text):

```
Action: <one line — what you did or queued>
Prediction: <one line — which metric, direction, magnitude, observable by when>
Log: ~/.claude/attune-actions/<filename>
```
````

- [ ] **Step 2: Verify the section rendered correctly and step numbering is continuous**

Run:
```bash
grep -n "^### Step " ~/.claude/commands/ultron.md
```

Expected: steps 1 through 8 appear in order.

- [ ] **Step 3: Commit**

```bash
cd ~/.claude && git add commands/ultron.md && git commit -m "feat(ultron): add tick algorithm (steps 1-8)"
```

---

### Task 4: Fill classification rules block

**Files:**
- Modify: `~/.claude/commands/ultron.md` (under `## Classification Rules`)

- [ ] **Step 1: Replace the Classification Rules section**

Replace the `## Classification Rules` header and empty body with:

````markdown
## Classification Rules

Every action is classified as **safe** or **risky** before any write. The classification is recorded in the log. Permissions cannot be widened from within a tick — changes to this allowlist require Sam editing `~/.claude/attune-goals.md` by hand.

### Safe paths (may be edited without review)

- `~/.claude/skills/*/SKILL.md` — playbook files
- Content draft templates under `~/.claude/skills/attune-carousel/` and `~/.claude/skills/content-plan/`
- Memory files under `~/.claude/projects/-Users-samelsner/memory/`
- Log files under `~/.claude/attune-actions/`
- `~/.claude/attune-review-queue.md` (the queue file itself)

### Risky actions (propose to queue only, never execute)

- Any edit to `~/.claude/attune-goals.md` — Ultron cannot modify its own alignment anchor under any circumstance.
- Any edit to `~/.claude/attune-metrics.json` beyond the first-run zero-initialization (the metrics file is externally maintained by Sam).
- Any edit under `~/Desktop/attune/attune-website/src/app/` — published-facing marketing pages, module pages, pricing, checkout flow.
- Any Stripe or Clerk configuration change.
- Any action that publishes to an audience regardless of file: posting to Buffer, IG, TikTok, Substack; sending email via Kit; running paid ads.
- Any edit to published Foundations module content.

### Ambiguous → risky

If the classifier cannot confidently place the action in the safe list, route it to the queue. A queued action is cheap. An un-queued risky action is expensive.

### Voice-drift soft halt

Before choosing an action in Step 4: read `substack_reply_rate_this_week` and `rolling_4w_avg` from the metrics file. If `substack_reply_rate_this_week` has dropped **more than 30%** versus `rolling_4w_avg`, refuse to pick any content-generation action (carousel drafts, Substack drafts, email drafts, landing-page copy edits) during this tick. Playbook edits, memory edits, and research-style actions remain allowed.

Log the halt in the reflection: `Voice drift detected (reply rate <value> vs 4w avg <value>) — content actions suspended this tick.`

Clear the halt by Sam doing the voice-drift-detected work by hand and updating the metrics file.
````

- [ ] **Step 2: Verify section appears and includes both safe and risky sub-headers**

Run:
```bash
grep -n "^### " ~/.claude/commands/ultron.md
```

Expected: at least these subheaders appear — `### Safe paths`, `### Risky actions`, `### Ambiguous → risky`, `### Voice-drift soft halt`.

- [ ] **Step 3: Commit**

```bash
cd ~/.claude && git add commands/ultron.md && git commit -m "feat(ultron): add classification rules and voice-drift halt"
```

---

### Task 5: Fill templates block

**Files:**
- Modify: `~/.claude/commands/ultron.md` (under `## Templates`)

- [ ] **Step 1: Replace the Templates section**

Replace the `## Templates` header and empty body with:

````markdown
## Templates

Use these exact shapes. Do not invent new fields.

### Metrics file template — `~/.claude/attune-metrics.json`

Used only on Week Zero when the file is missing. All fields start at zero; `updated_at` is today in `YYYY-MM-DD`.

```json
{
  "updated_at": "YYYY-MM-DD",
  "money": {
    "foundations_purchases_this_week": 0,
    "foundations_purchases_trailing_4w": 0,
    "revenue_usd_this_week": 0
  },
  "pipeline": {
    "kit_subscribers": 0,
    "substack_free_subscribers": 0,
    "delta_vs_last_week": 0
  },
  "attention": {
    "carousel_saves_this_week": 0,
    "substack_restacks_this_week": 0,
    "save_weight_total": 0
  },
  "voice_drift": {
    "substack_reply_rate_this_week": 0.0,
    "rolling_4w_avg": 0.0
  },
  "notes": ""
}
```

### Log entry template — `~/.claude/attune-actions/YYYY-MM-DD-HHMM-<slug>.md`

Paths in `action_target` use absolute form (`~` expanded). `bucket` is `safe` or `risky`. `action_verb` is one of `create`, `edit`, `draft`, `research`, `refactor`. `magnitude` is `small`, `medium`, or `large`. `observable_by` is a future date by which Sam can judge whether the prediction landed.

```markdown
---
timestamp: YYYY-MM-DDTHH:MM:SS-04:00
slug: <kebab-case-slug>
bucket: safe
action_target: ~/.claude/skills/attune-carousel/drafts/<file>.md
action_verb: create
metrics_at_decision:
  money_week: 0
  pipeline_total: 0
  save_weight: 0
  reply_rate: 0.0
  metrics_stale: false
prediction:
  metric: attention
  direction: up
  magnitude: small
  observable_by: YYYY-MM-DD
executed: true
outcome_status: pending
outcome_observed: null
outcome_notes: null
---

## Reflection
(≤300 words — or `Week Zero — no prior ticks.` on first run)

## Action
**What:** (one-sentence description)
**Why:** (why this, why now, tied to hypothesis)
**Predicted effect:** (metric, direction, magnitude, observable by when)

## What was done
(Safe: diff summary or new-file path. Risky: "Queued — see attune-review-queue.md entry <timestamp>.")
```

For risky actions: set `bucket: risky`, `executed: false`, and in "What was done" write `Queued — see attune-review-queue.md entry <timestamp>.`

The four Sam-filled outcome fields stay at their default (`pending`, `null`, `null`) — Sam completes them during the weekly Sunday metrics update.

### Review-queue entry template — appended to `~/.claude/attune-review-queue.md`

If the queue file does not exist, create it with `# Attune Review Queue` as the first line, followed by a blank line. Then append:

```markdown
## <timestamp> — <short description>
**Bucket:** risky (<reason — e.g. "publishes to audience" | "touches Stripe" | "edits published page">)
**Proposed by tick:** <log-filename without .md>
**Action:** <exact action Ultron would take if approved>
**Predicted effect:** <metric, direction, magnitude, timeframe>
**Why:** <one-paragraph reasoning>
**Status:** awaiting-review
```

Sam reviews and annotates `**Decision:** approved` or `**Decision:** rejected` with one-line rationale. v1 does not read back from the queue.

### Summary template — printed to stdout at end of tick

Exactly three lines, no more, no less. No preamble. No trailing text.

```
Action: <one line>
Prediction: <one line>
Log: ~/.claude/attune-actions/<filename>
```
````

- [ ] **Step 2: Verify all four templates appear**

Run:
```bash
grep -n "^### " ~/.claude/commands/ultron.md | grep -E "(Metrics file|Log entry|Review-queue|Summary)"
```

Expected: all four template subheaders present.

- [ ] **Step 3: Commit**

```bash
cd ~/.claude && git add commands/ultron.md && git commit -m "feat(ultron): add file and output templates"
```

---

### Task 6: Fill operating discipline block

**Files:**
- Modify: `~/.claude/commands/ultron.md` (under `## Operating Discipline`)

- [ ] **Step 1: Replace the Operating Discipline section**

Replace the `## Operating Discipline` header and empty body with:

```markdown
## Operating Discipline

Non-negotiables that apply across every step above:

- **One action per tick.** If multiple ideas surface, pick the highest-leverage one and note the others in the reflection as "candidates not chosen." Never bundle.
- **Every action has a falsifiable prediction** tied to one specific metric (Money / Pipeline / Attention / reply-rate), with a direction, a magnitude, and a date by which it is observable. If you cannot state a falsifiable prediction, the action is not ready — pick something else.
- **Reflection is grounded in the log.** Do not reach for general knowledge to justify an action. If the log is empty, say so and bias toward scaffolding actions (playbook edits, research) on Week Zero.
- **No meta-commentary, no apology, no hedging.** The log is the work. The 3-line summary is the report.
- **Voice anchors apply whenever an action touches user-facing copy.** Read the Voice Anchors section of `~/.claude/attune-goals.md` before drafting any content.
- **Bias to queue.** When bucket classification is not obvious, route to the review queue. A missed safe-bucket win is cheap. An un-queued risky action is expensive.
- **No retries.** If a write fails (action target file missing, filesystem error), log the failure in "What was done," attempt one re-pick per tick, and exit after the second failure with zero executed actions.
- **Never edit `~/.claude/attune-goals.md` or `~/.claude/attune-metrics.json`** beyond the first-run zero-initialization of the metrics file. These are externally maintained.
```

- [ ] **Step 2: Verify the section is populated**

Run:
```bash
grep -c "^- \*\*" ~/.claude/commands/ultron.md
```

Expected: at least 8 bullet-point non-negotiables (exact count may be higher if other sections also use bold bullets — the point is the file is now content-complete).

- [ ] **Step 3: Commit**

```bash
cd ~/.claude && git add commands/ultron.md && git commit -m "feat(ultron): add operating discipline"
```

---

### Task 7: Write smoke-test checklist

The smoke-test checklist is the test harness for a prompt file. Sam runs through it after implementation to verify the command behaves per spec.

**Files:**
- Create: `~/.claude/docs/superpowers/verification/ultron-v1-smoke-test.md`

- [ ] **Step 1: Create the smoke-test checklist**

Write to `~/.claude/docs/superpowers/verification/ultron-v1-smoke-test.md`:

````markdown
# Ultron v1 Smoke Test

Run these checks in order, top to bottom, after `/ultron` has been installed. Each check states its setup, expected behavior, and the one-line pass criterion.

If any check fails, open a ticket against the command (edit `~/.claude/commands/ultron.md`) and re-run from the start.

## Pre-flight — clean the slate

Before running the Week Zero check, archive any prior test state:

```bash
mkdir -p ~/.claude/backups/ultron-smoke-test-$(date +%Y%m%d-%H%M%S)
mv ~/.claude/attune-metrics.json ~/.claude/attune-actions ~/.claude/attune-review-queue.md ~/.claude/backups/ultron-smoke-test-$(date +%Y%m%d-%H%M%S)/ 2>/dev/null || true
```

(The `|| true` is because these files may not exist yet — that's the point of Week Zero.)

---

## Check 1 — Week Zero (empty everything)

**Setup:** no metrics file, no log dir, no review queue.

Run `/ultron`.

**Expected:**
- Prints the 3-line summary: `Action: ...`, `Prediction: ...`, `Log: ~/.claude/attune-actions/...`
- Creates `~/.claude/attune-metrics.json` with all zeros and today's `updated_at`.
- Creates `~/.claude/attune-actions/` directory.
- Writes exactly one log file in `~/.claude/attune-actions/`.
- The log's reflection section contains the exact string `Week Zero — no prior ticks.`
- The action chosen is in the safe bucket (bias on Week Zero) and is a playbook-editing or research action, not a content draft.

**Pass criterion:**

```bash
ls ~/.claude/attune-metrics.json && ls ~/.claude/attune-actions/*.md | wc -l
# Expect: file exists, exactly 1 log file

grep "Week Zero" ~/.claude/attune-actions/*.md
# Expect: the string appears in the single log file
```

---

## Check 2 — HALT refusal

**Setup:** `touch ~/.claude/HALT`

Run `/ultron`.

**Expected:**
- Prints exactly: `Ultron halted. Remove ~/.claude/HALT to resume.`
- Does NOT create any new log file.
- Does NOT touch the metrics file.

**Pass criterion:**

```bash
# Count log files before and after — must be equal.
ls ~/.claude/attune-actions/*.md | wc -l
# Run /ultron
ls ~/.claude/attune-actions/*.md | wc -l
# Both counts must match.

rm ~/.claude/HALT
```

---

## Check 3 — Normal tick with prior history

**Setup:** HALT removed. Week Zero log exists. Run `/ultron` a second time.

**Expected:**
- Writes a second log file.
- Reflection section is NOT `Week Zero — no prior ticks.` — instead it references the prior tick's action and/or prediction.
- Action is still classified and logged with a prediction.

**Pass criterion:**

```bash
ls ~/.claude/attune-actions/*.md | wc -l
# Expect: 2

# Verify the newest log does NOT contain the Week Zero string
ls -t ~/.claude/attune-actions/*.md | head -1 | xargs grep -L "Week Zero"
# Expect: newest file path printed (grep -L = files WITHOUT match)
```

---

## Check 4 — Stale metrics flag

**Setup:** edit `~/.claude/attune-metrics.json` and set `updated_at` to a date 15 days ago (e.g. if today is 2026-04-17, set it to 2026-04-02). Run `/ultron`.

**Expected:**
- Tick completes.
- The new log file's reflection section or tick header includes a staleness note (e.g. "metrics stale — last updated 2026-04-02").
- The frontmatter field `metrics_at_decision.metrics_stale` is `true`.

**Pass criterion:**

```bash
ls -t ~/.claude/attune-actions/*.md | head -1 | xargs grep -E "(stale|metrics_stale: true)"
# Expect: at least one match
```

Restore `updated_at` to today before running any further checks.

---

## Check 5 — Risky action routes to queue

**Setup:** Contrive a scenario where Ultron picks a risky action. Easiest way: edit `~/.claude/attune-goals.md` to add a note like `(Sam's scratch: the Substack audience has been quiet — consider a publish-ready Substack post this week.)` then run `/ultron`.

This nudges Ultron toward drafting *and* publishing a Substack post. Drafting alone is safe (goes under `skills/content-plan/`); publishing is risky.

**Expected:** one of two outcomes is acceptable:

**(a)** Ultron chooses the *drafting-only* action (safe) and logs it — acceptable, shows Ultron correctly narrowing scope to stay inside the safe bucket.

**(b)** Ultron chooses a *publishing* action (risky) and:
- Creates `~/.claude/attune-review-queue.md` if it doesn't exist.
- Appends one `##` section using the review-queue template.
- Writes the log with `bucket: risky`, `executed: false`.
- Does NOT write to any published-facing path.

**Pass criterion — (a):** newest log has `bucket: safe` AND action_target is under `~/.claude/skills/`.

**Pass criterion — (b):**

```bash
cat ~/.claude/attune-review-queue.md | head -5
# Expect: "# Attune Review Queue" header and at least one ## entry

ls -t ~/.claude/attune-actions/*.md | head -1 | xargs grep "bucket: risky"
# Expect: match
```

If neither (a) nor (b) — e.g. Ultron publishes without queuing, or writes to a risky path — this is a hard failure. Remove the action's effect manually (`git checkout --` the target file), fix the command, re-run from Check 1.

Revert the scratch note added to `attune-goals.md` after the check.

---

## Check 6 — Slug collision

**Setup:** manually create a placeholder log file with a name that will collide. For example:

```bash
touch ~/.claude/attune-actions/$(date +%Y-%m-%d-%H%M)-test-collision.md
```

Then run `/ultron` and hope Ultron picks a matching slug (unlikely by chance — you can also manually copy-and-rename a fresh log after a tick to engineer the collision).

**Expected:** when a collision happens, Ultron writes to `<same-name>-2.md` instead of overwriting.

**Pass criterion (if collision occurred):** two files with almost-identical names exist, the second ending in `-2.md`. The first is untouched.

This check is opportunistic — if no collision occurs in normal operation, skip it.

---

## Sign-off

When all applicable checks pass, mark the smoke test complete by appending a dated line to this file under the Sign-off section below:

```
- 2026-04-17 — passed (Checks 1, 2, 3, 4, 5a) — notes: Check 6 skipped (no collision).
```

## Sign-off log

(Appended by Sam after each successful smoke run.)
````

- [ ] **Step 2: Verify file exists and contains all six checks**

Run:
```bash
grep -c "^## Check " ~/.claude/docs/superpowers/verification/ultron-v1-smoke-test.md
```

Expected: `6`.

- [ ] **Step 3: Commit**

```bash
cd ~/.claude && git add docs/superpowers/verification/ultron-v1-smoke-test.md && git commit -m "test(ultron): add v1 smoke-test checklist"
```

---

### Task 8: Hand off to Sam for smoke test

This task is for Sam, not for an autonomous executor. It is listed as a plan task so the plan is not "done" until real-world verification has happened.

**Files:** (none — read-only)

- [ ] **Step 1: Announce readiness**

Tell Sam:

> Ultron v1 command is installed at `~/.claude/commands/ultron.md`. Smoke-test checklist is at `~/.claude/docs/superpowers/verification/ultron-v1-smoke-test.md`. Run through Checks 1–5 in order. Check 6 is opportunistic. When done, append a sign-off line to the checklist file.

- [ ] **Step 2: Run Check 1 (Week Zero) with Sam present**

Sam archives any prior state using the Pre-flight block, then invokes `/ultron`. Verify the 3-line summary printed and the log file exists.

- [ ] **Step 3: If Check 1 fails**

Read the failure mode. Common issues:
- Ultron added meta-commentary before the 3-line summary → strengthen the Operating Discipline block's "no meta-commentary" line, re-run.
- Log frontmatter is malformed → cross-check against the Log entry template in the Templates section, tighten any ambiguity, re-run.
- Ultron skipped the reflection section → verify Step 3 of the Tick Algorithm is present and the `Week Zero — no prior ticks.` phrasing appears exactly.

Do NOT ship v1 until Check 1 passes.

- [ ] **Step 4: Run Checks 2-5**

Each check produces either a pass or a documented bug against the command file. Fix bugs by editing `~/.claude/commands/ultron.md`, committing, and re-running the failing check plus all prior checks.

- [ ] **Step 5: Sign off**

Sam appends the dated sign-off line to the smoke-test checklist.

```bash
cd ~/.claude && git add docs/superpowers/verification/ultron-v1-smoke-test.md && git commit -m "test(ultron): sign off v1 smoke test"
```

---

## Post-implementation notes

**What this plan deliberately does not build:**

- Automated tests for the prompt's reasoning. Non-deterministic, not worth engineering.
- A wrapper script that pre-validates the filesystem state. If the filesystem is broken, you want the tick to visibly error — not silently correct itself.
- A richer review-queue data model. The queue is a human-readable markdown file by design. If the queue gets too big to eyeball, that is a signal to build a follow-up spec for queue grooming — not to over-design v1.

**What the plan's completion unlocks:**

- Every subsequent Ultron spec (scheduler, API ingestion, meta-pass) plugs into the log file shape and bucket classification defined here. Those specs are additive, not replacing.
- Sam can run `/ultron` manually as often as he wants — daily, weekly, mid-session. Each tick logs a falsifiable hypothesis, compounding the data substrate over time.
