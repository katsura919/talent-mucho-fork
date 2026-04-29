# Supabase setup

## What this stores

The Event OS at `/events/claude-for-business/os` lets you edit the live script in-page. Those edits are persisted to a Postgres table in Supabase so you can:

- Sync edits across devices (Abie's laptop + Meri's laptop see the same script)
- Recover from accidental wipes (every change is auto-snapshotted to a history table)
- Survive deployments without losing edits

## One-time setup

### Option A: Vercel Marketplace (recommended)

1. Vercel Dashboard → talent-mucho project (under AVSPH team) → **Storage** tab
2. Click **Create Database** → **Supabase** (under Marketplace)
3. Pick a project name, region, free tier
4. Vercel auto-injects env vars across Production / Preview / Development:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Option B: Existing Supabase project

If you already have a Supabase project and want to use it:

1. Get the URL + service role key from Settings → API in the Supabase dashboard
2. Add to your `.env.local` for local dev:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```
3. Add the same vars to your Vercel project env (Production scope) for the live site

## Run the migration

In the Supabase dashboard → **SQL Editor** → **New query** → paste the contents of:

```
supabase/migrations/0001_event_scripts.sql
```

Run it. Should create:

- `event_scripts` table (one row per event, holds the `edits` JSON)
- `event_script_history` table (auto-snapshots every change)
- A trigger that captures the old version on every update
- RLS enabled (server uses service role to bypass)
- A seed row for `slug = 'claude-for-business'`

## Verify locally

```bash
npm run dev
```

Then in a browser console at `http://localhost:3000/events/claude-for-business/os`:

```js
fetch('/api/events/claude-for-business/script').then(r => r.json()).then(console.log)
// → { edits: {}, version: 1, updatedAt: '...' }
```

## API

| Method | Path | Body | Purpose |
|---|---|---|---|
| `GET` | `/api/events/claude-for-business/script` | — | Read the latest edits |
| `PUT` | `/api/events/claude-for-business/script` | `{ edits: {...} }` | Save edits (rejects empty edits unless `?force=1`) |
| `GET` | `/api/events/claude-for-business/script/history?limit=10` | — | Last N versions |

## Recovery

If edits get wiped, the history table has every previous version. Restore via:

```sql
update event_scripts
set edits = (
  select edits from event_script_history
  where slug = 'claude-for-business'
  order by saved_at desc
  limit 1 offset 1  -- skip the current empty version, grab the previous
)
where slug = 'claude-for-business';
```

Or just call the history endpoint and pick the version you want, then PUT it back through the script API.
