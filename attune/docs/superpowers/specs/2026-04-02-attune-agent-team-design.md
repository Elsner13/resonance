# Attune Agent Team — Design Spec

**Date:** 2026-04-02
**Goal:** Build a 24/7 team of 8 AI agents that runs Attune's content, distribution, nurture, conversion, and operations autonomously — making Attune a dominant voice in the skill acquisition field.

---

## 1. Architecture

**Approach: Telegram Bot as Command Center + Claude Code Crons as Engine**

- All agents run as Claude Code cron jobs on schedule
- The Telegram bot is the nervous system: agents push results to Telegram, Sam approves or rejects from his phone
- A Vercel webhook endpoint receives Telegram callbacks and routes approvals to trigger the next action
- State lives in flat files (`business-metrics.md`, `agents/queue.json`) and Google Sheets
- No new server infrastructure required — Vercel already deployed

### System Layers

```
Sam (phone)
    ↕ Telegram
Telegram Bot (Vercel webhook) ↔ The GM (Claude Code cron, daily 5am)
    ↕
8 Agents (Claude Code crons, scheduled)
    ↕
Platforms: Kit · Substack · Buffer · Stripe · Google Sheets · Galaxy (Obsidian)
```

---

## 2. The Eight Agents

### Autonomy Tiers

**Fully Autonomous** (acts without approval):
- 🔭 Scout — researches, reports
- 💧 Nurturer — manages list health
- 📡 Distributor — schedules social posts after content is approved upstream
- 📊 Ops Brain — weekly review and bottleneck analysis

