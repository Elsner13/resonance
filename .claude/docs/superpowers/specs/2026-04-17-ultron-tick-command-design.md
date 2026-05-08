# Ultron Tick Command — Design Spec

**Date:** 2026-04-17
**Scope:** v1 — the `/ultron` manual tick command. Follow-up specs cover scheduling, API-driven metrics ingestion, and the weekly meta-pass.

## Purpose

Ship a single slash command, `/ultron`, that runs one surgical tick of Sam's autonomous operator loop for Attune. A tick reads the alignment anchors (goals + current metrics + recent action log), reflects on the last seven ticks, picks exactly one concrete action, classifies it as safe or risky, executes the safe ones immediately or queues the risky ones for Sam's review, and writes a structured log entry so the hypothesis can be evaluated later.

This spec defines what ships. It does not cover the eventual scheduler, live API clients, or the self-rewriting playbook meta-pass — each of those is a follow-up spec that plugs into the scaffolding below.

## North star context (informational)

Ultron is intended to become Sam's persistent second brain for building Attune into a dominant brand in skill acquisition. The long-run system compounds improvements across content, product, and operator playbooks against three non-gameable metrics (Money, Pipeline, Attention) plus a voice-drift quality gate. v1 is the first vertebra of that system: a manual tick you can invoke today, whose log and file layout become the substrate every later capability reads and writes.

## Locked decisions

The design below is the result of a six-question brainstorm. The decisions:

1. **Scope.** v1 = manual `/ultron` tick command. Scheduling, API ingestion, and self-editing meta-pass are follow-up specs.
2. **Action selection.** Ultron reasons from scratch each tick using goals + metrics + log. No persistent queue of pending actions.
3. **Execution posture.** Safe-bucket actions execute immediately. Risky-bucket actions are appended to a review queue and require Sam's manual execution.
4. **Metrics input.** Hand-maintained JSON file at `~/.claude/attune-metrics.json`, updated by Sam weekly.
5. **Action granularity.** One surgical action per tick. Bundled thematic work is explicitly rejected.
6. **Log format.** One markdown file per tick with YAML frontmatter + reasoning body, stored in `~/.claude/attune-actions/`. Outcomes filled in by Sam during the weekly metrics update.
7. **Tick algorithm.** Reflect-then-act — every tick writes a reflection preamble grounded in the last seven log entries before choosing a new action.

## Architecture

### Command

`/ultron` lives at `~/.claude/commands/ultron.md` — same pattern as `einstein.md`. The file is a plain markdown prompt template whose body is the tick instructions. Invoking `/ultron` runs exactly one tick per invocation.

### Files the tick reads

- `~/.claude/attune-goals.md` — mission, product ladder, ground-truth metrics, permissions, voice anchors. Read-only for Ultron.
- `~/.claude/attune-metrics.json` — current metrics snapshot, hand-maintained by Sam weekly. Read-only for Ultron.
- `~/.claude/attune-actions/*.md` — all prior tick logs. Ultron reads the most recent 7 entries, sorted descending by filename.
- `~/.claude/HALT` — if this file exists, Ultron refuses to tick and exits.

### Files the tick writes

- `~/.claude/attune-actions/YYYY-MM-DD-HHMM-<slug>.md` — exactly one new log file per tick.
- `~/.claude/attune-review-queue.md` — single running markdown file; risky proposals are appended as `##` sections.
- The actual target file of a safe-bucket action (e.g. a skill file, a content template, a memory file).

### Files Ultron cannot modify under any bucket

`~/.claude/attune-goals.md` and `~/.claude/attune-metrics.json` are externally maintained. Ultron cannot widen its own permissions or revise its own metrics.

## Tick algorithm

A single `/ultron` invocation executes these steps in order, top to bottom, no branching.

1. **HALT check.** If `~/.claude/HALT` exists, print `Ultron halted. Remove ~/.claude/HALT to resume.` and exit. No other reads, no writes.
2. **Load context.**
   - Read `attune-goals.md` in full.
   - Read `attune-metrics.json`. If missing, initialize it from the template in the Schemas section with all zeros and today's `updated_at`. If present but `updated_at` is older than 10 days, flag the staleness in the tick header but continue.
   - Glob `~/.claude/attune-actions/*.md`, sort descending by filename, read the most recent 7. If fewer than 7 exist, read what's there. If zero, mark the tick as Week Zero.
