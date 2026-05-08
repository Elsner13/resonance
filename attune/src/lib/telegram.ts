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
  const res = await fetch(`${BASE()}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Telegram answerCallbackQuery failed: ${res.status} ${body}`);
  }
}

export async function setWebhook(webhookUrl: string): Promise<void> {
  const res = await fetch(`${BASE()}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`Telegram setWebhook failed: ${res.status}`, data);
  } else {
    console.log("Telegram webhook registered:", data.description);
  }
}
