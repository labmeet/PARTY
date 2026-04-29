-- QR posts and messages for admin-managed party prompts
create extension if not exists pgcrypto;

create table if not exists qr_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  kind text not null check (kind in ('private', 'public')),
  prompt text not null check (length(trim(prompt)) between 1 and 200),
  body text check (body is null or length(body) <= 500),
  target_element text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint chk_kind_payload check (
    (kind = 'private' and target_element is not null)
    or (kind = 'public' and target_element is null)
  )
);

create table if not exists qr_messages (
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

drop policy if exists qr_posts_anon_select on qr_posts;
create policy qr_posts_anon_select
  on qr_posts for select
  to anon
  using (active = true);

drop policy if exists qr_messages_anon_insert on qr_messages;
create policy qr_messages_anon_insert
  on qr_messages for insert
  to anon
  with check (
    exists (
      select 1 from qr_posts p
      where p.id = qr_messages.post_id and p.active = true
    )
  );
