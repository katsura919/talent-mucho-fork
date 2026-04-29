-- Talent Mucho ~ event scripts storage
-- Holds the editable script edits for the Event OS (segment + beat + block diffs)
-- One row per event slug. History trigger keeps every change so wipes are recoverable.

-- ── Tables ───────────────────────────────────────────────────────────────────

create table if not exists event_scripts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  edits       jsonb not null default '{}'::jsonb,
  version     integer not null default 1,
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

create table if not exists event_script_history (
  id          bigserial primary key,
  script_id   uuid not null references event_scripts(id) on delete cascade,
  slug        text not null,
  edits       jsonb not null,
  version     integer not null,
  saved_at    timestamptz not null default now()
);

create index if not exists event_scripts_slug_idx
  on event_scripts(slug);

create index if not exists event_script_history_script_id_saved_at_idx
  on event_script_history(script_id, saved_at desc);

-- ── History trigger ~ snapshot every meaningful edit ────────────────────────

create or replace function snapshot_event_script() returns trigger as $$
begin
  -- Only snapshot if edits actually changed, skip identical updates
  if NEW.edits is distinct from OLD.edits then
    insert into event_script_history (script_id, slug, edits, version)
    values (OLD.id, OLD.slug, OLD.edits, OLD.version);
    NEW.version = OLD.version + 1;
    NEW.updated_at = now();
  end if;
  return NEW;
end;
$$ language plpgsql;

drop trigger if exists event_scripts_history_trg on event_scripts;
create trigger event_scripts_history_trg
  before update on event_scripts
  for each row
  execute function snapshot_event_script();

-- ── Row-level security ~ block all public access; server uses service role ──

alter table event_scripts enable row level security;
alter table event_script_history enable row level security;

-- No policies = nobody can read/write directly. The Next.js server uses the
-- service role key (which bypasses RLS) so only authenticated server routes
-- can access the data.

-- ── Seed: create the row for the May 1 Claude for Business event ────────────

insert into event_scripts (slug, edits)
values ('claude-for-business', '{}'::jsonb)
on conflict (slug) do nothing;
