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
          랩미는 KAIST 내 석박사 재학·졸업생을 위한 네트워킹 파티입니다.
          <br />
          만드는 사람들도 모두 KAIST 구성원입니다.
          <br />
          바쁜 연구와 반복되는 일상 속에서도,
          <br />
          좋은 사람을 편하게 만날 수 있는 자리가 필요하다고 생각했습니다.
        </p>
      </article>
    </section>
  );
}
