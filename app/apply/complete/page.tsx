import Link from "next/link";

export default function CompletePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="container-narrow text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-primary/10 shadow-glow">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          Application Received
        </p>
        <h1 className="font-serif text-display-md text-fg">
          신청이 완료되었습니다
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[14px] leading-relaxed text-fg-muted">
          접수 완료. 이제 당신 연애는 저희가 책임집니다.
          <br />
          연구만 하세요.
        </p>

        <div className="mt-10">
          <Link href="/" className="btn-ghost max-w-xs mx-auto">
            랜딩으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
