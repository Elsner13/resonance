# Agent Team Phase 1: Telegram Command Center — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Telegram bot + Vercel webhook approval router that serves as the nervous system for the entire Attune agent team.

**Architecture:** A Telegram bot receives messages from agents and delivers them to Sam's phone. When Sam taps Approve/Revise/Skip on a draft, Telegram sends a callback to a Vercel webhook route. The webhook parses the callback, updates the agent queue, and dispatches the appropriate action (publish, re-queue, skip). Agent state is persisted in `agents/queue.json`.

**Tech Stack:** Next.js 16 / Vercel (webhook host), Telegram Bot API (HTTP), TypeScript, Vitest (tests).

> **Note:** This is Phase 1 of 5. Phases 2–5 will be planned separately. Phase 1 must be complete and smoke-tested before any agent crons are built.

---

## File Map

| File | Purpose |
|------|---------|
| `src/lib/telegram.ts` | Send messages and approval requests via Telegram Bot API |
| `src/lib/agent-queue.ts` | Read/write/update `agents/queue.json` |
| `src/app/api/telegram-webhook/route.ts` | Vercel POST endpoint — receives Telegram callbacks, routes approvals |
| `src/lib/telegram.test.ts` | Unit tests for Telegram message formatting |
| `src/lib/agent-queue.test.ts` | Unit tests for queue CRUD operations |
| `agents/queue.json` | Initial empty queue (committed to repo) |

---

## Task 1: Install Vitest + Create agents/ directory

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `agents/queue.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install Vitest**

```bash
cd /Users/samelsner/attune
npm install -D vitest @vitest/coverage-v8
```

Expected: `node_modules/vitest` exists, no errors.

- [ ] **Step 2: Add test script to package.json**

In `package.json`, update the `scripts` section:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Create vitest.config.ts**

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 4: Create agents/queue.json**

```json
{
  "items": []
}
```

- [ ] **Step 5: Add agents/ logs to .gitignore**

Open `.gitignore` and add:

```
# Agent logs (queue.json is committed but logs are not)
agents/logs/
agents/creator-output/
agents/scout-report.md
```

- [ ] **Step 6: Verify Vitest runs**

```bash
npm test
```

Expected: `No test files found` or `0 tests passed` — no errors.

- [ ] **Step 7: Commit**

```bash
git add package.json vitest.config.ts agents/queue.json .gitignore package-lock.json
git commit -m "chore: add vitest, agents/ directory for agent team Phase 1"
```

---

## Task 2: Build the Telegram utility module

**Files:**
- Create: `src/lib/telegram.ts`
- Create: `src/lib/telegram.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/lib/telegram.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildApprovalMessage, parseCallbackData } from "./telegram";

describe("buildApprovalMessage", () => {
  it("includes agent name and preview in message text", () => {
    const result = buildApprovalMessage({
      agentName: "The Writer",
      agentEmoji: "✍️",
      preview: "Subject: Training doesn't transfer\n\nThe athlete who trains...",
      metadata: "847 words · ~4 min read",
      itemId: "writer-1234",
      agentKey: "writer",
    });
    expect(result.text).toContain("The Writer");
    expect(result.text).toContain("Training doesn't transfer");
    expect(result.text).toContain("847 words");
  });

  it("includes inline keyboard with Approve, Revise, Skip buttons", () => {
    const result = buildApprovalMessage({
      agentName: "The Writer",
      agentEmoji: "✍️",
      preview: "Preview text",
      metadata: "meta",
      itemId: "writer-1234",
      agentKey: "writer",
    });
    const buttons = result.reply_markup.inline_keyboard[0];
    expect(buttons).toHaveLength(3);
    expect(buttons[0].callback_data).toBe("approve:writer:writer-1234");
    expect(buttons[1].callback_data).toBe("revise:writer:writer-1234");
    expect(buttons[2].callback_data).toBe("skip:writer:writer-1234");
  });
});

