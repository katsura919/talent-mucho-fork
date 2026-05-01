-- Talent Mucho ~ live event state
-- Tracks the presenter's current segment so audience page can sync in realtime.

create table if not exists event_state (
  slug            text primary key,
  current_segment integer not null default 0,
  is_live         boolean not null default false,
  updated_at      timestamptz not null default now()
);

-- Allow anyone to read event state (audience page uses anon key)
alter table event_state enable row level security;

create policy "Public read event_state"
  on event_state for select
  using (true);

-- Only service role can write (presenter via Next.js API route)
-- No INSERT/UPDATE/DELETE policy = only service role can modify

-- Enable realtime for this table
alter publication supabase_realtime add table event_state;

-- Seed row for the Claude for Business event
insert into event_state (slug, current_segment, is_live)
values ('claude-for-business', 0, false)
on conflict (slug) do nothing;
