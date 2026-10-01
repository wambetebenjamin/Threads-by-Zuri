/**
 * Storage layer: uses Vercel KV when the KV_REST_API_URL / KV_REST_API_TOKEN
 * env vars are present (i.e. on Vercel with a KV store attached), and falls
 * back to an in-memory store for local development so every API route keeps
 * working without any configuration.
 */

type Json = Record<string, unknown>;

const memory = new Map<string, Json[]>();

function kvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function pushRecord(listKey: string, record: Json): Promise<void> {
  if (kvConfigured()) {
    const { kv } = await import("@vercel/kv");
    await kv.lpush(listKey, JSON.stringify(record));
    return;
  }
  const list = memory.get(listKey) ?? [];
  list.unshift(record);
  memory.set(listKey, list);
}

export async function listRecords(listKey: string, limit = 50): Promise<Json[]> {
  if (kvConfigured()) {
    const { kv } = await import("@vercel/kv");
    const raw = await kv.lrange<string | Json>(listKey, 0, limit - 1);
    return raw.map((r) => (typeof r === "string" ? JSON.parse(r) : r));
  }
  return (memory.get(listKey) ?? []).slice(0, limit);
}

export async function addToSet(setKey: string, value: string): Promise<boolean> {
  if (kvConfigured()) {
    const { kv } = await import("@vercel/kv");
    const added = await kv.sadd(setKey, value);
    return added === 1;
  }
  const list = memory.get(setKey) ?? [];
  if (list.some((v) => (v as { value?: string }).value === value)) return false;
  list.push({ value });
  memory.set(setKey, list);
  return true;
}
