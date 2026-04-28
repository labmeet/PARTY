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
        <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
          ABOUT
        </p>
        <h2 className="text-center font-serif text-[22px] font-bold leading-snug text-fg sm:text-[26px]">
          랩미가 <span className="text-primary">뭔가요?</span>
        </h2>
        <p className="mt-4 text-center text-[14px] leading-[1.85] text-fg-muted sm:text-[15px]">
          KAIST 내 석박사 재학·졸업생 대상{" "}
          <span className="font-semibold text-fg">오프라인 파티</span>
          <span className="font-semibold text-primary">와 네트워킹 앱</span>을 지칭해요.
          <br />
          <span className="font-semibold text-fg">내향인 버전</span>,{" "}
          <span className="font-semibold text-fg">외향인 버전</span>으로 두 가지 방식이 개최되고,<br className="sm:hidden" /> 첫 파티는{" "}
          <span className="font-semibold text-primary">내향인 버전</span>이에요.
          <br />
          만들어가는 사람들도 전원 카이스트생. 대전에서의 솔로생활에 지쳤다고 하네요.
        </p>
      </article>
    </section>
  );
}
