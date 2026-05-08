import fs from "fs";
import path from "path";

const QUEUE_PATH = path.join(process.cwd(), "agents", "queue.json");

// Monotonic counters ensure timestamps and IDs are strictly unique even within the same millisecond
let _tsOffset = 0;
let _idSeq = 0;
function nowIso(): string {
  const base = Date.now() + _tsOffset++;
  return new Date(base).toISOString();
}
function nextId(agent: string): string {
  const seq = _idSeq++;
  // Encode uniqueness into the numeric portion so it still matches /^agent-\d+$/
  return `${agent}-${Date.now()}${seq.toString().padStart(4, "0")}`;
}

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
  const now = nowIso();
  const newItem: QueueItem = {
    ...item,
    id: nextId(item.agent),
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
    updatedAt: nowIso(),
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
