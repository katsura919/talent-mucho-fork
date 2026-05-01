type AnyRecord = Record<string, unknown>;

export function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => {
    if (o == null) return undefined;
    if (Array.isArray(o)) return o[Number(k)];
    return (o as AnyRecord)[k];
  }, obj);
}

export function setByPath(obj: unknown, path: string, value: unknown): void {
  const keys = path.split('.');
  const last = keys.pop()!;
  const target = keys.reduce<unknown>((o, k) => {
    if (o == null) return undefined;
    if (Array.isArray(o)) return o[Number(k)];
    return (o as AnyRecord)[k];
  }, obj);
  if (target == null) return;
  if (Array.isArray(target)) (target as unknown[])[Number(last)] = value;
  else (target as AnyRecord)[last] = value;
}

export async function typeOut(
  text: string,
  onChunk: (chunk: string) => void,
  signal: { cancelled: boolean },
): Promise<void> {
  const tokens = text.match(/\S+\s*/g) ?? [text];
  for (const tok of tokens) {
    if (signal.cancelled) return;
    onChunk(tok);
    const delay = /[.!?]\s*$/.test(tok) ? 90 : 22 + Math.random() * 30;
    await new Promise(r => setTimeout(r, delay));
  }
}

export function fmt(s: number): string {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function fmtEvent(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sc = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sc).padStart(2, '0')}`;
}
