import Link from "next/link";

export default function CompletePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="container-narrow text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center">
          <span className="select-none font-display text-[4.5rem] leading-none text-primary/60" aria-hidden="true">
            ✓
          </span>
        </div>

        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          Application Received
        </p>
        <h1 className="font-serif text-display-md text-fg">
          신청이 완료되었습니다
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[14px] leading-relaxed text-fg-muted">
          운영팀 내부 검토 후 승인 여부를 입력하신 이메일로
          안내드리겠습니다. 소중한 시간 내어 신청해주셔서 감사합니다.
        </p>

        <div className="mx-auto mt-8 mb-2 flex items-center justify-center gap-3 text-[11px] tracking-[0.25em] text-fg-subtle/60">
          <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
          <span className="font-display uppercase">Received</span>
          <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
        </div>

        <div className="mt-10">
          <Link href="/" className="btn-ghost max-w-xs mx-auto">
            랜딩으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
