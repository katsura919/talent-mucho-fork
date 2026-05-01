create table if not exists freebie_subscribers (
  id          bigint generated always as identity primary key,
  email       text not null,
  source      text not null default 'start-page',
  created_at  timestamptz not null default now()
);

create unique index if not exists freebie_subscribers_email_idx on freebie_subscribers (email);