**Draft + Approve** (sends to Telegram, waits for Sam's tap):
- ✍️ Writer — newsletter drafts
- 🎯 Closer — conversion email drafts
- 🎬 Creator — video scripts and new formats
- 🧠 GM — daily digest, escalations, team coordination

---

### Agent Specs

#### 🧠 The GM (General Manager)
- **Schedule:** Daily 5am (Mon–Fri)
- **Autonomy:** Draft + Approve (for escalations); digest is informational
- **What it does:** Reads the agent output queue, compiles a morning briefing, sends to Telegram. Surfaces items needing Sam's attention with estimated time required. Responds to freeform Telegram replies (e.g. "social" → triggers Distributor).
- **Output:** Telegram digest message with pending approvals, bottleneck of the week, one recommended action
- **Tools:** CronCreate, all agent outputs, Telegram Bot API

#### 🔭 The Scout
- **Schedule:** Monday 6am
- **Autonomy:** Fully autonomous
- **What it does:** Mines Reddit (r/fitness, r/soccer, r/basketball, r/LearnUselessTalents, r/skillsharing), YouTube comments, and Twitter for the top 5 audience pain points in the skill acquisition space this week. Identifies the strongest content angle for the Writer.
- **Output:** Telegram message + saved report to `agents/scout-report.md`
- **Tools:** mine skill, deep-research, WebSearch

#### ✍️ The Writer
- **Schedule:** Monday 7am (after Scout)
- **Autonomy:** Draft + Approve
- **What it does:** Reads Scout report → emerge mines Galaxy for the matching idea cluster → ghost drafts Signal/Noise newsletter in Sam's voice → avoid-ai-writing polishes it → saves draft to Kit as broadcast → sends Telegram message with subject line, opening paragraph, word count, and Approve / Revise / Skip buttons.
- **On Approve:** Publishes to Substack via API + sends Kit broadcast to full list
- **On Revise:** Regenerates with a different Galaxy cluster or angle, re-sends to Telegram
- **On Skip:** Logs to queue, notifies GM
- **Output:** Kit broadcast draft + Substack post (on approval)
- **Tools:** emerge, ghost, avoid-ai-writing, Kit MCP, Substack API, Telegram Bot API

#### 📡 The Distributor
- **Schedule:** Tuesday 9am
- **Autonomy:** Fully autonomous (content already approved upstream)
- **What it does:** Reads the most recently *approved* newsletter (from `agents/queue.json` — even if from a prior week if this week's was skipped) → generates 3 tweets, 1 LinkedIn post, 1 Substack Note, all in Sam's voice → schedules via Buffer across all connected channels (Tue, Thu, Sat posts)
- **Output:** Buffer queue populated for the week
- **Tools:** Buffer MCP, content-plan skill, ghost skill

#### 💧 The Nurturer
- **Schedule:** Wednesday 9am
- **Autonomy:** Fully autonomous
- **What it does:** Queries Kit for subscribers with no opens in 60+ days → tags them `cold-subscriber` → enrolls in re-engagement sequence ("Are you still there?"). Also checks for subscribers tagged `high-intent` (clicked Foundations sales page) and escalates to Closer's Friday queue.
- **Output:** Kit tags updated, re-engagement sequences triggered, Closer queue populated
- **Tools:** Kit MCP

#### 🎯 The Closer
- **Schedule:** Friday 9am
- **Autonomy:** Draft + Approve
- **What it does:** Queries Kit for subscribers tagged `high-intent` but not `foundations-buyer` → drafts a short, personal follow-up email for each (max 3 per week) → sends to Telegram with subscriber first name, their engagement history, and Approve / Revise / Skip per email.
- **On Approve:** Sends email via Kit broadcast to that subscriber segment
- **Output:** Conversion emails sent to warm leads
- **Tools:** Kit MCP, ghost skill, Telegram Bot API

#### 🎬 The Creator
- **Schedule:** Bi-weekly Monday (alternating weeks)
- **Autonomy:** Draft + Approve
- **What it does:** Takes the most recent approved newsletter → drafts a YouTube video script (5–8 min) in Sam's voice → generates 3 short-form video hooks (60-second format) → sends all to Telegram for review
- **Output:** Video scripts and hooks saved to `agents/creator-output/` + Telegram notification
- **Tools:** ghost skill, video-prompting skill, avoid-ai-writing, Telegram Bot API

#### 📊 The Ops Brain
- **Schedule:** Sunday 7pm
- **Autonomy:** Fully autonomous
- **What it does:** Reads `business-metrics.md` → audits all 5 growth levers (Build, Create, Network, Distribute, Study) against the data → names the single bottleneck → gives one specific action for next week → sends full report to Telegram + appends to Google Sheets Lever Audit tab
- **Output:** Telegram ops report + Google Sheets row
- **Tools:** google-sheets skill, Merlin advisor persona, Telegram Bot API

---

## 3. Telegram Command Center

### Bot Setup
- Bot created via @BotFather on Telegram
- Webhook registered at `https://attunemastery.com/api/telegram-webhook`
- Bot token stored as `TELEGRAM_BOT_TOKEN` in Vercel env vars
- Sam's chat ID stored as `TELEGRAM_CHAT_ID` in Vercel env vars

### Message Types

**Informational (autonomous agents):**
- Plain text message, no buttons
- Scout reports, Ops Brain reviews, GM digest items that need no action

**Approval requests (draft+approve agents):**
- Message includes: agent name, content preview, metadata (word count, recipient count, etc.)
- Inline keyboard with 3 buttons: `✅ Approve` · `✏️ Revise` · `⏭️ Skip`
- Callback data encodes: `{action}:{agent}:{item_id}`

### Approval Router (Vercel webhook)
File: `src/app/api/telegram-webhook/route.ts`

Receives Telegram callback → parses `{action}:{agent}:{item_id}` → dispatches:
- `approve:writer:{id}` → calls Substack API to publish + Kit API to send broadcast
- `approve:closer:{id}` → calls Kit API to send targeted email
- `approve:creator:{id}` → saves to `agents/creator-output/` as approved
- `revise:writer:{id}` → re-queues Writer cron with "revise" flag
- `skip:*:{id}` → logs to `agents/queue.json` as skipped

---

## 4. State Management

All agent state lives in `/Users/samelsner/attune/agents/`:

```
agents/
  queue.json          — pending approvals, skipped items, revision requests
  scout-report.md     — latest Scout intelligence report
  creator-output/     — approved video scripts and hooks
  logs/               — one log file per agent per week
```

`business-metrics.md` — Sam updates this Sunday in 5 min. Ops Brain reads it. GM session hook loads it on every Claude Code session start.

Google Sheets `Attune Business Metrics` — long-form history, lever audit rows appended weekly by Ops Brain.

---

## 5. Weekly Cadence

| Time | Agent | Action |
|------|-------|--------|
| Mon 5am | GM | Daily digest → Telegram |
| Mon 6am | Scout | Intelligence report → Telegram |
| Mon 7am | Writer | Newsletter draft → Telegram (approval needed) |
| Tue 5am | GM | Daily digest |
| Tue 9am | Distributor | Social posts → Buffer queue |
| Wed 5am | GM | Daily digest |
| Wed 9am | Nurturer | List hygiene + re-engagement |
| Thu 5am | GM | Daily digest |
| Thu | Writer | Newsletter publishes (if Monday approval given) |
| Fri 5am | GM | Daily digest |
| Fri 9am | Closer | Warm lead emails → Telegram (approval needed) |
| Sun 7pm | Ops Brain | Weekly review → Telegram |
| Bi-wk Mon | Creator | Video scripts → Telegram (approval needed) |

**Sam's required time per week:**
- Monday ~15 min — review newsletter draft, tap Approve
- Friday ~5 min — review warm lead emails, tap Approve or Skip
- Sunday ~5 min — update `business-metrics.md`

---

## 6. Build Phases

### Phase 0 — Foundation (~existing)
Kit MCP server, Stripe webhook → Kit tagging, welcome sequence, Foundations buyer onboarding, business-metrics.md session hook. Defined in `docs/superpowers/plans/2026-04-02-autonomous-attune-infrastructure.md`.

### Phase 1 — Command Center (~3 hours)
Telegram bot creation + Vercel webhook endpoint + approval router. This is the nervous system. Build and test before any agent goes live.

**Deliverables:**
- `src/app/api/telegram-webhook/route.ts` — approval router
- Telegram bot registered and webhook verified
- End-to-end test: cron sends test message → Sam taps Approve → action fires

### Phase 2 — First Agents (~4 hours)
GM + Scout + Ops Brain. All read-only, no publishing risk. Validates the full pipeline.

**Deliverables:**
- 3 Claude Code crons registered
- GM daily digest at 5am
- Scout Monday 6am report
- Ops Brain Sunday 7pm review
- All three pushing to Telegram correctly

### Phase 3 — The Writer (~4 hours)
The highest-leverage agent. Fully wires the content creation loop.

**Deliverables:**
- Writer cron Monday 7am
- Substack API integration (draft + publish)
- Kit broadcast integration
- Telegram approval flow (Approve → publishes to both, Revise → regenerates)

### Phase 4 — Distribution (~3 hours)
Distributor + Nurturer. Amplifies the content and keeps the list healthy.

**Deliverables:**
- Distributor cron Tuesday 9am → Buffer queue
- Nurturer cron Wednesday 9am → Kit list hygiene
- Re-engagement sequence in Kit

### Phase 5 — Conversion (~3 hours)
Closer + Creator. Revenue capture and new content formats.

**Deliverables:**
- `high-intent` tagging logic in Kit (link click trigger)
- Closer cron Friday 9am → Telegram approval flow
- Creator bi-weekly cron → video scripts to Telegram

---

## 7. Key Technical Dependencies

| Dependency | Purpose | Status |
|-----------|---------|--------|
| Kit MCP server | Email automation control | Planned (Phase 0) |
| Telegram Bot API | Command center | To build (Phase 1) |
| Vercel webhook | Approval routing | To build (Phase 1) |
| Substack API | Newsletter publishing | To build (Phase 3) — **Risk:** Substack's public API may only support draft creation, not direct publishing. Phase 3 plan must verify capability; fallback is email notification to Sam to publish manually from draft. |
| Buffer MCP | Social scheduling | Already available |
| Google Sheets skill | Metrics tracking | Already available |
| emerge skill | Galaxy idea mining | Already available |
| ghost skill | Sam's voice writing | Already available |
| avoid-ai-writing skill | Content polish | Already available |
| mine skill | Audience research | Already available |

---

## 8. Success Criteria

- Sam spends ≤25 min/week on Attune operations (vs. current hours)
- Newsletter publishes every Thursday without Sam writing from scratch
- Every Foundations purchase auto-triggers onboarding (no manual action)
- Cold subscribers re-engaged automatically before they churn
- Warm leads receive a personal follow-up without Sam tracking them manually
- Weekly bottleneck identified and one action recommended every Sunday
