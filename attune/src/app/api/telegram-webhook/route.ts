import { NextRequest, NextResponse } from "next/server";
import { parseCallbackData, answerCallbackQuery, sendMessage } from "@/lib/telegram";
import { updateQueueItem } from "@/lib/agent-queue";

// ─── Action handlers ──────────────────────────────────────────────────────────
// These are stubs in Phase 1. Phases 3–5 will replace these with real actions.

async function handleApprove(agent: string, itemId: string): Promise<void> {
  const result = updateQueueItem(itemId, { status: "approved" });
  if (!result) {
    await sendMessage(`⚠️ Could not find queue item: ${itemId}. It may have already been processed.`);
    return;
  }
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
  const result = updateQueueItem(itemId, { status: "revised" });
  if (!result) {
    await sendMessage(`⚠️ Could not find queue item: ${itemId}. It may have already been processed.`);
    return;
  }
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
  const result = updateQueueItem(itemId, { status: "skipped" });
  if (!result) {
    await sendMessage(`⚠️ Could not find queue item: ${itemId}. It may have already been processed.`);
    return;
  }
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
