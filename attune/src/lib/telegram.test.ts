import { describe, it, expect } from "vitest";
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