3. **Reflect.** Produce a written reflection (≤300 words) covering: what was the last tick's prediction and what does the current metrics snapshot say about it; across the last 7 ticks which actions correlate with positive delta on Money / Pipeline / Attention / reply-rate and which look like noise; what is the current working hypothesis about where leverage is. On Week Zero, skip reflection and write "Week Zero — no prior ticks."
4. **Choose one action.** From the hypothesis, pick exactly one concrete move. The action must be articulable as: **verb + specific artifact + expected effect**. If multiple candidates surface, pick the highest-leverage one and note the others in the reflection as "candidates not chosen."
5. **Classify bucket.** Apply the rules in the Safety Model section. Ambiguous → risky.
6. **Execute or queue.**
   - **Safe →** perform the edit / write directly. Capture the diff summary for the log.
   - **Risky →** append a proposal to `attune-review-queue.md`. Do not execute. Do not touch any target file.
7. **Write the log entry.** One new markdown file at `~/.claude/attune-actions/YYYY-MM-DD-HHMM-<slug>.md` conforming to the schema in the Schemas section.
8. **Print a 3-line summary:**
   ```
   Action: <one line>
   Prediction: <one line>
   Log: ~/.claude/attune-actions/<filename>
   ```

No loops, retries, or follow-up actions within the same invocation.

## Schemas

### `~/.claude/attune-metrics.json` (Sam maintains weekly)

```json
{
  "updated_at": "2026-04-17",
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

Any field without fresh data stays at its prior value. Only `updated_at` is used to judge staleness (>10 days = flagged).

### `~/.claude/attune-actions/YYYY-MM-DD-HHMM-<slug>.md` (Ultron writes per tick)

Paths in frontmatter use absolute form (`~` expanded at read time) so the bucket classifier can match them against the allowlist without ambiguity.

```markdown
---
timestamp: 2026-04-17T09:30:00-04:00
slug: draft-stream-shores-carousel
bucket: safe
action_target: ~/.claude/skills/attune-carousel/drafts/2026-04-17-stream-shores.md
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
  observable_by: 2026-04-24
executed: true
outcome_status: pending
outcome_observed: null
outcome_notes: null
---

## Reflection
(≤300 words, the reflect step output — or "Week Zero — no prior ticks." on first run)

## Action
**What:** (one-sentence description)
**Why:** (why this, why now, tied to hypothesis)
**Predicted effect:** (metric, direction, magnitude, observable by when)

## What was done
(Safe: diff summary, file path, what changed. Risky: "Queued — see attune-review-queue.md entry <timestamp>.")
```

Sam fills these during the weekly Sunday update:
- `outcome_status`: `pending | confirmed | disconfirmed | inconclusive`
- `outcome_observed`: the actual metric delta
- `outcome_notes`: free text

### `~/.claude/attune-review-queue.md` (Ultron appends risky proposals)

```markdown
# Attune Review Queue

