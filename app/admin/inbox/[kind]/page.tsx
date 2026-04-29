import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";

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

const KIND_LABEL: Record<Kind, string> = {
  private: "개인 메시지함",
  public: "공공 메시지함",
};

const KIND_ACCENT: Record<Kind, string> = {
  private: "text-primary",
  public: "text-pop",
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
  const { data: postData } = await supabase
    .from("qr_posts")
    .select("id, slug, kind, prompt, body, active, created_at")
    .eq("kind", kind)
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
      <div className="container-page max-w-3xl space-y-8">
        <Link
          href="/admin"
          className="text-[12px] text-fg-muted hover:text-fg transition-colors"
        >
          ← 대시보드
        </Link>

        <header className="space-y-1">
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${KIND_ACCENT[kind]}`}
          >
            Inbox
          </p>
          <h1 className="font-serif text-[28px] font-bold text-fg">
            {KIND_LABEL[kind]}
          </h1>
          <p className="text-[12px] text-fg-muted">
            QR {posts.length}개 · 각 QR을 클릭하면 메시지를 확인할 수 있어요.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-[13px] text-fg-muted text-center py-12">
            아직 만든 {KIND_LABEL[kind]} QR이 없어요.
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
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${KIND_ACCENT[kind]}`}
                      >
                        {kind === "public" ? "공공 포스팅" : "개인 메시지"}
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
