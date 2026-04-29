-- LabMeet QR system: admin-managed QR posts (private + public) and message inboxes
-- Drop & recreate to keep idempotent across iterative schema edits
drop table if exists qr_messages cascade;
drop table if exists qr_posts cascade;
drop table if exists private_messages cascade;

create extension if not exists pgcrypto;

create table qr_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  kind text not null check (kind in ('private', 'public')),
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
  target_element text check (target_element is null or length(target_element) <= 8),
  created_at timestamptz not null default now()
);

create index if not exists idx_qr_messages_post_created
  on qr_messages (post_id, created_at desc);

create index if not exists idx_qr_messages_target
  on qr_messages (target_element)
  where target_element is not null;

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
