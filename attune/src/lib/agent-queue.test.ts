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
