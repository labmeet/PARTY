import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  createPrivateQrAction,
  createPublicQrAction,
  logoutAction,
} from "@/lib/admin/actions";
import { SubmitButton } from "@/app/admin/components/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (!isAuthed()) redirect("/admin/login");

  const supabase = createAdminClient();
  const [{ count: privateQrCount }, { count: publicQrCount }, { data: msgKinds }] =
    await Promise.all([
      supabase
        .from("qr_posts")
        .select("id", { count: "exact", head: true })
        .eq("kind", "private"),
      supabase
        .from("qr_posts")
        .select("id", { count: "exact", head: true })
        .eq("kind", "public"),
      supabase
        .from("qr_messages")
        .select("post_id, qr_posts!inner(kind)"),
    ]);

  let privateMsgCount = 0;
  let publicMsgCount = 0;
  for (const row of (msgKinds ?? []) as Array<{
    post_id: string;
    qr_posts: { kind: "private" | "public" } | { kind: "private" | "public" }[] | null;
  }>) {
    const joined = Array.isArray(row.qr_posts) ? row.qr_posts[0] : row.qr_posts;
    const k = joined?.kind;
    if (k === "private") privateMsgCount += 1;
    else if (k === "public") publicMsgCount += 1;
  }

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
            요청 처리 중 문제가 발생했어요 ({searchParams.error}). DB 마이그레이션 적용 여부를 확인해주세요.
          </p>
        )}

        {/* Inbox quick links */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/admin/inbox/private"
            className="card hover:border-primary transition-colors"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              개인 메시지함
            </p>
            <p className="font-serif text-[24px] font-bold text-fg mt-2">
              {privateMsgCount}
              <span className="text-[14px] text-fg-muted ml-1">개</span>
            </p>
            <p className="text-[12px] text-fg-muted mt-0.5">
              QR {privateQrCount ?? 0}개 · 보러가기 →
            </p>
          </Link>
          <Link
            href="/admin/inbox/public"
            className="card hover:border-primary transition-colors"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pop">
              공공 메시지함
            </p>
            <p className="font-serif text-[24px] font-bold text-fg mt-2">
              {publicMsgCount}
              <span className="text-[14px] text-fg-muted ml-1">개</span>
            </p>
            <p className="text-[12px] text-fg-muted mt-0.5">
              QR {publicQrCount ?? 0}개 · 보러가기 →
            </p>
          </Link>
        </section>

        {/* PRIVATE QR */}
        <section className="card space-y-4">
          <header className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              개인 메시지 QR
            </p>
            <h2 className="font-serif text-[20px] font-bold text-fg">
              참가자끼리 1:1 한마디 보내기
            </h2>
            <p className="text-[12px] text-fg-muted leading-relaxed">
              QR을 스캔하면 참가자들의 원소가 카드 그리드로 떠요. 보낼 사람을 골라 메시지를 남기면, 받은 메시지는 운영진만 봅니다.
            </p>
          </header>
          <form action={createPrivateQrAction} className="space-y-3">
            <label className="block">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle mb-1">
                제목 / 안내 문구
              </span>
              <input
                name="prompt"
                required
                maxLength={120}
                placeholder="예: 오늘 만난 사람에게 한마디"
                className="input-base"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle mb-1">
                부가 설명{" "}
                <span className="text-fg-subtle font-normal normal-case tracking-normal">
                  (선택)
                </span>
              </span>
              <textarea
                name="body"
                rows={2}
                maxLength={300}
                placeholder="예: 받는 사람을 고르고 짧게 적어주세요. 익명도 가능해요."
                className="input-base resize-none"
              />
            </label>
            <SubmitButton pendingText="생성 중...">개인 QR 생성</SubmitButton>
          </form>
        </section>

        {/* PUBLIC QR */}
        <section className="card space-y-4">
          <header className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pop">
              공공 포스팅 QR
            </p>
            <h2 className="font-serif text-[20px] font-bold text-fg">
              주제를 던지고 모두의 답을 스크린에 띄우기
            </h2>
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
                부가 설명{" "}
                <span className="text-fg-subtle font-normal normal-case tracking-normal">
                  (선택)
                </span>
              </span>
              <textarea
                name="body"
                rows={2}
                maxLength={300}
                placeholder="예: 한 줄로 짧게 적어주세요. 스크린에 함께 띄워져요."
                className="input-base resize-none"
              />
            </label>
            <SubmitButton pendingText="생성 중...">공공 QR 생성</SubmitButton>
          </form>
        </section>
      </div>
    </main>
  );
}
