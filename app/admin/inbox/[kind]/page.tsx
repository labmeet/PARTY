import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { AutoRefresh } from "@/app/admin/components/AutoRefresh";

export const dynamic = "force-dynamic";

type Kind = "private" | "public";

type QrPostRow = {
  id: string;
  slug: string;
  kind: Kind;
  prompt: string;
  body: string | null;
  active: boolean;
  created_at: string;
};

type PrivateMsgRow = {
  id: string;
  body: string;
  author_label: string | null;
  target_element: string | null;
  created_at: string;
  qr_posts:
    | { kind: Kind; prompt: string; slug: string }
    | { kind: Kind; prompt: string; slug: string }[]
    | null;
};

export default async function InboxListPage({
  params,
}: {
  params: { kind: string };
}) {
  if (!isAuthed()) redirect("/admin/login");
  if (params.kind !== "private" && params.kind !== "public") notFound();
  const kind = params.kind as Kind;

  const supabase = createAdminClient();

  if (kind === "private") {
    return PrivateByRecipient({ supabase });
  }

  // PUBLIC: show list of public QRs with counts
  const { data: postData } = await supabase
    .from("qr_posts")
    .select("id, slug, kind, prompt, body, active, created_at")
    .eq("kind", "public")
    .order("created_at", { ascending: false });
  const posts = (postData ?? []) as QrPostRow[];

  const { data: countData } = await supabase
    .from("qr_messages")
    .select("post_id");
  const counts = new Map<string, number>();
  for (const r of (countData ?? []) as Array<{ post_id: string }>) {
    counts.set(r.post_id, (counts.get(r.post_id) ?? 0) + 1);
  }

  return (
    <main className="min-h-screen bg-bg-base px-4 py-10 sm:py-14">
      <AutoRefresh ms={10000} />
      <div className="container-page max-w-3xl space-y-8">
        <Link
          href="/admin"
          className="text-[12px] text-fg-muted hover:text-fg transition-colors"
        >
          ← 대시보드
        </Link>

        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-pop">
            Inbox
          </p>
          <h1 className="font-serif text-[28px] font-bold text-fg">
            공공 메시지함
          </h1>
          <p className="text-[12px] text-fg-muted">
            QR {posts.length}개 · 각 QR을 클릭하면 메시지를 확인할 수 있어요.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-[13px] text-fg-muted text-center py-12">
            아직 만든 공공 QR이 없어요.
          </p>
        ) : (
          <ul className="space-y-2">
            {posts.map((p) => {
              const n = counts.get(p.id) ?? 0;
              return (
                <li key={p.id}>
                  <Link
                    href={`/admin/qr/${p.slug}`}
                    className="card flex flex-col gap-2 hover:border-primary transition-colors sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pop">
                        공공 포스팅
                        {!p.active && (
                          <span className="ml-2 text-fg-subtle">· 비활성</span>
                        )}
                      </p>
                      <p className="font-serif text-[16px] font-bold text-fg mt-1 truncate">
                        {p.prompt}
                      </p>
                      <p className="text-[11px] text-fg-subtle mt-0.5 font-mono">
                        /q/{p.slug}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-baseline gap-2">
                      <span className="font-serif text-[22px] font-bold text-fg tabular-nums">
                        {n}
                      </span>
                      <span className="text-[11px] text-fg-muted">개</span>
                      <span className="ml-2 text-[12px] text-fg-muted">→</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}

async function PrivateByRecipient({
  supabase,
}: {
  supabase: ReturnType<typeof createAdminClient>;
}) {
  const { data } = await supabase
    .from("qr_messages")
    .select(
      "id, body, author_label, target_element, created_at, qr_posts!inner(kind, prompt, slug)"
    )
    .eq("qr_posts.kind", "private")
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as PrivateMsgRow[];

  const byElement = new Map<
    string,
    Array<{
      id: string;
      body: string;
      author_label: string | null;
      created_at: string;
      from_prompt: string;
      from_slug: string;
    }>
  >();

  for (const r of rows) {
    const post = Array.isArray(r.qr_posts) ? r.qr_posts[0] : r.qr_posts;
    const target = r.target_element ?? "(받는 사람 없음)";
    const arr = byElement.get(target) ?? [];
    arr.push({
      id: r.id,
      body: r.body,
      author_label: r.author_label,
      created_at: r.created_at,
      from_prompt: post?.prompt ?? "—",
      from_slug: post?.slug ?? "",
    });
    byElement.set(target, arr);
  }

  const groups = Array.from(byElement.entries()).sort(
    (a, b) =>
      new Date(b[1][0].created_at).getTime() -
      new Date(a[1][0].created_at).getTime()
  );

  return (
    <main className="min-h-screen bg-bg-base px-4 py-10 sm:py-14">
      <AutoRefresh ms={10000} />
      <div className="container-page max-w-3xl space-y-8">
        <Link
          href="/admin"
          className="text-[12px] text-fg-muted hover:text-fg transition-colors"
        >
          ← 대시보드
        </Link>

        <header className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Inbox · By Recipient
          </p>
          <h1 className="font-serif text-[28px] font-bold text-fg">
            개인 메시지함
          </h1>
          <p className="text-[12px] text-fg-muted">
            받은 사람(원소)별로 묶어서 보여줍니다 · 총 {rows.length}개 · 10초마다 새로고침
          </p>
        </header>

        {groups.length === 0 ? (
          <p className="text-[13px] text-fg-muted text-center py-12">
            아직 받은 메시지가 없어요
          </p>
        ) : (
          <div className="space-y-8">
            {groups.map(([element, msgs]) => (
              <section key={element} className="space-y-3">
                <header className="flex items-baseline gap-3 border-b border-border pb-2">
                  <h2 className="font-serif text-[24px] font-bold text-primary">
                    {element}
                  </h2>
                  <p className="text-[12px] text-fg-muted">
                    {msgs.length}개 받음
                  </p>
                </header>
                <ul className="space-y-2">
                  {msgs.map((m) => (
                    <li key={m.id} className="card">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        {m.author_label ? (
                          <p className="text-[11px] font-semibold text-primary">
                            — {m.author_label}
                          </p>
                        ) : (
                          <p className="text-[11px] text-fg-subtle">— 익명</p>
                        )}
                        <Link
                          href={`/admin/qr/${m.from_slug}`}
                          className="text-[10px] text-fg-subtle hover:text-fg transition-colors max-w-[60%] truncate font-mono"
                          title={m.from_prompt}
                        >
                          ← {m.from_prompt}
                        </Link>
                      </div>
                      <p className="text-[14px] leading-[1.7] text-fg whitespace-pre-wrap">
                        {m.body}
                      </p>
                      <p className="text-[10px] text-fg-subtle mt-2">
                        {new Date(m.created_at).toLocaleString("ko-KR")}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
