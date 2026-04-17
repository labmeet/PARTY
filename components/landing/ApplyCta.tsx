import Link from "next/link";

export function ApplyCta({ variant = "full" }: { variant?: "full" | "compact" }) {
  const compact = variant === "compact";
  return (
    <section className="container-page py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-bg-card px-6 py-8 shadow-card sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(182, 233, 204, 0.10) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        {!compact && (
          <div className="relative mb-6 text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.3em] text-primary">
              Apply
            </p>
            <h3 className="font-serif text-[22px] font-bold leading-tight text-fg sm:text-[26px]">
              파티 신청하기
            </h3>
          </div>
        )}
        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link href="/apply/female" className="btn-primary group">
            <span>여성 신청하기</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link href="/apply/male" className="btn-primary group">
            <span>남성 신청하기</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <p className="relative mt-4 text-center text-[12px] text-fg-subtle">
          알잘딱으로 자리 채워드림 · 정원 제한 · 얼리버드가 유리합니다
        </p>
      </div>
    </section>
  );
}