## 2026-04-17T09:30 — publish carousel variant testing stream/shores metaphor
**Bucket:** risky (publishes to audience)
**Proposed by tick:** 2026-04-17-0930-carousel-stream-shores-variant
**Action:** Post `skills/attune-carousel/drafts/2026-04-17-stream-shores.md` to IG
**Predicted effect:** Attention +8 save-weight over 7 days
**Why:** (reasoning)
**Status:** awaiting-review
```

Sam reviews, annotates `**Decision:** approved` or `rejected` with one-line rationale, and either executes manually or discards. v1 does not read back from the queue — Ultron treats proposed-and-queued as done-for-now.

## Safety model

Three mechanisms in order of precedence.

### 1. HALT switch

`~/.claude/HALT` exists → tick refuses and exits at step 1. To halt: `touch ~/.claude/HALT`. To resume: `rm ~/.claude/HALT`. Ultron cannot create, delete, or read-around this file.

### 2. Bucket classification

Every action is classified before any write. The classification appears in the log.

**Safe paths (editable without review):**
- `~/.claude/skills/*/SKILL.md`
- Content draft templates under `skills/attune-carousel/` and `skills/content-plan/`
- Memory files under `~/.claude/projects/-Users-samelsner/memory/`
- Log files under `~/.claude/attune-actions/`
- The review queue file itself

**Risky (queue only, never execute):**
- `~/.claude/attune-goals.md`
- `~/.claude/attune-metrics.json`
- Any published-facing path under `~/Desktop/attune/attune-website/src/app/` — marketing pages, module pages, pricing, checkout flow
- Stripe or Clerk configuration
- Any action that publishes to an audience regardless of file — posting to Buffer, IG, TikTok, Substack; sending email via Kit; running paid ads

**Ambiguous → risky.** If the classifier can't decide, the proposal goes to the queue.

The classification rules live in `attune-goals.md`. Widening Ultron's permissions requires Sam editing that file.

### 3. Voice-drift soft halt

If `attune-metrics.json` shows `substack_reply_rate_this_week` dropped more than 30% versus `rolling_4w_avg`, Ultron refuses to pick any content-generation action (carousels, Substack drafts, emails, landing copy) during that tick. Playbook edits, memory edits, and research-style actions remain allowed. The halt is logged as "voice drift — content actions suspended this tick." Sam clears it by doing the voice-drift-detected work by hand and updating metrics.

### Out of v1 scope

- Rate limits. One manual tick per invocation; no scheduler to throttle.
- Rollback. Safe actions are git-tracked edits; `git checkout -- <path>` is the rollback.
- Approval on edits to Ultron's own playbooks. v1 lets Ultron edit `skills/*/SKILL.md` freely — that's the compounding loop.

## First-run and edge cases

### Week Zero (first run)

On first invocation these files don't exist: `attune-metrics.json`, `attune-actions/` directory, `attune-review-queue.md`. The tick handles cleanly:

1. HALT check passes.
2. Goals load succeeds (file already exists from prior work).
3. Metrics load: file missing → create from template, zeros, today's `updated_at`, log "Week Zero: metrics file initialized."
4. Log load: directory missing → create `~/.claude/attune-actions/`; zero entries → reflection section says "Week Zero — no prior ticks."
5. Review queue: file missing → created only when the first risky proposal arrives.
6. Action selection: on Week Zero, prefer playbook-editing or research actions over content drafts — they build scaffolding later ticks reuse.
7. Log write proceeds normally.
8. Print summary.

### Other edge cases

- **Stale metrics (>10 days).** Flag in log header, continue, but skip actions whose prediction depends on a specific recent metric move. Prefer actions justified by goals + log alone.
- **Malformed log frontmatter.** Skip the malformed entry, note it in reflection ("skipped 2026-04-12 log, frontmatter invalid"), continue with next-most-recent. No auto-repair.
- **Action target file missing.** Abort the action, log the attempt, pick once more. If the re-pick also fails precondition, log both failures and exit the tick with zero executed actions. No third attempt.
- **Slug collision (two ticks in the same minute).** Append `-2`, `-3` suffix to the filename.
- **HALT appears mid-tick.** Not checked after step 1. A tick in progress completes its atomic write. Rationale: manual human-paced loop, race conditions aren't worth defending against.

### Explicit non-handling

- No retries on write failures. If a write errors, the tick errors visibly — fix the filesystem and re-run.
- No concurrent-tick protection. Manual invocation.
- No tick-duration cap.

## Command file contents (`~/.claude/commands/ultron.md`)

The prompt template has six blocks, in order:

1. **Frontmatter / description line** for `/help`: "Run one Ultron tick: reflect on last 7 days, pick one surgical action, execute if safe or queue if risky, log the hypothesis." Other metadata matched to the `einstein.md` shape during implementation.
2. **Identity + mission.** Short paragraph establishing Ultron's role, mission, and operating posture (surgical, alignment-first, bias-to-queue-when-in-doubt).
3. **Tick algorithm.** Numbered 1→8 from the Tick algorithm section above, verbatim. Rigid.
4. **Classification rules.** The safe / risky / ambiguous→risky rules from the Safety Model section, stated explicitly with the allowlist. Includes the voice-drift soft-halt rule and the "cannot modify goals or metrics under any bucket" rule.
5. **Templates.** The exact YAML + markdown skeleton for a log entry, the exact review-queue entry format, the exact 3-line summary shape.
6. **Operating discipline.** Short list of non-negotiables: one action per tick; every action has a falsifiable prediction; reflection is grounded in the log; no meta-commentary; adherence to voice anchors when touching user-facing copy.

## Deliverables

After the implementation plan executes, these will exist:

- `~/.claude/commands/ultron.md` — the tick command
- `~/.claude/attune-goals.md` — already exists, unchanged
- `~/.claude/attune-metrics.json` — created on first tick, maintained weekly by Sam
- `~/.claude/attune-actions/` — directory, one log file per tick
- `~/.claude/attune-review-queue.md` — created on first risky proposal
- `~/.claude/HALT` — convention only; Sam creates and deletes

## Out of scope (follow-up specs)

- **Scheduling.** CronCreate-based tick cadence. Opens the question of concurrent-tick protection and rate limits. Separate spec.
- **API-driven metrics.** Stripe / Kit / Substack / IG Graph / TikTok clients that produce the same `attune-metrics.json` shape. Drop-in replacement for the hand-maintained file. Separate spec.
- **Weekly meta-pass.** Longer-window log read, pattern detection, structured playbook rewrites. Consumes the reflection sections this v1 already produces. Separate spec.
- **Multi-project generalization.** v1 is Attune-only by construction.
