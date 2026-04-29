import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  createQrPostAction,
  logoutAction,
} from "@/lib/admin/actions";

export const dynamic = "force-dynamic";

type QrPost = {
  id: string;
  slug: string;
  kind: "private" | "public";
  target_element: string | null;
  topic: string | null;
  active: boolean;
  created_at: string;
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (!isAuthed()) redirect("/admin/login");

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("qr_posts")
    .select("id, slug, kind, target_element, topic, active, created_at")
    .order("created_at", { ascending: false });
  const posts = (data ?? []) as QrPost[];

  return (
    <main className="min-h-screen bg-bg-base px-4 py-10 sm:py-14">
      <div className="container-page max-w-3xl space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              Admin
            </p>
            <h1 className="font-serif text-[28px] font-bold text-fg mt-2">
              랩미 대시보드
            </h1>
          </div>
          <form action={logoutAction}>
            <button className="text-[12px] text-fg-muted hover:text-fg transition-colors">
              로그아웃
            </button>
          </form>
        </header>

        <section className="card">
          <h2 className="font-serif text-[18px] font-bold text-fg mb-1">
            새 QR 만들기
          </h2>
          <p className="text-[12px] text-fg-muted mb-5">
            개인 메시지(특정 원소에게) 또는 공공 포스팅(스크린에 공유) 둘 중 하나를 선택해 만드세요.
          </p>
          <form action={createQrPostAction} className="space-y-3">
            <select
              name="kind"
              required
              defaultValue=""
              className="input-base"
            >
              <option value="" disabled>
                종류를 선택하세요
              </option>
              <option value="private">개인 메시지 (특정 원소에게)</option>
              <option value="public">공공 포스팅 (스크린 공유)</option>
            </select>
            <input
              name="target_element"
              placeholder="개인용: 받는 사람 원소 (예: Au)"
              maxLength={20}
              className="input-base"
            />
            <input
              name="topic"
              placeholder="공공용: 주제 (예: 오늘 가장 인상깊었던 사람)"
              maxLength={120}
              className="input-base"
            />
            <button type="submit" className="btn-primary w-full">
              QR 생성
            </button>
            {searchParams.error && (
              <p className="text-[12px] text-pop text-center">
                입력값을 확인해주세요 ({searchParams.error})
              </p>
            )}
          </form>
        </section>

        <section>
          <h2 className="font-serif text-[18px] font-bold text-fg mb-4">
            생성된 QR ({posts.length})
          </h2>
          {posts.length === 0 ? (
            <p className="text-[13px] text-fg-muted">아직 만든 QR이 없어요.</p>
          ) : (
            <ul className="space-y-2">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                      {p.kind === "public" ? "공공 포스팅" : "개인 메시지"}
                      {!p.active && (
                        <span className="ml-2 text-fg-subtle">· 비활성</span>
                      )}
                    </p>
                    <p className="font-serif text-[16px] font-bold text-fg mt-1 truncate">
                      {p.kind === "public"
                        ? p.topic
                        : `→ ${p.target_element}`}
                    </p>
                    <p className="text-[11px] text-fg-subtle mt-0.5 font-mono">
                      /q/{p.slug}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/admin/qr/${p.slug}`}
                      className="btn-ghost text-[12px]"
                    >
                      QR · 메시지
                    </Link>
                    {p.kind === "public" && (
                      <Link
                        href={`/admin/board/${p.slug}`}
                        className="btn-primary text-[12px]"
                      >
                        스크린
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
