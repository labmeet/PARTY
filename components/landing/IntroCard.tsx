export function IntroCard() {
  return (
    <section className="container-page py-10 sm:py-14">
      <article className="card relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgb(var(--t-accent-pop) / 0.6), transparent)",
          }}
          aria-hidden="true"
        />
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-pop">
          ABOUT
        </p>
        <h2 className="font-serif text-[22px] font-bold leading-snug text-fg sm:text-[26px]">
          랩미가 뭔가요?
        </h2>
        <p className="mt-4 text-[14px] leading-[1.75] text-fg-muted sm:text-[15px]">
          KAIST 내 석박사 재학·졸업생 대상{" "}
          <span className="font-semibold text-fg">오프라인 파티</span>와{" "}
          <span className="font-semibold text-fg">만남 앱</span>을 지칭해요.
          만들어 가는 사람들도 전원 카이스트생.
        </p>
      </article>
    </section>
  );
}
