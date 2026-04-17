const FACTS = [
  { k: "Team", v: "전원 KAIST 재학·졸업생" },
  { k: "Build", v: "오프라인 파티 + 매칭 앱" },
  { k: "Real talk", v: "저희부터 솔로입니다" },
];

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
          About the project
        </p>
        <h2 className="font-serif text-[22px] font-bold leading-snug text-fg sm:text-[26px]">
          랩미가 뭔가요?
        </h2>
        <p className="mt-4 text-[14px] leading-[1.75] text-fg-muted sm:text-[15px]">
          KAIST 내 석박사 재학·졸업생 대상 오프라인 파티와
          소개팅 앱을 지칭해요. 팀원 전원 카이스트생.
          사실, <span className="text-fg font-semibold">저희도 여기서 만나려고</span> 만드는 프로젝트에요.
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-y-2.5 border-t border-border pt-5 sm:grid-cols-[110px_1fr] sm:gap-x-5">
          {FACTS.map((f) => (
            <div key={f.k} className="contents">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-subtle sm:pt-0.5">
                {f.k}
              </dt>
              <dd className="mb-1 text-[14px] text-fg sm:mb-0">{f.v}</dd>
            </div>
          ))}
        </dl>
      </article>
    </section>
  );
}
