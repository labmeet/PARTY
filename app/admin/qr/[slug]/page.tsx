import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  deleteQrPostAction,
  toggleQrActiveAction,
} from "@/lib/admin/actions";
import { AutoRefresh } from "@/app/admin/components/AutoRefresh";

export const dynamic = "force-dynamic";

type QrPost = {
  id: string;
  slug: string;
  kind: "private" | "public";
  prompt: string;
  body: string | null;
  active: boolean;
  created_at: string;
};

type QrMessage = {
  id: string;
  body: string;
  author_label: string | null;
  target_element: string | null;
  created_at: string;
};

function siteUrl(slug: string): string {
  const h = headers();
  const host = h.get("host") || "labmeet.love";
  const proto =
    process.env.NODE_ENV === "production" || !host.startsWith("localhost")
      ? "https"
      : "http";
  return `${proto}://${host}/q/${slug}`;
}

export default async function AdminQrDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!isAuthed()) redirect("/admin/login");

  const supabase = createAdminClient();
  const { data: post } = await supabase
    .from("qr_posts")
    .select("id, slug, kind, prompt, body, active, created_at")
    .eq("slug", params.slug)
    .maybeSingle<QrPost>();

  if (!post) redirect("/admin");

  const { data: msgData } = await supabase
    .from("qr_messages")
    .select("id, body, author_label, target_element, created_at")
    .eq("post_id", post.id)
    .order("created_at", { ascending: false });
  const messages = (msgData ?? []) as QrMessage[];

  const url = siteUrl(post.slug);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=12&data=${encodeURIComponent(
    url
  )}`;

  const isPrivate = post.kind === "private";
  const accent = isPrivate ? "text-primary" : "text-pop";
  const kindLabel = isPrivate ? "개인 메시지" : "공공 포스팅";

  // Group private messages by recipient
  const privateGrouped: Array<[string, QrMessage[]]> = [];
  if (isPrivate) {
    const map = new Map<string, QrMessage[]>();
    for (const m of messages) {
      const key = m.target_element || "(받는 사람 없음)";
      const arr = map.get(key) ?? [];
      arr.push(m);
      map.set(key, arr);
    }
    privateGrouped.push(...Array.from(map.entries()));
    privateGrouped.sort(
      (a, b) =>
        new Date(b[1][0].created_at).getTime() -
        new Date(a[1][0].created_at).getTime()
    );
  }

  return (
    <main className="min-h-screen bg-bg-base px-4 py-10 sm:py-14">
      <AutoRefresh ms={8000} />
      <div className="container-page max-w-3xl space-y-8">
        <Link
          href={`/admin/inbox/${post.kind}`}
          className="text-[12px] text-fg-muted hover:text-fg transition-colors"
        >
          ← {kindLabel}함
        </Link>

        <header className="text-center space-y-2">
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.25em] ${accent}`}
          >
            {kindLabel}
            {!post.active && (
              <span className="ml-2 text-fg-subtle">· 비활성</span>
            )}
          </p>
          <h1 className="font-serif text-[26px] font-bold text-fg sm:text-[30px]">
            {post.prompt}
          </h1>
          {post.body && (
            <p className="text-[13px] text-fg-muted leading-relaxed mx-auto max-w-md">
              {post.body}
            </p>
          )}
        </header>

        <div className="card flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrSrc}
            alt={`${post.slug} QR`}
            width={300}
            height={300}
            className="rounded-lg bg-white p-3"
          />
          <div className="text-center">
            <p className="text-[11px] text-fg-subtle break-all font-mono">
              {url}
            </p>
            <p className="mt-1 text-[11px] text-fg-muted">
              {isPrivate
                ? "스캔 → 받는 사람 선택 → 메시지 작성"
                : "스캔하면 메시지 작성 페이지로 이동합니다"}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <form action={toggleQrActiveAction}>
              <input type="hidden" name="slug" value={post.slug} />
              <input
                type="hidden"
                name="next"
                value={post.active ? "false" : "true"}
              />
              <button className="btn-ghost text-[12px]" type="submit">
                {post.active ? "비활성화" : "다시 활성화"}
              </button>
            </form>
            <form action={deleteQrPostAction}>
              <input type="hidden" name="slug" value={post.slug} />
              <button
                className="btn-ghost text-[12px] text-pop"
                type="submit"
              >
                삭제
              </button>
            </form>
            {!isPrivate && (
              <Link
                href={`/admin/board/${post.slug}`}
                className="btn-primary text-[12px]"
              >
                스크린 보기
              </Link>
            )}
          </div>
        </div>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-serif text-[18px] font-bold text-fg">
              받은 메시지 ({messages.length})
            </h2>
            <p className="text-[11px] text-fg-subtle">8초마다 새로고침</p>
          </div>

          {messages.length === 0 ? (
            <p className="text-[13px] text-fg-muted text-center py-10">
              아직 메시지가 없어요
            </p>
          ) : isPrivate ? (
            <div className="space-y-6">
              {privateGrouped.map(([element, msgs]) => (
                <section key={element} className="space-y-2">
                  <header className="flex items-baseline gap-3 border-b border-border pb-2">
                    <h3 className="font-serif text-[20px] font-bold text-primary">
                      {element}
                    </h3>
                    <p className="text-[12px] text-fg-muted">
                      {msgs.length}개 받음
                    </p>
                  </header>
                  <ul className="space-y-2">
                    {msgs.map((m) => (
                      <li key={m.id} className="card">
                        {m.author_label && (
                          <p className="text-[11px] font-semibold text-primary mb-1">
                            — {m.author_label}
                          </p>
                        )}
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
          ) : (
            <ul className="space-y-2">
              {messages.map((m) => (
                <li key={m.id} className="card">
                  {m.author_label && (
                    <p className="text-[11px] font-semibold text-primary mb-1">
                      — {m.author_label}
                    </p>
                  )}
                  <p className="text-[14px] leading-[1.7] text-fg whitespace-pre-wrap">
                    {m.body}
                  </p>
                  <p className="text-[10px] text-fg-subtle mt-2">
                    {new Date(m.created_at).toLocaleString("ko-KR")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
