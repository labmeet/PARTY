import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  createPrivateQrAction,
  createPublicQrAction,
  logoutAction,
} from "@/lib/admin/actions";

export const dynamic = "force-dynamic";

type QrPost = {
  id: string;
  slug: string;
  kind: "private" | "public";
  prompt: string;
  body: string | null;
  target_element: string | null;
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
    .select(
      "id, slug, kind, prompt, body, target_element, active, created_at"
    )
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
            <p className="text-[12px] text-fg-muted mt-1">
              파티 현장에서 사용할 QR을 만들고, 들어오는 메시지를 모니터링합니다.
            </p>
          </div>
          <form action={logoutAction}>
            <button className="text-[12px] text-fg-muted hover:text-fg transition-colors">
              로그아웃
            </button>
          </form>
        </header>

        {searchParams.error && (
          <p className="card text-[12px] text-pop">
            입력값을 확인해주세요 ({searchParams.error})
          </p>
        )}

        <section className="space-y-6">
          <h2 className="font-serif text-[20px] font-bold text-fg">
            새 QR 만들기
          </h2>

          {/* PRIVATE QR */}
          <article className="card space-y-4">
            <header className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                개인 메시지 QR
              </p>
              <h3 className="font-serif text-[18px] font-bold text-fg">
                특정 원소(참가자)에게 한마디 받기
              </h3>
              <p className="text-[12px] text-fg-muted leading-relaxed">
                받는 사람 원소를 정해두면, QR을 스캔한 사람이 그 사람에게만 보이는 메시지를 남길 수 있어요. 받은 메시지는 운영진 대시보드에서만 볼 수 있습니다.
              </p>
            </header>
            <form action={createPrivateQrAction} className="space-y-3">
              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle mb-1">
                  받는 사람 원소
                </span>
                <input
                  name="target_element"
                  required
                  maxLength={20}
                  placeholder="예: Au"
                  className="input-base"
                />
              </label>
              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle mb-1">
                  제목 / 질문
                </span>
                <input
                  name="prompt"
                  required
                  maxLength={120}
                  placeholder="예: Au에게 한마디 / 오늘 본 Au의 인상은?"
                  className="input-base"
                />
              </label>
              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle mb-1">
                  부가 설명 <span className="text-fg-subtle font-normal normal-case tracking-normal">(선택)</span>
                </span>
                <textarea
                  name="body"
                  rows={2}
                  maxLength={300}
                  placeholder="예: 익명이에요. Au 본인에게만 전달됩니다."
                  className="input-base resize-none"
                />
              </label>
              <button type="submit" className="btn-primary w-full">
                개인 QR 생성
              </button>
            </form>
          </article>

          {/* PUBLIC QR */}
          <article className="card space-y-4">
            <header className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pop">
                공공 포스팅 QR
              </p>
              <h3 className="font-serif text-[18px] font-bold text-fg">
                주제를 던지고 모두의 답을 스크린에 띄우기
              </h3>
              <p className="text-[12px] text-fg-muted leading-relaxed">
                주제를 정해 QR로 공유하면, 답글이 라이브 보드(파티 스크린)에 실시간 그리드로 올라옵니다.
              </p>
            </header>
            <form action={createPublicQrAction} className="space-y-3">
              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle mb-1">
                  주제 / 질문
                </span>
                <input
                  name="prompt"
                  required
                  maxLength={120}
                  placeholder="예: 오늘 가장 인상깊었던 사람"
                  className="input-base"
                />
              </label>
              <label className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle mb-1">
                  부가 설명 <span className="text-fg-subtle font-normal normal-case tracking-normal">(선택)</span>
                </span>
                <textarea
                  name="body"
                  rows={2}
                  maxLength={300}
                  placeholder="예: 한 줄로 짧게 적어주세요. 스크린에 함께 띄워져요."
                  className="input-base resize-none"
                />
              </label>
              <button type="submit" className="btn-primary w-full">
                공공 QR 생성
              </button>
            </form>
          </article>
        </section>

        <section>
          <h2 className="font-serif text-[20px] font-bold text-fg mb-4">
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
                      {p.kind === "private" && p.target_element && (
                        <span className="ml-2 text-fg-muted">→ {p.target_element}</span>
                      )}
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