describe("parseCallbackData", () => {
  it("parses valid callback data into action, agent, itemId", () => {
    const result = parseCallbackData("approve:writer:writer-1706000000");
    expect(result).toEqual({
      action: "approve",
      agent: "writer",
      itemId: "writer-1706000000",
    });
  });

  it("returns null for invalid callback data", () => {
    expect(parseCallbackData("not-valid")).toBeNull();
    expect(parseCallbackData("")).toBeNull();
    expect(parseCallbackData("approve:writer")).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: FAIL — `buildApprovalMessage` and `parseCallbackData` not found.

- [ ] **Step 3: Implement telegram.ts**

Create `src/lib/telegram.ts`:

```typescript
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
const BASE = () => `https://api.telegram.org/bot${BOT_TOKEN}`;

// ─── Pure helpers (testable without env vars) ───────────────────────────────

export interface ApprovalMessagePayload {
  text: string;
  parse_mode: "HTML";
  reply_markup: {
    inline_keyboard: Array<Array<{ text: string; callback_data: string }>>;
  };
}

export function buildApprovalMessage(opts: {
  agentName: string;
  agentEmoji: string;
  preview: string;
  metadata: string;
  itemId: string;
  agentKey: string;
}): ApprovalMessagePayload {
  const text = `${opts.agentEmoji} <b>${opts.agentName}</b>\n\n${opts.preview}\n\n<i>${opts.metadata}</i>`;
  return {
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "✅ Approve", callback_data: `approve:${opts.agentKey}:${opts.itemId}` },
        { text: "✏️ Revise", callback_data: `revise:${opts.agentKey}:${opts.itemId}` },
        { text: "⏭️ Skip", callback_data: `skip:${opts.agentKey}:${opts.itemId}` },
      ]],
    },
  };
}

export interface ParsedCallback {
  action: "approve" | "revise" | "skip";
  agent: string;
  itemId: string;
}

export function parseCallbackData(data: string): ParsedCallback | null {
  if (!data) return null;
  const parts = data.split(":");
  if (parts.length < 3) return null;
  const [action, agent, ...rest] = parts;
  if (!["approve", "revise", "skip"].includes(action)) return null;
  return { action: action as ParsedCallback["action"], agent, itemId: rest.join(":") };
}

// ─── API calls (require env vars, not unit-tested) ───────────────────────────

export async function sendMessage(text: string): Promise<void> {
  const res = await fetch(`${BASE()}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Telegram sendMessage failed: ${res.status} ${body}`);
  }
}

export async function sendApprovalRequest(opts: {
  agentName: string;
  agentEmoji: string;
  preview: string;
  metadata: string;
  itemId: string;
  agentKey: string;
}): Promise<void> {
  const payload = buildApprovalMessage(opts);
  const res = await fetch(`${BASE()}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, ...payload }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Telegram sendApprovalRequest failed: ${res.status} ${body}`);
  }
}

export async function answerCallbackQuery(callbackQueryId: string, text = "Got it."): Promise<void> {
  await fetch(`${BASE()}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  });
}

export async function setWebhook(webhookUrl: string): Promise<void> {
  const res = await fetch(`${BASE()}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });
  const data = await res.json();
  console.log("setWebhook response:", data);
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: all 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/telegram.ts src/lib/telegram.test.ts
git commit -m "feat: telegram utility module with message builder and callback parser"
```

---

## Task 3: Build the agent queue module

**Files:**
- Create: `src/lib/agent-queue.ts`
- Create: `src/lib/agent-queue.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/lib/agent-queue.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import {
  readQueue,
  addQueueItem,
  updateQueueItem,
  getLatestApproved,
} from "./agent-queue";

