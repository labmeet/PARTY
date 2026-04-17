import Link from "next/link";

export function CtaButtons() {
  return (
    <section className="container-page py-10 sm:py-14">
      <div className="card relative overflow-hidden">
        <div
          className="absolute inset-0 -z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(182,233,204,0.08) 0%, transparent 60%), radial-gradient(ellipse 80% 40% at 50% 0%, rgba(127,212,164,0.14) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative text-center">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
            Application
          </p>
          <h3 className="font-serif text-2xl font-semibold text-fg sm:text-3xl">
            지금, 이상형을 만날 시간
          </h3>
          <p className="mt-2 text-[13px] text-fg-muted">
            아래에서 성별을 선택하고 신청서를 작성해주세요.
          </p>
        </div>

        <div className="relative mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link href="/apply/female" className="btn-primary group">
            <span>여성 참가 신청</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link href="/apply/male" className="btn-ghost group">
            <span>남성 참가 신청</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <p className="relative mt-5 text-center text-[12px] text-fg-subtle">
          제출된 정보는 승인 절차에만 사용되며, 승인 시 이메일로 안내드립니다.
        </p>
      </div>
    </section>
  );
}
