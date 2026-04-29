import Link from "next/link";

const FEMALE_TAKEN = 12;
const MALE_TAKEN = 14;
const PER_GENDER_CAP = 16;

type Variant = "full" | "compact" | "final";

export function ApplyCta({ variant = "full" }: { variant?: Variant }) {
  if (variant === "final") return <FinalCta />;

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
              네트워킹 파티 신청하기
            </h3>
          </div>
        )}
        <div className="relative mb-4 grid grid-cols-2 gap-3">
          <SeatPill label="여성" taken={FEMALE_TAKEN} cap={PER_GENDER_CAP} />
          <SeatPill label="남성" taken={MALE_TAKEN} cap={PER_GENDER_CAP} />
        </div>
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
        <div className="relative mt-4 text-center text-[12px] text-fg-subtle">
          <p className="font-semibold text-fg">KAIST W8 1층 · 20시</p>
          <p className="mt-1">
            참가비 <span className="mx-1 line-through decoration-[1.5px]">50,000원</span>
            <span className="font-semibold text-fg">35,000원</span>
          </p>
          <p>정원 32명 · 와인 ·<br className="sm:hidden" /> 치즈 플레이트 · 스낵 제공</p>
          <p>얼리버드 1차 ~5/9 · 2차 ~5/23</p>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="container-page py-12 sm:py-20">
      <h2 className="mb-8 text-center font-serif text-[34px] font-bold leading-[1.2] tracking-tight text-primary sm:mb-10 sm:text-[44px]">
        이제 한 번
        <br />
        놀러 가볼까요?
      </h2>

      <div className="relative overflow-hidden rounded-[32px] border border-primary/25 bg-gradient-to-b from-bg-card to-bg-base px-7 py-12 shadow-[0_40px_80px_-30px_rgba(182,233,204,0.25)] sm:px-12 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(182, 233, 204, 0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255, 95, 85, 0.08) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgb(var(--primary) / 0.7), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative text-center">
          <div className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-bg-elevated/50 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-[12px] tracking-[0.12em] text-fg sm:text-[13px]">
              <span className="font-bold">5월 29일</span>
              <span className="mx-2 text-fg-subtle">·</span>
              <span>LABMEET</span>
            </span>
          </div>

          <div className="mx-auto mb-5 grid max-w-md grid-cols-2 gap-3">
            <SeatPill label="여성" taken={FEMALE_TAKEN} cap={PER_GENDER_CAP} />
            <SeatPill label="남성" taken={MALE_TAKEN} cap={PER_GENDER_CAP} />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link href="/apply/female" className="btn-primary group">
              <span>여성 신청하기</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="/apply/male" className="btn-primary group">
              <span>남성 신청하기</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center gap-1 text-[12px] text-fg-subtle">
            <span className="font-semibold text-fg">KAIST W8 1층 · 20시</span>
            <span>
              <span className="mr-1.5 text-fg-subtle/70 line-through decoration-[1.5px]">
                50,000원
              </span>
              <span className="font-semibold text-fg">35,000원</span>
            </span>
            <span>정원 32명 · 와인 ·<br className="sm:hidden" /> 치즈 플레이트 · 스낵 제공</span>
            <span>얼리버드 1차 ~5/9 · 2차 ~5/23</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeatPill({ label, taken, cap }: { label: string; taken: number; cap: number }) {
  const remaining = Math.max(cap - taken, 0);
  const pct = Math.min((taken / cap) * 100, 100);
  const tight = remaining <= 3;
  return (
    <div className="rounded-2xl border border-border bg-bg-elevated/40 px-4 py-3 text-left">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle">
          {label}
        </span>
        <span className="font-display text-[13px] tabular-nums text-fg">
          <span className={tight ? "font-bold text-pop" : "font-bold text-primary"}>
            {taken}
          </span>
          <span className="mx-0.5 text-fg-subtle">/</span>
          <span className="text-fg-subtle">{cap}</span>
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-border/60">
        <div
          className={`h-full rounded-full ${tight ? "bg-pop" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] tabular-nums text-fg-subtle">
        남은 좌석{" "}
        <span className={`font-semibold ${tight ? "text-pop" : "text-fg"}`}>
          {remaining}석
        </span>
      </p>
    </div>
  );
}