// Tests save/restore queue.json around each test so they don't clobber real data
describe("agent queue", () => {
  const QUEUE_PATH = path.join(process.cwd(), "agents", "queue.json");
  let originalContent: string;

  beforeEach(() => {
    originalContent = fs.existsSync(QUEUE_PATH)
      ? fs.readFileSync(QUEUE_PATH, "utf-8")
      : '{"items":[]}';
    fs.writeFileSync(QUEUE_PATH, '{"items":[]}');
  });

  afterEach(() => {
    fs.writeFileSync(QUEUE_PATH, originalContent);
  });

  it("readQueue returns empty items array when queue is empty", () => {
    const q = readQueue();
    expect(q.items).toEqual([]);
  });

  it("addQueueItem adds item with generated id, timestamps, and pending status", () => {
    const item = addQueueItem({ agent: "writer", status: "pending", data: { draft: "hello" } });
    expect(item.id).toMatch(/^writer-\d+$/);
    expect(item.status).toBe("pending");
    expect(item.data).toEqual({ draft: "hello" });
    expect(item.createdAt).toBeTruthy();
    expect(item.updatedAt).toBeTruthy();
  });

  it("addQueueItem persists to disk", () => {
    addQueueItem({ agent: "writer", status: "pending", data: {} });
    const q = readQueue();
    expect(q.items).toHaveLength(1);
    expect(q.items[0].agent).toBe("writer");
  });

  it("updateQueueItem changes status and updatedAt", () => {
    const item = addQueueItem({ agent: "writer", status: "pending", data: { draft: "hello" } });
    const updated = updateQueueItem(item.id, { status: "approved" });
    expect(updated?.status).toBe("approved");
    expect(updated?.updatedAt).not.toBe(item.updatedAt);
  });

  it("updateQueueItem returns null for unknown id", () => {
    const result = updateQueueItem("nonexistent-id", { status: "approved" });
    expect(result).toBeNull();
  });

  it("getLatestApproved returns most recently approved item for agent", () => {
    addQueueItem({ agent: "writer", status: "pending", data: { draft: "first" } });
    const item1 = addQueueItem({ agent: "writer", status: "pending", data: { draft: "second" } });
    const item2 = addQueueItem({ agent: "writer", status: "pending", data: { draft: "third" } });
    updateQueueItem(item1.id, { status: "approved" });
    updateQueueItem(item2.id, { status: "approved" });
    const latest = getLatestApproved("writer");
    expect(latest?.data).toEqual({ draft: "third" });
  });

  it("getLatestApproved returns null when no approved items exist", () => {
    addQueueItem({ agent: "writer", status: "pending", data: {} });
    expect(getLatestApproved("writer")).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: FAIL — `agent-queue` module not found.

- [ ] **Step 3: Implement agent-queue.ts**

Create `src/lib/agent-queue.ts`:

```typescript
import fs from "fs";
import path from "path";

const QUEUE_PATH = path.join(process.cwd(), "agents", "queue.json");

export interface QueueItem {
  id: string;
  agent: string;
  status: "pending" | "approved" | "revised" | "skipped";
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Queue {
  items: QueueItem[];
}

export function readQueue(): Queue {
  if (!fs.existsSync(QUEUE_PATH)) {
    return { items: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(QUEUE_PATH, "utf-8")) as Queue;
  } catch {
    return { items: [] };
  }
}

export function writeQueue(queue: Queue): void {
  fs.mkdirSync(path.dirname(QUEUE_PATH), { recursive: true });
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
}

export function addQueueItem(
  item: Omit<QueueItem, "id" | "createdAt" | "updatedAt">
): QueueItem {
  const queue = readQueue();
  const now = new Date().toISOString();
  const newItem: QueueItem = {
    ...item,
    id: `${item.agent}-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };
  queue.items.push(newItem);
  writeQueue(queue);
  return newItem;
}

export function updateQueueItem(
  id: string,
  updates: Partial<Pick<QueueItem, "status" | "data">>
): QueueItem | null {
  const queue = readQueue();
  const idx = queue.items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  queue.items[idx] = {
    ...queue.items[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeQueue(queue);
  return queue.items[idx];
}

export function getLatestApproved(agent: string): QueueItem | null {
  const queue = readQueue();
  const approved = queue.items
    .filter((i) => i.agent === agent && i.status === "approved")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  return approved[0] ?? null;
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: all queue tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/agent-queue.ts src/lib/agent-queue.test.ts
git commit -m "feat: agent queue module for tracking pending/approved/skipped agent items"
```

---

## Task 4: Build the Telegram webhook route

**Files:**
- Create: `src/app/api/telegram-webhook/route.ts`

Note: This route handles live Telegram callbacks. It dispatches to agent action handlers that will be implemented in later phases. For now, handlers log the action and send a confirmation message back to Telegram.

- [ ] **Step 1: Create the webhook route**

Create `src/app/api/telegram-webhook/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { parseCallbackData, answerCallbackQuery, sendMessage } from "@/lib/telegram";
import { updateQueueItem } from "@/lib/agent-queue";

// ─── Action handlers ──────────────────────────────────────────────────────────
// These are stubs in Phase 1. Phases 3–5 will replace these with real actions.

async function handleApprove(agent: string, itemId: string): Promise<void> {
  updateQueueItem(itemId, { status: "approved" });
  switch (agent) {
    case "writer":
      // Phase 3: publishNewsletter(itemId)
      await sendMessage(`✅ Writer approved. Newsletter publishing will be wired in Phase 3.`);
      break;
    case "closer":
      // Phase 5: sendCloserEmail(itemId)
      await sendMessage(`✅ Closer approved. Email sending will be wired in Phase 5.`);
      break;
    case "creator":
      // Phase 5: saveCreatorOutput(itemId)
      await sendMessage(`✅ Creator output approved and queued.`);
      break;
    default:
      await sendMessage(`✅ Approved: ${agent} / ${itemId}`);
  }
}

async function handleRevise(agent: string, itemId: string): Promise<void> {
  updateQueueItem(itemId, { status: "revised" });
  switch (agent) {
    case "writer":
      // Phase 3: requeueWriter(itemId)
      await sendMessage(`✏️ Writer revision queued. Re-run will be wired in Phase 3.`);
      break;
    default:
      await sendMessage(`✏️ Revision requested: ${agent} / ${itemId}`);
  }
}

async function handleSkip(agent: string, itemId: string): Promise<void> {
  updateQueueItem(itemId, { status: "skipped" });
  await sendMessage(`⏭️ Skipped: ${agent}`);
}

async function handleCommand(text: string): Promise<void> {
  // Freeform commands from Sam, e.g. "social", "help"
  switch (text) {
    case "social":
      await sendMessage(`📡 Social command received. Distributor wiring coming in Phase 4.`);
      break;
    case "help":
      await sendMessage(
        `Attune Agent Team\n\nCommands:\n• social — trigger Distributor\n• help — show this message\n\nPending approvals are sent automatically by agents.`
      );
      break;
    default:
      await sendMessage(`Command not recognized: "${text}". Reply "help" for options.`);
  }
}

// ─── Webhook handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Button tap callback
  if (body.callback_query && typeof body.callback_query === "object") {
    const cq = body.callback_query as {
      id: string;
      data?: string;
    };
    const callbackQueryId = cq.id;
    const data = cq.data ?? "";

    await answerCallbackQuery(callbackQueryId);

    const parsed = parseCallbackData(data);
    if (!parsed) {
      await sendMessage(`⚠️ Unrecognized callback: ${data}`);
      return NextResponse.json({ ok: true });
    }

    const { action, agent, itemId } = parsed;
    if (action === "approve") await handleApprove(agent, itemId);
    else if (action === "revise") await handleRevise(agent, itemId);
    else if (action === "skip") await handleSkip(agent, itemId);

    return NextResponse.json({ ok: true });
  }

  // Freeform text message
  if (
    body.message &&
    typeof body.message === "object" &&
    (body.message as { text?: string }).text
  ) {
    const text = ((body.message as { text: string }).text).trim().toLowerCase();
    await handleCommand(text);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/telegram-webhook/route.ts
git commit -m "feat: telegram webhook route with approval router (Phase 1 stubs)"
```

---

## Task 5: Configure environment variables and register the bot

**Files:**
- Modify: `.env.local` (local only, never committed)

- [ ] **Step 1: Create the Telegram bot**

1. Open Telegram → search `@BotFather` → `/newbot`
2. Name: `Attune Agent Team`
3. Username: `attune_agents_bot` (or similar — must be unique)
4. Copy the bot token (looks like `7123456789:AAF...`)

- [ ] **Step 2: Get your Telegram chat ID**

1. Start a conversation with your new bot (send it any message)
2. Visit in browser: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Find `"chat":{"id":XXXXXXXXX}` — that number is your chat ID

- [ ] **Step 3: Add to .env.local**

```bash
# Add these lines to .env.local (never commit this file)
TELEGRAM_BOT_TOKEN=7123456789:AAF...
TELEGRAM_CHAT_ID=123456789
```

- [ ] **Step 4: Add same vars to Vercel**

Vercel dashboard → your Attune project → Settings → Environment Variables:
- `TELEGRAM_BOT_TOKEN` = your bot token
- `TELEGRAM_CHAT_ID` = your chat ID

Apply to: Production, Preview, Development.

- [ ] **Step 5: Deploy to Vercel**

```bash
git push origin main
```

Wait for Vercel deployment to complete (~1 min). Check Vercel dashboard for green deploy.

- [ ] **Step 6: Register the webhook with Telegram**

In your browser, visit:

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://attunemastery.com/api/telegram-webhook
```

Expected response:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

- [ ] **Step 7: Verify webhook is registered**

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo
```

Expected: `"url":"https://attunemastery.com/api/telegram-webhook"` and `"pending_update_count":0`.

---

## Task 6: End-to-End Smoke Test

Validate the full pipeline before any agents are built.

- [ ] **Step 1: Test inbound message**

In Telegram, send your bot: `help`

Expected: Bot replies with the help message listing available commands.

- [ ] **Step 2: Test approval flow manually**

In Claude Code terminal, run a one-off test that adds a fake item to the queue and sends an approval request:

```bash
node -e "
const { addQueueItem } = require('./src/lib/agent-queue.ts');
// Won't work directly — use a quick Next.js API route test instead
"
```

Instead, create a temporary test script `scripts/test-telegram.mjs`:

```javascript
// scripts/test-telegram.mjs
// Run: node scripts/test-telegram.mjs
// Delete after smoke test passes.
import { config } from 'dotenv';
config({ path: '.env.local' });

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

const res = await fetch(`${BASE}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text: '✍️ <b>The Writer</b>\n\n<b>Subject:</b> "Training doesn\'t transfer — here\'s why"\n\n<i>The athlete who trains 1000 free throws in an empty gym...</i>\n\n<i>847 words · ~4 min read</i>',
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [[
        { text: '✅ Approve', callback_data: 'approve:writer:writer-test-001' },
        { text: '✏️ Revise', callback_data: 'revise:writer:writer-test-001' },
        { text: '⏭️ Skip', callback_data: 'skip:writer:writer-test-001' },
      ]],
    },
  }),
});
const data = await res.json();
console.log('Result:', JSON.stringify(data, null, 2));
```

```bash
node scripts/test-telegram.mjs
```

Expected: Script prints `"ok": true`. Check your Telegram — you should see a Writer approval request with 3 buttons.

- [ ] **Step 3: Tap each button and verify responses**

- Tap **✅ Approve** → Bot should reply: `✅ Writer approved. Newsletter publishing will be wired in Phase 3.`
- Check Vercel function logs: Functions → telegram-webhook → should show the callback received
- Check `agents/queue.json` — should show the item with status `"approved"`

- [ ] **Step 4: Clean up test script**

```bash
rm scripts/test-telegram.mjs
git add agents/queue.json
git commit -m "test: telegram command center smoke test passed — queue updated"
```

---

## Summary

Phase 1 complete when:
- [ ] All unit tests pass (`npm test`)
- [ ] TypeScript compiles with no errors (`npx tsc --noEmit`)
- [ ] Bot responds to `help` command in Telegram
- [ ] Approval request message appears on phone with 3 buttons
- [ ] Tapping Approve → confirmation message sent back + `queue.json` updated
- [ ] Vercel function logs show clean webhook execution

**Next:** Phase 2 plan — GM + Scout + Ops Brain (the first three live agents).
