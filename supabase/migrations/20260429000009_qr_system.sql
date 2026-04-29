-- Public QR posts + per-participant private message inbox
-- Drop & recreate to ensure idempotency on schema changes
drop table if exists qr_messages cascade;
drop table if exists qr_posts cascade;
drop table if exists private_messages cascade;

create extension if not exists pgcrypto;

-- =========================================================
-- Public QR posts (admin creates a QR with a prompt;
-- anyone scans and answers; answers shown on /admin/board)
-- =========================================================
create table qr_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  prompt text not null check (length(trim(prompt)) between 1 and 200),
  body text check (body is null or length(body) <= 500),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table qr_messages (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references qr_posts(id) on delete cascade,
  body text not null check (length(trim(body)) between 1 and 500),
  author_label text check (author_label is null or length(author_label) <= 40),
  created_at timestamptz not null default now()
);

create index if not exists idx_qr_messages_post_created
  on qr_messages (post_id, created_at desc);

alter table qr_posts enable row level security;
alter table qr_messages enable row level security;

create policy qr_posts_anon_select
  on qr_posts for select
  to anon
  using (active = true);

create policy qr_messages_anon_insert
  on qr_messages for insert
  to anon
  with check (
    exists (
      select 1 from qr_posts p
      where p.id = qr_messages.post_id and p.active = true
    )
  );

-- =========================================================
-- Per-participant private messages — anyone scans /m,
-- picks a recipient (their element), writes a message.
-- Only admin can read.
-- =========================================================
create table private_messages (
  id uuid primary key default gen_random_uuid(),
  target_element text not null check (length(target_element) between 1 and 8),
  body text not null check (length(trim(body)) between 1 and 500),
  author_label text check (author_label is null or length(author_label) <= 40),
  created_at timestamptz not null default now()
);

create index if not exists idx_private_messages_target_created
  on private_messages (target_element, created_at desc);

alter table private_messages enable row level security;

create policy private_messages_anon_insert
  on private_messages for insert
  to anon
  with check (true);
